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

export type AspectRatio = '16:9' | '9:16' | '3:2' | '4:5' | '1:1';

export interface StillShot {
  id: string;
  subject: string;
  aspectRatio: AspectRatio;
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
    id: 'hero-still-portrait',
    subject:
      'The same stone and glass lobby at dawn in a tall vertical crop. Raking early light across ' +
      'pale limestone, one anonymous figure in a dark overcoat crossing in soft motion blur, ' +
      'full-height glazing with slender vertical mullions, deep shadow at the top of frame.',
    aspectRatio: '9:16',
    takes: 2,
    widths: [640, 960, 1280],
    usage: 'Hero poster on portrait phones, where the 16:9 crop loses the floor.',
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
  {
    id: 'hero-film',
    fromStill: 'hero-still',
    prompt:
      'The camera is locked off and does not move. Nothing in the architecture changes. Two or ' +
      'three anonymous figures in dark overcoats walk slowly across the frame and out of it, ' +
      'rendered in soft motion blur, never facing camera, never in focus. Reflections of the ' +
      'street drift slowly across the tall glazing. A shaft of low dawn light creeps almost ' +
      'imperceptibly across the pale stone floor. Extremely calm and slow. No camera movement, ' +
      'no zoom, no cuts, no people in focus, no text.',
    aspectRatio: '16:9',
    durationSeconds: 8,
    model: 'veo-3.1-generate-001',
    usage: 'Homepage hero. Poster is hero-still, so frame one must match it exactly.',
  },
  {
    id: 'hero-film-portrait',
    fromStill: 'hero-still-portrait',
    prompt:
      'The camera is locked off and does not move. One anonymous figure in a dark overcoat walks ' +
      'slowly across the lower frame in soft motion blur and leaves. Reflections drift slowly ' +
      'across the tall glazing. Low dawn light creeps almost imperceptibly across pale stone. ' +
      'No camera movement, no zoom, no cuts, no faces, no text.',
    aspectRatio: '9:16',
    durationSeconds: 8,
    model: 'veo-3.1-fast-generate-001',
    usage: 'Hero on portrait phones.',
  },
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
