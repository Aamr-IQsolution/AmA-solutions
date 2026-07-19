import React from 'react';
import { LocalizedLink } from './LocalizedLink';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { MainPlan } from '../types';
import { isOneTimePlan, getFeatureIconClass } from '../utils/pricing/planHelpers';
import {
  PERIOD_LABELS,
  FREE_LABELS,
  FREE_BADGE_LABELS,
  SEE_ALL_FEATURES_LABELS,
} from '../utils/pricing/pricingLabels';
import { buildPlanContactMessage } from '../utils/pricing/buildPlanContactMessage';
import styles from './PricingSection.module.css';

const PricingSection: React.FC = () => {
  const { lang, config, setContactMessage, isRTL } = useApp();
  const t = UI_TEXTS[lang];
  const copy = config.homeSectionCopy.pricing[lang];
  const navigate = useLocalizedNavigate();
  const mainPlans = config.mainPlans;

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
    const isFeatured = plan.isPopular;
    const oneTime = isOneTimePlan(plan);

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
                {!oneTime ? <span className={styles.period}>{PERIOD_LABELS[lang]}</span> : null}
              </>
            )}
          </p>
          {!plan.isCustom && !plan.isFree && !oneTime ? (
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
                <i className={`${getFeatureIconClass(plan.id, i)} ${styles.check}`} aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          {oneTime ? (
            <LocalizedLink to="/pricing#business-pro" className={styles.orderBtn}>
              {SEE_ALL_FEATURES_LABELS[lang]}
            </LocalizedLink>
          ) : (
            <button type="button" onClick={() => handleOrder(plan)} className={styles.orderBtn}>
              {tr.buttonText}
            </button>
          )}
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

        <div className={styles.grid}>
          {mainPlans.map((plan) => (
            <React.Fragment key={plan.id}>{renderCard(plan)}</React.Fragment>
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
            {mainPlans.map((plan) => (
              <SwiperSlide key={plan.id}>{renderCard(plan)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        <LocalizedLink to="/pricing" className={styles.seeAll}>
          {copy.seeAll}
        </LocalizedLink>
      </div>
    </section>
  );
};

export default PricingSection;
