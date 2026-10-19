# Portfolio design and interaction audit

Reviewed 19 October 2026. Scope: `/test`, shared project viewers and image loading, plus homepage regression checks. Visual direction remains the user-approved Helvetica bold, light canvas, brand-tinted panels and image-led work galleries.

Reference inspected in the browser: https://studioaton.webflow.io/ and its /about page. Guidelines fetched fresh: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

## Findings resolved

### app/page.tsx

- app/page.tsx:329 - Fixed: preview loops now honor reduced motion and retain posters instead of autoplaying.
- app/page.tsx:373 - Fixed: project, media and SPETA viewers contain keyboard focus, isolate background controls and restore their opener on close.
- app/page.tsx:499 - Fixed: hero images have intrinsic dimensions; primary artwork is prioritized.
- app/page.tsx:547 - Fixed: studio sections have accessible level-two headings.
- app/page.tsx:698 - Fixed: modal semantics use valid dialog containers instead of overriding article roles; unconditional autofocus removed.
- All page images now reserve their dimensions before loading; below-fold assets load lazily. Empty CV preview areas are resolved. Meaningful authored copy, role dates, CV PDF contents and project allocation remain unchanged.

### app/ProjectSlider.tsx

- app/ProjectSlider.tsx:9 - Fixed: one reusable rail supports all four galleries, including mixed-width VELIUMIN artwork.
- app/ProjectSlider.tsx:65 - Fixed: scroll regions are keyboard-focusable and named; arrows, Home and End have keyboard equivalents.
- Tap controls and mouse dragging remain available alongside native touch scrolling; current range and disabled end states are exposed.

### app/test/clean.css

- app/test/clean.css:3 - Fixed: muted copy contrast increased, including credits on gray panels.
- app/test/clean.css:43 - Refined: oversized profile/section gaps reduced; content remains distinct without decorative strokes.
- app/test/clean.css:254 - Fixed: orange date label passes normal-text contrast on its tinted panel.
- app/test/clean.css:305 - Fixed: focus offsets, safe-area gutters, touch targets, modal overscroll and consistent gallery controls.
- app/test/clean.css:326 - Fixed: CV thumbnails reserve visible space and remain linked to the complete PDFs.
- VELIUMIN images now have meaningful captions. Side-project heading case matches the rest of the page. Tranding links describe their Instagram destination.

### app/useModalFocus.ts, app/useReducedMotion.ts, app/imageDimensions.ts

- ✓ Focus wrapping and nested modal restoration pass. Background inert locks are reference-counted and fully removed on close.
- ✓ Reduced motion updates when the OS preference changes.
- ✓ Intrinsic dimensions are generated from local assets with scripts/image-dimensions.py; no runtime image measurement required for layout.

## Validation results

| Check | Result |
|---|---|
| Production build / TypeScript / diff whitespace | Pass |
| English and Romanian at 320, 390, 768, 1024, 1440px | No document overflow, hero overlap or overflowing text |
| axe-core: WCAG 2 A/AA, WCAG 2.1 AA, best practices | No reported violations in tested desktop/mobile page states, all 15 project dialogs and SPETA viewer |
| Project directories | 7 FrameBreed + 8 Digital Stage; each opens, closes and restores focus |
| Project media | First media opened in every project; videos expose native controls and valid metadata |
| Full local media inventory | 38 items exist; all 26 unique videos pass ffprobe with H.264 video streams |
| Page artwork with both directories expanded | 111 images decoded; none broken |
| Galleries | All four support controls and keyboard scrolling to both ends |
| Product walkthrough | Thumbnail selection, image viewer, next control and Escape pass |
| CV files | Both requests return 200 and an actual %PDF signature; original PDF contents preserved |
| Navigation | Mobile Work link, menu dismissal, return-to-top and all internal anchor targets pass |
| Contact | Personal Gmail first, hello@veliumin.com second |
| Language preference | In-session switching works; reload starts in English as requested |
| Reduced motion | Preview remains paused with a still poster; no preview video source loads |
| Browser runtime | No page errors; no background elements left inert after closing viewers |
| Existing homepage | Original hero and design remain; project open/close and focus restoration pass |

Automated checks are scoped to the states listed above and are not a formal WCAG certification. Visual inspection covered desktop and mobile section compositions, including loaded CV previews and image galleries.
