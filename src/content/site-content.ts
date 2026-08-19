import { sitePath } from "@/lib/site-path";

export const siteContent = {
  brand: {
    name: "Lotus Rise",
    descriptor: "AI tools for foundations and nonprofits.",
  },
  navigation: [
    { label: "Janus", href: "#janus" },
    { label: "Product path", href: "#connected-work" },
    { label: "Principles", href: "#principles" },
  ],
  hero: {
    eyebrow: "AI tools for people who make a difference",
    title: "Foundations and nonprofits: amplify your impact with the right technology.",
    lead: "Lotus Rise builds AI tools for foundations and nonprofits. Our first product, Janus, keeps a program plan, evidence, findings and final report connected, so teams can spend more time on the work that changes lives.",
  },
  janus: {
    eyebrow: "Our first product",
    title: "Keep the whole evaluation in one place.",
    body: "Janus carries a team from program plan to reviewed report. Every finding stays connected to the questions, measures and evidence behind it.",
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
    eyebrow: "The product path",
    title: "Start with evaluation. Reuse the work from there.",
    body: "Janus is being built in the order the work happens. A reviewed evaluation can feed reporting, strategy and, later, cross-program insights.",
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
    body: "Janus works from the team's own material. It shows the source behind each finding and leaves review and approval with people.",
    behaviors: [
      { title: "Bring in sources", copy: "Use the documents and data the team already has." },
      { title: "Build a draft", copy: "Turn that material into a useful first pass." },
      { title: "Check the evidence", copy: "Trace each finding back to its source." },
      { title: "Approve the output", copy: "People decide what is ready to share." },
    ],
  },
  audiences: {
    eyebrow: "Who it is for",
    title: "Built for the people on both sides of the grant.",
    body: "The same work should help a foundation decide, a nonprofit report and an evaluator explain what changed.",
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
    body: "Lotus Rise is a public benefit corporation. We believe technology can change the world for the better, so we build around a simple question: does this make the work easier for the people doing it?",
    founderQuote:
      "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
    founder: "Neeraj Vir, Founder & CEO",
    items: [
      {
        title: "Empowerment",
        copy: "Give foundations and nonprofits the tools and control to reach their full potential.",
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
    body: "Janus is opening to a small private-preview group. Bring us one real evaluation and tell us where the work gets stuck.",
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Tell us what should be easier.",
    lead: "Tell us where the process gets stuck and what your team needs to improve. We will see whether Janus fits the private preview.",
    next: "We will read your note and reply with a clear next step.",
  },
} as const;

export type JanusView = (typeof siteContent.janus.views)[number];
