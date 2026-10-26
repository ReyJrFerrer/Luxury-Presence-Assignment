import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.BASE_URL || "http://127.0.0.1:4322";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
});
await fs.mkdir("/tmp/marci-flex", { recursive: true });
const report = [];
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 820, 1180],
    ["mobile", 390, 844],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile: name === "mobile",
      hasTouch: name === "mobile",
    });
    await context.addInitScript(() =>
      sessionStorage.setItem("marci-arrival", "seen"),
    );
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator("#collection").scrollIntoViewIfNeeded();
    const carousel = page.locator(".flex-carousel");
    await carousel.waitFor();
    await page.screenshot({ path: `/tmp/marci-flex/${name}-entry.png` });
    await page
      .locator('.flex-carousel[data-entry="complete"]')
      .waitFor({ timeout: 20000 });
    assert.equal(
      await page.locator(".flex-carousel__caption,.active-caption").count(),
      0,
    );
    assert.equal(
      await page.getByText("Explore this view", { exact: false }).count(),
      0,
    );
    await carousel.focus();
    await page.keyboard.press("Home");
    await page.waitForTimeout(1300);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1600);
    await page.keyboard.press("Enter");
    const dialog = page.locator(".collection-dialog[open]");
    await dialog.waitFor();
    assert.equal(await dialog.locator("h2").textContent(), "Room for the view");
    await dialog.locator("img").evaluate((img) => img.decode());
    assert.match(
      await dialog.textContent(),
      /Sitting room with expansive windows/,
    );
    assert.match(await dialog.textContent(), /Imagine what comes next/);
    assert.equal(
      await dialog.locator("a").getAttribute("href"),
      "tel:+12069196886",
    );
    await page.screenshot({ path: `/tmp/marci-flex/${name}-popup.png` });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator(".collection-dialog").isVisible(), false);
    assert.equal(
      await carousel.evaluate((el) => el === document.activeElement),
      true,
      "focus restored",
    );
    await carousel.click({
      position: { x: width / 2, y: (await carousel.boundingBox()).height / 2 },
    });
    await dialog.waitFor();
    await dialog.getByRole("button", { name: "Close photograph" }).click();
    assert.equal(await page.locator(".collection-dialog").isVisible(), false);
    const box = await carousel.boundingBox();
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, {
      steps: 10,
    });
    await page.mouse.up();
    await page.waitForTimeout(1600);
    assert.equal(
      await page.locator(".collection-dialog").isVisible(),
      false,
      "drag does not open popup",
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "no horizontal overflow",
    );
    await page.screenshot({ path: `/tmp/marci-flex/${name}-collection.png` });
    assert.deepEqual(errors, []);
    report.push({
      name,
      entry: "completed",
      keyboard: "windows image opens correct popup",
      click: "opens popup",
      drag: "does not open popup",
      close: "Escape/button/focus restoration pass",
      errors,
    });
    await context.close();
  }
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(base);
  await page.locator("#collection").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  assert.equal(await page.locator(".static-collection a").count(), 7);
  assert.equal(await page.locator(".flex-carousel").count(), 0);
  await page.locator(".static-collection a").nth(1).click();
  await page.locator(".collection-dialog[open]").waitFor();
  assert.equal(
    await page.locator(".collection-dialog h2").textContent(),
    "Room for the view",
  );
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const n = await nojs.newPage();
  await n.goto(base);
  assert.equal(await n.locator(".static-collection a[href]").count(), 7);
  await nojs.close();
  report.push({
    reducedMotion: "static images still open popup",
    noJavaScript: "seven direct image links remain usable",
  });
  await fs.writeFile(
    "/tmp/marci-flex/report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
