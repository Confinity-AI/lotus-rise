import { JanusScreen } from "@/components/janus/JanusScreen";
import { SectionShell } from "../SectionShell";

const PAINS = [
  "Logic models live in spreadsheets that nobody updates after the grant is awarded.",
  "Impact reports are assembled manually from files scattered across email and shared drives.",
  "Board decks tell a story that cannot be traced back to source evidence.",
];

export const ProblemSection = () => (
  <SectionShell tone="earth" id="problem">
    <div className="lr-split">
      <div>
        <p className="lr-eyebrow">The reporting gap</p>
        <h2 className="lr-h2">Foundations need evidence. Nonprofits need time to deliver programs.</h2>
        <p className="lr-body lr-lead">
          Most teams are stuck between funders who need defensible numbers and grantees who cannot afford another
          reporting system that duplicates work they already do.
        </p>
        <ul className="lr-pain-list">
          {PAINS.map((pain) => (
            <li key={pain}>{pain}</li>
          ))}
        </ul>
        <p className="lr-relief">
          <strong>Janus</strong> connects logic models, indicators, and grant reports in one workspace, so your
          team keeps the files and funders receive exports they can audit.
        </p>
      </div>
      <div className="lr-shift-visual">
        <JanusScreen screen="indicators" variant="inline" />
      </div>
    </div>
  </SectionShell>
);
