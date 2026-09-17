import { defineConfig, devices } from "@playwright/test";

export const PRIMARY_URL = "http://localhost:3010";
export const UNSET_URL = "http://localhost:3011";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  retries: 0,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: PRIMARY_URL,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    // Second engine for the interactive path only (native dialog, pointer events, <output>).
    // Visual baselines and pixel-measured contrast stay Chromium-only by design.
    {
      name: "webkit-mobile",
      testMatch: /(evaluation-journey|theatre|contact-failures|smoke)\.spec\.ts/,
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 390, height: 844 },
        // WebKit upgrades every same-origin request to https (see helpers.ts `test`); starting
        // on https keeps sessionStorage on one origin across the journey.
        baseURL: "https://localhost:3010",
        ignoreHTTPSErrors: true,
      },
    },
  ],
  webServer: {
    command: "node tests/e2e/server.mjs",
    url: PRIMARY_URL,
    reuseExistingServer: false,
    timeout: 300_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
