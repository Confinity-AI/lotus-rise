// Builds the static export twice (mock endpoint / endpoint unset) into dedicated
// directories and serves both, so specs never depend on whatever state `out/` was
// left in by another command. Each directory is a byte copy of a `npm run build:pages`
// export, served by the same `serve` binary the repo already ships.
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

const mockDir = path.join(root, ".e2e", "out-mock");
const unsetDir = path.join(root, ".e2e", "out-unset");

function exportTo(target, contactEndpoint) {
  const result = spawnSync("npm", ["run", "build:pages"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NEXT_PUBLIC_CONTACT_ENDPOINT: contactEndpoint },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(path.dirname(target), { recursive: true });
  cpSync(path.join(root, "out"), target, { recursive: true });
}

if (process.env.E2E_SKIP_BUILD === "1") {
  for (const dir of [mockDir, unsetDir]) {
    if (!existsSync(dir)) {
      console.error(`E2E_SKIP_BUILD=1 but ${dir} is missing; run once without the flag.`);
      process.exit(1);
    }
  }
} else {
  exportTo(unsetDir, "");
  exportTo(mockDir, MOCK_ENDPOINT);
}

const servers = [
  [mockDir, PRIMARY_PORT],
  [unsetDir, UNSET_PORT],
].map(([dir, port]) =>
  spawn(process.execPath, [serveBin, dir, "-l", String(port), "-n"], { stdio: "inherit" }),
);

const shutdown = () => {
  for (const server of servers) server.kill();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
