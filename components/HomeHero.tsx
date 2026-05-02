import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import ThreeDBackground from './ThreeDBackground';
import styles from './HomeHero.module.css';

const HomeHero: React.FC = () => {
  const { lang, config, isRTL } = useApp();
  const hero = config.hero[lang];
  const t = UI_TEXTS[lang];

  return (
    <section className={styles.section} aria-label="Hero">
      <ThreeDBackground mode="section" speed={0.0005} scrollReact={false} style={{ opacity: 0.3 }} />
      <div className={styles.inner}>
        <div className={`${styles.layout} ${isRTL ? styles.rtl : ''}`}>
          <div className={styles.colText}>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.subtitle}>{hero.subtitle}</p>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.btnPrimary}>
                {t.homeHeroPrimary}
              </Link>
              <Link to="/contact" className={styles.btnSecondary}>
                {t.homeHeroSecondary}
              </Link>
            </div>
          </div>
          <div className={styles.colVisual}>
            <div className={styles.mockWrap}>
              <img
                src="/assets/placeholder.svg"
                alt=""
                className={styles.mockImg}
                loading="lazy"
                width={640}
                height={480}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
