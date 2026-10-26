import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || chromium.executablePath(),
});
await fs.mkdir("/tmp/marci-reference", { recursive: true });
try {
  for (const [name, url] of [
    ["photo", "https://veryonlinestudio.com/demos/photo/"],
    ["original", "https://tarlac-marcimetzger-homeproject.vercel.app/"],
  ]) {
    for (const [label, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
    ]) {
      const page = await browser.newPage({ viewport: { width, height } });
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 40000 });
        await page.waitForTimeout(3000);
        await page.keyboard.press("Escape");
        await page.screenshot({
          path: `/tmp/marci-reference/${name}-${label}.png`,
        });
        await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
        await page.waitForTimeout(1200);
        await page.screenshot({
          path: `/tmp/marci-reference/${name}-${label}-scroll.png`,
        });
        console.log(name, label, "captured");
      } catch (e) {
        console.log(name, label, e.message);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
