'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { site } from '@content/site';

const enquiryIds = site.enquiryRoutes.map((route) => route.id) as [string, ...string[]];

/**
 * Field-level messages are written for the person filling the form, not for the
 * developer. "Invalid input" tells a chief executive nothing about what to do next.
 */
const Enquiry = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please give us a name to use when we reply.')
    .max(120, 'That name is longer than we can store. Please shorten it.'),
  email: z.email('That email address is missing an @ or a domain. Please check it.'),
  organisation: z
    .string()
    .trim()
    .max(160, 'Please shorten the organisation name to 160 characters or fewer.')
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, 'A sentence or two about what you are trying to do helps us route this properly.')
    .max(4000, 'Please keep this under 4,000 characters. You can send documents once we reply.'),
  enquiry: z.enum(enquiryIds, 'Please choose the option that best describes your enquiry.'),
  region: z.string().trim().max(40).optional(),
});

export type EnquiryValues = {
  name: string;
  email: string;
  organisation: string;
  message: string;
};

export type EnquiryState =
  | { status: 'idle' }
  | {
      status: 'error';
      /** Keyed by field name. Absent key means that field was fine. */
      errors: Partial<Record<keyof z.infer<typeof Enquiry>, string>>;
      /** Shown above the form when the failure is not about one field. */
      formError?: string;
      values: EnquiryValues;
    }
  | { status: 'sent'; mailbox: string; replyTo: string };

/**
 * ponytail: in-memory rate limiting, one Map per server process. It resets on
 * every deploy, is not shared between instances, and grows until the process
 * restarts. That is fine for a contact form on a small site; move it to a
 * durable store (Redis, Upstash, Vercel KV) before this endpoint matters.
 */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= LIMIT) {
    HITS.set(ip, recent);
    return true;
  }
  recent.push(now);
  HITS.set(ip, recent);
  return false;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values: EnquiryValues = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    organisation: String(formData.get('organisation') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  // The honeypot. A real person never sees this field, so anything in it is a bot.
  // Return the success state so the bot learns nothing, and send nothing.
  if (String(formData.get('company') ?? '').length > 0) {
    return { status: 'sent', mailbox: site.mailboxes.partners.address, replyTo: values.email };
  }

  const parsed = Enquiry.safeParse({
    ...values,
    organisation: values.organisation || undefined,
    enquiry: formData.get('enquiry'),
    region: formData.get('region') || undefined,
  });

  if (!parsed.success) {
    const errors: Partial<Record<keyof z.infer<typeof Enquiry>, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in errors)) {
        errors[field as keyof z.infer<typeof Enquiry>] = issue.message;
      }
    }
    return { status: 'error', errors, values };
  }

  if (await clientIp().then(rateLimited)) {
    return {
      status: 'error',
      errors: {},
      formError:
        'That is several enquiries from this connection in the last hour. Please email the mailbox shown above directly and we will pick it up there.',
      values,
    };
  }

  const route = site.enquiryRoutes.find((r) => r.id === parsed.data.enquiry);
  const mailbox = route?.mailbox ?? site.mailboxes.partners.address;
  const to = process.env.CONTACT_TO_EMAIL || mailbox;

  const body = [
    `Enquiry: ${route?.label ?? parsed.data.enquiry}`,
    `Region: ${parsed.data.region || 'Not given'}`,
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
    `Organisation: ${parsed.data.organisation ?? 'Not given'}`,
    '',
    parsed.data.message,
  ].join('\n');

  // Without a key the form still works end to end, so the page is testable with
  // no secrets. See .env.example.
  if (!process.env.RESEND_API_KEY) {
    console.info(`[contact] no RESEND_API_KEY, would have sent to ${to}:\n${body}`);
    return { status: 'sent', mailbox, replyTo: parsed.data.email };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `${site.name} website <website@adancorporate.com>`,
      to: [to],
      replyTo: parsed.data.email,
      subject: `Website enquiry: ${route?.label ?? parsed.data.enquiry}`,
      text: body,
    });
    if (error) throw new Error(error.message);
  } catch (cause) {
    console.error('[contact] send failed', cause);
    return {
      status: 'error',
      errors: {},
      formError: `We could not send that message. Please email ${mailbox} directly and we will reply from there.`,
      values,
    };
  }

  return { status: 'sent', mailbox, replyTo: parsed.data.email };
}
