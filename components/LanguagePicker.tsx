/**
 * شاشة اختيار اللغة — نصوصها حسب لغة المتصفح (قبل تحديد تفضيل المستخدم).
 */
import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGE_PICKER_UI } from '../constants';
import { Language } from '../types';
import styles from './LanguagePicker.module.css';

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'nl';
  const n = navigator.language.toLowerCase();
  if (n.startsWith('ar')) return 'ar';
  if (n.startsWith('nl')) return 'nl';
  if (n.startsWith('en')) return 'en';
  return 'nl';
}

interface LanguagePickerProps {
  onSelect: () => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ onSelect }) => {
  const { setLang, config } = useApp();

  const pickerCopy = useMemo(() => {
    const loc = detectBrowserLanguage();
    return LANGUAGE_PICKER_UI[loc];
  }, []);

  const handleSelection = (l: Language) => {
    setLang(l);
    onSelect();
  };

  const languages = [
    {
      code: 'ar' as Language,
      name: 'AR',
      label: 'العربية',
      sub: 'أهلاً بك في عالم الإبداع الرقمي',
      flag: '/assets/sy.svg',
    },
    {
      code: 'en' as Language,
      name: 'EN',
      label: 'English',
      sub: 'Welcome to digital excellence',
      flag: '/assets/gb.svg',
    },
    {
      code: 'nl' as Language,
      name: 'NL',
      label: 'Nederlands',
      sub: 'Welkom bij digitale uitmuntendheid',
      flag: '/assets/nl.svg',
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <img
              src={config.logo}
              alt=""
              className={styles.logo}
              loading="lazy"
            />
          </div>
          <h1 className={styles.title}>
            {pickerCopy.titleBefore}
            <span className={styles.titleAccent}>{pickerCopy.titleAccent}</span>
            {pickerCopy.titleAfter}
          </h1>
          <p className={styles.sub}>{pickerCopy.hint}</p>
        </header>

        <div className={styles.grid}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={styles.card}
              onClick={() => handleSelection(lang.code)}
            >
              <div className={styles.flagWrap}>
                <img src={lang.flag} alt="" className={styles.flag} loading="lazy" />
                <div className={styles.flagOverlay}>
                  <span className={styles.flagCode}>{lang.name}</span>
                </div>
              </div>
              <h2 className={styles.langName}>{lang.label}</h2>
              <p className={styles.langSub}>{lang.sub}</p>
            </button>
          ))}
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {config.siteName} © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LanguagePicker;
