# Clean portfolio design study

Preview route: /test. The homepage remains unchanged. Existing content, languages, project data, CV assets, career dates, contact addresses, anchors and interactions are shared with the homepage.

Reference: https://studioaton.webflow.io/about. Browser inspection confirms Inter Tight (300–700), light gray #f2f2f2, open navigation, generous whitespace, restrained typography and image-led composition. No external reference images are reused.

Audit: the existing design uses Inter/Space Mono, cobalt #205af9, warm paper #f1efe8, dense uppercase microcopy, thick black section/table/button borders, inverted section palettes, moving galleries and extreme negative tracking. Content and navigation are sound; the accumulated visual treatments compete with projects.

Direction: redesign of the visual language with content preservation. DESIGN_VARIANCE 5 / MOTION_INTENSITY 3 / VISUAL_DENSITY 2 (existing roughly 7/7/6). Native CSS, no design-system framework needed. Use self-hosted Inter Tight, neutral light canvas, one cobalt accent for interaction, modest 8px image rounding, unboxed text links, slower image feedback. No borders used for decoration; keyboard focus outlines are preserved.

Composition: quiet navigation; image-framed introduction; large profile statement; compact work timeline without connecting strokes; static selected-work galleries; full project directories on demand; consistent light career/product/CV/contact sections. Project viewers, image lightboxes and video controls retain their functionality. Preview is noindex; homepage SEO remains unchanged.

Validation: production build and TypeScript passed. Browser checks at 1440, 390 and 320px; no document overflow. Both project directories show all 7 and 8 projects, respectively. Media lightbox, project next navigation, Escape, close icon alignment, mobile navigation, English/Romanian switching and capability accordions passed. Computed decorative border count in the preview is zero; keyboard outlines are retained. Original homepage keeps original hero, styles, language default and navigation. Existing dates and authored project copy are preserved, including date separators; the visual study does not rewrite those records.


## Revision: stronger type, cards and interactive rails
User requested Helvetica bold, more defined containers, logos in the timeline, sliders and subtle section colours. Preview now uses the system Helvetica Neue/Helvetica/Arial stack with bold headings and card titles. Brand-tinted career panels and timeline cards use pink (FrameBreed), orange (Digital Stage), blue (VELIUMIN) and green (Tranding); these are identity accents, not unrelated action colours. Hero thumbnails have blurred duplicates behind them. All projects are present in native scroll rails with labelled previous/next buttons, mouse dragging, touch swiping, snap alignment and a visible range counter. No autoplay; users control movement. Reduced motion uses instant navigation. Decorative borders remain absent; keyboard focus remains visible. Homepage stays unchanged.

Revision validation: production build and TypeScript passed. Browser confirmed Helvetica Neue weight 700; four timeline logos; both full project rails; previous/next buttons and disabled end state; mouse drag from scrollLeft 0 to 470 with no accidental project opening; normal RAYE opening afterward; all seven FrameBreed projects in the directory; Romanian control labels; reduced-motion navigation; no horizontal document overflow at 320/390px. Homepage retains its original hero and has no preview slider wrappers.

## Revision: restrained material hierarchy

Following Apple's [Materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials), translucent surfaces are limited to floating navigation, gallery controls and project viewer controls. Project cards and text remain solid for readability. This is a CSS web interpretation, not Apple's native Liquid Glass implementation. Functional SVG symbols from the existing Radix icon package identify Work, Contact, CV and capabilities; these are not SF Symbols. Helvetica bold, brand accents, the logo-only timeline and the two contact cards remain.

Fallbacks provide solid surfaces when backdrop filters are unsupported, transparency is reduced or contrast is increased. Reduced motion suppresses press transforms. Validation: production build passed; mobile menu and language selection tested at 320/390px; no page overflow at 320/390/768/1440px; project viewer and close control tested; automated WCAG 2 A/AA, WCAG 2.1 AA and best-practice checks reported zero violations. Reduced-transparency emulation confirmed a solid white navigation surface with no backdrop filter. Desktop and settled mobile screenshots reviewed.

## Revision: interactive project bubbles

The preview hero now shows four clickable project images in fixed grid slots, with asymmetric bubble corners and a brief scale/opacity entrance. Every 4.2 seconds one picture is replaced with a decoded project thumbnail; manual Shuffle replaces all four without duplicates. Clicking a bubble opens that project. A pause/resume control is provided. Automatic rotation stops during hover/focus interaction, while a project is open, outside the viewport, in hidden tabs and with reduced motion. Reduced motion also removes the pop/hover movement while keeping manual shuffle. Failed image replacements retain the previous picture. Timers and observers clean up on unmount. No new dependency.

Validation: production build and TypeScript passed; automatic one-slot rotation, all-slot shuffle, unique projects, matching project dialog and pause behavior tested. Desktop/mobile screenshots reviewed. At 320/390/768/1440px the hero has no image/text overlap or horizontal overflow. Automated WCAG/best-practice checks returned no violations. Reduced-motion emulation confirmed static images, no animations and manual-only controls.

## Current revision: glass windows without shuffle controls

