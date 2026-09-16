import type { Page } from "@playwright/test";
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

export const MOCK_ENDPOINT = "http://localhost:3010/__contact";

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
  await page.getByLabel(siteContent.contact.title).fill(contactFixture.message);
}
