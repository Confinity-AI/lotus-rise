import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";

export default function NotFound() {
  return (
    <div className="contact-page">
      <SiteHeader contact />
      <main className="contact-main" id="main">
        <div className="container not-found">
          <p className="eyebrow">Page not found</p>
          <h1>This page is not here.</h1>
          <p>Return to Lotus Rise and continue from the homepage.</p>
          <StaticLinkButton className="button button-primary" href="/">
            Go to homepage
          </StaticLinkButton>
        </div>
      </main>
      <SiteFooter contact />
    </div>
  );
}
