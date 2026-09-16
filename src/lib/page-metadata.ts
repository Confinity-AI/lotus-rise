import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const siteTitle = "Lotus Rise | Amplify your impact with the right technology";
export const siteDescription =
  "Lotus Rise builds software products for foundations and nonprofits. Explore Janus.";
const socialImage = sitePath("/lotus-rise/brand/og-home.png");

const socialImages = [
  {
    url: socialImage,
    width: 1200,
    height: 630,
    alt: "Lotus Rise, a public benefit corporation building software products for the social sector",
  },
];

/** Canonical, Open Graph and Twitter fields for one route; Next replaces `openGraph` per page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = sitePath(path);
  const fullTitle = title ? `${title} | Lotus Rise` : siteTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Lotus Rise",
      title: fullTitle,
      description,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
