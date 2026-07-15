/**
 * قسم التواصل (Contact Section).
 */
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import {
  contactFormSchema,
  contactFieldKeys,
  type ContactFieldKey,
} from '../utils/contactSchema';
import type { ContactFormData } from '../types';
import styles from './Contact.module.css';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<Record<ContactFieldKey, string>>;

const EMPTY_FORM: Omit<ContactFormData, 'lang'> = {
  name: '',
  email: '',
  phone: '',
  message: '',
  honeypot: '',
};

function mapFieldError(field: ContactFieldKey, t: (typeof UI_TEXTS)['en']): string {
  switch (field) {
    case 'name':
      return t.contactFormErrorName;
    case 'email':
      return t.contactFormErrorEmail;
    case 'phone':
      return t.contactFormErrorPhone;
    case 'message':
      return t.contactFormErrorMessage;
    default:
      return t.contactFormErrorGeneric;
  }
}

const Contact: React.FC = () => {
  const { lang, config, contactMessage, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (contactMessage) {
      setFormData((prev) => ({ ...prev, message: contactMessage }));
    }
  }, [contactMessage]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'message') {
      setContactMessage(value);
    }

    if (contactFieldKeys.includes(name as ContactFieldKey)) {
      setFieldErrors((prev) => {
        if (!prev[name as ContactFieldKey]) return prev;
        const next = { ...prev };
        delete next[name as ContactFieldKey];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'sending') return;

    setStatusMessage('');
    setFieldErrors({});

    const payload = {
      ...formData,
      lang,
      phone: formData.phone?.trim() || undefined,
    };

    const parsed = contactFormSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && contactFieldKeys.includes(key as ContactFieldKey)) {
          nextErrors[key as ContactFieldKey] = mapFieldError(key as ContactFieldKey, t);
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setSubmitStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(t.contactFormSuccess);
        setFormData(EMPTY_FORM);
        setContactMessage('');
        resetTimerRef.current = setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 5000);
        return;
      }

      setSubmitStatus('error');
      if (response.status === 429) {
        setStatusMessage(t.contactFormErrorRateLimit);
      } else {
        setStatusMessage(data?.message ?? t.contactFormErrorGeneric);
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage(t.contactFormErrorGeneric);
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

  const whatsappDigits = config.phone.replace(/\D/g, '');
  const whatsappHref = `https://wa.me/${whatsappDigits}`;
  const mailtoHref = `mailto:${config.contactEmail}`;
  const composeEmailAria =
    lang === 'ar'
      ? `إنشاء رسالة إلى ${config.contactEmail}`
      : lang === 'nl'
        ? `E-mail opstellen aan ${config.contactEmail}`
        : `Compose email to ${config.contactEmail}`;

  const isSending = submitStatus === 'sending';
  const buttonLabel = isSending ? t.contactFormSending : t.contactFormSubmit;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
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
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">{t.contactFormName}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
                    placeholder={t.contactFormNamePh}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  />
                  {fieldErrors.name ? (
                    <p id="contact-name-error" className={styles.fieldError} role="alert">
                      {fieldErrors.name}
                    </p>
                  ) : null}
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">{t.email}</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                    placeholder={t.contactFormEmailPh}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  />
                  {fieldErrors.email ? (
                    <p id="contact-email-error" className={styles.fieldError} role="alert">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">{t.contactFormPhone}</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone ?? ''}
                  onChange={handleChange}
                  className={`${styles.input} ${fieldErrors.phone ? styles.inputError : ''}`}
                  placeholder={t.contactFormPhonePh}
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
                />
                {fieldErrors.phone ? (
                  <p id="contact-phone-error" className={styles.fieldError} role="alert">
                    {fieldErrors.phone}
                  </p>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">{t.contactFormMessage}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.textarea} ${fieldErrors.message ? styles.inputError : ''}`}
                  placeholder={t.contactFormMessagePh}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                />
                {fieldErrors.message ? (
                  <p id="contact-message-error" className={styles.fieldError} role="alert">
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>

              <input
                type="text"
                name="website_url"
                value={formData.honeypot ?? ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {submitStatus === 'success' ? (
                <p className={styles.statusSuccess} role="status">
                  {statusMessage}
                </p>
              ) : null}
              {submitStatus === 'error' ? (
                <p className={styles.statusError} role="alert">
                  {statusMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className={`${styles.submit} ${isSending ? styles.submitDisabled : ''}`}
                disabled={isSending}
              >
                {buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
