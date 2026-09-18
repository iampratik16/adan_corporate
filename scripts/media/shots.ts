/**
 * Shot list and prompts for every generated asset on the site.
 *
 * Rule that governs all of it: EVOKE, DO NOT DEPICT. Generated versions of real
 * skylines are always slightly wrong, and this audience works in those cities.
 * Adan was founded in 2013, so nothing here fakes heritage.
 *
 * Never used for people. Real headshots are downloaded and processed
 * deterministically; see scripts/media/portraits.ts.
 */

/** Appended verbatim to every image and film prompt so one world holds. */
export const HOUSE_LOOK =
  'Full-frame cinema camera, 40mm lens, natural available light at dawn or blue hour, ' +
  'muted palette of deep blue-black shadows, cool stone greys and occasional warm brass highlights, ' +
  'soft contrast, fine film grain, shallow depth of field, architectural composition with strong ' +
  'verticals, calm and unposed. No text, no signage, no logos, no recognisable landmarks, ' +
  'no faces in focus, no lens flare, no HDR look, no neon, no futuristic interfaces.';

/**
 * The daylight look, for the homepage card sections only.
 *
 * A deliberate departure from HOUSE_LOOK, asked for by the client against the
 * Rothschild & Co homepage, whose card photography is bright, green and summery
 * where ours is dawn. It is confined to the three audience cards, the four
 * insight cards and the two network plates; the hero film, the five pillars and
 * every other still stay on the house look. See docs/DECISIONS.md section 23,
 * which also records the cost: these cards will not sit in the same world as
 * the hero film, and that is the trade the brighter set was chosen for.
 */
export const BRIGHT_LOOK =
  'Full-frame camera, 35mm lens, clear natural daylight under a high blue sky, fresh green ' +
  'foliage, warm pale stone, crisp and open, gentle contrast, shallow depth of field, ' +
  'architectural composition, calm and unposed. No text, no signage, no logos, no recognisable ' +
  'landmarks, no faces in focus, no lens flare, no HDR look.';

export type AspectRatio = '16:9' | '9:16' | '3:2' | '4:5' | '1:1';

export interface StillShot {
  id: string;
  subject: string;
  aspectRatio: AspectRatio;
  /** Appended instead of HOUSE_LOOK. Only the homepage card sections use this. */
  look?: string;
  /** How many takes to generate before picking. Budget: 60 image calls total. */
  takes: number;
  /** Widths emitted by process.ts. */
  widths: number[];
  usage: string;
}

export interface FilmShot {
  id: string;
  /** Still that conditions the first frame, so poster and frame one are identical. */
  fromStill: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  durationSeconds: number;
  model: 'veo-3.1-generate-001' | 'veo-3.1-fast-generate-001';
  usage: string;
}

const TEXTURES: Array<[string, string]> = [
  ['texture-01', 'honed pale limestone, a single shallow saw mark catching raking light'],
  ['texture-02', 'brushed solid brass, fine unidirectional grain, slightly tarnished at one edge'],
  ['texture-03', 'fluted cast glass, vertical ribs, a cool blue interior blurred behind it'],
  ['texture-04', 'dark quarter-sawn oak, close open grain, a soft satin finish'],
  ['texture-05', 'woven charcoal wool suiting cloth, a faint twill diagonal'],
  ['texture-06', 'blued rolled steel plate, a faint mottled heat patina, one machined edge'],
];

