import { expect, test } from "@playwright/test";
import { content, journeyRoutes, path, routes } from "./helpers";

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

  for (const route of journeyRoutes) {
    test(`${route}: export emits complete document metadata and stable image boxes`, async ({
      page,
    }) => {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
        "content",
        /width=device-width/,
      );
      await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      expect(await page.title()).toMatch(/Lotus Rise/);

      const schema = await page.locator('script[type="application/ld+json"]').textContent();
      const parsed = JSON.parse(schema ?? "{}");
      expect(parsed["@type"]).toBe("Corporation");
      expect(parsed.name).toBe("Lotus Rise");
      expect(parsed.url).toBe("https://www.lotusrise.org/");
      expect(parsed.logo).toMatch(/^https:\/\/www\.lotusrise\.org\/.+\.svg$/);

      // Every image reserves its box, so captures cannot shift copy while they load.
      const unsized = await page
        .locator("main img, header img, footer img")
        .evaluateAll((nodes) =>
          nodes
            .filter((node) => !node.getAttribute("width") || !node.getAttribute("height"))
            .map((node) => node.getAttribute("src")),
        );
      expect(unsized).toEqual([]);
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

  test("every Janus page states module status above its H1", async ({ page }) => {
    const expected: Array<[string, string]> = [
      ["/janus/", content.janusPage.status],
      [
        "/janus/evaluation/",
        `${content.evaluationPage.product} · ${content.evaluationPage.status}`,
      ],
      ["/janus/strategy/", `${content.strategyPage.product} · ${content.strategyPage.status}`],
    ];
    for (const [route, text] of expected) {
      await page.goto(route);
      const status = page.locator("main .module-status");
      await expect(status).toHaveText(text);
      // The status precedes the H1 in reading order.
      const before = await page.evaluate(() => {
        const status = document.querySelector("main .module-status");
        const heading = document.querySelector("h1");
        return status && heading
          ? Boolean(status.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING)
          : null;
      });
      expect(before).toBe(true);
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
