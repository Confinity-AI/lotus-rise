/** Editorial 3-step flow: grantee workspace → evidence → funder report. */

export const OutcomeFlow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 520 140"
    role="img"
    aria-label="Grantees update indicators in their workspace; funders receive read-only reports tied to source data"
    className={`he-outcome-flow ${className}`.trim()}
  >
    <defs>
      <linearGradient id="he-flow-arrow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3d5a45" stopOpacity="0.35" />
        <stop offset="100%" stopColor="rgba(255,252,247,0.5)" />
      </linearGradient>
    </defs>

    <g className="he-outcome-flow__node">
      <rect x="8" y="28" width="136" height="84" rx="4" fill="rgba(255,252,247,0.08)" stroke="rgba(255,252,247,0.22)" />
      <text x="76" y="58" textAnchor="middle" className="he-outcome-flow__label">
        Grantee workspace
      </text>
      <text x="76" y="78" textAnchor="middle" className="he-outcome-flow__detail">
        Logic model · indicators
      </text>
      <text x="76" y="96" textAnchor="middle" className="he-outcome-flow__detail">
        Files stay here
      </text>
    </g>

    <path d="M 152 70 H 188" stroke="url(#he-flow-arrow)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="188,66 196,70 188,74" fill="rgba(255,252,247,0.45)" />

    <g className="he-outcome-flow__node he-outcome-flow__node--mid">
      <rect x="200" y="28" width="120" height="84" rx="4" fill="rgba(61,90,69,0.22)" stroke="rgba(255,252,247,0.28)" />
      <text x="260" y="58" textAnchor="middle" className="he-outcome-flow__label">
        Update evidence
      </text>
      <text x="260" y="78" textAnchor="middle" className="he-outcome-flow__detail">
        One source record
      </text>
      <text x="260" y="96" textAnchor="middle" className="he-outcome-flow__detail">
        per outcome
      </text>
    </g>

    <path d="M 328 70 H 364" stroke="url(#he-flow-arrow)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="364,66 372,70 364,74" fill="rgba(255,252,247,0.45)" />

    <g className="he-outcome-flow__node">
      <rect x="376" y="28" width="136" height="84" rx="4" fill="rgba(255,252,247,0.08)" stroke="rgba(255,252,247,0.22)" />
      <text x="444" y="58" textAnchor="middle" className="he-outcome-flow__label">
        Funder report
      </text>
      <text x="444" y="78" textAnchor="middle" className="he-outcome-flow__detail">
        Read-only export
      </text>
      <text x="444" y="96" textAnchor="middle" className="he-outcome-flow__detail">
        Traceable to source
      </text>
    </g>
  </svg>
);
