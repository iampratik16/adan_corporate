'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface FilmSources {
  /** The film at 1920, for a wide desktop. */
  full: string[];
  /** The same film at 1280, for everything narrower. */
  fullNarrow: string[];
}

const PAUSE_KEY = 'adan:hero-film-paused';

/**
 * The hero film. One video element, playing as soon as it can.
 *
 * WHAT THIS USED TO BE. Three tiers: the poster, a loop of the film's opening
 * shot, and the film itself fetched in the background and cross-faded in at a
 * frame the loop was already holding. That was the right design for a
 * 60-second film weighing 8.8 MB, where showing a reader something before the
 * film arrived was worth the machinery.
 *
 * The film is now a 13.8-second cut weighing 1.17 MB at 1280, and the loop it
 * was hiding behind weighed 0.4 MB. The whole apparatus of loop, seek,
 * cross-fade, `canplaythrough` and a fifteen-second abandon timeout existed to
 * save about half a megabyte, and it cost: two videos decoding at once, a swap
 * that replayed the opening shot twice, a pause control that disappeared at the
 * moment it was pressed, and a film that took nine seconds to reach the screen.
 * Every one of those was a real bug and every one lived in the tiering.
 *
 * So the tiering is gone. The poster paints, the film loads, the film plays.
 *
 * THE PORTRAIT TIER IS GONE TOO. It was a separate 9:16 clip of a corridor,
 * built by a different pipeline and never re-cut, so a phone was still being
 * served footage that appears nowhere in the film. `object-cover` crops the one
 * film for a narrow viewport instead.
 */
export function HeroFilm({ sources }: { sources: FilmSources }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [srcs, setSrcs] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  /**
   * The client asked us not to move anything, or not to spend their data.
   *
   * Not the same as `paused`, which is a choice about this film. This is a
   * standing preference about the whole machine, so nothing is fetched and no
   * `<video>` is mounted until the reader explicitly asks for one.
   */
  const [withheld, setWithheld] = useState(false);

  /** Runnable twice: once on load, where it may withhold, and again on consent. */
  const decide = useCallback(() => {
    // 1920 is roughly three times the bytes of 1280, and below a 1600px
    // viewport it is downscaled on arrival, so it is used above that only.
    setSrcs(window.innerWidth >= 1600 ? sources.full : sources.fullNarrow);
  }, [sources.full, sources.fullNarrow]);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const saveData = connection?.saveData === true;
    const slow =
      connection?.effectiveType !== undefined && /(^|-)[23]g$/.test(connection.effectiveType);

    // One frame, not an idle callback. This used to wait for
    // requestIdleCallback with a 2000ms timeout, which is what a third tier
    // fetched in the background can afford and what a film that is the hero
    // cannot. A frame is enough to keep the state out of the effect body, and
    // is imperceptible.
    const start = () => {
      // REDUCED MOTION NO LONGER WITHHOLDS THE FILM. The client asked three
      // times for the hero to play on load and twice reported it as broken when
      // it did not, which is what reduced motion was doing on their machine.
      // That is their call to make about their own site and it is recorded in
      // docs/DECISIONS.md section 28, along with what it costs.
      //
      // A metered or slow connection still withholds, because that is a
      // different question: it is about somebody's data bill, not about motion,
      // and 1.2 MB of video on a 2G link is a cost they did not agree to.
      if (saveData || slow) {
        setWithheld(true);
        setPaused(true);
        setMounted(true);
        return;
      }

      decide();
      try {
        setPaused(window.sessionStorage.getItem(PAUSE_KEY) === '1');
      } catch {
        // Private mode. Default to playing.
      }
      setMounted(true);
    };

    const frame = requestAnimationFrame(start);
    return () => cancelAnimationFrame(frame);
  }, [decide]);

  /* --- Play when it can, and stop when nobody is looking. ------------------- */
  useEffect(() => {
    if (!mounted || withheld) return;
    const video = videoRef.current;
    if (!video) return;

    let onScreen = true;
    const sync = () => {
      if (onScreen && !paused && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [mounted, withheld, paused, ready]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);

    // Pressing play is the consent a withheld film was waiting for. The sizing
    // decision runs now, because on load we deliberately did not make one.
    if (!next && withheld) {
      setWithheld(false);
      decide();
    }

    try {
      window.sessionStorage.setItem(PAUSE_KEY, next ? '1' : '0');
    } catch {
      // Private mode. The preference simply does not persist.
    }
  };

  if (failed) return null;

  return (
    <>
      {mounted && !withheld && srcs.length > 0 && (
        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          playsInline
          // `auto`, not `none`. There is no lighter tier behind this one any
          // more, so anything that delays the fetch is time the hero spends as
          // a still for no benefit. The poster is already painted and is the
          // LCP element; these bytes were never on that path.
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out-quart"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {srcs.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}

      {/*
        NO VISIBLE CONTROL. Asked for twice, and this is what it costs.

        WCAG 2.2.2, Pause Stop Hide, is a Level A criterion and this film meets
        every condition it names: it starts on its own, runs longer than five
        seconds, and is presented in parallel with the headline. A mechanism to
        stop it is required, and axe cannot detect its absence, so removing the
        control outright would have been a silent conformance failure that the
        whole test suite would have passed.

        So the button is gone from the page and kept in the tab order. It is
        `sr-only` until focused, at which point it appears where it always was.
        A mouse user never sees it, which is what was asked for; a keyboard user
        and a screen reader still have the mechanism the criterion requires.

        If it should go entirely, delete this block, and know that the site then
        fails 2.2.2 and that CLAUDE.md's stated budget is WCAG 2.2 AA.
      */}
      {mounted && (
        <button
          type="button"
          onClick={toggle}
          className="sr-only z-20 focus-visible:not-sr-only focus-visible:absolute focus-visible:right-[var(--spacing-gutter)] focus-visible:bottom-8 focus-visible:flex focus-visible:items-center focus-visible:gap-2 focus-visible:border focus-visible:border-white focus-visible:bg-white/10 focus-visible:px-3 focus-visible:py-2 focus-visible:text-micro focus-visible:text-white focus-visible:backdrop-blur-[2px]"
        >
          {paused ? 'Play film' : 'Pause film'}
        </button>
      )}
    </>
  );
}
