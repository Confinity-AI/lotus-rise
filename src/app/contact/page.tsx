import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request access to the Janus private preview or start a conversation with Lotus Rise.",
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
            <p className="eyebrow">{contact.eyebrow}</p>
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
