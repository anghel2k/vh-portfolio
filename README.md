# Robert Anghel / Vellumhaus portfolio

Next.js App Router portfolio, published from GitHub `anghel2k/vh-portfolio`, branch `main`, through Vercel at https://portfolio.vellumhaus.studio/.

## Local development

Use Node.js 20.9 or newer (the release audit used Node 24.20.0).

```sh
npm ci
npm run dev
```

## Production validation

```sh
npm audit
npm run build
npm run start -- --port 3100
```

A push to `main` triggers Vercel. Check the deployment result and the public pages before calling a release complete. Preserve DNS email/MX records when maintaining the domain.

## Structure

- `/`: approved six-project floating hero and portfolio.
- `/test`: same shared design, noindex, omitted from sitemap.
- `/terms` and `/termeni`: matching static legal/copyright pages, EN and RO.
- `/robots.txt` and `/sitemap.xml`: crawler discovery.
- `app/Portfolio.tsx`: shared content, dialogs, language and project interaction.
- `app/HeroProjectConstellation.tsx`: initial-HTML project composition with pointer enhancement.
- `app/portfolio.css`, `app/constellation.css`: approved presentation.
- `next.config.ts`: security headers and immutable hashed-image caching.

The site has no application database, upload endpoint or payment API. Media is served locally from `public/`; no environment variables or third-party media host are required.

## Assets

Regenerate responsive raster variants with `node scripts/optimize-images.mjs`, then `python3 scripts/image-dimensions.py`. Content-hashed WebP files and manifests are checked in. Preserve original media and supplied CV PDFs.

## Browser audit

The 21 October audit and its limitations are in [docs/audit-2026-10-21.md](docs/audit-2026-10-21.md). Measurements and regression results are in `docs/audit-results-2026-10-21.json`; persistent design rules are in `docs/interface-guidelines.md`.

Runnable checks are in `scripts/qa/`. They expect a production server at `http://127.0.0.1:3100`, an open Playwright CLI Chromium session and axe-core at `/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js`. Setup on macOS:

```sh
npm install --prefix /private/tmp/vh-accessibility axe-core
playwright-cli -s=portfolio-audit open http://127.0.0.1:3100/
playwright-cli -s=portfolio-audit run-code --filename=scripts/qa/layout-legal.playwright.js
playwright-cli -s=portfolio-audit run-code --filename=scripts/qa/projects.playwright.js
playwright-cli -s=portfolio-audit run-code --filename=scripts/qa/companies.playwright.js
playwright-cli -s=portfolio-audit run-code --filename=scripts/qa/capabilities.playwright.js
playwright-cli -s=portfolio-audit run-code --filename=scripts/qa/assets.playwright.js
```

Run checks sequentially in one browser session. They return JSON summaries. Screenshots are written to `/private/tmp`; the social-preview helper writes `/private/tmp/vh-og-portfolio.png`, which can be reviewed and copied to `public/og-portfolio.png` when intentionally updating the sharing image. It does not alter the production layout.

Lighthouse and automated accessibility are lab checks, not proof of real-device performance, full WCAG conformance or legal compliance. The documented continuous-ribbon exception follows the owner’s explicit design choice.
