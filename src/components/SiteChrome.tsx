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
            <StaticLinkButton
              className={contact ? "button button-secondary" : "button button-primary"}
              href={contact ? "/" : "/contact/"}
            >
              {contact ? "Back to homepage" : "Request a preview"}
              {!contact && <HiArrowRight aria-hidden="true" />}
            </StaticLinkButton>
          </nav>
          <details className="mobile-nav">
            <summary className="mobile-nav-trigger" aria-label="Open navigation" title="Menu">
              <HiBars3 aria-hidden="true" />
            </summary>
            <nav className="mobile-nav-panel" aria-label="Mobile navigation">
              <PageLinks currentPage={currentPage} />
              <a href={sitePath(contact ? "/" : "/contact/")}>
                {contact ? "Back to homepage" : "Request a preview"}
              </a>
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
