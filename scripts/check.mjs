import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.name==='.git'?[]:e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)])}
const pages=walk(root).filter(f=>f.endsWith('.html'));let links=0;
for(const file of pages){const html=fs.readFileSync(file,'utf8');assert.match(html,/<html lang="(fa|en)" dir="(rtl|ltr)"/);assert.match(html,/<meta name="viewport"/);for(const [,link]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|#)/.test(link))continue;assert.ok(fs.existsSync(path.resolve(path.dirname(file),link)),`Broken reference ${file}: ${link}`);links++}if(!file.endsWith('404.html')){assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.match(html,/id="main"/);assert.match(html,/class="lang"/)}for(const tag of html.matchAll(/<img\b[^>]*>/g))assert.match(tag[0],/alt="[^"]+"/)}
const a=JSON.parse(fs.readFileSync(path.join(root,'content/articles.json')));assert.equal(new Set(a.map(x=>x.slug)).size,a.length);assert.ok(a.every(x=>typeof x.sample==='boolean'&&x.fa.body.length&&x.en.body.length));
globalThis.document={documentElement:{classList:{add(){}}},querySelector(){return null},addEventListener(){}};
const {normalize}=await import('../assets/app.js');assert.equal(normalize('يادداشت كاربردي'),'یادداشت کاربردی');assert.equal(normalize('  STATIC   Web '),'static web');assert.equal(normalize('می\u200cشود'),'می شود');
console.log(`PASS: ${pages.length} pages, ${links} local links/assets, bilingual structure, photo alt text, sample labels, Persian normalization.`);
