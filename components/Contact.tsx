/**
 * قسم التواصل (Contact Section).
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const { lang, config, contactMessage, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (contactMessage) {
      setFormData((prev) => ({ ...prev, message: contactMessage }));
    }
  }, [contactMessage]);

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello AmA Team,\n\nI am interested in your services.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${config.contactEmail}?subject=${subject}&body=${body}`;
    setContactMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'message') {
      setContactMessage(e.target.value);
    }
  };

  const tag =
    lang === 'ar' ? 'تواصل مباشر' : lang === 'nl' ? 'Direct contact' : 'Get in touch';
  const lead =
    lang === 'ar'
      ? 'هل أنت مستعد لبدء مشروعك القادم؟ تواصل معنا اليوم للحصول على استشارة مجانية وبناء حضورك الرقمي.'
      : lang === 'nl'
        ? 'Klaar voor je volgende project? Neem vandaag contact op voor een vrijblijvend gesprek.'
        : 'Ready to start your next project? Contact us today for a free consultation and build your digital presence.';
  const sendLabel =
    lang === 'ar' ? 'إرسال الرسالة عبر البريد' : lang === 'nl' ? 'Verstuur via e-mail' : 'Send via email';

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{t.contact}</h2>
            <p className={styles.lead}>{lead}</p>

            <div className={styles.rows}>
              <div className={styles.row}>
                <div className={styles.iconBox}>
                  <i className="fa-solid fa-envelope text-xl" aria-hidden />
                </div>
                <div>
                  <p className={styles.label}>Email</p>
                  <p className={styles.value}>{config.contactEmail}</p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={`${styles.iconBox} ${styles.iconBoxWhats}`}>
                  <i className="fa-brands fa-whatsapp text-2xl" aria-hidden />
                </div>
                <div>
                  <p className={styles.label}>WhatsApp</p>
                  <p className={styles.value}>{config.phone}</p>
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

          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSendMail}>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" className={styles.submit}>
                {sendLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
