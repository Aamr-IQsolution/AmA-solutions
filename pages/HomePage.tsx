import React from 'react';
import HomeHero from '../components/HomeHero';
import StatisticsCounter from '../components/StatisticsCounter';
import Services from '../components/Services';
import PricingSection from '../components/PricingSection';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import '../styles/theme.css';
import styles from './HomePage.module.css';

/**
 * الصفحة الرئيسية — Phase 1 تصميم جديد (scoped داخل .new-design-wrapper).
 *
 * المحتوى القديم (شبكة Explore + WebPricing + Pricing + Team + Contact على الصفحة الرئيسية)
 * أُزيل هنا؛ تبقى الصفحات المخصصة كما هي. عند الحاجة لاستعادة التجميعة القديمة راجع Git history.
 */
const HomePage: React.FC = () => {
  return (
    <div className={`new-design-wrapper ${styles.wrapper}`}>
      <HomeHero />
      <StatisticsCounter />
      <Services variant="home" />
      <PricingSection />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
};

export default HomePage;
