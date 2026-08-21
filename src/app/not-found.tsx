import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StaticLinkButton } from "@/components/StaticLinkButton";

export default function NotFound() {
  return (
    <div className="contact-page">
      <SiteHeader currentPage="contact" />
      <main className="contact-main" id="main">
        <div className="container not-found">
          <h1>This page is not here.</h1>
          <p>Return to Lotus Rise and continue from the homepage.</p>
          <StaticLinkButton className="button button-primary" href="/">
            Go to homepage
          </StaticLinkButton>
        </div>
      </main>
      <SiteFooter currentPage="contact" />
    </div>
  );
}
