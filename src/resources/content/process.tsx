export interface ProcessItem {
  image: string;
  alt: string;
  title: string;
  description: string;
}

export const process: ProcessItem[] = [
  {
    image: "/images/strategy-brand.svg",
    alt: "Brand identity",
    title: "A strong brand",
    description: "Our brand strategy ensures your identity resonates across every touchpoint.",
  },
  {
    image: "/images/strategy-product.svg",
    alt: "Product suite",
    title: "A complete product suite",
    description:
      "We build momentum through developing product ecosystems that scale your surface area.",
  },
  {
    image: "/images/strategy-launch.svg",
    alt: "Launch strategy",
    title: "A launch strategy",
    description: "We help you set up your channels, online presence and launch strategy.",
  },
];
