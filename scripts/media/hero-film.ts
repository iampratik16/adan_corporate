/**
 * The hero film's shot list. See docs/HERO-FILM.md.
 *
 * All eight shots are generated and kept. assemble-hero.ts cuts four of them
 * into the delivered film; the rest are what a longer cut is rebuilt from.
 *
 * Eight discrete 8-second shots, not one long generation. Veo's extend feature
 * samples the last second of a clip and adds ~7s per hop, so drift compounds
 * across eight hops: the palette shifts, geometry warps, figures mutate. Eight
 * separate shots also give per-shot retries and an actual edit.
 *
 *   8 x 8s = 64.0s, minus 7 crossfades x 0.6s = 59.8s
 */
import { HOUSE_LOOK } from './shots.js';

/**
 * The exterior clause, for the two aerials.
 *
 * CONTINUITY below says "same building", which is exactly right for six shots
 * standing inside one and exactly wrong for a shot a thousand feet above a
 * city. What has to hold across a cut from a lobby to a skyline is the hour and
 * the palette, not the architecture.
 *
 * "No recognisable skyline" is not boilerplate. The reference images supplied
 * for these two were Manhattan and Hong Kong, and shots.ts opens with the rule
 * that governs all of this: EVOKE, DO NOT DEPICT. A generated Manhattan is
 * always slightly wrong, and the people this film is made for work in that
 * city and will see it.
 */
export const EXTERIOR_CONTINUITY =
  'Same first light, same muted palette and same colour temperature as the reference image. A ' +
  'dense but entirely generic financial district: no recognisable skyline, no identifiable tower, ' +
  'no landmark of any real city. Camera drifting at the slowest possible speed, no shake.';

/** Every interior shot carries this, so separate generations stay one world. */
export const CONTINUITY =
  'Same building, same dawn light, same muted palette as the reference image. Consistent colour ' +
  'temperature throughout. Camera on a locked tripod or the slowest possible dolly, no handheld, ' +
  'no shake.';

export interface FilmShot {
  n: number;
  id: string;
  name: string;
  /** The anchor still's subject, before house look and continuity clause. */
  still: string;
  /** What moves. Deliberately almost nothing. */
  motion: string;
  /** Shots 1, 4 and 6 carry the people and cut to a 30s version on their own. */
  keep30: boolean;
  /** Replaces CONTINUITY. The aerials use it: they are not in the building. */
  continuity?: string;
}

