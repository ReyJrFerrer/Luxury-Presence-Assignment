import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||chromium.executablePath()});
await fs.mkdir('/tmp/marci-profiles',{recursive:true});
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.BASE_URL||'http://127.0.0.1:4322/',{waitUntil:'networkidle'});await page.waitForTimeout(2500);
  for (const variant of ['hero','about']) {
   const card=page.locator(`.marci-profile--${variant}`);await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
   const box=await card.boundingBox();await page.mouse.move(box.x+box.width*.8,box.y+box.height*.3);await page.waitForTimeout(500);
   const tilt=await card.evaluate(el=>el.style.getPropertyValue('--pc-rotate-y'));assert.notEqual(tilt,'0.000deg');assert.notEqual(tilt,'');
   const link=card.locator('.profile-card__contact');await link.focus();assert.equal(await link.getAttribute('href'),variant==='hero'?'#about':'tel:+12069196886');
   await card.locator('img').evaluate(img=>img.decode());await page.screenshot({path:`/tmp/marci-profiles/${width}-${variant}.png`});
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow');assert.deepEqual(errors,[]);await context.close();
 }
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();await page.goto(process.env.BASE_URL||'http://127.0.0.1:4322/');const body=page.locator('.marci-profile--hero .profile-card__body');await body.hover();assert.equal(await body.evaluate(el=>getComputedStyle(el).transform),'none');await context.close();
 const nojs=await browser.newContext({javaScriptEnabled:false});const n=await nojs.newPage();await n.goto(process.env.BASE_URL||'http://127.0.0.1:4322/');assert.equal(await n.locator('.profile-card__photo').count(),2);assert.equal(await n.locator('.profile-card__contact[href]').count(),2);await nojs.close();
 console.log('Both portraits: desktop/mobile tilt, keyboard links, no overflow, reduced motion, no-JS links and no page errors passed.');
}finally{await browser.close();}
