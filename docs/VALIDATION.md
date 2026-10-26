# Validation — 26 October 2026

## Build and source

- Node 24.15.0 / npm 11.12.1.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: zero errors, warnings or hints across nine application source files. Saved third-party JavaScript in the original image archive is excluded from application type checking.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: eight static HTML pages plus sitemap; successful optimized image generation.
- `npm test`: three passing tests covering the full asset inventory, canonical manifest coverage, and all built local links/image paths and main landmarks.
- `git diff --check`: passed. This is a new application in a previously asset-only workspace; no commits or pushes performed.
- Installation initially failed under sandbox DNS restrictions. Authorized network installation succeeded. The initial Sharp audit finding was fixed with 0.35.5; the final installation audit reported zero vulnerabilities.
- Astro's preferences write was blocked by the sandbox; disabling optional telemetry allowed builds/checks without changing filesystem permissions.

## Browser interactions

Headless Chromium 134, production preview at http://127.0.0.1:4322:

- Desktop 1440×1000, tablet 820×1180, mobile 390×844: no horizontal overflow, intro completes and stays skipped on session reload, next/previous controls and keyboard arrows change the focused photograph, pointer dragging settles, detail-page navigation succeeds, image dialog opens and closes with Escape, and visible images decode successfully.
- No uncaught page errors in the responsive interaction runs.
- Separate Chrome DevTools touch emulation: horizontal swipe changes active photograph.
- Intro screenshots captured closed and partially opened; Skip Intro verified.
- Reduced-motion emulation: doors bypassed, seven static linked cards replace the ring.
- JavaScript disabled: hero, content, static collection links and native expanded journal remain available.
- Reviewed desktop/tablet/mobile hero and collection screenshots, About screenshots, and full desktop layout. Lazy images were loaded before final full-page capture.
- Both external reference sites captured at desktop/mobile widths and scrolled states. The photographic reference visibly uses a landscape hero, very large serif title, framing details and a lens-based scroll interlude. We adopted editorial scale and pacing; no reference imagery/brand identity was copied. Captures do not constitute exhaustive reference-interaction testing.

## Accessibility and performance

Axe WCAG A/AA rules (including 2.1 and 2.2 tags) reported zero violations at 1440px and 390px. A subsequent Lighthouse accessible-name diagnostic identified the header brand's redundant aria-label; removing it preserved the full visible name for assistive technology. Automated tools do not establish complete WCAG conformance.

Final Lighthouse, default simulated mobile profile, local production build, Chromium 134:

| Metric | Measured |
| --- | --- |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | 2.107 seconds |
| Cumulative Layout Shift | 0.00317 |
| Total Blocking Time | 0 ms |
| First Contentful Paint | 1.210 seconds |

`performance.json` records the exact run time and metrics. INP was not measured; TBT is not a substitute for field INP. Scores reflect a local lab run, not deployed-network or physical-device guarantees. Lighthouse still suggests image-delivery/render-blocking improvements; stated numeric targets were met in this run.

## Remaining constraints

- No verified listing records, property associations, prices, availability, or inquiry submission backend were supplied. The photographic collection is explicitly labeled; working contact actions use the verified telephone, office map, and social routes. Live listing search and server-side message delivery require real integrations.
- No Vercel deployment, real phone call, social message, physical mobile device, Safari/Firefox, or screen-reader session was performed.
- Final screenshots/raw Lighthouse JSON: `/tmp/marci-qa/`. Reference captures: `/tmp/marci-reference/`. These are local QA artifacts; summary reports are retained in docs/.

## Acceptance review

Astro/React islands, official React Bits circular implementation, one Lenis controller, paneled perspective doors, real supplied hero landscape and agent portrait, white frame and offset black square, eight editorial chapters, responsive controls, reduced-motion/no-JS fallbacks, all-image accounting, optimized local assets, working navigation/contact links, metadata/sitemap, and production build were evaluated and implemented. Verified live listing records and deployed field performance remain outside the supplied data and local validation scope.
