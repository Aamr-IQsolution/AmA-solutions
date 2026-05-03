/**
 * المكون الرئيسي للتطبيق (Root Component).
 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguagePicker from './components/LanguagePicker';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import PortfolioPage from './pages/PortfolioPage';
import WebPricingPage from './pages/WebPricingPage';
import MarketingPricingPage from './pages/MarketingPricingPage';
import ContactPage from './pages/ContactPage';
import './styles/theme.css';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [showLangPicker, setShowLangPicker] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const hasSelected = localStorage.getItem('has_selected_lang');
    if (hasSelected) {
      setShowLangPicker(false);
    }
  }, []);

  const handleLangSelect = () => {
    localStorage.setItem('has_selected_lang', 'true');
    setShowLangPicker(false);
  };

  if (showLangPicker) {
    return <LanguagePicker onSelect={handleLangSelect} />;
  }

  return (
    <div className="new-design-wrapper min-h-screen flex flex-col">
      <Navbar />
      <main className="page-stack flex-1">
        <div key={location.pathname} className="page-route-fade">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/web-pricing" element={<WebPricingPage />} />
            <Route path="/pricing" element={<MarketingPricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
