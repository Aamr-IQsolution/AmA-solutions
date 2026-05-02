import React from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  highlight: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, highlight, description }) => {
  const titleParts = title.split(highlight);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        {titleParts[0]}
        <span className={styles.highlight}>{highlight}</span>
        {titleParts[1]}
      </h2>
      {description ? <p className={styles.desc}>{description}</p> : null}
    </div>
  );
};

export default SectionHeader;
