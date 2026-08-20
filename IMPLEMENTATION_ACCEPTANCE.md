# Implementation acceptance

## Visual parity

- Check the implemented routes at 1920, 1440, 1280, 1024, 768, 390, 360, and 320 pixels.
- Preserve the original Lotus Rise SVG geometry and its pale-on-evergreen treatment.
- Use the approved hybrid hero only: a procedural 3D lotus seen directly from above, followed by the transparent botanical settle frame. It should begin as a compact bud, unfold from the inner petals outward over roughly 11 seconds, then keep only faint independent movement across feathered petal rings.
- Use evergreen, green, white, pale green, and restrained gold. Do not reintroduce blue section bands or blue interface accents.
- Keep a real Janus view visible in the first homepage product section and in the first viewport of the Janus page.
- Preserve stable product-frame dimensions while tabs change.
- Do not add gradient page backgrounds, floating decoration, generic AI imagery, or more flower photography. The single hero lotus is the exception; subtle tonal shading is reserved for its petals.
- Do not invent screens for Grant Reporting, Strategy, or Insights.

## Responsive behavior

- No horizontal overflow, overlap, clipped copy, or layout shift.
- Mobile header retains the original logo and an accessible page menu.
- At 360 pixels and below, hero actions stack.
- Janus tabs remain a three-part segmented control on mobile.
- Full-screen product media can scroll without moving controls off screen.
- Team portraits keep stable dimensions and never shift the surrounding grid.

## Accessibility

- One H1 and ordered section headings.
- Semantic header, navigation, main, sections, and footer.
- Roving tab focus with Left, Right, Home, and End support.
- Visible focus and 44-pixel minimum interactive targets.
- Native dialog behavior with Escape, backdrop close, and focus return.
- Useful image alt text, labeled fields, validation messages, and polite success status.
- Reduced-motion mode removes entrance transforms and smooth scrolling.
- Reduced-motion mode shows the lotus fully open without playing the blossom sequence.

## Product and claim controls

- Confirm Evaluation private-preview status.
- Confirm roadmap labels for Strategy and Grant reporting.
- Confirm safe demo data and current product version for all screenshots.
- Confirm exact quote permission and attribution.
- Confirm legal company wording.
- Keep `public benefit corporation` distinct from Certified B Corporation status. Do not use `B Corp` or its certification mark without verified certification.
- Confirm publication approval for the portraits of Neeraj Vir, Ryan Ward, Parul Ohri, and Supamit Chaiya. Do not substitute, synthesize, or retouch identity details.
- Publish no unverified claims about accuracy, savings, security, compliance, integrations, pricing, or scale.

## Production

- Connect the contact endpoint and server-side validation.
- Add bot protection and rate limiting appropriate to the chosen host.
- Add consent-aware analytics for CTA, Janus tab, dialog, form start, validation, and completion events.
- Confirm metadata, canonical URLs, sitemap, robots rules, Open Graph image, and organization schema.
- Run Lighthouse, axe, keyboard, reduced-motion, screen-reader smoke, and cross-browser checks.
- Pass `npm run typecheck` and `npm run build`.
