import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import ThreeDBackground from './ThreeDBackground';
import styles from './HomeHero.module.css';

const HomeHero: React.FC = () => {
  const { lang, isRTL, config } = useApp();
  const hero = config.hero[lang];
  const t = UI_TEXTS[lang];
  const heroPhotoAlt =
    lang === 'ar'
      ? 'عامر العواد مع فريق العمل'
      : lang === 'nl'
        ? 'Aamr Al-Awwad met het team'
        : 'Aamr Al-Awwad with team members';

  return (
    <section
      className={`${styles.section} ${isRTL ? styles.sectionRtl : ''}`}
      aria-label="Hero"
    >
      <div className={styles.bgPhoto}>
        <img
          src="/assets/Aamr-with-agroup-op-workers.png"
          alt={heroPhotoAlt}
          className={styles.bgPhotoImg}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={2304}
          height={1728}
        />
      </div>
      <ThreeDBackground speed={0.015} scrollReact={false} style={{ opacity: 0.35, zIndex: 1 }} />
      <div
        className={`${styles.overlay} ${isRTL ? styles.overlayRtl : ''}`}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <div className={`${styles.layout} ${isRTL ? styles.rtl : ''}`}>
          <div className={styles.textBackground}>
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
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
