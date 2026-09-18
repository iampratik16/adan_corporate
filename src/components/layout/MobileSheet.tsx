'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import type { NavLink } from './HeaderShell';

interface NavPillar {
  id: string;
  title: string;
  descriptor: string;
  href: string;
}

/**
 * The mobile navigation sheet.
 *
 * Split into its own module and loaded on demand: Radix Dialog and Accordion
 * together are roughly 20 kB, and on a desktop viewport this never renders at
 * all. The header primes the import on the first hover or focus of the menu
 * button, so by the time the tap completes the chunk has usually arrived.
 *
 * Radix traps focus inside the sheet, closes it on Escape, and returns focus to
 * the trigger, which is why it is here rather than hand-rolled.
 */
export function MobileSheet({
  open,
  onOpenChange,
  utility,
  primary,
  pillars,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  utility: NavLink[];
  primary: NavLink[];
  pillars: NavPillar[];
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Radix traps focus and restores it to the trigger on close. */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--color-ink)_45%,transparent)] lg:hidden" />
        <Dialog.Content
          id="mobile-nav"
          className="fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto bg-paper pb-10 lg:hidden"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="container-site">
            <div className="flex h-[72px] items-center justify-between">
              <Logo size={34} />
              <Dialog.Close className="-mr-2 flex size-12 items-center justify-center">
                <span className="sr-only">Close menu</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Dialog.Close>
            </div>

            <div className="mt-4">
              <details className="disclosure">
                <summary>
                  <span className="text-display-4">Expertise</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    aria-hidden="true"
                    className="disclosure-mark"
                  >
                    <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </summary>
                <ul className="space-y-4 pb-6">
                  {pillars.map((pillar) => (
                    <li key={pillar.id}>
                      <Link href={pillar.href} className="block">
                        <span className="text-body">{pillar.title}</span>
                        <span className="mt-0.5 block text-micro text-stone-500">
                          {pillar.descriptor}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {primary
                .filter((l) => l.href !== '/expertise')
                .map((link) => (
                  <div key={link.href} className="disclosure">
                    <Link href={link.href} className="block py-5 font-display text-display-4">
                      {link.label}
                    </Link>
                  </div>
                ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {utility.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-small text-stone-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn mt-8 w-full">
              Speak to a partner
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
