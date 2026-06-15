export const DEMO = "mailto:contact@lotusrise.org?subject=Lotus Rise Inquiry";
export const DEMO_FUNDER = "mailto:contact@lotusrise.org?subject=Foundation%20Pilot%20Inquiry";
export const DEMO_NONPROFIT = "mailto:contact@lotusrise.org?subject=Nonprofit%20Workspace%20Inquiry";
export const DEMO_CAPACITY = "mailto:contact@lotusrise.org?subject=Regional%20Capacity%20Inquiry";

export const PRINCIPLES = [
  {
    title: "Empowerment",
    body: "To reach their full potential, foundations and nonprofits need the right mix of tools and expert guidance. We help you make data-based decisions and amplify your impact.",
  },
  {
    title: "Innovation",
    body: "We truly believe technology has the power to change the world for the better. Our solutions support the everyday work you do to make it happen.",
  },
  {
    title: "Integrity",
    body: "When it comes to relationships, we take the long view. Lasting partnerships are rooted in trust and respect, so we lead with transparency, honesty, and accountability.",
  },
  {
    title: "Community",
    body: "Foundations and nonprofits thrive in a vibrant ecosystem where they connect, exchange knowledge, and collaborate. Ultimately, that is what helps us all drive change.",
  },
] as const;

export const BENEFITS = [
  {
    title: "Built for your world",
    body: "Our tools are created with foundations and nonprofits in mind, not retrofitted from generic enterprise software that never quite fits how you work.",
    icon: "/images/strategy-product.svg",
  },
  {
    title: "The right resources",
    body: "We put you in touch with the services and guidance you need to succeed across the board, from first workspace setup to your first funded report.",
    icon: "/images/strategy-brand.svg",
  },
  {
    title: "Decisions you can defend",
    body: "Move from scattered spreadsheets to connected records, so your team can make data-based decisions and stand behind every number you share.",
    icon: "/images/strategy-launch.svg",
  },
] as const;

export const SECTORS = [
  {
    key: "nonprofit",
    title: "Nonprofits & grantees",
    body: "One workspace for logic models, indicators, and grant reports — built for program teams, not retrofitted from enterprise software.",
    href: "/sectors/nonprofit",
    screen: "logic-model",
  },
  {
    key: "funder",
    title: "Foundations & funders",
    body: "Portfolio-wide reporting and audit-ready exports, without taking ownership of your grantees' databases.",
    href: "/sectors/funder",
    screen: "grant-classifier",
    featured: true,
  },
  {
    key: "capacity",
    title: "Capacity builders",
    body: "Shared indicator standards, your branding, and comparable reports across the organizations you support regionally.",
    href: "/sectors/capacity",
    screen: "share",
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Learn how you report today",
    body: "We map workflows with program staff, evaluators, and grants administrators, not a generic checklist.",
    screen: "collect",
  },
  {
    n: "02",
    title: "Set up your workspace",
    body: "Logic models, indicators, and templates match your funder agreements and the language your team already uses.",
    screen: "logic-model",
  },
  {
    n: "03",
    title: "Stay through the first report",
    body: "We coach your team until they submit a real grant report, not until everyone has watched a training video.",
    screen: "report",
  },
] as const;

export const TRUST_ITEMS = [
  {
    title: "Grantee files stay with the grantee",
    body: "Foundations receive read-only report exports they can review and audit, not a copy of the nonprofit's full database.",
  },
  {
    title: "Drafting uses your uploaded sources",
    body: "Janus Guidance suggests report language only from documents your team has already verified, not generic text from the open web.",
  },
  {
    title: "Sensitive fields protected by default",
    body: "Names and other identifying details can be stripped before storage, so qualitative stories can be shared safely.",
  },
  {
    title: "One shared record",
    body: "Evaluation, grantmaking, and reporting reference the same records, so numbers in a board deck trace back to source.",
  },
] as const;

export const TIERS = [
  {
    title: "Nonprofit workspace",
    body: "Full access for qualifying grantees. Paid by the funder's license, not from the nonprofit's operating budget.",
    badge: "$0 for grantees",
    href: DEMO_NONPROFIT,
    cta: "Ask about access",
  },
  {
    title: "Funder portfolio license",
    body: "One foundation workspace plus ten subsidized nonprofit workspaces per license.",
    badge: "10 free nonprofit seats",
    featured: true,
    href: DEMO_FUNDER,
    cta: "Request pilot details",
  },
  {
    title: "Regional backbone",
    body: "Multi-site infrastructure with shared standards and your organization's branding.",
    badge: "Custom scope",
    href: DEMO_CAPACITY,
    cta: "Discuss regional scope",
  },
] as const;
