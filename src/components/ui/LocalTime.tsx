'use client';

import { useEffect, useState } from 'react';
import { formatLocalTime, isWorkingHours } from '@/lib/time';

/**
 * The local clock beside a city. Useful to an audience working across time
 * zones, and the small recurring signal of the Corridors idea.
 *
 * Renders nothing on the server: a zone formatted at build time and again in
 * the browser will disagree the moment the minute turns, and a hydration
 * warning on every page is a worse outcome than a clock that arrives a beat late.
 */
export function LocalTime({
  timeZone,
  className,
  showDot = true,
}: {
  timeZone: string;
  className?: string;
  showDot?: boolean;
}) {
  const [time, setTime] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(formatLocalTime(timeZone));
      setWorking(isWorkingHours(timeZone));
    };
    tick();
    // Align to the next minute so every clock on the page turns together.
    const now = new Date();
    const toNextMinute = (60 - now.getSeconds()) * 1000;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, toNextMinute);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  if (!time) {
    // Reserve the exact width so the clock's arrival shifts nothing.
    return (
      <span className={className} aria-hidden="true" style={{ opacity: 0 }}>
        00:00
      </span>
    );
  }

  return (
    <span className={className}>
      {showDot && (
        <span
          aria-hidden="true"
          className="mr-1.5 inline-block size-[5px] translate-y-[-1px] rounded-full align-middle"
          style={{
            backgroundColor: working ? 'var(--color-accent)' : 'var(--color-stone-300)',
          }}
        />
      )}
      <time className="tabular">{time}</time>
      <span className="sr-only"> local time</span>
    </span>
  );
}
