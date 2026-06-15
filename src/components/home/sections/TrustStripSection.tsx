import { SectionShell } from "../SectionShell";

const PARTNERS = [
  "John Templeton Foundation",
  "Philanthropic foundations",
  "Program evaluators",
  "Regional capacity builders",
  "Nonprofit grantees",
];

export const TrustStripSection = () => (
  <SectionShell tone="white" className="lr-trust-strip" id="trust-strip">
    <p className="lr-trust-strip-lead">
      Trusted by leading philanthropic organizations and programmatic evaluators
    </p>
    <div className="lr-trust-marquee" aria-hidden>
      <div className="lr-trust-marquee-track">
        {PARTNERS.map((name) => (
          <span key={name} className="lr-trust-marquee-item">
            {name}
          </span>
        ))}
        {PARTNERS.map((name) => (
          <span key={`dup-${name}`} className="lr-trust-marquee-item" aria-hidden>
            {name}
          </span>
        ))}
      </div>
    </div>
  </SectionShell>
);
