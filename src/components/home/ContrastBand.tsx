import { HomeReveal } from "./HomeReveal";

/** Editorial contrast — how Lotus Rise differs from typical grant portals. */

const ROWS = [
  {
    usual: "Grantees re-enter the same outcomes in every funder portal",
    ours: "One workspace; read-only reports when each funder asks",
  },
  {
    usual: "When a grant ends, the history stays in the funder's system",
    ours: "Nonprofit teams keep their files and logic models",
  },
  {
    usual: "Board decks built from reconciled PDFs at quarter-end",
    ours: "Numbers in a report trace back to the source record",
  },
  {
    usual: "Regional partners cannot compare outcomes across dozens of sites",
    ours: "Shared indicators and comparable exports across your network",
  },
] as const;

export const ContrastBand = () => (
  <section className="he-contrast" aria-labelledby="contrast-heading">
    <div className="he-wrap">
      <header className="he-contrast__head">
        <p className="he-kicker">A different model</p>
        <h2 id="contrast-heading" className="he-title-lg he-title-lg--md">
          Built for how grants actually work, not another extractive portal.
        </h2>
      </header>
      <HomeReveal>
        <div className="he-contrast__table" role="table">
          <div className="he-contrast__labels" role="row">
            <span role="columnheader">The usual way</span>
            <span role="columnheader">With Lotus Rise</span>
          </div>
          {ROWS.map((row) => (
            <div key={row.usual} className="he-contrast__row" role="row">
              <p className="he-contrast__usual" role="cell">
                <span className="he-contrast__mobile-label">The usual way</span>
                {row.usual}
              </p>
              <p className="he-contrast__ours" role="cell">
                <span className="he-contrast__mobile-label">With Lotus Rise</span>
                {row.ours}
              </p>
            </div>
          ))}
        </div>
      </HomeReveal>
      <p className="he-contrast__foot">
        <a href="#trust" className="he-link-arrow">
          See how our pilots work
        </a>
      </p>
    </div>
  </section>
);
