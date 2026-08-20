import { sitePath } from "@/lib/site-path";

export const siteContent = {
  brand: {
    name: "Lotus Rise",
    descriptor: "A public benefit corporation building AI tools for foundations and nonprofits.",
  },
  navigation: [
    { label: "Janus", href: "/janus/", page: "janus" },
    { label: "About us", href: "/team/", page: "team" },
  ],
  hero: {
    eyebrow: "AI tools for people who make a difference",
    title: "Foundations and nonprofits: amplify your impact with the right technology.",
    lead: "Lotus Rise builds AI tools for the work behind grants. Our first product, Janus, keeps plans, evidence, findings and reports connected, so teams can spend less time rebuilding the record and more time on the people they serve.",
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
  janusPage: {
    hero: {
      eyebrow: "Janus · Evaluation in private preview",
      title: "Keep every step of an evaluation connected.",
      lead: "Janus keeps the program plan, questions, measures, evidence, findings and report in one working record. That means less rebuilding and a clearer trail from source to decision.",
    },
    problem: {
      eyebrow: "Why Janus",
      title: "The work is connected. The tools usually aren't.",
      body: "A program plan starts in one file. Evidence lands somewhere else. By the time the report is written, the team is reconstructing how it reached the conclusion.",
      pieces: [
        { title: "Plan", copy: "What the program set out to do." },
        { title: "Evidence", copy: "What happened and where it was recorded." },
        { title: "Report", copy: "What the team can stand behind." },
      ],
      bridge: "Janus keeps them connected from the start.",
    },
    path: {
      eyebrow: "One connected path",
      title: "Build the record as the work happens.",
      body: "Questions, measures, evidence and findings stay linked from setup to review. The report is the end of the path, not a fresh start.",
      steps: ["Program plan", "Questions + measures", "Evidence + findings", "Review + report"],
    },
    gallery: {
      eyebrow: "Inside Janus",
      title: "See Janus as it is today.",
      body: "Every view below comes from the current private preview. No concept screens.",
    },
    humanReview: {
      eyebrow: "AI with a visible trail",
      title: "Let AI do the first pass. Keep the judgment with the team.",
      body: "Janus can help organize source material and draft findings. People can check the evidence, change the work and approve what is ready to share.",
      steps: [
        {
          title: "Source material",
          copy: "Bring in the documents and data the team already trusts.",
        },
        {
          title: "First pass",
          copy: "Use AI to organize the material and prepare a draft.",
        },
        {
          title: "Review",
          copy: "Check each finding against its source.",
        },
        {
          title: "Approval",
          copy: "A person decides what is ready to share.",
        },
      ],
    },
    lineage: {
      eyebrow: "Evidence stays attached",
      title: "A finding should never lose its source.",
      body: "Janus keeps the trail visible from source material to reviewed output. When a question comes up, the team can see what supports the finding and who approved it.",
      points: [
        { title: "Source", copy: "Start with the material the team already trusts." },
        { title: "Finding", copy: "Show the evidence behind each conclusion." },
        { title: "Review", copy: "People approve what is ready to share." },
      ],
    },
    modules: {
      eyebrow: "Built in a deliberate order",
      title: "Start with evaluation. Carry the work forward.",
      body: "We are testing evaluation with real teams first. Grant reporting follows, then strategy.",
      items: [
        {
          label: "Now · private preview",
          title: "Evaluation",
          copy: "Build, review and approve one connected evaluation record.",
        },
        {
          label: "Next",
          title: "Grant reporting",
          copy: "Turn approved findings and evidence into a grant report without starting over.",
        },
        {
          label: "Later",
          title: "Strategy",
          copy: "Bring past results into the next funding or program decision.",
        },
      ],
    },
    closing: {
      title: "Bring one real evaluation.",
      body: "Show us where the work slows down. We will see whether Janus is a useful fit for your team.",
    },
  },
  team: {
    hero: {
      eyebrow: "About Lotus Rise",
      title: "Technology should make good work easier.",
      lead: "Lotus Rise grew out of years spent alongside foundations and nonprofits. We saw smart teams lose time to systems that did not fit the work, scattered records and reports rebuilt by hand.",
      quote:
        "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
      quoteBy: "Neeraj Vir, Founder & CEO",
    },
    origin: {
      eyebrow: "Why we started",
      title: "The mission should shape the technology.",
      body: [
        "Foundations and nonprofits know their work. Too often, their software does not. It breaks one connected effort into separate systems, files and handoffs.",
        "We started Lotus Rise to make the technology fit the mission. Our AI tools help teams keep the record connected, learn from it and spend more time on the people they serve.",
      ],
      product: {
        eyebrow: "Our first product",
        title: "Janus starts with evaluation.",
        body: "It keeps program plans, questions, measures, evidence, findings and reports in one working record.",
      },
    },
    values: {
      eyebrow: "Our guiding principles",
      title: "What we come back to.",
      body: "Lotus Rise is a public benefit corporation. Our purpose is built into the company: help foundations and nonprofits amplify their impact with the right technology.",
      note: "Empowerment, innovation, integrity and community have guided Lotus Rise from the start.",
      items: [
        {
          title: "Empowerment",
          copy: "Give people useful tools, clear evidence and the final say.",
        },
        {
          title: "Innovation",
          copy: "Use new technology where it solves a real problem. Novelty on its own is not progress.",
        },
        {
          title: "Integrity",
          copy: "Take the long view. Be honest about what the product can do, and make the work easy to check.",
        },
        {
          title: "Community",
          copy: "Build with foundations, nonprofits and evaluators. Share what works so good ideas travel.",
        },
      ],
    },
    roster: {
      eyebrow: "The team",
      title: "Small by design. Close to the work.",
      body: "We are a small team, and everyone stays close to the product and the people using it.",
    },
    members: [
      {
        name: "Neeraj Vir",
        role: "Product Strategy",
        initials: "NV",
        image: sitePath("/lotus-rise/team/neeraj-vir.webp"),
        alt: "Neeraj Vir",
        bio: "Keeps the product focused on what foundations and nonprofits need from technology.",
      },
      {
        name: "Ryan Ward",
        role: "Tech Strategy",
        initials: "RW",
        image: sitePath("/lotus-rise/team/ryan-ward.webp"),
        alt: "Ryan Ward",
        bio: "Turns product direction into technology that teams can depend on.",
      },
      {
        name: "Parul Ohri",
        role: "Community Builder",
        initials: "PO",
        image: sitePath("/lotus-rise/team/parul-ohri.webp"),
        alt: "Parul Ohri",
        bio: "Listens to the organizations closest to the work and brings those needs into the product.",
      },
      {
        name: "Supamit Chaiya",
        role: "Architect",
        initials: "SC",
        image: sitePath("/lotus-rise/team/supamit-chaiya.webp"),
        alt: "Supamit Chaiya",
        bio: "Designs the architecture that keeps Janus connected today and ready for what comes next.",
      },
    ],
    statement: {
      eyebrow: "How we build",
      title: "Stay close to the people doing the work.",
      body: "We test Janus against real evaluations and change it when the product does not fit the work. People remain responsible for the final call.",
    },
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Tell us what should be easier.",
    lead: "Tell us where your evaluation gets stuck and what your team needs next. We'll see whether Janus is a fit for the private preview.",
    next: "We'll read your note and reply with a clear next step.",
  },
} as const;

export type JanusView = (typeof siteContent.janus.views)[number];
