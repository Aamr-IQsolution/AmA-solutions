import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import styles from './Contact.module.css';

const ContactInfo: React.FC = () => {
  const { lang, config } = useApp();
  const t = UI_TEXTS[lang];

  const tag =
    lang === 'ar' ? 'تواصل مباشر' : lang === 'nl' ? 'Direct contact' : 'Get in touch';
  const lead =
    lang === 'ar'
      ? 'هل أنت مستعد لبدء مشروعك القادم؟ تواصل معنا اليوم للحصول على استشارة مجانية وبناء حضورك الرقمي.'
      : lang === 'nl'
        ? 'Klaar voor je volgende project? Neem vandaag contact op voor een vrijblijvend gesprek.'
        : 'Ready to start your next project? Contact us today for a free consultation and build your digital presence.';

  const whatsappDigits = config.phone.replace(/\D/g, '');
  const whatsappHref = `https://wa.me/${whatsappDigits}`;
  const mailtoHref = `mailto:${config.contactEmail}`;
  const composeEmailAria =
    lang === 'ar'
      ? `إنشاء رسالة إلى ${config.contactEmail}`
      : lang === 'nl'
        ? `E-mail opstellen aan ${config.contactEmail}`
        : `Compose email to ${config.contactEmail}`;

  return (
    <div>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.title}>{t.contact}</h2>
      <p className={styles.lead}>{lead}</p>

      <div className={styles.rows}>
        <a
          href={mailtoHref}
          className={`${styles.row} ${styles.mailtoLinkRow}`}
          aria-label={composeEmailAria}
        >
          <div className={styles.iconBox}>
            <i className="fa-solid fa-envelope text-xl" aria-hidden />
          </div>
          <div>
            <p className={styles.label}>{t.email}</p>
            <p className={styles.value}>{config.contactEmail}</p>
          </div>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.row} ${styles.whatsappLinkRow}`}
          aria-label={`${t.whatsapp}: ${config.phone}`}
        >
          <div className={`${styles.iconBox} ${styles.iconBoxWhats}`}>
            <i className="fa-brands fa-whatsapp text-2xl" aria-hidden />
          </div>
          <div>
            <p className={styles.label}>{t.whatsapp}</p>
            <p className={styles.value}>{config.phone}</p>
          </div>
        </a>
        <div className={styles.row}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-location-dot text-xl" aria-hidden />
          </div>
          <div>
            <p className={styles.label}>{t.locationLabel}</p>
            <p className={styles.value}>{config.location[lang]}</p>
          </div>
        </div>
      </div>

      <div className={styles.socials}>
        {config.socials.map((social) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social}
            title={social.platform}
            aria-label={social.platform}
          >
            <i className={`fa-brands ${social.icon} text-lg`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
