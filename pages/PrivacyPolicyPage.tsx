import React from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import LegalPageLayout from '../components/LegalPageLayout';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';
import { privacyContent } from '../content/legalPages';

const PrivacyPolicyPage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.privacy[lang];
  const content = privacyContent[lang];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/privacy" />
      <PageHero
        eyebrow={lang === 'ar' ? 'قانوني' : lang === 'nl' ? 'Juridisch' : 'Legal'}
        title={content.pageTitle}
        subtitle={
          lang === 'ar'
            ? 'كيف نجمع بياناتك الشخصية ونستخدمها ونحميها عند استخدام موقع axonXcode.'
            : lang === 'nl'
              ? 'Hoe AxonXcode persoonsgegevens verzamelt, gebruikt en beschermt wanneer u onze website gebruikt.'
              : 'How AxonXcode collects, uses, and protects personal data when you use our website.'
        }
      />
      <LegalPageLayout
        pageTitle={content.pageTitle}
        lastUpdated={content.lastUpdated}
        sections={content.sections}
      />
    </>
  );
};

export default PrivacyPolicyPage;
