import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

/**
 * The site has to work when the browser will not cooperate: no JavaScript,
 * reduced motion, Save-Data, a slow connection.
 */
test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const route of ROUTES) {
    test(`${route} is readable with scripting disabled`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).not.toBeEmpty();
      // Reveals must not leave content invisible when nothing can reveal them.
      const hidden = await page.evaluate(
        () =>
          Array.from(document.querySelectorAll('[data-reveal]')).filter(
            (el) => Number(getComputedStyle(el).opacity) === 0,
          ).length,
      );
      expect(hidden, 'content is stuck at opacity 0 with JS off').toBe(0);
    });
  }

  test('both contact forms are usable without scripting', async ({ page }) => {
    await page.goto('/contact');

    // Two forms by design. The router is a GET so a reader can choose an
    // enquiry route and have the page come back with the right partner, and
    // the message form is a POST that React's server action handles without
    // hydration.
    const forms = page.locator('form');
    await expect(forms).toHaveCount(2);

    const router = forms.first();
    await expect(router).toBeVisible();
    expect((await router.getAttribute('method'))?.toLowerCase()).toBe('get');
    expect(await router.getAttribute('action')).toBe('/contact');

    const message = forms.nth(1);
    await expect(message).toBeVisible();
    expect((await message.getAttribute('method'))?.toLowerCase()).toBe('post');
    // Every field the server action requires must be present and labelled.
    for (const name of ['name', 'email', 'message']) {
      await expect(message.locator(`[name="${name}"]`)).toHaveCount(1);
    }
  });

  test('choosing an enquiry route works without scripting', async ({ page }) => {
    // The router is a GET form, so submitting it is a plain navigation.
    await page.goto('/contact?enquiry=manage-risk');
    await expect(page.locator('h1')).toBeVisible();
    const checked = page.locator('input[name="enquiry"][checked], option[selected]');
    expect(await checked.count(), 'the chosen route should come back selected').toBeGreaterThan(0);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the hero poster still paints under reduced motion', async ({ page }) => {
    // The film now plays here too, by client instruction, but the poster is
    // still the LCP element and still has to be on screen before it arrives.
    await page.goto('/');
    await expect(page.locator('section').first().locator('img').first()).toBeVisible();
  });

  test('reduced motion no longer withholds the film', async ({ page }) => {
    // It used to, and the client reported that twice as a broken video before
    // asking three times for the hero to autoplay. Their call, recorded in
    // docs/DECISIONS.md section 28. Save-Data and a slow link still withhold,
    // because those are about somebody's data bill rather than about motion.
    await page.goto('/');
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            Array.from(document.querySelectorAll('section video')).some(
              (v) => !(v as HTMLVideoElement).paused && (v as HTMLVideoElement).currentTime > 0,
            ),
          ),
        { message: 'the hero film did not autoplay under reduced motion', timeout: 15_000 },
      )
      .toBe(true);
  });

  test('all content is visible without reveal animations', async ({ page }) => {
    await page.goto('/about');
    const hidden = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll('[data-reveal]')).filter(
          (el) => Number(getComputedStyle(el).opacity) === 0,
        ).length,
    );
    expect(hidden).toBe(0);
  });
});

test('404 offers a way onward', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
  const links = await page.locator('main a[href^="/"]').count();
  expect(links, 'a 404 with no routes out is a dead end').toBeGreaterThan(3);
});

test('old URLs redirect permanently', async ({ request }) => {
  for (const [from, to] of [
    ['/en-uk/home/index.html', '/'],
    ['/en-uk/about-us/team.html', '/people'],
    ['/en-uk/clients/clients.html', '/transactions'],
    ['/en-uk/digital/artificial-intelligence.html', '/expertise/ai-digital'],
  ]) {
    const response = await request.get(from!, { maxRedirects: 0 });
    expect([301, 308], `${from} should redirect permanently`).toContain(response.status());
    expect(response.headers()['location']).toContain(to!);
  }
});
