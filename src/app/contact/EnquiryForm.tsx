'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { submitEnquiry, type EnquiryState } from './actions';

const initial: EnquiryState = { status: 'idle' };

const field =
  'mt-2 w-full border border-stone-300 bg-white px-3.5 py-3 text-body text-ink transition-colors duration-ui placeholder:text-stone-300 focus:border-ink';

/**
 * The enquiry form.
 *
 * A client component because it reports pending and result states, but it is
 * handed four strings, never a content module: the whole router, the people
 * register and the office list stay on the server.
 *
 * It works with JavaScript disabled. The server function is passed straight to
 * `form action`, so React replays the submission through a normal POST and the
 * page re-renders with the result.
 */
export function EnquiryForm({
  enquiryId,
  enquiryLabel,
  mailbox,
  region,
}: {
  enquiryId: string;
  enquiryLabel: string;
  mailbox: string;
  region: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);

  if (state.status === 'sent') {
    return (
      <div role="status" className="border border-stone-200 bg-white p-8">
        <h3 className="font-display text-display-4 leading-[1.15]">Message sent</h3>
        <p className="measure mt-4 text-body text-stone-700">
          Your enquiry has gone to <span className="text-ink">{state.mailbox}</span>. A partner will
          read it and reply to {state.replyTo}. If it is urgent, write to that mailbox directly, or
          call the office nearest you from the list below.
        </p>
      </div>
    );
  }

  const errors = state.status === 'error' ? state.errors : {};
  const values =
    state.status === 'error'
      ? state.values
      : { name: '', email: '', organisation: '', message: '' };

  return (
    <form action={formAction} noValidate className="border border-stone-200 bg-white p-6 sm:p-8">
      <h3 className="font-display text-display-4 leading-[1.15]">Send a short message</h3>
      <p className="measure mt-3 text-small text-stone-500">
        This goes to {mailbox}, tagged &ldquo;{enquiryLabel}&rdquo;. Two or three sentences are
        enough to get to the right person.
      </p>

      <input type="hidden" name="enquiry" value={enquiryId} />
      <input type="hidden" name="region" value={region} />

      {/* The honeypot. Off screen rather than display:none so it still gets
          filled by bots that check for visibility, hidden from assistive
          technology, and out of the tab order. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <label htmlFor="company">Company (leave this field empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.formError && (
        <p role="alert" className="mt-6 border-l-2 border-accent bg-paper px-4 py-3 text-small">
          {state.formError}
        </p>
      )}

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          autoComplete="name"
          defaultValue={values.name}
          error={errors.name}
          required
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
          required
        />
        <div className="sm:col-span-2">
          <Field
            name="organisation"
            label="Organisation"
            optional
            autoComplete="organization"
            defaultValue={values.organisation}
            error={errors.organisation}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-small font-medium">
            What are you trying to do?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${field} resize-y`}
            style={errors.message ? { borderColor: 'var(--color-accent)' } : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-small text-accent-deep">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="btn" disabled={pending}>
          {pending ? 'Sending' : 'Send enquiry'}
        </button>
        <p className="text-micro text-stone-500">
          We use what you send only to answer you. See the{' '}
          <Link href="/legal/privacy-policy" className="link-underline text-ink">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  optional = false,
  ...input
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-small font-medium">
        {label}
        {optional && <span className="ml-1.5 font-normal text-stone-500">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={field}
        style={error ? { borderColor: 'var(--color-accent)' } : undefined}
        {...input}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-small text-accent-deep">
          {error}
        </p>
      )}
    </div>
  );
}
