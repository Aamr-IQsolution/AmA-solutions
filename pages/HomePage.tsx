import React, { Suspense, lazy } from 'react';
import HomeHero from '../components/HomeHero';
import StatisticsCounter from '../components/StatisticsCounter';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';
import styles from './HomePage.module.css';

const Services = lazy(() => import('../components/Services'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const CTASection = lazy(() => import('../components/CTASection'));

const belowFoldFallback = <div className={styles.belowFoldFallback} aria-hidden="true" />;

/** الصفحة الرئيسية — الثيم العام يُطبَّق من App عبر .new-design-wrapper */
const HomePage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.home[lang];

  return (
    <div className={styles.wrapper}>
      <SEO
        title={meta.title}
        description={meta.description}
        path="/"
        includeOrganizationSchema
      />
      <HomeHero />
      <StatisticsCounter />
      <Suspense fallback={belowFoldFallback}>
        <Services />
        <PricingSection />
        <Portfolio layout="slider" />
        <Testimonials />
        <FAQ />
        <CTASection />
      </Suspense>
    </div>
  );
};

export default HomePage;
