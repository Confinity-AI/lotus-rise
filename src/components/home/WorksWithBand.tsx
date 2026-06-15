/** Stack compatibility — Lotus Rise complements existing grants systems. */

const SYSTEMS = ["Fluxx", "Salesforce", "Excel & Google Sheets", "Your grants database"] as const;

export const WorksWithBand = () => (
  <section className="he-works-with" aria-labelledby="works-with-heading">
    <div className="he-wrap he-works-with__inner">
      <div className="he-works-with__copy">
        <p className="he-kicker">Your stack</p>
        <h2 id="works-with-heading" className="he-title-lg he-title-lg--md">
          Works alongside the systems you already run.
        </h2>
        <p className="he-body he-body--flush">
          Lotus Rise does not ask you to rip out Fluxx, Salesforce, or the spreadsheets your team trusts. We connect
          evaluation artifacts and grant reports to the records your staff already maintain.
        </p>
      </div>
      <div className="he-works-with__aside">
        <ul className="he-works-with__chips" aria-label="Compatible systems">
          {SYSTEMS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="he-works-with__foot">
          <a href="#questions" className="he-link-arrow">
            More on how we fit your stack
          </a>
        </p>
      </div>
    </div>
  </section>
);
