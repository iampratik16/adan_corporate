/**
 * Insights and podcast.
 *
 * Every item here is transcribed from content/_source/insights.md. No article is
 * hosted on the old adancorporate.com: all thirteen point off-site, twelve to
 * LinkedIn and one to omny.fm, so every entry carries `external`. None has usable
 * imagery, so each falls back to a texture tile.
 *
 * The three "Blog Post" cards that appear in the sidebar of every old profile page
 * are placeholders, not articles, and are deliberately excluded.
 */
import { z } from 'zod';
import { Insight } from './schema';

/**
 * Real date range of the archive: 18 March 2018 to 12 August 2019. Nothing has been
 * published since. The module reads as an evergreen library rather than a news rail,
 * and fresh content is an open question for the client.
 */
export const insightsNeedRefresh = true;

const insightsData = [
  {
    slug: 'raju-venkataraman-five-best-career-decisions',
    title: "Podcast on Raju's 5 best career decisions",
    author: 'Raju Venkataraman',
    authorSlug: 'raju-venkataraman',
    date: '2018-03-18',
    summary:
      'Raju Venkataraman spent 32 years in corporate roles, including CFO and Head of Development at Disney South East Asia, before moving into executive coaching and leadership training. In this radio interview he sets out the five decisions he rates as the best of that career.',
    pillars: ['strategy-leadership'],
    image: 'insight-career',
    texture: '/media/texture-01.avif',
    external:
      'https://omny.fm/shows/money-fm-893/weekends-ex-disney-cfo-raju-venkataramans-5-best-c?in_playlist=money-fm-893!weekend-mornings-with-jason-dasey',
  },
  {
    slug: 'commodities-market-risk-management',
    title: 'Commodities market risk management',
    author: 'Kieran Bourke',
    authorSlug: 'kieran-bourke',
    date: '2019-01-10',
    summary:
      'A review of several high-profile losses in commodities trading and what caused them. Kieran Bourke works back from each failure to the controls a second-line market risk function needs if it is to contain losses of that kind.',
    pillars: ['risk-governance'],
    image: 'insight-commodities',
    texture: '/media/texture-02.avif',
    external:
      'https://www.linkedin.com/pulse/few-cases-commodities-market-risk-management-kieran-bourke/',
  },
  {
    slug: 'purpose-in-life-or-ikigai',
    title: 'Purpose in life, or Ikigai',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-07-23',
    summary:
      'Ikigai, the Japanese idea of a reason for being, is often linked to both longevity and contentment. Keshav Adya asks what yours is, and invites readers to answer with their own experience.',
    pillars: ['strategy-leadership'],
    image: 'insight-purpose',
    texture: '/media/texture-03.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6518504918066696192-0xON',
  },
  {
    slug: 'so-what-do-you-do',
    title: 'So, what do you do?',
    author: 'Raju Venkataraman',
    authorSlug: 'raju-venkataraman',
    date: '2018-03-18',
    summary:
      'Most people put off examining their lives until a crisis forces the question. Raju Venkataraman argues that knowing how to live matters at least as much as knowing how to make a living.',
    pillars: ['strategy-leadership'],
    image: 'insight-identity',
    texture: '/media/texture-04.avif',
    external: 'https://www.linkedin.com/pulse/so-what-do-you-raju-venkataraman/',
  },
  {
    slug: 'unknown-knowns-and-unknown-unknowns',
    title: 'Unknown knowns and unknown unknowns',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-07-23',
    summary:
      'Self-awareness is part emotional intelligence, part perception and part critical reasoning: the ability to see your own thinking, strengths, weaknesses, emotions and values. Keshav Adya sets out why leaders who lack it are less effective.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-05.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6557304811748900864-6i5g',
  },
  {
    slug: 'negotiating-business-deals-in-asia',
    title: 'Negotiating business deals in Asia',
    author: 'Raju Venkataraman',
    authorSlug: 'raju-venkataraman',
    date: '2019-08-12',
    summary:
      'Asia is not one negotiating culture but many, and business etiquette differs sharply between countries. Raju Venkataraman looks at that diversity and at what it means for the way a negotiation should be run.',
    pillars: ['strategy-leadership', 'mergers-acquisitions'],
    texture: '/media/texture-06.avif',
    external: 'https://www.linkedin.com/pulse/negotiating-business-deals-asia-raju-venkataraman/',
  },
  {
    slug: 'change-is-the-heartbeat-of-growth',
    title: 'Change is the heartbeat of growth',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-06-23',
    summary:
      'Change is an ordinary part of working life, yet most people find it uncomfortable because it feels like a loss of control. Keshav Adya looks at why that discomfort is the point rather than the problem.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-01.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6549368857109245952-lwaO/',
  },
  {
    slug: 'abcn-anybody-can-negotiate',
    title: 'ABCN: anybody can negotiate',
    author: 'Raju Venkataraman',
    authorSlug: 'raju-venkataraman',
    date: '2019-07-05',
    summary:
      "Anybody can negotiate was the theme of Raju Venkataraman's talk to MasterCard's APAC legal, franchise and integrity team in Singapore, a group of more than 70 people. The piece sets out the argument he put to them.",
    pillars: ['strategy-leadership'],
    texture: '/media/texture-02.avif',
    external: 'https://www.linkedin.com/pulse/abcn-anybody-can-negotiate-raju-venkataraman',
  },
  {
    slug: 'comfort-an-insidious-psychological-prison',
    title: 'Comfort: an insidious psychological prison',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-02-02',
    summary:
      'Almost all growth happens outside the comfort zone, and the wish to avoid discomfort is what most often prevents it. Keshav Adya describes comfort as a prison that is hard to notice and harder to leave.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-03.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-entrepreneurialmindset-activity-6501229847623270401-QAZh',
  },
  {
    slug: 'the-opposing-forces-of-change',
    title: 'The opposing forces of change',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-07-23',
    summary:
      'A good idea counts for nothing if it cannot be carried through. Keshav Adya argues that plans, however well drawn, are only maps of a journey nobody has yet made.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-04.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6550847762307534848-eyBZ',
  },
  {
    // Source conflict: the card title says "incredible", the image alt text says
    // "Unimaginable". Title taken as authoritative; see flags.
    slug: 'the-power-of-human-intent',
    title: 'The power of human intent is incredible',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-06-15',
    summary:
      'Much of leadership is moving attention away from present ambiguity and towards how things could be, then setting out the strategy to get there. Keshav Adya on intent as the starting point for that shift.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-05.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6504437064455454720-uIoy',
  },
  {
    // The old "Read More" href ended in a double slash; corrected to the canonical
    // single-slash form. The destination is unchanged.
    slug: 'its-attention-times-not-the-problem',
    title: "It's attention. Time's not the problem",
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-06-15',
    summary:
      'Attention, not time, is the scarce resource. What you pay attention to determines the experiences you have, and those experiences determine the life you lead.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-06.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-leadership-activity-6549616482022629376-o_G_/',
  },
  {
    slug: 'entrepreneurial-challenges',
    title: 'Entrepreneurial challenges',
    author: 'Chennakeshav (Keshav) Adya',
    authorSlug: 'keshav-adya',
    date: '2019-02-10',
    summary:
      'Most people dream of success; a few get up each morning and do the work. A short note from Keshav Adya on the distance between the two.',
    pillars: ['strategy-leadership'],
    texture: '/media/texture-01.avif',
    external:
      'https://www.linkedin.com/posts/cadya_thezymurgistdiaries-growthmindset-entrepreneurialmindset-activity-6503213326925860864-X0w5',
  },
] satisfies unknown[];

