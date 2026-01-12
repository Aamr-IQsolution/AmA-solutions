/**
 * قسم التواصل (Contact Section).
 * تم تحديثه ليدعم التعبئة التلقائية للرسالة عند اختيار باقة معينة.
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';

const Contact: React.FC = () => {
  const { lang, config, contactMessage, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // مزامنة الرسالة المختارة من الباقات مع حقل النص في النموذج
  useEffect(() => {
    if (contactMessage) {
      setFormData(prev => ({ ...prev, message: contactMessage }));
      // بعد نسخ الرسالة، يمكن تصفيرها في الـ context إذا أردنا تجنب تكرارها عند الرجوع، 
      // ولكن هنا نتركها ليرى المستخدم النص قبل الإرسال.
    }
  }, [contactMessage]);

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Hello AmA Team,\n\nI am interested in your services.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${config.contactEmail}?subject=${subject}&body=${body}`;
    
    // تصفير الرسالة المختارة بعد محاولة الإرسال
    setContactMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // إذا قام المستخدم بتعديل النص يدوياً، نقوم بتحديث الـ context لضمان الاتساق
    if (e.target.name === 'message') {
      setContactMessage(e.target.value);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-cyan-400 uppercase glass-card rounded-full border border-cyan-500/20">
              {lang === 'ar' ? 'تواصل مباشر' : 'Get In Touch'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">{t.contact}</h2>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              {lang === 'ar' 
                ? 'هل أنت مستعد لبدء مشروعك القادم؟ تواصل معنا اليوم للحصول على استشارة مجانية وبناء حضورك الرقمي.'
                : 'Ready to start your next project? Contact us today for a free consultation and build your digital presence.'}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/10 group-hover:ama-gradient group-hover:text-black transition-all">
                  <i className="fa-solid fa-envelope text-xl"></i>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Email</p>
                  <p className="text-lg font-bold text-white">{config.contactEmail}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-green-400 border border-white/10 group-hover:bg-green-500 group-hover:text-black transition-all">
                  <i className="fa-brands fa-whatsapp text-2xl"></i>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">WhatsApp</p>
                  <p className="text-lg font-bold text-white">{config.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {config.socials.map((social) => (
                <a 
                  key={social.id} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
                  title={social.platform}
                >
                  <i className={`fa-brands ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 ama-gradient opacity-[0.03] blur-[100px]"></div>
            <form className="space-y-6 relative z-10" onSubmit={handleSendMail}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">Message</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all h-32" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-5 ama-gradient text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-xl shadow-cyan-500/20"
              >
                {lang === 'ar' ? 'إرسال الرسالة عبر البريد' : 'Send via Email'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;