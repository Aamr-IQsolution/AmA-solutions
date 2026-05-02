import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS, FOOTER_BRAND_LOGO } from '../constants';
import { Language } from '../types';
import navStyles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { lang, config, setLang } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setNavHidden(false);
      return;
    }
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
  }, [isHome]);

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

  const LanguageSwitcher = ({ home }: { home: boolean }) => {
    const languages: { code: Language; name: string; flag: string }[] = [
      { code: 'ar', name: 'AR', flag: '/assets/sy.svg' },
      { code: 'en', name: 'EN', flag: '/assets/gb.svg' },
      { code: 'nl', name: 'NL', flag: '/assets/nl.svg' },
    ];

    const ring = home ? 'ring-[#3B7CB8]' : 'ring-cyan-400';
    const focus = home ? 'focus:ring-[#3B7CB8]' : 'focus:ring-cyan-500';

    return (
      <div className="flex items-center space-x-2" dir="ltr">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => {
              setLang(l.code);
            }}
            className={`relative w-12 h-8 rounded-md bg-cover bg-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${focus} shadow-lg ${
              lang === l.code ? `ring-2 ${ring}` : 'opacity-70 hover:opacity-100'
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

  if (isHome) {
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
              <LanguageSwitcher home />
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
              <LanguageSwitcher home />
            </div>
          </div>
        ) : null}
      </>
    );
  }

  /* —— Legacy navbar (non-home pages, Phase 1) —— */
  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={FOOTER_BRAND_LOGO}
              alt={`${config.siteName} Logo`}
              className="h-12 w-12 rounded-full object-cover"
              loading="lazy"
            />
            <span className="self-center text-2xl font-black text-white whitespace-nowrap ama-text-gradient">
              {config.siteName}
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-bold text-lg transition-colors duration-300 ${
                      isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </nav>

            <LanguageSwitcher home={false} />
          </div>

          <div className="lg:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden bg-gray-900 bg-opacity-90 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-5">
          <nav className="flex flex-col items-center space-y-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-bold text-xl transition-colors duration-300 ${
                    isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                  }`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </nav>

          <hr className="w-2/3 border-gray-700 my-2" />

          <LanguageSwitcher home={false} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
