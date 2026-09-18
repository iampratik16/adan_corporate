'use client';

import { useEffect, useRef } from 'react';

/**
 * The code-drawn line field behind the AI & Digital band.
 *
 * Fine contour lines, drifting slowly, built from value noise. This is the
 * "meridian" of the Corridors idea rendered as a field rather than a rule, and
 * it is the one place on the site with a more technical mood.
 *
 * Deliberately not a glowing blue brain, a particle network or a neural mesh:
 * those are the visual cliches of AI marketing and this audience has seen all
 * of them. A contour map reads as measurement, which is what the section is about.
 *
 * Cost control: no library, no WebGL, roughly 2 kB. It only runs while it is on
 * screen and the tab is visible, and it does not run at all under reduced
 * motion, where it renders one static frame instead.
 */

/** 2D value noise. Cheap, smooth, and entirely sufficient for contours. */
function makeNoise(seed: number) {
  const perm = new Uint8Array(512);
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j]!, p[i]!];
  }
  for (let i = 0; i < 512; i += 1) perm[i] = p[i & 255]!;

  const fade = (t: number) => t * t * (3 - 2 * t);
  const grad = (hash: number) => (hash & 1 ? 1 : -1) * (0.5 + (hash & 7) / 14);

  return (x: number, y: number): number => {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = grad(perm[perm[xi]! + yi]!);
    const ab = grad(perm[perm[xi]! + yi + 1]!);
    const ba = grad(perm[perm[xi + 1]! + yi]!);
    const bb = grad(perm[perm[xi + 1]! + yi + 1]!);
    const x1 = aa + u * (ba - aa);
    const x2 = ab + u * (bb - ab);
    return x1 + v * (x2 - x1);
  };
}

export function MeridianField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noise = makeNoise(20130418);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let time = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap the device pixel ratio: this is a soft, low-contrast graphic and 3x
      // costs three times the fill rate for no visible gain.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const spacing = Math.max(13, 22 / density);
      const lines = Math.ceil(height / spacing) + 2;
      const step = Math.max(6, width / 150);

      ctx.lineWidth = 1;
      for (let i = 0; i < lines; i += 1) {
        const baseY = i * spacing - spacing;
        // Lines fade toward the top, so the copy above them stays the priority.
        const depth = i / lines;
        ctx.strokeStyle = `rgba(233, 237, 241, ${0.05 + depth * 0.16})`;
        ctx.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const n =
            noise(x * 0.0022, baseY * 0.01 + time) * 26 +
            noise(x * 0.0065, baseY * 0.02 - time * 0.6) * 9;
          const y = baseY + n;
          if (x <= 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visible) {
        time += 0.0016; // slow: a full drift takes minutes, not seconds
        draw();
      }
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full"
      style={{ background: 'var(--color-ink)' }}
    />
  );
}
