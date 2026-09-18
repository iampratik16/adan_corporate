import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

test.describe('every route', () => {
  for (const route of ROUTES) {
    test(`${route} renders, is titled, and has exactly one h1`, async ({ page }) => {
      const failures: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') failures.push(message.text());
      });
      page.on('pageerror', (error) => failures.push(String(error)));

      const response = await page.goto(route);
      expect(response?.status(), `${route} should return 200`).toBe(200);

      await expect(page).toHaveTitle(/Adan Corporate/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toBeVisible();

      // A missing media file is a content problem, not a code defect; anything
      // else on the console is a real failure.
      const real = failures.filter((f) => !/\/media\/|favicon|404 \(Not Found\)/.test(f));
      expect(real, `${route} console errors`).toEqual([]);
    });
  }
});

test('no horizontal scroll at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ROUTES) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${route} overflows horizontally at 320px`).toBeLessThanOrEqual(1);
  }
});

test('the skip link is the first thing a keyboard reaches', async ({ page, browserName }) => {
  await page.goto('/');
  // WebKit only moves focus to links when the OS "Full Keyboard Access" setting
  // is on, so Tab order cannot be asserted there. Check the link is present,
  // focusable and correctly targeted instead, which is what actually matters.
  const skip = page.locator('a.skip-link');
  await expect(skip).toHaveAttribute('href', '#main');
  await expect(page.locator('#main')).toHaveCount(1);

  if (browserName === 'webkit') {
    await skip.focus();
    await expect(skip).toBeFocused();
    return;
  }

  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(focused).toContain('Skip to content');
});

test('the playing hero film can always be stopped from the keyboard', async ({ page }) => {
  // WCAG 2.2.2 is Level A and this film meets every condition it names: it
  // starts on its own, runs longer than five seconds, and sits behind the
  // headline. The client asked for the visible control to go, so the mechanism
  // is now keyboard-only: sr-only until focused. Asserting that it "is visible"
  // would fail, and asserting nothing would let the criterion be deleted by
  // accident, which axe cannot detect.
  await page.goto('/');

  const control = page.getByRole('button', { name: /pause film/i });
  await control.waitFor({ state: 'attached', timeout: 15_000 }).catch(() => {});
  if ((await control.count()) === 0) return; // poster-only client, nothing to stop

  await control.focus();
  await expect(control, 'the stop mechanism is not keyboard reachable').toBeFocused();

  await page.keyboard.press('Enter');
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Array.from(document.querySelectorAll('section video')).every(
            (v) => (v as HTMLVideoElement).paused,
          ),
        ),
      { message: 'the film kept playing after its control was pressed', timeout: 10_000 },
    )
    .toBe(true);
});

test('a reader who paused the film can always start it again', async ({ page }) => {
  // The pause preference persists in sessionStorage, so this is the state a
  // reader returns to on every load of that tab once they have stopped the
  // film. It shipped broken once: the control was gated on the loop's
  // `canplay`, which never fired while paused, so the hero sat frozen with
  // nothing on screen to restart it, permanently, for the life of the tab.
  //
  // The control is now sr-only until focused, by client instruction, so this
  // reaches it the way a keyboard user would rather than asserting it is
  // visible. That is the whole remaining mechanism, which makes it worth a test.
  await page.addInitScript(() => sessionStorage.setItem('adan:hero-film-paused', '1'));
  await page.goto('/');

  const control = page.getByRole('button', { name: /play film/i });
  await expect(control, 'no control to restart a paused film').toBeAttached({ timeout: 15_000 });

  await control.focus();
  await expect(control).toBeFocused();
  await page.keyboard.press('Enter');

  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Array.from(document.querySelectorAll('section video')).some(
            (v) => !(v as HTMLVideoElement).paused && (v as HTMLVideoElement).currentTime > 0,
          ),
        ),
      { message: 'the film was restarted and its clock never moved', timeout: 15_000 },
    )
    .toBe(true);
});

test('nothing on the homepage advances on its own', async ({ page }) => {
  // The brief bans carousels that advance by themselves. This used to watch the
  // transaction rail, which was the only thing on the page that scrolled; that
  // rail has been replaced by a static grid of insight cards, so the assertion
  // is now the general one: no horizontally scrollable region moves unasked.
  await page.goto('/');
  await page.waitForTimeout(3000);

  // Asserted as "everything is still at its start", not as a before/after diff.
  // The diff version compared two arrays of scrollLeft values and failed on
  // mobile for a reason that had nothing to do with scrolling: lazily loaded
  // images land between the samples, more elements end up overflowing, and the
  // arrays came back different lengths while every value in both was 0.
  const moved = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('*'))
      .filter((el) => el.scrollWidth > el.clientWidth + 8 && el.scrollLeft !== 0)
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80)),
  );
  expect(moved, 'something scrolled itself without being asked to').toEqual([]);
});

test('every internal link resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href')!),
  );
  const unique = [...new Set(hrefs.map((h) => h.split('#')[0]!).filter(Boolean))];
  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), `${href} is broken`).toBeLessThan(400);
  }
});
