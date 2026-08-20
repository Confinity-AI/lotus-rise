import { sitePath } from "@/lib/site-path";

export const siteContent = {
  brand: {
    name: "Lotus Rise",
    descriptor: "A public benefit corporation building AI tools for foundations and nonprofits.",
  },
  navigation: [
    { label: "Janus", href: "#janus" },
    { label: "Roadmap", href: "#connected-work" },
    { label: "Principles", href: "#principles" },
  ],
  hero: {
    eyebrow: "AI tools for people who make a difference",
    companyType: "Public benefit corporation",
    title: "Foundations and nonprofits: amplify your impact with the right technology.",
    lead: "Lotus Rise builds AI tools for the work behind grants. Janus keeps plans, evidence, findings and reports connected, so teams spend less time rebuilding the record and more time on the people they serve.",
  },
  janus: {
    eyebrow: "Our first product",
    title: "Keep the whole evaluation in one place.",
    body: "Janus keeps the work together from program plan to reviewed report. Each finding stays linked to the questions, measures and evidence behind it.",
    statuses: ["Evaluation · private preview", "Grant reporting · next", "Strategy · later"],
    note: "Screens from the current private preview. The interface may change.",
    views: [
      {
        title: "Program path",
        shortTitle: "Program path",
        image: sitePath("/lotus-rise/product/janus-program-path.webp"),
        width: 1905,
        height: 848,
        copy: "See every stage of the evaluation in one path.",
        alt: "Real Janus screen showing the evaluation program path",
      },
      {
        title: "Evaluation lineage",
        shortTitle: "Lineage",
        image: sitePath("/lotus-rise/product/janus-evaluation-lineage-v2.webp"),
        width: 1540,
        height: 707,
        copy: "Trace each finding back to the questions, measures and evidence behind it.",
        alt: "Real Janus screen showing connected evaluation lineage",
      },
      {
        title: "Reviewed report",
        shortTitle: "Report",
        image: sitePath("/lotus-rise/product/janus-reviewed-report.webp"),
        width: 1540,
        height: 707,
        copy: "Review the report and approve what is ready.",
        alt: "Real Janus screen showing a reviewed evaluation report",
      },
    ],
  },
  proof: {
    quote:
      "Partnering with Lotus Rise has helped us to streamline our team's evaluative workflows and to pilot new technologies in ways that consistently help us to better understand the impact of our funding and to learn how to improve our grantmaking.",
    name: "Steve Fitzmier",
    title: "Director of Planning & Evaluation",
    organization: "John Templeton Foundation",
  },
  connectedWork: {
    eyebrow: "Roadmap",
    title: "Start with evaluation and build from there.",
    body: "We are starting with evaluation. Grant reporting and strategy come next. Over time, connected evidence can reveal patterns across programs.",
    steps: [
      {
        title: "Evaluation",
        status: "Private preview",
        copy: "Take one program from setup to an approved report.",
      },
      {
        title: "Grant reporting",
        status: "Next",
        copy: "Turn approved findings and evidence into a grant report.",
      },
      {
        title: "Strategy",
        status: "Later",
        copy: "Use past results when setting the next priorities.",
      },
      {
        title: "Insights",
        status: "Future",
        copy: "Find patterns across programs once enough evidence exists.",
      },
    ],
  },
  ai: {
    eyebrow: "Practical AI for good",
    title: "Use AI to move faster. Keep people in control.",
    body: "Janus works with the material your team already has. Each finding points back to its source, and people decide what is ready to approve or share.",
    behaviors: [
      { title: "Bring in sources", copy: "Use the documents and data the team already has." },
      { title: "Build a draft", copy: "Turn that material into a useful first pass." },
      { title: "Check the evidence", copy: "Trace each finding back to its source." },
      { title: "Approve the output", copy: "People decide what is ready to share." },
    ],
  },
  audiences: {
    eyebrow: "Who it is for",
    title: "Built for foundations, nonprofits and evaluators.",
    body: "Foundations, nonprofits and evaluators can work from the same evidence without rebuilding it at every handoff.",
    items: [
      {
        label: "Foundations",
        title: "See what funding made possible.",
        copy: "Carry evidence into the next decision without rebuilding the story.",
      },
      {
        label: "Nonprofits",
        title: "Report the work without starting over.",
        copy: "Reuse what the team already produced during evaluation.",
      },
      {
        label: "Evaluation teams",
        title: "Keep the reasoning in view.",
        copy: "Show how the questions, measures, evidence and findings connect.",
      },
    ],
  },
  principles: {
    eyebrow: "Our guiding principles",
    title: "Technology should help the people helping others.",
    body: "Lotus Rise is a public benefit corporation. We believe technology can change the world for the better when it makes life easier for people doing work that matters. These principles guide what we build and how we work.",
    founderQuote:
      "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
    founder: "Neeraj Vir, Founder & CEO",
    items: [
      {
        title: "Empowerment",
        copy: "Give foundations and nonprofits the tools and control they need to reach their full potential.",
      },
      {
        title: "Innovation",
        copy: "Use technology to solve real problems and help good work go further.",
      },
      {
        title: "Integrity",
        copy: "Take the long view. Build trust through transparency, honesty and accountability.",
      },
      {
        title: "Community",
        copy: "Help foundations and nonprofits connect, share what they learn and work together.",
      },
    ],
  },
  closing: {
    title: "Tell us what should be easier.",
    body: "Janus is opening to a small private preview group. Bring one real evaluation and show us where the work gets stuck.",
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Tell us what should be easier.",
    lead: "Tell us where your evaluation gets stuck and what your team needs next. We'll see whether Janus is a fit for the private preview.",
    next: "We'll read your note and reply with a clear next step.",
  },
} as const;

export type JanusView = (typeof siteContent.janus.views)[number];
