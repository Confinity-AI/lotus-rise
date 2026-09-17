import { MotionReady } from "@/components/MotionReady";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight, HiBars3 } from "react-icons/hi2";

export type SitePage = "home" | "janus" | "team" | "contact";

type SiteChromeProps = {
  currentPage?: SitePage;
};

function PageLinks({ currentPage }: { currentPage: SitePage }) {
  return (
    <>
      {siteContent.navigation.map((item) => (
        <a
          key={item.href}
          href={sitePath(item.href)}
          aria-current={item.page === currentPage ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

export function SiteHeader({ currentPage = "home" }: SiteChromeProps) {
  const contact = currentPage === "contact";

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href={sitePath("/")} aria-label="Lotus Rise home">
            <Image
              src={sitePath("/lotus-rise/brand/lotus-rise-logo.svg")}
              alt="Lotus Rise"
              width={240}
              height={48}
              loading="eager"
            />
          </a>
          <nav className="nav-links nav-links-desktop" aria-label="Primary navigation">
            <PageLinks currentPage={currentPage} />
            {/* The contact page is the end of the path: no competing or backward action in its header. */}
            {!contact && (
              <StaticLinkButton className="button button-primary" href="/contact/">
                {siteContent.actions.contactUs}
                <HiArrowRight aria-hidden="true" />
              </StaticLinkButton>
            )}
          </nav>
          <details className="mobile-nav">
            <summary className="mobile-nav-trigger">
              <HiBars3 aria-hidden="true" />
              <span className="mobile-nav-label mobile-nav-label-open">Open navigation</span>
              <span className="mobile-nav-label mobile-nav-label-close">Close navigation</span>
            </summary>
            <nav className="mobile-nav-panel" aria-label="Mobile navigation">
              <PageLinks currentPage={currentPage} />
              {!contact && <a href={sitePath("/contact/")}>{siteContent.actions.contactUs}</a>}
            </nav>
          </details>
        </div>
      </header>
      <MotionReady />
    </>
  );
}

export function SiteFooter({ currentPage = "home" }: SiteChromeProps) {
  const footerLinks = [
    { label: "Home", href: "/", page: "home" },
    ...siteContent.navigation,
    { label: "Contact", href: "/contact/", page: "contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Image
            src={sitePath("/lotus-rise/brand/lotus-rise-logo.svg")}
            alt="Lotus Rise"
            width={240}
            height={48}
          />
          <span>{siteContent.brand.descriptor}</span>
        </div>
        <div className="footer-meta">
          <span>&copy; 2026 Lotus Rise</span>
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <a
                key={item.href}
                href={sitePath(item.href)}
                aria-current={item.page === currentPage ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
