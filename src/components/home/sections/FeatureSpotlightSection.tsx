import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";
import { SectionShell } from "../SectionShell";

const SPOTLIGHT: {
  eyebrow: string;
  title: string;
  body: string;
  screen: JanusScreenId;
} = {
  eyebrow: "Grant impact reporting",
  title: "Your annual report, built from the work you already did.",
  body: "Indicator progress, qualitative notes, and a funder-ready narrative come straight from the records your program staff keep day to day — so nobody is re-entering a year of work the week the report is due.",
  screen: "report",
};

export const FeatureSpotlightSection = () => (
  <SectionShell tone="cream" className="lr-feature-spot">
    <div className="lr-feature-spot-grid">
      <div className="reveal-on-scroll">
        <p className="lr-eyebrow">{SPOTLIGHT.eyebrow}</p>
        <h2 className="lr-h2">{SPOTLIGHT.title}</h2>
        <p className="lr-body lr-lead">{SPOTLIGHT.body}</p>
      </div>
      <div className="reveal-on-scroll stagger-2">
        <JanusScreen screen={SPOTLIGHT.screen} variant="inline" />
      </div>
    </div>
  </SectionShell>
);
