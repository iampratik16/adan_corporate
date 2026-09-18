import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { HeaderShell } from './HeaderShell';

/**
 * Server half of the header. It reduces the content modules to the few fields
 * the navigation renders, so the full pillar copy stays out of the client bundle.
 *
 * There is no mega panel any more: Expertise is a plain link to the overview,
 * which already carries the five pillars with their descriptors, their
 * capabilities and their photography. A panel that duplicated that was a second
 * place to keep the same list correct.
 */
export function Header() {
  const navPillars = pillars.map((pillar) => ({
    id: pillar.id,
    title: pillar.title,
    descriptor: pillar.descriptor,
    href: `/expertise/${pillar.id}`,
  }));

  return (
    <HeaderShell
      primary={[...site.nav.primary]}
      secondary={[...site.nav.secondary]}
      pillars={navPillars}
    />
  );
}
