import type { Language } from '../../types';

export function getProjectDetailCopy(lang: Language) {
  return {
    backText:
      lang === 'ar' ? 'رجوع لكل المشاريع' : lang === 'nl' ? 'Terug naar alle projecten' : 'Back to all projects',
    challengeTitle: lang === 'ar' ? 'التحدي' : lang === 'nl' ? 'Uitdaging' : 'Challenge',
    solutionTitle: lang === 'ar' ? 'الحل' : lang === 'nl' ? 'Oplossing' : 'Solution',
    techTitle:
      lang === 'ar' ? 'التقنيات المستخدمة' : lang === 'nl' ? 'Gebruikte technologieën' : 'Technologies',
    galleryTitle: lang === 'ar' ? 'معرض الصور' : lang === 'nl' ? 'Galerij' : 'Gallery',
    visitLive:
      lang === 'ar' ? 'زيارة الموقع المباشر' : lang === 'nl' ? 'Bezoek de live website' : 'Visit Live Website',
    ctaText:
      lang === 'ar'
        ? 'عندك مشروع مشابه؟ تواصل معنا'
        : lang === 'nl'
          ? 'Heb je een vergelijkbaar project? Neem contact op'
          : 'Have a similar project? Contact us',
    contactBtn: lang === 'ar' ? 'تواصل معنا' : lang === 'nl' ? 'Neem contact op' : 'Contact Us',
    closeLightboxLabel:
      lang === 'ar' ? 'إغلاق معاينة الصورة' : lang === 'nl' ? 'Afbeelding sluiten' : 'Close image preview',
    galleryPrevLabel: lang === 'ar' ? 'السابق' : lang === 'nl' ? 'Vorige' : 'Previous',
    galleryNextLabel: lang === 'ar' ? 'التالي' : lang === 'nl' ? 'Volgende' : 'Next',
  };
}
