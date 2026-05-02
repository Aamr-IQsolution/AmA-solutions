import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import styles from './PricingSection.module.css';

const PricingSection: React.FC = () => {
  const { lang, config } = useApp();
  const t = UI_TEXTS[lang];
  const copy = config.homeSectionCopy.pricing[lang];
  const previewPlans = config.plans.slice(0, 3);

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
          {previewPlans.map((plan) => {
            const tr = plan.translations[lang];
            const isFeatured = plan.isPopular;
            return (
              <div key={plan.id} className={styles.cardWrap}>
                {isFeatured ? <span className={styles.badge}>{copy.popularBadge}</span> : null}
                <div
                  className={`${styles.card} ${isFeatured ? styles.cardFeatured : ''}`}
                >
                  <h3 className={styles.planName}>{tr.name}</h3>
                  <p className={styles.price}>
                    {t.currency}
                    {plan.price}
                  </p>
                  <ul className={styles.list}>
                    {tr.features.slice(0, 5).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className={styles.orderBtn}>
                    {copy.orderNow}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <Link to="/pricing" className={styles.seeAll}>
          {copy.seeAll}
        </Link>
      </div>
    </section>
  );
};

export default PricingSection;
