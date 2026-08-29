import { LotusBloom } from "@/components/LotusBloom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import Image from "next/image";
import {
  HiArrowRight,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function LotusRiseHome() {
  const { hero, janus, proof, ai, principles, closing } = siteContent;
  const aiIcons = [
    HiOutlineDocumentText,
    HiOutlineSparkles,
    HiOutlineMagnifyingGlass,
    HiOutlineCheckCircle,
  ];

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
                  <StaticLinkButton className="button button-secondary" href="/contact/">
                    Contact us
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
            <div className="suite-modules reveal">
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

        <section className="section ai-system-section" aria-labelledby="behavior-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <h2 className="section-title" id="behavior-title">
                  {ai.title}
                </h2>
              </div>
              <p className="section-intro">{ai.body}</p>
            </div>
            <div className="ai-flow reveal" data-ai-flow>
              <span className="ai-flow-rail" aria-hidden="true">
                <i />
              </span>
              {ai.behaviors.map((behavior, index) => {
                const Icon = aiIcons[index];
                return (
                  <article
                    className={`ai-flow-step ai-flow-step-${index + 1}`}
                    key={behavior.title}
                  >
                    <span className="ai-flow-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="ai-flow-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{behavior.title}</h3>
                    <p>{behavior.copy}</p>
                  </article>
                );
              })}
            </div>
            <div className="ai-review-note reveal">
              <HiOutlineCheckCircle aria-hidden="true" />
              <strong>People stay in control.</strong>
              <span>Every finding can be checked before anything is approved.</span>
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

        <section className="benefit" id="principles" aria-labelledby="principles-title">
          <div className="container benefit-inner">
            <div className="benefit-copy reveal">
              <h2 id="principles-title">{principles.title}</h2>
              <p>{principles.body}</p>
              <div className="founder-quote">
                <blockquote>
                  <p>&ldquo;{principles.founderQuote}&rdquo;</p>
                  <cite>{principles.founder}</cite>
                </blockquote>
              </div>
            </div>
            <div className="principles reveal">
              {principles.items.map((principle) => (
                <article className="principle" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
