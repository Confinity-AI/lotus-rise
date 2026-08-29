import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

export function JanusPage() {
  const { janus, janusPage } = siteContent;

  return (
    <div className="subpage janus-page janus-suite-page">
      <SiteHeader currentPage="janus" />
      <main id="main">
        <section className="subpage-hero janus-page-hero" aria-labelledby="janus-page-title">
          <div className="container subpage-hero-inner">
            <div className="subpage-hero-copy reveal">
              <h1 id="janus-page-title">{janusPage.hero.title}</h1>
              <p>{janusPage.hero.lead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#suite">
                  Explore the suite <HiArrowRight aria-hidden="true" />
                </a>
                <StaticLinkButton className="text-link" href="/contact/">
                  Register interest <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
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
                  <StaticLinkButton className="suite-module-link" href={module.href}>
                    {module.action} <HiArrowRight aria-hidden="true" />
                  </StaticLinkButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="janus-shared-record" aria-labelledby="shared-record-title">
          <div className="container janus-shared-record-inner">
            <div className="janus-shared-record-copy reveal">
              <h2 id="shared-record-title">The work should carry forward.</h2>
              <p>
                A strategic decision shapes what gets evaluated. Evaluation produces evidence.
                Reporting shares what was learned. Janus is designed to keep that context connected.
              </p>
            </div>
            <div className="suite-connection reveal" aria-label="Connected Janus product suite">
              {janus.modules.map((module, index) => (
                <div key={module.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{module.title}</strong>
                  <small>{index === 0 ? "Available now" : "Coming soon"}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section janus-suite-ai" aria-labelledby="janus-ai-title">
          <div className="container janus-suite-ai-inner">
            <div className="janus-suite-ai-copy reveal">
              <h2 id="janus-ai-title">AI prepares the work. People make the call.</h2>
              <p>
                Janus helps organize material, surface gaps and prepare a useful first pass. The
                team checks the evidence, changes the work and decides what is ready.
              </p>
              <p className="janus-suite-control">
                <HiOutlineCheckCircle aria-hidden="true" /> Human review remains part of the
                product.
              </p>
            </div>
            <figure className="janus-suite-proof reveal">
              <figcaption>Real Janus view · Evaluation lineage</figcaption>
              <Image
                src={sitePath("/lotus-rise/product/janus-evaluation-lineage-v2.webp")}
                alt="Janus Evaluation lineage showing how evidence connects to findings"
                width={1540}
                height={707}
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
