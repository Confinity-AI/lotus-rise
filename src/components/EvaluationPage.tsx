import { JanusTheatre } from "@/components/JanusTheatre";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

export function EvaluationPage() {
  const { evaluationPage, janusPage } = siteContent;

  return (
    <div className="subpage janus-page module-page evaluation-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="subpage-hero janus-page-hero" aria-labelledby="evaluation-title">
          <div className="container subpage-hero-inner">
            <div className="module-breadcrumb reveal">
              <StaticLinkButton href="/janus/">Janus</StaticLinkButton>
              <span aria-hidden="true">/</span>
              <span>Evaluation</span>
            </div>
            <div className="subpage-hero-copy reveal">
              <span className="module-status">Private preview</span>
              <h1 id="evaluation-title">{evaluationPage.hero.title}</h1>
              <p>{evaluationPage.hero.lead}</p>
              <div className="hero-actions">
                <StaticLinkButton className="button button-primary" href="/contact/">
                  Request a preview <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
                <a className="text-link" href="#product">
                  See the product <HiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className="janus-hero-product reveal">
              <figcaption>
                <span>
                  <i /> Real Janus view
                </span>
                <strong>Evaluation program path</strong>
              </figcaption>
              <Image
                src={sitePath("/lotus-rise/product/janus-program-path.webp")}
                alt="Janus Evaluation program path showing each stage of the workflow"
                width={1905}
                height={848}
                preload
                loading="eager"
                sizes="(max-width: 960px) calc(100vw - 32px), 1120px"
              />
            </figure>
          </div>
        </section>

        <section className="janus-path-band" aria-labelledby="evaluation-path-title">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title" id="evaluation-path-title">
                {evaluationPage.problem.title}
              </h2>
              <p className="section-intro">{evaluationPage.problem.body}</p>
            </div>
            <div className="janus-path reveal" aria-label="Janus Evaluation path">
              {janusPage.path.steps.map((step, index) => (
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
                See Evaluation as it is today.
              </h2>
              <p className="section-intro">
                Every view below comes from the current private preview. No concept screens.
              </p>
            </div>
            <JanusTheatre />
          </div>
        </section>

        <section className="section janus-human-review" aria-labelledby="human-review-title">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title" id="human-review-title">
                {janusPage.humanReview.title}
              </h2>
              <p className="section-intro">{janusPage.humanReview.body}</p>
            </div>
            <div className="janus-review-layout">
              <div className="janus-review-path reveal">
                {janusPage.humanReview.steps.map((step, index) => (
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
                  <strong>Reviewed report</strong>
                </figcaption>
                <Image
                  src={sitePath("/lotus-rise/product/janus-reviewed-report.webp")}
                  alt="Real Janus reviewed report ready for human approval"
                  width={1540}
                  height={707}
                  sizes="(max-width: 960px) calc(100vw - 48px), 680px"
                />
              </figure>
            </div>
            <p className="janus-review-note reveal">
              <HiOutlineCheckCircle aria-hidden="true" /> People decide what is ready to share.
            </p>
          </div>
        </section>

        <section className="section section-paper janus-lineage" aria-labelledby="lineage-title">
          <div className="container janus-lineage-layout">
            <div className="janus-lineage-copy reveal">
              <h2 className="section-title" id="lineage-title">
                {janusPage.lineage.title}
              </h2>
              <p className="section-intro">{janusPage.lineage.body}</p>
            </div>
            <figure className="lineage-product reveal">
              <figcaption>
                <span>Source</span>
                <span>Finding</span>
                <span>Review</span>
              </figcaption>
              <Image
                src={sitePath("/lotus-rise/product/janus-evaluation-lineage-v2.webp")}
                alt="Janus Evaluation lineage connecting evidence, findings and review"
                width={1540}
                height={707}
                sizes="(max-width: 960px) calc(100vw - 32px), 620px"
              />
            </figure>
          </div>
        </section>

        <section className="closing" aria-labelledby="evaluation-closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="evaluation-closing-title">{evaluationPage.closing.title}</h2>
              <p>{evaluationPage.closing.body}</p>
            </div>
            <StaticLinkButton className="button button-primary" href="/contact/">
              Request a preview <HiArrowRight aria-hidden="true" />
            </StaticLinkButton>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="janus" />
    </div>
  );
}
