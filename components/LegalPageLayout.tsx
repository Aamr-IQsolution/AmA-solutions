import React from 'react';
import { useApp } from '../context/AppContext';
import type { LegalSection } from '../content/legalPages';

interface LegalPageLayoutProps {
  pageTitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  pageTitle,
  lastUpdated,
  sections,
}) => {
  const { lang, isRTL } = useApp();

  const lastUpdatedLabel =
    lang === 'ar' ? 'آخر تحديث' : lang === 'nl' ? 'Laatst bijgewerkt' : 'Last updated';
  const tocLabel =
    lang === 'ar' ? 'المحتويات' : lang === 'nl' ? 'Inhoudsopgave' : 'Contents';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '32px 20px 72px',
      }}
    >
      <p
        style={{
          margin: '0 0 8px',
          fontSize: 13,
          color: 'var(--ax-text-muted, #666)',
        }}
      >
        {pageTitle}
      </p>

      {lastUpdated ? (
        <p
          style={{
            margin: '0 0 28px',
            fontSize: 13,
            color: 'var(--ax-text-muted, #666)',
          }}
        >
          {lastUpdatedLabel}: {lastUpdated}
        </p>
      ) : (
        <div style={{ marginBottom: 28 }} />
      )}

      {sections.length > 0 ? (
        <nav
          aria-label={tocLabel}
          style={{
            marginBottom: 40,
            padding: '16px 18px',
            borderRadius: 'var(--ax-radius-sm, 8px)',
            background: 'var(--ax-stats-bg, rgba(59, 124, 184, 0.08))',
            border: '1px solid var(--ax-stats-border, rgba(59, 124, 184, 0.2))',
          }}
        >
          <p
            style={{
              margin: '0 0 10px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--ax-text-muted, #666)',
            }}
          >
            {tocLabel}
          </p>
          <ol
            style={{
              margin: 0,
              paddingInlineStart: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {sections.map((section) => (
              <li key={section.id} style={{ fontSize: 14, lineHeight: 1.4 }}>
                <a
                  href={`#${section.id}`}
                  style={{
                    color: 'var(--ax-primary-dark, #2d5f8f)',
                    textDecoration: 'none',
                  }}
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ scrollMarginTop: 96 }}>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: 'var(--ax-font-h3, 16px)',
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              {section.heading}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--ax-font-body, 14px)',
                lineHeight: 1.7,
                color: 'var(--ax-text-body, #444)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalPageLayout;
