/**
 * قسم الواجهة الترحيبية (Hero Section).
 * هذا القسم هو أول ما يراه الزائر عند دخول الموقع، ويحتوي على العنوان الرئيسي الجذاب, 
 * وصف موجز للخدمات، وأزرار "دعوة للاتخاذ إجراء" (CTA) لتوجيه المستخدم للتواصل أو رؤية الأعمال.
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import ThreeDBackground from './ThreeDBackground'; // استيراد المكون الجديد

const Hero: React.FC = () => {
  const { lang, config } = useApp();
  const heroData = config.hero[lang];
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollPosition / 400); // Fade out over 400px of scrolling
      setBgOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-40 pb-32 px-4 overflow-hidden text-white"
    >
      <ThreeDBackground />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out"
        style={{
          backgroundImage: "url('/assets/Aamr-with-agroup-op-workers.png')",
          opacity: bgOpacity,
          zIndex: -1,
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Background Glows (kept from original) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase glass-card rounded-full border border-cyan-500/20">
          Digital Excellence Solution
        </div>

        {/* Animated Logo */}
        <div className="w-48 h-48 md:w-1/3 md:h-auto md:max-w-xs p-4 rounded-full bg-white/5 border border-white/10 shadow-lg mb-8 animate-float"> 
            <img src={config.logo} alt="Logo" className="w-full h-full rounded-full" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] max-w-5xl tracking-tight">
          {heroData.title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? 'ama-text-gradient' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
          {heroData.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="px-10 py-4 ama-gradient text-black font-black rounded-full shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-105 transition-all uppercase tracking-widest"
          >
            {UI_TEXTS[lang].contact}
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => scrollToSection(e, 'portfolio')}
            className="px-10 py-4 glass-card text-white border border-white/10 rounded-full font-black hover:bg-white/5 transition-all uppercase tracking-widest"
          >
            {UI_TEXTS[lang].portfolio}
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
