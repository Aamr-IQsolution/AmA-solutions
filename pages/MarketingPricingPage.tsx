import React from 'react';
import PageHero from '../components/PageHero';
import MainPricing from '../components/MainPricing';
import AddOnsSection from '../components/AddOnsSection';
import { useApp } from '../context/AppContext';

const HERO_COPY = {
  ar: {
    eyebrow: 'الأسعار والباقات',
    title: 'خطط مرنة لكل مشروع',
    subtitle: 'اختر الباقة المناسبة لمشروعك ومرحلة عملك',
  },
  en: {
    eyebrow: 'Pricing',
    title: 'Flexible Plans For Every Project',
    subtitle: 'Choose the plan that fits your project and stage',
  },
  nl: {
    eyebrow: 'Prijzen',
    title: 'Flexibele Plannen Voor Elk Project',
    subtitle: 'Kies het plan dat past bij uw project en fase',
  },
} as const;

const MarketingPricingPage: React.FC = () => {
  const { lang } = useApp();
  const hero = HERO_COPY[lang];

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />
      <MainPricing />
      <AddOnsSection />
    </>
  );
};

export default MarketingPricingPage;
