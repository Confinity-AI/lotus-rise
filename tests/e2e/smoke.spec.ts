import { expect } from "@playwright/test";
import { path, plainBase, routes, test, unsetBase } from "./helpers";

test.describe("static export smoke", () => {
  // Fails loudly if a stale server is serving the wrong export, instead of letting every
  // contact spec fail later with a confusing degrade-branch symptom.
  test("each server serves the export it is meant to serve", async ({ page, baseURL }) => {
    await page.goto("/contact/");
    await expect(page.locator("form.contact-form")).toHaveAttribute("data-configured", "true");
    await expect(page.locator("output.form-status")).toHaveCount(0);

    await page.goto(`${unsetBase(baseURL)}/contact/`);
    await expect(page.locator("form.contact-form")).toHaveAttribute("data-configured", "false");
    await expect(page.locator("output.form-status")).toHaveCount(1);
  });

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

  test("basePath is empty for the production export", async ({ request, baseURL }) => {
    expect(path("/janus/evaluation/")).toBe("/janus/evaluation/");
    const response = await request.get(`${plainBase(baseURL)}/janus/evaluation/`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('<link rel="canonical"');
  });

  test("sitemap and robots are emitted", async ({ request, baseURL }) => {
    const sitemap = await request.get(`${plainBase(baseURL)}/sitemap.xml`);
    expect(sitemap.status()).toBe(200);
    const robots = await request.get(`${plainBase(baseURL)}/robots.txt`);
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("sitemap.xml");
  });

  test("unknown routes return the 404 page", async ({ request, baseURL }) => {
    const response = await request.get(`${plainBase(baseURL)}/janus/reporting/`);
    expect(response.status()).toBe(404);
  });
});
