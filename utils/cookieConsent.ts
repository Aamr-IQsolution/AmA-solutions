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

function deleteCookie(name: string, domain?: string): void {
  const domainPart = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`;
}

/** Remove GA cookies and revoke analytics consent when user chooses essential-only. */
export function clearGoogleAnalytics(): void {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  } catch {
    /* ignore */
  }

  window.__gaLoaded = false;

  const host = window.location.hostname;
  const rootDomain = host.includes('.') ? `.${host.split('.').slice(-2).join('.')}` : undefined;
  const cookieNames = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter(Boolean);

  for (const name of cookieNames) {
    if (
      name === '_ga' ||
      name === '_gid' ||
      name === '_gat' ||
      name.startsWith('_ga_') ||
      name.startsWith('_gat_')
    ) {
      deleteCookie(name);
      if (rootDomain) deleteCookie(name, rootDomain);
      deleteCookie(name, `.${host}`);
    }
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
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
