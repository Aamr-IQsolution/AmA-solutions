import React from 'react';
import HomeHero from '../components/HomeHero';
import StatisticsCounter from '../components/StatisticsCounter';
import Services from '../components/Services';
import PricingSection from '../components/PricingSection';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';
import styles from './HomePage.module.css';

/** الصفحة الرئيسية — الثيم العام يُطبَّق من App عبر .new-design-wrapper */
const HomePage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.home[lang];

  return (
    <div className={styles.wrapper}>
      <SEO title={meta.title} description={meta.description} path="/" />
      <HomeHero />
      <StatisticsCounter />
      <Services />
      <PricingSection />
      <Portfolio layout="slider" />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
};

export default HomePage;
