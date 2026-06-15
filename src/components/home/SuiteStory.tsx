"use client";

import { useState } from "react";
import Link from "next/link";
import { JanusSuiteDiagram, type SuitePillarId } from "./JanusSuiteDiagram";

const PILLARS: {
  id: SuitePillarId;
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  soon?: boolean;
}[] = [
  {
    id: "evaluation",
    kicker: "Measure what matters",
    title: "Logic models and outcomes live in one place.",
    body:
      "Evaluation is where your team maps indicators, collects evidence, and sees whether programs are moving the needle, without rebuilding the same spreadsheet for every funder.",
    href: "/products/eval-path",
    cta: "About Evaluation",
  },
  {
    id: "grants",
    kicker: "Follow the grant cycle",
    title: "Milestones, artifacts, and reports stay connected.",
    body:
      "Grant Management ties deliverables to the outcomes you measure. When reporting season arrives, staff are not hunting through email threads for the file that proves a number.",
    href: "/products/grant-tracker",
    cta: "About Grant Management",
  },
  {
    id: "strategy",
    kicker: "See the portfolio",
    title: "Connect grants to foundation-wide goals.",
    body:
      "Strategy (coming soon) helps program officers see how individual grants ladder up to regional theories of change, so board conversations start from a shared map, not isolated PDFs.",
    href: "/products/strat-path",
    cta: "Strategy roadmap",
    soon: true,
  },
  {
    id: "communications",
    kicker: "Draft with care",
    title: "Report language grounded in your own sources.",
    body:
      "Guidance suggests sections and wording only from documents your team has already verified. No generic AI filler pulled from the open web.",
    href: "/products/guide-path",
    cta: "About Guidance",
  },
];

const FLOW = [
  { step: "01", label: "Plan", detail: "Strategy and logic models" },
  { step: "02", label: "Measure", detail: "Indicators and evidence" },
  { step: "03", label: "Report", detail: "Grant milestones and artifacts" },
  { step: "04", label: "Share", detail: "Board-ready exports funders can review" },
];

export const SuiteStory = () => {
  const [activeId, setActiveId] = useState<SuitePillarId>("evaluation");
  const active = PILLARS.find((p) => p.id === activeId) ?? PILLARS[0];

  return (
    <div className="he-suite-story">
      <div className="he-suite-story__intro">
        <p className="he-body he-body--flush">
          Most teams juggle separate spreadsheets for logic models, grant milestones, and funder reports. We are
          building one workspace where those records stay linked, so when a number appears in a board deck, your
          staff can show where it came from. Nonprofits keep the workspace. Funders receive read-only exports they
          can review, not a copy of the entire database.
        </p>
        <p className="he-suite-story__note">
          Internally we call the connected platform <strong>Janus</strong>: strategy, evaluation, grantmaking, and
          communications in one place.
        </p>
        <ol className="he-suite-flow" aria-label="How the suite fits together">
          {FLOW.map((item) => (
            <li key={item.step}>
              <span className="he-suite-flow__step">{item.step}</span>
              <span>
                <strong>{item.label}</strong>
                <span className="he-suite-flow__detail">{item.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="he-suite-story__stage">
        <div className="he-suite-story__diagram-wrap">
          <JanusSuiteDiagram variant="story" activeId={activeId} onSelect={setActiveId} />
        </div>

        <div className="he-suite-story__pillars" role="tablist" aria-label="Janus suite capabilities">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              role="tab"
              aria-selected={activeId === pillar.id}
              className={`he-suite-pillar${activeId === pillar.id ? " is-active" : ""}${pillar.soon ? " he-suite-pillar--soon" : ""}`}
              onClick={() => setActiveId(pillar.id)}
            >
              <span className="he-suite-pillar__label">{pillar.kicker}</span>
              <span className="he-suite-pillar__name">{pillar.title}</span>
            </button>
          ))}
        </div>

        <article className="he-suite-story__panel" role="tabpanel" aria-live="polite">
          <p className="he-kicker">{active.kicker}</p>
          <h3 className="he-subhead he-subhead--lg">{active.title}</h3>
          <p className="he-body he-body--flush">{active.body}</p>
          <Link href={active.href} className="he-link-arrow">
            {active.cta}
          </Link>
        </article>
      </div>
    </div>
  );
};
