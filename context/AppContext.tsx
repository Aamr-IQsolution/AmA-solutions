/**
 * ملف إدارة الحالة العامة للتطبيق (Global State Management).
 * يستخدم الـ React Context API للتحكم في الحالة المشتركة بين جميع الصفحات،
 * مثل اللغة الحالية، إعدادات الموقع، بيانات تسجيل دخول المستخدم، وإدارة فريق العمل.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language, SiteConfig } from '../types';
import { INITIAL_CONFIG } from '../constants';
import { isSupportedLang, langFromPathname, replaceLangInPathname } from '../utils/localizePath';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  config: SiteConfig;
  setConfig: (c: SiteConfig | ((prev: SiteConfig) => SiteConfig)) => void;
  isRTL: boolean;
  contactMessage: string;
  setContactMessage: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPathname(location.pathname);

  const [config, setConfigState] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('siteConfig');
      if (!saved) return INITIAL_CONFIG;
      const parsed = JSON.parse(saved) as Partial<SiteConfig>;
      return {
        ...INITIAL_CONFIG,
        ...parsed,
        stats: parsed.stats ?? INITIAL_CONFIG.stats,
        testimonials: parsed.testimonials ?? INITIAL_CONFIG.testimonials,
        faqs: parsed.faqs ?? INITIAL_CONFIG.faqs,
        homeSectionCopy: parsed.homeSectionCopy ?? INITIAL_CONFIG.homeSectionCopy,
        siteName: INITIAL_CONFIG.siteName,
        logo: INITIAL_CONFIG.logo,
        brandXImage: INITIAL_CONFIG.brandXImage,
        mainPlans: INITIAL_CONFIG.mainPlans,
        addOns: INITIAL_CONFIG.addOns,
        services: INITIAL_CONFIG.services,
        portfolio: INITIAL_CONFIG.portfolio,
      };
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [contactMessage, setContactMessage] = useState('');

  const setLang = (l: Language) => {
    if (!isSupportedLang(l) || l === lang) return;

    const nextPath = replaceLangInPathname(location.pathname, l);
    navigate(`${nextPath}${location.search}${location.hash}`);
    localStorage.setItem('lang', l);
  };

  const setConfig = (c: SiteConfig | ((prev: SiteConfig) => SiteConfig)) => {
    setConfigState((prev) => {
      const nextConfig = typeof c === 'function' ? c(prev) : c;
      localStorage.setItem('siteConfig', JSON.stringify(nextConfig));
      return nextConfig;
    });
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const isRTL = lang === 'ar';

  return (
    <AppContext.Provider value={{
      lang, setLang, config, setConfig, isRTL,
      contactMessage, setContactMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