Supersedes the perpetual rotation and controls described in the previous bubble revision. Four fixed hero slots now hold clear project thumbnails inside soft glass frames with volume, edge reflections and rounded corners. A single introduction lasts at most 4.6 seconds and can replace two thumbnails; further motion comes from direct hover/press feedback. No shuffle or playback buttons. The sequence stops on interaction and respects reduced motion. This keeps motion brief without requiring an ongoing-animation pause control. Gallery hover, contact/timeline lift and short section entry transitions support interaction and hierarchy. Content surfaces remain solid. Full repeated checks are recorded in design-guidelines-audit.md.

## Revision: visual introduction and a faded brand ribbon

Direction explored through Apple's [Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) and [iPhone page](https://www.apple.com/iphone/). Selected patterns: image-led stories, a sliding segmented selector, short copy with progressive disclosure, generous negative space and restrained material hierarchy. Native Apple components are not used; this remains a web interpretation with Helvetica and existing Radix symbols.

A monochrome ribbon after the hero shows the 15 brands represented by the selected projects. Existing logo assets are normalized optically, rendered in faded gray, and move through one seamless 72-second track with faded edges. Duplicate artwork is hidden from assistive technology. Hover/focus pauses movement, a small pause/resume control allows persistent stopping, and visibility observers stop work offscreen/in hidden tabs. Reduced motion provides a static, keyboard-scrollable single group.

The former profile paragraph on /test becomes a compact visual overview: CGI/VFX, AI/Hybrid and Products tabs. Each has one picture, a short description, Robert's role and a direct section link. A sliding capsule tracks selection; arrow keys, Home and End work. Only the active description is displayed. VELIUMIN's additional role paragraph moves into a native details disclosure. Full project records, studio distinctions and dates remain available in their existing sections. The homepage retains its previous presentation.

Validation: production build and TypeScript pass. Thirty layout states (three tabs × five widths × EN/RO) show no document/text overflow or capsule misalignment. Twelve accessibility states (three tabs × desktop/mobile × EN/RO) report no WCAG/best-practice violations. Tested keyboard tab selection; marquee movement, persistent pause/resume and hover pause; identical loop group widths; all 30 logo images decode; reduced-motion static group and keyboard focus; role disclosure and project modal regression. Original homepage has neither the new ribbon nor the tabs. No page errors. Screenshots reviewed for desktop CGI/Products and mobile CGI/Hybrid.

### Logo ribbon revision: Dock magnification

Hover no longer pauses the moving track. Pointer proximity enlarges and subtly lifts the closest logo (up to 1.65× on desktop), with a cosine falloff into its neighbours and slightly stronger opacity. The frame loop recomputes against fixed logo slots so magnification follows logos passing a stationary pointer. DOM reads precede image-only transform/opacity writes; there is no per-frame React state. Leaving the area resets the images. Fine pointers only; narrow layouts cap the scale, reduced motion disables magnification, and visibility/unmount cleanup cancels the frame loop. Persistent pause and keyboard-focus pause remain available. Extra vertical room prevents enlarged artwork clipping without changing the ribbon's layout footprint.

Validation: production build/TypeScript pass. Browser confirms magnification with neighbour falloff, continuous movement under hover, no vertical clipping, reset on leave and persistent pause. At 320px scale is capped and the page has no overflow; a touch context has no fine-pointer effect. Reduced motion clears the scale overrides and disables the track animation. Automated accessibility reports no violations; no page errors.

## Revision: company panels and interactive roadmaps

Replaced preview career headers with one reusable CompanyJourney component for FrameBreed, Digital Stage, VELIUMIN and Tranding. The layout uses a clear identity/date row, a concise introduction, a role journey and a separate workflow. White surfaces receive a restrained brand wash in one corner; there are no nested pastel role boxes. Work Timeline overview cards use the same lighter surface, rounded navigation affordance and compact period label. Existing logos remain the only company names in those overview cards.

FrameBreed's two real career stages are selectable: 3D Generalist (Mar 2024–Nov 2025) and Technical Director (Nov 2025–Present). The current role is selected initially; scope changes in a persistent polite live region. Other companies retain their single confirmed role and dates, including Producer at Digital Stage from Aug 2025. Workflow controls expose three short phase descriptions for every company. These are production steps, not invented employment milestones. Full authored role copy remains available in native About the role disclosures.

Roadmap connectors draw on first entry, with brief stage reveals. Hover/focus and selection provide feedback; reduced motion removes the entry and scope animations. Workflow buttons and native disclosures are keyboard-operable. No new dependency or automatic looping animation.

Validation: production build/TypeScript and whitespace checks pass. Forty panel layout states (four companies × five widths × EN/RO) have no page, panel or text overflow. Four desktop/mobile accessibility states and an expanded-details/active-workflow state return no violations. Both FrameBreed stages, all twelve workflow actions and all four disclosures pass. Confirmed 2/1/1/1 actual role-stage counts and original periods. Roadmap entry reveal, project viewer and original homepage headers/date regression pass, with no page errors. All eight panel/timeline logo references decode. Screenshots reviewed for desktop FrameBreed/Digital Stage/Tranding, mobile FrameBreed and the lighter Work Timeline.

