/**
 * المكون الرئيسي للتطبيق (Root Component).
 */
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import LangGuard from './components/LangGuard';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MarketingPricingPage from './pages/MarketingPricingPage';
import ContactPage from './pages/ContactPage';
import CookieSettingsPage from './pages/CookieSettingsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import './styles/theme.css';

const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const scrollToTarget = () => {
        const scrollTargets = document.querySelectorAll<HTMLElement>(
          `[data-scroll-target="${CSS.escape(id)}"]`,
        );
        for (const target of scrollTargets) {
          const rect = target.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return true;
          }
        }

        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (scrollToTarget()) return;
      const timer = window.setTimeout(scrollToTarget, 150);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="new-design-wrapper min-h-screen flex flex-col">
      <Navbar />
      <main className="page-stack flex-1">
        <div key={location.pathname} className="page-route-fade">
          <Routes>
            <Route path="/" element={<Navigate to="/nl" replace />} />
            <Route path="/:lang" element={<LangGuard />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="portfolio/:id" element={<ProjectDetailPage />} />
              <Route path="web-pricing" element={<Navigate to="../pricing" replace />} />
              <Route path="pricing" element={<MarketingPricingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="cookie-settings" element={<CookieSettingsPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="*" element={<Navigate to="." replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/nl" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppProvider>
          <AppLayout />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
