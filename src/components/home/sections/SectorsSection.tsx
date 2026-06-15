import Link from "next/link";
import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";
import { SectionShell } from "../SectionShell";
import { SECTORS } from "../copy";

export const SectorsSection = () => (
  <SectionShell tone="white" id="sectors">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">Who we serve</p>
      <h2 className="lr-h2">Start with the work that sounds like yours.</h2>
    </div>
    <div className="lr-sectors-grid">
      {SECTORS.map((sector) => (
        <Link
          key={sector.key}
          href={sector.href}
          className={`lr-sector-card trilogy-card${"featured" in sector && sector.featured ? " lr-sector-card--featured" : ""}`}
          id={`icp-${sector.key}`}
        >
          <div className="lr-sector-thumb">
            <JanusScreen screen={sector.screen as JanusScreenId} compact fill />
          </div>
          <h3 className="lr-h3">{sector.title}</h3>
          <p className="lr-body">{sector.body}</p>
          <span className="lr-link-arrow">Learn more</span>
        </Link>
      ))}
    </div>
  </SectionShell>
);
