/**
 * قسم خطط الأسعار (Pricing Section).
 * يعرض هذا القسم الباقات والأسعار المختلفة للخدمات التي يقدمها الموقع. 
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';

const Pricing: React.FC = () => {
  const { lang, config, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];

  const renderTitle = () => {
    const header = config.pricingHeader[lang];
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

  const handleOrder = (plan: Plan) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    
    let message = "";
    if (lang === 'ar') {
      message = `مرحباً فريق AmA-DigitAdmiral،\nأنا مهتم بطلب باقة التسويق: "${planName}" بسعر ${price}.\nيرجى التواصل معي لمناقشة التفاصيل.`;
    } else if (lang === 'nl') {
      message = `Hallo AmA-DigitAdmiral-team,\nIk ben geïnteresseerd in het bestellen van het marketingpakket: "${planName}" voor ${price}.\nNeem contact met mij op om de details te bespreken.`;
    } else {
      message = `Hello AmA-DigitAdmiral Team,\nI am interested in ordering the Marketing Package: "${planName}" for ${price}.\nPlease contact me to discuss the details.`;
    }
    
    setContactMessage(message);
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="prices" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            {renderTitle()}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {config.pricingHeader[lang].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {config.plans.map((plan) => (
            <div key={plan.id} className={`p-10 glass-card rounded-[40px] border transition-all hover:scale-105 relative ${plan.isPopular ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'border-white/5'}`}>
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ama-gradient text-black font-black text-[10px] uppercase rounded-full whitespace-nowrap z-20">
                  {lang === 'ar' ? 'الأكثر طلباً' : 'Popular Choice'}
                </span>
              )}
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-4 block">
                  {plan.translations[lang].name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{t.currency}{plan.price}</span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase">/ p.m.</span>
                </div>
              </div>
              <ul className="space-y-3 mb-10">
                {plan.translations[lang].features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-gray-300 text-xs">
                    <i className="fa-solid fa-check text-cyan-400 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleOrder(plan)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${plan.isPopular ? 'ama-gradient text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                {plan.translations[lang].buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;