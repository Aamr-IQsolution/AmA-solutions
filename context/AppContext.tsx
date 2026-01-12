/**
 * ملف إدارة الحالة العامة للتطبيق (Global State Management).
 * يستخدم الـ React Context API للتحكم في الحالة المشتركة بين جميع الصفحات،
 * مثل اللغة الحالية، إعدادات الموقع، بيانات تسجيل دخول المستخدم، وإدارة فريق العمل.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, SiteConfig, User, UserRole } from '../types';
import { INITIAL_CONFIG } from '../constants';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  config: SiteConfig;
  setConfig: (c: SiteConfig | ((prev: SiteConfig) => SiteConfig)) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  users: User[];
  setUsers: (u: User[] | ((prev: User[]) => User[])) => void;
  isRTL: boolean;
  contactMessage: string;
  setContactMessage: (msg: string) => void;
}

const DEFAULT_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'OWNER',
    isActive: true,
    createdAt: new Date().toISOString(),
    permissions: {
      canEditContent: true,
      canDeleteContent: true,
      canManageUsers: true,
      canViewStats: true
    }
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'ar';
  });
  
  const [config, setConfigState] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('siteConfig');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsersState] = useState<User[]>(() => {
    const saved = localStorage.getItem('team_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
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

  const setUsers = (u: User[] | ((prev: User[]) => User[])) => {
    setUsersState((prev) => {
      const nextUsers = typeof u === 'function' ? u(prev) : u;
      localStorage.setItem('team_users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const isRTL = lang === 'ar';

  return (
    <AppContext.Provider value={{ 
      lang, setLang, config, setConfig, user, setUser, users, setUsers, isRTL,
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