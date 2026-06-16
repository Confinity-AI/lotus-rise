const isGithubPages = process.env.GITHUB_PAGES === "1" || process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/lotus-rise";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(isGithubPages
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        trailingSlash: true,
        env: {
          NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
        },
      }
    : {}),
  images: {
    unoptimized: true,
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
