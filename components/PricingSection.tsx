import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { MainPlan } from '../types';
import styles from './PricingSection.module.css';

const PERIOD_LABELS = {
  en: '/mo',
  ar: '/شهر',
  nl: '/mnd',
} as const;

const FREE_LABELS = {
  en: 'Free',
  ar: 'مجاناً',
  nl: 'Gratis',
} as const;

const FREE_BADGE_LABELS = {
  en: 'Free forever',
  ar: 'مجانية للأبد',
  nl: 'Gratis voor altijd',
} as const;

const PricingSection: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
  const t = UI_TEXTS[lang];
  const copy = config.homeSectionCopy.pricing[lang];
  const navigate = useNavigate();
  const mainPlans = config.mainPlans;

  const handleOrder = (plan: MainPlan) => {
    const tr = plan.translations[lang];
    const brand = config.siteName;

    if (plan.isFree) {
      const message =
        lang === 'ar'
          ? `مرحباً فريق ${brand}،\nأنا مهتم بالباقة المجانية "${tr.name}".\nيرجى التواصل معي لإعدادها.`
          : lang === 'nl'
            ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het gratis pakket "${tr.name}".\nNeem contact met mij op om het in te stellen.`
            : `Hello ${brand} Team,\nI am interested in the "${tr.name}" free plan.\nPlease contact me to set it up.`;
      setContactMessage(message);
      navigate('/contact');
      return;
    }

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
    const isFeatured = plan.isPopular;

    return (
      <div className={styles.cardWrap}>
        {plan.isFree ? (
          <span className={styles.badgeFree}>{FREE_BADGE_LABELS[lang]}</span>
        ) : isFeatured ? (
          <span className={styles.badge}>{copy.popularBadge}</span>
        ) : null}
        <div className={`${styles.card} ${isFeatured ? styles.cardFeatured : ''}`}>
          <h3 className={styles.planName}>{tr.name}</h3>
          <p className={styles.price}>
            {plan.isCustom ? (
              tr.customPriceLabel
            ) : plan.isFree ? (
              FREE_LABELS[lang]
            ) : (
              <>
                {t.currency}
                {plan.annualPrice}
                <span className={styles.period}>{PERIOD_LABELS[lang]}</span>
              </>
            )}
          </p>
          {!plan.isCustom && !plan.isFree ? (
            <p className={styles.annualHint}>
              {lang === 'ar'
                ? `${plan.annualTotal.toLocaleString()}€ سنوياً`
                : lang === 'nl'
                  ? `€${plan.annualTotal.toLocaleString()} per jaar`
                  : `€${plan.annualTotal.toLocaleString()} annually`}
            </p>
          ) : (
            <p className={styles.annualHint}>{'\u00A0'}</p>
          )}
          <ul className={styles.list}>
            {tr.features.slice(0, 5).map((f, i) => (
              <li key={i}>
                <i className={`fa-solid fa-check ${styles.check}`} aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => handleOrder(plan)} className={styles.orderBtn}>
            {tr.buttonText}
          </button>
          <p className={styles.setupNote}>{tr.setupFeeNote || '\u00A0'}</p>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="home-pricing-heading">
      <div className={styles.inner}>
        <h2 id="home-pricing-heading" className={styles.title}>
          {copy.titleBefore}
          <span className={styles.highlight}>{copy.titleHighlight}</span>
          {copy.titleAfter}
        </h2>
        <p className={styles.subtitle}>{copy.subtitle}</p>

        <div className={styles.grid}>{mainPlans.map((plan) => renderCard(plan))}</div>

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
            {mainPlans.map((plan) => (
              <SwiperSlide key={plan.id}>{renderCard(plan)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Link to="/pricing" className={styles.seeAll}>
          {copy.seeAll}
        </Link>
      </div>
    </section>
  );
};

export default PricingSection;
