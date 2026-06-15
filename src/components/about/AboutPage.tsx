import Image from "next/image";
import { EDITORIAL_IMAGES } from "@/lib/editorialImages";

const DEMO = "mailto:contact@lotusrise.org?subject=Lotus Rise Demo Inquiry";

const LEADERSHIP = [
  {
    name: "Neeraj Vir",
    role: "Co-Founder & CEO",
    bio: "25-year Silicon Valley veteran, technology operator and strategist. Deeply passionate about scaling tech leverage for social innovation.",
  },
  {
    name: "Arnold Fidelino",
    role: "Director of Strategic Partnerships",
    bio: "22 years of operations and partnership management. Former executive director and consultant advising social venture networks.",
  },
  {
    name: "Ryan Ward",
    role: "Brand & Technical Architect",
    bio: "Architect behind the Janus protocol and standardizations. Specializes in accessible, high-performance web systems.",
  },
];

export const AboutPage = () => (
  <main className="he-home he-about">
    <section className="he-about-hero">
      <div className="he-about-hero__bg">
        <Image
          src={EDITORIAL_IMAGES.aboutHero}
          alt="Team collaborating in a warm workspace"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="he-about-hero__scrim" aria-hidden />
      </div>
      <div className="he-wrap he-about-hero__copy">
        <p className="he-kicker he-kicker--light">About Lotus Rise</p>
        <h1 className="he-title-xl he-title-lg--light">
          Technology for greater social good.
        </h1>
        <p className="he-body he-body--light he-about-hero__lead">
          Lotus Rise is a Public Benefit Corporation founded on a single conviction: those who do the hard work of
          social change deserve technology that matches their dedication.
        </p>
      </div>
    </section>

    <section className="he-section he-section--paper">
      <div className="he-wrap he-about-duo">
        <article>
          <p className="he-kicker">Our formation</p>
          <h2 className="he-title-lg he-title-lg--md">Built from what we witnessed in the field</h2>
          <p className="he-body he-body--flush">
            Lotus Rise was inspired by the struggle of foundations to integrate new technological paradigms.
            Historically, funding decisions have been swayed by emotional narratives rather than concrete data. We
            exist to introduce an evidence-based approach—enhancing the operational capabilities of both foundations
            and nonprofits.
          </p>
        </article>
        <article>
          <p className="he-kicker">The PBC mandate</p>
          <h2 className="he-title-lg he-title-lg--md">Mission locked in law—not marketing copy</h2>
          <p className="he-body he-body--flush">
            As a Public Benefit Corporation, our legal charter holds us accountable to societal mission, not just
            shareholder returns. We operate under a strict Universal Access Subsidy (10:1 ratio): for every
            institutional funder workspace deployed, we provision ten localized, free workspaces to smaller grantee
            nonprofits.
          </p>
        </article>
      </div>
    </section>

    <section id="founders-letter" className="he-section he-section--cream">
      <div className="he-wrap">
        <p className="he-kicker">Founder&apos;s letter</p>
        <h2 className="he-title-lg">A message from Neeraj Vir</h2>
        <div className="he-letter">
          <blockquote className="he-letter__pull">
            &ldquo;We are not here to replace human judgement with artificial intelligence. We are here to liberate
            your staff from administrative chaos, so they can focus on the irreplaceable work of changing lives.&rdquo;
          </blockquote>
          <div className="he-letter__body">
            <p>
              I spent the last twenty-five years in the heart of Silicon Valley, helping scale technologies that
              changed how the commercial world coordinates. Yet, whenever I stepped out of the valley to advise the
              foundations and grassroots nonprofits fighting some of our most urgent systemic challenges, I felt like I
              was stepping back in time.
            </p>
            <p>
              I saw brilliant program officers wasting half their weeks manually copying numbers into uncooperative
              databases. I saw grassroots organizers spending 30% of their operational budget trying to write static PDF
              reports that their funders barely had time to read. I saw strategic allocation decisions that could change
              thousands of lives being decided on reputational bias rather than clear, grounded evidence.
            </p>
            <p>
              We created Lotus Rise because we believe the social sector has been underserved by technology. Our mission
              is not to sell you another software subscription. Our mission is to establish a new standard of
              trust—shifting the field from un-verifiable storytelling to defensible, audit-ready impact claims.
            </p>
            <p>
              We build our tools as a Public Benefit Corporation. That means we practice subsidy pricing: a portion of
              every dollar we collect from large institutional funders directly provides free software and
              high-touch coaching for the under-resourced grassroots nonprofits in their network.
            </p>
            <p>We are proud to serve as your partner on this journey, drawn alongside you in the mission for collective betterment.</p>
          </div>
          <footer className="he-letter__sig">
            <strong>Neeraj Vir</strong>
            <span>Co-Founder &amp; CEO, Lotus Rise</span>
          </footer>
        </div>
      </div>
    </section>

    <section className="he-section he-section--paper">
      <div className="he-wrap">
        <p className="he-kicker">Leadership</p>
        <h2 className="he-title-lg">The people behind Lotus Rise</h2>
        <div className="he-leadership-grid">
          {LEADERSHIP.map((person) => (
            <article key={person.name} className="he-leader-card">
              <h3>{person.name}</h3>
              <p className="he-leader-card__role">{person.role}</p>
              <p className="he-leader-card__bio">{person.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="he-section he-section--cream he-about-close">
      <div className="he-wrap he-about-close__inner">
        <p className="he-kicker">Begin with a conversation</p>
        <h2 className="he-title-lg">We would love to welcome you.</h2>
        <p className="he-body he-body--flush">
          Whether you are exploring a pilot or ready to transform how you measure impact, our team is here to listen
          with care.
        </p>
        <div className="he-btn-row" style={{ marginTop: "24px" }}>
          <a href={DEMO} className="lr-btn lr-btn--primary">
            Begin a conversation
          </a>
        </div>
      </div>
    </section>
  </main>
);
