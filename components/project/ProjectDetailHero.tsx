import React from 'react';
import FictionalDataOverlay from '../FictionalDataOverlay';
import type { Project } from '../../types';
import type { Language } from '../../types';
import styles from '../../pages/ProjectDetailPage.module.css';

type Props = {
  project: Project;
  lang: Language;
  title: string;
  category: string;
  shortDescription: string;
};

const ProjectDetailHero: React.FC<Props> = ({
  project,
  title,
  category,
  shortDescription,
}) => {
  const heroSrc = project.heroImage ?? project.coverImage;

  return (
    <div className={styles.hero}>
      <div className={styles.heroMedia}>
        <img src={heroSrc} alt="" loading="eager" decoding="async" />
        <div className={styles.heroOverlay} aria-hidden />
        {project.hasFictionalData ? <FictionalDataOverlay size="large" /> : null}
      </div>

      <div className={styles.heroContent}>
        {project.logoImage ? (
          <div className={styles.logoWrap}>
            <img src={project.logoImage} alt="" className={styles.logo} loading="lazy" />
            {project.hasFictionalData ? <FictionalDataOverlay size="small" /> : null}
          </div>
        ) : null}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.categoryBadge}>{category}</span>
        </div>
        <p className={styles.heroIntro}>{shortDescription}</p>
      </div>
    </div>
  );
};

export default ProjectDetailHero;
