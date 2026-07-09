import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { MainPlan } from '../types';
import { sortPlansPopularFirst } from '../utils/sortPlansPopularFirst';
import styles from './MainPricing.module.css';

const HOSTING_BUNDLE_ADDON_ID = 'hosting-bundle';

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

const isOneTimePlan = (plan: MainPlan) => plan.id === 'main-2';

const getFeatureIconClass = (planId: string, index: number): string => {
  switch (planId) {
    case 'main-1': {
      const icons = [
        'fa-solid fa-file-lines',
        'fa-solid fa-image',
        'fa-solid fa-icons',
        'fa-solid fa-envelope-open-text',
        'fa-solid fa-mobile-screen',
        'fa-solid fa-gauge-high',
        'fa-solid fa-magnifying-glass-chart',
        'fa-solid fa-server',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    case 'main-2': {
      const icons = [
        'fa-solid fa-layer-group',
        'fa-solid fa-language',
        'fa-solid fa-bolt',
        'fa-solid fa-shield-halved',
        'fa-solid fa-mobile-screen',
        'fa-solid fa-comments',
        'fa-solid fa-crown',
        'fa-solid fa-puzzle-piece',
        'fa-solid fa-circle-info',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    case 'main-3': {
      const icons = [
        'fa-solid fa-cart-shopping',
        'fa-solid fa-laptop-code',
        'fa-solid fa-gears',
        'fa-solid fa-sitemap',
        'fa-solid fa-plug',
        'fa-solid fa-table-columns',
        'fa-solid fa-bug',
        'fa-solid fa-database',
        'fa-solid fa-headset',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    default:
      return 'fa-solid fa-check';
  }
};

const MainPricing: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
  const t = UI_TEXTS[lang];
  const navigate = useNavigate();

  const scrollToHostingBundleAddon = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(HOSTING_BUNDLE_ADDON_ID);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `/pricing#${HOSTING_BUNDLE_ADDON_ID}`);
  };

  const renderFeature = (feature: string) => {
    const separator = ' — ';
    const sepIndex = feature.indexOf(separator);
    if (sepIndex === -1) {
      return <span>{feature}</span>;
    }
    const before = feature.slice(0, sepIndex + separator.length);
    const linkText = feature.slice(sepIndex + separator.length);
    return (
      <span>
        {before}
        <Link
          to={`/pricing#${HOSTING_BUNDLE_ADDON_ID}`}
          className={styles.featureLink}
          onClick={scrollToHostingBundleAddon}
        >
          {linkText}
        </Link>
      </span>
    );
  };

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

    if (isOneTimePlan(plan)) {
      const message =
        lang === 'ar'
          ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" بسعر ${t.currency}${plan.annualPrice} (دفعة واحدة).\nيرجى التواصل معي لمناقشة التفاصيل.`
          : lang === 'nl'
            ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" voor een eenmalige betaling van ${t.currency}${plan.annualPrice}.\nNeem contact met mij op om de details te bespreken.`
            : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package for a one-time payment of ${t.currency}${plan.annualPrice}.\nPlease contact me to discuss the details.`;
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
    const oneTime = isOneTimePlan(plan);

    return (
      <div
        className={styles.cardWrap}
        {...(plan.id === 'main-2' ? { 'data-scroll-target': 'business-pro' } : {})}
      >
        {plan.isFree ? (
          <span className={styles.badgeFree}>{FREE_BADGE_LABELS[lang]}</span>
        ) : plan.isPopular ? (
          <span className={styles.badge}>{POPULAR_LABELS[lang]}</span>
        ) : null}
        <div className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}>
          <h3 className={styles.planName}>{tr.name}</h3>
          <div className={styles.priceRow}>
            {plan.isCustom ? (
              <span className={styles.price}>{tr.customPriceLabel}</span>
            ) : plan.isFree ? (
              <span className={styles.price}>{FREE_LABELS[lang]}</span>
            ) : (
              <>
                <span className={styles.price}>
                  {t.currency}
                  {plan.annualPrice}
                </span>
                {!oneTime ? <span className={styles.period}>{PERIOD_LABELS[lang]}</span> : null}
              </>
            )}
          </div>
          <p className={styles.annualTotal}>
            {!plan.isCustom && !plan.isFree && !oneTime
              ? ANNUAL_TOTAL_LABELS[lang](plan.annualTotal)
              : '\u00A0'}
          </p>
          <ul className={styles.list}>
            {tr.features.map((feature, i) => (
              <li key={i}>
                <i className={`${getFeatureIconClass(plan.id, i)} ${styles.check}`} aria-hidden />
                {renderFeature(feature)}
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
            {sortPlansPopularFirst(config.mainPlans).map((plan) => (
              <SwiperSlide key={plan.id}>{renderCard(plan)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MainPricing;
