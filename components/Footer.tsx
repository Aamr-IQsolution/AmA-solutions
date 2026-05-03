/**
 * تذييل الصفحة (Footer) — موحّد Phase 2 + خريطة موقع
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import footStyles from './Footer.module.css';

const Footer: React.FC = () => {
  const { lang, config, isRTL } = useApp();
  const footerData = config.footer[lang];
  const t = UI_TEXTS[lang];

  const exploreLinks = [
    { to: '/', label: t.home },
    { to: '/services', label: t.services },
    { to: '/team', label: t.team },
    { to: '/portfolio', label: t.portfolio },
  ];
  const pricingLinks = [
    { to: '/web-pricing', label: t.webPrices },
    { to: '/pricing', label: t.prices },
  ];
  const contactLinks = [{ to: '/contact', label: t.contact }];

  return (
    <footer className={footStyles.footerHome} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={footStyles.innerHome}>
        <div className={footStyles.mainGrid}>
          <div className={footStyles.brandColumn}>
            <Link to="/" className={footStyles.brandLink} aria-label={t.home}>
              <img
                src={config.logo}
                alt=""
                className={footStyles.logoHome}
                loading="lazy"
              />
              <span className={footStyles.brandName}>{config.siteName}</span>
            </Link>
            <ul className={footStyles.socialsHome}>
              {config.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footStyles.socialHome}
                    aria-label={s.platform}
                  >
                    <i className={`fa-brands ${s.icon}`} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={footStyles.sitemap} aria-label={t.footerSitemap}>
            <p className={footStyles.sitemapTitle}>{t.footerSitemap}</p>
            <div className={footStyles.sitemapGrid}>
              <div className={footStyles.sitemapCol}>
                <h3 className={footStyles.sitemapHeading}>{t.footerColExplore}</h3>
                <ul className={footStyles.sitemapList}>
                  {exploreLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className={footStyles.sitemapLink}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={footStyles.sitemapCol}>
                <h3 className={footStyles.sitemapHeading}>{t.footerColPricing}</h3>
                <ul className={footStyles.sitemapList}>
                  {pricingLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className={footStyles.sitemapLink}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={footStyles.sitemapCol}>
                <h3 className={footStyles.sitemapHeading}>{t.footerColContact}</h3>
                <ul className={footStyles.sitemapList}>
                  {contactLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className={footStyles.sitemapLink}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <p className={footStyles.copyHome}>
          © {new Date().getFullYear()} {config.siteName}. {footerData.copyright}
        </p>
        <p className={footStyles.creditsHome}>{footerData.credits}</p>
      </div>
    </footer>
  );
};

export default Footer;
