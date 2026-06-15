import { Meta } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";
import { SectionShell } from "@/components/home/SectionShell";
import { baseURL } from "@/resources/seo";

interface SectorContent {
  eyebrow: string;
  title: string;
  subhead: string;
  paragraph: string;
  solution: string;
  capabilities: string[];
  screen: JanusScreenId;
}

const SECTORS: Record<string, SectorContent> = {
  nonprofit: {
    eyebrow: "Nonprofits & grantees",
    title: "Simplify reporting. Focus on changing lives.",
    subhead: "One workspace for your programs, built for teams that deliver the work.",
    paragraph:
      "For too long, nonprofit teams have spent up to 30% of their annual capacity manually filling out disconnected spreadsheets, copying metrics across custom funder forms, and writing static reports trapped in siloed databases. We bridge this gap — your team keeps and owns its files, with the technical leverage you deserve.",
    solution:
      "With Janus, you manage one workspace for your programs. Design logic models and compile board-ready reports automatically, with every claim grounded in documents your team has already verified.",
    capabilities: [
      "Your files stay with your team — not copied into a funder portal",
      "One-click report compiles that ground evidence securely",
      "Janus Guidance speeds logic modeling from your own sources",
      "Fully funded subscriptions when your funder licenses Lotus Rise",
    ],
    screen: "logic-model",
  },
  funder: {
    eyebrow: "Foundations & funders",
    title: "Base funding decisions on verifiable evidence.",
    subhead: "Portfolio-wide reporting without taking ownership of grantee databases.",
    paragraph:
      "Funding decisions have too often been swayed by emotional storytelling or rigid PDF applications, creating high allocation risk and strategic outcome gaps across grant portfolios. We provide funder teams and impact investors with an auditable trust standard.",
    solution:
      "Establish standard evaluation methodologies across your portfolio. Review audit-ready report exports and ground funding decisions in real evidence — mitigating allocation risk and scaling administrative leverage.",
    capabilities: [
      "Standardize program evaluation frameworks portfolio-wide",
      "Audit-ready report exports eliminate compliance guesswork",
      "Sensitive fields protected by default for data and PII safety",
      "Each license includes ten free nonprofit workspaces for your grantees",
    ],
    screen: "grant-classifier",
  },
  capacity: {
    eyebrow: "Capacity builders",
    title: "Equip regional networks at scale.",
    subhead: "Shared standards and your branding across every organization you support.",
    paragraph:
      "Regional alliances, intermediary support teams, and local agencies want to support hundreds of grassroots organizations but lack the staff to coach each one individually. We help intermediaries deploy preconfigured strategic toolsets at scale.",
    solution:
      "Deploy expert, preconfigured evaluation templates and custom coaching models across hundreds of local organizations — establishing a centralized regional impact backbone with no data-silo friction.",
    capabilities: [
      "White-label the Janus environment as a regional backbone",
      "Preconfigure evaluation templates and strategic logic models",
      "Aggregate outputs from hundreds of network nodes instantly",
      "Coordinated theory-of-change tracking via Janus Strategy",
    ],
    screen: "share",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SECTORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sector = SECTORS[slug];
  return Meta.generate({
    title: sector ? `${sector.eyebrow} | Lotus Rise` : "Who we serve | Lotus Rise",
    description: sector ? sector.subhead : "How funders, nonprofits, and capacity builders use Lotus Rise.",
    baseURL,
    path: `/sectors/${slug}`,
    image: "/opengraph-image",
    robots: "noindex, nofollow",
  });
}

export default async function SectorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = SECTORS[slug];

  if (!sector) {
    notFound();
  }

  return (
    <main className="lr-page lr-v4">
      <SectionShell tone="cream" id="sector">
        <div className="lr-section-head">
          <p className="lr-eyebrow">{sector.eyebrow}</p>
          <h2 className="lr-h2">{sector.title}</h2>
          <p className="lr-body lr-lead">{sector.subhead}</p>
        </div>

        <div className="lr-split">
          <div>
            <p className="lr-body">{sector.paragraph}</p>
            <p className="lr-relief">
              <strong>The Janus advantage.</strong> {sector.solution}
            </p>
            <ul className="lr-check-list">
              {sector.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
            <a
              href={`mailto:contact@lotusrise.org?subject=Lotus Rise for ${sector.eyebrow}`}
              className="lr-btn lr-btn--primary"
            >
              Schedule a consultation
            </a>
          </div>
          <div className="lr-shift-visual">
            <JanusScreen screen={sector.screen} variant="inline" />
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