export const SHOTS: FilmShot[] = [
  {
    n: 1,
    id: 'hero-01-lobby',
    name: 'Lobby, dawn',
    still:
      'A tall stone-and-glass office lobby at first light. Low sun rakes across a pale limestone ' +
      'floor in long bands. Two or three anonymous figures cross the frame at a walking pace, ' +
      'rendered in soft motion blur, none in focus, none facing camera. Reflections drift slowly ' +
      'across the glazing behind them. Camera locked off, symmetrical composition, strong verticals.',
    motion:
      'The camera is locked off and does not move. Two or three anonymous figures walk slowly ' +
      'across the frame and out of it, in soft motion blur, never facing camera, never in focus. ' +
      'Reflections drift slowly across the tall glazing. A shaft of low dawn light creeps almost ' +
      'imperceptibly across the pale stone floor.',
    keep30: true,
  },
  {
    n: 2,
    id: 'hero-02-glazing',
    name: 'Glazing',
    still:
      'The glass facade of an office building at dawn, framed flat and straight on. Reflections of ' +
      'cloud and neighbouring rooflines lie across the panes. A single figure is faintly visible ' +
      'behind the glass, well out of focus. Almost abstract: a grid of panes and reflected sky.',
    motion:
      'The camera is locked off. Reflections of cloud drift slowly across the panes. A single ' +
      'out-of-focus figure crosses behind one pane and leaves. Almost still.',
    keep30: false,
  },
  {
    n: 3,
    id: 'hero-03-stair',
    name: 'Stair',
    still:
      'Looking down a wide stone staircase from above. A figure ascends, hand sliding along a ' +
      'brushed brass handrail, seen from behind and above, face never visible. Morning light falls ' +
      'from a window off frame, throwing a soft rhomboid of light across the treads.',
    motion:
      'The camera is locked off above the stair. The figure continues to climb slowly and leaves ' +
      'the frame at the top. The hand slides along the brass rail. The patch of light on the ' +
      'treads shifts almost imperceptibly.',
    keep30: false,
  },
  {
    n: 4,
    id: 'hero-04-boardroom',
    name: 'Boardroom',
    still:
      'An empty boardroom at first light. A long dark timber table runs away from camera, its ' +
      'chairs pushed back at slightly different angles as though a meeting has just ended. The ' +
      'city beyond the full-height window is soft and out of focus in the early haze. Nobody present.',
    motion:
      'The camera makes an almost imperceptible dolly forward along the table. Light creeps slowly ' +
      'across the tabletop as a cloud passes. The haze beyond the window shifts. Nobody enters.',
    keep30: true,
  },
  {
    n: 5,
    id: 'hero-05-window',
    name: 'Window, blue hour',
    still:
      'A window beaded with rain at blue hour, shallow focus on the beads of water. Beyond it a ' +
      'harbour city is dissolved entirely into cool blue bokeh with one or two warmer lights. The ' +
      'glass is the subject. No interior detail, nothing identifiable beyond.',
    motion:
      'The camera is locked off. Beads of water on the glass slowly swell and run, one at a time. ' +
      'The circular bokeh beyond breathes very slightly as the water moves. Nothing else changes.',
    keep30: false,
  },
  {
    n: 6,
    id: 'hero-06-corridor',
    name: 'Corridor',
    still:
      'A long corridor with a pale stone floor and full-height glazing down one side. Pools of ' +
      'morning light repeat along the length of the floor. A single figure walks away from camera ' +
      'into the light, back to camera, soft focus. Camera on the corridor centre line.',
    motion:
      'The camera is locked off on the corridor centre line. The figure continues walking away ' +
      'into the light and out of frame. The pools of light on the floor shift almost ' +
      'imperceptibly. Nobody else enters.',
    keep30: true,
  },
  {
    n: 7,
    id: 'hero-07-material',
    name: 'Material',
    still:
      'Extreme close detail of the junction where a brushed brass edge meets fluted glass and ' +
      'honed pale stone. Very shallow depth of field. A low warm highlight travels along the ' +
      'metal. Entirely abstract, no human presence, no context.',
    motion:
      'The camera is locked off. A very slow rack focus travels from the brass edge to the fluted ' +
      'glass behind it. The warm highlight on the metal shifts a fraction. Nothing else moves.',
    keep30: false,
  },
  {
    n: 8,
    id: 'hero-08-return',
    name: 'Return',
    still:
      'The same tall stone-and-glass office lobby as the reference image, the same angle and the ' +
      'same framing, with the low dawn sun raking across the pale limestone floor. A single ' +
      'anonymous figure is crossing the frame in soft motion blur. Symmetrical, strong verticals.',
    motion:
      'The camera is locked off. A single figure crosses the frame and exits. The light and the ' +
      'composition settle back exactly to the reference frame by the final frame.',
    keep30: true,
  },
  {
    n: 9,
    id: 'hero-09-skyline',
    name: 'Skyline, first light',
    still:
      'A high aerial view over a dense financial district at first light, looking slightly down ' +
      'across a forest of glass and stone towers that recedes to a wide river and a flat horizon. ' +
      'Low sun catches the east faces of the towers in long warm bands while the streets between ' +
      'them are still in deep blue shadow. Low cloud lies across the far distance. No figures.',
    motion:
      'The camera drifts forward and very slightly downward at the slowest possible speed, as if ' +
      'from a helicopter holding station. Nothing else moves but the light, which creeps across ' +
      'the tower faces, and the cloud, which is almost still. No people, no traffic detail.',
    keep30: false,
    continuity: EXTERIOR_CONTINUITY,
  },
  {
    n: 10,
    id: 'hero-10-aerial',
    name: 'Blocks, straight down',
    still:
      'A straight-down aerial directly above dense city blocks at blue hour. Rooftops, courtyards ' +
      'and the lit lines of streets read as a geometric pattern, the towers falling away from the ' +
      'centre of the frame in strict symmetry. Street lighting picks out the grid in small warm ' +
      'points against cool blue-grey concrete. Entirely abstract. No figures.',
    motion:
      'The camera holds directly overhead and rotates about its own axis at the slowest ' +
      'perceptible speed, less than a few degrees across the shot. The street lights hold steady. ' +
      'Nothing else moves.',
    keep30: false,
    continuity: EXTERIOR_CONTINUITY,
  },
];

export const stillPrompt = (shot: FilmShot): string =>
  `${shot.still} ${shot.continuity ?? CONTINUITY} ${HOUSE_LOOK}`;

export const motionPrompt = (shot: FilmShot): string =>
  `${shot.motion} ${shot.continuity ?? CONTINUITY} No camera movement beyond what is described, no zoom, no cuts, ` +
  `no faces in focus, no text. ${HOUSE_LOOK}`;

/** Budget for the film alone, retries included. See docs/HERO-FILM.md section 8. */
export const FILM_BUDGET = { fast: 40, standard: 12 } as const;

/** Veo bills per second of output. Rough shape only; read the pricing page. */
export const RATE_PER_SECOND = { fast: 0.12, standard: 0.4 } as const;
