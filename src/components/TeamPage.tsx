import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
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
            </div>
            <div className="team-role-index reveal" aria-label="Team disciplines">
              {team.members.map((member, index) => (
                <span key={member.name}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {member.role}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-paper team-roster" aria-label="Lotus Rise team">
          <div className="container team-grid reveal">
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
                <h2>{member.name}</h2>
                <p>{member.role}</p>
              </article>
            ))}
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
              <StaticLinkButton className="button button-product" href="/contact/">
                Start a conversation <HiArrowRight aria-hidden="true" />
              </StaticLinkButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPage="team" />
    </div>
  );
}
