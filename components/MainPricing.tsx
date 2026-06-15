import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { MainPlan } from '../types';
import styles from './MainPricing.module.css';

const PERIOD_LABELS = {
  en: '/mo',
  ar: '/شهر',
  nl: '/mnd',
} as const;

const ANNUAL_TOTAL_LABELS = {
  en: (total: number) => `€${total.toLocaleString()} billed annually`,
  ar: (total: number) => `${total.toLocaleString()}€ سنوياً دفعة واحدة`,
  nl: (total: number) => `€${total.toLocaleString()} per jaar vooruitbetaald`,
} as const;

const POPULAR_LABELS = {
  en: 'Most popular',
  ar: 'الأكثر شعبية',
  nl: 'Meest populair',
} as const;

const MainPricing: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
  const t = UI_TEXTS[lang];
  const navigate = useNavigate();

  const handleOrder = (plan: MainPlan) => {
    const tr = plan.translations[lang];
    const brand = config.siteName;

    if (plan.isCustom) {
      const message =
        lang === 'ar'
          ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" — استفسار مشروع مخصص.\nنظراً لاختلاف المتطلبات التقنية لكل مشروع، يرجى التواصل معي لمناقشة التفاصيل.`
          : lang === 'nl'
            ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" — maatwerk projectaanvraag.\nNeem contact met mij op om de details te bespreken.`
            : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package — Custom Project Inquiry.\nPlease contact me to discuss the technical requirements of my project.`;
      setContactMessage(message);
      navigate('/contact');
      return;
    }

    const message =
      lang === 'ar'
        ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" بسعر ${t.currency}${plan.annualPrice}/شهر (سنوي مع عقد).\nيرجى التواصل معي لمناقشة التفاصيل.`
        : lang === 'nl'
          ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" voor ${t.currency}${plan.annualPrice}/mnd (jaarlijks met contract).\nNeem contact met mij op om de details te bespreken.`
          : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package for ${t.currency}${plan.annualPrice}/mo (annual contract).\nPlease contact me to discuss the details.`;

    setContactMessage(message);
    navigate('/contact');
  };

  const renderCard = (plan: MainPlan) => {
    const tr = plan.translations[lang];

    return (
      <div className={styles.cardWrap}>
        {plan.isPopular ? <span className={styles.badge}>{POPULAR_LABELS[lang]}</span> : null}
        <div className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}>
          <h3 className={styles.planName}>{tr.name}</h3>
          <div className={styles.priceRow}>
            {plan.isCustom ? (
              <span className={styles.price}>{tr.customPriceLabel}</span>
            ) : (
              <>
                <span className={styles.price}>
                  {t.currency}
                  {plan.annualPrice}
                </span>
                <span className={styles.period}>{PERIOD_LABELS[lang]}</span>
              </>
            )}
          </div>
          <p className={styles.annualTotal}>
            {!plan.isCustom ? ANNUAL_TOTAL_LABELS[lang](plan.annualTotal) : '\u00A0'}
          </p>
          <ul className={styles.list}>
            {tr.features.map((feature, i) => (
              <li key={i}>
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
            {tr.buttonText}
          </button>
          <p className={styles.setupNote}>{tr.setupFeeNote || '\u00A0'}</p>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.section} aria-label="Main pricing plans">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {config.mainPlans.map((plan) => (
            <div key={plan.id}>{renderCard(plan)}</div>
          ))}
        </div>

        <div className={styles.swiperWrap}>
          <Swiper
            key={lang}
            dir={isRTL ? 'rtl' : 'ltr'}
            modules={[Pagination, A11y]}
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides
            pagination={{ clickable: true }}
          >
            {config.mainPlans.map((plan) => (
              <SwiperSlide key={plan.id}>{renderCard(plan)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MainPricing;
