import { SectionShell } from "../SectionShell";

/**
 * Ecosystem diagram — visualizes the unique Lotus Rise value loop:
 * one funder license opens ten nonprofit workspaces, and verified reports
 * flow back to the foundation, audit-ready. Fully code-rendered (crisp at
 * every breakpoint), no raster assets.
 */
export const EcosystemSection = () => (
  <SectionShell tone="indigo" id="ecosystem">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">The ecosystem</p>
      <h2 className="lr-h2">One platform, every side of the table.</h2>
      <p className="lr-body lr-lead">
        Lotus Rise connects the people who fund change with the people who deliver it. One funder license opens ten
        nonprofit workspaces — and every report flows back to the foundation as a verified export.
      </p>
    </div>

    <div className="lr-eco">
      <div className="lr-eco-return" aria-hidden>
        <span className="lr-eco-return-label">Audit-ready reports flow back to funders</span>
      </div>

      <div className="lr-eco-row">
        <article className="lr-eco-node">
          <span className="lr-eco-tag">Foundations &amp; funders</span>
          <p className="lr-eco-copy">
            License Lotus Rise and fund the reporting infrastructure for your whole portfolio.
          </p>
        </article>

        <span className="lr-eco-flow" aria-hidden>
          <span className="lr-eco-flow-label">License &amp; funding</span>
          <span className="lr-eco-arrow">→</span>
        </span>

        <article className="lr-eco-node lr-eco-node--hub">
          <span className="lr-eco-hub-badge">
            <span className="lr-eco-hub-mark" aria-hidden>
              ❋
            </span>
            Janus
          </span>
          <span className="lr-eco-tag">The Lotus Rise platform</span>
          <p className="lr-eco-copy">Evaluation, grant management, strategy, and guidance in one connected workspace.</p>
        </article>

        <span className="lr-eco-flow" aria-hidden>
          <span className="lr-eco-flow-label">Ten free workspaces</span>
          <span className="lr-eco-arrow">→</span>
        </span>

        <article className="lr-eco-node">
          <span className="lr-eco-tag">Nonprofits &amp; grantees</span>
          <p className="lr-eco-copy">
            Run programs and capture evidence in a full workspace — at no cost to your operating budget.
          </p>
        </article>
      </div>

      <div className="lr-eco-base">
        <span className="lr-eco-base-tag">Capacity builders</span>
        <p className="lr-eco-copy">
          Set shared indicator standards and apply your own branding across every organization you support across a
          region.
        </p>
      </div>
    </div>
  </SectionShell>
);
