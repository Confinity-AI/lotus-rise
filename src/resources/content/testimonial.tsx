import fs from "fs";
import path from "path";
import { CustomMDX } from "@/components/mdx";

export interface TestimonialProps {
  logo: {
    icon: string;
    wordmark: string;
  };
  quote: {
    text: string;
    author: {
      name: string;
      avatar: string;
    };
    link: {
      href: string;
      label: string;
    };
  };
  heading: string;
  modal: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
}

export function getTestimonial(): TestimonialProps {
  const contentPath = path.join(process.cwd(), "src/resources/content/case-study.mdx");
  const source = fs.readFileSync(contentPath, "utf8");

  return {
    logo: {
      icon: "/trademarks/client-icon-dark.svg",
      wordmark: "/trademarks/client-wordmark-dark.svg",
    },
    quote: {
      text: '"Their attention to detail and technical expertise is unmatched."',
      author: {
        name: "Selene Yu",
        avatar: "/images/client-1.jpg",
      },
      link: {
        href: "https://once-ui.com",
        label: "Voyage",
      },
    },
    heading:
      "Read how we helped Voyage launch their new landing page and product ecosystem in just 4 weeks.",
    modal: {
      title: "Voyage: New frontier for hosting",
      content: <CustomMDX source={source} />,
    },
  };
}
