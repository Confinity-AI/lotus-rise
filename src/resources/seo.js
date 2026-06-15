// IMPORTANT: Localhost only setup to prevent production leakage
const baseURL = "http://localhost:3010";

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Lotus Rise | Grant reporting for foundations and nonprofits",
    description: "Manage grant output and artifacts, measure results, and make decisions based on real data, so you can focus on changing lives. Nonprofit teams keep their workspace. 10 free nonprofit seats per funder license.",
    image: "/opengraph-image",
    canonical: "http://localhost:3010",
    robots: "noindex, nofollow",
    alternates: [{ href: "http://localhost:3010", hrefLang: "en" }],
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "",
  type: "Organization",
  name: "Lotus Rise PBC",
  description: meta.home.description,
  email: "contact@lotusrise.org",
};

export { meta, schema, baseURL };
