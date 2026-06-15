import Link from "next/link";

const DEMO = "mailto:contact@lotusrise.org?subject=Lotus Rise Demo Inquiry";

/** One global footer used on every route (nav + legal). Mounted in the (main) layout. */
export const SiteFooter = () => (
  <footer className="lr-footer">
    <div className="lr-container lr-footer-grid">
      <div className="lr-footer-brand">
        <span className="lr-footer-word">Lotus Rise</span>
        <p className="lr-footer-mission">
          Grant reporting and evaluation software for foundations and nonprofits, built as a Public Benefit
          Corporation.
        </p>
        <a href={DEMO} className="lr-btn lr-btn--primary lr-btn--sm">
          Schedule a demo
        </a>
      </div>

      <nav className="lr-footer-col" aria-label="Janus platform">
        <p className="lr-footer-head">Janus platform</p>
        <Link href="/products/eval-path">Evaluation</Link>
        <Link href="/products/grant-tracker">Grant Management</Link>
        <Link href="/products/strat-path">Strategy</Link>
        <Link href="/products/guide-path">Guidance</Link>
      </nav>

      <nav className="lr-footer-col" aria-label="Who we serve">
        <p className="lr-footer-head">Who we serve</p>
        <Link href="/sectors/nonprofit">Nonprofits &amp; grantees</Link>
        <Link href="/sectors/funder">Foundations &amp; funders</Link>
        <Link href="/sectors/capacity">Capacity builders</Link>
      </nav>

      <nav className="lr-footer-col" aria-label="Company">
        <p className="lr-footer-head">Company</p>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <a href="mailto:contact@lotusrise.org">Contact</a>
      </nav>
    </div>

    <div className="lr-container lr-footer-legal">
      <span>&copy; {new Date().getFullYear()} Lotus Rise, PBC. All rights reserved.</span>
      <span>contact@lotusrise.org</span>
    </div>
  </footer>
);
