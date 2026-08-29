import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk with Lotus Rise about Janus and AI-powered products for strategy, evaluation and reporting.",
  alternates: { canonical: sitePath("/contact/") },
};

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <div className="contact-page">
      <SiteHeader currentPage="contact" />
      <main className="contact-main" id="main">
        <div className="container contact-layout">
          <section className="contact-copy">
            <h1>{contact.title}</h1>
            <p>{contact.lead}</p>
            <div className="contact-note">
              <strong>What happens next</strong>
              <br />
              {contact.next}
            </div>
          </section>
          <section aria-label="Contact form">
            <ContactForm />
          </section>
        </div>
      </main>
      <SiteFooter currentPage="contact" />
    </div>
  );
}
