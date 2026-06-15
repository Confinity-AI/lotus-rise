import { baseURL, meta } from "@/resources/seo";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lotus Rise PBC",
  url: baseURL,
  email: "contact@lotusrise.org",
  description: meta.home.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wilmington",
    addressRegion: "DE",
    addressCountry: "US",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lotus Rise",
  url: baseURL,
  description: meta.home.description,
  publisher: {
    "@type": "Organization",
    name: "Lotus Rise PBC",
  },
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lotus Rise",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: meta.home.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free nonprofit workspaces for qualifying grantees when their funder licenses Lotus Rise",
  },
  provider: {
    "@type": "Organization",
    name: "Lotus Rise PBC",
  },
};

export const HomeStructuredData = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
  </>
);
