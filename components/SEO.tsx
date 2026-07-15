import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../context/AppContext';
import { PAGE_META, SITE_URL } from '../constants';
import { Language } from '../types';
import { SUPPORTED_LANGS } from '../utils/localizePath';

const OG_LOCALE: Record<Language, string> = {
  nl: 'nl_NL',
  en: 'en_US',
  ar: 'ar_AR',
};

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

function buildPageUrl(lang: Language, path: string): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${lang}${normalized}`;
}

/**
 * React 19 hoists Helmet tags into <head> without removing the static
 * title/description fallbacks from index.html — prune stale duplicates.
 */
function pruneStaticHeadFallbacks(title: string, description: string) {
  document.querySelectorAll('head > title').forEach((el) => {
    if (el.textContent !== title) el.remove();
  });
  document.querySelectorAll('head > meta[name="description"]').forEach((el) => {
    if (el.getAttribute('content') !== description) el.remove();
  });
}

interface SEOProps {
  title: string;
  description: string;
  /** Path without language prefix, e.g. `/` or `/services` or `/portfolio/alasaylf` */
  path: string;
  /** Absolute or site-relative image URL for Open Graph / Twitter */
  image?: string;
  /** When true, injects ProfessionalService JSON-LD (Home + Contact only). */
  includeOrganizationSchema?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image,
  includeOrganizationSchema = false,
}) => {
  const { lang, config } = useApp();
  const canonical = buildPageUrl(lang, path);
  const ogImage = toAbsoluteUrl(image ?? config.logo);

  const organizationSchema = includeOrganizationSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'AxonXcode',
        image: toAbsoluteUrl(config.logo),
        url: SITE_URL,
        telephone: config.phone,
        email: config.contactEmail,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Heerlen',
          addressCountry: 'NL',
        },
        areaServed: ['Heerlen', 'Maastricht', 'Zuid-Limburg', 'Netherlands'],
        description: PAGE_META.home[lang].description,
        sameAs: config.socials.map((social) => social.link),
      }
    : null;

  useEffect(() => {
    pruneStaticHeadFallbacks(title, description);
  }, [title, description]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonical} />

      {SUPPORTED_LANGS.map((hreflang) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={buildPageUrl(hreflang, path)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={buildPageUrl('nl', path)} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta property="og:site_name" content="AxonXcode" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {organizationSchema ? (
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      ) : null}
    </Helmet>
  );
};

export default SEO;
