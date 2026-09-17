import { expect } from "@playwright/test";
import { journeyRoutes, test } from "./helpers";

/**
 * Layout stability measured from the browser's own layout-shift entries while the page
 * loads, reveals, and the theatre swaps captures. Lighthouse is out of scope (non-deterministic
 * locally); this is the deterministic slice of it that the journey depends on.
 */
test.describe("layout stability", () => {
  for (const route of journeyRoutes) {
    test(`${route} accumulates no meaningful layout shift while loading`, async ({ page }) => {
      await page.addInitScript(() => {
        const w = window as unknown as { __cls: number };
        w.__cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntry[]) {
            const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!shift.hadRecentInput) w.__cls += shift.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(route, { waitUntil: "networkidle" });
      // Scroll through the whole page so every lazy image and reveal has settled.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 200));
      });
      const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
      expect(cls).toBeLessThan(0.1);
    });
  }

  test("switching theatre views does not move the copy below the frame", async ({ page }) => {
    await page.goto("/janus/evaluation/", { waitUntil: "networkidle" });
    const stage = page.locator(".product-stage");
    await stage.scrollIntoViewIfNeeded();
    const caption = page.locator(".tab-caption");
    const before = await caption.boundingBox();
    for (const index of [1, 2, 0]) {
      await page.getByRole("tab").nth(index).click();
      await expect(page.locator(".product-view-image")).toHaveJSProperty("complete", true);
      const after = await caption.boundingBox();
      expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThanOrEqual(1);
    }
  });
});
