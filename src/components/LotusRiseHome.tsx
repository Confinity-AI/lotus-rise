import { JanusTheatre } from "@/components/JanusTheatre";
import { LotusBloom } from "@/components/LotusBloom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { ValuesGrowth } from "@/components/ValuesGrowth";
import { siteContent } from "@/content/site-content";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";

export function LotusRiseHome() {
  const { hero, janus, proof, closing } = siteContent;

  return (
    <div className="direction-connected">
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-opening has-growth">
              <div className="hero-copy reveal">
                <h1 id="hero-title">{hero.title}</h1>
                <p className="hero-lead">{hero.lead}</p>
                <div className="hero-actions">
                  <StaticLinkButton className="button button-primary" href="/janus/">
                    Explore Janus <HiArrowRight aria-hidden="true" />
                  </StaticLinkButton>
                </div>
              </div>
              <LotusBloom />
            </div>
          </div>
        </section>

        <section className="dark-section suite-intro" id="janus" aria-labelledby="janus-title">
          <div className="container">
            <div className="suite-heading reveal">
              <h2 id="janus-title">{janus.title}</h2>
              <p>{janus.body}</p>
            </div>
            <JanusTheatre />
            <div className="suite-modules suite-modules-compact reveal">
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

        <section className="proof-band proof-band-portrait" aria-label="Published customer proof">
          <div className="container proof-inner proof-inner-portrait reveal">
            <Image
              className="proof-portrait"
              src={proof.image}
              alt={proof.name}
              width={440}
              height={464}
              sizes="(max-width: 640px) 112px, 180px"
            />
            <blockquote className="proof-quote">&ldquo;{proof.quote}&rdquo;</blockquote>
            <div className="proof-source">
              <strong>{proof.name}</strong>
              <br />
              {proof.title}
              <br />
              {proof.organization}
            </div>
          </div>
        </section>

        <ValuesGrowth />

        <section className="closing" aria-labelledby="closing-title">
          <div className="container closing-inner reveal">
            <div>
              <h2 id="closing-title">{closing.title}</h2>
              <p>{closing.body}</p>
            </div>
            <div className="closing-actions">
              <StaticLinkButton className="button button-primary" href="/janus/">
                Explore Janus <HiArrowRight aria-hidden="true" />
              </StaticLinkButton>
              <StaticLinkButton className="button button-secondary" href="/contact/">
                Contact us
              </StaticLinkButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="home" />
    </div>
  );
}
