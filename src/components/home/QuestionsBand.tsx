/** Editorial FAQ — real objections from foundations and nonprofit partners. */

export const HOME_FAQS = [
  {
    q: "Our grantees already juggle too many portals.",
    a: "Lotus Rise is not another funder database grantees have to feed. They keep one workspace for logic models, indicators, and evidence. When you need reporting, they share a read-only export, not a second copy of their files in your system.",
  },
  {
    q: "We are not looking to replace our grants management system.",
    a: "Neither are we. Lotus Rise sits alongside Fluxx, Salesforce, or the spreadsheets you already use. We focus on evaluation artifacts, outcome evidence, and grant reports that trace back to the same source records.",
  },
  {
    q: "What does a pilot actually involve?",
    a: "Usually one program area, a mapped reporting workflow, subsidized workspaces for grantees in that portfolio, and our team staying with you through the first real grant report, not a training webinar and a goodbye.",
  },
  {
    q: "How much does this cost our grantees?",
    a: "For qualifying nonprofits in a licensed funder portfolio: $0. Each funder license includes ten subsidized nonprofit workspaces. Regional backbone pricing is scoped separately.",
  },
] as const;

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const QuestionsBand = () => (
  <section id="questions" className="he-questions" aria-labelledby="questions-heading">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
    />
    <div className="he-wrap">
      <header className="he-section-head">
        <p className="he-kicker">Common questions</p>
        <h2 id="questions-heading" className="he-title-lg">
          Straight answers before you book a call.
        </h2>
        <p className="he-body">
          These come up in almost every first conversation with foundation staff and nonprofit leaders. If yours is not
          here, write to us and we will answer directly.
        </p>
      </header>
      <div className="he-questions__list">
        {HOME_FAQS.map((item) => (
          <details key={item.q} className="he-question">
            <summary className="he-question__summary">{item.q}</summary>
            <p className="he-question__answer">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="he-questions__foot">
        <a href="mailto:contact@lotusrise.org?subject=Lotus Rise Inquiry" className="he-link-arrow">
          Ask something else
        </a>
      </p>
    </div>
  </section>
);
