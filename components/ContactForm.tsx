import React from 'react';
import { useContactForm } from '../hooks/useContactForm';
import TurnstileWidget from './TurnstileWidget';
import styles from './Contact.module.css';

const ContactForm: React.FC = () => {
  const {
    t,
    formData,
    fieldErrors,
    submitStatus,
    statusMessage,
    isSending,
    captchaResetKey,
    showCaptcha,
    handleChange,
    handleHoneypotChange,
    handleTurnstileToken,
    handleSubmit,
  } = useContactForm();

  const buttonLabel = isSending ? t.contactFormSending : t.contactFormSubmit;

  return (
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
          onChange={(e) => handleHoneypotChange(e.target.value)}
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {showCaptcha ? (
          <div className={styles.captcha}>
            <TurnstileWidget onToken={handleTurnstileToken} resetKey={captchaResetKey} />
          </div>
        ) : null}

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
  );
};

export default ContactForm;
