import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import "@/resources/lotus-rise.css";

import { Providers } from "@/components/Providers";
import { sitePath } from "@/lib/site-path";
import { dataStyle, fonts, style } from "@/resources/once-ui.config";
import classNames from "classnames";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lotusrise.org";
const socialImage = sitePath("/lotus-rise/brand/og-home.png");
const canonicalURL = new URL(sitePath("/"), baseURL).toString();
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "@id": `${canonicalURL}#organization`,
  name: "Lotus Rise",
  url: canonicalURL,
  logo: new URL(sitePath("/lotus-rise/brand/lotus-rise-logo.svg"), baseURL).toString(),
  description: "A public benefit corporation building practical AI tools for the social sector.",
  founder: {
    "@type": "Person",
    name: "Neeraj Vir",
    jobTitle: "Founder & CEO",
  },
};
const organizationSchemaJSON = JSON.stringify(organizationSchema).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "Lotus Rise | Amplify your impact with the right technology",
    template: "%s | Lotus Rise",
  },
  description:
    "Lotus Rise builds practical AI tools for strategy, grantmaking, evaluation and reporting. Explore Janus, now in private preview.",
  alternates: { canonical: sitePath("/") },
  openGraph: {
    type: "website",
    url: sitePath("/"),
    siteName: "Lotus Rise",
    title: "Lotus Rise | Amplify your impact with the right technology",
    description:
      "Practical AI tools for strategy, grantmaking, evaluation and reporting. Janus is now in private preview.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Lotus Rise, a public benefit corporation building practical AI tools for the social sector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Rise | Amplify your impact with the right technology",
    description:
      "Practical AI tools for strategy, grantmaking, evaluation and reporting. Janus is in private preview.",
    images: [socialImage],
  },
  icons: {
    icon: [{ url: sitePath("/lotus-rise/brand/lotus-rise-favicon.png"), type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10382f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={style.theme}
      data-brand={style.brand}
      data-accent={style.accent}
      data-neutral={style.neutral}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      data-scaling={style.scaling}
      data-viz-style={dataStyle.variant}
      data-js="false"
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <Script id="lotus-motion-ready" strategy="beforeInteractive">
          {'document.documentElement.dataset.js="true";'}
        </Script>
        <script type="application/ld+json">{organizationSchemaJSON}</script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
