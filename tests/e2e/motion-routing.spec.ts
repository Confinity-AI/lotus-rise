import { expect, test } from "@playwright/test";
import { journeyRoutes, path, routes } from "./helpers";

test.describe("reduced motion", () => {
  test("reveal blocks carry no transform and the lotus renders settled", async ({ page }) => {
    await page.goto("/");
    const reveals = page.locator(".reveal");
    expect(await reveals.count()).toBeGreaterThan(0);
    const transforms = await reveals.evaluateAll((nodes) =>
      nodes.map((node) => ({
        transform: getComputedStyle(node).transform,
        opacity: getComputedStyle(node).opacity,
      })),
    );
    // The entrance transform is translateY(18px); settled state must be identity or none.
    for (const entry of transforms) {
      expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(entry.transform);
      expect(entry.opacity).toBe("1");
    }
    const lotus = page.locator(".lotus-bloom");
    await expect(lotus).toHaveCount(1);
    expect(await lotus.evaluate((node) => getComputedStyle(node).opacity)).toBe("1");
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe("auto");
  });

  test("theatre image swap has no running animation under reduced motion", async ({ page }) => {
    await page.goto("/janus/evaluation/");
    await page.getByRole("tab").nth(1).click();
    const duration = await page
      .locator(".product-view-image")
      .evaluate((node) => getComputedStyle(node).animationDuration);
    expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.01);
  });
});

test.describe("routing and export integrity", () => {
  test("sitemap entries equal the public route list", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
      (match) => new URL(match[1]).pathname,
    );
    expect(locs).toEqual(routes.map((route) => path(route)));
  });

  for (const route of journeyRoutes) {
    test(`${route}: every main and header href resolves from out/`, async ({ page, request }) => {
      await page.goto(route);
      const hrefs = await page
        .locator("main a[href], header a[href]")
        .evaluateAll((nodes) =>
          nodes.map((node) => (node as HTMLAnchorElement).getAttribute("href") ?? ""),
        );
      expect(hrefs.length).toBeGreaterThan(0);
      const internal = Array.from(
        new Set(hrefs.filter((href) => href.startsWith("/") || href.startsWith("#"))),
      );
      for (const href of internal) {
        if (href.startsWith("#")) {
          await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
          continue;
        }
        expect(href.endsWith("/"), `${href} must keep the trailing slash`).toBe(true);
        const response = await request.get(href);
        expect(response.status(), href).toBe(200);
      }
    });

    test(`${route}: canonical and og:url agree`, async ({ page }) => {
      await page.goto(route);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      expect(canonical).toBe(`https://www.lotusrise.org${path(route)}`);
      expect(ogUrl).toBe(canonical);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    });
  }

  test("hero captures load eagerly with high fetch priority", async ({ page }) => {
    for (const route of ["/janus/", "/janus/evaluation/"]) {
      await page.goto(route);
      const img = page.locator(".subpage-hero .janus-hero-product img");
      await expect(img).toHaveAttribute("fetchpriority", "high");
      await expect(img).toHaveAttribute("loading", "eager");
    }
  });

  test("the hub and the module do not open on the same capture", async ({ page }) => {
    const heroSources: string[] = [];
    const heroCaptions: string[] = [];
    for (const route of ["/janus/", "/janus/evaluation/"]) {
      await page.goto(route);
      const figure = page.locator(".subpage-hero .janus-hero-product");
      heroSources.push((await figure.locator("img").getAttribute("src")) ?? "");
      heroCaptions.push((await figure.locator("figcaption strong").textContent())?.trim() ?? "");
    }
    expect(heroSources[0]).not.toBe(heroSources[1]);
    expect(heroCaptions[0]).not.toBe(heroCaptions[1]);
  });

  test("no capture repeats inside one section of the module page", async ({ page }) => {
    await page.goto("/janus/evaluation/");
    const perSection = await page.evaluate(() =>
      Array.from(document.querySelectorAll("main > section")).map((section) =>
        Array.from(section.querySelectorAll("img"))
          .map((image) => new URL((image as HTMLImageElement).src).pathname)
          .filter((path) => path.includes("/product/")),
      ),
    );
    for (const section of perSection) {
      expect(new Set(section).size).toBe(section.length);
    }
  });
});
