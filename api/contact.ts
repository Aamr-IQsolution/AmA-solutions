import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { contactFormSchema } from '../utils/contactSchema';
import { escapeHtml, getAutoReplyEmail } from '../utils/emailTemplates';

const JSON_CONTENT_TYPE = 'application/json';

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

  const { subject, html } = getAutoReplyEmail(lang, sanitized.name);

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ message: 'حدث خطأ أثناء الإرسال، حاول لاحقاً' });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: 'noreply@axonxcode.com',
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Resend send failed:', error);
    return res.status(500).json({ message: 'حدث خطأ أثناء الإرسال، حاول لاحقاً' });
  }

  return res.status(200).json({ message: 'Success' });
}
