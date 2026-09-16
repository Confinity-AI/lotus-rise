import { expect, test } from "@playwright/test";
import { path, routes } from "./helpers";

test.describe("static export smoke", () => {
  for (const route of routes) {
    test(`${route} serves from out/ with one h1`, async ({ page }) => {
      const response = await page.goto(path(route));
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
    });
  }

  test("basePath is empty for the production export", async ({ request }) => {
    expect(path("/janus/evaluation/")).toBe("/janus/evaluation/");
    const response = await request.get("/janus/evaluation/");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('<link rel="canonical"');
  });

  test("sitemap and robots are emitted", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("sitemap.xml");
  });

  test("unknown routes return the 404 page", async ({ request }) => {
    const response = await request.get("/janus/reporting/");
    expect(response.status()).toBe(404);
  });
});
