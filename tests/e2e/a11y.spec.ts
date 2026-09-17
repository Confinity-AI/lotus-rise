import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { journeyRoutes, test } from "./helpers";

test.describe("accessibility", () => {
  for (const route of journeyRoutes) {
    test(`${route} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const blocking = results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      );
      expect(
        blocking.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => node.target.join(" ")),
        })),
      ).toEqual([]);
      // axe files prohibited ARIA on role-less elements under "incomplete", not "violations".
      // Colour-contrast incompletes are measured by contrast.spec.ts instead.
      expect(
        results.incomplete
          .filter((item) => item.id.startsWith("aria-"))
          .map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target.join(" ")) })),
      ).toEqual([]);
    });

    test(`${route} has one h1 and no skipped heading levels`, async ({ page }) => {
      await page.goto(route);
      const levels = await page.evaluate(() =>
        Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((heading) =>
          Number(heading.tagName.slice(1)),
        ),
      );
      expect(levels.filter((level) => level === 1)).toHaveLength(1);
      expect(levels[0]).toBe(1);
      for (let index = 1; index < levels.length; index += 1) {
        expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
      }
    });

    test(`${route} interactive targets are at least 44×44`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "target size is asserted on the mobile project");
      await page.goto(route);
      const small = await page.evaluate(() => {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(
            "main button, main a, main input, main select, main textarea, header a, header summary, footer a",
          ),
        );
        return nodes
          .filter((node) => {
            const style = getComputedStyle(node);
            if (style.display === "none" || style.visibility === "hidden") return false;
            if (node.classList.contains("skip-link")) return false;
            return node.getClientRects().length > 0;
          })
          .map((node) => {
            const box = node.getBoundingClientRect();
            return {
              tag: node.tagName.toLowerCase(),
              text: (node.getAttribute("aria-label") || node.textContent || "").trim().slice(0, 40),
              w: Math.round(box.width),
              h: Math.round(box.height),
            };
          })
          .filter((entry) => entry.w < 44 || entry.h < 44);
      });
      expect(small).toEqual([]);
    });
  }

  test("the mobile menu names its state", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation only");
    await page.goto("/");
    const trigger = page.locator(".mobile-nav-trigger");
    await expect(trigger).toHaveAccessibleName("Open navigation");
    await trigger.click();
    await expect(page.locator(".mobile-nav")).toHaveJSProperty("open", true);
    await expect(trigger).toHaveAccessibleName("Close navigation");
    const box = await trigger.boundingBox();
    expect(Math.min(box?.width ?? 0, box?.height ?? 0)).toBeGreaterThanOrEqual(44);
  });

  test("theatre controls, form fields and buttons keep visible focus", async ({ page }) => {
    await page.goto("/janus/evaluation/");
    const tab = page.getByRole("tab").first();
    await tab.focus();
    const outline = await tab.evaluate((node) => getComputedStyle(node).outlineStyle);
    expect(outline).not.toBe("none");
    await page.goto("/contact/");
    const field = page.getByLabel("Name");
    await field.focus();
    expect(await field.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  });
});
