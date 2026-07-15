/**
 * قسم معرض الأعمال (Portfolio Section).
 */
import React, { useRef } from 'react';
import { LocalizedLink } from './LocalizedLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import FictionalDataOverlay from './FictionalDataOverlay';
import styles from './Portfolio.module.css';

type PortfolioLayout = 'slider' | 'grid';

interface PortfolioProps {
  layout?: PortfolioLayout;
}

const Portfolio: React.FC<PortfolioProps> = ({ layout = 'grid' }) => {
  const { lang, config, isRTL } = useApp();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const renderTitle = () => {
    const header = config.portfolioHeader[lang];
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

  const explore =
    lang === 'ar' ? 'اكتشف المشروع' : lang === 'nl' ? 'Ontdek het project' : 'Discover the project';

  const renderProjectCard = (project: Project) => {
    const title = project.translations[lang].title;
    const linkAria = `${explore}: ${title}`;

    return (
      <article className={styles.card}>
        <LocalizedLink to={`/portfolio/${project.id}`} className={styles.media} aria-label={linkAria}>
          <img
            src={project.coverImage}
            alt=""
            className={styles.img}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.overlay} aria-hidden />
          {project.hasFictionalData ? <FictionalDataOverlay size="small" /> : null}
          <div className={`${styles.body} ${project.hasFictionalData ? styles.bodyWithFictional : ''}`}>
            <span className={styles.badge}>{project.translations[lang].category}</span>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{project.translations[lang].shortDescription}</p>
            <span className={styles.cta}>
              {explore}{' '}
              <i
                className={`fa-solid fa-chevron-${lang === 'ar' ? 'left' : 'right'} ${styles.ctaIcon}`}
                aria-hidden
              />
            </span>
          </div>
        </LocalizedLink>
      </article>
    );
  };

  const headerBlock = (
    <div className={styles.header}>
      <h2 className={styles.title}>{renderTitle()}</h2>
      <p className={styles.desc}>{config.portfolioHeader[lang].description}</p>
    </div>
  );

  if (layout === 'slider') {
    return (
      <section id="portfolio" className={styles.section}>
        <div className={styles.inner}>{headerBlock}</div>

        <div className={styles.swiperOuter}>
          <button
            ref={prevRef}
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            aria-label={lang === 'ar' ? 'السابق' : lang === 'nl' ? 'Vorige' : 'Previous'}
          >
            <i className={`fa-solid ${isRTL ? 'fa-chevron-right' : 'fa-chevron-left'}`} aria-hidden />
          </button>

          <div className={styles.swiperWrap}>
            <Swiper
              key={lang}
              dir={isRTL ? 'rtl' : 'ltr'}
              modules={[Navigation, A11y]}
              grabCursor
              spaceBetween={18}
              slidesPerView={1.15}
              breakpoints={{
                640: { slidesPerView: 1.6, spaceBetween: 18 },
                900: { slidesPerView: 2.4, spaceBetween: 20 },
                1200: { slidesPerView: 3.2, spaceBetween: 22 },
              }}
              onBeforeInit={(swiper: SwiperType) => {
                if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              onInit={(swiper: SwiperType) => {
                if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
            >
              {config.portfolio.map((project) => (
                <SwiperSlide key={project.id}>{renderProjectCard(project)}</SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            ref={nextRef}
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            aria-label={lang === 'ar' ? 'التالي' : lang === 'nl' ? 'Volgende' : 'Next'}
          >
            <i className={`fa-solid ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`} aria-hidden />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        {headerBlock}
        <div className={styles.grid}>
          {config.portfolio.map((project) => (
            <React.Fragment key={project.id}>{renderProjectCard(project)}</React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
