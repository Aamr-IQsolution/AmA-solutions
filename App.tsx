/**
 * المكون الرئيسي للتطبيق (Root Component).
 */
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import WebPricing from './components/WebPricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LanguagePicker from './components/LanguagePicker';

const MainContent: React.FC = () => {
  const { lang } = useApp();
  const [showLangPicker, setShowLangPicker] = useState(true);

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
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WebPricing />
        <Pricing />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
