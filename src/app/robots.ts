import { sitePath } from "@/lib/site-path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseURL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.lotusrise.org").replace(
  /\/$/,
  "",
);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL(sitePath("/sitemap.xml"), `${baseURL}/`).toString(),
  };
}
