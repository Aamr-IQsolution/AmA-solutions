/**
 * قسم أسعار تصميم المواقع (Web Design Pricing).
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';
import styles from './WebPricing.module.css';

const WebPricing: React.FC = () => {
  const { lang, config, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];
  const navigate = useNavigate();

  const eyebrow =
    lang === 'ar' ? 'قسم تطوير الويب' : lang === 'nl' ? 'Webontwikkeling' : 'Web development';

  const renderTitle = () => {
    const header = config.webPricingHeader[lang];
    const fullTitle = header.title;
    const highlight = header.highlight;

    if (highlight && fullTitle.includes(highlight)) {
      const parts = fullTitle.split(highlight);
      return (
        <>
          {parts[0]}
          <span className={styles.highlight}>{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return fullTitle;
  };

  const handleStartProject = (plan: Plan) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    const brand = config.siteName;

    let message = '';
    if (lang === 'ar') {
      message = `مرحباً فريق ${brand}،\nأود بدء مشروع ويب جديد باختيار باقة: "${planName}" بسعر ${price}.\nيرجى التواصل معي لتزويدكم بالمتطلبات.`;
    } else if (lang === 'nl') {
      message = `Hallo ${brand}-team,\nIk wil graag een nieuw webproject starten met het pakket: "${planName}" voor ${price}.\nNeem contact met mij op voor de vereisten.`;
    } else {
      message = `Hello ${brand} Team,\nI would like to start a new web project with the package: "${planName}" for ${price}.\nPlease contact me with the requirements.`;
    }

    setContactMessage(message);
    navigate('/contact');
  };

  const startingLabel =
    lang === 'ar' ? 'تبدأ من' : lang === 'nl' ? 'vanaf' : 'Starting at';

  return (
    <section id="web-pricing" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{renderTitle()}</h2>
          <p className={styles.desc}>{config.webPricingHeader[lang].description}</p>
        </div>

        <div className={styles.grid}>
          {config.webPlans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}
            >
              <div className={styles.decor} aria-hidden />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className={styles.planTitle}>{plan.translations[lang].name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    {t.currency}
                    {plan.price}
                  </span>
                  <span className={styles.priceNote}>{startingLabel}</span>
                </div>
                <ul className={styles.list}>
                  {plan.translations[lang].features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <span className={styles.codeIcon}>
                        <i className="fa-solid fa-code" aria-hidden />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={styles.cta}
                  onClick={() => handleStartProject(plan)}
                >
                  {plan.translations[lang].buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebPricing;
