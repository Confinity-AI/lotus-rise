import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

const [programPath, , reviewedReport] = siteContent.janus.views;

export function JanusPage() {
  const { janus, janusPage, actions } = siteContent;

  return (
    <div className="subpage janus-page janus-suite-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="subpage-hero janus-page-hero" aria-labelledby="janus-page-title">
          <div className="container subpage-hero-inner">
            <div className="subpage-hero-copy reveal">
              <p className="module-status">{janusPage.status}</p>
              <h1 id="janus-page-title">{janusPage.hero.title}</h1>
              <p>{janusPage.hero.lead}</p>
              <div className="hero-actions">
                <StaticLinkButton
                  className="button button-primary"
                  href={janus.modules[0].href}
                  data-cta={actions.exploreEvaluation}
                >
                  {actions.exploreEvaluation} <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
              </div>
            </div>
            <figure className="janus-hero-product reveal">
              <figcaption>
                <span>
                  <i /> Real Janus view
                </span>
                <strong>{janusPage.hero.caption}</strong>
              </figcaption>
              <Image
                src={programPath.image}
                alt="Janus Evaluation program path showing each stage of the workflow"
                width={programPath.width}
                height={programPath.height}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 960px) calc(100vw - 32px), 1120px"
              />
            </figure>
          </div>
        </section>

        <section
          className="section section-paper janus-suite-overview"
          id="suite"
          aria-labelledby="suite-title"
        >
          <div className="container">
            <div className="suite-heading suite-heading-light reveal">
              <h2 id="suite-title">{janusPage.suite.title}</h2>
              <p>{janusPage.suite.body}</p>
            </div>
            <div className="suite-modules suite-modules-light reveal">
              {janus.modules.map((module, index) => (
                <article className="suite-module" key={module.title}>
                  <div className="suite-module-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{module.status}</small>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.copy}</p>
                  <StaticLinkButton
                    className="suite-module-link"
                    variant="tertiary"
                    href={module.href}
                    data-cta={module.action}
                  >
                    {module.action} <HiArrowRight aria-hidden="true" />
                  </StaticLinkButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section janus-suite-ai" aria-labelledby="janus-ai-title">
          <div className="container janus-suite-ai-inner">
            <div className="janus-suite-ai-copy reveal">
              <h2 id="janus-ai-title">{janusPage.ai.title}</h2>
              <p>{janusPage.ai.body}</p>
              <p className="janus-suite-control">
                <HiOutlineCheckCircle aria-hidden="true" /> {janusPage.ai.control}
              </p>
            </div>
            <figure className="janus-suite-proof reveal">
              <figcaption>Real Janus view · {janusPage.ai.caption}</figcaption>
              <Image
                src={reviewedReport.image}
                alt={reviewedReport.alt}
                width={reviewedReport.width}
                height={reviewedReport.height}
                sizes="(max-width: 960px) calc(100vw - 32px), 620px"
              />
            </figure>
          </div>
        </section>

        <section className="closing" aria-labelledby="janus-closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="janus-closing-title">{janusPage.closing.title}</h2>
              <p>{janusPage.closing.body}</p>
            </div>
            <StaticLinkButton
              className="button button-primary"
              href="/contact/"
              data-cta={actions.requestPreview}
            >
              {actions.requestPreview} <HiArrowRight aria-hidden="true" />
            </StaticLinkButton>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="janus" />
    </div>
  );
}
