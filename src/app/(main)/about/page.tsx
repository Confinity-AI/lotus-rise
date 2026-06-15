import { Meta } from "@once-ui-system/core";
import { AboutPage } from "@/components/about/AboutPage";
import { baseURL } from "@/resources/seo";

export async function generateMetadata() {
  return Meta.generate({
    title: "About | Lotus Rise",
    description:
      "Lotus Rise is a Public Benefit Corporation building grant reporting and evaluation tools for foundations and nonprofits — mission bound in our charter.",
    baseURL,
    path: "/about",
    image: "/opengraph-image",
    robots: "noindex, nofollow",
  });
}

export default function About() {
  return <AboutPage />;
}
