/**
 * تذييل الصفحة (Footer).
 * يحتوي على شعار الموقع الختامي، حقوق الملكية الفكرية، واسم فريق البرمجة. 
 * كما يتضمن زراً مخفياً بشكل أيقونة "قفل" يتيح للمسؤولين الانتقال إلى صفحة 
 * تسجيل الدخول للوصول إلى لوحة التحكم.
 * يتم الآن جلب جميع النصوص من إعدادات الموقع لضمان القابلية للتعديل الكامل.
 */
import React from 'react';
import { useApp } from '../context/AppContext';

const Footer: React.FC<{ onAdminClick: () => void }> = ({ onAdminClick }) => {
  const { lang, config } = useApp();
  const footerData = config.footer[lang];
  
  return (
    <footer className="py-12 bg-[#050510] border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center items-center gap-3">
          <img src={config.logo} alt="Logo" className="w-10 h-10 rounded-full bg-black border border-white/10" />
          <span className="text-white text-xl font-black ama-text-gradient uppercase tracking-tighter">{config.siteName}</span>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} {config.siteName}. {footerData.copyright}
          </p>
          
          <div className="flex items-center gap-3 text-xs opacity-40 hover:opacity-100 transition-opacity">
            <span>{footerData.credits}</span>
            {/* Secret Login Button */}
            <button 
              onClick={onAdminClick}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-default"
              aria-label="Admin Access"
            >
              <i className="fa-solid fa-lock text-[8px]"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;