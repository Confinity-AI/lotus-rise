export interface PricingExtra {
  id: string;
  label: string;
  price: number;
}

export interface PricingBundle {
  title: string;
  subtitle: string;
  basePrice: number;
  features: string[];
  extras?: PricingExtra[];
  emailSubject: string;
  featured?: boolean;
}

export interface PricingProps {
  bundles: PricingBundle[];
}

export const plans: PricingBundle[] = [
  {
    title: "Product foundation",
    subtitle: "For indie founders: get your product up and running fast.",
    basePrice: 3000,
    features: ["Landing page", "Authentication", "Product dashboard"],
    extras: [
      {
        id: "brand-strategy",
        label: "Brand strategy",
        price: 2000,
      },
    ],
    emailSubject: "Product foundation inquiry",
  },
  {
    title: "Complete ecosystem",
    subtitle: "For startup founders: build a complete, launch-ready product and brand presence.",
    basePrice: 5000,
    featured: true,
    features: [
      "Landing page",
      "Authentication",
      "Product dashboard",
      "Documentation site",
      "Personal site",
      "Brand store",
    ],
    extras: [
      {
        id: "brand-strategy",
        label: "Brand strategy",
        price: 2000,
      },
      {
        id: "community-platform",
        label: "Community platform",
        price: 3000,
      },
    ],
    emailSubject: "Complete ecosystem inquiry",
  },
];
