import { SectionShell } from "../SectionShell";
import { PROCESS_STEPS } from "../copy";

export const ProcessSection = () => (
  <SectionShell tone="white" id="process">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">How we work</p>
      <h2 className="lr-h2">From first conversation to your first real report.</h2>
    </div>
    <div className="process-timeline">
      <div className="process-timeline-line" aria-hidden />
      <div className="lr-process-grid">
        {PROCESS_STEPS.map((step) => (
          <article key={step.n} className="process-timeline-step lr-process-step">
            <span className="lr-process-n">{step.n}</span>
            <h3 className="lr-h3">{step.title}</h3>
            <p className="lr-body">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  </SectionShell>
);
