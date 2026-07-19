import React, { useEffect } from 'react';
import FictionalDataOverlay from '../FictionalDataOverlay';
import styles from '../../pages/ProjectDetailPage.module.css';

type Props = {
  src: string;
  closeLabel: string;
  hasFictionalData?: boolean;
  onClose: () => void;
};

const ProjectLightbox: React.FC<Props> = ({ src, closeLabel, hasFictionalData, onClose }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.lightboxBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={closeLabel}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.lightboxClose}
        aria-label={closeLabel}
        onClick={onClose}
      >
        <i className="fa-solid fa-xmark" aria-hidden />
      </button>
      <div
        className={styles.lightboxImageWrap}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={src} alt="" className={styles.lightboxImage} />
        {hasFictionalData ? <FictionalDataOverlay size="large" /> : null}
      </div>
    </div>
  );
};

export default ProjectLightbox;
