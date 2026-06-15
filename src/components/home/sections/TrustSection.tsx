import { JanusScreen } from "@/components/janus/JanusScreen";
import { SectionShell } from "../SectionShell";
import { TRUST_ITEMS } from "../copy";

export const TrustSection = () => (
  <SectionShell tone="white" id="trust">
    <div className="lr-section-head">
      <p className="lr-eyebrow">Trust center</p>
      <h2 className="lr-h2">An institutional grade of trust.</h2>
      <p className="lr-body lr-lead">
        Built for foundations that need audit trails without taking ownership of grantee databases.
      </p>
    </div>
    <div className="lr-trust-grid">
      {TRUST_ITEMS.map((item) => (
        <article key={item.title} className="lr-trust-card trilogy-card">
          <h3 className="lr-h3">{item.title}</h3>
          <p className="lr-body">{item.body}</p>
        </article>
      ))}
    </div>
    <div className="lr-trust-panels">
      <figure className="lr-trust-panel">
        <JanusScreen screen="guidance" variant="inline" />
        <figcaption className="lr-caption">Grounded drafting — language only from your verified sources</figcaption>
      </figure>
      <figure className="lr-trust-panel">
        <JanusScreen screen="report" variant="inline" />
        <figcaption className="lr-caption">Board-ready exports with an audit trail back to source</figcaption>
      </figure>
    </div>
  </SectionShell>
);
