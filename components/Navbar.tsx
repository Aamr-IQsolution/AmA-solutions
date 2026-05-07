import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Language } from '../types';
import navStyles from './Navbar.module.css';

/** شريط تنقل موحّد (Phase 2) — ثيم فاتح على كل الصفحات */
const Navbar: React.FC = () => {
  const { lang, config, setLang } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const texts = UI_TEXTS[lang];
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handlePointerOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const insideHeader = navRef.current?.contains(target);
      const insideMenu = overlayRef.current?.contains(target);
      if (insideHeader || insideMenu) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerOutside);
    document.addEventListener('touchstart', handlePointerOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerOutside);
      document.removeEventListener('touchstart', handlePointerOutside);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 100) {
        setNavHidden(true);
      } else if (y < lastScrollY.current) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', text: texts.home },
    { to: '/services', text: texts.services },
    { to: '/team', text: texts.team },
    { to: '/portfolio', text: texts.portfolio },
    { to: '/web-pricing', text: texts.webPrices },
    { to: '/pricing', text: texts.prices },
    { to: '/contact', text: texts.contact },
  ];

  const LanguageSwitcher = () => {
    const options: { code: Language; label: string }[] = [
      { code: 'nl', label: 'NL' },
      { code: 'en', label: 'EN' },
      { code: 'ar', label: 'AR' },
    ];

    return (
      <div
        className={navStyles.langSwitch}
        role="group"
        aria-label={texts.selectLang}
        dir="ltr"
      >
        {options.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`${navStyles.langBtn} ${lang === opt.code ? navStyles.langBtnActive : ''}`}
            onClick={() => setLang(opt.code)}
            aria-pressed={lang === opt.code}
            aria-label={
              opt.code === 'nl'
                ? 'Nederlands'
                : opt.code === 'en'
                  ? 'English'
                  : 'العربية'
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <header
        ref={navRef}
        className={`${navStyles.headerHome} ${navHidden ? navStyles.headerHomeHidden : ''}`}
      >
        <div className={navStyles.barHome}>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rtl:flex-row-reverse"
          >
            <img
              src={config.logo}
              alt={`${config.siteName} logo`}
              className={navStyles.logoHome}
              loading="lazy"
            />
            <span className={navStyles.brandHome}>{config.siteName}</span>
          </Link>

          <nav className={navStyles.desktopNavHome} aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${navStyles.navLinkHome} ${isActive ? navStyles.navLinkHomeActive : ''}`
                }
              >
                {link.text}
              </NavLink>
            ))}
            <LanguageSwitcher />
          </nav>

          <button
            type="button"
            className={navStyles.hamburgerHome}
            aria-expanded={isOpen}
            aria-label="Menu"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          ref={overlayRef}
          className={navStyles.overlayHome}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className={navStyles.closeHome}
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <ul className={navStyles.overlayLinks}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navStyles.overlayLink} ${isActive ? navStyles.overlayLinkActive : ''}`
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={navStyles.langSwitchMobileWrap}>
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
