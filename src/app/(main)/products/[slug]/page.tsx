import { Meta } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";
import { SectionShell } from "@/components/home/SectionShell";
import { baseURL } from "@/resources/seo";

interface ProductContent {
  title: string;
  subhead: string;
  description: string;
  features: string[];
  ctaText: string;
  screen: JanusScreenId;
  badge?: string;
}

const PRODUCTS: Record<string, ProductContent> = {
  "eval-path": {
    title: "Evaluation",
    subhead: "Standardize your evaluation workflows.",
    description:
      "Design robust program logic models, coordinate indicator tracking, and compile board-ready reports automatically. Every claim is grounded directly in your organization's workspace, creating an auditable evidence base that eliminates manual report compiling.",
    features: [
      "Visual program logic model designer",
      "Dynamic indicator and outcome tracking",
      "One-click report compiles with source citations",
      "Direct alignment to national evaluation terminology",
    ],
    ctaText: "Request an Evaluation demo",
    screen: "logic-model",
  },
  "grant-tracker": {
    title: "Grant Management",
    subhead: "Coordinate grant outcomes effortlessly.",
    description:
      "Leave manual tracking and messy spreadsheets behind. Log program outputs, artifacts, and milestones in a unified audit trail that matches your work to funder expectations, keeping full context throughout the grant lifecycle.",
    features: [
      "Custom milestones and reporting schedules",
      "Secured, grounded artifact document vault",
      "Real-time progress mapping outcome statuses",
      "Export outcomes as audit-ready report files",
    ],
    ctaText: "Request a Grant Management demo",
    screen: "grant-classifier",
  },
  "strat-path": {
    title: "Strategy",
    subhead: "Align your strategic theories of change.",
    description:
      "Connect isolated program indicators to long-term, regional theories of change. Strategy aggregates outputs across multiple programs or investments to provide a global, real-time map of systemic, collaborative impact.",
    features: [
      "Interactive theory-of-change mapping",
      "Multi-grant outcome aggregation",
      "Regional indicator mapping and GIS support",
      "Gap analysis for unfunded targets",
    ],
    ctaText: "Request a Strategy demo",
    screen: "strategy",
    badge: "Coming soon",
  },
  "guide-path": {
    title: "Guidance",
    subhead: "Drafting help grounded in your own documents.",
    description:
      "Never write from a blank page. Our compliance-first assistant helps program managers design logic models and draft reviews under strict anti-slop guidelines, grounded entirely in your own workspace.",
    features: [
      "Context-aware drafting from your verified sources",
      "Interactive logic model and outcome generator",
      "Strict anti-slop and hallucination guardrails",
      "Review-ready drafts with source links",
    ],
    ctaText: "Request a Guidance demo",
    screen: "guidance",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  return Meta.generate({
    title: product ? `${product.title} | Janus by Lotus Rise` : "Janus | Lotus Rise",
    description: product ? product.description : "The Janus product suite by Lotus Rise.",
    baseURL,
    path: `/products/${slug}`,
    image: "/opengraph-image",
    robots: "noindex, nofollow",
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    notFound();
  }

  return (
    <main className="lr-page lr-v4">
      <SectionShell tone="cream" id="product">
        <div className="lr-section-head">
          <p className="lr-eyebrow">Janus product suite</p>
          <h2 className="lr-h2">
            {product.title}
            {product.badge ? <span className="lr-pricing-badge lr-title-badge">{product.badge}</span> : null}
          </h2>
          <p className="lr-body lr-lead">{product.subhead}</p>
        </div>

        <div className="lr-split">
          <div>
            <p className="lr-body">{product.description}</p>
            <ul className="lr-check-list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              href={`mailto:contact@lotusrise.org?subject=Requesting ${product.title} demo`}
              className="lr-btn lr-btn--primary"
            >
              {product.ctaText}
            </a>
          </div>
          <div className="lr-shift-visual">
            <JanusScreen screen={product.screen} variant="inline" />
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
