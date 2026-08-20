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
                priority
                sizes="(max-width: 960px) calc(100vw - 32px), 1120px"
              />
            </figure>
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

        <section className="section section-paper janus-lineage" aria-labelledby="lineage-title">
          <div className="container janus-lineage-layout">
            <div className="janus-lineage-copy reveal">
              <p className="eyebrow">{janusPage.lineage.eyebrow}</p>
              <h2 className="section-title" id="lineage-title">
                {janusPage.lineage.title}
              </h2>
              <p className="section-intro">{janusPage.lineage.body}</p>
              <div className="lineage-points">
                {janusPage.lineage.points.map((point) => (
                  <article key={point.title}>
                    <HiOutlineCheckCircle aria-hidden="true" />
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
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
