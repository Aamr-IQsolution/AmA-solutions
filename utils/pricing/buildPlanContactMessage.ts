import type { Language, MainPlan } from '../../types';
import { isOneTimePlan } from './planHelpers';

type MessageOpts = {
  plan: MainPlan;
  lang: Language;
  brand: string;
  currency: string;
};

export function buildPlanContactMessage({ plan, lang, brand, currency }: MessageOpts): string {
  const tr = plan.translations[lang];

  if (plan.isFree) {
    return lang === 'ar'
      ? `مرحباً فريق ${brand}،\nأنا مهتم بالباقة المجانية "${tr.name}".\nيرجى التواصل معي لإعدادها.`
      : lang === 'nl'
        ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het gratis pakket "${tr.name}".\nNeem contact met mij op om het in te stellen.`
        : `Hello ${brand} Team,\nI am interested in the "${tr.name}" free plan.\nPlease contact me to set it up.`;
  }

  if (plan.isCustom) {
    return lang === 'ar'
      ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" — استفسار مشروع مخصص.\nنظراً لاختلاف المتطلبات التقنية لكل مشروع، يرجى التواصل معي لمناقشة التفاصيل.`
      : lang === 'nl'
        ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" — maatwerk projectaanvraag.\nNeem contact met mij op om de details te bespreken.`
        : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package — Custom Project Inquiry.\nPlease contact me to discuss the technical requirements of my project.`;
  }

  if (isOneTimePlan(plan)) {
    return lang === 'ar'
      ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" بسعر ${currency}${plan.annualPrice} (دفعة واحدة).\nيرجى التواصل معي لمناقشة التفاصيل.`
      : lang === 'nl'
        ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" voor een eenmalige betaling van ${currency}${plan.annualPrice}.\nNeem contact met mij op om de details te bespreken.`
        : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package for a one-time payment of ${currency}${plan.annualPrice}.\nPlease contact me to discuss the details.`;
  }

  return lang === 'ar'
    ? `مرحباً فريق ${brand}،\nأنا مهتم بباقة "${tr.name}" بسعر ${currency}${plan.annualPrice}/شهر (سنوي مع عقد).\nيرجى التواصل معي لمناقشة التفاصيل.`
    : lang === 'nl'
      ? `Hallo ${brand}-team,\nIk ben geïnteresseerd in het pakket "${tr.name}" voor ${currency}${plan.annualPrice}/mnd (jaarlijks met contract).\nNeem contact met mij op om de details te bespreken.`
      : `Hello ${brand} Team,\nI am interested in the "${tr.name}" package for ${currency}${plan.annualPrice}/mo (annual contract).\nPlease contact me to discuss the details.`;
}
