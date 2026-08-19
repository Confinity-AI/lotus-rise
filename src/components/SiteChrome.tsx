import { MotionReady } from "@/components/MotionReady";
import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";

type SiteHeaderProps = {
  contact?: boolean;
};

export function SiteHeader({ contact = false }: SiteHeaderProps) {
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
          <nav className="nav-links" aria-label="Primary navigation">
            {contact ? (
              <>
                <a href={sitePath("/#janus")}>Janus</a>
                <StaticLinkButton className="button button-secondary" href="/">
                  Back to homepage
                </StaticLinkButton>
              </>
            ) : (
              <>
                {siteContent.navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
                <StaticLinkButton className="button button-primary" href="/contact/">
                  Request a preview <HiArrowRight aria-hidden="true" />
                </StaticLinkButton>
              </>
            )}
          </nav>
        </div>
      </header>
      <MotionReady />
    </>
  );
}

export function SiteFooter({ contact = false }: SiteHeaderProps) {
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
            {!contact && <a href={sitePath("/contact/")}>Contact</a>}
            <a href={contact ? sitePath("/#principles") : "#principles"}>Principles</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
