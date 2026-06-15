import Link from "next/link";
import { SectionShell } from "../SectionShell";
import { TIERS } from "../copy";

export const PricingSection = () => (
  <SectionShell tone="cream" id="pricing">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">Pricing</p>
      <h2 className="lr-h2">Licenses that subsidize grantee access.</h2>
      <p className="lr-body lr-lead">
        Foundations pay for infrastructure. Qualifying nonprofits receive workspace access at no cost.
      </p>
    </div>
    <div className="lr-pricing-row">
      {TIERS.map((tier) => (
        <article key={tier.title} className={`lr-price-card trilogy-card${"featured" in tier && tier.featured ? " lr-price-card--featured" : ""}`}>
          {tier.badge ? <span className="lr-pricing-badge">{tier.badge}</span> : null}
          <h3 className="lr-h3">{tier.title}</h3>
          <p className="lr-body">{tier.body}</p>
          <a href={tier.href} className="lr-btn lr-btn--ghost">
            {tier.cta}
          </a>
        </article>
      ))}
    </div>
    <p className="lr-pricing-footer">
      <Link href="/pricing" className="lr-link-arrow">
        View full pricing details
      </Link>
    </p>
  </SectionShell>
);
