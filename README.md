# Lotus Rise website

The production website for Lotus Rise. It is a focused Next.js and Once UI build with six public routes:

- `/` for the product-led homepage
- `/janus/` for the Janus suite hub
- `/janus/evaluation/` for the Evaluation module (private preview, real captures)
- `/janus/strategy/` for the Strategy module (coming soon, no screens)
- `/team/` for the Lotus Rise story and current four-person team
- `/contact/` for Janus preview requests

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
npm run test:e2e
```

`npm run test:e2e` builds the static export twice (mock contact endpoint, endpoint unset), copies each build to `.e2e/out-mock/` and `.e2e/out-unset/`, serves both, and runs the Playwright suite in `tests/e2e/` on mobile and desktop projects with reduced motion. It never reads whatever `out/` happens to contain, so it can run in any order relative to the other checks. Pass `E2E_SKIP_BUILD=1` to reuse the existing exports while iterating on specs.

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

## Contact endpoint

The form posts JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` (see `.env.example` for the exact payload). The variable is inlined at build time, so set it in the environment that runs `npm run build:pages`. Until it is set, `/contact/` still delivers: after validation the form opens the visitor's email app with the note prefilled, addressed to the recipients in `siteContent.contact.recipients` (`neeraj@lotusrise.org`, cc `neeraj@amalgam-inc.com` and `ryan@amalgam-inc.com`), and shows a "Send by email" button as a fallback. A server endpoint removes the email-app step and adds validation, spam protection and rate limiting on the server.

Read `IMPLEMENTATION_ACCEPTANCE.md` before launch. The contact endpoint, legal wording, preview status, quote permission, final portrait approval, analytics, spam protection, and final product screenshots remain owner-controlled launch gates.

## Continuous integration

`.github/workflows/ci.yml` runs typecheck, lint, `next build` and the full Playwright suite, and uploads the HTML report and any failure traces as an artifact. It is manual (`workflow_dispatch`) so it does not spend Actions minutes automatically; the same suite runs locally with `npm run test:e2e`. Visual baselines are generated on Linux Chromium and match the runner. Deployment stays manual (`npm run deploy:pages`).
