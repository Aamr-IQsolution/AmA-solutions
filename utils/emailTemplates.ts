import type { Language } from '../types';

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
    `,
  },
  ar: {
    subject: 'تم استلام رسالتك — axonXcode',
    html: (name) => `
      <p>مرحباً ${name}،</p>
      <p>شكراً لتواصلك مع axonXcode. لقد استلمنا رسالتك وسيتواصل معك فريقنا في أقرب وقت.</p>
      <p>مع أطيب التحيات،<br/>فريق axonXcode</p>
    `,
  },
  nl: {
    subject: 'We hebben uw bericht ontvangen — axonXcode',
    html: (name) => `
      <p>Hallo ${name},</p>
      <p>Bedankt voor uw bericht aan axonXcode. We hebben uw aanvraag ontvangen en ons team neemt zo snel mogelijk contact met u op.</p>
      <p>Met vriendelijke groet,<br/>Het axonXcode-team</p>
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

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
