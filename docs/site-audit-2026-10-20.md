# Portfolio audit — 20 October 2026

Scope: the published portfolio, shared /test route, EN/RO, desktop and emulated mobile/touch. Design reference: the approved Helvetica/light-surface design; fresh [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md).

## Problems corrected

- Oversized image downloads: the Heineken still alone transferred 6.27 MB even in small cards. Added content-hashed WebP variants at up to 480/960/1600px, responsive srcsets and image sizing hints. Intrinsic dimensions remain reserved. Hero predecodes use the same responsive candidates; video posters use optimized stills. Original images, video files and supplied PDFs remain available unchanged.
- Font consistency: removed unused Inter/Space Mono stylesheet imports and aligned the document fallback stack with Helvetica Neue/Helvetica/Arial. No web font requests are needed.
- Accessible names: language controls include their visible EN/RO abbreviations. Company links and project cards use their native visible content instead of overriding it with incomplete aria-labels. Logo alt text identifies logo-only company names without duplicating project-card titles.
- Touch targets: language buttons now measure at least 44 × 44px.
- Removed the obsolete inline filter that suppressed opaque browser script errors.
- Optimized image filenames include a content/version hash and receive immutable cache headers. The checked-in image generator and manifest make later regeneration reproducible.

## Verification

| Area | Result |
| --- | --- |
| Whole-page EN/RO at 320, 390, 768, 1024 and 1440px | No horizontal overflow, overflowing text or hero/image overlap |
| Project dialogs | All 15; 150 responsive layout states and 60 automated accessibility states pass |
| Project interactions | Focus containment, nested media, Escape, restored focus, previous/next and scroll reset pass |
| Company panels | 40 responsive states; both FrameBreed roles, twelve workflow controls and four disclosures pass |
| Capabilities/resume | 20 responsive/expanded states; 24 capabilities and 21 tools retained; disclosure keyboard operation passes |
| CV documents | Both return HTTP 200/%PDF, open in new tabs and download under the expected filenames |
| Images | All 143 rendered images with expanded directories decode; 105 use responsive optimized candidates; every image has intrinsic dimensions |
| Media inventory | All 38 unique media files exist; all 26 unique videos have valid H.264 streams |
| Navigation/structure | No missing internal anchors or duplicate IDs; one H1; default EN retained; mobile menu dismisses after navigation |
| Keyboard/accessibility | WCAG A/AA and best-practice checks pass in tested states; explicit label-content-name matching rechecked separately |
| Motion | Dock continues while magnifying on hover, resets on exit, pauses explicitly; reduced motion removes the loop and magnification; touch has no pointer-only effect |
| Progressive rendering | Heading, four hero images and both email links remain present with JavaScript disabled |
| Runtime/network | No page errors or failed responses in the complete asset/interaction pass |
| Production build | Build, TypeScript and diff checks pass |

Visual inspection covered the hero, timeline, company panels, capabilities, CV cards, contact section and project-detail compositions on desktop/mobile. Anchor navigation places headings below the header. Card imagery, original typography hierarchy, requested Croco treatment and SPETA dimensions are retained.

## Speed measurements

Lighthouse lab runs use Chromium with the standard mobile throttling profile and desktop preset. The production baseline measured 71/100 mobile and 76/100 desktop, with about 8.5 MiB and 8.1 MiB transferred respectively. Both had zero measured layout shift. A provisional optimized local production run measured 95/100 mobile, 3.0 s LCP, 10 ms total blocking time and 932 KiB total transfer.

Production measurements after publishing are recorded below when available. Lab scores vary with network conditions and the finite hero introduction; they are not real-user Core Web Vitals or an accessibility certification. Mobile checks use browser emulation, not physical iOS/Android devices.
