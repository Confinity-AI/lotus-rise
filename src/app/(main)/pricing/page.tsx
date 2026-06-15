import { Meta } from "@once-ui-system/core";
import Link from "next/link";
import { SectionShell } from "@/components/home/SectionShell";
import { baseURL } from "@/resources/seo";

const CONTACT = "mailto:contact@lotusrise.org";

export async function generateMetadata() {
  return Meta.generate({
    title: "Pricing | Lotus Rise",
    description:
      "Transparent, mission-driven tiers. Funder and regional subscriptions subsidize free nonprofit workspaces for qualifying grantees.",
    baseURL,
    path: "/pricing",
    image: "/opengraph-image",
    robots: "noindex, nofollow",
  });
}

interface Tier {
  name: string;
  blurb: string;
  price: string;
  priceSub: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Nonprofit Growth",
    blurb: "For single organizations running local or regional programs. Billed per program.",
    price: "100% subsidized",
    priceSub: "Funded by funder tiers",
    features: [
      "Full Evaluation access",
      "A workspace your team owns",
      "Unlimited board-ready report exports",
      "Janus Guidance drafting support",
    ],
    cta: { label: "Apply for a subsidized seat", href: `${CONTACT}?subject=Apply for a subsidized nonprofit seat` },
  },
  {
    name: "Funder Portfolio",
    blurb: "For institutional funders and family offices standardizing metrics across a grantee portfolio.",
    price: "Custom",
    priceSub: "Billed on grants allocated",
    features: [
      "Multi-tenant portfolio dashboards",
      "Standardized logic model templates",
      "Ten free nonprofit workspaces for grantees",
      "Audit-ready report review",
    ],
    cta: { label: "Request a consultation", href: `${CONTACT}?subject=Funder portfolio subscription request` },
    featured: true,
  },
  {
    name: "Regional Backbone",
    blurb: "For regional networks and intermediaries standardizing evaluation at scale.",
    price: "Enterprise",
    priceSub: "Billed per network hub",
    features: [
      "Fully white-labeled portal branding",
      "Custom regional indicator templates",
      "Dedicated programmatic coaching",
      "SOC 2 Type I non-repudiation logging",
    ],
    cta: { label: "Request a quote", href: `${CONTACT}?subject=Regional backbone license inquiry` },
  },
];

export default function PricingPage() {
  return (
    <main className="lr-page lr-v4">
      <SectionShell tone="cream" id="pricing">
        <div className="lr-section-head">
          <p className="lr-eyebrow">Pricing</p>
          <h2 className="lr-h2">Transparent, mission-driven tiers.</h2>
          <p className="lr-body lr-lead">
            We operate as a Public Benefit Corporation. Fifteen percent of all software fees from funder and regional
            backbone subscriptions directly fund onboarding coaching and free nonprofit workspaces for qualifying
            grantees.
          </p>
        </div>
        <div className="lr-pricing-row">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={`lr-price-card${tier.featured ? " lr-price-card--featured" : ""}`}
            >
              {tier.featured ? <span className="lr-pricing-badge">Ten free nonprofit seats</span> : null}
              <h3 className="lr-h3">{tier.name}</h3>
              <p className="lr-body">{tier.blurb}</p>
              <p className="lr-price-amount">{tier.price}</p>
              <p className="lr-price-sub">{tier.priceSub}</p>
              <ul className="lr-check-list">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href={tier.cta.href} className="lr-btn lr-btn--ghost">
                {tier.cta.label}
              </a>
            </article>
          ))}
        </div>
        <p className="lr-pricing-footer">
          <Link href="/sectors/funder" className="lr-link-arrow">
            See how funders use Lotus Rise
          </Link>
        </p>
      </SectionShell>
    </main>
  );
}
