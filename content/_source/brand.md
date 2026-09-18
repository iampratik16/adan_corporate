# Adan Corporate — Brand Assets (source abstract)

Source: `https://adancorporate.com` (old site). Fetched 2026-09-18 via `curl`.
Assets downloaded only. **Nothing has been redrawn, traced, recoloured or altered.**

---

## 1. How the assets were located

`https://adancorporate.com` returns only a 1,026-byte meta-refresh stub:

```html
<META HTTP-EQUIV="Refresh" CONTENT="0; URL=https://adancorporate.com/en-uk/home/index.html">
```

The real homepage is `https://adancorporate.com/en-uk/home/index.html` (190,954 bytes).
That HTML stub carries an author comment: `Chennakeshav Adya <website@adancorporate.com>`,
`Datecreated 20190927`, `Datemodified 20200327`, `Copyright 2013-2020 Adan Corporate`.
Page `<title>`: `Adan Corporate | Corporate Finance, M&A, Strategy, Risk Management and Digital Services`.

Brand references found:

| Where | Reference |
|---|---|
| `<img class="navbar-logo">` (homepage) | `../../assets/images/logo.webp` — alt `Adan Corporate - Logo` |
| `<img class="navbar-logo">` (interior pages) | `../../assets/images/logo.png` — alt `Adan Corporate - Logo` |
| `<link rel="shortcut icon">` | `../../favicon.ico` |
| `main.css` | `url(../images/logo.png)` and `url(../images/logo-light.png)` |
| body `<img>` | `../../assets/images/adan-company-round-logo-360x600.webp` — alt `iPad cover` |

The relevant CSS rule (from `assets/styles/main.css`):

```css
.navbar-trans .navbar-logo{content:url(../images/logo-light.png)}
.navbar-trans .navbar-logo-dark{content:url(../images/logo.png)}
```

---

## 2. Files saved

All to `/Users/iam_pratik.p_/Downloads/adan_corporate/public/brand/`

| File | Source URL (relative to `https://adancorporate.com/`) | Format | Dimensions | Bytes |
|---|---|---|---|---|
| `logo.png` | `assets/images/logo.png` | PNG, 8-bit RGBA, non-interlaced | **291 × 36** | 7,384 |
| `logo-light.png` | `assets/images/logo-light.png` | PNG, 8-bit RGBA, non-interlaced | **291 × 36** | 7,384 |
| `logo.webp` | `assets/images/logo.webp` | WebP (lossy), mode RGB | **291 × 36** | 3,300 |
| `adan-company-round-logo.png` | `assets/images/adan-company-round-logo.png` | PNG, 8-bit RGBA, non-interlaced | **261 × 261** | 21,451 |
| `adan-company-round-logo-360x600.png` | `assets/images/adan-company-round-logo-360x600.png` | PNG, 8-bit RGBA, non-interlaced | **360 × 573** | 24,008 |
| `adan-company-round-logo-360x600.webp` | `assets/images/adan-company-round-logo-360x600.webp` | WebP (lossy), mode RGB | **360 × 573** | 8,624 |
| `favicon.ico` | `favicon.ico` | Windows BMP inside .ico, 24-bit, **no alpha channel** | **75 × 83** | 18,978 |

Two distinct marks exist:
1. **Horizontal wordmark / lockup** — `logo.png` (291 × 36), used in the navbar.
2. **Round company mark** — `adan-company-round-logo*.png`, used as a body image.

---

## 3. VECTOR OR RASTER? — statement

**NO VECTOR LOGO EXISTS on the old site. Every logo asset is raster only.**

Evidence:
- `assets/images/logo.svg` → **404**
- `assets/images/adan-logo.svg` → **404**
- `assets/images/adan-company-round-logo.svg` → **404**
- `favicon.svg` → **404**
- Zero inline `<svg>` elements in the homepage HTML.
- Zero `.svg` references in `main.css` (649,733 bytes).
- The only `.svg` on the whole homepage is `assets/images/loader.svg` — a generic 44 × 44 animated
  spinner (`<circle>` + `<animate>`, `stroke="#fff"`). It contains **no brand mark** and was not retained.

**Largest raster available:**
- Wordmark: **291 × 36 px** (`logo.png`). This is the only size that exists.
- Round mark: **360 × 573 px** (`adan-company-round-logo-360x600.png`).

