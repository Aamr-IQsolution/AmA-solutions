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
import { isTurnstileRequired, verifyTurnstileToken } from '../utils/verifyTurnstile.js';

const JSON_CONTENT_TYPE = 'application/json';
const TEAM_EMAIL = 'axonxcode@gmail.com';
const FROM_EMAIL = 'noreply@axonxcode.com';

type SendResult =
  | { ok: true; data: unknown }
  | { ok: false; error: unknown };

function headerValue(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0]?.trim()) return value[0].trim();
  return undefined;
}

/** Prefer Vercel-set IP headers; never trust the leftmost X-Forwarded-For hop alone. */
function getClientIp(req: VercelRequest): string {
  const realIp = headerValue(req.headers['x-real-ip']);
  if (realIp) return realIp;

  const vercelForwarded = headerValue(req.headers['x-vercel-forwarded-for']);
  if (vercelForwarded) {
    const parts = vercelForwarded.split(',').map((part) => part.trim()).filter(Boolean);
    return parts[parts.length - 1] || 'unknown';
  }

  const forwarded = headerValue(req.headers['x-forwarded-for']);
  if (forwarded) {
    const parts = forwarded.split(',').map((part) => part.trim()).filter(Boolean);
    // Rightmost hop is appended by the platform; leftmost can be client-spoofed.
    return parts[parts.length - 1] || 'unknown';
  }

  return 'unknown';
}

function isRateLimitRequired(): boolean {
  // Any Vercel deployment (production + preview) must have Upstash configured.
  if (process.env.VERCEL === '1') return true;
  return process.env.NODE_ENV === 'production';
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
  if (!rateLimiter) {
    if (isRateLimitRequired()) {
      console.error('Upstash rate limiter is not configured');
      return res.status(503).json({
        message: 'الخدمة غير متاحة مؤقتاً، حاول لاحقاً',
      });
    }
  } else {
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

  const { name, email, message, phone, lang, turnstileToken } = parsed.data;
  const clientIp = getClientIp(req);
  const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);

  if (!turnstileResult.ok) {
    if (turnstileResult.reason === 'missing_secret') {
      if (isTurnstileRequired()) {
        console.error('TURNSTILE_SECRET_KEY is not configured');
        return res.status(503).json({
          message: 'الخدمة غير متاحة مؤقتاً، حاول لاحقاً',
        });
      }
    } else {
      return res.status(400).json({
        code: 'captcha_failed',
        message: 'فشل التحقق الأمني، حاول مجدداً',
      });
    }
  }

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
