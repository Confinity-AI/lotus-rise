import { expect } from "@playwright/test";
import { path, content, journeyRoutes, routes, test } from "./helpers";

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
    for (const entry of transforms) {
      expect(entry.transform).toBe("none");
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
      ["/janus/evaluation/", content.evaluationPage.status],
      ["/janus/strategy/", content.strategyPage.status],
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

  test("the path band mirrors the product's own five steps", async ({ page }) => {
    await page.goto("/janus/evaluation/");
    // An ordered list: AT announces "list, 5 items" and the list role permits the aria-label.
    const steps = page.locator("ol.janus-path > li.janus-path-step");
    await expect(steps).toHaveCount(content.evaluationPage.path.steps.length);
    await expect(page.locator("ol.janus-path")).toHaveCSS("list-style-type", "none");
    for (const [index, step] of content.evaluationPage.path.steps.entries()) {
      await expect(steps.nth(index).locator("strong")).toHaveText(step.title);
      await expect(steps.nth(index).locator("p")).toHaveText(step.copy);
    }
    // Each stage name is one the product itself uses (visible in the program-path capture).
    expect(content.evaluationPage.path.steps.map((step) => step.title)).toEqual([
      "Profile",
      "Design",
      "Fieldwork",
      "Analysis",
      "Deliverables",
    ]);
  });

  test("the 404 page offers one way home", async ({ page }) => {
    const response = await page.goto("/janus/reporting/");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main").getByRole("link", { name: /homepage/i })).toHaveCount(1);
    await expect(page.locator("header").getByText(/back to homepage/i)).toHaveCount(0);
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

  test("every product capture is described by its one content alt", async ({ page }) => {
    // One capture, one description, wherever it appears (R6: copy lives in site-content).
    const known = new Map(content.janus.views.map((view) => [view.image, view.alt]));
    for (const route of ["/", "/janus/", "/janus/evaluation/"]) {
      await page.goto(route);
      const captures = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLImageElement>("main img")).map((image) => {
          const src = new URL(image.currentSrc || image.src).searchParams.get("url");
          return { src: src ?? new URL(image.src).pathname, alt: image.alt };
        }),
      );
      const product = captures.filter((capture) => capture.src.includes("/product/"));
      expect(product.length).toBeGreaterThan(0);
      for (const capture of product) {
        expect(capture.alt, `${route} ${capture.src}`).toBe(known.get(capture.src));
      }
    }
  });

  test("the review path is an ordered list of four steps", async ({ page }) => {
    await page.goto("/janus/evaluation/");
    const steps = page.locator("ol.janus-review-path > li");
    await expect(steps).toHaveCount(content.evaluationPage.review.steps.length);
    await expect(page.locator("ol.janus-review-path")).toHaveCSS("list-style-type", "none");
    for (const [index, step] of content.evaluationPage.review.steps.entries()) {
      await expect(steps.nth(index).locator("h3")).toHaveText(step.title);
      await expect(steps.nth(index).locator("span[aria-hidden='true']")).toHaveText(
        String(index + 1).padStart(2, "0"),
      );
    }
  });

  test("the first viewport of every journey page has one filled primary action", async ({
    page,
  }) => {
    for (const route of ["/", "/janus/", "/janus/evaluation/"]) {
      await page.goto(route);
      const filledInView = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>(".button-primary"))
          .filter((node) => {
            const box = node.getBoundingClientRect();
            return box.height > 0 && box.top < window.innerHeight;
          })
          .map((node) => node.textContent?.trim() ?? ""),
      );
      expect(filledInView, route).toHaveLength(1);
      await expect(page.locator("header .button-primary")).toHaveCount(0);
      // The contact link stays in the header, demoted; counted in the DOM so the mobile project
      // (where the desktop nav is display:none) asserts the same markup.
      await expect(
        page.locator("header .nav-links-desktop .button-secondary", {
          hasText: content.actions.contactUs,
        }),
      ).toHaveCount(1);
    }
  });
});
