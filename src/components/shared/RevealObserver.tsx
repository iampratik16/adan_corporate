'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One IntersectionObserver for every [data-reveal] on the page.
 *
 * This replaces GSAP ScrollTrigger, which costs about 70 kB gzipped to do what
 * twenty lines and a CSS transition already do. The homepage budget is 170 kB
 * for everything, so a timeline engine that only staggers opacity does not earn
 * its place. See docs/DECISIONS.md.
 *
 * Elements reveal once and are then unobserved: nothing re-animates on scroll
 * back, which is the behaviour the brief asks for.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element arrives, so the motion has finished by
      // the time the reader's eye reaches it.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    for (const el of targets) {
      // Anything already on screen at mount is revealed without animating, so
      // the first viewport never appears to load in.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.setAttribute('data-revealed', '');
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
