import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './Testimonials.module.css';

const Testimonials: React.FC = () => {
  const { lang, config } = useApp();
  const copy = config.homeSectionCopy.testimonials[lang];

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <h2 id="testimonials-heading" className={styles.title}>
          {copy.titleBefore}
          <span className={styles.highlight}>{copy.titleHighlight}</span>
          {copy.titleAfter}
        </h2>
        <div className={styles.grid}>
          {config.testimonials.map((item, idx) => {
            const tr = item.translations[lang];
            return (
              <article key={idx} className={styles.card}>
                <div className={styles.head}>
                  <div
                    className={`${styles.avatar} ${item.image ? styles.avatarImage : ''}`}
                    aria-hidden
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className={styles.avatarPhoto}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      item.initials
                    )}
                  </div>
                  <div className={styles.meta}>
                    <p className={styles.name}>{tr.name}</p>
                    <p className={styles.role}>{tr.role}</p>
                  </div>
                </div>
                <p className={styles.quote}>{tr.quote}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
