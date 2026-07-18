import React from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import LegalPageLayout from '../components/LegalPageLayout';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';
import { termsContent } from '../content/legalPages';

const TermsPage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.terms[lang];
  const content = termsContent[lang];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/terms" />
      <PageHero
        eyebrow={lang === 'ar' ? 'قانوني' : lang === 'nl' ? 'Juridisch' : 'Legal'}
        title={content.pageTitle}
        subtitle={
          lang === 'ar'
            ? 'الشروط التي تنظّم استخدام موقع axonXcode وخدماتنا الرقمية.'
            : lang === 'nl'
              ? 'De voorwaarden die gelden voor het gebruik van de AxonXcode-website en onze diensten.'
              : 'The terms that govern use of the AxonXcode website and our digital services.'
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

export default TermsPage;
