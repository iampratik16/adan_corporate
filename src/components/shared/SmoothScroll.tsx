'use client';

import { useEffect } from 'react';

/**
 * Lenis, at a light setting, for desktop pointer devices only.
 *
 * Off for touch (where it fights the platform's own physics), off for reduced
 * motion, off for coarse pointers. Loaded dynamically after the first idle
 * period so it never competes with the hero for bandwidth or main thread.
 *
 * Scroll is never hijacked: no pinning, no section snapping, no scroll-jacked
 * chapters. This only softens the wheel.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;
      lenis = new Lenis({ duration: 0.9, wheelMultiplier: 0.9, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };

    const hasIdle = typeof window.requestIdleCallback === 'function';
    const handle = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 2500 })
      : window.setTimeout(() => void start(), 1200);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      if (hasIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      lenis?.destroy();
    };
  }, []);

  return null;
}
