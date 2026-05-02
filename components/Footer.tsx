/**
 * تذييل الصفحة (Footer) — موحّد Phase 2
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import { FOOTER_BRAND_LOGO } from '../constants';
import footStyles from './Footer.module.css';

const Footer: React.FC = () => {
  const { lang, config } = useApp();
  const footerData = config.footer[lang];

  return (
    <footer className={footStyles.footerHome}>
      <div className={footStyles.innerHome}>
        <div className={footStyles.rowHome}>
          <img
            src={FOOTER_BRAND_LOGO}
            alt=""
            className={footStyles.logoHome}
            loading="lazy"
          />
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
        <p className={footStyles.copyHome}>
          © {new Date().getFullYear()} {config.siteName}. {footerData.copyright}
        </p>
        <p className={footStyles.creditsHome}>{footerData.credits}</p>
      </div>
    </footer>
  );
};

export default Footer;
