import { Language } from '../types';

export const SUPPORTED_LANGS: Language[] = ['nl', 'en', 'ar'];
export const DEFAULT_LANG: Language = 'nl';

export function isSupportedLang(value: string): value is Language {
  return SUPPORTED_LANGS.includes(value as Language);
}

export function langFromPathname(pathname: string): Language {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isSupportedLang(segment) ? segment : DEFAULT_LANG;
}

export function localizePath(path: string, lang: Language): string {
  if (!path.startsWith('/')) return path;

  const hashIndex = path.indexOf('#');
  const pathPart = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';

  if (pathPart === '/' || pathPart === '') {
    return `/${lang}${hash}`;
  }

  const segments = pathPart.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLang(segments[0])) {
    segments[0] = lang;
    return `/${segments.join('/')}${hash}`;
  }

  return `/${lang}${pathPart}${hash}`;
}

export function replaceLangInPathname(
  pathname: string,
  newLang: Language,
): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLang(segments[0])) {
    segments[0] = newLang;
  } else {
    segments.unshift(newLang);
  }
  return `/${segments.join('/')}`;
}
