import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import FictionalDataOverlay from '../FictionalDataOverlay';
import styles from '../../pages/ProjectDetailPage.module.css';

type Props = {
  images: string[];
  isRTL: boolean;
  lang: string;
  title: string;
  prevLabel: string;
  nextLabel: string;
  hasFictionalData?: boolean;
  onSelectImage: (src: string) => void;
};

const ProjectDetailGallery: React.FC<Props> = ({
  images,
  isRTL,
  lang,
  title,
  prevLabel,
  nextLabel,
  hasFictionalData,
  onSelectImage,
}) => {
  const galleryPrevRef = useRef<HTMLButtonElement>(null);
  const galleryNextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.gallerySwiperOuter}>
        <button
          ref={galleryPrevRef}
          type="button"
          className={`${styles.galleryNavBtn} ${styles.galleryNavPrev}`}
          aria-label={prevLabel}
        >
          <i className={`fa-solid ${isRTL ? 'fa-chevron-right' : 'fa-chevron-left'}`} aria-hidden />
        </button>

        <div className={styles.gallerySwiperWrap}>
          <Swiper
            key={lang}
            dir={isRTL ? 'rtl' : 'ltr'}
            modules={[Navigation, A11y]}
            grabCursor
            spaceBetween={14}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 14 },
              900: { slidesPerView: 2.2, spaceBetween: 16 },
              1100: { slidesPerView: 2.6, spaceBetween: 16 },
            }}
            onBeforeInit={(swiper: SwiperType) => {
              if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                swiper.params.navigation.prevEl = galleryPrevRef.current;
                swiper.params.navigation.nextEl = galleryNextRef.current;
              }
            }}
            onInit={(swiper: SwiperType) => {
              if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                swiper.params.navigation.prevEl = galleryPrevRef.current;
                swiper.params.navigation.nextEl = galleryNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
          >
            {images.map((src) => (
              <SwiperSlide key={src}>
                <button
                  type="button"
                  className={styles.gallerySlideBtn}
                  onClick={() => onSelectImage(src)}
                  aria-label={title}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" />
                  {hasFictionalData ? <FictionalDataOverlay size="small" /> : null}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          ref={galleryNextRef}
          type="button"
          className={`${styles.galleryNavBtn} ${styles.galleryNavNext}`}
          aria-label={nextLabel}
        >
          <i className={`fa-solid ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`} aria-hidden />
        </button>
      </div>
    </section>
  );
};

export default ProjectDetailGallery;
