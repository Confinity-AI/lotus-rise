import { type Page, expect, test } from "@playwright/test";
import { captureAnalytics, content, readAnalytics } from "./helpers";

const views = content.janus.views;
const EVALUATION = "/janus/evaluation/";

async function openTheatre(page: Page) {
  await page.goto(EVALUATION);
  const stage = page.locator(".product-stage");
  await stage.scrollIntoViewIfNeeded();
  return {
    stage,
    tabs: page.getByRole("tab"),
    panel: page.getByRole("tabpanel"),
    dialog: page.locator("dialog.product-dialog"),
    expand: page.locator(".product-expand"),
    image: page.locator(".product-image-button"),
  };
}

test.describe("Janus theatre", () => {
  test("only Evaluation renders the theatre", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("tablist")).toHaveCount(0);
    await expect(page.locator(".janus-home-product img")).toBeVisible();
    await expect(page.locator(".janus-home-product figcaption strong")).toHaveText(
      content.janus.captureCaption,
    );
    await expect(page.locator(".janus-home-note")).toHaveText(content.janus.note);
    await page.goto("/janus/");
    await expect(page.getByRole("tablist")).toHaveCount(0);
    await page.goto(EVALUATION);
    await expect(page.getByRole("tablist")).toHaveCount(1);
  });

  test("arrow keys, Home and End wrap around and report keyboard events", async ({ page }) => {
    await captureAnalytics(page);
    const { tabs, panel } = await openTheatre(page);
    await tabs.nth(0).focus();

    await page.keyboard.press("ArrowLeft");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(2)).toBeFocused();
    await expect(panel).toHaveAttribute("aria-labelledby", "janus-tab-3");

    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(0)).toBeFocused();

    await page.keyboard.press("End");
    await expect(tabs.nth(2)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toBeFocused();

    // Only the selected tab is in the tab order.
    await expect(page.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
    await expect(page.locator('[role="tab"][tabindex="-1"]')).toHaveCount(2);

    const events = await readAnalytics(page);
    expect(events.map((event) => event.name)).toEqual(Array(4).fill("janus_tab_change"));
    expect(events.map((event) => event.index)).toEqual([2, 0, 2, 0]);
    expect(events.every((event) => event.method === "keyboard")).toBe(true);
  });

  test("clicking a tab reports a click event and updates the caption", async ({ page }) => {
    await captureAnalytics(page);
    const { tabs } = await openTheatre(page);
    await tabs.nth(1).click();
    await expect(page.locator(".product-caption-copy strong")).toHaveText(views[1].title);
    await expect(page.locator(".product-progress")).toHaveText("02 / 03");
    expect(await readAnalytics(page)).toEqual([
      { name: "janus_tab_change", index: 1, method: "click" },
    ]);
  });

  test("the live region announces caption only, never controls", async ({ page }) => {
    const { stage } = await openTheatre(page);
    const live = stage.locator("[aria-live]");
    await expect(live).toHaveCount(1);
    await expect(live.locator("button, a")).toHaveCount(0);
    await expect(live).toContainText(views[0].title);
    // No inline prev/next: the three tabs and swipe are the selectors.
    await expect(stage.getByRole("button", { name: /previous|next/i })).toHaveCount(0);
  });

  test("product frame height is stable across all tabs", async ({ page }) => {
    const { tabs } = await openTheatre(page);
    const frame = page.locator(".product-frame");
    const heights: number[] = [];
    for (let index = 0; index < views.length; index += 1) {
      await tabs.nth(index).click();
      await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
      await expect(page.locator(".product-view-image")).toHaveJSProperty("complete", true);
      const box = await frame.boundingBox();
      heights.push(box?.height ?? 0);
    }
    for (const height of heights) {
      expect(Math.abs(height - heights[0])).toBeLessThanOrEqual(1);
    }
  });

  test("tabs stay a three-part segmented control", async ({ page }) => {
    const { tabs } = await openTheatre(page);
    const boxes = await Promise.all([0, 1, 2].map((index) => tabs.nth(index).boundingBox()));
    for (const box of boxes) expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    // Same row: tops equal, lefts increasing.
    expect(Math.abs((boxes[0]?.y ?? 0) - (boxes[2]?.y ?? 0))).toBeLessThanOrEqual(1);
    expect(boxes[0]?.x ?? 0).toBeLessThan(boxes[1]?.x ?? 0);
    expect(boxes[1]?.x ?? 0).toBeLessThan(boxes[2]?.x ?? 0);
  });

  test("expand opens the dialog; Escape closes and returns focus", async ({ page }) => {
    await captureAnalytics(page);
    const { dialog, expand } = await openTheatre(page);
    await expect(expand).toHaveAttribute("aria-label", `Open ${views[0].title} full screen`);
    await expand.click();
    await expect(dialog).toHaveJSProperty("open", true);
    await expect(dialog.locator("#product-dialog-title")).toHaveText(views[0].title);
    await expect(dialog.locator("img")).toHaveAttribute("alt", views[0].alt);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveJSProperty("open", false);
    await expect(expand).toBeFocused();
    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "janus_dialog_open",
      "janus_dialog_close",
    ]);
  });

  test("clicking the image opens the dialog and the expand button is the only focusable opener", async ({
    page,
  }) => {
    const { dialog, image, expand, stage } = await openTheatre(page);
    await expect(stage.getByRole("button", { name: /full screen/i })).toHaveCount(1);
    await image.click();
    await expect(dialog).toHaveJSProperty("open", true);
    await dialog.locator(".dialog-close").click();
    await expect(dialog).toHaveJSProperty("open", false);
    await expect(expand).toBeFocused();
  });

  test("backdrop pointer-down closes; clicks inside the shell do not", async ({ page }) => {
    const { dialog, expand } = await openTheatre(page);
    await expand.click();
    await expect(dialog).toHaveJSProperty("open", true);
    await dialog.locator("#product-dialog-title").click();
    await expect(dialog).toHaveJSProperty("open", true);
    await page.mouse.click(4, 4);
    await expect(dialog).toHaveJSProperty("open", false);
  });

  test("the full-screen control is labelled, not icon-only", async ({ page }) => {
    const { expand } = await openTheatre(page);
    await expect(expand).toContainText(content.actions.fullScreen);
    const box = await expand.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test("arrow keys move between views inside the dialog", async ({ page }) => {
    await captureAnalytics(page);
    const { dialog, expand } = await openTheatre(page);
    await expand.click();
    const counter = dialog.locator("[data-dialog-progress]");
    await page.keyboard.press("ArrowRight");
    await expect(counter).toHaveText("02 / 03");
    await expect(dialog.locator("#product-dialog-title")).toHaveText(views[1].title);
    await page.keyboard.press("ArrowLeft");
    await expect(counter).toHaveText("01 / 03");
    await expect(dialog).toHaveJSProperty("open", true);
    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "janus_dialog_open",
      "janus_tab_change",
      "janus_tab_change",
    ]);
  });

  test("full screen renders the capture at a readable width", async ({ page }) => {
    const { dialog, expand } = await openTheatre(page);
    await expand.click();
    const image = dialog.locator("img");
    await expect(image).toHaveJSProperty("complete", true);
    const width = await image.evaluate((node) => node.getBoundingClientRect().width);
    // Legibility floor: the inline frame is ~370px wide on mobile, which cannot be read.
    expect(width).toBeGreaterThanOrEqual(880);
    const scrollable = await dialog
      .locator(".product-dialog-media")
      .evaluate((node) => node.scrollWidth > node.clientWidth || node.clientWidth >= 880);
    expect(scrollable).toBe(true);
  });

  test("the private-preview note appears once per section", async ({ page }) => {
    await page.goto(EVALUATION);
    await expect(page.locator(".product-note")).toHaveCount(0);
    await expect(page.locator(".janus-gallery .section-intro")).toHaveCount(1);
    await page.goto("/");
    await expect(page.locator(".janus-home-note")).toHaveCount(1);
  });

  test("dialog prev/next update the counter and title", async ({ page }) => {
    const { dialog, expand } = await openTheatre(page);
    await expand.click();
    const counter = dialog.locator("[data-dialog-progress]");
    await expect(counter).toHaveText("01 / 03");
    await dialog.getByRole("button", { name: "Next Janus view" }).click();
    await expect(counter).toHaveText("02 / 03");
    await expect(dialog.locator("#product-dialog-title")).toHaveText(views[1].title);
    await dialog.getByRole("button", { name: "Previous Janus view" }).click();
    await dialog.getByRole("button", { name: "Previous Janus view" }).click();
    await expect(counter).toHaveText("03 / 03");
    await expect(dialog.locator("#product-dialog-title")).toHaveText(views[2].title);
  });

  test("touch swipe changes the view without opening the dialog", async ({ page, isMobile }) => {
    test.skip(!isMobile, "touch emulation only on the mobile project");
    await captureAnalytics(page);
    const { panel, tabs, dialog, image } = await openTheatre(page);
    const box = await image.boundingBox();
    if (!box) throw new Error("image not laid out");
    const y = box.y + box.height / 2;
    const swipe = async (fromX: number, toX: number) => {
      await panel.dispatchEvent("pointerdown", {
        pointerId: 7,
        pointerType: "touch",
        isPrimary: true,
        button: 0,
        clientX: fromX,
        clientY: y,
      });
      await panel.dispatchEvent("pointerup", {
        pointerId: 7,
        pointerType: "touch",
        isPrimary: true,
        button: 0,
        clientX: toX,
        clientY: y,
      });
    };
    await swipe(box.x + box.width - 20, box.x + 20);
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(dialog).toHaveJSProperty("open", false);
    await swipe(box.x + 20, box.x + box.width - 20);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    // A mostly vertical drag is a scroll, not a swipe.
    await panel.dispatchEvent("pointerdown", {
      pointerId: 8,
      pointerType: "touch",
      isPrimary: true,
      button: 0,
      clientX: box.x + 100,
      clientY: y - 60,
    });
    await panel.dispatchEvent("pointerup", {
      pointerId: 8,
      pointerType: "touch",
      isPrimary: true,
      button: 0,
      clientX: box.x + 40,
      clientY: y + 60,
    });
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(dialog).toHaveJSProperty("open", false);
    const events = await readAnalytics(page);
    expect(events).toEqual([
      { name: "janus_tab_change", index: 1, method: "swipe" },
      { name: "janus_tab_change", index: 0, method: "swipe" },
    ]);
  });
});
