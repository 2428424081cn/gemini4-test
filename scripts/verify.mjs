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
    assert.equal(await response.text(), await readFile(new URL(file.name, directory), 'utf8'), route);
    assetCount++;
    if (file.name === 'index.html') {
      htmlCount++;
      assert.equal((await handler.fetch(new Request(`https://example.test${prefix}/`))).status, 200);
      if (prefix) {
        const redirect = await handler.fetch(new Request(`https://example.test${prefix}?preview=1`));
        assert.equal(redirect.status, 308);
        assert.equal(redirect.headers.get('Location'), `https://example.test${prefix}/?preview=1`);
      }
    }
  }
}
await check(new URL('../public/', import.meta.url));
assert.equal(htmlCount, 11);
assert.equal((await handler.fetch(new Request('https://example.test/missing'))).status, 404);
assert.equal((await handler.fetch(new Request('https://example.test/%ZZ'))).status, 400);
assert.equal((await handler.fetch(new Request('https://example.test/', { method: 'POST' }))).status, 405);
const head = await handler.fetch(new Request('https://example.test/', { method: 'HEAD' }));
assert.equal(head.status, 200);
assert.equal(await head.text(), '');
assert.match(head.headers.get('Content-Type'), /text\/html/);
console.log(`Verified ${htmlCount} HTML pages, ${assetCount} assets, redirects, HEAD, 404 and invalid requests.`);
