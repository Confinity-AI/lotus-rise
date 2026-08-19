import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import "@/resources/lotus-rise.css";

import { Providers } from "@/components/Providers";
import { sitePath } from "@/lib/site-path";
import { dataStyle, fonts, style } from "@/resources/once-ui.config";
import classNames from "classnames";
import type { Metadata, Viewport } from "next";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lotusrise.org";
const socialImage = sitePath("/lotus-rise/brand/og-home.png");

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "Lotus Rise | Amplify your impact with the right technology",
    template: "%s | Lotus Rise",
  },
  description:
    "Lotus Rise builds AI tools for the work behind grants. Explore Janus Evaluation, now in private preview.",
  alternates: { canonical: sitePath("/") },
  openGraph: {
    type: "website",
    url: sitePath("/"),
    siteName: "Lotus Rise",
    title: "Lotus Rise | Amplify your impact with the right technology",
    description:
      "AI tools for foundations and nonprofits, with Janus Evaluation now in private preview.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Lotus Rise builds AI tools for foundations and nonprofits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Rise | Amplify your impact with the right technology",
    description: "AI tools for foundations and nonprofits, with Janus in private preview.",
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
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
