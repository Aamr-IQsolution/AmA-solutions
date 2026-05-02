import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './CTASection.module.css';

const CTASection: React.FC = () => {
  const { lang, config } = useApp();
  const copy = config.homeSectionCopy.cta[lang];

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <h2 id="cta-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.subtitle}>{copy.subtitle}</p>
        <Link to="/contact" className={styles.btn}>
          {copy.button}
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
