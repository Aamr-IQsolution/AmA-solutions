/**
 * المكون الرئيسي للتطبيق (Root Component).
 */
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UI_TEXTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team'; // استيراد قسم الفريق
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import WebPricing from './components/WebPricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import LanguagePicker from './components/LanguagePicker';

const MainContent: React.FC = () => {
  const { lang, user } = useApp();
  const [view, setView] = useState<'home' | 'admin'>('home');
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

  if (view === 'admin') {
    if (!user) return <Login onBack={() => setView('home')} />;
    return <AdminPanel onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team /> {/* إضافة قسم الفريق هنا */}
        <WebPricing />
        <Pricing />
        <Portfolio />
        <Contact />
      </main>
      <Footer onAdminClick={() => setView('admin')} />
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
