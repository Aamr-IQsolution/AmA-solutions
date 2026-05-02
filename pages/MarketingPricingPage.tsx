import React from 'react';
import PageHero from '../components/PageHero';
import Pricing from '../components/Pricing';
import { useApp } from '../context/AppContext';

const MarketingPricingPage: React.FC = () => {
  const { lang } = useApp();

  return (
    <>
      <PageHero
        eyebrow={lang === 'ar' ? 'التسويق الرقمي' : lang === 'nl' ? 'Digitale marketing' : 'Digital Marketing'}
        title={lang === 'ar' ? 'باقات نمو مدروسة' : lang === 'nl' ? 'Groeiplannen op maat' : 'Growth Packages With Strategy'}
        subtitle={
          lang === 'ar'
            ? 'إستراتيجيات سوشيال ميديا وإعلانات مدفوعة مصممة لتحقيق نتائج قابلة للقياس.'
            : lang === 'nl'
            ? 'Social media- en advertentieplannen die meetbare bedrijfsresultaten leveren.'
            : 'Social media and paid campaign plans designed to deliver measurable business outcomes.'
        }
      />
      <Pricing />
    </>
  );
};

export default MarketingPricingPage;
