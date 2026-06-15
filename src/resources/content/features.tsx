import fs from "fs";
import path from "path";
import { CustomMDX } from "@/components/mdx";

export interface ShowcaseItem {
  slug: string;
  card: {
    step: string;
    heading: string;
    image: string;
    alt: string;
    extra?: boolean;
    extended?: boolean;
  };
  modal: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
}

export interface ShowcaseProps {
  items: ShowcaseItem[];
}

const products = [
  {
    id: "landing-page",
    title: "Landing Page",
    description: "Landing page: SEO-ready, conversion-optimized starting point",
    cover: "/images/landing.jpg",
  },
  {
    id: "auth",
    title: "Auth",
    description: "Authentication: complete onboarding flow with Supabase integration",
    cover: "/images/auth.jpg",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Product: dashboard, store, admin panel or consumer app frontend",
    cover: "/images/dashboard.jpg",
  },
  {
    id: "docs",
    title: "Docs",
    description: "Documentation site: simple, lean and fully customizable",
    cover: "/images/docs.jpg",
  },
  {
    id: "personal-site",
    title: "Personal Site",
    description: "Personal site: the bridge between your personal brand and product",
    cover: "/images/personal.jpg",
    extended: true,
  },
  {
    id: "brand-store",
    title: "Brand Store",
    description: "Brand store: fully managed merch store to build a strong community",
    cover: "/images/store.jpg",
    extended: true,
  },
  {
    id: "launch-strategy",
    title: "Launch Strategy",
    description: "Launch strategy: complete brand and marketing plan to launch your product",
    cover: "/images/strategy.jpg",
    extra: true,
  },
  {
    id: "community-platform",
    title: "Community Platform",
    description: "Community platform: a space for your community or team to collaborate",
    cover: "/images/community.jpg",
    extra: true,
  },
];

export async function getFeatures(): Promise<ShowcaseItem[]> {
  const contentDir = path.join(process.cwd(), "src/resources/content");

  return products.map((product, index) => {
    const mdxPath = path.join(contentDir, `${product.id}.mdx`);
    const source = fs.readFileSync(mdxPath, "utf-8");

    return {
      slug: product.id,
      card: {
        step: `Node ${index + 1}`,
        heading: product.description,
        image: product.cover,
        alt: product.title,
        extended: product.extended,
        extra: product.extra,
      },
      modal: {
        title: product.title,
        content: <CustomMDX source={source} />,
      },
    };
  });
}
