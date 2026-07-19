import { z } from 'zod';

const phoneRegex = /^\+?[\d\s]{7,20}$/;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => val === undefined || phoneRegex.test(val), {
      message: 'Invalid phone',
    }),
  message: z.string().trim().min(1).max(2000),
  lang: z.enum(['ar', 'en', 'nl']),
  honeypot: z
    .string()
    .optional()
    .transform((val) => val ?? ''),
  turnstileToken: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const contactFieldKeys = ['name', 'email', 'phone', 'message'] as const;
export type ContactFieldKey = (typeof contactFieldKeys)[number];
