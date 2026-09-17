import { expect } from "@playwright/test";
import {
  MOCK_ENDPOINT_PATTERN,
  captureAnalytics,
  contactFixture,
  content,
  fillContactForm,
  readAnalytics,
  test,
  unsetBase,
} from "./helpers";

const { form: copy } = content.contact;
const { actions } = content;

test.describe("contact failure states", () => {
  test("endpoint 500 → alert with next-step copy, button re-enabled, details kept", async ({
    page,
  }) => {
    await captureAnalytics(page);
    await page.route(MOCK_ENDPOINT_PATTERN, (route) =>
      route.fulfill({ status: 500, body: "nope" }),
    );
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();

    const alert = page.locator(".form-error");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(alert).toHaveText(copy.submitError);
    await expect(page.getByRole("button", { name: actions.send })).toBeEnabled();
    await expect(page.getByLabel("Name")).toHaveValue(contactFixture.name);
    await expect(page.getByLabel(copy.messageLabel)).toHaveValue(contactFixture.message);
    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "contact_start",
      "contact_submit",
      "contact_submit_error",
    ]);
  });

  test("network failure → alert, button re-enabled", async ({ page }) => {
    await page.route(MOCK_ENDPOINT_PATTERN, (route) => route.abort("connectionrefused"));
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();
    await expect(page.locator(".form-error[role='alert']")).toHaveText(copy.submitError);
    await expect(page.getByRole("button", { name: actions.send })).toBeEnabled();
  });

  test("double click sends exactly one request", async ({ page }) => {
    let requests = 0;
    await page.route(MOCK_ENDPOINT_PATTERN, async (route) => {
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

  test("missing required field blocks submit and reports a validation error", async ({ page }) => {
    await captureAnalytics(page);
    let requests = 0;
    await page.route(MOCK_ENDPOINT_PATTERN, (route) => {
      requests += 1;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto("/contact/");
    await expect(page.locator(".form-required")).toHaveText(copy.required);
    await page.getByLabel("Name").fill(contactFixture.name);
    await page.getByRole("button", { name: actions.send }).click();

    // Nothing is sent, and each unfilled field keeps a message the visitor can read.
    expect(requests).toBe(0);
    await expect(page.locator(".field-error")).toHaveCount(4);
    for (const [field, message] of Object.entries(copy.fieldErrors)) {
      if (field === "name") continue;
      const error = page.locator(`#${field}-error`);
      await expect(error).toHaveText(message);
      const input = page.locator(`#${field}`);
      await expect(input).toHaveAttribute("aria-invalid", "true");
      await expect(input).toHaveAttribute("aria-describedby", `${field}-error`);
    }
    await expect(page.locator("#name")).not.toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Work email")).toBeFocused();

    // Typing clears that field's message only.
    await page.getByLabel("Work email").fill(contactFixture.email);
    await expect(page.locator("#email-error")).toHaveCount(0);
    await expect(page.locator("#organization-error")).toHaveCount(1);

    expect((await readAnalytics(page)).map((event) => event.name)).toEqual([
      "contact_start",
      "contact_validation_error",
    ]);
  });

  test("the endpoint receives exactly the five fields as JSON, and success echoes the address", async ({
    page,
  }) => {
    let received: { method: string; contentType: string | undefined; body: unknown } | null = null;
    await page.route(MOCK_ENDPOINT_PATTERN, (route) => {
      const request = route.request();
      received = {
        method: request.method(),
        contentType: request.headers()["content-type"],
        body: request.postDataJSON(),
      };
      return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto("/contact/");
    await fillContactForm(page);
    await page.getByRole("button", { name: actions.send }).click();

    const success = page.locator("output.form-success");
    await expect(success).toBeVisible();
    expect(received).toEqual({
      method: "POST",
      contentType: "application/json",
      body: {
        name: contactFixture.name,
        email: contactFixture.email,
        organization: contactFixture.organization,
        role: contactFixture.role,
        message: contactFixture.message,
      },
    });

    await expect(success.locator("h2")).toHaveText(copy.successTitle);
    await expect(success.locator(".form-success-reply")).toHaveText(
      `${copy.successReply} ${contactFixture.email} ${copy.successReplyTail}`,
    );
    await expect(success.getByRole("link", { name: actions.returnHome })).toBeVisible();
  });

  test("with an endpoint the submit says send, and the page offers no way back", async ({
    page,
  }) => {
    await page.goto("/contact/");
    await expect(page.locator("form.contact-form")).toHaveAttribute("data-configured", "true");
    await expect(page.getByRole("button", { name: actions.send })).toBeVisible();
    await expect(page.getByRole("button", { name: actions.sendByEmail })).toHaveCount(0);
    // FL-01: the header CTA slot is empty on the contact page; nav links remain, on both layouts.
    await expect(page.locator("header .button")).toHaveCount(0);
    await expect(page.locator("header").getByText(/back to homepage/i)).toHaveCount(0);
    await expect(page.locator("header .nav-links-desktop a")).toHaveCount(content.navigation.length);
    await expect(page.locator("header .mobile-nav-panel a")).toHaveCount(content.navigation.length);
  });

  test("sending state disables the button and marks the form busy", async ({ page }) => {
    await page.route(MOCK_ENDPOINT_PATTERN, async (route) => {
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
  test("delivers through the visitor's email app to the team", async ({
    page,
    baseURL,
    browserName,
  }) => {
    // WebKit on Windows has no mailto: handler and rewrites the address as an https URL,
    // navigating the page away. Linux WebKit (CI) and Chromium keep the page and pass.
    test.skip(
      browserName === "webkit" && process.platform === "win32",
      "WebKit on Windows has no mailto: handler",
    );
    await captureAnalytics(page);
    let requests = 0;
    await page.route(/__contact/, (route) => {
      requests += 1;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto(`${unsetBase(baseURL)}/contact/`);

    const form = page.locator("form.contact-form");
    await expect(form).toHaveAttribute("data-configured", "false");
    const notice = page.locator("output.form-status");
    await expect(notice).toHaveText(copy.configuration);
    // The control names what it does: it opens the visitor's email app, it does not "send".
    const submit = page.getByRole("button", { name: actions.sendByEmail });
    await expect(submit).toBeEnabled();
    await expect(page.getByRole("button", { name: actions.send })).toHaveCount(0);

    // Validation still guards the email path.
    await submit.click();
    await expect(page.locator(".field-error")).toHaveCount(5);
    await expect(page.locator("output.form-success")).toHaveCount(0);

    await fillContactForm(page);
    await submit.click();

    const panel = page.locator("output.form-success");
    await expect(panel).toBeVisible();
    await expect(panel.locator("h2")).toHaveText(copy.mailtoTitle);
    const link = panel.getByRole("link", { name: actions.sendByEmail });
    const href = (await link.getAttribute("href")) ?? "";
    const url = new URL(href);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(content.contact.recipients.to);
    const params = new URLSearchParams(url.search);
    expect(params.get("cc")).toBe(content.contact.recipients.cc.join(","));
    expect(params.get("subject")).toBe(
      `${content.contact.recipients.subject} from ${contactFixture.organization}`,
    );
    const body = params.get("body") ?? "";
    for (const value of Object.values(contactFixture)) expect(body).toContain(value);
    expect(href).not.toContain("+");

    expect(requests).toBe(0);
    const names = (await readAnalytics(page)).map((event) => event.name);
    expect(names.filter((name) => name === "contact_configuration_error")).toHaveLength(1);
    expect(names).toContain("contact_mailto");
    expect(names).not.toContain("contact_submit");
  });
});
