# Lotus Rise project instructions

## Product position

- Lotus Rise is a standalone public-benefit AI tools company for foundations and nonprofits.
- Lead with tools and practical outcomes. Do not reintroduce advisory, consulting, or agency positioning.
- Janus is the first product. Evaluation is in private preview; grant reporting, strategy, and insights are roadmap modules.
- Keep public language natural, concise, specific, and evidence-bound.

## Public scope

- Keep the public experience to `/` and `/contact`.
- Use only approved real Janus captures. Never fabricate product UI.
- Keep one botanical gesture in the hero; the rest of the visual language should read as technology.
- Do not add generic AI imagery, decorative gradients, floating blobs, or template demo content.

## Once UI

- Read the shared Once UI guidance at `../../once-ui` before changing system behavior.
- Start theme, color, typography, border, surface, transition, or scale changes in `src/resources/once-ui.config.ts`.
- Prefer Once UI primitives and tokens. Keep custom CSS focused on the approved composition.
- Do not replace the homepage with generic landing-page blocks.

## Content and claims

- Edit public copy in `src/content/site-content.ts`.
- Preserve clear roadmap labels and private-preview language.
- Publish no unverified claims about accuracy, savings, security, compliance, integrations, pricing, or scale.
- Reconfirm the legal company wording and quote permission before launch.

## Delivery

- Never commit or deploy `.private/`.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run build:pages`.
- Verify desktop and mobile layouts, keyboard behavior, dialog behavior, reduced motion, console output, and route integrity.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
