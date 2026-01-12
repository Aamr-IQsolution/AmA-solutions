/**
 * صفحة تسجيل الدخول (Login Page).
 * مخصصة للمسؤولين والمشرفين للوصول إلى لوحة التحكم. تقوم الصفحة بالتحقق من 
 * اسم المستخدم وكلمة المرور مقابل قائمة المستخدمين المخزنة، وتدير رسائل الخطأ 
 * والتحقق من حالة الحساب (نشط أو معطل).
 * تم إضافة حماية برمجية ضد محاولات الاختراق: يتم حظر المستخدم لمدة ساعة بعد 3 محاولات خاطئة.
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';

const ATTEMPTS_LIMIT = 3;
const BLOCK_DURATION = 3600000; // ساعة واحدة بالملي ثانية

const Login: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { lang, setUser, users } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const t = UI_TEXTS[lang];

  // التحقق من حالة الحظر عند تحميل الصفحة
  useEffect(() => {
    const checkBlock = () => {
      const blockedUntil = localStorage.getItem('login_blocked_until');
      if (blockedUntil) {
        const remaining = parseInt(blockedUntil) - Date.now();
        if (remaining > 0) {
          setRemainingTime(remaining);
        } else {
          // انتهت مدة الحظر
          localStorage.removeItem('login_blocked_until');
          localStorage.removeItem('login_failed_attempts');
          setRemainingTime(null);
        }
      }
    };

    checkBlock();
    const timer = setInterval(checkBlock, 60000); // تحديث كل دقيقة
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق إذا كان المستخدم محظوراً حالياً
    if (remainingTime && remainingTime > 0) {
      setError(`${t.tooManyAttempts} ${t.tryAgainIn} ${Math.ceil(remainingTime / 60000)} ${t.minutes}.`);
      return;
    }

    // البحث عن المستخدم
    const existingUser = users.find(u => u.username === username && u.password === password);

    if (existingUser) {
      if (!existingUser.isActive) {
        setError(lang === 'ar' ? 'هذا الحساب معطل حالياً' : lang === 'nl' ? 'Dit account is momenteel geschorst' : 'This account is currently suspended');
        return;
      }
      // تصفير المحاولات عند النجاح
      localStorage.removeItem('login_failed_attempts');
      localStorage.removeItem('login_blocked_until');
      setUser(existingUser);
    } else {
      // التعامل مع المحاولات الفاشلة
      const currentAttempts = parseInt(localStorage.getItem('login_failed_attempts') || '0') + 1;
      localStorage.setItem('login_failed_attempts', currentAttempts.toString());

      if (currentAttempts >= ATTEMPTS_LIMIT) {
        const blockUntil = Date.now() + BLOCK_DURATION;
        localStorage.setItem('login_blocked_until', blockUntil.toString());
        setRemainingTime(BLOCK_DURATION);
        setError(`${t.tooManyAttempts} ${t.tryAgainIn} 60 ${t.minutes}.`);
      } else {
        const remainingAttempts = ATTEMPTS_LIMIT - currentAttempts;
        setError(lang === 'ar' 
          ? `بيانات الدخول غير صحيحة. متبقي لك ${remainingAttempts} محاولات.` 
          : lang === 'nl' 
          ? `Ongeldige inloggegevens. Je hebt nog ${remainingAttempts} pogingen over.` 
          : `Invalid credentials. You have ${remainingAttempts} attempts left.`);
      }
    }
  };

  const isBlocked = remainingTime !== null && remainingTime > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510] px-4 font-cairo">
      <div className="max-w-md w-full glass-card p-10 rounded-[40px] border border-white/10 shadow-2xl">
        <button onClick={onBack} className="mb-8 text-cyan-400 font-black flex items-center gap-2 uppercase text-xs tracking-widest hover:text-white transition-colors">
          <i className={`fa-solid fa-arrow-${lang === 'ar' ? 'right' : 'left'}`}></i>
          {t.home}
        </button>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2 text-white uppercase tracking-tighter">{t.login}</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-center font-bold text-sm animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isBlocked}
              className={`w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`} 
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isBlocked}
              className={`w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`} 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={isBlocked}
            className={`w-full py-5 ama-gradient text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-xl shadow-cyan-500/20 mt-4 ${isBlocked ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
          >
            {isBlocked ? (lang === 'ar' ? 'محتجز مؤقتاً' : 'Blocked') : t.login}
          </button>
        </form>
        <p className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Secure Admin Portal</p>
      </div>
    </div>
  );
};

export default Login;