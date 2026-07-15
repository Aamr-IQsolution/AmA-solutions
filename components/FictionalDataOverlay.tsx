import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './FictionalDataOverlay.module.css';

const MESSAGES = {
  ar: '⚠️ جميع البيانات المعروضة تجريبية/وهمية للعرض فقط',
  en: '⚠️ All data shown is fictional/demo data for display purposes only',
  nl: '⚠️ Alle getoonde gegevens zijn fictief/demo-gegevens, uitsluitend ter illustratie',
} as const;

interface FictionalDataOverlayProps {
  size?: 'small' | 'large';
}

const FictionalDataOverlay: React.FC<FictionalDataOverlayProps> = ({ size = 'small' }) => {
  const { lang } = useApp();

  return (
    <div
      className={`${styles.overlay} ${size === 'large' ? styles.large : styles.small}`}
      role="note"
    >
      {MESSAGES[lang]}
    </div>
  );
};

export default FictionalDataOverlay;
