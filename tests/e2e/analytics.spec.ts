import { expect, test } from "@playwright/test";
import { captureAnalytics, content, readAnalytics } from "./helpers";

test.describe("consent-aware analytics listener", () => {
  test("forwards nothing without consent and sets no cookies or storage", async ({
    page,
    context,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __lotusAnalytics: unknown[] }).__lotusAnalytics = [];
    });
    await page.goto("/janus/evaluation/");
    await page.getByRole("tab").nth(1).click();
    await page.locator(".product-expand").click();
    await page.keyboard.press("Escape");

    const sink = await page.evaluate(
      () => (window as unknown as { __lotusAnalytics: unknown[] }).__lotusAnalytics,
    );
    expect(sink).toEqual([]);
    expect(await context.cookies()).toEqual([]);
    const storage = await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
    }));
    expect(storage.local).toEqual([]);
    expect(storage.session).toEqual([]);
  });

  test("forwards to the host sink only when window.__lotusConsent === true", async ({
    page,
    context,
  }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __lotusAnalytics: unknown[]; __lotusConsent: boolean };
      w.__lotusAnalytics = [];
      w.__lotusConsent = true;
    });
    await page.goto("/janus/evaluation/");
    await page.getByRole("tab").nth(2).click();
    const sink = await page.evaluate(
      () => (window as unknown as { __lotusAnalytics: unknown[] }).__lotusAnalytics,
    );
    expect(sink).toEqual([{ name: "janus_tab_change", index: 2, method: "click" }]);
    expect(await context.cookies()).toEqual([]);
  });

  test("every Request a preview link emits cta_click with page and label", async ({ page }) => {
    await captureAnalytics(page);
    for (const route of ["/", "/janus/", "/janus/evaluation/"]) {
      await page.goto(route);
      const links = page.locator(`main [data-cta="${content.actions.requestPreview}"]`);
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(1);
      for (let index = 0; index < count; index += 1) {
        await page.goto(route);
        await page.evaluate(() => sessionStorage.removeItem("lotus:e2e-events"));
        const link = page.locator(`main [data-cta="${content.actions.requestPreview}"]`).nth(index);
        await link.scrollIntoViewIfNeeded();
        await link.click();
        await expect(page).toHaveURL(/\/contact\/$/);
        const events = await readAnalytics(page);
        expect(events).toEqual([
          { name: "cta_click", page: route, label: content.actions.requestPreview },
        ]);
      }
    }
  });
});