export const STILLS: StillShot[] = [
  {
    id: 'hero-still',
    subject:
      'The ground-floor lobby of a contemporary stone and glass office building at dawn, ' +
      'photographed from inside. Low early sun rakes in at a shallow angle across a wide floor of ' +
      'pale honed limestone, throwing long soft shadows. Two or three anonymous figures in dark ' +
      'overcoats cross the frame at a walking pace and are rendered as soft motion blur, none of ' +
      'them facing camera, none in focus. Tall slender mullions divide a full-height glazed wall; ' +
      'layered reflections of the street and sky drift across the glass. A deep recessed ceiling ' +
      'and strong vertical stone piers frame the space. The mood is calm, early and almost empty.',
    aspectRatio: '16:9',
    takes: 3,
    widths: [640, 960, 1280, 1920, 2560],
    usage: 'Homepage hero poster. This is the LCP element, so it is graded and compressed hardest.',
  },
  {
    id: 'hero-poster',
    /*
     * NOT GENERATED. scripts/media/assemble-hero.ts writes
     * media/originals/stills/hero-poster.png as frame 0 of the graded film, and
     * this entry exists only so process.ts emits the responsive rungs for it.
     * Running generate.ts against this id would overwrite the extracted frame
     * with an invented one and silently break the match it exists to guarantee.
     *
     * `subject` is here because the type requires it, and describes the frame
     * the current cut happens to open on.
     */
    subject:
      'The opening frame of the hero film: a high aerial over a dense financial district at first ' +
      'light. Placed by assemble-hero.ts, never generated.',
    aspectRatio: '16:9',
    takes: 0,
    // No 2560 rung: the source is a frame of the 1920 film, and process.ts will
    // not upscale. The generated hero-still had one because it was a 2K render.
    widths: [640, 960, 1280, 1920],
    usage: 'The hero poster, and the LCP element. Must equal frame one of the film.',
  },
  {
    id: 'pillar-corporate-finance',
    subject:
      'Looking along a long stone facade in early light, where a modern glass extension meets the ' +
      'older masonry in a clean vertical joint. Sharp perspective down the wall, the stone warm ' +
      'and the glass cool, a narrow band of sky above. No people.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'Corporate Finance pillar page and the homepage expertise index.',
  },
  {
    id: 'pillar-ma',
    subject:
      'Two office buildings joined high above the street by an enclosed glass footbridge, seen from ' +
      'the pavement at blue hour looking up. The bridge is lit softly from within; the two buildings ' +
      'read as distinct masses either side of it. Strong verticals, deep blue sky, wet road below.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'Mergers & Acquisitions pillar page and the homepage expertise index.',
  },
  {
    id: 'pillar-strategy',
    subject:
      'An empty boardroom at first light. A long solid timber table runs away from camera, its ' +
      'chairs pushed back and left slightly askew as though a meeting has just broken up. One ' +
      'glass of water and a closed notebook remain. Beyond a full-height window the city is soft ' +
      'and out of focus in the early haze. Nobody is present.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'Strategy & Leadership pillar page and the homepage expertise index.',
  },
  {
    id: 'pillar-risk',
    subject:
      'A close architectural study of precise structural steel meeting stone: a repeating rhythm of ' +
      'machined steel brackets, bolts and shadow gaps against a honed stone wall. Flat even light, ' +
      'shallow depth of field falling away along the repeat. Entirely abstract, no people.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'Risk & Governance pillar page and the homepage expertise index.',
  },
  {
    id: 'pillar-ai-digital',
    subject:
      'A dark data hall photographed as architecture, not as technology. A single aisle of tall ' +
      'ranked equipment cabinets runs away from camera in strict perspective, their doors a ' +
      'regular grid of fine perforations. Hundreds of very small cool indicator points recede ' +
      'down the aisle, far too small to read as lights and reading instead as a texture. The ' +
      'floor is dark and slightly reflective. One warm highlight catches a brushed metal frame in ' +
      'the near foreground. Cold, quiet, immaculately kept, and entirely empty of people.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'AI & Digital pillar page and the homepage expertise index.',
  },
  {
    id: 'about-1',
    subject:
      'A tall window at blue hour, beaded with rain on the inside of the glass. Beyond it a harbour ' +
      'city is reduced entirely to soft circular bokeh: cool blue lights, one or two warm amber ' +
      'ones. The beads of water are the only thing in focus. Nothing is identifiable.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'About page opening band.',
  },
  {
    id: 'about-2',
    subject:
      'A quiet financial district street just after sunrise, shot along the pavement. Tall stone ' +
      'and glass buildings recede on both sides; long shadows across wet paving. One distant ' +
      'figure walks away from camera in soft motion blur, small in frame and unidentifiable. ' +
      'The street is otherwise empty.',
    aspectRatio: '3:2',
    takes: 2,
    widths: [640, 960, 1280, 1920],
    usage: 'About page network section.',
  },
  {
    id: 'contact',
    // Regenerated: the first take read as a medieval cloister, which is the
    // wrong register for a firm founded in 2013. The door is now explicitly
    // contemporary and the corridor explicitly an office.
    subject:
      'A tall contemporary door of dark oak with a slim vertical brass pull, standing ajar onto a ' +
      'bright modern office corridor beyond. Warm daylight from a full-height window at the far end ' +
      'spills through the opening and lies in a long shape across a pale honed limestone floor. ' +
      'The near side of the door and the wall around it are in deep shadow. The corridor beyond is ' +
      'plain, modern and softly out of focus: flat plastered walls, a recessed ceiling, no ' +
      'ornament, no arches, no stonework, nothing historic. Nobody is present.',
    aspectRatio: '16:9',
    takes: 2,
    widths: [960, 1280, 1920],
    usage: 'Contact page and the closing contact band.',
  },
  /* --- Homepage card sections. Daylight, not the house dawn: BRIGHT_LOOK. --- */
  {
    id: 'audience-companies',
    subject:
      'A tall modern stone and glass office tower seen steeply from below at street level, framed ' +
      'through the sunlit leaves of a street tree filling the near foreground. High clear blue ' +
      'sky. The leaves are soft and slightly translucent, the building sharp behind them.',
    aspectRatio: '1:1',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage audience card: companies and founders.',
  },
  {
    id: 'audience-funds',
    subject:
      'A handsome nineteenth-century stone townhouse frontage with tall windows and a wrought ' +
      'iron balcony, seen from across a quiet garden square in full summer leaf. One anonymous ' +
      'figure in a dark suit walks a gravel path, small in the frame and far from camera, face ' +
      'not visible. Benches and mown grass in the foreground.',
    aspectRatio: '1:1',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage audience card: funds and family offices.',
  },
  {
    id: 'audience-professionals',
    subject:
      'A carved classical stone cornice and arched window filling the left of the frame, with a ' +
      'cluster of modern glass towers rising behind and beyond it in bright daylight. The old ' +
      'masonry is sharp and warm, the towers cooler and slightly further away.',
    aspectRatio: '1:1',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage audience card: senior professionals.',
  },
  {
    id: 'statement',
    subject:
      'Three anonymous figures in dark suits standing talking in the bright atrium of a modern ' +
      'office, seen from the far side of the space and from behind and to one side, so no face is ' +
      'readable. Daylight floods down from a glazed roof onto a pale stone floor. They are small ' +
      'in a tall frame and the architecture holds most of it.',
    aspectRatio: '3:2',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage statement section, beside the standing text.',
  },
  {
    id: 'insight-career',
    subject:
      'A wide pale stone staircase rising towards a tall bright window, seen from the foot of the ' +
      'flight. Daylight falls across the treads in broad bands. A brass handrail catches the ' +
      'light. Nobody present.',
    aspectRatio: '16:9',
    look: BRIGHT_LOOK,
    takes: 1,
    widths: [640, 960, 1280],
    usage: 'Homepage insight card: career decisions.',
  },
  {
    id: 'insight-commodities',
    subject:
      'Rows of rolled steel coils standing in a clean sunlit yard, receding in strict perspective. ' +
      'Bright overcast daylight, cool grey metal with faint blue and amber oxidation. Purely ' +
      'geometric, industrial and orderly. Nobody present.',
    aspectRatio: '16:9',
    look: BRIGHT_LOOK,
    takes: 1,
    widths: [640, 960, 1280],
    usage: 'Homepage insight card: commodities risk.',
  },
  {
    id: 'insight-purpose',
    subject:
      'A quiet Japanese garden in bright morning light: raked gravel, a few placed stones and a ' +
      'maple in fresh green leaf, with a low timber fence behind. Calm, spare and open. Nobody ' +
      'present.',
    aspectRatio: '16:9',
    look: BRIGHT_LOOK,
    takes: 1,
    widths: [640, 960, 1280],
    usage: 'Homepage insight card: purpose and Ikigai.',
  },
  {
    id: 'insight-identity',
    subject:
      'A flat wall of clean office glazing filling the frame, reflecting a bright sky and the ' +
      'roofline of a neighbouring building. One anonymous figure is faintly reflected walking ' +
      'across the panes, out of focus and unidentifiable. Almost abstract.',
    aspectRatio: '16:9',
    look: BRIGHT_LOOK,
    takes: 1,
    widths: [640, 960, 1280],
    usage: 'Homepage insight card: professional identity.',
  },
  {
    id: 'network-1',
    subject:
      'Two anonymous colleagues in dark suits standing at a floor-to-ceiling window high in an ' +
      'office, looking out over a sunlit modern city. Seen from behind and slightly to one side, ' +
      'faces not visible. Bright daylight floods in and the room is in soft shadow.',
    aspectRatio: '4:5',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage network band, left plate.',
  },
  {
    id: 'network-2',
    subject:
      'A long polished dark timber boardroom table running away from camera, its surface ' +
      'reflecting a wall of bright windows and a sunlit city beyond. Empty leather chairs along ' +
      'both sides. Nobody present.',
    aspectRatio: '4:5',
    look: BRIGHT_LOOK,
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Homepage network band, right plate.',
  },
  ...TEXTURES.map(([id, subject]): StillShot => ({
    id,
    subject: `A macro material study, filling the frame: ${subject}. Absolutely flat-on, no objects, no context, no depth cues beyond the surface itself.`,
    aspectRatio: '1:1',
    takes: 1,
    widths: [400, 800, 1200],
    usage: 'Fallback card art for insights without imagery.',
  })),
];

