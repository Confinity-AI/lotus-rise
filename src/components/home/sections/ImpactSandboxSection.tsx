import { ImpactSandbox } from "../ImpactSandbox";
import { SectionShell } from "../SectionShell";

export const ImpactSandboxSection = () => (
  <SectionShell tone="cream" wide id="impact-sandbox">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">Impact calculator</p>
      <h2 className="lr-h2">See what the model covers for your portfolio.</h2>
      <p className="lr-body lr-lead">
        Size your portfolio and watch the numbers move: the licenses you would need, the free grantee workspaces
        they open, and the staff hours your team could reclaim from duplicate reporting.
      </p>
    </div>
    <ImpactSandbox />
  </SectionShell>
);
