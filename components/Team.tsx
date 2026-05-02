/**
 * قسم فريق العمل (Team Section).
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import styles from './Team.module.css';
import type { Language, SectionContent } from '../types';

const emptyHeader: Record<Language, SectionContent> = {
  en: { title: '', highlight: '' },
  ar: { title: '', highlight: '' },
  nl: { title: '', highlight: '' },
};

const Team: React.FC = () => {
  const { lang, config } = useApp();
  const teamData = config.team ?? [];
  const header = config.teamHeader ?? emptyHeader;
  const h = header[lang];

  return (
    <section id="team" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader title={h.title} highlight={h.highlight} />
        <div className={styles.grid}>
          {teamData.map((member) => {
            const { name, title, bio } = member.translations[lang];
            return (
              <div key={member.id} className={styles.card}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatarGlow} aria-hidden />
                  <img
                    src={member.image}
                    alt={name}
                    className={styles.avatar}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.role}>{title}</p>
                  <p className={styles.bio}>{bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
