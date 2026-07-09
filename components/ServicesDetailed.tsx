/**
 * صفحة الخدمات الموسّعة — /services
 */
import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service } from '../types';
import styles from './ServicesDetailed.module.css';

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

interface ServiceBlockProps {
  service: Service;
  index: number;
  lang: 'en' | 'ar' | 'nl';
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
  const { lang, config } = useApp();

  return (
    <section className={styles.section} aria-label="Detailed services">
      <nav className={styles.stickyNav} aria-label="Service quick navigation">
        <div className={styles.stickyNavInner}>
          {config.services.map((service) => (
            <a
              key={service.id}
              href={`#service-${service.id}`}
              className={styles.navIcon}
              title={service.translations[lang].name}
              onClick={(e) => scrollToService(e, service.id)}
            >
              <i className={`fa-solid ${service.icon}`} aria-hidden />
              <span className={styles.srOnly}>{service.translations[lang].name}</span>
            </a>
          ))}
        </div>
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
