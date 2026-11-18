import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatPrice } from '../../../Content/StaticFiles/prices/prices.mjs';

// Checks the built site (run `swift run Site build` first); skips when _Site/ is missing.
const site = fileURLToPath(new URL('../../../_Site/', import.meta.url));
const built = existsSync(site);
const data = JSON.parse(readFileSync(
  new URL('../../../Content/StaticFiles/prices/prices.json', import.meta.url), 'utf8'));
const read = path => readFileSync(join(site, path), 'utf8');

function htmlFiles(dir = site, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) htmlFiles(path, out);
    else if (name.endsWith('.html')) out.push(path);
  }
  return out;
}

const SPAN = /<span class="price" data-price="([a-z_]+)" data-interval="(month|year|saving)"(?: data-quantity="(\d+)")?>([^<]*)<\/span>/g;

test('the Teams page carries region-aware seat prices in English and German', { skip: !built }, () => {
  for (const [path, lang] of [['business-card/teams/index.html', 'en'], ['de/business-card/teams/index.html', 'de']]) {
    const html = read(path);
    assert.match(html, /data-price="seat"/, `${path} has no seat price span`);
    assert.equal(html.split('/prices/prices.mjs').length - 1, 1, `${path} must load prices.mjs once`);
    // The built default is exactly what prices.mjs prints for a visitor of unknown country.
    for (const [, product, interval, quantity, text] of html.matchAll(SPAN)) {
      const a = data.amounts[product].A;
      const cents = interval === 'saving' ? Math.round(a.month * 1200) - Math.round(a.year * 100) : Math.round(a[interval] * 100);
      const amount = (cents * Number(quantity || 1)) / 100;
      assert.equal(text, formatPrice(data, amount, data.baseCurrency[product], lang), `${path}: ${product} ${interval}`);
    }
  }
});

test('no {{PRICE: token is left in any built page', { skip: !built }, () => {
  const left = htmlFiles().filter(file => readFileSync(file, 'utf8').includes('{{PRICE:'));
  assert.deepEqual(left, []);
});

const LANGS = ['', 'de/', 'ja/', 'pt/', 'zh/', 'id/', 'es/', 'fr/', 'ar/', 'it/', 'tr/', 'ru/', 'uk/'];
// The "in euros it is the same number" sentence each language had, now that the page shows the
// visitor's own currency (the first words of each are enough to find it).
const SAME_NUMBER = ['the same number', 'dieselbe Zahl', 'チーム料金の数字は同じ', 'mantém o mesmo número', '团队价格的数字相同',
  'memakai angka yang sama', 'es la misma cifra', 'affiche le même chiffre', 'بالرقم نفسه', 'è la stessa', 'aynı rakamdır',
  'цифры те же', 'цифри ті самі'];

test('Teams and Business Card pages use region-aware seat prices in every language', { skip: !built }, () => {
  for (const lang of LANGS) {
    for (const page of ['business-card/teams/index.html', 'business-card/index.html']) {
      const html = read(lang + page);
      assert.match(html, /data-price="seat"/, `${lang}${page} has no seat price span`);
      for (const phrase of SAME_NUMBER) assert.ok(!html.includes(phrase), `${lang}${page} still says "${phrase}"`);
    }
  }
});

test('the competitor comparison on Teams stays in the dollars each company listed', { skip: !built }, () => {
  for (const lang of LANGS) {
    const html = read(lang + 'business-card/teams/index.html');
    const tables = html.split('class="feature-pricing-table"').slice(1).map(t => t.split('</table>')[0]);
    assert.ok(tables.length >= 1, `${lang} Teams has no comparison table`);
    for (const table of tables) assert.doesNotMatch(table, /data-price=/, `${lang} comparison table has a region-aware price`);
  }
});
