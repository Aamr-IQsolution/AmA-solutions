import React from 'react';
import PageHero from '../components/PageHero';
import WebPricing from '../components/WebPricing';
import { useApp } from '../context/AppContext';

const WebPricingPage: React.FC = () => {
  const { lang } = useApp();

  return (
    <>
      <PageHero
        eyebrow={lang === 'ar' ? 'تطوير المواقع' : lang === 'nl' ? 'Webontwikkeling' : 'Web Development'}
        title={lang === 'ar' ? 'خطط تطوير مواقع احترافية' : lang === 'nl' ? 'Professionele webpakketten' : 'Professional Web Build Packages'}
        subtitle={
          lang === 'ar'
            ? 'باقات تطوير مرنة تناسب المشاريع الناشئة والشركات المتقدمة مع تركيز على الجودة والسرعة.'
            : lang === 'nl'
            ? 'Flexibele pakketten voor startups en groeiende bedrijven met focus op kwaliteit en snelheid.'
            : 'Flexible packages for startups and mature businesses, engineered for speed, quality, and scale.'
        }
      />
      <WebPricing />
    </>
  );
};

export default WebPricingPage;
