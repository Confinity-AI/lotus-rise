import { expect } from "@playwright/test";
import { journeyRoutes, test, unsetBase } from "./helpers";

/**
 * Measured contrast, not just axe. Design-system button variants can win a specificity
 * tie against the site stylesheet depending on chunk order, which paints dark labels on
 * the dark suite band; axe reports that case as `incomplete`, so it needs its own check.
 */
const MEASURE = `
  (() => {
    const luminance = (color) => {
      const [r, g, b] = color.match(/[\\d.]+/g).slice(0, 3).map(Number).map((v) => v / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
      const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    };
    // Semi-transparent bands sit on top of the section colour, so the layers have to be
    // composited before measuring; the top layer alone is not the effective background.
    const backgroundOf = (node) => {
      const layers = [];
      let current = node;
      while (current) {
        const parts = (getComputedStyle(current).backgroundColor.match(/[\\d.]+/g) || []).map(Number);
        if (parts.length >= 3) {
          const alpha = parts.length > 3 ? parts[3] : 1;
          if (alpha > 0) {
            layers.push([parts[0], parts[1], parts[2], alpha]);
            if (alpha >= 1) break;
          }
        }
        current = current.parentElement;
      }
      let base = [255, 255, 255];
      for (let index = layers.length - 1; index >= 0; index -= 1) {
        const [r, g, b, a] = layers[index];
        base = [r * a + base[0] * (1 - a), g * a + base[1] * (1 - a), b * a + base[2] * (1 - a)];
      }
      return "rgb(" + base.map(Math.round).join(", ") + ")";
    };
    const results = [];
    // Any element carrying its own text: design-system components wrap labels in
    // generic elements, so a fixed tag list would miss them.
    const nodes = document.querySelectorAll("main *, header *, footer *");
    for (const node of nodes) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (!node.getClientRects().length) continue;
      const text = (node.textContent || "").trim();
      if (!text) continue;
      // Only leaf-ish text nodes; containers inherit their children's colours.
      const ownText = Array.from(node.childNodes).some(
        (child) => child.nodeType === 3 && child.textContent.trim(),
      );
      if (!ownText) continue;
      // WCAG 1.4.3 exempts inactive components; they are checked for legibility separately.
      const control = node.closest("button, [role=button], input, select, textarea");
      if (control && (control.disabled || control.getAttribute("aria-disabled") === "true")) {
        continue;
      }
      const size = Number.parseFloat(style.fontSize);
      const bold = Number.parseFloat(style.fontWeight) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const measured = ratio(style.color, backgroundOf(node));
      const floor = large ? 3 : 4.5;
      if (measured < floor) {
        results.push({
          text: text.slice(0, 40),
          color: style.color,
          background: backgroundOf(node),
          ratio: Number(measured.toFixed(2)),
          floor,
        });
      }
    }
    return results;
  })()
`;

test.describe("measured text contrast", () => {
  for (const route of journeyRoutes) {
    test(`${route} meets WCAG AA contrast for visible text`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => {
        for (const node of document.querySelectorAll(".reveal")) node.classList.add("is-visible");
      });
      const failures = await page.evaluate(MEASURE);
      expect(failures).toEqual([]);
    });
  }

  test("the endpoint-unset contact page is legible too", async ({ page, baseURL }) => {
    await page.goto(`${unsetBase(baseURL)}/contact/`);
    await expect(page.locator("output.form-status")).toBeVisible();
    expect(await page.evaluate(MEASURE)).toEqual([]);
  });

  test("suite module links stay legible on both the dark and light bands", async ({ page }) => {
    for (const [route, band] of [
      ["/", ".suite-modules-compact"],
      ["/janus/", ".suite-modules-light"],
    ] as const) {
      await page.goto(route);
      const link = page.locator(`${band} .suite-module-link`).first();
      const measured = await link.evaluate((node) => {
        const luminance = (color: string) => {
          const [r, g, b] = (color.match(/[\d.]+/g) as string[])
            .slice(0, 3)
            .map(Number)
            .map((v) => v / 255)
            .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        let parent: HTMLElement | null = node as HTMLElement;
        let background = "rgb(255, 255, 255)";
        while (parent) {
          const color = getComputedStyle(parent).backgroundColor;
          if (color && color !== "rgba(0, 0, 0, 0)") {
            background = color;
            break;
          }
          parent = parent.parentElement;
        }
        const [l1, l2] = [luminance(getComputedStyle(node).color), luminance(background)].sort(
          (a, b) => b - a,
        );
        return (l1 + 0.05) / (l2 + 0.05);
      });
      expect(measured, `${route} ${band}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
