import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { transactions } from '@content/transactions';
import { HeaderShell, type FeaturedCard, type NavPillar } from './HeaderShell';

/**
 * Server half of the header. It reduces the content modules down to the few
 * fields the navigation actually renders and passes those across the boundary,
 * so the full pillar copy, every capability description and all 36 transactions
 * stay out of the client bundle.
 */
export function Header() {
  const navPillars: NavPillar[] = pillars.map((pillar) => ({
    id: pillar.id,
    title: pillar.title,
    descriptor: pillar.descriptor,
    href: `/expertise/${pillar.id}`,
    capabilities: pillar.capabilities.map((c) => ({ id: c.id, title: c.title })),
  }));

  // The largest completed transaction is the strongest single proof point, and
  // unlike the insights it is not four years stale.
  const lead = transactions.find((t) => t.valueUsd !== null) ?? transactions[0]!;
  const featured: FeaturedCard = {
    kicker: 'Selected transaction',
    title: lead.headline,
    meta: `${lead.value} · ${lead.corridor}`,
    href: '/transactions',
  };

  return (
    <HeaderShell
      utility={[...site.nav.utility]}
      primary={[...site.nav.primary]}
      pillars={navPillars}
      featured={featured}
    />
  );
}
