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

## Recheck: glass project windows and restrained motion

19 October 2026, following the request to review the complete site again. Guidelines fetched fresh from the source above. Apple references: [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) and [Motion](https://developer.apple.com/design/human-interface-guidelines/motion). This is a web approximation using CSS, not native Liquid Glass or SF Symbols.

### Resolved findings

- app/HeroProjectBubbles.tsx:14 - Removed Shuffle and Pause/Play controls. Replaced indefinite rotation with a single opening sequence under five seconds; up to two decoded project replacements, then still images. Interaction, hidden tabs, leaving the viewport, opening a project and reduced motion interrupt the sequence. Pending image decodes cannot restart motion later.
- app/test/clean.css:561 - Hero windows use a translucent frame, soft volume shadows and a restrained edge highlight. Image content stays clear; the underlying oval blur remains seamless. Hover/press feedback preserves the grid footprint and image/text separation.
- app/usePreviewMotion.ts:7 - Added brief section entry feedback with transform/opacity only. Content remains visible before enhancement and without JavaScript. Observers and active animations clean up when motion settings change or the component unmounts.
- app/page.tsx:411 - Mobile menu Escape now returns focus to its toggle instead of losing focus when the menu is removed.
- app/test/clean.css:86 - Gallery hover now transitions opacity instead of an animated brightness filter.
- app/test/clean.css:599 - Reduced-transparency/high-contrast preferences use solid hero frames, remove highlights and the decorative blur, and disable overlay backdrop filtering. Reduced motion disables automatic replacement, floating, pop and press movement.

### Repeated validation

- Production build, TypeScript and whitespace checks pass.
- All 15 project dialogs pass opening, focus wrapping, nested media, Escape, opener restoration and automated accessibility checks. No page errors or remaining inert backgrounds.
- All four galleries pass keyboard end/home/next navigation. SPETA selection, viewer and next control pass.
- All 111 rendered images decode. All 38 project media files exist; all 26 unique videos pass ffprobe with H.264 streams. Both CV responses return HTTP 200 and a PDF signature.
- EN/RO at 320, 390, 768, 1024 and 1440px: no page overflow, hero overlap or overflowing text. Automated WCAG 2 A/AA, WCAG 2.1 AA and best-practice checks report zero violations in tested desktop/mobile states and the SPETA viewer.
- Hero has no shuffle/pause buttons and no ongoing animations after the introduction. Reduced motion leaves it static. Reduced transparency provides a solid white frame with no backdrop blur/highlight. Close icon centers geometrically in its mobile button.
- Internal anchors and image dimensions are valid. The four hero images, heading and both contact links remain visible without JavaScript. Original homepage hero and project open/close pass regression checks.

Visual inspection: settled desktop/mobile hero, mobile project viewer, work timeline and contact section. Existing project allocation, role dates, latest CVs, personal/work addresses, logo-only timeline and blue SPETA identity are preserved. Automated results describe tested states, not a formal accessibility certification.

## Recheck: visual overview and project-brand ribbon

- app/ClientLogoRail.tsx - Continuous logo animation includes a named pause/resume control, hover/focus pause, visibility cleanup and a static keyboard-scrollable reduced-motion variant. Decorative duplicate group is aria-hidden. Brand names describe work represented in the portfolio, without claiming direct client relationships.
- app/PracticeOverview.tsx - Named tablist, selected states, labelled panel, roving tabindex, arrow/Home/End support, image dimensions and real anchor destinations. Short active copy replaces the dense preview introduction. Native links preserve navigation semantics.
- app/page.tsx - VELIUMIN's extra paragraph is available through a native details disclosure in the preview. Existing homepage presentation retained.
- app/test/clean.css - Single transform-only marquee with seamless equal-width copies; tab capsule animates transform; content transitions use opacity/transform; reduced-motion rules remain effective. Focus outlines and existing material fallbacks preserved.

Validated 30 responsive tab states across EN/RO and 320/390/768/1024/1440px: no page/text overflow or indicator offset. Twelve automated accessibility states passed. Marquee moves, pauses, resumes and stops on hover; two loop groups both measure 2726px at desktop, with all 30 images decoded. Keyboard tab changes, native disclosure and project viewer pass. Reduced-motion mode has no logo animation, hides the duplicate group and makes the horizontal rail focusable. Homepage regression and browser runtime checks pass. Production build, TypeScript and diff checks pass.
