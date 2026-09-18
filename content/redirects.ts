/**
 * Permanent redirects from the old adancorporate.com to the new routes.
 *
 * Coverage: 207 source paths in total.
 *   176  every URL in content/_source/old-urls.txt (the old sitemap)
 *    29  team profile pages at /en-uk/team/<slug>.html, which the sitemap omits
 *         (listed in content/_source/people.md)
 *     2  the bare directory forms /en-uk/ and /en-uk/home/
 *
 * Grouped by destination so the ~150 folded sub-service pages read as the sets
 * they are. The exported array is flattened and sorted by source path.
 *
 * Judgement calls worth a partner's eye:
 *  - /en-uk/legal/sitemap.html has no counterpart. It goes to the home page,
 *    since the new site's navigation and the generated sitemap.xml replace it.
 *  - /en-uk/careers/diversity-policy.html goes to /careers, per the agreed rule
 *    that everything under /careers/ folds into the careers page, even though
 *    the same policy text also lives at /legal/diversity-policy.
 *  - Vinayak Hattangadi has no old profile page (that URL returns 404), so he
 *    has no redirect here.
 *  - The hash anchors below are capability ids on the pillar pages. Re-check
 *    them against content/pillars.ts: an anchor that no longer exists still
 *    lands on the right pillar page, it just does not scroll.
 */
import { z } from 'zod';

