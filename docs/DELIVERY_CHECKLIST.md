# Delivery Checklist

## Once UI Fidelity

- Theme and brand changes were made through `src/resources/once-ui.config.js` first.
- Global behavior changes were checked in `src/components/Providers.tsx`, `src/app/(main)/layout.tsx`, `src/resources/seo.js`.
- The result still feels like Once UI instead of a generic rebuild.

## Content And Brand

- Demo branding and placeholder metadata were replaced where needed.
- Client-specific SEO and content were updated.

## Validation

- `npm run build` passes
- key pages were visually checked across breakpoints
- env vars and integrations were verified