## Revision: capabilities and resume alignment

Capabilities now has a full-width section header followed by four evenly aligned disclosure cards in a 2×2 desktop grid. Each card groups its symbol, title and expand affordance in one row, followed by three primary capabilities. Opening it reveals the remaining three capabilities and all original tools. Summary actions align along the bottom; mobile cards stack. This replaces the earlier narrow right-column list and floating left title.

Resume uses the same header/grid rhythm. Each language is one self-contained card with a language heading, PDF preview, Open and Download links. English is first in the preview. Cards sit side by side on desktop and stack on mobile, where previews remain useful instead of becoming tiny side-by-side thumbnails. The detached action cards and separate preview row are removed from /test. Section spacing is normalized into Contact. Original homepage markup and the latest versioned PDF files are retained.

Validation: build, TypeScript and whitespace checks pass. Twenty EN/RO responsive/expanded states at 320/390/768/1024/1440px show no page or text overflow. Eight automated accessibility states report no violations. Keyboard disclosure works; all 24 capabilities and 21 tool entries remain present. Both PDFs return 200 and %PDF, open successfully in new tabs and download with their expected EN/RO filenames without errors. Preview images decode. Homepage retains its two original action blocks, two preview links and four skill groups. No browser page errors. Desktop/mobile screenshots reviewed.

## Production promotion — 19 October 2026

The user approved the complete design for the main site. The shared interactive implementation now lives in app/Portfolio.tsx and styling in app/portfolio.css. Both app/page.tsx and app/test/page.tsx render the approved design. The homepage exports production canonical/index/follow metadata and the light viewport theme; /test retains noindex/nofollow. Historical references above to app/page.tsx implementation and app/test/clean.css refer to their earlier locations.

Production-route verification: build/TypeScript pass; Helvetica, hero, four company panels, four capability cards, two resume cards and three overview tabs render at /. Representative FrameBreed/Digital Stage project viewers and nested media open/close; both PDFs return 200/%PDF. At 320px the menu and RO switch work without overflow; reload starts EN. Automated accessibility reports no violations; no page errors. Canonical is the portfolio root and /test remains noindex.

## Project case-study layout revision

Project dialogs now follow a single reading order: brand/title, essential facts, project context, contribution, media and credits. The contribution surface uses a clear heading, concise role summary, two-column responsibility cards with quiet check symbols and a separate outcome area. Mobile responsibilities stack. Credits use aligned label/value cards with wrapping names and handles; previous/next controls use matching surfaces. Redundant classification/discipline labels are removed from the introduction. Existing project copy, assets, roles and credits are preserved.

Validation: production build and TypeScript pass. All 15 projects across EN/RO and 320/390/768/1024/1440px pass 150 layout states with no overflowing dialog/text or missing responsibility/credit entries. Sixty automated accessibility states report no violations. Every project passes focus wrapping, nested media, Escape, restored focus and previous/next scroll reset. No runtime errors or remaining inert backgrounds. Desktop/mobile introduction, contribution and long-credit screenshots inspected.

## Floating projects reference study — 20 October 2026

The user supplied three visual references: the floating objects of the iOS 16 composition, a cinematic light/glass landing and sculpted translucent controls. The new /test hero takes its primary layout from the first: six real project tiles at different sizes and depths above the headline, with soft, partially cropped peripheral artwork. New Balance anchors the composition; Croco, Virgin Media, RAYE, Heineken and S.Pellegrino form the surrounding group. Existing imagery and logos are used, with no new raster or invented brand assets.

HeroProjectConstellation is isolated to the study variant and loaded separately. The heading remains outside the interactive component so critical copy renders directly. Rounded glass rims, soft coloured image reflections and a small pill action borrow the material direction of the other references. This is a CSS web interpretation. The six project actions open the existing accessible case-study dialogs. Pointer parallax uses refs and batched frame writes, resets on leave, and is disabled for reduced motion, touch-only input and open project viewers. Entry lasts under 1.2 seconds; hover/focus/visibility interrupt it. No new perpetual animation or shuffle controls.

The composition adapts at narrow/mobile and tablet sizes without placing artwork over the heading. The existing title/copy, Helvetica hierarchy and recent image optimizations are retained. The production homepage continues to use its approved hero; /test remains noindex and is the reviewable new variant.

Validation: production build/TypeScript pass. Twenty EN/RO layout states across 320–1920px pass without page/text overflow, clipped action targets or image/text overlap. Four desktop/mobile accessibility states pass. All six project open/close and restored-focus flows pass. Hover, parallax/reset, touch opening, finite motion, reduced motion and solid reduced-transparency fallback pass. The action remains visible on a 1366×768 laptop. No runtime errors; homepage regression confirms four original hero windows and index/follow metadata. Desktop/mobile screenshots reviewed.

Performance sanity check for this study: one local mobile Lighthouse run reports 89/100 performance, 100/100 accessibility and best practices, 0 CLS and 970 KiB transfer. This is a single lab sample; it is not a production score or a guarantee.
