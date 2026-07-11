import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'cookieConsent';

type ConsentStatus = 'all' | 'essential' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

function getStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'all' || value === 'essential') return value;
    if (value === 'accepted') return 'all';
    if (value === 'rejected') return 'essential';
  } catch {
    /* private browsing / disabled storage */
  }
  return null;
}

function loadGoogleAnalytics(): void {
  const measurementId = (process.env.GA_MEASUREMENT_ID ?? '').trim();
  if (!measurementId || window.__gaLoaded) return;

  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

const CookieConsent: React.FC = () => {
  const { lang, isRTL } = useApp();
  const texts = UI_TEXTS[lang];
  const [consent, setConsent] = useState<ConsentStatus>(() => getStoredConsent());

  useEffect(() => {
    if (consent === 'all') {
      loadGoogleAnalytics();
    }
  }, [consent]);

  const persistConsent = (value: 'all' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
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
            onClick={() => persistConsent('all')}
          >
            {texts.cookieConsentAccept}
          </button>
          <button
            type="button"
            className={styles.essentialBtn}
            onClick={() => persistConsent('essential')}
          >
            {texts.cookieConsentEssential}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
