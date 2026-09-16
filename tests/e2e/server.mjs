// Builds the static export twice (mock endpoint / endpoint unset) and serves both
// artefacts so every spec runs against real `next build` output.
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const root = process.cwd();
const require = createRequire(import.meta.url);
const serveBin = require.resolve("serve/build/main.js");

export const PRIMARY_PORT = 3010;
export const UNSET_PORT = 3011;
export const MOCK_ENDPOINT = `http://localhost:${PRIMARY_PORT}/__contact`;
const unsetDir = path.join(root, ".e2e", "out-unset");

function build(contactEndpoint) {
  const result = spawnSync("npm", ["run", "build:pages"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NEXT_PUBLIC_CONTACT_ENDPOINT: contactEndpoint },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (process.env.E2E_SKIP_BUILD !== "1") {
  build("");
  rmSync(unsetDir, { recursive: true, force: true });
  mkdirSync(path.dirname(unsetDir), { recursive: true });
  cpSync(path.join(root, "out"), unsetDir, { recursive: true });
  build(MOCK_ENDPOINT);
} else if (!existsSync(unsetDir)) {
  console.error("E2E_SKIP_BUILD=1 but .e2e/out-unset is missing; run without the flag first.");
  process.exit(1);
}

const servers = [
  spawn(process.execPath, [serveBin, "out", "-l", String(PRIMARY_PORT), "-n"], {
    stdio: "inherit",
  }),
  spawn(process.execPath, [serveBin, unsetDir, "-l", String(UNSET_PORT), "-n"], {
    stdio: "inherit",
  }),
];

const shutdown = () => {
  for (const server of servers) server.kill();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
