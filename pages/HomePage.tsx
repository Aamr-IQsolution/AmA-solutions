import React from 'react';
import HomeHero from '../components/HomeHero';
import StatisticsCounter from '../components/StatisticsCounter';
import Services from '../components/Services';
import PricingSection from '../components/PricingSection';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import styles from './HomePage.module.css';

/** الصفحة الرئيسية — الثيم العام يُطبَّق من App عبر .new-design-wrapper */
const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <HomeHero />
      <StatisticsCounter />
      <Services />
      <PricingSection />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
};

export default HomePage;