Probed and returned 404: `logo@2x.png`, `logo-2x.png`, `logo-large.png`, `logo-big.png`,
`adan-logo.png`, `adan-corporate-logo.png`, `logo-dark.png`, `logo-white.png`,
`adan-company-logo.png`, `apple-touch-icon.png`, `apple-touch-icon-precomposed.png`,
`site.webmanifest`, `manifest.json`. Directory listing on `assets/images/` is disabled (404).

---

## 4. Sampled palette (measured from the downloaded pixels, Pillow 12.3.0)

### `logo.png` (291 × 36, wordmark) — 10,476 px, 0 transparent
| Hex | % of image | Note |
|---|---|---|
| `#FFFFFF` | 55.12% | background |
| `#C00000` | 12.08% | **dominant brand red** |
| `#BC0000` / `#BF0000` / `#BD0000` / `#BB0000` | 2.61 / 2.36 / 1.90 / 1.60% | anti-alias edges of `#C00000` |
| `#002060` | 0.68% | **brand navy** |

Colour families: white/near-white 57.64%, red hues (0–30°) 33.80%, blue hues (210–240°) 7.36%.

### `adan-company-round-logo.png` (261 × 261, round mark) — 68,121 px, 0 transparent
| Hex | % of image | Note |
|---|---|---|
| `#FFFFFF` | 27.69% | background |
| `#F2F2F2` | 20.81% | **light grey field** |
| `#002060` | 20.16% | **dominant brand navy** |
| `#C00000` | 9.17% | **brand red** |

Colour families: white/near-white 52.43%, blue 22.43%, red 20.14%.

### `adan-company-round-logo-360x600.png` (360 × 573)
`#FFFFFF` 76.12%, `#F2F2F2` 6.87%, `#002060` 6.66%, `#C00000` 3.03%. Same four-colour system.

### `favicon.ico` (75 × 83)
`#FFFFFF` 73.25%, `#002060` 14.78% (plus 226 anti-alias shades of the same navy).
**Navy only — the favicon contains no red.**

### Consolidated brand palette (dominant non-white / non-black values)

| Role | Hex | Approx. share of inked (non-white) pixels |
|---|---|---|
| Primary navy | **`#002060`** | ~20% of the round mark; ~26% of the favicon; the single largest chromatic value overall |
| Primary red | **`#C00000`** | ~12% of the wordmark; ~9% of the round mark |
| Light grey field | **`#F2F2F2`** | ~21% of the round mark |
| Ground | `#FFFFFF` | 27–76% depending on asset |

Secondary/derived values are anti-alias tints only, not distinct brand colours:
`#DE7A7A`, `#DF7C7C`, `#D45050`, `#F2CBCB` (red edges); `#94A0BB`, `#AAB1C7` (navy edges).

---

## 5. Current fonts

From `assets/js/vendor/google-fonts.js` (verbatim):

```js
WebFontConfig = {
    google: { families: [ 'Open+Sans:300italic,800italic,400,300,600,700,800:latin', 'Montserrat:400,700:latin' ] }
  };
```

Loaded asynchronously via `ajax.googleapis.com/ajax/libs/webfont/1/webfont.js` (WebFont Loader v1).

Declared stacks in `main.css` (by frequency):

| Occurrences | Stack |
|---|---|
| 32 | `"Open Sans", Montserrat, "Helvetica Neue", Helvetica, sans-serif` |
| 18 | `Montserrat, "Open Sans", "Helvetica Neue", Helvetica, sans-serif` |
| 2 | `"Open Sans", "Helvetica Neue", Helvetica, sans-serif` |
| 1 | `linea-icon-font` |

So: **Open Sans** is the body face (300/400/600/700/800 + 300/800 italic), **Montserrat** the
display/heading face (400/700). Latin subset only.

Icon fonts also loaded: `et-lineicons`, `fontawesome` (two separate copies —
`assets/fonts/fontawesome-1/` and `assets/fonts/fontawesome/`), `linea-font`.

---

## 6. Current site colour scheme (from `main.css`, 649,733 bytes)

Most-used hex values:

| Count | Hex | Role |
|---|---|---|
| 193 | `#111111` | near-black — primary text / dark sections |
| 163 | `#ECECEC` | light grey — section backgrounds |
| 137 | `#222222` | secondary dark |
| 52 | `#FFFFFF` | white |
| 40 | `#CCCCCC` | borders / muted text |
| 21 | `#F8F8F8` | off-white |
| 17 | `#F4F4F4` | off-white |
| 6 | `#3F3F3F`, `#DDDDDD` | |
| 5 | `#BEBEBE`, `#1976D2`, `#E80000` | |

