# Vellumhaus

Portfolio website for Vellumhaus, built with Next.js and prepared for GitHub + Vercel.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a production build

```bash
npm run build
npm start
```

## Publish through GitHub and Vercel

1. Create an empty GitHub repository.
2. Upload the contents of this folder to the repository root and commit them.
3. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy with the detected Next.js settings.
4. In the Vercel project, open **Settings → Domains** and add `vellumhaus.studio`.
5. Replace the old apex-domain records at your DNS provider with the records Vercel displays. Preserve MX records if the domain is used for email.

Once the repository is connected, every commit to the production branch creates a new Vercel deployment.

## Content

All brand marks and San Pellegrino project media are included under `public/`. No external asset host or environment variables are required.

## Current published design

The approved design is the homepage at `/`. Its shared client component is `app/Portfolio.tsx` and its styles are `app/portfolio.css`. The `/test` route uses the same component and remains excluded from indexing. Production canonical, indexing and viewport settings are exported from `app/page.tsx`.
