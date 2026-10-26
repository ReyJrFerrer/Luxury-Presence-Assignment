import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const inventory=JSON.parse(fs.readFileSync('docs/asset-inventory.json','utf8'));
test('every supplied image is decoded and has an explicit display decision',()=>{
 const files=fs.readdirSync('Images',{recursive:true}).filter(f=>/\.(webp|png|jpe?g)$/i.test(f));
 assert.equal(inventory.length,files.length);
 for(const row of inventory){assert.ok(row.width>0&&row.height>0,row.source);assert.ok(row.decision,row.source);assert.ok(fs.existsSync(row.source));}
 assert.equal(inventory.filter(r=>r.decision.startsWith('Used:')).length,20);
});
test('every canonical subject is in the typed image manifest',()=>{
 const manifest=fs.readFileSync('src/data/assets.ts','utf8');
 for(const row of inventory.filter(r=>r.decision.startsWith('Used:')))assert.ok(manifest.includes(JSON.stringify(row.source)),row.source);
 assert.ok(manifest.includes('propertyAssociation: null'));
});
test('all built pages have titles, main landmarks, and no broken local links or image paths',()=>{
 const files=fs.readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html'));assert.equal(files.length,8);
 for(const file of files){const html=fs.readFileSync(path.join('dist',file),'utf8');assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/<main[^>]*id="main"/);for(const [,url]of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){const resolved=path.join('dist',decodeURI(url));assert.ok(fs.existsSync(resolved),`${file}: ${url}`);}}
});
