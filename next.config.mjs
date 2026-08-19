const isGithubPages =
  process.env.GITHUB_PAGES === "1" || process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/lotus-rise";
const basePath = isGithubPages ? githubPagesBasePath : "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"]
  }
};

export default nextConfig;
