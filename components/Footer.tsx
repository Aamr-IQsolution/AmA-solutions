/**
 * تذييل الصفحة (Footer).
 * يحتوي على شعار الموقع الختامي، حقوق الملكية الفكرية، واسم فريق البرمجة. 
 * يتم الآن جلب جميع النصوص من إعدادات الموقع لضمان القابلية للتعديل الكامل.
 */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FOOTER_BRAND_LOGO } from '../constants';
import footStyles from './Footer.module.css';

const Footer: React.FC = () => {
  const { lang, config } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const footerData = config.footer[lang];

  if (isHome) {
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
  }

  /* —— Legacy footer (Phase 1) —— */
  return (
    <footer className="py-12 bg-[#050510] border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center items-center gap-3">
          <img
            src={FOOTER_BRAND_LOGO}
            alt="Logo"
            className="w-10 h-10 rounded-full bg-black border border-white/10"
            loading="lazy"
          />
          <span className="text-white text-xl font-black ama-text-gradient uppercase tracking-tighter">
            {config.siteName}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} {config.siteName}. {footerData.copyright}
          </p>

          <div className="flex items-center gap-3 text-xs opacity-40 hover:opacity-100 transition-opacity">
            <span>{footerData.credits}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
