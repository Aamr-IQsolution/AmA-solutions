/**
 * قسم الفريق: مقدمة، مبادئ العمل، وتقنيات نتقنها.
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import { UI_TEXTS } from '../constants';
import { getTechIcon } from '../utils/techIconMap';
import styles from './Team.module.css';
import type { Language, SectionContent } from '../types';

const emptyHeader: Record<Language, SectionContent> = {
  en: { title: '', highlight: '' },
  ar: { title: '', highlight: '' },
  nl: { title: '', highlight: '' },
};

const TEAM_TECH_NAMES = [
  'React',
  'TypeScript',
  'Next.js',
  'Supabase',
  'Tailwind CSS',
  'Vercel',
] as const;

const Team: React.FC = () => {
  const { lang, config } = useApp();
  const texts = UI_TEXTS[lang];
  const principles = config.workPrinciples ?? [];
  const header = config.teamHeader ?? emptyHeader;
  const h = header[lang];
  const intro = config.teamIntro?.[lang] ?? '';

  return (
    <section id="team" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader title={h.title} highlight={h.highlight} />
        {intro ? <p className={styles.intro}>{intro}</p> : null}

        <h3 className={styles.subheading}>{texts.workPrinciplesTitle}</h3>
        <div className={styles.grid}>
          {principles.map((principle) => {
            const { title, description } = principle.translations[lang];
            return (
              <div key={principle.id} className={styles.card}>
                <div className={styles.iconWrap} aria-hidden>
                  <i className={`fa-solid ${principle.icon}`} />
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>{title}</h4>
                  <p className={styles.description}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className={styles.subheading}>{texts.teamTechTitle}</h3>
        <div className={styles.chips}>
          {TEAM_TECH_NAMES.map((tech) => {
            const Icon = getTechIcon(tech);
            return (
              <span key={tech} className={styles.chip}>
                {Icon ? <Icon className={styles.chipIcon} aria-hidden /> : null}
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
