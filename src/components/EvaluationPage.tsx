import { JanusTheatre } from "@/components/JanusTheatre";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

const [programPath, lineage] = siteContent.janus.views;

export function EvaluationPage() {
  const { evaluationPage, actions } = siteContent;

  return (
    <div className="subpage janus-page module-page evaluation-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="subpage-hero janus-page-hero" aria-labelledby="evaluation-title">
          <div className="container subpage-hero-inner">
            <div className="subpage-hero-copy reveal">
              <p className="module-status">
                {evaluationPage.product} · {evaluationPage.status}
              </p>
              <h1 id="evaluation-title">{evaluationPage.hero.title}</h1>
              <p>{evaluationPage.hero.lead}</p>
              <div className="hero-actions">
                <StaticLinkButton
                  className="button button-primary"
                  href="/contact/"
                  data-cta={actions.requestPreview}
                >
                  {actions.requestPreview} <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
              </div>
            </div>
            <figure className="janus-hero-product reveal">
              <figcaption>
                <span>
                  <i /> Real Janus view
                </span>
                <strong>{evaluationPage.hero.caption}</strong>
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

        <section className="janus-path-band" aria-labelledby="evaluation-path-title">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title" id="evaluation-path-title">
                {evaluationPage.path.title}
              </h2>
              <p className="section-intro">{evaluationPage.path.body}</p>
            </div>
            <div className="janus-path reveal" aria-label="Janus Evaluation path">
              {evaluationPage.path.steps.map((step, index) => (
                <div className="janus-path-step" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="janus-gallery dark-section"
          id="product"
          aria-labelledby="gallery-title"
        >
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title" id="gallery-title">
                {evaluationPage.gallery.title}
              </h2>
              <p className="section-intro">{evaluationPage.gallery.body}</p>
            </div>
            <JanusTheatre />
          </div>
        </section>

        <section className="section janus-human-review" aria-labelledby="human-review-title">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title" id="human-review-title">
                {evaluationPage.review.title}
              </h2>
              <p className="section-intro">{evaluationPage.review.body}</p>
            </div>
            <div className="janus-review-layout">
              <div className="janus-review-path reveal">
                {evaluationPage.review.steps.map((step, index) => (
                  <article key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
              <figure className="janus-review-product reveal">
                <figcaption>
                  <span>Real Janus view</span>
                  <strong>{evaluationPage.review.caption}</strong>
                </figcaption>
                <Image
                  src={lineage.image}
                  alt="Janus Evaluation lineage connecting evidence, findings and review"
                  width={lineage.width}
                  height={lineage.height}
                  sizes="(max-width: 960px) calc(100vw - 48px), 680px"
                />
              </figure>
            </div>
            <p className="janus-review-note reveal">
              <HiOutlineCheckCircle aria-hidden="true" /> {evaluationPage.review.note}
            </p>
          </div>
        </section>

        <section className="closing" aria-labelledby="evaluation-closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="evaluation-closing-title">{evaluationPage.closing.title}</h2>
              <p>{evaluationPage.closing.body}</p>
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
