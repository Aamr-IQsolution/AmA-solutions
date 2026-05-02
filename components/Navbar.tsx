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
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    const languages: { code: Language; name: string; flag: string }[] = [
      { code: 'ar', name: 'AR', flag: '/assets/sy.svg' },
      { code: 'en', name: 'EN', flag: '/assets/gb.svg' },
      { code: 'nl', name: 'NL', flag: '/assets/nl.svg' },
    ];

    return (
      <div className="flex items-center space-x-2" dir="ltr">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`relative w-12 h-8 rounded-md bg-cover bg-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B7CB8] shadow-lg ${
              lang === l.code ? 'ring-2 ring-[#3B7CB8]' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundImage: `url(${l.flag})` }}
            aria-label={`Switch to ${l.name} language`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span
                className="text-white font-black text-sm tracking-widest"
                style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
              >
                {l.name}
              </span>
            </div>
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
        <div className={navStyles.overlayHome} role="dialog" aria-modal="true">
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
          <div style={{ marginTop: 32 }}>
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
