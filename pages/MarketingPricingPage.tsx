import React from 'react';
import PageHero from '../components/PageHero';
import MainPricing from '../components/MainPricing';
import Pricing from '../components/Pricing';
import { useApp } from '../context/AppContext';

const HERO_COPY = {
  ar: {
    eyebrow: 'الأسعار والباقات',
    title: 'خطط مرنة لكل مشروع',
    subtitle: 'اختر الباقة المناسبة لك — مع عقد سنوي أو بدون التزام',
  },
  en: {
    eyebrow: 'Pricing',
    title: 'Flexible Plans For Every Project',
    subtitle: 'Choose the right plan — annual contract or no commitment',
  },
  nl: {
    eyebrow: 'Prijzen',
    title: 'Flexibele Plannen Voor Elk Project',
    subtitle: 'Kies het juiste plan — jaarcontract of zonder verplichting',
  },
} as const;

const MarketingPricingPage: React.FC = () => {
  const { lang } = useApp();
  const hero = HERO_COPY[lang];

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />
      <MainPricing />
      <Pricing />
    </>
  );
};

export default MarketingPricingPage;
