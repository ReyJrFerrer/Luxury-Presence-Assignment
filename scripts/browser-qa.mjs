import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
  headless: true,
});
await fs.mkdir("/tmp/marci-qa", { recursive: true });
const errors = [];
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
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(name + ": " + e.message));
    await page.goto(`${process.env.BASE_URL || "http://127.0.0.1:4322"}/`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(2600);
    assert.equal(
      await page.locator("#doorway").isVisible(),
      false,
      "intro finishes",
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "no horizontal overflow",
    );
    await page.screenshot({ path: `/tmp/marci-qa/${name}-hero.png` });
    await page.locator("#collection").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.locator(".circular-carousel[data-ready]").waitFor();
    const before = await page.locator(".active-caption h3").textContent();
    await page.getByRole("button", { name: "Next photograph" }).click();
    await page.waitForTimeout(1500);
    assert.notEqual(
      await page.locator(".active-caption h3").textContent(),
      before,
      "next changes focused item",
    );
    await page.locator(".circular-carousel").focus();
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(1500);
    assert.equal(
      await page.locator(".active-caption h3").textContent(),
      before,
      "keyboard previous restores item",
    );
    const box = await page.locator(".circular-carousel").boundingBox();
    await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.45);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.45, {
      steps: 12,
    });
    await page.mouse.up();
    await page.waitForTimeout(1600);
    const afterDrag = await page.locator(".active-caption h3").textContent();
    assert.ok(afterDrag, "drag settles");
    await page.screenshot({ path: `/tmp/marci-qa/${name}-collection.png` });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/tmp/marci-qa/${name}-about.png` });
    await page.locator("summary").click();
    await page.locator("[data-gallery]").first().click();
    await page.locator("dialog[open]").waitFor();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").isVisible(), false);
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        Promise.all(
          imgs
            .filter(
              (img) =>
                img.getBoundingClientRect().top < innerHeight &&
                img.getBoundingClientRect().bottom > 0,
            )
            .map((img) => img.decode().catch(() => {})),
        ),
      );
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter(
            (img) =>
              img.getBoundingClientRect().top < innerHeight &&
              img.getBoundingClientRect().bottom > 0 &&
              (!img.complete || !img.naturalWidth),
          )
          .map((img) => img.src),
      );
    assert.deepEqual(broken, []);
    await page.goto(
      `${process.env.BASE_URL || "http://127.0.0.1:4322"}/collection/valley/`,
    );
    await page.locator("main h1").waitFor();
    assert.equal(
      await page.locator("main h1").textContent(),
      "A wider perspective",
    );
    await page.goto(`${process.env.BASE_URL || "http://127.0.0.1:4322"}/`);
    assert.equal(
      await page.locator("#doorway").isVisible(),
      false,
      "once per session",
    );
    report.push({
      name,
      viewport: [width, height],
      intro: "pass",
      overflow: "pass",
      carousel: "controls, keyboard, pointer drag pass",
      dialog: "pass",
      detailPage: "pass",
    });
    await context.close();
  }
  const reduced = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const p = await reduced.newPage();
  await p.goto(`${process.env.BASE_URL || "http://127.0.0.1:4322"}/`);
  assert.equal(await p.locator("#doorway").isVisible(), false);
  await p.locator("#collection").scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
  assert.equal(await p.locator(".static-collection a").count(), 7);
  assert.equal(await p.locator(".circular-carousel").count(), 0);
  await reduced.close();
  report.push({ reducedMotion: "pass" });
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const n = await nojs.newPage();
  await n.goto(`${process.env.BASE_URL || "http://127.0.0.1:4322"}/`);
  assert.equal(await n.locator("#doorway").isVisible(), false);
  assert.equal(await n.locator(".static-collection a").count(), 7);
  await nojs.close();
  report.push({ noJavaScript: "hero and all collection links available" });
  assert.deepEqual(errors, []);
  await fs.writeFile(
    "/tmp/marci-qa/report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
