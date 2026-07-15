import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import type { CreateEmailOptions } from 'resend';
import { contactFormSchema } from '../utils/contactSchema.js';
import {
  escapeHtml,
  getAutoReplyEmail,
  getContactFailureMessage,
  getTeamNotificationEmail,
} from '../utils/emailTemplates.js';

const JSON_CONTENT_TYPE = 'application/json';
const TEAM_EMAIL = 'axonxcode@gmail.com';
const FROM_EMAIL = 'noreply@axonxcode.com';

type SendResult =
  | { ok: true; data: unknown }
  | { ok: false; error: unknown };

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(',')[0]?.trim() || 'unknown';
  }
  return 'unknown';
}

function createRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }

  const redis = new Redis({ url, token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '10 m'),
    prefix: 'axon-contact',
  });
}

async function sendEmail(resend: Resend, payload: CreateEmailOptions): Promise<SendResult> {
  try {
    const { data, error } = await resend.emails.send(payload);
    if (error) {
      return { ok: false, error };
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error };
  }
}

async function sendEmailWithRetry(
  resend: Resend,
  payload: CreateEmailOptions
): Promise<SendResult> {
  const first = await sendEmail(resend, payload);
  if (first.ok) {
    return first;
  }
  return sendEmail(resend, payload);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] ?? '';
  if (!contentType.includes(JSON_CONTENT_TYPE)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  let body: unknown;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const honeypotValue =
    body && typeof body === 'object' && 'honeypot' in body
      ? String((body as { honeypot?: unknown }).honeypot ?? '')
      : '';

  if (honeypotValue.trim().length > 0) {
    return res.status(200).json({ message: 'Success' });
  }

  const rateLimiter = createRateLimiter();
  if (rateLimiter) {
    const ip = getClientIp(req);
    const { success } = await rateLimiter.limit(ip);
    if (!success) {
      return res.status(429).json({
        message: 'تم إرسال عدد كبير من الطلبات، حاول لاحقاً',
      });
    }
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    console.error('Contact form validation failed:', parsed.error.flatten());
    return res.status(400).json({ message: 'بيانات غير صحيحة' });
  }

  const { name, email, message, phone, lang } = parsed.data;

  const sanitized = {
    name: escapeHtml(name),
    message: escapeHtml(message),
    phone: phone ? escapeHtml(phone) : undefined,
  };

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(502).json({ message: getContactFailureMessage(lang) });
  }

  const resend = new Resend(resendKey);

  const teamEmail = getTeamNotificationEmail({
    name,
    email,
    phone,
    message,
    lang,
  });

  const teamResult = await sendEmailWithRetry(resend, {
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    replyTo: email,
    subject: teamEmail.subject,
    html: teamEmail.html,
  });

  if (!teamResult.ok) {
    console.error('Team notification send failed:', teamResult.error);
    return res.status(502).json({ message: getContactFailureMessage(lang) });
  }

  const autoReply = getAutoReplyEmail(lang, sanitized.name);
  const autoReplyResult = await sendEmail(resend, {
    from: FROM_EMAIL,
    to: email,
    subject: autoReply.subject,
    html: autoReply.html,
  });

  if (!autoReplyResult.ok) {
    console.error('Auto-reply send failed:', autoReplyResult.error);
  }

  return res.status(200).json({ message: 'Success' });
}
