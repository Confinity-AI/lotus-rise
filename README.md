# Lotus Rise website

The production website for Lotus Rise. It is a focused Next.js and Once UI build with two public routes:

- `/` for the product-led homepage
- `/contact` for Janus preview requests

The site presents Lotus Rise as a public-benefit AI tools company for foundations and nonprofits. Janus is shown with approved, real product captures. Roadmap modules remain clearly labeled as future work.

## Start locally

```powershell
npm install
npm run dev
```

Use Node 20.9 or later.

## Quality checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run build:pages
```

## Architecture

- `src/content/site-content.ts` is the single source for public copy.
- `src/resources/once-ui.config.ts` owns the Once UI theme and typography.
- `src/resources/custom.css` owns custom color tokens.
- `src/resources/lotus-rise.css` owns the approved page composition and breakpoints.
- `src/components/JanusTheatre.tsx` owns the interactive product preview.
- `public/lotus-rise` contains only approved production assets.

## Private delivery library

Plans, decks, research, evidence, and delivery archives live in `.private/`. The folder is excluded by both repository and local Git rules and must never be committed or deployed.

Read `IMPLEMENTATION_ACCEPTANCE.md` before launch. The contact endpoint, legal wording, preview status, quote permission, analytics, spam protection, and final product screenshots remain owner-controlled launch gates.
