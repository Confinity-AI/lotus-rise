import { JanusTheatre } from "@/components/JanusTheatre";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

export function JanusPage() {
  const { janusPage } = siteContent;

  return (
    <div className="subpage janus-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="subpage-hero janus-page-hero" aria-labelledby="janus-page-title">
          <div className="container subpage-hero-inner">
            <div className="subpage-hero-copy reveal">
              <p className="eyebrow">{janusPage.hero.eyebrow}</p>
              <h1 id="janus-page-title">{janusPage.hero.title}</h1>
              <p>{janusPage.hero.lead}</p>
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
                alt="Janus evaluation program path showing each stage of the workflow"
                width={1905}
                height={848}
                preload
                loading="eager"
                sizes="(max-width: 960px) calc(100vw - 32px), 1120px"
              />
            </figure>
          </div>
        </section>

        <section className="janus-problem" aria-labelledby="janus-problem-title">
          <div className="container janus-problem-layout">
            <div className="janus-problem-copy reveal">
              <p className="eyebrow">{janusPage.problem.eyebrow}</p>
              <h2 id="janus-problem-title">{janusPage.problem.title}</h2>
              <p>{janusPage.problem.body}</p>
            </div>
            <div
              className="janus-problem-visual reveal"
              aria-label="From separate files to one connected record"
            >
              <div className="janus-record-pieces" aria-label="Separate evaluation files">
                {janusPage.problem.pieces.map((piece, index) => (
                  <div key={piece}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{piece}</strong>
                  </div>
                ))}
              </div>
              <span className="janus-record-connector" aria-hidden="true">
                <HiArrowRight />
              </span>
              <div className="janus-connected-record">
                <div className="janus-connected-record-head">
                  <span>Janus</span>
                  <small>One record</small>
                </div>
                <strong>{janusPage.problem.bridge}</strong>
                <div className="janus-connected-chain" aria-hidden="true">
                  {["Plan", "Evidence", "Finding", "Reviewed report"].map((step, index) => (
                    <div key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <b>{step}</b>
                    </div>
                  ))}
                </div>
                <p>Source trail visible at every step.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="janus-path-band" aria-labelledby="janus-path-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{janusPage.path.eyebrow}</p>
                <h2 className="section-title" id="janus-path-title">
                  {janusPage.path.title}
                </h2>
              </div>
              <p className="section-intro">{janusPage.path.body}</p>
            </div>
            <div className="janus-path reveal" aria-label="Janus evaluation path">
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
              <div>
                <p className="eyebrow">{janusPage.gallery.eyebrow}</p>
                <h2 className="section-title" id="gallery-title">
                  {janusPage.gallery.title}
                </h2>
              </div>
              <p className="section-intro">{janusPage.gallery.body}</p>
            </div>
            <JanusTheatre />
          </div>
        </section>

        <section className="section janus-human-review" aria-labelledby="human-review-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{janusPage.humanReview.eyebrow}</p>
                <h2 className="section-title" id="human-review-title">
                  {janusPage.humanReview.title}
                </h2>
              </div>
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
              <HiOutlineCheckCircle aria-hidden="true" />
              People decide what is ready to share.
            </p>
          </div>
        </section>

        <section className="section section-paper janus-lineage" aria-labelledby="lineage-title">
          <div className="container janus-lineage-layout">
            <div className="janus-lineage-copy reveal">
              <p className="eyebrow">{janusPage.lineage.eyebrow}</p>
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
                alt="Janus evaluation lineage showing how questions, measures, evidence and findings connect"
                width={1540}
                height={707}
                sizes="(max-width: 960px) calc(100vw - 32px), 620px"
              />
            </figure>
          </div>
        </section>

        <section className="section section-mist janus-modules" aria-labelledby="modules-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{janusPage.modules.eyebrow}</p>
                <h2 className="section-title" id="modules-title">
                  {janusPage.modules.title}
                </h2>
              </div>
              <p className="section-intro">{janusPage.modules.body}</p>
            </div>
            <div className="module-order reveal">
              {janusPage.modules.items.map((item, index) => (
                <article key={item.title}>
                  <div className="module-order-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{item.label}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="janus-closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="janus-closing-title">{janusPage.closing.title}</h2>
              <p>{janusPage.closing.body}</p>
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
