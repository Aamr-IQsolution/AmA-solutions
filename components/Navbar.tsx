/**
 * مكون شريط التنقل (Navigation Bar).
 * يحتوي على شعار الموقع، روابط الانتقال السريع بين الأقسام، ومبدل اللغة مع الأعلام.
 * المكون متجاوب تماماً، حيث يظهر بشكل مختلف على الهواتف مع قائمة جانبية سهلة الاستخدام.
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { lang, setLang, config } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = UI_TEXTS[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const getFlagUrl = (l: Language) => {
    switch (l) {
      case 'ar': return 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg';
      case 'en': return 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg';
      case 'nl': return 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg';
      default: return '';
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isMobileMenuOpen 
      ? 'bg-[#050510] py-4 border-b border-white/10' 
      : isScrolled 
        ? 'bg-[#050510]/95 backdrop-blur-xl py-4 border-b border-white/10 shadow-2xl' 
        : 'bg-[#050510] md:bg-transparent md:backdrop-blur-none py-5 md:py-8 border-b border-white/5 md:border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setIsMobileMenuOpen(false); }}>
             <div className="relative">
               <div className="absolute -inset-1 ama-gradient rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
               <img src={config.logo} alt="Logo" className="relative h-10 w-10 md:h-12 md:w-12 rounded-full object-cover bg-black border border-white/20 shadow-lg" />
             </div>
            <span className="text-xl md:text-3xl font-black tracking-tighter ama-text-gradient uppercase">
              {config.siteName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
            {[
              { id: 'services', label: t.services },
              { id: 'portfolio', label: t.portfolio },
              { id: 'prices', label: t.prices },
              { id: 'contact', label: t.contact }
            ].map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)} 
                className="relative text-gray-300 hover:text-white transition-all font-bold text-sm lg:text-base uppercase tracking-widest group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 ama-gradient transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector (Desktop) */}
            <div className="relative hidden md:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-sm">
                <img 
                  src={getFlagUrl(lang)} 
                  className="w-full h-full object-cover" 
                  alt="Flag"
                />
              </div>
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs lg:text-sm font-black text-white focus:ring-1 focus:ring-cyan-500 outline-none cursor-pointer uppercase transition-all hover:bg-white/10"
              >
                <option value="ar" className="bg-[#050510]">AR</option>
                <option value="en" className="bg-[#050510]">EN</option>
                <option value="nl" className="bg-[#050510]">NL</option>
              </select>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white shadow-inner active:scale-90 transition-all"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-x-0 top-[75px] bg-[#050510] border-b border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.8)]' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-8 flex flex-col space-y-5">
          {[
            { id: 'services', label: t.services, icon: 'fa-briefcase' },
            { id: 'portfolio', label: t.portfolio, icon: 'fa-images' },
            { id: 'prices', label: t.prices, icon: 'fa-tags' },
            { id: 'contact', label: t.contact, icon: 'fa-paper-plane' }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="flex items-center gap-5 text-gray-200 hover:text-white font-black text-sm uppercase tracking-widest py-5 px-6 rounded-2xl bg-white/5 border border-white/5 transition-all active:bg-white/10 shadow-sm"
            >
              <i className={`fa-solid ${link.icon} w-8 text-cyan-400 text-xl`}></i>
              {link.label}
            </a>
          ))}
          
          <div className="pt-8 mt-4 border-t border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">اللغة / Language</span>
               <div className="flex gap-3">
                 {[
                   { code: 'ar', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg' },
                   { code: 'en', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' },
                   { code: 'nl', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg' }
                 ].map((l) => (
                   <button 
                    key={l.code}
                    onClick={() => { setLang(l.code as Language); setIsMobileMenuOpen(false); }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      lang === l.code ? 'ama-gradient border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/5 border-white/10'
                    }`}
                   >
                     <img src={l.flag} className="w-10 h-10 rounded-full object-cover border border-white/10" alt={l.code} />
                     <span className={`text-[10px] font-black uppercase ${lang === l.code ? 'text-black' : 'text-gray-400'}`}>{l.code}</span>
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;