export const FILMS: FilmShot[] = [
  /*
   * There is no 'hero-film' entry here any more, and there must not be one.
   *
   * The homepage hero is built by a different pipeline: eight shots defined in
   * hero-film.ts, generated by generate-hero.ts, cut and encoded by
   * assemble-hero.ts. Both pipelines wrote to public/media/hero-film-<width>.mp4,
   * so `pnpm media:process` would silently replace the assembled cut with a
   * single 8-second clip, and the only symptom was a hero that looked shorter
   * than it should. process.ts now refuses that name outright.
   */
  {
    id: 'pillar-strategy-loop',
    fromStill: 'pillar-strategy',
    prompt:
      'The camera is locked off. The empty boardroom is still. Only the light changes: the early ' +
      'sun rises a fraction and the soft haze beyond the window shifts slowly. One chair rocks ' +
      'almost imperceptibly to rest. No people enter. No camera movement, no cuts, no text.',
    aspectRatio: '16:9',
    durationSeconds: 6,
    model: 'veo-3.1-fast-generate-001',
    usage: 'Secondary loop on the Strategy & Leadership pillar page.',
  },
  {
    id: 'about-1-loop',
    fromStill: 'about-1',
    prompt:
      'The camera is locked off. Rain beads on the window slowly swell and run, one at a time. ' +
      'The circular bokeh of the harbour city beyond shifts and breathes very slightly as the ' +
      'water moves. Nothing else changes. No camera movement, no cuts, no people, no text.',
    aspectRatio: '16:9',
    durationSeconds: 6,
    model: 'veo-3.1-fast-generate-001',
    usage: 'Secondary loop on the About page.',
  },
];

/** Budget caps for the whole project, retries included (brief section 9). */
export const BUDGET = { images: 60, videos: 12 } as const;
