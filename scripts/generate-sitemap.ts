/**
 * Generates public/sitemap.xml at build time from INITIAL_CONFIG.portfolio
 * and the fixed set of static routes × supported languages.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_CONFIG, SITE_URL } from '../constants';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../utils/localizePath';
import type { Language } from '../types';

const STATIC_PATHS = [
  '',
  'services',
  'team',
  'portfolio',
  'pricing',
  'contact',
  'privacy',
  'terms',
  'cookie-settings',
] as const;

function pageUrl(lang: Language, pathSegment: string): string {
  if (!pathSegment) return `${SITE_URL}/${lang}`;
  return `${SITE_URL}/${lang}/${pathSegment}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xhtmlAlternates(pathSegment: string): string {
  const links = SUPPORTED_LANGS.map(
    (lang) =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(pageUrl(lang, pathSegment))}" />`,
  );
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pageUrl(DEFAULT_LANG, pathSegment))}" />`,
  );
  return links.join('\n');
}

function urlEntry(lang: Language, pathSegment: string, lastmod: string): string {
  const loc = pageUrl(lang, pathSegment);
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
${xhtmlAlternates(pathSegment)}
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

const lastmod = new Date().toISOString().slice(0, 10);
const pathSegments: string[] = [
  ...STATIC_PATHS,
  ...INITIAL_CONFIG.portfolio.map((project) => `portfolio/${project.id}`),
];

const entries: string[] = [];
for (const pathSegment of pathSegments) {
  for (const lang of SUPPORTED_LANGS) {
    entries.push(urlEntry(lang, pathSegment, lastmod));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries.join('\n')}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');

console.log(`Wrote ${entries.length} URLs to public/sitemap.xml (lastmod=${lastmod})`);
