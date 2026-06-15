import { LotusWatermark } from "../LotusWatermark";
import { SectionShell } from "../SectionShell";
import { DEMO } from "../copy";

export const FooterSection = () => (
  <SectionShell tone="ink" wide className="lr-footer-cta" id="get-started">
    <LotusWatermark size={180} className="lr-footer-watermark" />
    <div className="lr-footer-cta-inner">
      <h2 className="lr-h2 lr-footer-cta-title">Ready to amplify your impact?</h2>
      <p className="lr-body">Schedule a conversation with our team about a pilot or nonprofit workspace access.</p>
      <a href={DEMO} className="lr-btn lr-footer-cta-btn">
        Schedule a demo
      </a>
    </div>
  </SectionShell>
);
