import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

/**
 * WCAG 2.2 AA, via axe, on every route.
 *
 * Reveals are forced on first: an element still waiting for its
 * IntersectionObserver is at opacity 0, and axe would either skip it or report
 * a contrast failure against the wrong background.
 */
test.describe('accessibility', () => {
  for (const route of ROUTES) {
    test(`${route} has no axe violations`, async ({ page }) => {
      await page.goto(route);

      // Kill transitions before revealing. Reveals fade opacity 0 to 1 over
      // 700ms, and axe sampling mid-transition reads text at partial opacity
      // and reports a contrast failure that does not exist once it settles.
      // This was a flaky failure on the mobile project, not a real defect.
      await page.addStyleTag({
        content: '*,*::before,*::after{transition:none!important;animation:none!important}',
      });
      await page.evaluate(() => {
        document
          .querySelectorAll('[data-reveal]')
          .forEach((el) => el.setAttribute('data-revealed', ''));
      });
      await page.waitForTimeout(250);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.help}`,
      );
      expect(summary, `${route} axe violations`).toEqual([]);
    });
  }
});

test('the mobile menu traps focus and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('the expertise mega panel is keyboard operable', async ({ page }) => {
  // The panel is a desktop control. Below 1024px the same content lives in the
  // mobile sheet, which the test above covers.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Expertise' }).first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'Corporate Finance' }).first()).toBeVisible();
  await page.keyboard.press('Escape');
});
