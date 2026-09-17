import { type Page, test as base } from "@playwright/test";
import { siteContent } from "../../src/content/site-content";
import { sitePath } from "../../src/lib/site-path";

export const content = siteContent;

/** Every public route in C2 order. Must equal the sitemap. */
export const routes = [
  "/",
  "/janus/",
  "/janus/evaluation/",
  "/janus/strategy/",
  "/team/",
  "/contact/",
] as const;

export const journeyRoutes = ["/", "/janus/", "/janus/evaluation/", "/contact/"] as const;

export const UNSET_BASE = "http://localhost:3011";

/** The plain-http primary server, for `request` calls that bypass page routing. */
export function plainBase(baseURL?: string) {
  return (baseURL ?? "http://localhost:3010").replace(/^https:/, "http:");
}

/** The unset-endpoint server, on the same scheme the current project uses. */
export function unsetBase(baseURL?: string) {
  return (baseURL ?? "http://localhost:3010").replace(":3010", ":3011");
}

export const MOCK_ENDPOINT = "http://localhost:3010/__contact";
/** Matches the mock endpoint on either scheme (WebKit upgrades it, see `test` below). */
export const MOCK_ENDPOINT_PATTERN = /^https?:\/\/localhost:3010\/__contact$/;

/**
 * The export ships `upgrade-insecure-requests`. Chromium exempts localhost; WebKit does not,
 * so it requests every asset over https://localhost and nothing hydrates. Production is
 * HTTPS end to end and unaffected. For WebKit only, answer those upgraded requests from the
 * plain server so the artefact under test stays byte-identical.
 */
export const test = base.extend({
  page: async ({ page, browserName }, use) => {
    if (browserName === "webkit") {
      await page.route(/^https:\/\/localhost:301[01]\//, async (route) => {
        const request = route.request();
        const response = await page.request.fetch(request.url().replace(/^https:/, "http:"), {
          method: request.method(),
          headers: { accept: request.headers().accept ?? "*/*" },
          data: request.postDataBuffer() ?? undefined,
          maxRedirects: 0,
        });
        await route.fulfill({ response });
      });
    }
    await use(page);
  },
});

export function path(route: string) {
  return sitePath(route);
}

const STORE_KEY = "lotus:e2e-events";

export type AnalyticsEvent = { name: string } & Record<string, unknown>;

/** Persist every `lotus:analytics` event so the trail survives full-page navigation. */
export async function captureAnalytics(page: Page) {
  await page.addInitScript((key) => {
    window.addEventListener("lotus:analytics", (event) => {
      const detail = (event as CustomEvent).detail;
      const current = JSON.parse(sessionStorage.getItem(key) ?? "[]");
      current.push(detail);
      sessionStorage.setItem(key, JSON.stringify(current));
    });
  }, STORE_KEY);
}

export async function readAnalytics(page: Page): Promise<AnalyticsEvent[]> {
  return page.evaluate((key) => JSON.parse(sessionStorage.getItem(key) ?? "[]"), STORE_KEY);
}

export async function clearAnalytics(page: Page) {
  await page.evaluate((key) => sessionStorage.removeItem(key), STORE_KEY);
}

export const contactFixture = {
  name: "Ada Reviewer",
  email: "ada@example.org",
  organization: "Example Foundation",
  role: "Foundation",
  message: "We run twelve evaluations a year and lose the thread between plan and report.",
};

export async function fillContactForm(page: Page) {
  await page.getByLabel("Name").fill(contactFixture.name);
  await page.getByLabel("Work email").fill(contactFixture.email);
  await page.getByLabel("Organization", { exact: true }).fill(contactFixture.organization);
  await page.getByLabel("Organization type").selectOption(contactFixture.role);
  await page.getByLabel(siteContent.contact.form.messageLabel).fill(contactFixture.message);
}
