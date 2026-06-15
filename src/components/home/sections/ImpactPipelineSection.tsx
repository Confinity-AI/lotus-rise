import { ImpactPipeline } from "../ImpactPipeline";
import { SectionShell } from "../SectionShell";

export const ImpactPipelineSection = () => (
  <SectionShell tone="paper" wide id="impact-pipeline">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">Impact pipeline</p>
      <h2 className="lr-h2">From data collection to funder-ready reports.</h2>
      <p className="lr-body lr-lead">
        Walk through the four stages your team already runs, with the Janus workspace synced to each step.
      </p>
    </div>
    <ImpactPipeline />
  </SectionShell>
);
