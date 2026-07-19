import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import {
  contactFormSchema,
  contactFieldKeys,
  type ContactFieldKey,
} from '../utils/contactSchema';
import type { ContactFormData } from '../types';

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
export type FieldErrors = Partial<Record<ContactFieldKey, string>>;

const EMPTY_FORM: Omit<ContactFormData, 'lang'> = {
  name: '',
  email: '',
  phone: '',
  message: '',
  honeypot: '',
  turnstileToken: undefined,
};

const TURNSTILE_SITE_KEY = (process.env.TURNSTILE_SITE_KEY ?? '').trim();

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

export function useContactForm() {
  const { lang, contactMessage, setContactMessage } = useApp();
  const t = UI_TEXTS[lang];

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleHoneypotChange = (value: string) => {
    setFormData((prev) => ({ ...prev, honeypot: value }));
  };

  const handleTurnstileToken = (token: string | null) => {
    setTurnstileToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'sending') return;

    setStatusMessage('');
    setFieldErrors({});

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitStatus('error');
      setStatusMessage(t.contactFormErrorCaptcha);
      return;
    }

    const payload = {
      ...formData,
      lang,
      phone: formData.phone?.trim() || undefined,
      turnstileToken: turnstileToken ?? undefined,
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

      const data = (await response.json().catch(() => null)) as {
        message?: string;
        code?: string;
      } | null;

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(t.contactFormSuccess);
        setFormData(EMPTY_FORM);
        setContactMessage('');
        setTurnstileToken(null);
        setCaptchaResetKey((key) => key + 1);
        resetTimerRef.current = setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 5000);
        return;
      }

      setSubmitStatus('error');
      setTurnstileToken(null);
      setCaptchaResetKey((key) => key + 1);
      if (response.status === 429) {
        setStatusMessage(t.contactFormErrorRateLimit);
      } else if (data?.code === 'captcha_failed') {
        setStatusMessage(t.contactFormErrorCaptcha);
      } else {
        setStatusMessage(data?.message ?? t.contactFormErrorGeneric);
      }
    } catch {
      setSubmitStatus('error');
      setTurnstileToken(null);
      setCaptchaResetKey((key) => key + 1);
      setStatusMessage(t.contactFormErrorGeneric);
    }
  };

  return {
    t,
    formData,
    fieldErrors,
    submitStatus,
    statusMessage,
    isSending: submitStatus === 'sending',
    captchaResetKey,
    showCaptcha: Boolean(TURNSTILE_SITE_KEY),
    handleChange,
    handleHoneypotChange,
    handleTurnstileToken,
    handleSubmit,
  };
}
