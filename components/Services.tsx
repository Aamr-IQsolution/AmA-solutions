/**
 * قسم الخدمات في الصفحة الرئيسية — سلايدر full-bleed.
 */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useApp } from '../context/AppContext';
import { useSwiperNavigation } from '../hooks/useSwiperNavigation';
import { Service } from '../types';
import styles from './Services.module.css';

const Services: React.FC = () => {
  const { lang, config, isRTL } = useApp();
  const { prevRef, nextRef, onSwiper } = useSwiperNavigation();

  const renderTitle = () => {
    const header = config.servicesHeader[lang];
    const fullTitle = header.title;
    const highlight = header.highlight;

    if (highlight && fullTitle.includes(highlight)) {
      const parts = fullTitle.split(highlight);
      return (
        <>
          {parts[0]}
          <span className={styles.highlightHome}>{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return fullTitle;
  };

  const renderSlide = (service: Service) => {
    const tr = service.translations[lang];
    return (
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <i className={`fa-solid ${service.icon}`} aria-hidden />
        </div>
        <h3 className={styles.name}>{tr.name}</h3>
        <p className={styles.desc}>{tr.description}</p>
      </div>
    );
  };

  return (
    <section id="services" className={styles.sectionHome}>
      <div className={styles.innerHome}>
        <div className={styles.headHome}>
          <h2 className={styles.titleHome}>{renderTitle()}</h2>
          <div className={styles.ruleHome} />
        </div>
      </div>

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
            roundLengths={true}
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 18 },
              900: { slidesPerView: 2.4, spaceBetween: 20 },
              1200: { slidesPerView: 3.2, spaceBetween: 22 },
            }}
            onSwiper={onSwiper}
          >
            {config.services.map((service) => (
              <SwiperSlide key={service.id}>{renderSlide(service)}</SwiperSlide>
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
};

export default Services;
