import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LocalizedLink, LocalizedNavigate } from '../components/LocalizedLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useApp } from '../context/AppContext';
import FictionalDataOverlay from '../components/FictionalDataOverlay';
import { getTechIcon } from '../utils/techIconMap';
import styles from './ProjectDetailPage.module.css';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const { lang, config, isRTL } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryPrevRef = useRef<HTMLButtonElement>(null);
  const galleryNextRef = useRef<HTMLButtonElement>(null);

  const project = config.portfolio.find((p) => p.id === id);
  if (!project) return <LocalizedNavigate to="/portfolio" replace />;

  const t = project.translations[lang];

  const backText =
    lang === 'ar' ? 'رجوع لكل المشاريع' : lang === 'nl' ? 'Terug naar alle projecten' : 'Back to all projects';
  const challengeTitle = lang === 'ar' ? 'التحدي' : lang === 'nl' ? 'Uitdaging' : 'Challenge';
  const solutionTitle = lang === 'ar' ? 'الحل' : lang === 'nl' ? 'Oplossing' : 'Solution';
  const techTitle = lang === 'ar' ? 'التقنيات المستخدمة' : lang === 'nl' ? 'Gebruikte technologieën' : 'Technologies';
  const galleryTitle = lang === 'ar' ? 'معرض الصور' : lang === 'nl' ? 'Galerij' : 'Gallery';
  const visitLive =
    lang === 'ar' ? 'زيارة الموقع المباشر' : lang === 'nl' ? 'Bezoek de live website' : 'Visit Live Website';
  const ctaText =
    lang === 'ar'
      ? 'عندك مشروع مشابه؟ تواصل معنا'
      : lang === 'nl'
      ? 'Heb je een vergelijkbaar project? Neem contact op'
      : 'Have a similar project? Contact us';
  const contactBtn = lang === 'ar' ? 'تواصل معنا' : lang === 'nl' ? 'Neem contact op' : 'Contact Us';
  const closeLightboxLabel =
    lang === 'ar' ? 'إغلاق معاينة الصورة' : lang === 'nl' ? 'Afbeelding sluiten' : 'Close image preview';
  const galleryPrevLabel = lang === 'ar' ? 'السابق' : lang === 'nl' ? 'Vorige' : 'Previous';
  const galleryNextLabel = lang === 'ar' ? 'التالي' : lang === 'nl' ? 'Volgende' : 'Next';

  const heroSrc = project.heroImage ?? project.coverImage;
  const showChallengeSolution = Boolean(t.challenge || t.solution);
  const technologies = project.technologies?.filter(Boolean) ?? [];
  const galleryImages = project.galleryImages?.filter(Boolean) ?? [];

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroMedia}>
            <img src={heroSrc} alt="" loading="eager" decoding="async" />
            <div className={styles.heroOverlay} aria-hidden />
            {project.hasFictionalData ? <FictionalDataOverlay size="large" /> : null}
          </div>

          <div className={styles.heroContent}>
            {project.logoImage ? (
              <div className={styles.logoWrap}>
                <img src={project.logoImage} alt="" className={styles.logo} loading="lazy" />
                {project.hasFictionalData ? <FictionalDataOverlay size="small" /> : null}
              </div>
            ) : null}
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{t.title}</h1>
              <span className={styles.categoryBadge}>{t.category}</span>
            </div>
            <p className={styles.heroIntro}>{t.shortDescription}</p>
          </div>
        </div>

        <div className={styles.topNav}>
          <LocalizedLink to="/portfolio" className={styles.backLink}>
            <i className={`fa-solid fa-chevron-${lang === 'ar' ? 'right' : 'left'}`} aria-hidden />
            {backText}
          </LocalizedLink>
          <span className={styles.statusBadge}>{t.statusLabel}</span>
        </div>

        {showChallengeSolution ? (
          <section className={`${styles.section} ${styles.twoCol}`}>
            {t.challenge ? (
              <div>
                <h2 className={styles.sectionTitle}>{challengeTitle}</h2>
                <p className={styles.paragraph}>{t.challenge}</p>
              </div>
            ) : (
              <div />
            )}
            {t.solution ? (
              <div>
                <h2 className={styles.sectionTitle}>{solutionTitle}</h2>
                <p className={styles.paragraph}>{t.solution}</p>
              </div>
            ) : (
              <div />
            )}
          </section>
        ) : null}

        {technologies.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{techTitle}</h2>
            <div className={styles.chips}>
              {technologies.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span key={tech} className={styles.chip}>
                    {Icon ? <Icon className={styles.chipIcon} aria-hidden /> : null}
                    {tech}
                  </span>
                );
              })}
            </div>
          </section>
        ) : null}

        {galleryImages.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{galleryTitle}</h2>
            <div className={styles.gallerySwiperOuter}>
              <button
                ref={galleryPrevRef}
                type="button"
                className={`${styles.galleryNavBtn} ${styles.galleryNavPrev}`}
                aria-label={galleryPrevLabel}
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
                  {galleryImages.map((src) => (
                    <SwiperSlide key={src}>
                      <button
                        type="button"
                        className={styles.gallerySlideBtn}
                        onClick={() => setSelectedImage(src)}
                        aria-label={galleryTitle}
                      >
                        <img src={src} alt="" loading="lazy" decoding="async" />
                        {project.hasFictionalData ? <FictionalDataOverlay size="small" /> : null}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button
                ref={galleryNextRef}
                type="button"
                className={`${styles.galleryNavBtn} ${styles.galleryNavNext}`}
                aria-label={galleryNextLabel}
              >
                <i className={`fa-solid ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`} aria-hidden />
              </button>
            </div>
          </section>
        ) : null}

        <div className={styles.section}>
          <div className={styles.actions}>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                {visitLive}
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>{ctaText}</p>
          <LocalizedLink to="/contact" className={styles.ghostBtn}>
            {contactBtn}
          </LocalizedLink>
        </div>
      </div>

      {selectedImage ? (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={closeLightboxLabel}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label={closeLightboxLabel}
            onClick={() => setSelectedImage(null)}
          >
            <i className="fa-solid fa-xmark" aria-hidden />
          </button>
          <div
            className={styles.lightboxImageWrap}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage} alt="" className={styles.lightboxImage} />
            {project.hasFictionalData ? <FictionalDataOverlay size="large" /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetailPage;
