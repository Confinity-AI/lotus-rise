import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    GITHUB_PAGES: "0",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.lotusrise.org"
  }
});

process.exit(result.status ?? 1);
