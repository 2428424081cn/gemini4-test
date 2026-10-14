import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import handler from '../src/index.js';

let htmlCount = 0;
let assetCount = 0;
async function check(directory, prefix = '') {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const route = `${prefix}/${file.name}`;
    if (file.isDirectory()) { await check(new URL(`${file.name}/`, directory), route); continue; }
    const response = await handler.fetch(new Request(`https://example.test${route}`));
    assert.equal(response.status, 200, route);
    const source = new TextDecoder('utf-8', { fatal: true }).decode(await readFile(new URL(file.name, directory)));
    const body = await response.text();
    assert.equal(body, source, route);
    assert.ok(!body.includes('\uFFFD'), `Corrupted text: ${route}`);
    assert.doesNotMatch(body, /[\w.+-]+@[\w.-]+\.[a-z]{2,}|mailto:|tel:|CIPHER_LIN|@AlexLinCyber|github\.com\/alex-lin-cipher/i, `Contact data: ${route}`);
    assert.match(response.headers.get('Content-Type'), /charset=utf-8/i, route);
    assetCount++;
    if (file.name.endsWith('.html')) {
      htmlCount++;
      assert.match(body, /<meta charset="UTF-8">/i, route);
      assert.match(body.match(/<title>(.*?)<\/title>/s)?.[1] || '', /[\u4e00-\u9fff]/, `Chinese title: ${route}`);
      for (const match of body.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
        if (match[1].includes('${')) continue;
        const link = new URL(match[1], `https://example.test${route}`);
        if (link.origin === 'https://example.test') {
          assert.equal((await handler.fetch(new Request(link))).status, 200, `${route} -> ${match[1]}`);
        }
      }
      for (const match of body.matchAll(/file:\s*['"]([^'"]+\.html)['"]/g)) {
        assert.equal((await handler.fetch(new Request(new URL(match[1], `https://example.test${route}`)))).status, 200, `${route} -> ${match[1]}`);
      }
      if (file.name === 'index.html') assert.equal((await handler.fetch(new Request(`https://example.test${prefix}/`))).status, 200);
      if (prefix && file.name === 'index.html') {
        const redirect = await handler.fetch(new Request(`https://example.test${prefix}?preview=1`));
        assert.equal(redirect.status, 308);
        assert.equal(redirect.headers.get('Location'), `https://example.test${prefix}/?preview=1`);
      }
    }
  }
}
await check(new URL('../public/', import.meta.url));
assert.equal(htmlCount, 11);
assert.equal(assetCount, 11);
assert.equal((await handler.fetch(new Request('https://example.test/missing'))).status, 404);
assert.equal((await handler.fetch(new Request('https://example.test/%ZZ'))).status, 400);
assert.equal((await handler.fetch(new Request('https://example.test/', { method: 'POST' }))).status, 405);
const head = await handler.fetch(new Request('https://example.test/', { method: 'HEAD' }));
assert.equal(head.status, 200);
assert.equal(await head.text(), '');
assert.match(head.headers.get('Content-Type'), /text\/html/);
console.log(`Verified ${htmlCount} HTML pages, ${assetCount} assets, redirects, HEAD, 404 and invalid requests.`);
