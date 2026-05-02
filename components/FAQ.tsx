import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './FAQ.module.css';

const FAQ: React.FC = () => {
  const { lang, config } = useApp();
  const copy = config.homeSectionCopy.faq[lang];

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.title}>
          {copy.titleBefore}
          <span className={styles.highlight}>{copy.titleHighlight}</span>
          {copy.titleAfter}
        </h2>
        {config.faqs.map((faq, idx) => {
          const { question, answer } = faq.translations[lang];
          return (
            <details key={idx} className={styles.details}>
              <summary className={styles.summary}>
                {question}
                <span className={styles.iconPlus} aria-hidden>
                  +
                </span>
              </summary>
              <p className={styles.answer}>{answer}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
