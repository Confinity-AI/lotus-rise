import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk with Lotus Rise about software for foundations, nonprofits and the wider social sector.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SiteHeader currentPage="contact" />
      <main className="contact-main" id="main">
        <div className="container contact-layout">
          <ContactForm />
        </div>
      </main>
      <SiteFooter currentPage="contact" />
    </div>
  );
}
