import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { LocalizedLink, LocalizedNavLink } from './LocalizedLink';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';
import navStyles from './Navbar.module.css';

/** شريط تنقل موحّد (Phase 2) — ثيم فاتح على كل الصفحات */
const Navbar: React.FC = () => {
  const { lang, config } = useApp();
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
    { to: '/pricing', text: texts.prices },
    { to: '/contact', text: texts.contact },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`${navStyles.headerHome} ${navHidden ? navStyles.headerHomeHidden : ''}`}
      >
        <div className={navStyles.barHome}>
          <LocalizedLink
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
            <span className={navStyles.brandHome}>
              {config.siteName.slice(0, 4)}
              <img
                src={config.brandXImage}
                alt="X"
                className={navStyles.brandXImg}
                loading="lazy"
              />
              {config.siteName.slice(5)}
            </span>
          </LocalizedLink>

          <nav className={navStyles.desktopNavHome} aria-label="Main">
            {navLinks.map((link) => (
              <LocalizedNavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `${navStyles.navLinkHome} ${isActive ? navStyles.navLinkHomeActive : ''}`
                }
              >
                {link.text}
              </LocalizedNavLink>
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
                <LocalizedNavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navStyles.overlayLink} ${isActive ? navStyles.overlayLinkActive : ''}`
                  }
                >
                  {link.text}
                </LocalizedNavLink>
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
