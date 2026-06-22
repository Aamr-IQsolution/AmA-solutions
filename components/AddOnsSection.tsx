import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { AddOn, Language } from '../types';
import styles from './AddOnsSection.module.css';

const SECTION_TITLES = {
  en: 'Add-On Services',
  ar: 'خدمات إضافية',
  nl: 'Extra Diensten',
} as const;

const PERIOD_SUFFIXES: Record<
  Language,
  Record<'year' | 'month', string>
> = {
  en: { year: '/yr', month: '/mo' },
  ar: { year: '/سنة', month: '/شهر' },
  nl: { year: '/jaar', month: '/mnd' },
};

const getPeriodSuffix = (lang: Language, period?: AddOn['period']) => {
  if (period === 'year' || period === 'month') {
    return PERIOD_SUFFIXES[lang][period];
  }
  return '';
};

const AddOnsSection: React.FC = () => {
  const { lang, config, isRTL } = useApp();
  const t = UI_TEXTS[lang];

  const renderCard = (addon: (typeof config.addOns)[number]) => {
    const tr = addon.translations[lang];
    const periodSuffix = getPeriodSuffix(lang, addon.period);

    return (
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <i className={`fa-solid ${addon.icon}`} aria-hidden />
        </div>
        <h3 className={styles.name}>{tr.name}</h3>
        {addon.duration ? <p className={styles.duration}>{addon.duration}</p> : null}
        <p className={styles.description}>{tr.description}</p>
        <p className={styles.price}>
          {t.currency}
          {addon.price}
          {periodSuffix}
        </p>
      </div>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="addons-heading">
      <div className={styles.inner}>
        <h2 id="addons-heading" className={styles.title}>
          {SECTION_TITLES[lang]}
        </h2>

        <div className={styles.grid}>
          {config.addOns.map((addon) => (
            <div key={addon.id}>{renderCard(addon)}</div>
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
            {config.addOns.map((addon) => (
              <SwiperSlide key={addon.id}>{renderCard(addon)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
