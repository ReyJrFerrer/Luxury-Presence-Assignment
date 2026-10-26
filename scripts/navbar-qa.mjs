import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
});
const base = process.env.BASE_URL || "http://127.0.0.1:4322";
const results = [];
await fs.mkdir("/tmp/marci-navbar", { recursive: true });
try {
  for (const width of [1440, 820, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const header = page.locator(".site-header");
    const link = header.getByRole("link", { name: "Let’s talk" });
    await page
      .locator(".specular-button canvas")
      .waitFor({ state: "attached" });
    assert.equal(
      await header.evaluate((el) => getComputedStyle(el).borderRadius),
      "35px",
    );
    assert.match(
      await header.evaluate((el) => getComputedStyle(el).backdropFilter),
      /blur\(24px\)/,
    );
    const h = await header.boundingBox();
    const l = await link.boundingBox();
    const brand = await page.locator(".brand").boundingBox();
    assert.ok(
      l.x + l.width <= h.x + h.width && l.x >= brand.x + brand.width,
      "links fit without overlap",
    );
    await page.screenshot({ path: `/tmp/marci-navbar/${width}.png` });
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > innerWidth + 1;
        })
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 15),
    }));
    assert.ok(overflow.scroll <= width, JSON.stringify(overflow));
    await link.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `/tmp/marci-navbar/${width}.png` });
    await link.focus();
    assert.notEqual(
      await link.evaluate((el) => getComputedStyle(el).outlineStyle),
      "none",
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1400);
    assert.equal(new URL(page.url()).hash, "#contact");
    assert.ok(
      await page
        .locator("#contact")
        .evaluate((el) => el.getBoundingClientRect().top >= 0),
      "anchor clears fixed header",
    );
    const axe = await new AxeBuilder({ page })
      .include(".site-header")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(
      axe.violations.map((v) => v.id),
      [],
    );
    assert.deepEqual(errors, []);
    results.push({
      width,
      glass: "24px blur / 35px radius",
      navigation: "passed",
      overflow: "none",
      axeViolations: 0,
    });
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base);
  await page.locator(".nav-contact").click();
  assert.equal(new URL(page.url()).hash, "#contact");
  await context.close();
  console.log(
    JSON.stringify({ results, noJavaScript: "contact link works" }, null, 2),
  );
} finally {
  await browser.close();
}
