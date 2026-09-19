# Copilot Instructions

This repository is a downstream site built from the Once UI workspace at C:\Users\ryana\Desktop\AmalgamSites\once-ui.

Before making substantial changes:

- Read PROJECT_SOURCE.md, AGENTS.md, and docs/ONBOARDING.md.
- Read docs/AGENT_PROMPTS.md when you want a strong task prompt or a final review loop.
- Read the upstream Once UI workspace instructions and docs before inventing new patterns.
- Use Context7 when current library or API docs are needed.

Rules:

- Start theme, color, border, scaling, surface, typography wiring, and chart styling changes in `src/resources/once-ui.config.js`.
- Check `src/components/Providers.tsx`, `src/app/(main)/layout.tsx`, `src/resources/seo.js` before changing global system behavior.
- Prefer Once UI primitives, tokens, semantic props, and providers over generic utility-heavy rewrites.
- Keep premium Once UI-derived source private.
