import Link from "next/link";
import { SectionShell } from "../SectionShell";
import { PRINCIPLES } from "../copy";

export const TestimonialSection = () => (
  <SectionShell tone="cream" wide className="lr-proof-shift" id="proof">
    <div className="lr-section-head lr-section-head--center lr-proof-shift-header">
      <p className="lr-eyebrow">From the field</p>
      <h2 className="lr-h2">Real teams, real grant cycles.</h2>
      <p className="lr-body lr-lead">
        We stay with partners through live reporting — not slide decks. Here is what that looks like in practice.
      </p>
    </div>
    <div className="lr-proof-editorial">
      <blockquote className="lr-jtf-quote">
        <p>
          &ldquo;Partnering with Lotus Rise has helped us to streamline our team&rsquo;s evaluative workflows and to
          pilot new technologies in ways that consistently help us to better understand the impact of our funding and to
          learn how to improve our grantmaking.&rdquo;
        </p>
        <footer>
          <cite>Steve Fitzmier</cite>
          <span>Director of Planning &amp; Evaluation, John Templeton Foundation</span>
        </footer>
      </blockquote>
      <aside className="lr-founder-excerpt">
        <p className="lr-eyebrow">A note from our founder</p>
        <p className="lr-founder-pull">
          &ldquo;We are not here to replace human judgement with artificial intelligence. We are here to free your team
          from administrative chaos, so they can focus on the irreplaceable work of changing lives.&rdquo;
        </p>
        <p className="lr-founder-name">
          <strong>Neeraj Vir</strong>
          <span>Co-Founder &amp; CEO, Lotus Rise</span>
        </p>
        <Link href="/about#founders-letter" className="lr-link-arrow">
          Read the founder&rsquo;s letter
        </Link>
      </aside>
    </div>
    <div className="lr-values-strip">
      <p className="lr-eyebrow lr-values-strip-kicker">What we hold to</p>
      <div className="lr-values-grid">
        {PRINCIPLES.map((principle) => (
          <div key={principle.title} className="lr-value">
            <h3 className="lr-value-title">{principle.title}</h3>
            <p className="lr-value-body">{principle.body}</p>
          </div>
        ))}
      </div>
    </div>
  </SectionShell>
);
