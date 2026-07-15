import React from 'react';
import PageHero from '../components/PageHero';
import Portfolio from '../components/Portfolio';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';

const PortfolioPage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.portfolio[lang];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/portfolio" />
      <PageHero
        eyebrow={lang === 'ar' ? 'أعمالنا' : lang === 'nl' ? 'Projecten' : 'Projects'}
        title={lang === 'ar' ? 'نماذج من مشاريعنا الناجحة' : lang === 'nl' ? 'Succesvolle case studies' : 'Case Studies That Prove Delivery'}
        subtitle={
          lang === 'ar'
            ? 'مشاريع حقيقية تعكس قدرة الفريق على تحويل الأفكار إلى منتجات رقمية قوية.'
            : lang === 'nl'
            ? 'Echte projecten die tonen hoe wij ideeën omzetten naar sterke digitale producten.'
            : 'Real projects that demonstrate how we turn concepts into high-performing digital products.'
        }
      />
      <Portfolio layout="grid" />
    </>
  );
};

export default PortfolioPage;
