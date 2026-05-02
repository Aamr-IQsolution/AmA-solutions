import React from 'react';
import PageHero from '../components/PageHero';
import Services from '../components/Services';
import { useApp } from '../context/AppContext';

const ServicesPage: React.FC = () => {
  const { lang } = useApp();

  return (
    <>
      <PageHero
        eyebrow={lang === 'ar' ? 'قسم الخدمات' : lang === 'nl' ? 'Diensten' : 'Services Division'}
        title={lang === 'ar' ? 'خدمات برمجية تسلّم نتائج' : lang === 'nl' ? 'Engineering die resultaten levert' : 'Engineering Services That Deliver'}
        subtitle={
          lang === 'ar'
            ? 'نقدم حلول تطوير متقدمة بتركيز على الأداء، الهوية الرقمية، وقابلية التوسع للشركات.'
            : lang === 'nl'
            ? 'Wij leveren geavanceerde oplossingen met focus op prestaties, merkidentiteit en schaalbaarheid.'
            : 'We build advanced digital products with a focus on performance, brand impact, and business scalability.'
        }
      />
      <Services />
    </>
  );
};

export default ServicesPage;
