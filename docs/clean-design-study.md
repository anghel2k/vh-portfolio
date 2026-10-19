# Clean portfolio design study

Preview route: /test. The homepage remains unchanged. Existing content, languages, project data, CV assets, career dates, contact addresses, anchors and interactions are shared with the homepage.

Reference: https://studioaton.webflow.io/about. Browser inspection confirms Inter Tight (300–700), light gray #f2f2f2, open navigation, generous whitespace, restrained typography and image-led composition. No external reference images are reused.

Audit: the existing design uses Inter/Space Mono, cobalt #205af9, warm paper #f1efe8, dense uppercase microcopy, thick black section/table/button borders, inverted section palettes, moving galleries and extreme negative tracking. Content and navigation are sound; the accumulated visual treatments compete with projects.

Direction: redesign of the visual language with content preservation. DESIGN_VARIANCE 5 / MOTION_INTENSITY 3 / VISUAL_DENSITY 2 (existing roughly 7/7/6). Native CSS, no design-system framework needed. Use self-hosted Inter Tight, neutral light canvas, one cobalt accent for interaction, modest 8px image rounding, unboxed text links, slower image feedback. No borders used for decoration; keyboard focus outlines are preserved.

Composition: quiet navigation; image-framed introduction; large profile statement; compact work timeline without connecting strokes; static selected-work galleries; full project directories on demand; consistent light career/product/CV/contact sections. Project viewers, image lightboxes and video controls retain their functionality. Preview is noindex; homepage SEO remains unchanged.

Validation: production build and TypeScript passed. Browser checks at 1440, 390 and 320px; no document overflow. Both project directories show all 7 and 8 projects, respectively. Media lightbox, project next navigation, Escape, close icon alignment, mobile navigation, English/Romanian switching and capability accordions passed. Computed decorative border count in the preview is zero; keyboard outlines are retained. Original homepage keeps original hero, styles, language default and navigation. Existing dates and authored project copy are preserved, including date separators; the visual study does not rewrite those records.
