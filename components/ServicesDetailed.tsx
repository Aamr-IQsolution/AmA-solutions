/**
 * صفحة الخدمات الموسّعة — /services
 */
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useApp } from '../context/AppContext';
import { Language, Service } from '../types';
import styles from './ServicesDetailed.module.css';

const MOBILE_NAV_QUERY = '(max-width: 1023px)';

const useIsMobileNav = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_NAV_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return isMobile;
};

const scrollToService = (e: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
  const target = document.getElementById(`service-${serviceId}`);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `/services#service-${serviceId}`);
};

const useRevealOnScroll = (threshold = 0.12) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
};

interface NavIconLinkProps {
  service: Service;
  lang: Language;
}

const NavIconLink: React.FC<NavIconLinkProps> = ({ service, lang }) => (
  <a
    href={`#service-${service.id}`}
    className={styles.navIcon}
    title={service.translations[lang].name}
    onClick={(e) => scrollToService(e, service.id)}
  >
    <i className={`fa-solid ${service.icon}`} aria-hidden />
    <span className={styles.srOnly}>{service.translations[lang].name}</span>
  </a>
);

interface ServiceBlockProps {
  service: Service;
  index: number;
  lang: Language;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({ service, index, lang }) => {
  const tr = service.translations[lang];
  const { ref, visible } = useRevealOnScroll();
  const displayNum = String(index + 1).padStart(2, '0');
  const isReversed = index % 2 === 1;

  return (
    <article
      ref={ref}
      id={`service-${service.id}`}
      className={`${styles.block} ${visible ? styles.blockVisible : ''} ${
        isReversed ? styles.blockReversed : ''
      }`}
    >
      <div className={styles.blockInner}>
        <div className={`${styles.visualCol} ${visible ? styles.revealIcon : ''}`}>
          <span className={styles.serviceNum} aria-hidden>
            {displayNum}
          </span>
          <div className={styles.iconLarge}>
            <i className={`fa-solid ${service.icon}`} aria-hidden />
          </div>
        </div>

        <div className={`${styles.contentCol} ${visible ? styles.revealContent : ''}`}>
          <h2 className={styles.serviceName}>{tr.name}</h2>
          <p className={styles.serviceDesc}>{tr.description}</p>
          <p className={styles.expertDetails}>{tr.expertDetails}</p>

          <ul className={`${styles.highlights} ${visible ? styles.revealHighlights : ''}`}>
            {tr.highlights.map((item, i) => (
              <li key={i} className={styles.highlightItem}>
                <i className={`fa-solid ${item.icon} ${styles.highlightIcon}`} aria-hidden />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

const ServicesDetailed: React.FC = () => {
  const { lang, config, isRTL } = useApp();
  const isMobileNav = useIsMobileNav();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const prevLabel = lang === 'ar' ? 'السابق' : lang === 'nl' ? 'Vorige' : 'Previous';
  const nextLabel = lang === 'ar' ? 'التالي' : lang === 'nl' ? 'Volgende' : 'Next';

  return (
    <section className={styles.section} aria-label="Detailed services">
      <nav className={styles.stickyNav} aria-label="Service quick navigation">
        {isMobileNav ? (
          <div className={styles.stickyNavSwiperOuter}>
            <button
              ref={prevRef}
              type="button"
              className={styles.navBtn}
              aria-label={prevLabel}
            >
              <i
                className={`fa-solid ${isRTL ? 'fa-chevron-right' : 'fa-chevron-left'}`}
                aria-hidden
              />
            </button>

            <div className={styles.stickyNavSwiper}>
              <Swiper
                key={lang}
                dir={isRTL ? 'rtl' : 'ltr'}
                modules={[Navigation, A11y]}
                grabCursor
                spaceBetween={10}
                slidesPerView={4.5}
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
                {config.services.map((service) => (
                  <SwiperSlide key={service.id} className={styles.navSlide}>
                    <NavIconLink service={service} lang={lang} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              ref={nextRef}
              type="button"
              className={styles.navBtn}
              aria-label={nextLabel}
            >
              <i
                className={`fa-solid ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`}
                aria-hidden
              />
            </button>
          </div>
        ) : (
          <div className={styles.stickyNavInner}>
            {config.services.map((service) => (
              <NavIconLink key={service.id} service={service} lang={lang} />
            ))}
          </div>
        )}
      </nav>

      <div className={styles.blocks}>
        {config.services.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} lang={lang} />
        ))}
      </div>
    </section>
  );
};

export default ServicesDetailed;
