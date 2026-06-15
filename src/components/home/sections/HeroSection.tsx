import { JanusScreen } from "@/components/janus/JanusScreen";
import { LotusWatermark } from "../LotusWatermark";
import { SectionShell } from "../SectionShell";
import { DEMO } from "../copy";

export const HeroSection = () => (
  <SectionShell tone="cream" wide className="lr-hero lr-hero-v4" id="hero">
    <LotusWatermark size={200} className="lotus-bg" />
    <div className="lr-hero-v3-grid">
      <div>
        <p className="lr-welcome hero-stagger hero-stagger-1">
          Grant reporting &amp; evaluation software for foundations and nonprofits
        </p>
        <h1 className="lr-hero-title hero-stagger hero-stagger-2">
          Amplify your impact,
          <em> with the right technology.</em>
        </h1>
        <p className="lr-lead lr-lead--hero hero-stagger hero-stagger-3">
          Bring your logic models, indicators, and grant reports into one workspace — so your team spends less time
          proving the work and more time doing it.
        </p>
        <div className="lr-btn-row hero-stagger hero-stagger-4">
          <a href={DEMO} className="lr-btn lr-btn--primary">
            Schedule a demo
          </a>
          <a href="#product-theatre" className="lr-btn lr-btn--ghost">
            See the platform
          </a>
        </div>
        <div className="lr-hero-stats hero-stagger hero-stagger-4">
          <div className="lr-hero-stat">
            <strong>10:1</strong>
            <span>Nonprofit workspaces per funder license</span>
          </div>
          <div className="lr-hero-stat">
            <strong>$0</strong>
            <span>For qualifying grantees</span>
          </div>
          <div className="lr-hero-stat">
            <strong>PBC</strong>
            <span>A public benefit corporation by charter</span>
          </div>
        </div>
        <p className="lr-hero-partner">
          <span className="lr-eyebrow">Live pilot</span>
          <span className="lr-hero-partner-text">
            <strong>John Templeton Foundation</strong> is piloting Lotus Rise through a full reporting cycle.
          </span>
        </p>
      </div>
      <div className="hero-product-reveal">
        <JanusScreen screen="logic-model" variant="hero" className="lr-showcase--elevated" />
      </div>
    </div>
  </SectionShell>
);
