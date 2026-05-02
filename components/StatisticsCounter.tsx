import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './StatisticsCounter.module.css';

const DURATION_MS = 2000;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const StatisticsCounter: React.FC = () => {
  const { lang, config } = useApp();
  const stats = config.stats;
  const labels = stats.translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({ projects: 0, clients: 0 });
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const targets = { projects: stats.projects, clients: stats.clients };

      const tick = (now: number) => {
        const raw = Math.min(1, (now - start) / DURATION_MS);
        const eased = easeOutCubic(raw);
        setCounts({
          projects: Math.round(targets.projects * eased),
          clients: Math.round(targets.clients * eased),
        });
        if (raw < 1) {
          requestAnimationFrame(tick);
        } else {
          setCounts(targets);
        }
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stats.projects, stats.clients]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Statistics">
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.value}>{counts.projects}</p>
          <p className={styles.label}>{labels.projectsLabel}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{counts.clients}</p>
          <p className={styles.label}>{labels.clientsLabel}</p>
        </div>
      </div>
    </section>
  );
};

export default StatisticsCounter;
