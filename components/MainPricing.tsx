import React from 'react';
import { LocalizedLink } from './LocalizedLink';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { localizePath } from '../utils/localizePath';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { MainPlan } from '../types';
import { sortPlansPopularFirst } from '../utils/sortPlansPopularFirst';
import { isOneTimePlan, getFeatureIconClass } from '../utils/pricing/planHelpers';
import {
  PERIOD_LABELS,
  FREE_LABELS,
  FREE_BADGE_LABELS,
  POPULAR_LABELS,
  ANNUAL_TOTAL_LABELS,
} from '../utils/pricing/pricingLabels';
import { buildPlanContactMessage } from '../utils/pricing/buildPlanContactMessage';
import styles from './MainPricing.module.css';

const HOSTING_BUNDLE_ADDON_ID = 'hosting-bundle';

const MainPricing: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
  const t = UI_TEXTS[lang];
  const navigate = useLocalizedNavigate();

  const scrollToHostingBundleAddon = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(HOSTING_BUNDLE_ADDON_ID);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', localizePath(`/pricing#${HOSTING_BUNDLE_ADDON_ID}`, lang));
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
        <LocalizedLink
          to={`/pricing#${HOSTING_BUNDLE_ADDON_ID}`}
          className={styles.featureLink}
          onClick={scrollToHostingBundleAddon}
        >
          {linkText}
        </LocalizedLink>
      </span>
    );
  };

  const handleOrder = (plan: MainPlan) => {
    setContactMessage(
      buildPlanContactMessage({
        plan,
        lang,
        brand: config.siteName,
        currency: t.currency,
      }),
    );
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
