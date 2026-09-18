# Adan Corporate: hero film

Addendum to `docs/BRIEF.md`. It replaces the `hero-still` and `hero-film` rows in section 9 of the
main brief and the video budget line. Everything else in section 9 (house look, quality control,
grade, the rule against generating real people) still applies.

## 1. What we are making

A 60-second ambient film behind the homepage hero, in the manner of Rothschild & Co: people moving
through architecture at dawn, no faces in focus, no dialogue, no cuts that announce themselves,
nothing that competes with the headline sitting on top of it. Evercore's hero is the same idea run
longer, a slow scrolling film under a four-word line and a row of figures.

The film is atmosphere, not a story. Nobody watches it deliberately. It has to survive being
half-covered by an H1, read at a glance on a laptop in an airport lounge, and loop for as long as
somebody leaves the tab open without ever calling attention to the loop point.

Rules that follow from that:

- No audio. Strip it at generation (`generateAudio: false`) and again in encoding.
- No text, signage, logos, screens showing interfaces, or recognisable landmarks.
- No face is ever in focus or held. People read as figures: silhouettes, motion blur, backs, hands.
- No camera move faster than a slow drift. No whip pans, no drone rises, no speed ramps.
- One continuous world: same time of day, same weather, same palette across all eight shots.
- It loops. The last frame matches the first exactly.

## 2. Why it is built as eight shots, not one long generation

Veo 3.1 generates 4, 6 or 8 second clips. Longer output comes from the extend feature, which samples
the last second of a clip and adds roughly 7 seconds per hop, chained.

Do not build the hero by chaining extends. Each hop is generated from the previous output, so drift
compounds: the palette shifts, geometry warps, and figures mutate across 8 hops. At least one
provider also reports extension output capped at 720p. Extension is also Vertex-only, which is fine
here, but it gives you one long take with no editorial control.

**Build it as 8 discrete 8-second shots at 1080p, graded identically and assembled with crossfades.**
This is how the reference films were actually cut, it gives per-shot retries without regenerating the
whole piece, and the maths lands exactly on target:

```
8 shots x 8s = 64.0s
7 crossfades x 0.6s overlap = -4.2s
total = 59.8s
```

Use extend only as a fallback if a single shot needs to run longer than 8 seconds, and record that in
`docs/DECISIONS.md`.

## 3. Continuity method

Generate stills first, animate stills second. Text-to-video across eight separate calls will not hold
one world; image-to-video from a matched set of stills will.

1. Generate **`hero-key`**, the opening lobby still, with `gemini-3-pro-image`. Iterate on this one
   image until it is genuinely good. Everything else is built to match it, so time spent here pays
   back eight times. It is also the page's poster and its LCP element.
2. Generate the other seven **anchor stills** with the same model, each prompt carrying the house look
   plus an explicit continuity clause: same building, same dawn light, same palette as the reference.
   Where the image model accepts a reference image, pass `hero-key`.
3. Lay the eight stills out side by side in one contact sheet and inspect them as a set. Reject any
   that break the world, whatever their individual quality. Only proceed when all eight sit together.
4. Animate each still with `veo-3.1-generate-001` in image-to-video mode, the still as first frame,
   8 seconds, 1080p, 16:9, audio off.
5. For **shot 8 only**, pass first and last frame conditioning: first frame is shot 8's anchor still,
   last frame is `hero-key`. That closes the loop in the model rather than in the edit.
6. Draft everything on `veo-3.1-fast-generate-001` first. Only re-run approved shots on the standard
   model.

## 4. Shot list

House look from section 9 of the main brief is appended to every prompt. Add this continuity clause
to all eight: _"Same building, same dawn light, same muted palette as the reference image. Consistent
colour temperature throughout. Camera on a locked tripod or the slowest possible dolly, no handheld,
no shake."_

| #   | Time | Shot                  | Prompt (before house look and continuity clause)                                                                                                                                                                                                                                                                                                                         |
| --- | ---- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | 0:00 | **Lobby, dawn**       | A tall stone-and-glass office lobby at first light. Low sun rakes across a pale limestone floor in long bands. Two or three anonymous figures cross the frame at a walking pace, rendered in soft motion blur, none in focus, none facing camera. Reflections drift slowly across the glazing behind them. Camera locked off, symmetrical composition, strong verticals. |
| 2   | 0:08 | **Glazing**           | The glass facade of an office building at dawn, framed flat. Reflections of cloud and neighbouring rooflines drift slowly across the panes. A single figure is faintly visible behind the glass, out of focus, crossing one pane and leaving. Almost still.                                                                                                              |
| 3   | 0:16 | **Stair**             | Looking down a wide stone staircase from above. A figure ascends, hand sliding along a brushed brass handrail, seen from behind and above, face never visible. Morning light falls from a window off frame, throwing a soft rhomboid across the treads. Camera locked off.                                                                                               |
| 4   | 0:24 | **Boardroom**         | An empty boardroom at first light. Long dark timber table, chairs pushed back at slightly different angles as though a meeting has just ended. Light creeps slowly across the tabletop as a cloud passes. The city beyond the window is soft and out of focus. Imperceptible dolly forward.                                                                              |
| 5   | 0:32 | **Window, blue hour** | A window beaded with rain at blue hour, shallow focus on the beads. Beyond it, a harbour city dissolved into cool bokeh, with one or two lights shifting slowly. The glass is the subject. No interior detail.                                                                                                                                                           |
| 6   | 0:40 | **Corridor**          | A long corridor with stone floor and full-height glazing on one side. A single figure walks away from camera into the light and out of frame, in soft focus, back to camera. Pools of morning light repeat down the length of the floor. Camera locked off at the corridor's centre line.                                                                                |
| 7   | 0:48 | **Material**          | Extreme close detail where brushed brass meets fluted glass and honed stone. Very slow rack focus travelling from the brass edge to the glass. Shallow depth of field. Low warm highlight on the metal. No human presence.                                                                                                                                               |
| 8   | 0:56 | **Return**            | The same stone-and-glass lobby, same angle and framing as the opening shot. A single figure crosses and exits. The light and composition settle back to exactly the reference frame. Camera locked off.                                                                                                                                                                  |

