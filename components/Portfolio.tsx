/**
 * قسم معرض الأعمال (Portfolio Section).
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './Portfolio.module.css';

const Portfolio: React.FC = () => {
  const { lang, config } = useApp();

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

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{renderTitle()}</h2>
          <p className={styles.desc}>{config.portfolioHeader[lang].description}</p>
        </div>

        <div className={styles.grid}>
          {config.portfolio.map((project) => {
            const title = project.translations[lang].title;
            const linkAria = project.link ? `${explore}: ${title}` : undefined;

            const inner = (
              <>
                <img
                  src={project.image}
                  alt=""
                  className={styles.img}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.overlay} aria-hidden />
                <div className={styles.body}>
                  <span className={styles.badge}>{project.category}</span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{project.translations[lang].description}</p>
                  {project.link ? (
                    <span className={styles.cta}>
                      {explore}{' '}
                      <i
                        className={`fa-solid fa-chevron-${lang === 'ar' ? 'left' : 'right'} ${styles.ctaIcon}`}
                        aria-hidden
                      />
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <article key={project.id} className={styles.card}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.media}
                    aria-label={linkAria}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={styles.media}>{inner}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
