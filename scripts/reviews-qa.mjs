import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath: process.env.CHROME_PATH || chromium.executablePath()});
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({viewport:{width,height:1000}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:4322', {waitUntil:'domcontentloaded'});
    await page.locator('.reviews-track').scrollIntoViewIfNeeded();
    await expect(page.locator('.review-card')).toHaveCount(8);
    await page.mouse.move(0,0);
    await expect.poll(() => page.locator('.reviews-track').evaluate(e => e.scrollLeft), {timeout:7000}).toBeGreaterThan(100);
    await page.locator('[data-review-pause]').click();
    await expect(page.locator('[data-review-pause]')).toHaveAttribute('aria-pressed','true');
    await page.locator('[data-review-next]').click();
    await page.waitForTimeout(700);
    const offset = await page.locator('.reviews-track').evaluate(e => e.scrollLeft);
    await page.waitForTimeout(4700);
    assert.equal(await page.locator('.reviews-track').evaluate(e => e.scrollLeft), offset);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('.reviews-track').evaluate(e => e.scrollLeft = 0);
    await page.locator('.reviews-track').focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => page.locator('.reviews-track').evaluate(e => e.scrollLeft)).toBeGreaterThan(0);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    await page.locator('#reviews').screenshot({path:`/tmp/marci-reviews-${width}.png`});
    console.log(`${width}px: eight reviews, autoplay, pause, next, keyboard, reduced motion, no overflow/errors passed`);
    await page.close();
  }
  const page = await browser.newPage({javaScriptEnabled:false});
  await page.goto('http://127.0.0.1:4322');
  await expect(page.locator('.review-card')).toHaveCount(8);
  await expect(page.locator('.reviews-controls')).toBeHidden();
  console.log('No-JavaScript reviews remain readable');
} finally { await browser.close(); }
