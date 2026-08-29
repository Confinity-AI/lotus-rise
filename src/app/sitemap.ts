import { sitePath } from "@/lib/site-path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseURL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.lotusrise.org").replace(
  /\/$/,
  "",
);

function absoluteSiteURL(path: string) {
  return new URL(sitePath(path), `${baseURL}/`).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteSiteURL("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteSiteURL("/janus/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteSiteURL("/janus/evaluation/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteSiteURL("/janus/strategy/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteSiteURL("/team/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteSiteURL("/contact/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
