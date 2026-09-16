import { sitePath } from "@/lib/site-path";

export const siteContent = {
  brand: {
    name: "Lotus Rise",
    descriptor: "A public benefit corporation building software products for the social sector.",
  },
  navigation: [
    { label: "Janus", href: "/janus/", page: "janus" },
    { label: "About us", href: "/team/", page: "team" },
  ],
  actions: {
    exploreJanus: "Explore Janus",
    exploreEvaluation: "Explore Evaluation",
    requestPreview: "Request a preview",
    registerInterest: "Register interest",
    contactUs: "Contact us",
    backHome: "Back to homepage",
    returnHome: "Return to the homepage",
    send: "Send request",
    sending: "Sending",
  },
  hero: {
    title: "We help the social sector amplify its impact with the right technology.",
    lead: "Lotus Rise builds software products for foundations and nonprofits. Our flagship product, Janus, makes strategy, evaluation and reporting easier, so teams can focus on the people and causes they serve.",
  },
  janus: {
    title: "Meet Janus.",
    body: "Janus is an AI-powered product suite for strategy, evaluation and reporting. It keeps the work connected while important decisions stay with people.",
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
  principles: {
    title: "Technology should help the people helping others.",
    body: "Lotus Rise is a public benefit corporation. We believe technology can change the world for the better when it makes life easier for people doing work that matters. These principles guide what we build and how we work.",
    founderQuote:
      "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
    founder: "Neeraj Vir, Founder & CEO",
    items: [
      {
        title: "Integrity",
        copy: "We are honest and clear about what technology can do and how it can help you.",
      },
      {
        title: "Innovation",
        copy: "We use technology where it can make the work easier.",
      },
      {
        title: "Empowerment",
        copy: "We give people useful tools and the confidence to make good decisions.",
      },
      {
        title: "Community",
        copy: "We stay close to the people doing the work and keep improving the process until the technology fits their mission.",
      },
    ],
  },
  closing: {
    title: "See where Janus can help.",
    body: "Tell us what your team is working on. We will listen and tell you plainly where Janus may be a useful fit.",
  },
  janusPage: {
    hero: {
      title: "Strategy, evaluation and reporting. Connected.",
      lead: "Janus is an AI-powered product suite that helps social-sector teams turn evidence into decisions and clear reporting without losing the thinking in between.",
      caption: "Evaluation program path",
    },
    suite: {
      title: "One suite. Three parts of the work.",
      body: "Each area is useful on its own. Together, they keep evidence, decisions and reporting connected.",
    },
    ai: {
      title: "AI prepares the work. People make the call.",
      body: "Janus helps organize material, surface gaps and prepare a useful first pass. The team checks the evidence, changes the work and decides what is ready.",
      control: "Human review is central to the product.",
      caption: "Reviewed report",
    },
    closing: {
      title: "Start with the part that matters now.",
      body: "Evaluation is in private preview now. Tell us about one real evaluation and we will say plainly whether Janus is a useful fit.",
    },
  },
  evaluationPage: {
    product: "Janus Evaluation",
    status: "Private preview",
    hero: {
      title: "Keep the whole evaluation connected.",
      lead: "Janus Evaluation brings the program plan, questions, measures, evidence, findings and reviewed report into one working record.",
      caption: "Evaluation program path",
    },
    path: {
      title: "Build the record as the work happens.",
      body: "Questions, measures, evidence and findings stay linked from setup to review. The report is the end of the path, not a fresh start.",
      steps: ["Program plan", "Questions + measures", "Evidence + findings", "Review + report"],
    },
    gallery: {
      title: "See Evaluation as it is today.",
      body: "Every view below comes from the current private preview. No concept screens.",
    },
    review: {
      title: "Let AI do the first pass. Keep the judgment with the team.",
      body: "Janus can prepare a first pass. People check each finding against its source, change the work and approve what is ready to share.",
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
      caption: "Evaluation lineage",
      note: "People decide what is ready to share.",
    },
    closing: {
      title: "Bring one real evaluation.",
      body: "Show us where the work slows down. We will see whether Janus Evaluation is a useful fit.",
    },
  },
  strategyPage: {
    product: "Janus Strategy",
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
      lead: "Lotus Rise builds software products for foundations and nonprofits.",
      quote:
        "The work that foundations and nonprofits do benefits the whole planet. We have a responsibility to make their lives easier.",
      quoteBy: "Neeraj Vir, Founder & CEO",
    },
    origin: {
      title: "The mission should shape the technology.",
      body: [
        "Strategy, evaluation and reporting are spread across different systems and usually disconnected. Janus changes that.",
        "We started Lotus Rise to make technology fit the mission, so people spend less time managing systems and more time changing lives.",
      ],
    },
    values: {
      title: "What drives us forward",
      body: "Lotus Rise is a public benefit corporation. Our purpose is built into the company: help the social sector amplify its impact with useful, trustworthy technology.",
      note: "Empowerment, innovation, integrity and community have guided Lotus Rise from the start.",
      items: [
        {
          title: "Integrity",
          copy: "We are honest and clear about what technology can do and how it can help you.",
        },
        {
          title: "Innovation",
          copy: "We use technology where it can make the work easier.",
        },
        {
          title: "Empowerment",
          copy: "We give people useful tools and the confidence to make good decisions.",
        },
        {
          title: "Community",
          copy: "We stay close to the people doing the work and keep improving the process until the technology fits their mission.",
        },
      ],
    },
    roster: {
      title: "Closer to the mission. Smaller by design.",
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
      title: "Contact us.",
      body: "Tell us what your team is trying to make easier. We will reply with a clear next step.",
    },
  },
  contact: {
    title: "What would you like to discuss with us?",
    lead: "Tell us what your team is trying to make easier and where the work slows down.",
    nextTitle: "What happens next",
    next: "We'll read your note and reply with a clear next step.",
    form: {
      help: "We'll only use these details to reply to your request.",
      configuration:
        "This form is not connected yet, so requests cannot be sent from this page. Please check back soon.",
      submitError:
        "We could not send your request. Your details are still here, so please try again in a moment.",
      successTitle: "Thank you.",
      successBody: "We'll read your note and reply with a clear next step.",
      noscript: "This form needs JavaScript to send your request.",
    },
  },
} as const;

export type JanusView = (typeof siteContent.janus.views)[number];
