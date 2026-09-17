import { expect } from "@playwright/test";
import { journeyRoutes, test } from "./helpers";

test.describe("visual baselines (reduced motion, full page)", () => {
  for (const route of journeyRoutes) {
    test(`${route}`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(async () => {
        // Force every reveal into its settled state and wait for images.
        for (const node of document.querySelectorAll(".reveal")) node.classList.add("is-visible");
        for (const image of document.images) image.loading = "eager";
        await Promise.all(
          Array.from(document.images)
            .filter((image) => !image.complete)
            .map(
              (image) =>
                new Promise((resolve) => {
                  image.addEventListener("load", resolve, { once: true });
                  image.addEventListener("error", resolve, { once: true });
                }),
            ),
        );
        await document.fonts.ready;
      });
      const name = `${route.replace(/\//g, "-").replace(/^-|-$/g, "") || "home"}.png`;
      await expect(page).toHaveScreenshot(name, {
        fullPage: true,
        mask: [page.locator(".lotus-bloom")],
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