export const insights = z.array(Insight).parse(insightsData);

/** The podcast has no shape in schema.ts, so it is defined and validated here. */
export const PodcastEpisode = z.object({
  number: z.number().int().positive(),
  title: z.string(),
  guest: z.string(),
  /** Month precision: the old site dated episodes by month only, e.g. "SEP, 2020". */
  date: z.string().regex(/^\d{4}-\d{2}$/),
  description: z.string(),
  guestUrl: z.string().url().optional(),
  /** False where the old site showed "Coming soon..." against an empty link. */
  published: z.boolean(),
});
export type PodcastEpisode = z.infer<typeof PodcastEpisode>;

export const Podcast = z.object({
  name: z.string(),
  description: z.string(),
  host: z.string(),
  hostSlug: z.string(),
  spotify: z.string().url(),
  episodes: z.array(PodcastEpisode).min(1),
});
export type Podcast = z.infer<typeof Podcast>;

const podcastData = {
  name: 'A Done Deal',
  description:
    'Conversations with leaders and entrepreneurs about what sits beneath the job title. Keshav Adya talks to founders, investors and specialists about how they decide, negotiate and recover. Fourteen episodes were recorded between August 2020 and January 2021.',
  host: 'Chennakeshav (Keshav) Adya',
  hostSlug: 'keshav-adya',
  spotify: 'https://open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r',
  episodes: [
    {
      number: 14,
      title: 'Alfredo Ramos Plasencia on commercialising innovation',
      guest: 'Alfredo Ramos Plasencia',
      date: '2021-01',
      description:
        'Alfredo Ramos Plasencia, Managing Director of CPI Enterprises, the UK technology innovation centre that forms part of the High Value Manufacturing Catapult, on commercialising innovation, investment, learning entrepreneurship, career vision and process engineering.',
      guestUrl: 'https://www.linkedin.com/in/alfredoramosplasencia',
      published: false,
    },
    {
      number: 13,
      title: 'Pieter Hack on blue energy and the long view',
      guest: 'Pieter Hack',
      date: '2020-12',
      description:
        'Pieter Hack, Dutch entrepreneur and Chairman of REDstack BV, described by the source as the largest blue energy firm in the world, on sustainable energy, long-term vision and altruism.',
      guestUrl: 'https://www.linkedin.com/in/pieter-hack-639a0a18',
      published: true,
    },
    {
      number: 12,
      title: 'Rikard Strid on entrepreneurial resilience',
      guest: 'Rikard Strid',
      date: '2020-12',
      description:
        'Rikard Strid, Swedish entrepreneur, Chairman of KTC and founder of Clayster, on the internet of things, sustainable energy, bio-hacking, mental health, sleep and spirituality.',
      guestUrl: 'https://www.linkedin.com/in/rikardstrid',
      published: true,
    },
    {
      number: 11,
      title: 'Tony Wheeler on building a sustainable business',
      guest: 'Tony Wheeler',
      date: '2020-12',
      description:
        'Tony Wheeler, English publishing entrepreneur, businessman and travel writer, co-founder of Lonely Planet, on entrepreneurship, sustainable businesses, stamps, time machines and space travel.',
      guestUrl: 'https://en.wikipedia.org/wiki/Tony_Wheeler',
      published: true,
    },
    {
      number: 10,
      title: 'Ed Lord on ethics in finance and beyond',
      guest: 'Ed Lord',
      date: '2020-12',
      description:
        'Ed Lord, one of the founding figures of modern active credit portfolio management, on ethics in the financial world and outside it.',
      guestUrl: 'https://www.linkedin.com/in/edlord/',
      published: false,
    },
    {
      number: 9,
      title: 'Heidi Roizen on entrepreneurship, diversity and venture capital',
      guest: 'Heidi Roizen',
      date: '2020-12',
      description:
        'Heidi Roizen, Partner at Threshold Ventures, on entrepreneurship, diversity, venture capital and investing.',
      guestUrl: 'https://www.heidiroizen.com/',
      published: true,
    },
    {
      number: 8,
      title: 'Mike Kemball on push and pull sales',
      guest: 'Mike Kemball',
      date: '2020-10',
      description:
        'Mike Kemball, Partner, Turnaround and Growth, on simple techniques for driving change and turning businesses round using push and pull strategies.',
      published: true,
    },
    {
      number: 7,
      title: 'Raju Venkataraman on negotiation, part two',
      guest: 'Raju Venkataraman',
      date: '2020-10',
      description:
        'The second half of a conversation with Raju Venkataraman, Partner, Executive Coaching, on the art and science of negotiation. Raju brings more than 30 years of C-suite experience, most recently as CFO and Head of Strategy for the Walt Disney Company in South East Asia.',
      published: true,
    },
    {
      number: 6,
      title: 'Raju Venkataraman on negotiation, part one',
      guest: 'Raju Venkataraman',
      date: '2020-10',
      description:
        'Raju Venkataraman, Partner, Executive Coaching, on the art and science of negotiation, and on the cross-cultural experience he has built across the Asia-Pacific region.',
      published: true,
    },
    {
      number: 5,
      title: 'Nav Kaplish on ERP risk management',
      guest: 'Nav Kaplish',
      date: '2020-09',
      description:
        'Nav Kaplish, Partner, Risk Management, on vulnerabilities in enterprise resource planning systems. Because these are usually out-of-the-box installations, they rarely arrive with the controls that regulators, management and internal auditors expect.',
      published: true,
    },
    {
      number: 4,
      title: 'Mike Kemball on turnaround and growth',
      guest: 'Mike Kemball',
      date: '2020-09',
      description:
        'Mike Kemball, Partner, Turnaround and Growth, on how businesses can be turned round in the conditions created by COVID-19.',
      published: true,
    },
    {
      number: 3,
      title: 'Nav Kaplish on enterprise risk management',
      guest: 'Nav Kaplish',
      date: '2020-09',
      description: 'Nav Kaplish, Partner, Risk Management, on enterprise risk management.',
      published: true,
    },
    {
      number: 2,
      title: 'Dipak Khot on market risk management',
      guest: 'Dipak Khot',
      date: '2020-09',
      description:
        'Dipak Khot, Partner, Risk Management, on liquidity and market risk, and on what a structured approach to identifying, assessing and managing risk looks like in practice.',
      published: true,
    },
    {
      number: 1,
      title: "Dr Nicholas Beecroft on devil's advocacy and decision making",
      guest: 'Dr Nicholas Beecroft',
      date: '2020-08',
      description:
        'Dr Nicholas Beecroft, Partner, Executive Coaching and Commercial Mediation, on combining logic and analysis with emotional intelligence, intuition, mindfulness and judgement. He also describes saving a family office a sum he puts at US$27 million in a single afternoon.',
      published: true,
    },
  ],
};

export const podcast = Podcast.parse(podcastData);
