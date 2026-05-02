/**
 * قسم خطط الأسعار (Social / Marketing Pricing).
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';
import styles from './Pricing.module.css';

const Pricing: React.FC = () => {
  const { lang, config, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];
  const navigate = useNavigate();

  const popularLabel =
    lang === 'ar' ? 'الأكثر طلباً' : lang === 'nl' ? 'Meest populair' : 'Most popular';

  const renderTitle = () => {
    const header = config.pricingHeader[lang];
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

  const handleOrder = (plan: Plan) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    const brand = config.siteName;

    let message = '';
    if (lang === 'ar') {
      message = `مرحباً فريق ${brand}،\nأنا مهتم بطلب باقة التسويق: "${planName}" بسعر ${price}.\nيرجى التواصل معي لمناقشة التفاصيل.`;
    } else if (lang === 'nl') {
      message = `Hallo ${brand}-team,\nIk ben geïnteresseerd in het marketingpakket: "${planName}" voor ${price}.\nNeem contact met mij op om de details te bespreken.`;
    } else {
      message = `Hello ${brand} Team,\nI am interested in the marketing package: "${planName}" for ${price}.\nPlease contact me to discuss the details.`;
    }

    setContactMessage(message);
    navigate('/contact');
  };

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{renderTitle()}</h2>
          <p className={styles.desc}>{config.pricingHeader[lang].description}</p>
        </div>

        <div className={styles.grid}>
          {config.plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}
            >
              {plan.isPopular ? <span className={styles.badge}>{popularLabel}</span> : null}
              <div>
                <span className={styles.planName}>{plan.translations[lang].name}</span>
                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    {t.currency}
                    {plan.price}
                  </span>
                  <span className={styles.period}>/ p.m.</span>
                </div>
              </div>
              <ul className={styles.list}>
                {plan.translations[lang].features.map((feature, fIdx) => (
                  <li key={fIdx}>
                    <i className={`fa-solid fa-check ${styles.check}`} aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleOrder(plan)}
                className={`${styles.cta} ${plan.isPopular ? styles.ctaPrimary : ''}`}
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

export default Pricing;