Shots 1, 4 and 6 carry the people. Shots 2, 5 and 7 are breathing room. Shot 3 is the only one with a
body close to camera. If the client later prefers a shorter film, shots 1, 4, 6 and 8 cut to a
30-second version on their own, so keep them strongest.

## 5. Quality control per shot

Extract frames at 0, 2, 4, 6 and 8 seconds with ffmpeg and inspect every one. Reject and re-prompt on
any of these:

- A face resolving into focus, or a figure looking at camera.
- Legible or pseudo text, signage, a logo, a screen with an interface.
- Warped architecture, a figure melting, limbs multiplying, a reflection that does not track.
- Palette or colour temperature drifting away from `hero-key`.
- A recognisable building or skyline.
- Anything that reads as stock footage: a handshake, a group nodding around a laptop, someone
  pointing at a chart.

Three attempts per shot. If a shot fails three times, cut it and redistribute its 8 seconds by
holding a neighbouring shot longer at the edit, then note it.

## 6. Grade and assembly

One grade applied identically to all eight, after generation, in ffmpeg:

- slight desaturation, gentle S-curve on contrast, a small lift in the shadows towards blue
- no added film grain in the video file (grain destroys compression at these bitrates); if grain is
  wanted, add it as a CSS overlay at 2 to 3% opacity over the video element

Assembly: concatenate with `xfade` at 0.6 seconds between each pair, easing `fade`. Verify the final
duration lands within 59.5 to 60.5 seconds. Then verify the loop: play the last two seconds followed
by the first two and confirm no visible jump. If there is one, add a 0.6 second crossfade from the
tail back onto the head and trim accordingly.

Write the edit as a reproducible script at `scripts/media/assemble-hero.ts`, not as hand-run
commands, so the film can be rebuilt when a shot is replaced.

## 7. Delivery and playback

The 60-second film must not touch the LCP path. Three tiers, in this order:

1. **Poster.** `hero-key` as AVIF and WebP, at 960, 1440, 1920 and 2560 widths, with a blur
   placeholder. This is the LCP element and it must paint under 2.0 seconds on a mid-range phone on 4G.
2. **Loop.** Shot 1 alone, seamless, 8 seconds, 1280 wide, target 1.0 MB and hard cap 1.5 MB.
   Requested after the poster has painted. This is what mobile and most visitors ever see.
3. **Film.** The full 60 seconds, 1920 wide for desktop and 1280 as the lower rung. Target 7 MB and
   hard cap 10 MB in H.264, with a VP9 or AV1 WebM alongside at roughly half that. Requested only when
   all of these are true: pointer is fine (desktop), viewport width 1024 or more,
   `navigator.connection.effectiveType` is `4g` or the API is unavailable, `saveData` is false, and
   `prefers-reduced-motion` is not set.

The film fetches in the background while the loop plays. Swap at a loop boundary, not mid-play, by
starting the film paused, waiting for `canplaythrough`, then cross-fading the two video elements over
400ms at the end of a loop cycle and removing the loop element. If the film has not loaded after 15
seconds, abandon it and keep looping.

Every tier: `muted`, `playsinline`, `loop`, `preload="none"`, no audio track in the container. Pause
when the hero leaves the viewport or the tab is hidden. A visible pause control sits in the hero at
all times, keyboard reachable, and its state persists in `sessionStorage`. With reduced motion,
Save-Data, or JavaScript disabled, the poster is the hero and nothing else loads.

Check text contrast against the brightest frame of the film, not the poster, and set the scrim from
that.

## 8. Cost and budget

Veo bills per second of output, and published rates differ by tier, region and whether audio is on,
so read the current Vertex pricing page before the first batch rather than trusting any figure here.
Rough shape at the time of writing: the fast tier is in the region of $0.10 to $0.15 per second and
the standard tier $0.40 or above, so an 8-second standard clip is a few dollars and a careless retry
loop is expensive.

Budget for this film, retries included: **40 fast generations and 12 standard generations.** Draft
every shot on fast. Spend standard only on shots that have already been approved in draft. Log every
call in `media/manifest.json` with model, prompt, parameters, cost estimate and whether the take was
kept, and print a running total. Stop and report if the standard-tier count reaches 12.

If video generation is unavailable or the budget is exhausted before eight shots are approved, ship
the hero as the poster with a very slow scale from 1.0 to 1.04 over 20 seconds, and record it. That
is a perfectly respectable hero and far better than a bad film.

## 9. Acceptance

The film is done when: it runs 60 seconds plus or minus half a second, loops with no visible seam,
holds one palette and one time of day throughout, contains no face in focus and no text, sits under
the byte caps, never blocks the LCP, and a partner scrolling past on a laptop would assume it was
shot by a crew.
