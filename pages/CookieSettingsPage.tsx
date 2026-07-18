import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';
import { getStoredConsent, persistConsent } from '../utils/cookieConsent';

const CookieSettingsPage: React.FC = () => {
  const { lang, isRTL } = useApp();
  const meta = PAGE_META.cookieSettings[lang];
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    () => getStoredConsent() === 'all',
  );

  const savePreferences = () => {
    persistConsent(analyticsEnabled ? 'all' : 'essential');
    window.location.reload();
  };

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/cookie-settings" />
      <PageHero
        eyebrow={
          lang === 'ar' ? 'الخصوصية' : lang === 'nl' ? 'Privacy' : 'Privacy'
        }
        title={
          lang === 'ar'
            ? 'إعدادات الكوكيز'
            : lang === 'nl'
              ? 'Cookie-instellingen'
              : 'Cookie Settings'
        }
        subtitle={
          lang === 'ar'
            ? 'اختر أنواع الكوكيز التي تسمح بها على هذا الموقع. يمكنك تغيير تفضيلاتك في أي وقت.'
            : lang === 'nl'
              ? 'Kies welke cookies u op deze website toestaat. U kunt uw voorkeuren op elk moment wijzigen.'
              : 'Choose which cookies you allow on this website. You can change your preferences at any time.'
        }
      />

      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '32px 20px 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 20,
            padding: '20px 0',
            borderBottom: '1px solid var(--ax-border, rgba(0,0,0,0.08))',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                margin: '0 0 8px',
                fontSize: 'var(--ax-font-h3, 16px)',
                fontWeight: 600,
              }}
            >
              {lang === 'ar'
                ? 'كوكيز أساسية'
                : lang === 'nl'
                  ? 'Essentiële cookies'
                  : 'Essential cookies'}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--ax-font-body, 14px)',
                color: 'var(--ax-text-muted, #666)',
                lineHeight: 1.55,
              }}
            >
              {lang === 'ar'
                ? 'ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن إيقافها.'
                : lang === 'nl'
                  ? 'Noodzakelijk voor het correct functioneren van de website en kunnen niet worden uitgeschakeld.'
                  : 'Required for the website to function correctly and cannot be turned off.'}
            </p>
          </div>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              opacity: 0.7,
              cursor: 'not-allowed',
              paddingTop: 2,
            }}
          >
            <input type="checkbox" checked disabled aria-label={
              lang === 'ar'
                ? 'كوكيز أساسية مفعّلة دائماً'
                : lang === 'nl'
                  ? 'Essentiële cookies altijd ingeschakeld'
                  : 'Essential cookies always enabled'
            } />
          </label>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 20,
            padding: '20px 0',
            borderBottom: '1px solid var(--ax-border, rgba(0,0,0,0.08))',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                margin: '0 0 8px',
                fontSize: 'var(--ax-font-h3, 16px)',
                fontWeight: 600,
              }}
            >
              {lang === 'ar'
                ? 'كوكيز تحليلية (Google Analytics)'
                : lang === 'nl'
                  ? 'Analytische cookies (Google Analytics)'
                  : 'Analytics cookies (Google Analytics)'}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--ax-font-body, 14px)',
                color: 'var(--ax-text-muted, #666)',
                lineHeight: 1.55,
              }}
            >
              {lang === 'ar'
                ? 'تساعدنا على فهم كيفية استخدام الموقع وتحسين الأداء. اختيارية.'
                : lang === 'nl'
                  ? 'Helpen ons te begrijpen hoe de site wordt gebruikt en de prestaties te verbeteren. Optioneel.'
                  : 'Help us understand how the site is used and improve performance. Optional.'}
            </p>
          </div>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              cursor: 'pointer',
              paddingTop: 2,
            }}
          >
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              aria-label={
                lang === 'ar'
                  ? 'تفعيل كوكيز Google Analytics'
                  : lang === 'nl'
                    ? 'Google Analytics-cookies inschakelen'
                    : 'Enable Google Analytics cookies'
              }
            />
          </label>
        </div>

        <div style={{ marginTop: 28 }}>
          <button
            type="button"
            onClick={savePreferences}
            style={{
              appearance: 'none',
              border: 'none',
              borderRadius: 'var(--ax-radius-sm, 8px)',
              background: 'var(--ax-primary, #3b7cb8)',
              color: 'var(--ax-white, #fff)',
              fontSize: 'var(--ax-font-body, 14px)',
              fontWeight: 600,
              padding: '12px 22px',
              cursor: 'pointer',
            }}
          >
            {lang === 'ar'
              ? 'حفظ التفضيلات'
              : lang === 'nl'
                ? 'Voorkeuren opslaan'
                : 'Save preferences'}
          </button>
        </div>
      </section>
    </>
  );
};

export default CookieSettingsPage;
