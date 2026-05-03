/**
 * ملف إدارة الحالة العامة للتطبيق (Global State Management).
 * يستخدم الـ React Context API للتحكم في الحالة المشتركة بين جميع الصفحات،
 * مثل اللغة الحالية، إعدادات الموقع، بيانات تسجيل دخول المستخدم، وإدارة فريق العمل.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, SiteConfig } from '../types';
import { INITIAL_CONFIG } from '../constants';

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
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'nl';
  });
  
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
      };
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [contactMessage, setContactMessage] = useState('');

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
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