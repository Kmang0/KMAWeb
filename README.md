# KMAWeb

Kenny Ma's single-page robotics engineering portfolio. Built with Next.js,
TypeScript, and a static-first project catalogue.

## Local development

Requires Node.js 24 or newer.

```powershell
npm install
npx playwright install chromium
npm run dev
```

Open `http://localhost:3000`.

## Verification

```powershell
npm run lint
npm test
npm run test:e2e
npm run build
npm run build:github
```

## Deployment

- Vercel uses the Next.js preset and serves the site from `/`.
- GitHub Actions builds a static export with the `/KMAWeb` base path and
  publishes it to GitHub Pages.

The GitHub Pages URL remains
`https://kmang0.github.io/KMAWeb/` for compatibility with existing links.
