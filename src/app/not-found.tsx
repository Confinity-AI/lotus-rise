import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <div className="contact-page">
      <SiteHeader contact />
      <main className="contact-main" id="main">
        <div className="container not-found">
          <p className="eyebrow">Page not found</p>
          <h1>This page is not here.</h1>
          <p>Return to Lotus Rise and continue from the homepage.</p>
          <Button className="button button-primary" href="/">
            Go to homepage
          </Button>
        </div>
      </main>
      <SiteFooter contact />
    </div>
  );
}
