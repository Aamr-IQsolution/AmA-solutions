/**
 * قسم خطط الأسعار (Social / Marketing + Web + Add-ons).
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';
import AddOnsSection from './AddOnsSection';
import styles from './Pricing.module.css';

type PackageKind = 'marketing' | 'web';

const Pricing: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
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

  const renderWebTitle = () => {
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

  const handleOrder = (plan: Plan, kind: PackageKind) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    const brand = config.siteName;

    let message = '';
    if (kind === 'web') {
      if (lang === 'ar') {
        message = `مرحباً فريق ${brand}،\nأنا مهتم بباقة تطوير المواقع: "${planName}" بسعر ${price}.\nيرجى التواصل معي لمناقشة التفاصيل.`;
      } else if (lang === 'nl') {
        message = `Hallo ${brand}-team,\nIk ben geïnteresseerd in het webpakket: "${planName}" voor ${price}.\nNeem contact met mij op om de details te bespreken.`;
      } else {
        message = `Hello ${brand} Team,\nI am interested in the web package: "${planName}" for ${price}.\nPlease contact me to discuss the details.`;
      }
    } else if (lang === 'ar') {
      message = `مرحباً فريق ${brand}،\nأنا مهتم بطلب باقة التسويق: "${planName}" بسعر ${price}.\nيرجى التواصل معي لمناقشة التفاصيل.`;
    } else if (lang === 'nl') {
      message = `Hallo ${brand}-team,\nIk ben geïnteresseerd in het marketingpakket: "${planName}" voor ${price}.\nNeem contact met mij op om de details te bespreken.`;
    } else {
      message = `Hello ${brand} Team,\nI am interested in the marketing package: "${planName}" for ${price}.\nPlease contact me to discuss the details.`;
    }

    setContactMessage(message);
    navigate('/contact');
  };

  const renderPlanCard = (plan: Plan, kind: PackageKind, showPeriod = true) => (
    <div
      className={`${styles.card} ${kind === 'web' ? styles.cardWeb : ''} ${plan.isPopular ? styles.cardPopular : ''}`}
    >
      {plan.isPopular ? <span className={styles.badge}>{popularLabel}</span> : null}
      <div>
        <span className={styles.planName}>{plan.translations[lang].name}</span>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {t.currency}
            {plan.price}
          </span>
          {showPeriod ? <span className={styles.period}>/ p.m.</span> : null}
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
        onClick={() => handleOrder(plan, kind)}
        className={`${styles.cta} ${plan.isPopular ? styles.ctaPrimary : ''}`}
      >
        {plan.translations[lang].buttonText}
      </button>
    </div>
  );

  const renderPlanSlider = (plans: Plan[], kind: PackageKind, showPeriod = true) => (
    <div className={styles.swiperWrap}>
      <Swiper
        key={`${kind}-${lang}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        modules={[Pagination, A11y]}
        slidesPerView={1.15}
        spaceBetween={16}
        centeredSlides
        pagination={{ clickable: true }}
      >
        {plans.map((plan) => (
          <SwiperSlide key={plan.id}>{renderPlanCard(plan, kind, showPeriod)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <>
      <section id="pricing" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.title}>{renderTitle()}</h2>
            <p className={styles.desc}>{config.pricingHeader[lang].description}</p>
          </div>

          <div className={styles.grid}>
            {config.plans.map((plan) => (
              <div key={plan.id}>{renderPlanCard(plan, 'marketing')}</div>
            ))}
          </div>
          {renderPlanSlider(config.plans, 'marketing')}
        </div>
      </section>

      <section id="web-pricing" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.title}>{renderWebTitle()}</h2>
            <p className={styles.desc}>{config.webPricingHeader[lang].description}</p>
          </div>

          <div className={`${styles.grid} ${styles.gridWeb}`}>
            {config.webPlans.map((plan) => (
              <div key={plan.id}>{renderPlanCard(plan, 'web', false)}</div>
            ))}
          </div>
          {renderPlanSlider(config.webPlans, 'web', false)}
        </div>
      </section>

      <AddOnsSection />
    </>
  );
};

export default Pricing;
