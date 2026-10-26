import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
});
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    for (const selector of [
      "#perspective",
      "#collection",
      "#purpose",
      "#about",
      "#services",
      "#contact",
      "footer",
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    }
    await page
      .locator("img")
      .evaluateAll((imgs) => imgs.forEach((i) => (i.loading = "eager")));
    await page.waitForLoadState("networkidle");
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        Promise.all(
          imgs
            .filter((i) => i.getBoundingClientRect().height > 0)
            .map((i) => i.decode().catch(() => {})),
        ),
      );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `/tmp/marci-qa/${name}-final-full.png`,
      fullPage: true,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
