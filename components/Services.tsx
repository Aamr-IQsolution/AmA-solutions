/**
 * قسم الخدمات (Services Section).
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './Services.module.css';

const Services: React.FC = () => {
  const { lang, config } = useApp();
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const expertLabel =
    lang === 'ar' ? 'حلول الخبراء' : lang === 'nl' ? 'Expertoplossingen' : 'Expert Solutions';

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

  const toggleDetails = (id: string) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  return (
    <section id="services" className={styles.sectionHome}>
      <div className={styles.innerHome}>
        <div className={styles.headHome}>
          <h2 className={styles.titleHome}>{renderTitle()}</h2>
          <div className={styles.ruleHome} />
        </div>

        <div className={styles.gridHome}>
          {config.services.map((service) => {
            const open = openServiceId === service.id;
            return (
              <div
                key={service.id}
                className={`${styles.cardHome} ${open ? styles.cardHomeOpen : ''}`}
              >
                <div className={styles.iconHome}>
                  <i className={`fa-solid ${service.icon}`} aria-hidden />
                </div>
                <h3 className={styles.nameHome}>{service.translations[lang].name}</h3>
                <p className={styles.descHome}>{service.translations[lang].description}</p>

                <div className={styles.expertToggle}>
                  <button
                    type="button"
                    onClick={() => toggleDetails(service.id)}
                    className={styles.toggleBtn}
                  >
                    <span className={styles.toggleLabel}>{expertLabel}</span>
                    <i
                      className={`fa-solid fa-chevron-down ${styles.chevron} ${
                        open ? styles.chevronOpen : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                    <div
                      className={`${styles.detailsShell} ${
                        open ? styles.detailsShellOpen : styles.detailsShellClosed
                      }`}
                    >
                      <div className={styles.detailsInner}>
                        <div className={styles.panelHome}>
                          <div className={styles.panelRule} />
                          {service.translations[lang].expertDetails}
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
