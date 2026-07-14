---
name: verify
description: Build/launch/drive recipe for verifying changes in this repo (standalone index.html and the Next.js app) inside the remote sandbox.
---

# Verifying changes in this repo

## Standalone `standalone/index.html`

Lives in `standalone/` so it can be deployed as its own static Vercel
project (Root Directory = `standalone`, Framework Preset = "Other").

It is a self-contained page whose only runtime dependency is Lenis from
unpkg. The sandbox proxy **blocks unpkg.com and fonts.googleapis.com /
fonts.gstatic.com**, so drive it with Playwright and route-stub those
hosts. Hero art is generated inline SVG (from `SITE.heroArt`) — no image
host to stub, and the liquid canvas is same-origin, so `getImageData`
works for asserting painted pixels.

```bash
# one-time: playwright-core in the scratchpad (plain `playwright` is not installed)
npm install playwright-core
# lenis is a project dependency — install once to get a local copy to stub with
yarn install --frozen-lockfile   # node_modules/lenis/dist/lenis.mjs
```

Launch pattern (Node ESM script):

```js
import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' // NOT /opt/pw-browsers/chromium/...
});
// serve index.html over http (file:// breaks the module importmap fetch),
// then on each page:
//   route('**unpkg.com/**')            -> fulfill with node_modules/lenis/dist/lenis.mjs
//   route(/fonts\.(googleapis|gstatic)\.com/) -> fulfill empty text/css
//   route(/api\.getlayers\.ai/)        -> fulfill a small inline SVG (hero images)
```

Flows worth driving: loader counts 000→100 then detaches `#loader`;
`.hdr`/`.hero-h1` get `.in` only after the loader exits; carousel
`#hcNext`/`#hcPrev`/card click; `#menuBtn` overlay + Escape; request modal
(open via any "Let's Talk"/"Start a project" CTA), empty/partial/bad-email
submits must be blocked by native validation, valid submit shows success,
reopen must show a reset form; stats `.stat-num .num` must land exactly on
their `data-value` after an instant jump past the panel (trailing throttle).

Gotchas:
- The liquid canvas is same-origin (inline SVG hero art), so
  `getImageData` works — assert painted pixels directly.
- Under `reducedMotion: 'reduce'` the liquid init is skipped: the canvas
  stays at the **default 300×150** (not 0×0) and never resizes.
- Adaptive grid: at 360px viewport the root font-size computes to 16px via
  the 4.444vw media query; above 1920px an inline `font-size` appears
  (≈19.55px at 2560) and is removed again when resized back down.

## Next.js app (`src/`, `app/`)

`yarn dev` / `yarn build` per README. Same Chromium executablePath applies
for browser-driving. (No app-specific verifier existed when this note was
written; extend this file if you build one.)
