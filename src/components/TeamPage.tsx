import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";

export function TeamPage() {
  const { team } = siteContent;

  return (
    <div className="subpage team-page">
      <SiteHeader currentPage="team" />
      <main id="main">
        <section className="subpage-hero team-page-hero" aria-labelledby="team-title">
          <div className="container team-hero-inner">
            <div className="subpage-hero-copy reveal">
              <p className="eyebrow">{team.hero.eyebrow}</p>
              <h1 id="team-title">{team.hero.title}</h1>
              <p>{team.hero.lead}</p>
              <div className="hero-actions">
                <StaticLinkButton className="button button-primary" href="/janus/">
                  Explore Janus <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
                <a className="text-link" href="#story">
                  Why we started <HiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className="team-hero-visual reveal">
              <div className="team-hero-portrait">
                <Image
                  src={team.members[0].image}
                  alt={team.members[0].alt}
                  width={1000}
                  height={1000}
                  preload
                  loading="eager"
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 960px) 500px, 450px"
                />
              </div>
              <figcaption>
                <strong>Neeraj Vir</strong>
                <span>Founder &amp; CEO</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="team-origin" id="story" aria-labelledby="team-origin-title">
          <div className="container team-origin-inner reveal">
            <div className="team-origin-heading">
              <p className="eyebrow">{team.origin.eyebrow}</p>
              <h2 id="team-origin-title">{team.origin.title}</h2>
              <figure className="team-origin-quote">
                <blockquote>{team.hero.quote}</blockquote>
                <figcaption>{team.hero.quoteBy}</figcaption>
              </figure>
            </div>
            <div className="team-origin-story">
              {team.origin.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <a className="team-origin-product" href={sitePath("/janus/")}>
                <div className="team-origin-product-media">
                  <span>Real Janus view</span>
                  <Image
                    src={sitePath("/lotus-rise/product/janus-program-path.webp")}
                    alt="Janus program path showing the connected evaluation workflow"
                    width={1905}
                    height={848}
                    sizes="(max-width: 960px) calc(100vw - 48px), 520px"
                  />
                </div>
                <div className="team-origin-product-copy">
                  <span>
                    <small>{team.origin.product.eyebrow}</small>
                    <strong>{team.origin.product.title}</strong>
                  </span>
                  <HiArrowRight aria-hidden="true" />
                  <p>{team.origin.product.body}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="team-values" aria-labelledby="team-values-title">
          <div className="container team-values-inner">
            <div className="team-values-copy reveal">
              <p className="eyebrow">{team.values.eyebrow}</p>
              <h2 id="team-values-title">{team.values.title}</h2>
              <p>{team.values.body}</p>
              <small>{team.values.note}</small>
            </div>
            <div className="team-values-list reveal">
              {team.values.items.map((value, index) => (
                <article key={value.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-paper team-roster" aria-labelledby="team-roster-title">
          <div className="container">
            <div className="team-roster-head reveal">
              <div>
                <p className="eyebrow">{team.roster.eyebrow}</p>
                <h2 id="team-roster-title">{team.roster.title}</h2>
              </div>
              <p>{team.roster.body}</p>
            </div>
            <div className="team-grid reveal">
              {team.members.map((member, index) => (
                <article className="team-member" key={member.name}>
                  <div className="team-portrait">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.alt}
                        width={1000}
                        height={1000}
                        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 960px) 45vw, 280px"
                      />
                    ) : (
                      <span role="img" aria-label={member.name}>
                        {member.initials}
                      </span>
                    )}
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="team-statement" aria-labelledby="team-statement-title">
          <div className="container team-statement-inner reveal">
            <div>
              <p className="eyebrow">{team.statement.eyebrow}</p>
              <h2 id="team-statement-title">{team.statement.title}</h2>
            </div>
            <div>
              <p>{team.statement.body}</p>
              <div className="team-statement-actions">
                <StaticLinkButton className="button button-product" href="/janus/">
                  Explore Janus <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
                <StaticLinkButton className="button button-ghost-light" href="/contact/">
                  Contact us
                </StaticLinkButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="team" />
    </div>
  );
}
