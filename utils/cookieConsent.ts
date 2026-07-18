export const STORAGE_KEY = 'cookieConsent';

export type ConsentStatus = 'all' | 'essential' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

export function getStoredConsent(): ConsentStatus {
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

export function persistConsent(value: 'all' | 'essential'): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

export function loadGoogleAnalytics(): void {
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
