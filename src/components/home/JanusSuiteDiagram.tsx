/** Editorial Janus suite diagram — conceptual, not product screenshots. */

import type { KeyboardEvent } from "react";

export type SuitePillarId = "strategy" | "evaluation" | "grants" | "communications";

const PILLAR_META: Record<
  SuitePillarId,
  { label: string; module: string; x: number; y: number; angle: number }
> = {
  strategy: { label: "Strategy", module: "Janus", x: 200, y: 52, angle: -90 },
  evaluation: { label: "Evaluation", module: "Janus", x: 48, y: 168, angle: 180 },
  grants: { label: "Grant Management", module: "Janus", x: 352, y: 168, angle: 0 },
  communications: { label: "Guidance", module: "Janus", x: 200, y: 292, angle: 90 },
};

interface JanusSuiteDiagramProps {
  variant?: "hero" | "story";
  activeId?: SuitePillarId | null;
  onSelect?: (id: SuitePillarId) => void;
  className?: string;
}

export const JanusSuiteDiagram = ({
  variant = "story",
  activeId = null,
  onSelect,
  className = "",
}: JanusSuiteDiagramProps) => {
  const isHero = variant === "hero";
  const interactive = Boolean(onSelect);

  return (
    <svg
      viewBox="0 0 400 360"
      role="img"
      aria-label="Janus suite: strategy, evaluation, grantmaking, and communications connected in one workspace"
      className={`he-suite-diagram he-suite-diagram--${variant} ${className}`.trim()}
    >
      <defs>
        <linearGradient id="he-suite-core" x1="160" y1="120" x2="240" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a237e" />
          <stop offset="100%" stopColor="#2d3894" />
        </linearGradient>
        <linearGradient id="he-suite-glow" x1="200" y1="100" x2="200" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3d5a45" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1a237e" stopOpacity="0.06" />
        </linearGradient>
        <filter id="he-suite-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="200" cy="172" rx="148" ry="118" fill="url(#he-suite-glow)" />

      {(Object.keys(PILLAR_META) as SuitePillarId[]).map((id) => {
        const p = PILLAR_META[id];
        const active = activeId === id;
        return (
          <line
            key={`line-${id}`}
            x1="200"
            y1="172"
            x2={p.x}
            y2={p.y}
            className={`he-suite-diagram__spoke${active ? " is-active" : ""}`}
            strokeWidth={active ? 2 : 1.25}
          />
        );
      })}

      <circle cx="200" cy="172" r="54" fill="url(#he-suite-core)" className="he-suite-diagram__core" />
      <circle cx="200" cy="172" r="62" fill="none" className="he-suite-diagram__core-ring" strokeWidth="1" />

      <text x="200" y="164" textAnchor="middle" className="he-suite-diagram__core-label">
        Your
      </text>
      <text x="200" y="186" textAnchor="middle" className="he-suite-diagram__core-label he-suite-diagram__core-label--strong">
        workspace
      </text>

      {(Object.entries(PILLAR_META) as [SuitePillarId, (typeof PILLAR_META)[SuitePillarId]][]).map(
        ([id, p]) => {
          const active = activeId === id;
          return (
            <g
              key={id}
              className={`he-suite-diagram__node${active ? " is-active" : ""}`}
              {...(interactive
                ? {
                    role: "button" as const,
                    tabIndex: 0,
                    onClick: () => onSelect?.(id),
                    onKeyDown: (e: KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect?.(id);
                      }
                    },
                    style: { cursor: "pointer" },
                  }
                : {})}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isHero ? 36 : 42}
                className={`he-suite-diagram__node-bg${active ? " is-active" : ""}`}
              />
              <text x={p.x} y={p.y - (isHero ? 4 : 6)} textAnchor="middle" className="he-suite-diagram__node-label">
                {p.label}
              </text>
              <text x={p.x} y={p.y + (isHero ? 14 : 16)} textAnchor="middle" className="he-suite-diagram__node-module">
                {p.module}
              </text>
            </g>
          );
        },
      )}

      {!isHero ? (
        <path
          d="M 200 118 A 54 54 0 0 1 248 148"
          fill="none"
          className="he-suite-diagram__flow"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      ) : null}
    </svg>
  );
};
