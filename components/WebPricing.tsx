/**
 * قسم أسعار تصميم المواقع (Web Design Pricing Section).
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';

const WebPricing: React.FC = () => {
  const { lang, config, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];

  const renderTitle = () => {
    const header = config.webPricingHeader[lang];
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

  const handleStartProject = (plan: Plan) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    
    let message = "";
    if (lang === 'ar') {
      message = `مرحباً فريق AmA-DigitAdmiral،\nأود بدء مشروع ويب جديد باختيار باقة: "${planName}" بسعر ${price}.\nيرجى التواصل معي لتزويدكم بالمتطلبات.`;
    } else if (lang === 'nl') {
      message = `Hallo AmA-DigitAdmiral-team,\nIk wil graag een nieuw webproject starten met het pakket: "${planName}" voor ${price}.\nNeem contact met mij op voor de vereisten.`;
    } else {
      message = `Hello AmA-DigitAdmiral Team,\nI would like to start a new web project by choosing the package: "${planName}" for ${price}.\nPlease contact me to provide you with the requirements.`;
    }
    
    setContactMessage(message);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="web-prices" className="py-32 relative bg-[#08081a]/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 mb-4 text-[10px] font-black tracking-widest text-cyan-400 bg-white/5 border border-cyan-500/20 rounded-full uppercase">
            Web Dev Division
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            {renderTitle()}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {config.webPricingHeader[lang].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {config.webPlans.map((plan) => (
            <div key={plan.id} className={`group relative p-10 glass-card rounded-[40px] border transition-all hover:-translate-y-2 ${plan.isPopular ? 'border-cyan-500/40' : 'border-white/5'}`}>
              
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
              
              <div className="mb-8 relative">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{plan.translations[lang].name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black ama-text-gradient">{t.currency}{plan.price}</span>
                  <span className="text-gray-500 text-xs font-bold uppercase">{lang === 'ar' ? 'تبدأ من' : 'starting at'}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 border-t border-white/5 pt-8">
                {plan.translations[lang].features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
                    <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                       <i className="fa-solid fa-code text-[10px] text-cyan-400"></i>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleStartProject(plan)}
                className="w-full py-5 ama-gradient text-black font-black rounded-3xl hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/10"
              >
                {plan.translations[lang].buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebPricing;