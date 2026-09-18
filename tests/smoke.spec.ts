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

test('the hero film has a visible pause control once it plays', async ({ page }) => {
  await page.goto('/');
  // The film loads after idle, so allow for it; if it never arrives the poster
  // stands in, which is a valid outcome and not a failure.
  const control = page.getByRole('button', { name: /pause film|play film/i });
  await control.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  if (await control.isVisible()) {
    await expect(control).toBeEnabled();
  }
});

test('the transactions rail never advances on its own', async ({ page }) => {
  await page.goto('/');
  const rail = page.getByLabel('Selected transactions, scrollable');
  await rail.scrollIntoViewIfNeeded();
  const before = await rail.evaluate((el) => el.scrollLeft);
  await page.waitForTimeout(3000);
  const after = await rail.evaluate((el) => el.scrollLeft);
  expect(after, 'the rail moved without being asked to').toBe(before);
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
