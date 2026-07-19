import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import type { Language } from '../types';
import navStyles from './Navbar.module.css';

const OPTIONS: { code: Language; label: string; aria: string }[] = [
  { code: 'nl', label: 'NL', aria: 'Nederlands' },
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'ar', label: 'AR', aria: 'العربية' },
];

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useApp();
  const texts = UI_TEXTS[lang];

  return (
    <div
      className={navStyles.langSwitch}
      role="group"
      aria-label={texts.selectLang}
      dir="ltr"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          className={`${navStyles.langBtn} ${lang === opt.code ? navStyles.langBtnActive : ''}`}
          onClick={() => setLang(opt.code)}
          aria-pressed={lang === opt.code}
          aria-label={opt.aria}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
