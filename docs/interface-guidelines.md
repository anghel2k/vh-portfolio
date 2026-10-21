# Portfolio interface guidelines

These rules describe the approved portfolio design and keep future edits consistent. They complement the [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md); the implementation is a web interpretation of translucent materials, not a native Apple UI.

## Visual hierarchy

- Use Helvetica Neue, Helvetica, Arial, sans-serif throughout. Titles are bold with restrained negative tracking; body copy stays readable at 16–18px. Metadata is secondary, generally 12–14px.
- Keep one main heading and a logical section/project heading hierarchy. Use short visible labels and direct copy. Brand names retain their spelling.
- Use the current neutral tokens: ink #161616, paper #f2f2f2, grey #626262 and blue #205af9. Company washes are quiet accents; they should not compete with images.
- Retain the open composition: responsive page gutters of 20–48px and main section gaps of 72–112px. Align related titles, copy and actions to the same grid.
- Use rounded white surfaces and restrained depth. Avoid heavy outlines, black divider grids or stacking several decorative panels inside one another.

## Layout and imagery

- Preserve image aspect ratios. Crop deliberately; never stretch artwork. Use actual project imagery and original brand shapes.
- Keep the three introductory practice cards the same size at a given viewport/language. Changing a tab should not shift the following sections.
- Keep hero artwork clear of the headline and actions. Decorative blur remains oval and soft, with sufficient contrast for text.
- Gallery logos should have comparable visual weight and centered placement. A white wordmark is appropriate over a photo; detail-page marks must contrast against the light surface.
- Mobile cards and long project credits stack into a clear reading order. All long names, handles and headings must wrap without horizontal page scrolling.
- Company timeline cards show the logo, role and confirmed dates. FrameBreed career progression remains separate from production workflow.

## Interaction and accessibility

- Use native buttons for actions and links for destinations. Keep visible text in each control’s accessible name, with decorative icons hidden from assistive technology.
- Maintain visible keyboard focus, 44px primary touch targets, working slider controls and keyboard alternatives to drag gestures.
- Project viewers trap focus, isolate their background, preserve a visible close action, close with Escape and restore the opener. Nested viewers must restore focus to the underlying viewer.
- Default to English on a fresh load; EN/RO switching remains available within the session.
- The floating project introduction settles within 1.2 seconds on desktop, is interruptible and is disabled on mobile layouts and by reduced-motion preferences. Keep pointer depth subtle and disable it on touch-only devices and while a project viewer is open.
- The continuous brand ribbon has no separate pause button, per the explicit design request of 20 October 2026. Keep reduced-motion support and pause when out of view. This leaves a known WCAG 2.2.2 limitation; do not claim full conformance. Pointer magnification must not clip logos, shift layout or run on touch-only/reduced-motion devices.
- Provide solid material fallbacks when transparency or contrast preferences require them. Animate transform/opacity rather than layout.

## Performance and release checks

- Use the generated responsive WebP candidates for raster images and optimized video posters. Reserve intrinsic dimensions, lazy-load below-fold images and retain original source files.
- Size image requests for the actual slot; do not use multi-megabyte originals as small thumbnails. Only content-hashed assets receive immutable caching.
- Do not load unused fonts or suppress browser errors to make checks look clean.
- Before publishing, run the production build, responsive EN/RO checks, keyboard/touch interactions, document/media checks and automated accessibility checks. Review representative screenshots, including long titles and credits.
- Measure mobile and desktop Lighthouse results on the public site. Record repeat runs, payload size, LCP, blocking time and layout shift; distinguish lab measurements from real-user data.
- Keep the provided CV contents, confirmed project roles, company dates and studio/project allocations intact during visual edits.

## Material and legal-page refinements — 21 October 2026

- Use a single glass layer in compound controls; children use a simple translucent fill rather than a second backdrop filter.
- Keep the six hero projects in the initial rendered HTML; hydration should add interaction rather than reveal essential imagery.
- Legal pages use the same Helvetica scale and quiet neutral surfaces, a readable line length, numbered sections and native anchor navigation. EN/RO versions must remain equivalent.
- State the operator as Veliumin SRL, distinguish Robert’s contribution from third-party ownership, and preserve statutory exceptions. Do not invent registration details or claim permission to show work merely because terms exist.
- Project rims use gradients and highlights over a uniform background; no live backdrop filter is needed on each of the six hero buttons.
