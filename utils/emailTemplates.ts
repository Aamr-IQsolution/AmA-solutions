import type { Language } from '../types';

const FALLBACK_CONTACT_EMAIL = 'axonxcode@gmail.com';
const SIGNATURE_PHONE = '+31685582647';
const SIGNATURE_LOGO_URL =
  'https://www.axonxcode.com/assets/simple-logo-X-decoreted-no-background.png';
const SIGNATURE_PRIMARY_COLOR = '#3b7cb8';
const SIGNATURE_MUTED_COLOR = '#6b7280';
const SIGNATURE_BORDER_COLOR = '#e5e7eb';

/** Mirrors INITIAL_CONFIG.socials in constants.ts */
const SIGNATURE_SOCIALS = [
  { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/aamr-alawad-35444b361' },
  { platform: 'Instagram', link: 'https://instagram.com' },
  { platform: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61587772950053' },
  { platform: 'GitHub', link: 'https://github.com/Aamr-IQsolution' },
] as const;

function buildAutoReplySignature(rtl: boolean): string {
  const socialLinks = SIGNATURE_SOCIALS.map(
    (social) =>
      `<a href="${social.link}" style="color:${SIGNATURE_MUTED_COLOR};text-decoration:none;">${social.platform}</a>`
  ).join(` <span style="color:${SIGNATURE_MUTED_COLOR};">|</span> `);

  const signatureBody = `
    <hr style="border:none;border-top:1px solid ${SIGNATURE_BORDER_COLOR};margin:24px 0 16px;" />
    <img
      src="${SIGNATURE_LOGO_URL}"
      alt="AxonXcode"
      width="48"
      height="48"
      style="display:block;margin-bottom:8px;"
    />
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:16px;font-weight:600;color:${SIGNATURE_PRIMARY_COLOR};">AxonXcode</p>
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;color:${SIGNATURE_MUTED_COLOR};">
      ${SIGNATURE_PHONE}
      <span style="color:${SIGNATURE_MUTED_COLOR};"> | </span>
      <a href="https://axonxcode.com" style="color:${SIGNATURE_MUTED_COLOR};text-decoration:none;">axonxcode.com</a>
      <span style="color:${SIGNATURE_MUTED_COLOR};"> | </span>
      <a href="mailto:${FALLBACK_CONTACT_EMAIL}" style="color:${SIGNATURE_MUTED_COLOR};text-decoration:none;">${FALLBACK_CONTACT_EMAIL}</a>
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:${SIGNATURE_MUTED_COLOR};">
      ${socialLinks}
    </p>
  `;

  if (rtl) {
    return `<div dir="rtl" style="font-family:Arial,sans-serif;">${signatureBody}</div>`;
  }

  return `<div style="font-family:Arial,sans-serif;">${signatureBody}</div>`;
}

const LANG_LABELS_AR: Record<Language, string> = {
  ar: 'العربية',
  en: 'الإنجليزية',
  nl: 'الهولندية',
};

const AUTO_REPLY: Record<
  Language,
  { subject: string; html: (name: string) => string }
> = {
  en: {
    subject: 'We received your message — axonXcode',
    html: (name) => `
      <p>Hello ${name},</p>
      <p>Thank you for reaching out to axonXcode. We have received your message and our team will get back to you shortly.</p>
      <p>Best regards,<br/>The axonXcode Team</p>
      ${buildAutoReplySignature(false)}
    `,
  },
  ar: {
    subject: 'تم استلام رسالتك — axonXcode',
    html: (name) => `
      <p>مرحباً ${name}،</p>
      <p>شكراً لتواصلك مع axonXcode. لقد استلمنا رسالتك وسيتواصل معك فريقنا في أقرب وقت.</p>
      <p>مع أطيب التحيات،<br/>فريق axonXcode</p>
      ${buildAutoReplySignature(true)}
    `,
  },
  nl: {
    subject: 'We hebben uw bericht ontvangen — axonXcode',
    html: (name) => `
      <p>Hallo ${name},</p>
      <p>Bedankt voor uw bericht aan axonXcode. We hebben uw aanvraag ontvangen en ons team neemt zo snel mogelijk contact met u op.</p>
      <p>Met vriendelijke groet,<br/>Het axonXcode-team</p>
      ${buildAutoReplySignature(false)}
    `,
  },
};

export function getAutoReplyEmail(lang: Language, sanitizedName: string) {
  const template = AUTO_REPLY[lang];
  return {
    subject: template.subject,
    html: template.html(sanitizedName),
  };
}

export interface TeamNotificationInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  lang: Language;
}

export function getTeamNotificationEmail(input: TeamNotificationInput) {
  const sanitizedName = escapeHtml(input.name);
  const sanitizedEmail = escapeHtml(input.email);
  const sanitizedPhone = input.phone ? escapeHtml(input.phone) : undefined;
  const sanitizedMessage = escapeHtml(input.message);
  const langLabel = LANG_LABELS_AR[input.lang];

  const phoneRow = sanitizedPhone
    ? `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;">الهاتف</td><td style="padding:8px 12px;">${sanitizedPhone}</td></tr>`
    : '';

  return {
    subject: 'رسالة جديدة من نموذج التواصل — axonXcode',
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
        <h2 style="margin:0 0 16px;color:#1f2937;">رسالة جديدة من نموذج التواصل</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">الاسم</td><td style="padding:8px 12px;">${sanitizedName}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">البريد الإلكتروني</td><td style="padding:8px 12px;">${sanitizedEmail}</td></tr>
          ${phoneRow}
          <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">لغة الموقع</td><td style="padding:8px 12px;">${langLabel}</td></tr>
        </table>
        <h3 style="margin:0 0 8px;color:#374151;">نص الرسالة</h3>
        <p style="white-space:pre-wrap;margin:0;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">${sanitizedMessage}</p>
      </div>
    `,
  };
}

const CONTACT_FAILURE_MESSAGES: Record<Language, string> = {
  ar: `تعذّر إرسال رسالتك في الوقت الحالي. نعتذر عن الإزعاج — يرجى المحاولة مرة أخرى لاحقاً، أو التواصل معنا مباشرة على ${FALLBACK_CONTACT_EMAIL}.`,
  en: `We couldn't send your message right now. We apologize for the inconvenience — please try again later, or contact us directly at ${FALLBACK_CONTACT_EMAIL}.`,
  nl: `Uw bericht kon nu niet worden verzonden. Onze excuses voor het ongemak — probeer het later opnieuw, of neem rechtstreeks contact met ons op via ${FALLBACK_CONTACT_EMAIL}.`,
};

export function getContactFailureMessage(lang: Language): string {
  return CONTACT_FAILURE_MESSAGES[lang];
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
