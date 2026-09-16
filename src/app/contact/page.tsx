import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { siteContent } from "@/content/site-content";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk with Lotus Rise about software for foundations, nonprofits and the wider social sector.",
  path: "/contact/",
});

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
              <strong>{contact.nextTitle}</strong>
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
