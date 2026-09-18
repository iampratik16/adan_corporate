/**
 * Local time for an office or a partner's city.
 *
 * Rendered after hydration only. Formatting a zone on the server and again in
 * the browser produces a mismatch the moment the two disagree on the minute,
 * and React will warn about it, so the server renders a stable placeholder.
 */
export function formatLocalTime(timeZone: string, date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    }).format(date);
  } catch {
    return '';
  }
}

/** True when the local hour sits inside a plausible working day. */
export function isWorkingHours(timeZone: string, date: Date = new Date()): boolean {
  try {
    const hour = Number(
      new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone }).format(date),
    );
    const day = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone }).format(date);
    const weekend = day === 'Sat' || day === 'Sun';
    return !weekend && hour >= 8 && hour < 19;
  } catch {
    return false;
  }
}

/** "GMT+5:30" style offset label, for the office list. */
export function utcOffsetLabel(timeZone: string, date: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName');
    return parts?.value ?? '';
  } catch {
    return '';
  }
}
