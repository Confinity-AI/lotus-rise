import type { FC } from "react";

/**
 * Code-rendered, vector-crisp representations of the Janus product UI.
 * These replace raster screenshots so the imagery stays sharp at every
 * breakpoint and always carries correct Janus naming (no stale branding).
 */

export type JanusScreenId =
  | "logic-model"
  | "indicators"
  | "grant-classifier"
  | "report"
  | "strategy"
  | "guidance"
  | "collect"
  | "share";

type FrameVariant = "hero" | "default" | "inline" | "bare";

interface JanusScreenProps {
  screen: JanusScreenId;
  /** Visual framing (shadow + aspect ratio). */
  variant?: FrameVariant;
  /** Render a reduced layout for small thumbnails. */
  compact?: boolean;
  /** Fill the parent (used inside fixed-aspect containers like sector thumbs). */
  fill?: boolean;
  className?: string;
}

const META: Record<JanusScreenId, { module: string; crumb: string }> = {
  "logic-model": { module: "Evaluation", crumb: "Logic model" },
  indicators: { module: "Evaluation", crumb: "Indicators" },
  "grant-classifier": { module: "Grant Management", crumb: "Portfolio classifier" },
  report: { module: "Grant Management", crumb: "Impact report" },
  strategy: { module: "Strategy", crumb: "Portfolio map" },
  guidance: { module: "Guidance", crumb: "Drafting assistant" },
  collect: { module: "Evaluation", crumb: "Collect" },
  share: { module: "Grant Management", crumb: "Share" },
};

/* ---------------------------------------------------------------- chrome -- */

const Chrome: FC<{ id: JanusScreenId }> = ({ id }) => {
  const meta = META[id];
  return (
    <div className="jns-chrome">
      <span className="jns-brand">
        <span className="jns-logo" aria-hidden>
          J
        </span>
        Janus
      </span>
      <span className="jns-crumb" aria-hidden>
        <span className="jns-crumb-module">{meta.module}</span>
        <span className="jns-crumb-sep">/</span>
        {meta.crumb}
      </span>
      <span className="jns-tools" aria-hidden>
        <span className="jns-search">Search</span>
        <span className="jns-avatar">N</span>
      </span>
    </div>
  );
};

/* --------------------------------------------------------------- screens -- */

const FlowArrow: FC = () => (
  <span className="jns-arrow" aria-hidden>
    ›
  </span>
);

const LogicModel: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-flow">
    <div className="jns-col">
      <span className="jns-col-label">Inputs</span>
      <div className="jns-node jns-node--input">Evaluation staff</div>
      {!compact && <div className="jns-node jns-node--input">Literacy curriculum</div>}
    </div>
    <FlowArrow />
    <div className="jns-col">
      <span className="jns-col-label">Activities</span>
      <div className="jns-node jns-node--activity">After-school tutoring</div>
      {!compact && <div className="jns-node jns-node--activity">Family reading nights</div>}
    </div>
    <FlowArrow />
    <div className="jns-col">
      <span className="jns-col-label">Outcomes</span>
      <div className="jns-node jns-node--outcome">Reading fluency ↑</div>
      {!compact && <div className="jns-node jns-node--outcome">Attendance ↑</div>}
    </div>
    <FlowArrow />
    <div className="jns-col">
      <span className="jns-col-label">Impact</span>
      <div className="jns-node jns-node--impact">Grade-level literacy</div>
    </div>
  </div>
);

const INDICATORS = [
  { name: "Reading fluency (DIBELS)", outcome: "Reading ↑", pct: 72 },
  { name: "Program attendance rate", outcome: "Attendance ↑", pct: 88 },
  { name: "Family engagement index", outcome: "Engagement ↑", pct: 64 },
  { name: "Confidence self-report", outcome: "Wellbeing ↑", pct: 80 },
];

