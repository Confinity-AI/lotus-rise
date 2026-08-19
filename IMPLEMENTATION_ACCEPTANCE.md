# Implementation acceptance

## Visual parity

- Match the recommended HTML prototype at 1920, 1440, 1280, 1024, 768, 390, 360, and 320 pixels.
- Preserve the original Lotus Rise SVG geometry and its pale-on-evergreen treatment.
- Keep the first real Janus view visible immediately after the hero.
- Preserve stable product-frame dimensions while tabs change.
- Do not add cards, gradients, floating decoration, or generic AI imagery.

## Responsive behavior

- No horizontal overflow, overlap, clipped copy, or layout shift.
- Mobile header retains the original logo and one preview action.
- At 360 pixels and below, hero actions stack.
- Janus tabs remain a three-part segmented control on mobile.
- Full-screen product media can scroll without moving controls off screen.

## Accessibility

- One H1 and ordered section headings.
- Semantic header, navigation, main, sections, and footer.
- Roving tab focus with Left, Right, Home, and End support.
- Visible focus and 44-pixel minimum interactive targets.
- Native dialog behavior with Escape, backdrop close, and focus return.
- Useful image alt text, labeled fields, validation messages, and polite success status.
- Reduced-motion mode removes entrance transforms and smooth scrolling.

## Product and claim controls

- Confirm Evaluation private-preview status.
- Confirm roadmap labels for Strategy and Grant reporting.
- Confirm safe demo data and current product version for all screenshots.
- Confirm exact quote permission and attribution.
- Confirm legal company wording.
- Publish no unverified claims about accuracy, savings, security, compliance, integrations, pricing, or scale.

## Production

- Connect the contact endpoint and server-side validation.
- Add bot protection and rate limiting appropriate to the chosen host.
- Add consent-aware analytics for CTA, Janus tab, dialog, form start, validation, and completion events.
- Confirm metadata, canonical URLs, sitemap, robots rules, Open Graph image, and organization schema.
- Run Lighthouse, axe, keyboard, reduced-motion, screen-reader smoke, and cross-browser checks.
- Pass `npm run typecheck` and `npm run build`.
