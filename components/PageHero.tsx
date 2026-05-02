import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, subtitle }) => {
  const { isRTL } = useApp();

  return (
    <section className={styles.shell}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p
            className={`${styles.subtitle} ${isRTL ? styles.subtitleEnd : styles.subtitleStart}`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
