export const PERIOD_LABELS = {
  en: '/mo',
  ar: '/شهر',
  nl: '/mnd',
} as const;

export const FREE_LABELS = {
  en: 'Free',
  ar: 'مجاناً',
  nl: 'Gratis',
} as const;

export const FREE_BADGE_LABELS = {
  en: 'Free forever',
  ar: 'مجانية للأبد',
  nl: 'Gratis voor altijd',
} as const;

export const SEE_ALL_FEATURES_LABELS = {
  en: 'View All Features',
  ar: 'عرض جميع الميزات',
  nl: 'Bekijk Alle Functies',
} as const;

export const POPULAR_LABELS = {
  en: 'Most popular',
  ar: 'الأكثر شعبية',
  nl: 'Meest populair',
} as const;

export const ANNUAL_TOTAL_LABELS = {
  en: (total: number) => `€${total.toLocaleString()} billed annually`,
  ar: (total: number) => `${total.toLocaleString()}€ سنوياً دفعة واحدة`,
  nl: (total: number) => `€${total.toLocaleString()} per jaar vooruitbetaald`,
} as const;
