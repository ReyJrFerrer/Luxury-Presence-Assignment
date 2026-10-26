import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
});
const report = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto(`${process.env.BASE_URL || "http://127.0.0.1:4322"}/`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(2500);
    await page.locator("#collection").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    report.push({
      width,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
    await context.close();
  }
  await fs.writeFile(
    "/tmp/marci-qa/accessibility.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
