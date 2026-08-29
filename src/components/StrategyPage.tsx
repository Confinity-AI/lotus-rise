import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { HiArrowRight } from "react-icons/hi2";

export function StrategyPage() {
  const { strategyPage } = siteContent;

  return (
    <div className="subpage janus-page module-page strategy-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="strategy-hero" aria-labelledby="strategy-title">
          <div className="container strategy-hero-inner">
            <div className="module-breadcrumb reveal">
              <StaticLinkButton href="/janus/">Janus</StaticLinkButton>
              <span aria-hidden="true">/</span>
              <span>Strategy</span>
            </div>
            <div className="strategy-hero-copy reveal">
              <span className="module-status">{strategyPage.status}</span>
              <h1 id="strategy-title">{strategyPage.hero.title}</h1>
              <p>{strategyPage.hero.lead}</p>
              <StaticLinkButton className="button button-primary" href="/contact/">
                Register interest <HiArrowRight aria-hidden="true" />
              </StaticLinkButton>
            </div>
            <div
              className="strategy-decision-path reveal"
              aria-label="How Janus Strategy will support decisions"
            >
              <span className="strategy-path-label">A connected decision record</span>
              {strategyPage.areas.map((area, index) => (
                <article key={area.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{area.title}</h2>
                    <p>{area.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="strategy-principle" aria-labelledby="strategy-principle-title">
          <div className="container strategy-principle-inner reveal">
            <h2 id="strategy-principle-title">
              Better decisions need more than a generated answer.
            </h2>
            <p>
              Janus Strategy is being designed to keep the evidence, alternatives and human judgment
              visible, so teams can move faster without losing how a decision was made.
            </p>
          </div>
        </section>

        <section className="closing" aria-labelledby="strategy-closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="strategy-closing-title">{strategyPage.closing.title}</h2>
              <p>{strategyPage.closing.body}</p>
            </div>
            <StaticLinkButton className="button button-primary" href="/contact/">
              Register interest <HiArrowRight aria-hidden="true" />
            </StaticLinkButton>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="janus" />
    </div>
  );
}
