/**
 * The contact router must never show an empty result.
 *
 * Run: npx tsx scripts/check-enquiry-routing.ts
 */
import assert from 'node:assert/strict';
import { site } from '../content/site';
import type { PillarId } from '../content/schema';
import { PICKABLE, selectPartners } from '../src/lib/enquiry';

let checks = 0;

for (const route of site.enquiryRoutes) {
  for (const region of ['', ...PICKABLE]) {
    const { partners, reason } = selectPartners(route.pillar as PillarId | null, region);
    const where = `${route.id} / ${region || 'no preference'}`;

    assert.ok(partners.length >= 1, `${where}: no partner returned`);
    assert.ok(partners.length <= 3, `${where}: ${partners.length} partners, expected at most 3`);
    assert.ok(
      new Set(partners.map((p) => p.slug)).size === partners.length,
      `${where}: the same partner appears twice`,
    );

    if (route.pillar === null) {
      assert.equal(reason, 'no-pillar', `${where}: a route with no pillar must say so`);
    }
    if (reason === 'matched') {
      assert.ok(
        partners.every((p) => p.pillars.includes(route.pillar as PillarId)),
        `${where}: a matched result holds a partner who does not cover that pillar`,
      );
    }
    checks += 1;
  }
}

console.log(`Enquiry routing: ${checks} route and region combinations, all resolved.`);
