import { expect, test } from "@playwright/test";
import {
  MOCK_ENDPOINT,
  UNSET_BASE,
  captureAnalytics,
  contactFixture,
  content,
  fillContactForm,
  readAnalytics,
} from "./helpers";

const { form: copy } = content.contact;
const { actions } = content;

test.describe("contact failure states", () => {
  test("endpoint 500 → alert with next-step copy, button re-enabled, details kept", async ({
    page,
  }) => {
    await captureAnalytics(page);
    await page.route(MOCK_ENDPOINT, (route) => route.fulfill({ status: 500, body: "nope" }));
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();

    const alert = page.locator(".form-error");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(alert).toHaveText(copy.submitError);
    await expect(page.getByRole("button", { name: actions.send })).toBeEnabled();
    await expect(page.getByLabel("Name")).toHaveValue(contactFixture.name);
    await expect(page.getByLabel(content.contact.title)).toHaveValue(contactFixture.message);
    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "contact_start",
      "contact_submit",
      "contact_submit_error",
    ]);
  });

  test("network failure → alert, button re-enabled", async ({ page }) => {
    await page.route(MOCK_ENDPOINT, (route) => route.abort("connectionrefused"));
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();
    await expect(page.locator(".form-error[role='alert']")).toHaveText(copy.submitError);
    await expect(page.getByRole("button", { name: actions.send })).toBeEnabled();
  });

  test("double click sends exactly one request", async ({ page }) => {
    let requests = 0;
    await page.route(MOCK_ENDPOINT, async (route) => {
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto("/contact/");
    await fillContactForm(page);
    const send = page.getByRole("button", { name: actions.send });
    await send.dblclick();
    await page.keyboard.press("Enter");
    await expect(page.locator("output.form-success")).toBeVisible();
    expect(requests).toBe(1);
  });

  test("missing required field blocks submit and reports a validation error", async ({
    page,
  }) => {
    await captureAnalytics(page);
    let requests = 0;
    await page.route(MOCK_ENDPOINT, (route) => {
      requests += 1;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto("/contact/");
    await page.getByLabel("Name").fill(contactFixture.name);
    await page.getByRole("button", { name: actions.send }).click();
    const invalid = await page.evaluate(() => {
      const form = document.querySelector<HTMLFormElement>("form.contact-form");
      return form ? !form.checkValidity() : null;
    });
    expect(invalid).toBe(true);
    await expect(page.getByLabel("Work email")).toBeFocused();
    expect(requests).toBe(0);
    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "contact_start",
      "contact_validation_error",
    ]);
  });

  test("sending state disables the button and marks the form busy", async ({ page }) => {
    await page.route(MOCK_ENDPOINT, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();
    await expect(page.getByRole("button", { name: actions.sending })).toBeDisabled();
    await expect(page.locator("form.contact-form")).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("output.form-success")).toBeVisible();
  });
});

test.describe("contact endpoint unset (build with env absent)", () => {
  test("degrades honestly before the visitor types anything", async ({ page }) => {
    await captureAnalytics(page);
    let requests = 0;
    await page.route(/__contact/, (route) => {
      requests += 1;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto(`${UNSET_BASE}/contact/`);

    const form = page.locator("form.contact-form");
    await expect(form).toHaveAttribute("data-configured", "false");
    const notice = page.locator("output.form-status");
    await expect(notice).toBeVisible();
    await expect(notice).toHaveText(copy.configuration);
    // The notice precedes the first field in reading order.
    const order = await page.evaluate(() => {
      const notice = document.querySelector("output.form-status");
      const field = document.querySelector("#name");
      return notice && field
        ? Boolean(notice.compareDocumentPosition(field) & Node.DOCUMENT_POSITION_FOLLOWING)
        : null;
    });
    expect(order).toBe(true);

    // Fields render; submit is disabled; nothing is sent.
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByRole("button", { name: actions.send })).toBeDisabled();
    await fillContactForm(page);
    await page.keyboard.press("Enter");
    expect(requests).toBe(0);
    await expect(page.locator(".form-error")).toHaveCount(0);

    const names = (await readAnalytics(page)).map((event) => event.name);
    expect(names.filter((name) => name === "contact_configuration_error")).toHaveLength(1);
    expect(names).not.toContain("contact_submit");
  });
});
