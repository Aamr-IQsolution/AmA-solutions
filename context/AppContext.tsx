/**
 * الحالة العامة للتطبيق: اللغة، إعدادات الموقع الثابتة، ورسالة التواصل المسبقة.
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
  isRTL: boolean;
  contactMessage: string;
  setContactMessage: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPathname(location.pathname);
  const config = INITIAL_CONFIG;

  const [contactMessage, setContactMessage] = useState('');

  const setLang = (l: Language) => {
    if (!isSupportedLang(l) || l === lang) return;

    const nextPath = replaceLangInPathname(location.pathname, l);
    navigate(`${nextPath}${location.search}${location.hash}`);
    localStorage.setItem('lang', l);
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const isRTL = lang === 'ar';

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        config,
        isRTL,
        contactMessage,
        setContactMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
