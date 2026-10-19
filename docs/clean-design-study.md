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
