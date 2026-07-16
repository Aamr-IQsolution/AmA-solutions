import { next } from '@vercel/edge';
import type { Language } from './types';
import { INITIAL_CONFIG, PAGE_META, SITE_URL, type PageMetaKey } from './constants';
import { SUPPORTED_LANGS, DEFAULT_LANG, isSupportedLang } from './utils/localizePath';

const BOT_USER_AGENT_PATTERN =
  /facebookexternalhit|LinkedInBot|WhatsApp|Twitterbot|Slackbot|Discordbot|TelegramBot/i;

const STATIC_PAGE_KEYS = new Set<PageMetaKey>(['services', 'team', 'pricing', 'contact']);

function toAbsoluteImageUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

function buildCanonicalUrl(lang: Language, path: string): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${lang}${normalized}`;
}

type BotMeta = {
  lang: Language;
  title: string;
  description: string;
  image: string;
  canonicalPath: string;
};

function resolveMetaForPath(pathname: string): BotMeta | null {
  const segments = pathname.split('/').filter(Boolean);
  let lang: Language = DEFAULT_LANG;

  if (segments.length > 0 && isSupportedLang(segments[0])) {
    lang = segments[0];
    segments.shift();
  }

  const logoImage = toAbsoluteImageUrl(INITIAL_CONFIG.logo);

  if (segments.length === 0) {
    const meta = PAGE_META.home[lang];
    return {
      lang,
      title: meta.title,
      description: meta.description,
      image: logoImage,
      canonicalPath: '/',
    };
  }

  const first = segments[0];

  if (STATIC_PAGE_KEYS.has(first as PageMetaKey)) {
    const key = first as PageMetaKey;
    const meta = PAGE_META[key][lang];
    return {
      lang,
      title: meta.title,
      description: meta.description,
      image: logoImage,
      canonicalPath: `/${key}`,
    };
  }

  if (first === 'portfolio') {
    const projectId = segments[1];

    if (!projectId) {
      const meta = PAGE_META.portfolio[lang];
      return {
        lang,
        title: meta.title,
        description: meta.description,
        image: logoImage,
        canonicalPath: '/portfolio',
      };
    }

    const project = INITIAL_CONFIG.portfolio.find((p) => p.id === projectId);

    if (project) {
      const t = project.translations[lang];
      return {
        lang,
        title: `${t.title} – ${t.category} | AxonXcode`,
        description: t.shortDescription,
        image: toAbsoluteImageUrl(project.coverImage),
        canonicalPath: `/portfolio/${project.id}`,
      };
    }

    const meta = PAGE_META.portfolio[lang];
    return {
      lang,
      title: meta.title,
      description: meta.description,
      image: logoImage,
      canonicalPath: '/portfolio',
    };
  }

  return null;
}

function buildHreflangTags(canonicalPath: string): string {
  const tags = SUPPORTED_LANGS.map(
    (hreflang) =>
      `<link rel="alternate" hreflang="${hreflang}" href="${buildCanonicalUrl(hreflang, canonicalPath)}" />`,
  );
  tags.push(
    `<link rel="alternate" hreflang="x-default" href="${buildCanonicalUrl('nl', canonicalPath)}" />`,
  );
  return tags.join('\n    ');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderBotHtml(meta: BotMeta): string {
  const canonical = buildCanonicalUrl(meta.lang, meta.canonicalPath);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const image = escapeHtml(meta.image);
  const canonicalEscaped = escapeHtml(canonical);

  return `<!DOCTYPE html>
<html lang="${meta.lang}">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalEscaped}" />
    ${buildHreflangTags(meta.canonicalPath)}
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${canonicalEscaped}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AxonXcode" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  </head>
  <body>
    <p>${title}</p>
  </body>
</html>`;
}

export default function middleware(request: Request): Response {
  const userAgent = request.headers.get('user-agent') ?? '';

  if (!BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return next();
  }

  const { pathname } = new URL(request.url);
  const meta = resolveMetaForPath(pathname);

  if (!meta) {
    return next();
  }

  return new Response(renderBotHtml(meta), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export const config = {
  matcher: [
    '/((?!api/|assets/|sitemap\\.xml|robots\\.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)',
  ],
};
