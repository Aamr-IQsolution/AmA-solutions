/**
 * قسم الخدمات (Services Section).
 * يعرض هذا القسم قائمة بالخدمات المتخصصة التي يقدمها المبرمج أو الوكالة.
 * تم تحديثه ليشمل قائمة منسدلة (Expert Solutions) تعرض شروحات معمقة واحترافية.
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';

const Services: React.FC = () => {
  const { lang, config } = useApp();
  const t = UI_TEXTS[lang];
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const renderTitle = () => {
    const header = config.servicesHeader[lang];
    const fullTitle = header.title;
    const highlight = header.highlight;
    
    if (highlight && fullTitle.includes(highlight)) {
      const parts = fullTitle.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="ama-text-gradient">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return fullTitle;
  };

  const toggleDetails = (id: string) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl text-center md:text-left rtl:md:text-right">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              {renderTitle()}
            </h2>
            <div className="w-24 h-1 ama-gradient rounded-full mb-6 mx-auto md:mx-0"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.services.map((service) => (
            <div 
              key={service.id} 
              className={`p-10 glass-card rounded-[40px] border transition-all duration-500 group relative overflow-hidden flex flex-col h-full ${
                openServiceId === service.id ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'border-white/5 hover:border-cyan-500/30'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
              
              <div className="w-16 h-16 ama-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
                <i className={`fa-solid ${service.icon} text-2xl text-black`}></i>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{service.translations[lang].name}</h3>
              
              <p className="text-gray-400 mb-8 leading-relaxed text-base flex-grow">
                {service.translations[lang].description}
              </p>

              <div className="border-t border-white/5 pt-6 mt-auto">
                <button 
                  onClick={() => toggleDetails(service.id)}
                  className="flex items-center justify-between w-full group/btn"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 group-hover/btn:text-white transition-colors">
                      {lang === 'ar' ? 'حلول الخبراء' : 'Expert Solutions'}
                    </span>
                    <i className={`fa-solid fa-chevron-down text-[10px] text-cyan-400 transition-transform duration-300 ${openServiceId === service.id ? 'rotate-180' : ''}`}></i>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openServiceId === service.id ? 'bg-white text-black' : 'group-hover/btn:border-cyan-500/50 text-gray-400'}`}>
                    <i className={`fa-solid fa-arrow-${lang === 'ar' ? 'left' : 'right'} text-xs`}></i>
                  </div>
                </button>

                {/* Dropdown Content */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openServiceId === service.id ? 'max-h-[300px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-sm text-gray-300 leading-relaxed italic animate-in slide-in-from-top-4">
                      <div className="ama-gradient w-8 h-1 rounded-full mb-4 opacity-50"></div>
                      {service.translations[lang].expertDetails}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;