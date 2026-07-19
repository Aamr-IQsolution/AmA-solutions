import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import {
  clearGoogleAnalytics,
  getStoredConsent,
  loadGoogleAnalytics,
  persistConsent,
  type ConsentStatus,
} from '../utils/cookieConsent';
import styles from './CookieConsent.module.css';

const CookieConsent: React.FC = () => {
  const { lang, isRTL } = useApp();
  const texts = UI_TEXTS[lang];
  const [consent, setConsent] = useState<ConsentStatus>(() => getStoredConsent());

  useEffect(() => {
    if (consent === 'all') {
      loadGoogleAnalytics();
    }
  }, [consent]);

  const handleConsent = (value: 'all' | 'essential') => {
    persistConsent(value);
    if (value === 'essential') {
      clearGoogleAnalytics();
    }
    setConsent(value);
  };

  if (consent !== null) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label={texts.cookieConsentMessage}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={styles.inner}>
        <p className={styles.message}>{texts.cookieConsentMessage}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.acceptBtn}
            onClick={() => handleConsent('all')}
          >
            {texts.cookieConsentAccept}
          </button>
          <button
            type="button"
            className={styles.essentialBtn}
            onClick={() => handleConsent('essential')}
          >
            {texts.cookieConsentEssential}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
