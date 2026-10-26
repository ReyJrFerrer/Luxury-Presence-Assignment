# Marci Metzger — A Doorway to Exceptional Living

An Astro real estate editorial experience using the supplied photography and verified content from the original Marci Metzger project.

## Run locally

Requires Node.js 22.12+ (validated with Node 24.15) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. The first visit plays the 2.4-second doorway reveal. Reloads in the same browser session skip it. Clear `sessionStorage['marci-arrival']` to replay. Reduced-motion preferences skip the intro and replace the 3D collection with static linked cards.

```sh
npm run check
npm run build
npm test
npm run preview -- --port 4322
```

If running under a restricted filesystem, prefix Astro commands with `ASTRO_TELEMETRY_DISABLED=1` to avoid a write to the OS preferences directory. Astro 7 can run development servers as background processes; `npx astro dev stop` stops the local development server.

## Architecture

- Astro 7 / TypeScript: static homepage, six retained photographic detail pages and a focused collection popup, sitemap and metadata.
- `src/pages/index.astro`: eight editorial chapters, semantic content, session-aware doors and native dialog gallery.
- `src/layouts/Layout.astro`: shared document, single Lenis controller, IntersectionObserver/WAAPI reveals, self-hosted fonts, structured data.
- `src/components/SpecularButton.tsx` and CSS: official React Bits specular edge-light effect, adapted to a native contact link and hydrated with `client:load`. The shared fixed glass header uses 35px corners, 24px backdrop blur, and a translucent fallback. Reduced motion bypasses the effect.
- `src/components/PropertyCollection.tsx`: `client:visible` React island, Flex Carousel entry animation and native image-details dialog, reduced-motion and server-rendered static fallback.
- `src/components/FlexCarousel.tsx` and CSS: official React Bits TypeScript/plain-CSS source with OGL, liquid edge distortion, momentum dragging, keyboard browsing, and the built-in rise entry animation. Captions/counts are disabled; clicking any visible image opens its details in a native dialog. License in `docs/REACT-BITS-LICENSE.md`. The `/collection/windows/` page has been removed and its content moved into the shared popup.
- `src/data/assets.ts`: typed canonical image records with source, alt text, role, priority, crop and explicitly unknown property association. Static image imports keep archived alternatives out of the shipped bundle.
- `src/styles/global.css`: ivory/olive palette, fluid serif typography, square geometry and responsive layouts.
- No GSAP, UI framework, backend, external image requests or third-party font requests.

## Content and assets

All 143 supplied image files were visually inventoried. Twenty distinct subjects are intentionally displayed; 97 alternate crops/resolutions are consolidated and 26 saved map/browser artifacts excluded. See `docs/ASSET-COVERAGE.md`, `docs/asset-inventory.json`, and `docs/DISCOVERY.md`.

The original project supplies photography, not verified listing records. Gallery names describe images; they do not claim property names, locations or availability. Inquiry actions use the verified phone number, office map, and social pages. No fake search results, inquiry submission success, prices or testimonials. A live MLS feed and an approved inquiry delivery endpoint are separate future integrations.

## Browser QA

Scripts use Playwright Chromium. Install a compatible browser with `npx playwright install chromium`, or set `CHROME_PATH` to an existing Chromium executable. `BASE_URL` defaults to the production preview at http://127.0.0.1:4322 for the browser/accessibility suite.

```sh
node scripts/browser-qa.mjs
node scripts/accessibility-qa.mjs
node scripts/intro-touch-qa.mjs
```

Reports and screenshots are written to `/tmp/marci-qa`. `scripts/reference-qa.mjs` captures the two supplied reference websites into `/tmp/marci-reference`. See `docs/VALIDATION.md` for the checks actually performed and measurement limits.

## Vercel

Use the Astro framework preset, build command `npm run build`, and output directory `dist`. This is a static build and does not need a server adapter. The current canonical site is the supplied Vercel URL; update `site` in `astro.config.mjs` and `public/robots.txt` if the production domain changes. No deployment was performed by this implementation.
