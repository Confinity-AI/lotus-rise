import type { ReactNode } from "react";
import { SectionShell } from "../SectionShell";
import { BENEFITS } from "../copy";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Crisp line icons (white on the indigo chip), one per benefit. Bold strokes
 * that stay legible at 28px — unlike the fine-line isometric SVGs they replace.
 */
const BENEFIT_ICONS: ReactNode[] = [
  <svg key="world" {...ICON_PROPS} role="img" aria-label="Tailored workspace">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>,
  <svg key="resources" {...ICON_PROPS} role="img" aria-label="Guidance and resources">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.6 8.4 13.8 13.8 8.4 15.6 10.2 10.2 Z" />
  </svg>,
  <svg key="defend" {...ICON_PROPS} role="img" aria-label="Defensible decisions">
    <path d="M12 3 5 6v5c0 4.2 2.9 7.3 7 8.5 4.1-1.2 7-4.3 7-8.5V6Z" />
    <path d="m9 11.5 2 2 4-4" />
  </svg>,
];

export const BenefitsSection = () => (
  <SectionShell tone="cream" id="benefits">
    <div className="lr-section-head">
      <p className="lr-eyebrow">Why Lotus Rise</p>
      <h2 className="lr-h2">Software that works the way your team already does.</h2>
      <p className="lr-body lr-lead">
        Here&rsquo;s how you&rsquo;ll benefit from working with us, whether you fund the work or do it on the ground.
      </p>
    </div>
    <div className="lr-benefits-grid">
      {BENEFITS.map((item, i) => (
        <article key={item.title} className={`lr-benefit-card trilogy-card reveal-on-scroll stagger-${i + 1}`}>
          <div className="lr-benefit-icon">{BENEFIT_ICONS[i]}</div>
          <h3 className="lr-h3">{item.title}</h3>
          <p className="lr-body">{item.body}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);
