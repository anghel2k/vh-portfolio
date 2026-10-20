# Portfolio audit — 20 October 2026

Scope: the published portfolio, shared /test route, EN/RO, desktop and emulated mobile/touch. Design reference: the approved Helvetica/light-surface design; fresh [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md).

The ongoing design and release rules are captured in [Interface guidelines](interface-guidelines.md).

## Problems corrected

- Oversized image downloads: the Heineken still alone transferred 6.27 MB even in small cards. Added content-hashed WebP variants at up to 480/960/1600px, responsive srcsets and image sizing hints. Intrinsic dimensions remain reserved. Hero predecodes use the same responsive candidates; video posters use optimized stills. Original images, video files and supplied PDFs remain available unchanged.
- Font consistency: removed unused Inter/Space Mono stylesheet imports and aligned the document fallback stack with Helvetica Neue/Helvetica/Arial. No web font requests are needed.
- Accessible names: language controls include their visible EN/RO abbreviations. Company links and project cards use their native visible content instead of overriding it with incomplete aria-labels. Logo alt text identifies logo-only company names without duplicating project-card titles.
- Decorative hero blur is now a CSS background layer with resolution-aware sources rather than a second image element. The oval shape and transparent-material fallback are retained.
- Hero settling: brought both automatic image replacements into the first two seconds; slow decodes cannot insert a late replacement. Finite floating feedback, interruption and reduced-motion handling are preserved.
- Touch targets: language buttons now measure at least 44 × 44px.
- Removed the obsolete inline filter that suppressed opaque browser script errors.
- Optimized image filenames include a content/version hash and receive immutable cache headers. The checked-in image generator and manifest make later regeneration reproducible.

## Verification

| Area | Result |
| --- | --- |
| Whole-page EN/RO at 320, 390, 768, 1024 and 1440px | No horizontal overflow, overflowing text or hero/image overlap |
| Additional sizes | 375×667, 844×390 landscape, 1366×768, 1920×1080 and 2560×1440 pass; close action remains visible on a short landscape screen |
| Project dialogs | All 15; 150 responsive layout states and 60 automated accessibility states pass |
| Project interactions | Focus containment, nested media, Escape, restored focus, previous/next and scroll reset pass |
| Company panels | 40 responsive states; both FrameBreed roles, twelve workflow controls and four disclosures pass |
| Capabilities/resume | 20 responsive/expanded states; 24 capabilities and 21 tools retained; disclosure keyboard operation passes |
| CV documents | Both return HTTP 200/%PDF, open in new tabs and download under the expected filenames |
| Images | All 139 rendered images with expanded directories decode; 101 use responsive optimized candidates; every image has intrinsic dimensions |
| Media inventory | All 38 unique media files exist; all 26 unique videos have valid H.264 streams |
| Navigation/structure | No missing internal anchors or duplicate IDs; one H1; default EN retained; mobile menu dismisses after navigation |
| Keyboard/accessibility | WCAG A/AA and best-practice checks pass in tested states; explicit label-content-name matching rechecked separately |
| Material preferences | Reduced-transparency and increased-contrast modes use solid white frames, no backdrop filter and no decorative blur |
| Motion | Dock continues while magnifying on hover, resets on exit, pauses explicitly; reduced motion removes the loop and magnification; touch has no pointer-only effect |
| Progressive rendering | Heading, four hero images and both email links remain present with JavaScript disabled |
| Runtime/network | No page errors or failed responses in the complete asset/interaction pass |
| Production build | Build, TypeScript and diff checks pass |

Visual inspection covered the hero, timeline, company panels, capabilities, CV cards, contact section and project-detail compositions on desktop/mobile. Anchor navigation places headings below the header. Card imagery, original typography hierarchy, requested Croco treatment and SPETA dimensions are retained.

## Speed measurements

Lighthouse lab runs use Chromium with the standard mobile throttling profile and desktop preset. The production baseline measured 71/100 mobile and 76/100 desktop, with about 8.5 MiB and 8.1 MiB transferred respectively. Both had zero measured layout shift. A provisional optimized local production run measured 95/100 mobile, 3.0 s LCP, 10 ms total blocking time and 932 KiB total transfer.

Final production runs, code revision f087580:

| Metric | Mobile, three runs | Desktop |
| --- | --- | --- |
| Performance score | 91, 89, 91; median 91/100 (baseline 71) | 100/100 (baseline 76) |
| Accessibility / best practices / SEO | 100/100 in every category and run | 100/100 in every category |
| First contentful paint | 1.1–1.4 s | 0.3 s |
| Largest contentful paint | 3.0–3.8 s | 0.7 s |
| Total blocking time | 3–19 ms | 0 ms |
| Layout shift | 0 in every run | 0 |
| Initial transfer | 861–928 KiB, about 90% below baseline | 894 KiB |

[Per-run measurements](performance-2026-10-20.json) preserve the instrument version, scores and numeric metrics. The mobile LCP is still above the 2.5 s good threshold in these throttled runs; the image introduction and random replacement still influence the last large paint. This is recorded as a remaining performance tradeoff of the requested dynamic landing, rather than presented as a perfect result. Lab scores vary with network conditions and the finite hero introduction; they are not real-user Core Web Vitals or an accessibility certification. Mobile checks use browser emulation, not physical iOS/Android devices.
