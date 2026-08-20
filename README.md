# Lotus Rise website

The production website for Lotus Rise. It is a focused Next.js and Once UI build with four public routes:

- `/` for the product-led homepage
- `/janus` for the full Janus product story
- `/team` for the Lotus Rise story and current four-person team
- `/contact` for Janus preview requests

The site presents Lotus Rise as a public benefit corporation building AI tools for foundations and nonprofits. The homepage uses a slow, top-down 3D lotus bloom that settles into a realistic botanical final frame, with natural ivory, blush, green and gold detail inside an evergreen, green and white system. Janus is shown only with approved, real product captures. Roadmap modules remain clearly labeled as future work.

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
- `src/components/LotusBloom.tsx` owns the hero lotus opening and its restrained settled motion.
- `src/lib/lotus-bloom-scene.ts` owns the procedural petal geometry, inner-to-outer bloom sequence, resize and motion fallbacks, and renderer cleanup.
- `public/lotus-rise/brand/lotus-hero-photoreal.webp` is the transparent botanical settle frame; it must not be reused as generic page decoration.
- `src/components/JanusPage.tsx` and `src/components/TeamPage.tsx` own the two supporting pages.
- `public/lotus-rise` contains only approved production assets.

## Private delivery library

Plans, decks, research, evidence, and delivery archives live in `.private/`. The folder is excluded by both repository and local Git rules and must never be committed or deployed.

Read `IMPLEMENTATION_ACCEPTANCE.md` before launch. The contact endpoint, legal wording, preview status, quote permission, final portrait approval, analytics, spam protection, and final product screenshots remain owner-controlled launch gates.