Common alpha values: `rgba(17,17,17,.4–.8)` (i.e. `#111111` at opacity), `rgba(0,0,0,.15)`,
`rgba(0,0,0,.2)`, `rgba(235,235,235,.2)`, `rgba(244,244,244,.85)`.

**The site chrome is essentially monochrome** (`#111111` / `#222222` / `#ECECEC` / `#FFFFFF` / `#CCCCCC`).
The brand navy `#002060` and red `#C00000` appear **only inside the logo images** — they are not used
as CSS accent colours anywhere in `main.css`.

---

## 7. FLAGS

**FLAG:** `logo-light.png` is **byte-identical** to `logo.png` (both MD5 `af44e93844624bef99cba625f93a532c`,
both 7,384 bytes). The CSS at `.navbar-trans .navbar-logo{content:url(../images/logo-light.png)}` swaps
to a "light" logo over the transparent hero navbar, but the file served is the *same dark-on-white
lockup*. Either the inverse/white logo was never produced, or it was overwritten. **There is no white /
knockout / inverse version of the mark on the old site.**

**FLAG:** Both `logo.png` and `adan-company-round-logo.png` are PNG **RGBA but 100% opaque** — every
sampled alpha value is `255`, and all four corners are `#FFFFFF`. The white background is **baked in,
not transparent.** The mark cannot be placed on any non-white background without visible white boxing.
A transparent master does not exist on the old site.

**FLAG:** `#002060`, `#C00000` and `#F2F2F2` are exactly the Microsoft Office standard theme swatches
("Dark Blue", "Dark Red", "White, Background 1, Darker 5%"). Together with the 291 × 36 px source size
this strongly suggests the logo was exported from PowerPoint/Word rather than from a vector brand kit.
**Client question: does an original vector (.ai / .eps / .svg / .pdf) master exist offline?**

**FLAG:** The file `adan-company-round-logo-360x600.webp` / `.png` is named `360x600` but is actually
**360 × 573** px. The filename is wrong.

**FLAG:** `favicon.ico` is a **24-bit Windows BMP with no alpha channel**, at the non-standard size
**75 × 83** px (not square, not 16/32/48). It will render poorly in every browser tab.

**FLAG:** The homepage (`/en-uk/home/index.html`) serves the navbar logo as `logo.webp`, while interior
pages (`company-overview.html`, `contact-us.html`) serve `logo.png`. Inconsistent across the site, and
there is no `<picture>`/fallback — the `.webp` is a bare `<img src>`.

**FLAG:** The `.webp` copies are **lossy and visibly degraded**. `logo.webp` contains 2,442 distinct
chromatic colours versus 752 in `logo.png` for the identical 291 × 36 image, and its dominant red has
smeared into `#AC090E` / `#BF555B` / `#A31112`. `#FFFFFF` drops from 55.12% (PNG) to 23.33% (WebP) —
the flat white background is full of compression noise. **Use the PNGs as the master, not the WebPs.**

**FLAG:** **No `og:image`, no `twitter:image`, and no Open Graph or Twitter Card meta tags at all** on
the homepage or on any interior page checked (`company-overview.html`, `contact-us.html` — `og:image`
count 0 on each). There is no social sharing image to recover.

**FLAG:** No `apple-touch-icon`, no `site.webmanifest`, no `manifest.json` (all 404). No PWA/mobile icon set exists.

**FLAG:** Some colours counted in §6 come from vendored libraries concatenated into `main.css`, not from
Adan's own design — e.g. `#3C763D`, `#A94442`, `#31708F` are Bootstrap alert defaults, and `#DC143C`
(crimson) / `#CAFE48` / `#BA8F45` appear once each. Treat only the high-count values (`#111111`,
`#ECECEC`, `#222222`, `#FFFFFF`, `#CCCCCC`) as the genuine scheme.

**FLAG:** The site is hosted on GoDaddy shared hosting (`secureserver.net`, server `p3plzcpnl506038`)
and injects a third-party tracking script `https://img1.wsimg.com/traffic-assets/js/tccl.min.js`.

**FLAG:** The homepage loads **two separate copies of jQuery** (`jquery-2.1.4.min.js` locally and
`jquery-3.4.1.min.js` from `code.jquery.com`) and two separate Font Awesome installs. Noted as
context for the performance rebuild, not a brand issue.

---

## 8. Not done, by instruction

The mark has **not** been redrawn, vectorised, traced, recoloured, cropped or otherwise altered.
Files are byte-for-byte as served. Producing a vector master will require either the client's original
artwork or an explicit, separately-approved redraw.
