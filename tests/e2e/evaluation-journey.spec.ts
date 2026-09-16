import { expect, test } from "@playwright/test";
import {
  MOCK_ENDPOINT,
  captureAnalytics,
  content,
  fillContactForm,
  readAnalytics,
} from "./helpers";

const views = content.janus.views;

test("home → Evaluation → theatre → dialog → contact → sent → home", async ({ page }) => {
  await captureAnalytics(page);
  await page.route(MOCK_ENDPOINT, (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
  );

  await page.goto("/");
  await page
    .locator(".suite-module")
    .filter({ hasText: content.janus.modules[0].title })
    .getByRole("link", { name: content.janus.modules[0].action })
    .click();
  await expect(page).toHaveURL(/\/janus\/evaluation\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    content.evaluationPage.hero.title,
  );

  // One primary action in the hero viewport.
  const hero = page.locator(".subpage-hero");
  await expect(hero.getByRole("link")).toHaveCount(1);
  const heroPrimary = hero.getByRole("link", { name: "Request a preview" });
  await expect(heroPrimary).toBeVisible();

  // Roving tabindex: Tab from the hero CTA lands on the selected tab.
  await heroPrimary.focus();
  await page.keyboard.press("Tab");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toBeFocused();

  const panel = page.getByRole("tabpanel");
  const caption = page.locator(".product-caption-copy");

  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(panel).toHaveAttribute("aria-labelledby", "janus-tab-2");
  await expect(caption).toContainText(views[1].title);

  await page.keyboard.press("End");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(panel).toHaveAttribute("aria-labelledby", "janus-tab-3");
  await expect(caption).toContainText(views[2].title);

  // Expand → native dialog → Escape → focus returns to the expand button.
  const expand = page.getByRole("button", { name: `Open ${views[2].title} full screen` });
  await expect(expand).toHaveCount(1);
  await expand.click();
  const dialog = page.locator("dialog.product-dialog");
  await expect(dialog).toHaveJSProperty("open", true);
  await expect(dialog.locator("#product-dialog-title")).toHaveText(views[2].title);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveJSProperty("open", false);
  await expect(expand).toBeFocused();

  // Closing viewport: one primary action.
  const closing = page.locator("main .closing");
  await expect(closing.getByRole("link")).toHaveCount(1);
  await closing.getByRole("link", { name: "Request a preview" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);

  await fillContactForm(page);
  await page.getByRole("button", { name: "Send request" }).click();

  const output = page.locator("output.form-success");
  await expect(output).toBeVisible();
  await expect(output).toBeFocused();
  await expect(output).toContainText("Thank you.");

  await output.getByRole("link", { name: "Return to the homepage" }).click();
  await expect(page).toHaveURL("http://localhost:3010/");

  const events = await readAnalytics(page);
  expect(events.map((event) => event.name)).toEqual([
    "cta_click",
    "janus_tab_change",
    "janus_tab_change",
    "janus_dialog_open",
    "janus_dialog_close",
    "cta_click",
    "contact_start",
    "contact_submit",
    "contact_complete",
    "cta_click",
  ]);
  expect(events[0]).toMatchObject({ page: "/", label: content.janus.modules[0].action });
  expect(events[1]).toMatchObject({ index: 1, method: "keyboard" });
  expect(events[2]).toMatchObject({ index: 2, method: "keyboard" });
  expect(events[3]).toMatchObject({ index: 2 });
  expect(events[5]).toMatchObject({ page: "/janus/evaluation/", label: "Request a preview" });
  expect(events[9]).toMatchObject({ page: "/contact/" });
});
