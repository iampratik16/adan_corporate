import { createHash } from 'node:crypto';
import { statSync } from 'node:fs';
import path from 'node:path';

/**
 * A content version for a generated media file, appended to its URL as `?v=`.
 *
 * `/media/*` is served `immutable` for a year, which is the right header for
 * files that never change. Most of ours do not. The hero film, its loop and the
 * poster are rewritten under the same names every time the cut changes, so a
 * browser that had seen one cut was told never to ask again and went on playing
 * a film that no longer existed on disk. No amount of reloading fixes that,
 * because the browser never issues the request.
 *
 * The hash is of size and modification time rather than the bytes: the film is
 * megabytes, this runs at build time for every rung, and any rewrite changes
 * both. A stale version here is impossible in the direction that matters, since
 * writing the file always moves its mtime.
 *
 * Returns an empty string if the file is missing, so a caller can concatenate
 * unconditionally and a missing file simply produces its ordinary URL.
 */
export function mediaVersion(publicPath: string): string {
  try {
    const { size, mtimeMs } = statSync(path.join(process.cwd(), 'public', publicPath));
    return createHash('sha1').update(`${size}:${mtimeMs}`).digest('hex').slice(0, 8);
  } catch {
    return '';
  }
}

/** `/media/x.mp4` -> `/media/x.mp4?v=1a2b3c4d`, or unchanged if it is missing. */
export function versioned(url: string): string {
  const v = mediaVersion(url);
  return v ? `${url}?v=${v}` : url;
}
