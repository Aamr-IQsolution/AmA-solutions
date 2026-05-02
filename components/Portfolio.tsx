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
    lang === 'ar' ? 'استكشاف المشروع' : lang === 'nl' ? 'Project bekijken' : 'Explore project';

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{renderTitle()}</h2>
          <p className={styles.desc}>{config.portfolioHeader[lang].description}</p>
        </div>

        <div className={styles.grid}>
          {config.portfolio.map((project) => {
            const ProjectWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link
              ? {
                  href: project.link,
                  target: '_blank' as const,
                  rel: 'noopener noreferrer' as const,
                }
              : {};

            return (
              <article key={project.id} className={styles.card}>
                <ProjectWrapper {...wrapperProps} className={styles.media}>
                  <img
                    src={project.image}
                    alt={project.translations[lang].title}
                    className={styles.img}
                    loading="lazy"
                  />
                  <div className={styles.overlay} aria-hidden />
                  <div className={styles.body}>
                    <span className={styles.badge}>{project.category}</span>
                    <h3 className={styles.cardTitle}>{project.translations[lang].title}</h3>
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
                </ProjectWrapper>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
