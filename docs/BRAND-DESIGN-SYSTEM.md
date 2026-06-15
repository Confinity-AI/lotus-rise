# Lotus Rise — Brand Design System & Once UI Spec

**Owner:** Head of Design & Brand Lead
**Last Updated:** June 2026
**Status:** Canonical Reference (Design Tier)

---

## 1. Brand Archetype & Design Ethos

Lotus Rise projects the brand archetype of the **Transformative Catalyst** (from the Sovereign State proposal). This archetype blends visionary foresight, deep expert knowledge, empathetic understanding, and the grounded imagination of a "realistic dreamer" to assist organizations in using technology for collective betterment.

### 1.1 The Visual Ethos
1.  **Dignified Restraint:** Negative space is a functional asset, not wasted room. We prefer large, breathing layouts that establish reading rhythm over crammed, complex widgets.
2.  **Calm, Grounded Authority:** We avoid synthetic elements, saturated primary-color gradients, neon accents, and flashy hover states. Our design feels human, established, and permanent.
3.  **Metaphorical Geometry:** We use subtle, clean lines (1px dividers) and structured container grids to frame qualitative stories and quantitative data.

---

## 2. Once UI Configuration Spec

We customize the Once UI Design System tokens within `src/resources/once-ui.config.js` to enforce these brand decisions at the framework level.

```javascript
// src/resources/once-ui.config.js
const style = {
  theme: "light",             // Locked to LIGHT-MODE ONLY to preserve warm cream feel
  neutral: "sand",            // Warm neutral tone (sand scales align with cream)
  brand: "custom",            // Custom primary accent system
  accent: "custom",           // Custom secondary interactive system
  solid: "inverse",           // High-contrast filled elements
  solidStyle: "flat",         // Crisp, editorial flat styling (no plastic/bouncy shadows)
  border: "conservative",     // Refined, subtle corner rounding for an institutional look
  surface: "filled",          // Clear solid surfaces rather than glassy, trendy overlays
  transition: "micro",        // Snappy, subtle transition speeds (Apple/Linear feel)
  scaling: "100",             // Default typographic scaling
};
```

### 2.1 CSS Custom Tokens Override

We override the default brand variables in global CSS to map out our reconciled palette:

```css
:root {
  /* Warm Cream Background */
  --neutral-background: #FAF6EE;
  
  /* Timeless Editorial Text Tones */
  --neutral-text-strong: #1C1E21;    /* Deep Charcoal */
  --neutral-text-medium: #4A4D50;    /* Muted Charcoal */
  
  /* Deep, Authoritative Indigo */
  --brand-primary: #1A237E;
  --brand-primary-hover: #121858;
  
  /* Janus Interactive Violet (Bridge Token) */
  --accent-primary: #5A40FF;
  --accent-primary-hover: #432CD8;
  
  /* Subtle Borders and Frames */
  --neutral-border-weak: rgba(26, 35, 126, 0.08);
  --neutral-border-medium: rgba(26, 35, 126, 0.15);
}
```

---

## 3. Typography & Rhythm

Typography is our primary tool for conveying prestige and credibility. We pair an elegant, classical serif with a hyper-legible, modern sans-serif.

### 3.1 The Font Pairing
*   **Headlines (H1, H2, H3):** **Source Serif 4** or **Lora**. These fonts project academic integrity, literary depth, and institutional history.
*   **Body Text & Labels:** **Inter** or **Geist**. These fonts provide extreme clarity and modern precision across varying device resolutions.

### 3.2 Vertical Rhythm & Spacing
Following Once UI core rules, we enforce strict, proportional spacing:
*   **Section Padding:** `128px` on desktop, scaling down to `64px` on mobile. No arbitrary spacing heights.
*   **Max Text Width:** Body prose must be locked to a maximum of `680px` (`60ch`) to maintain optimal reading line length and prevent horizontal scanning fatigue.

---

## 4. Visual Guardrails & Anti-Patterns

To maintain the high-integrity visual standard of a billion-dollar foundation, we establish a zero-tolerance policy for the following design anti-patterns.

### 4.1 Banned Visual Elements
*   **NO Stock Handshakes or Corporate Clichés:** Avoid generic photos of business meetings, multi-ethnic groups looking blankly at a tablet, or puzzle pieces clicking together.
*   **NO Photorealistic AI People:** Do not generate fake user avatars, customer faces, or team member portraits. Human photography must be authentic, licensed, or depicted via high-quality abstract illustrations.
*   **NO Saturated Mesh Gradients:** Avoid trendy, purple-pink-blue neon background blobs. Our backgrounds are clean, solid warm cream `#FAF6EE`.
*   **NO Fake Screenshots:** Screenshots of the Janus Suite (Eval Path, Grant Tracker) must reflect actual product routes and code configurations. Do not illustrate fake, futuristic dashboard metrics to mislead prospects.

### 4.2 The Lotus Motif Rules
The lotus motif (`🪷`) represents our methodology and Neeraj's brand values, but it can easily become a design distraction if overused.
*   **Opacity Cap:** Must be rendered at a maximum of `10%` to `15%` opacity. It must float subtly in the background container, never overlaying text.
*   **Placement Restriction:** Permitted on **Panel 1** (Hero background area) and the **Final Panel** (Footer CTA area) only. It is banned from middle product tours or tables to prevent grid noise.
*   **Scale:** Rendered as a large, soft structural watermark in a bottom-left or bottom-right corner, rather than a small, repeated pattern.
