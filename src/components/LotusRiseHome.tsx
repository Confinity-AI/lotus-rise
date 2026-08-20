import { JanusTheatre } from "@/components/JanusTheatre";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import {
  HiArrowRight,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineScale,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function LotusRiseHome() {
  const { hero, janus, proof, connectedWork, ai, audiences, principles, closing } = siteContent;
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
                <div className="hero-meta">
                  <p className="eyebrow">{hero.eyebrow}</p>
                  <p className="hero-purpose">
                    <HiOutlineScale aria-hidden="true" />
                    {hero.companyType}
                  </p>
                </div>
                <h1 id="hero-title">{hero.title}</h1>
                <p className="hero-lead">{hero.lead}</p>
                <div className="hero-actions">
                  <StaticLinkButton className="button button-primary" href="/contact/">
                    Request a Janus preview <HiArrowRight aria-hidden="true" />
                  </StaticLinkButton>
                  <StaticLinkButton className="button button-secondary" href="#janus">
                    Explore Janus
                  </StaticLinkButton>
                </div>
              </div>
              <figure className="hero-growth hero-technology reveal" aria-hidden="true">
                <span className="hero-tech-grid" />
                <span className="hero-tech-scan" />
                <span className="hero-orbit hero-orbit-one" />
                <span className="hero-orbit hero-orbit-two" />
                <span className="hero-tech-label hero-tech-label-source">Evidence</span>
                <span className="hero-tech-label hero-tech-label-review">Review</span>
                <span className="hero-tech-label hero-tech-label-output">Impact</span>
                <Image
                  src={sitePath("/lotus-rise/brand/lotus-rise-growth-system.webp")}
                  alt=""
                  width={1122}
                  height={1402}
                  priority
                  sizes="(max-width: 640px) 148px, (max-width: 960px) 190px, 330px"
                />
                <span className="hero-tech-status">
                  <i /> Human reviewed
                </span>
              </figure>
            </div>
          </div>
        </section>

        <section className="dark-section" id="janus" aria-labelledby="janus-title">
          <div className="container product-promise">
            <div className="product-copy reveal">
              <p className="eyebrow">{janus.eyebrow}</p>
              <h2 id="janus-title">{janus.title}</h2>
              <p>{janus.body}</p>
              <div className="product-badges" aria-label="Product status">
                {janus.statuses.map((status, index) => (
                  <span className={`badge${index === 0 ? " badge-live" : ""}`} key={status}>
                    {status}
                  </span>
                ))}
              </div>
              <StaticLinkButton className="button button-product" href="/contact/">
                Request a Janus preview <HiArrowRight aria-hidden="true" />
              </StaticLinkButton>
            </div>
            <JanusTheatre />
          </div>
        </section>

        <section className="proof-band" aria-label="Published customer proof">
          <div className="container proof-inner reveal">
            <div className="proof-kicker">In practice</div>
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

        <section
          className="section section-paper"
          id="connected-work"
          aria-labelledby="connected-title"
        >
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{connectedWork.eyebrow}</p>
                <h2 className="section-title" id="connected-title">
                  {connectedWork.title}
                </h2>
              </div>
              <p className="section-intro">{connectedWork.body}</p>
            </div>
            <div className="product-system reveal" data-system-flow aria-hidden="true">
              <div className="product-system-meta">
                <span>Janus evaluation</span>
                <span>One connected record</span>
              </div>
              <div className="product-system-flow">
                {[
                  "Program plan",
                  "Questions + measures",
                  "Evidence + findings",
                  "Reviewed report",
                ].map((label, index) => (
                  <div className="product-system-node" key={label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
                <span className="product-system-signal" />
              </div>
              <div className="product-system-footer">
                <span>
                  <i /> Sources stay attached
                </span>
                <span>Review before reuse</span>
              </div>
            </div>
            <div className="work-path reveal">
              {connectedWork.steps.map((step, index) => (
                <article className="work-step" key={step.title}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="step-status">{step.status}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ai-system-section" aria-labelledby="behavior-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{ai.eyebrow}</p>
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
              <span>
                Every finding can be checked against its source before anything is approved.
              </span>
            </div>
          </div>
        </section>

        <section className="section section-paper" aria-labelledby="audience-title">
          <div className="container">
            <div className="audience-story reveal">
              <div className="audience-story-copy">
                <p className="eyebrow">{audiences.eyebrow}</p>
                <h2 className="section-title" id="audience-title">
                  {audiences.title}
                </h2>
                <p className="section-intro">{audiences.body}</p>
              </div>
              <figure className="audience-product">
                <figcaption>
                  <span>
                    <i /> Real Janus view
                  </span>
                  <strong>Evaluation lineage</strong>
                </figcaption>
                <Image
                  src={sitePath("/lotus-rise/product/janus-evaluation-lineage-v2.webp")}
                  alt="Janus evaluation lineage connecting inquiries, measures and findings"
                  width={1540}
                  height={707}
                  sizes="(max-width: 720px) calc(100vw - 32px), 560px"
                  style={{ width: "100%", height: "auto" }}
                />
              </figure>
            </div>
            <div className="audience-grid reveal">
              {audiences.items.map((audience) => (
                <article className="audience" key={audience.label}>
                  <span className="audience-label">{audience.label}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="benefit" id="principles" aria-labelledby="principles-title">
          <div className="container benefit-inner">
            <div className="benefit-copy reveal">
              <p className="eyebrow">{principles.eyebrow}</p>
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
            <StaticLinkButton className="button button-light" href="/contact/">
              Request a Janus preview <HiArrowRight aria-hidden="true" />
            </StaticLinkButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
