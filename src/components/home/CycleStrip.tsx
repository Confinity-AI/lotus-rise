/** Slim grant-cycle wayfinding — Plan through Share, before the pain section. */

const STEPS = [
  { label: "Plan", detail: "Logic models" },
  { label: "Measure", detail: "Outcomes & evidence" },
  { label: "Report", detail: "Grant milestones" },
  { label: "Share", detail: "Board-ready exports" },
] as const;

export const CycleStrip = () => (
  <nav className="he-cycle-strip" aria-label="How grant reporting fits together">
    <div className="he-wrap">
      <p className="he-cycle-strip__kicker">The cycle we support</p>
      <ol className="he-cycle-strip__list">
        {STEPS.map((step, index) => (
          <li key={step.label} className="he-cycle-strip__item">
            <span className="he-cycle-strip__step">0{index + 1}</span>
            <span className="he-cycle-strip__copy">
              <strong>{step.label}</strong>
              <span>{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  </nav>
);