const Indicators: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-panel">
    <div className="jns-panel-head">
      <span className="jns-panel-title">Indicators</span>
      <span className="jns-pill jns-pill--ghost">On track</span>
    </div>
    <div className="jns-table">
      {INDICATORS.slice(0, compact ? 2 : 4).map((row) => (
        <div className="jns-trow" key={row.name}>
          <span className="jns-tname">{row.name}</span>
          {!compact && <span className="jns-chip jns-chip--outcome">{row.outcome}</span>}
          <span className="jns-bar">
            <span className="jns-bar-fill" style={{ width: `${row.pct}%` }} />
          </span>
          <span className="jns-tpct">{row.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

const GRANTS = [
  { name: "Literacy Now", amount: "$120k", area: "Education", risk: "Low", out: "Reading gains" },
  { name: "Bright Futures", amount: "$80k", area: "Youth", risk: "Medium", out: "Attendance" },
  { name: "Family First", amount: "$60k", area: "Family", risk: "Low", out: "Engagement" },
];

const GrantClassifier: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-panel">
    <div className="jns-panel-head">
      <span className="jns-panel-title">Portfolio</span>
      <span className="jns-pill jns-pill--ghost">FY26 · 3 active</span>
    </div>
    <div className="jns-table jns-table--grants">
      {GRANTS.slice(0, compact ? 2 : 3).map((g) => (
        <div className="jns-trow" key={g.name}>
          <span className="jns-tname">
            {g.name}
            <span className="jns-tsub">{g.amount}</span>
          </span>
          <span className="jns-chip jns-chip--area">{g.area}</span>
          {!compact && (
            <span className={`jns-chip jns-chip--risk-${g.risk.toLowerCase()}`}>{g.risk} risk</span>
          )}
          {!compact && <span className="jns-tout">{g.out}</span>}
        </div>
      ))}
    </div>
  </div>
);

const Report: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-doc">
    <div className="jns-doc-head">
      <span className="jns-doc-kicker">Board-ready</span>
      <span className="jns-doc-title">FY26 Impact Report</span>
    </div>
    <div className="jns-stats">
      <div className="jns-stat">
        <strong>8</strong>
        <span>Grantees</span>
      </div>
      <div className="jns-stat">
        <strong>92%</strong>
        <span>Outcomes met</span>
      </div>
      {!compact && (
        <div className="jns-stat">
          <strong>384</strong>
          <span>Hours reclaimed</span>
        </div>
      )}
    </div>
    {!compact && (
      <div className="jns-chart" aria-hidden>
        <span style={{ height: "48%" }} />
        <span style={{ height: "70%" }} />
        <span style={{ height: "58%" }} />
        <span style={{ height: "86%" }} />
        <span style={{ height: "74%" }} />
        <span style={{ height: "95%" }} />
      </div>
    )}
    <div className="jns-lines" aria-hidden>
      <span />
      <span />
      {!compact && <span />}
    </div>
  </div>
);

const Strategy: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-flow jns-flow--strategy">
    <div className="jns-col jns-col--single">
      <span className="jns-col-label">Foundation goal</span>
      <div className="jns-node jns-node--impact">Education equity</div>
    </div>
    <FlowArrow />
    <div className="jns-col">
      <span className="jns-col-label">Programs</span>
      <div className="jns-node jns-node--activity">Literacy Now</div>
      {!compact && <div className="jns-node jns-node--activity">Bright Futures</div>}
    </div>
    <FlowArrow />
    <div className="jns-col">
      <span className="jns-col-label">Portfolio outcomes</span>
      <div className="jns-node jns-node--outcome">Reading gains</div>
      {!compact && <div className="jns-node jns-node--outcome">Attendance ↑</div>}
    </div>
  </div>
);

const Guidance: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-panel jns-panel--guidance">
    {!compact && (
      <div className="jns-ask">Draft the outcomes summary for the FY26 grant report</div>
    )}
    <div className="jns-panel-head">
      <span className="jns-panel-title">
        <span className="jns-spark" aria-hidden>
          ✦
        </span>
        Drafting assistant
      </span>
      {!compact && <span className="jns-pill jns-pill--green">Suggested</span>}
    </div>
    <div className="jns-draft">
      <p className="jns-draft-line jns-draft-line--full" />
      <p className="jns-draft-line jns-draft-line--full" />
      {!compact && <p className="jns-draft-line jns-draft-line--full" />}
      <p className="jns-draft-line jns-draft-line--mid" />
    </div>
    <div className="jns-sources">
      <span className="jns-sources-label">Grounded in your sources</span>
      <span className="jns-chip jns-chip--source">Annual survey.pdf</span>
      {!compact && <span className="jns-chip jns-chip--source">Field notes.docx</span>}
    </div>
    <div className="jns-draft-actions">
      <span className="jns-btn jns-btn--green">Insert</span>
      <span className="jns-btn jns-btn--ghost">Edit</span>
    </div>
  </div>
);

const COLLECT = [
  { name: "Attendance log", status: "Synced", tone: "green" },
  { name: "Survey responses", status: "142 new", tone: "blue" },
  { name: "Field notes", status: "38 items", tone: "neutral" },
];

const Collect: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-panel">
    <div className="jns-panel-head">
      <span className="jns-panel-title">Sources</span>
      <span className="jns-pill jns-pill--green">Live</span>
    </div>
    <div className="jns-list">
      {COLLECT.slice(0, compact ? 2 : 3).map((c) => (
        <div className="jns-litem" key={c.name}>
          <span className="jns-litem-dot" aria-hidden />
          <span className="jns-litem-name">{c.name}</span>
          <span className={`jns-chip jns-chip--${c.tone}`}>{c.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const Share: FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="jns-panel">
    <div className="jns-panel-head">
      <span className="jns-panel-title">Shared report</span>
      <span className="jns-pill jns-pill--ghost">Read-only</span>
    </div>
    <div className="jns-share">
      <div className="jns-share-card">
        <span className="jns-share-org">John Templeton Foundation</span>
        <span className="jns-share-meta">FY26 Impact Report · exported</span>
      </div>
      {!compact && (
        <div className="jns-access">
          <span className="jns-access-avatars" aria-hidden>
            <i>JT</i>
            <i>RW</i>
            <i>+3</i>
          </span>
          <span className="jns-access-label">Audit trail on every export</span>
        </div>
      )}
    </div>
  </div>
);

const RENDERERS: Record<JanusScreenId, FC<{ compact?: boolean }>> = {
  "logic-model": LogicModel,
  indicators: Indicators,
  "grant-classifier": GrantClassifier,
  report: Report,
  strategy: Strategy,
  guidance: Guidance,
  collect: Collect,
  share: Share,
};

export const JanusScreen: FC<JanusScreenProps> = ({
  screen,
  variant = "default",
  compact = false,
  fill = false,
  className,
}) => {
  const Body = RENDERERS[screen];
  return (
    <div
      className={`jns jns--${variant}${compact ? " jns--compact" : ""}${fill ? " jns--fill" : ""} ${
        className ?? ""
      }`}
      data-screen={screen}
    >
      <Chrome id={screen} />
      <div className="jns-body">
        <Body compact={compact} />
      </div>
    </div>
  );
};
