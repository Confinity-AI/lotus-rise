import { sitePath } from "@/lib/site-path";

export const siteContent = {
  brand: {
    name: "Lotus Rise",
    descriptor: "A public benefit corporation building AI-powered products for the social sector.",
  },
  navigation: [
    { label: "Janus", href: "/janus/", page: "janus" },
    { label: "About us", href: "/team/", page: "team" },
  ],
  hero: {
    title: "We help the social sector amplify its impact with the right technology.",
    lead: "Lotus Rise builds AI-powered products for foundations and nonprofits. Our flagship product, Janus, makes strategy, evaluation and reporting easier, so teams can focus on the people and causes they serve.",
  },
  janus: {
    title: "Meet Janus.",
    body: "Janus is an AI-powered product suite for strategy, evaluation and reporting. It keeps the work connected, helps teams move faster and leaves important decisions with the people closest to the work.",
    modules: [
      {
        title: "Evaluation",
        status: "Private preview",
        copy: "Plan the evaluation, work with evidence and review the final report in one connected record.",
        href: "/janus/evaluation/",
        action: "Explore Evaluation",
      },
      {
        title: "Strategy",
        status: "Coming soon",
        copy: "Bring evidence and past learning into the next program, funding or organizational decision.",
        href: "/janus/strategy/",
        action: "Explore Strategy",
      },
      {
        title: "Reporting",
        status: "Coming soon",
        copy: "Turn reviewed work into clear updates without rebuilding the story from the beginning.",
        href: "/contact/",
        action: "Register interest",
      },
    ],
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
      "Partnering with Lotus Rise has helped us to streamline our team's evaluative workflows and to pilot new technologies in ways that consistently help us to better understand the impact of our funding...",
    name: "Steve Fitzmier",
    title: "Director of Planning & Evaluation",
    organization: "John Templeton Foundation",
    image: sitePath("/lotus-rise/team/steve-fitzmier.png"),
  },
  ai: {
    title: "Use AI to move faster. Keep people in control.",
    body: "Janus works with the material your team already has. Each finding points back to its source, and people decide what is ready to approve or share.",
    behaviors: [
      { title: "Bring in sources", copy: "Use the documents and data the team already has." },
      { title: "Build a draft", copy: "Turn that material into a useful first pass." },
      { title: "Check the evidence", copy: "Trace each finding back to its source." },
      { title: "Approve the output", copy: "People decide what is ready to share." },
    ],
  },
  principles: {
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
    title: "See where Janus could help.",
    body: "Explore the product suite or bring us one part of the work that takes too long. We will tell you plainly whether Janus is a useful fit.",
  },
  janusPage: {
    hero: {
      title: "Strategy, evaluation and reporting. Connected.",
      lead: "Janus is an AI-powered product suite that helps social-sector teams turn evidence into decisions and clear reporting without losing the thinking in between.",
    },
    problem: {
      title: "The work is connected. The tools usually aren't.",
      body: "Plans, evidence and reports often live in different places. At the end, teams have to rebuild how one led to the next.",
      pieces: ["Plan", "Evidence", "Report"],
      bridge: "One connected record from plan to reviewed report.",
    },
    path: {
      title: "Build the record as the work happens.",
      body: "Questions, measures, evidence and findings stay linked from setup to review. The report is the end of the path, not a fresh start.",
      steps: ["Program plan", "Questions + measures", "Evidence + findings", "Review + report"],
    },
    gallery: {
      title: "See Janus as it is today.",
      body: "Every view below comes from the current private preview. No concept screens.",
    },
    humanReview: {
      title: "Let AI do the first pass. Keep the judgment with the team.",
      body: "Janus can prepare a first pass. People check the evidence, change the work and approve what is ready to share.",
      steps: [
        {
          title: "Source material",
          copy: "Bring in the material the team already uses.",
        },
        {
          title: "First pass",
          copy: "Organize the material and prepare a draft.",
        },
        {
          title: "Review",
          copy: "Check each finding against its source.",
        },
        {
          title: "Approval",
          copy: "A person decides what is ready.",
        },
      ],
    },
    lineage: {
      title: "A finding should never lose its source.",
      body: "Each finding keeps its source close. When a question comes up, the team can see the evidence and the review behind it.",
    },
    suite: {
      title: "One suite. Three parts of the work.",
      body: "Each area is useful on its own. Together, they keep evidence, decisions and reporting connected.",
    },
    closing: {
      title: "Start with the part that matters now.",
      body: "Explore Evaluation, learn what is coming in Strategy or register your interest in Reporting.",
    },
  },
  evaluationPage: {
    hero: {
      title: "Keep the whole evaluation connected.",
      lead: "Janus Evaluation brings the program plan, questions, measures, evidence, findings and reviewed report into one working record.",
    },
    problem: {
      title: "Build the record as the work happens.",
      body: "The report should be the end of a clear path, not a reconstruction of work scattered across files.",
    },
    closing: {
      title: "Bring one real evaluation.",
      body: "Show us where the work slows down. We will see whether Janus Evaluation is a useful fit.",
    },
  },
  strategyPage: {
    hero: {
      title: "Turn learning into the next decision.",
      lead: "Janus Strategy will help teams bring evidence, past results and organizational context into the decisions that shape what comes next.",
    },
    status: "Coming soon",
    areas: [
      {
        title: "Bring the context together",
        copy: "Work from past evaluations, current priorities and the evidence the team already trusts.",
      },
      {
        title: "Make choices visible",
        copy: "Show what informed a priority, what was considered and where judgment entered the decision.",
      },
      {
        title: "Carry the decision forward",
        copy: "Keep the reasoning close when a strategy becomes a program, evaluation or report.",
      },
    ],
    closing: {
      title: "Help shape Janus Strategy.",
      body: "Tell us how your team makes strategic decisions today and where the process becomes harder than it should be.",
    },
  },
  team: {
    hero: {
      title: "Technology should make good work easier.",
      lead: "Lotus Rise builds AI-powered products around the real work of foundations and nonprofits.",
      quote:
        "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
      quoteBy: "Neeraj Vir, Founder & CEO",
    },
    origin: {
      title: "The mission should shape the technology.",
      body: [
        "Foundations and nonprofits know their work. Too often, their software does not. Strategy, evaluation and reporting end up spread across systems and rebuilt by hand.",
        "We started Lotus Rise to make the technology fit the mission, so people can spend less time managing systems and more time changing lives.",
      ],
      product: {
        title: "Janus starts with evaluation.",
        body: "It keeps program plans, questions, measures, evidence, findings and reports in one working record.",
      },
    },
    values: {
      title: "What we come back to.",
      body: "Lotus Rise is a public benefit corporation. Our purpose is built into the company: help the social sector amplify its impact with practical, trustworthy technology.",
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
      title: "Stay close to the people doing the work.",
      body: "We test Janus against real evaluations and change it when the product does not fit the work. People remain responsible for the final call.",
    },
  },
  contact: {
    title: "What would you like to make easier?",
    lead: "Tell us where strategy, evaluation or reporting slows your team down. We will see whether Janus is a fit and learn what your team needs next.",
    next: "We'll read your note and reply with a clear next step.",
  },
} as const;

export type JanusView = (typeof siteContent.janus.views)[number];