/** destination -> the old paths that fold into it */
const byDestination: Record<string, string[]> = {
  '/': ['/en-uk/', '/en-uk/home/', '/en-uk/home/index.html', '/en-uk/legal/sitemap.html'],
  '/podcast': ['/en-uk/about-us/a-done-deal-adan-podcast-index.html'],
  '/people': ['/en-uk/about-us/alumni.html', '/en-uk/about-us/team.html'],
  '/about': [
    '/en-uk/about-us/company-overview.html',
    '/en-uk/about-us/the-adan-advantage.html',
    '/en-uk/about-us/vision-mission-values.html',
  ],
  '/contact': ['/en-uk/about-us/contact-us.html'],
  '/contact#offices': ['/en-uk/about-us/global-locations.html'],
  '/insights': ['/en-uk/about-us/insights-blog.html'],
  '/careers': [
    '/en-uk/careers/careers.html',
    '/en-uk/careers/diversity-policy.html',
    '/en-uk/careers/experienced-hires.html',
    '/en-uk/careers/global-presence.html',
    '/en-uk/careers/interns.html',
    '/en-uk/careers/organisation-culture.html',
  ],
  '/transactions': ['/en-uk/clients/clients.html'],
  '/transactions/mandates': ['/en-uk/clients/live-deals.html'],
  '/expertise/strategy-leadership#coaching-and-leadership': [
    '/en-uk/coaching/assess-and-improve-business-relationships.html',
    '/en-uk/coaching/authentic-performance-measures.html',
    '/en-uk/coaching/building-coaching-cultures.html',
    '/en-uk/coaching/career-identity.html',
    '/en-uk/coaching/career-transition.html',
    '/en-uk/coaching/cultural-intelligence-cq.html',
    '/en-uk/coaching/executive-coaching.html',
    '/en-uk/coaching/index-careers.html',
    '/en-uk/coaching/index-coaching.html',
    '/en-uk/coaching/index-executive-coaching.html',
    '/en-uk/coaching/index-leadership.html',
    '/en-uk/coaching/leadership-and-business-values.html',
    '/en-uk/coaching/leadership-assessment.html',
    '/en-uk/coaching/leadership-development.html',
    '/en-uk/coaching/leadership-identity.html',
    '/en-uk/coaching/mentoring.html',
    '/en-uk/coaching/principled-negotiation-skills.html',
    '/en-uk/coaching/purpose-assessment-and-facilitation.html',
    '/en-uk/coaching/team-coaching.html',
    '/en-uk/coaching/transitioning-into-an-entrepreneur.html',
    '/en-uk/strategy/mentors.html',
    '/en-uk/strategy/pitch-preparation-king-s-speech.html',
  ],
  '/expertise/corporate-finance': [
    '/en-uk/corporate-finance/commercial-mediation.html',
    '/en-uk/corporate-finance/government-grants.html',
    '/en-uk/corporate-finance/index-corporate-finance.html',
    '/en-uk/corporate-finance/index-other-categories.html',
    '/en-uk/corporate-finance/index-other-services.html',
    '/en-uk/corporate-finance/investors-performance-enhancement.html',
    '/en-uk/corporate-finance/transfer-pricing.html',
    '/en-uk/startups/applied-entrepreneurship.html',
    '/en-uk/startups/career-transition.html',
    '/en-uk/startups/entrepreneurial-leadership-toolbox.html',
    '/en-uk/startups/entrepreneurial-mindset-and-leadership.html',
    '/en-uk/startups/entrepreneurship-for-engineers.html',
    '/en-uk/startups/financing-entrepreneurial-ventures.html',
    '/en-uk/startups/index-entrepreneurship.html',
    '/en-uk/startups/index-startup-financing.html',
    '/en-uk/startups/index-startups.html',
    '/en-uk/startups/index-transitioning.html',
    '/en-uk/startups/innovation-from-concept-to-product.html',
    '/en-uk/startups/managing-growing-businesses.html',
    '/en-uk/startups/marketing-management.html',
    '/en-uk/startups/startups-growth-capital.html',
    '/en-uk/startups/transitioning-into-an-entrepreneur.html',
  ],
  '/expertise/corporate-finance#debt-and-project-finance': [
    '/en-uk/corporate-finance/credit-ratings-assistance.html',
    '/en-uk/corporate-finance/debt-financing.html',
    '/en-uk/corporate-finance/factoring.html',
    '/en-uk/corporate-finance/index-debt-financing.html',
    '/en-uk/corporate-finance/invoice-discounting.html',
    '/en-uk/corporate-finance/project-finance.html',
    '/en-uk/corporate-finance/renewable-energy-financing.html',
    '/en-uk/corporate-finance/working-capital-and-trade-finance.html',
  ],
  '/expertise/corporate-finance#special-situations-and-exits': [
    '/en-uk/corporate-finance/distressed-asset-management.html',
    '/en-uk/corporate-finance/divestments-and-exit-planning.html',
    '/en-uk/corporate-finance/special-situations.html',
    '/en-uk/corporate-finance/transformation-and-restructuring.html',
  ],
  '/expertise/corporate-finance#equity-and-growth-capital': [
    '/en-uk/corporate-finance/family-offices-investments.html',
    '/en-uk/corporate-finance/fund-placement.html',
    '/en-uk/corporate-finance/index-equity-financing.html',
    '/en-uk/corporate-finance/ipo.html',
    '/en-uk/corporate-finance/private-equity-venture-capital.html',
    '/en-uk/corporate-finance/startups-growth-capital.html',
  ],
  '/expertise': [
    '/en-uk/covid-19/covid-19-business-continuity-and-resilience.html',
    '/en-uk/covid-19/covid-19-business-impact-analysis.html',
    '/en-uk/covid-19/covid-19-cash-flow-management.html',
    '/en-uk/covid-19/covid-19-restructuring.html',
    '/en-uk/covid-19/covid-19-risk-management.html',
    '/en-uk/covid-19/covid-19-technology-it-continuity.html',
    '/en-uk/covid-19/covid-19-uk-cbils-coronavirus-business-interruption-loan-scheme.html',
    '/en-uk/covid-19/index-covid-19-services.html',
  ],
  '/expertise/ai-digital': [
    '/en-uk/digital/analytics.html',
    '/en-uk/digital/artificial-intelligence.html',
    '/en-uk/digital/blockchain-advisory.html',
    '/en-uk/digital/internet-of-things-iot.html',
    '/en-uk/digital/products-and-solutions.html',
    '/en-uk/digital/robotic-process-automation-rpa.html',
    '/en-uk/digital/visyond.html',
  ],
  '/legal/accessibility': ['/en-uk/legal/accessibility.html'],
  '/legal/cookie-policy': ['/en-uk/legal/cookie-policy.html'],
  '/legal/diversity-policy': ['/en-uk/legal/diversity-policy.html'],
  '/legal/gdpr-policy': ['/en-uk/legal/gdpr-policy.html'],
  '/legal/legal': ['/en-uk/legal/legal.html'],
  '/legal/privacy-policy': ['/en-uk/legal/privacy-policy.html'],
  '/expertise/mergers-acquisitions#joint-ventures-and-alliances': [
    '/en-uk/m-and-a/alliances.html',
    '/en-uk/m-and-a/index-alliances-jvs-partnerships.html',
    '/en-uk/m-and-a/joint-ventures.html',
    '/en-uk/m-and-a/partnerships.html',
  ],
  '/expertise/mergers-acquisitions#buy-side': [
    '/en-uk/m-and-a/buy-a-business.html',
    '/en-uk/m-and-a/index-buy-a-business.html',
    '/en-uk/m-and-a/leveraged-buy-outs-lbos.html',
    '/en-uk/m-and-a/mbos-and-mbis.html',
  ],
  '/expertise/mergers-acquisitions#valuation-and-deal-strategy': [
    '/en-uk/m-and-a/deal-strategy.html',
    '/en-uk/m-and-a/manda-company-valuation.html',
  ],
  '/expertise/mergers-acquisitions': ['/en-uk/m-and-a/index-m-and-a.html'],
  '/expertise/mergers-acquisitions#mergers-and-integration': [
    '/en-uk/m-and-a/index-mergers.html',
    '/en-uk/m-and-a/manda-synergies.html',
    '/en-uk/m-and-a/mergers.html',
    '/en-uk/m-and-a/post-merger-integration-pmi.html',
  ],
  '/expertise/mergers-acquisitions#sell-side': [
    '/en-uk/m-and-a/index-sell-your-business.html',
    '/en-uk/m-and-a/sell-your-business.html',
  ],
  // Business continuity and disaster recovery are items under the
  // technology-risk-and-resilience capability, not a capability of their own.
  '/expertise/risk-governance#technology-risk-and-resilience': [
    '/en-uk/risk-management/business-continuity.html',
    '/en-uk/risk-management/disaster-recovery-and-resilience.html',
    '/en-uk/risk-management/cloud-risk.html',
    '/en-uk/risk-management/data-assurance.html',
    '/en-uk/risk-management/erp-control-and-assurance.html',
    '/en-uk/risk-management/grc-governance-risk-and-compliance.html',
    '/en-uk/risk-management/index-technology-risk-and-governance.html',
    '/en-uk/risk-management/iso-27001.html',
    '/en-uk/risk-management/it-governance.html',
    '/en-uk/risk-management/vendor-risk.html',
  ],
  '/expertise/risk-governance#financial-risk': [
    '/en-uk/risk-management/credit-risk.html',
    '/en-uk/risk-management/index-financial-risk-management.html',
    '/en-uk/risk-management/market-risk.html',
    '/en-uk/risk-management/regulatory-risk.html',
    '/en-uk/risk-management/treasury-liquidity-risk.html',
  ],
  '/expertise/risk-governance#enterprise-risk': [
    '/en-uk/risk-management/enterprise-risk-management.html',
    '/en-uk/risk-management/geopolitical-risk.html',
    '/en-uk/risk-management/index-business-risk-management.html',
    '/en-uk/risk-management/index-enterprise-risk.html',
    '/en-uk/risk-management/operational-risk.html',
    '/en-uk/risk-management/risk-management-strategy.html',
    '/en-uk/risk-management/risk-reporting.html',
  ],
  '/expertise/risk-governance#internal-audit-and-controls': [
    '/en-uk/risk-management/index-compliance-and-regulatory.html',
    '/en-uk/risk-management/index-internal-audit.html',
    '/en-uk/risk-management/internal-audit.html',
    '/en-uk/risk-management/soc1-and-soc2.html',
    '/en-uk/risk-management/sox-advisory.html',
    '/en-uk/risk-management/sox-implementation.html',
  ],
  '/expertise/risk-governance': [
    '/en-uk/risk-management/index-risk-management.html',
    '/en-uk/risk-management/risk-management-for-pe-funds.html',
    '/en-uk/risk-management/risk-management-for-smes.html',
    '/en-uk/risk-management/risk-management-training.html',
  ],
  '/expertise/strategy-leadership#board-advisory': [
    '/en-uk/strategy/board-advisors.html',
    '/en-uk/strategy/index-ned-board-advisory.html',
    '/en-uk/strategy/non-executive-directors-ned.html',
  ],
  '/expertise/strategy-leadership#corporate-and-growth-strategy': [
    '/en-uk/strategy/business-strategy-and-planning.html',
    '/en-uk/strategy/corporate-strategy-and-planning.html',
    '/en-uk/strategy/deal-strategy-and-planning.html',
    '/en-uk/strategy/decision-facilitation.html',
    '/en-uk/strategy/devil-s-advocate-and-red-teaming.html',
    '/en-uk/strategy/future-visioning.html',
    '/en-uk/strategy/geopolitical-strategy.html',
    '/en-uk/strategy/growth-strategy-and-planning.html',
    '/en-uk/strategy/index-strategy-and-planning.html',
    '/en-uk/strategy/international-expansion.html',
    '/en-uk/strategy/marketing-strategy-and-planning.html',
    '/en-uk/strategy/risk-strategy-and-planning.html',
  ],
  '/expertise/strategy-leadership#interim-management': [
    '/en-uk/strategy/index-interim-management.html',
    '/en-uk/strategy/interim-ceo-managing-director.html',
    '/en-uk/strategy/interim-cfo.html',
    '/en-uk/strategy/interim-cmo.html',
    '/en-uk/strategy/interim-coo.html',
    '/en-uk/strategy/interim-cro.html',
    '/en-uk/strategy/interim-cto.html',
    '/en-uk/strategy/interim-sales-head.html',
  ],
  '/expertise/strategy-leadership': [
    '/en-uk/strategy/index-strategy-services.html',
    '/en-uk/strategy/index-strategy.html',
  ],
  '/people/ajay-mavinkurve': ['/en-uk/team/ajay-mavinkurve.html'],
  '/people/ajay-sethi': ['/en-uk/team/ajay-sethi.html'],
  '/people/arun-shroff': ['/en-uk/team/arun-shroff.html'],
  '/people/craig-tingle': ['/en-uk/team/craig-tingle.html'],
  '/people/dipak-khot': ['/en-uk/team/dipak-khot.html'],
  '/people/edgar-garay': ['/en-uk/team/edgar-garay.html'],
  '/people/freddie-tshiaba': ['/en-uk/team/freddie-tshiaba.html'],
  '/people/george-christelis': ['/en-uk/team/george-christelis.html'],
  '/people/heena-tilwani': ['/en-uk/team/heena-tilwani.html'],
  '/people/jean-bernard-tanqueray': ['/en-uk/team/jean-bernard-tanqueray.html'],
  '/people/keshav-adya': ['/en-uk/team/keshav-adya.html'],
  '/people/kieran-bourke': ['/en-uk/team/kieran-bourke.html'],
  '/people/marco-salvini': ['/en-uk/team/marco-salvini.html'],
  '/people/mike-kemball': ['/en-uk/team/mike-kemball.html'],
  '/people/nav-kaplish': ['/en-uk/team/nav-kaplish.html'],
  '/people/neeraj-arora': ['/en-uk/team/neeraj-arora.html'],
  '/people/preethi-hari': ['/en-uk/team/preethi-hari.html'],
  '/people/raju-venkataraman': ['/en-uk/team/raju-venkataraman.html'],
  '/people/rauf-akhundov': ['/en-uk/team/rauf-akhundov.html'],
  '/people/roland-giebitz': ['/en-uk/team/roland-giebitz.html'],
  '/people/sabapaty-suryanarayanan': ['/en-uk/team/sabapaty-suryanarayanan.html'],
  '/people/sandeep-bhat': ['/en-uk/team/sandeep-bhat.html'],
  '/people/shreyash-gandhi': ['/en-uk/team/shreyash-gandhi.html'],
  '/people/sreeraman-p-s': ['/en-uk/team/sreeraman-p-s.html'],
  '/people/suresh-nambiar': ['/en-uk/team/suresh-nambiar.html'],
  '/people/thomas-peutz': ['/en-uk/team/thomas-peutz.html'],
  '/people/thu-nga-haskovcova': ['/en-uk/team/thu-nga-haskovcova.html'],
  '/people/varun-nadkarni': ['/en-uk/team/varun-nadkarni.html'],
  '/people/vernon-d-cruz': ['/en-uk/team/vernon-d-cruz.html'],
};

const Redirect = z.object({
  source: z.string().startsWith('/'),
  destination: z.string().startsWith('/'),
  permanent: z.literal(true),
});

const data = Object.entries(byDestination)
  .flatMap(([destination, sources]) =>
    sources.map((source) => ({ source, destination, permanent: true as const })),
  )
  .sort((a, b) => a.source.localeCompare(b.source));

// A duplicated source would be silently ignored by the router, so fail the build instead.
const duplicates = data.map((r) => r.source).filter((s, i, all) => all.indexOf(s) !== i);
if (duplicates.length > 0) {
  throw new Error(`content/redirects.ts has duplicate sources: ${duplicates.join(', ')}`);
}
if (data.length !== 207) {
  throw new Error(`content/redirects.ts expected 207 redirects, found ${data.length}`);
}

export const redirects = z.array(Redirect).parse(data);
