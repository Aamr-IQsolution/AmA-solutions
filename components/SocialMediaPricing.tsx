import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Plan } from '../types';
import styles from './SocialMediaPricing.module.css';

type SocialMediaPricingProps = {
  showId?: boolean;
};

const SocialMediaPricing: React.FC<SocialMediaPricingProps> = ({ showId = false }) => {
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

  const handleOrder = (plan: Plan) => {
    const planName = plan.translations[lang].name;
    const price = `${t.currency}${plan.price}`;
    const brand = config.siteName;

    const message =
      lang === 'ar'
        ? `مرحباً فريق ${brand}،\nأنا مهتم بطلب باقة التسويق: "${planName}" بسعر ${price}.\nيرجى التواصل معي لمناقشة التفاصيل.`
        : lang === 'nl'
          ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het marketingpakket: "${planName}" voor ${price}.\nNeem contact met mij op om de details te bespreken.`
          : `Hello ${brand} Team,\nI am interested in the marketing package: "${planName}" for ${price}.\nPlease contact me to discuss the details.`;

    setContactMessage(message);
    navigate('/contact');
  };

  const renderPlanCard = (plan: Plan) => (
    <div className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}>
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
  );

  const renderPlanSlider = () => (
    <div className={styles.swiperWrap}>
      <Swiper
        key={`marketing-${lang}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        modules={[Pagination, A11y]}
        slidesPerView={1.15}
        spaceBetween={16}
        centeredSlides
        pagination={{ clickable: true }}
      >
        {config.plans.map((plan) => (
          <SwiperSlide key={plan.id}>{renderPlanCard(plan)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <section
      {...(showId ? { id: 'pricing' } : {})}
      className={styles.section}
      aria-labelledby="social-media-pricing-heading"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="social-media-pricing-heading" className={styles.title}>
            {renderTitle()}
          </h2>
          <p className={styles.desc}>{config.pricingHeader[lang].description}</p>
        </div>

        <div className={styles.grid}>
          {config.plans.map((plan) => (
            <div key={plan.id}>{renderPlanCard(plan)}</div>
          ))}
        </div>
        {renderPlanSlider()}
        {!showId ? (
          <Link to="/pricing" className={styles.seeAll}>
            {config.homeSectionCopy.pricing[lang].seeAll}
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default SocialMediaPricing;
