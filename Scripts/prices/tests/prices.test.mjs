import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  countryFromLanguage, tierFor, currencyFor, priceFor, formatPrice,
} from '../../../Content/StaticFiles/prices/prices.mjs';

// The table is copied by hand from the service (web/page_plan/tiers.py). These tests pin it to
// the service's rules, so a wrong copy fails here instead of showing a visitor a wrong price.
const data = JSON.parse(readFileSync(
  new URL('../../../Content/StaticFiles/prices/prices.json', import.meta.url), 'utf8'));

// tiers.charm: the highest price ending in 9 cents that is not above the amount (in cents).
const charm = cents => Math.floor((cents - 9) / 10) * 10 + 9;
const cents = s => Math.round(Number(s) * 100);
const LEVELS = ['page', 'page_pro', 'page_ordering'];

test('amounts follow the service rules', () => {
  for (const level of LEVELS) {
    for (const interval of ['month', 'year']) {
      const a = cents(data.amounts[level].A[interval]);
      assert.equal(cents(data.amounts[level].B[interval]), charm(a * 0.7), `${level} B ${interval}`);
      assert.equal(cents(data.amounts[level].C[interval]), charm(a * 0.4), `${level} C ${interval}`);
      for (const tier of ['A', 'B', 'C']) {
        const own = cents(data.amounts[level][tier][interval]);
        assert.equal(cents(data.amounts[`team_${level}`][tier][interval]), charm(own * 0.8), `team_${level} ${tier} ${interval}`);
      }
    }
  }
  assert.equal(data.amounts.page.B.month, '3.49');
  assert.equal(data.amounts.page.C.month, '1.99');
  assert.equal(data.amounts.team_page.A.month, '3.99');
  assert.equal(data.amounts.page_pro.A.month, '14.99');
  assert.equal(data.amounts.page_ordering.A.year, '399.99');
  assert.equal(data.amounts.seat.B.year, '35.00');
  assert.equal(data.baseCurrency.page, 'eur');
  assert.equal(data.baseCurrency.seat, 'usd');
});

test('countryFromLanguage reads only the region subtag, like the service', () => {
  assert.equal(countryFromLanguage('de-AT'), 'AT');
  assert.equal(countryFromLanguage('pt_BR'), 'BR');
  assert.equal(countryFromLanguage('en'), null);
  assert.equal(countryFromLanguage(''), null);
  assert.equal(countryFromLanguage(undefined), null);
});

test('tierFor', () => {
  assert.equal(tierFor(data, 'PT'), 'B');
  assert.equal(tierFor(data, 'ES'), 'A');
  assert.equal(tierFor(data, 'IT'), 'A');
  assert.equal(tierFor(data, 'IN'), 'C');
  assert.equal(tierFor(data, null), 'A');
});

test('currencyFor falls back to the product base currency, like guess_currency', () => {
  assert.equal(currencyFor(data, 'page', 'CH'), 'eur');
  assert.equal(currencyFor(data, 'seat', 'CH'), 'usd');
  assert.equal(currencyFor(data, 'seat', 'DE'), 'eur');
  assert.equal(currencyFor(data, 'page', 'GB'), 'gbp');
  assert.equal(currencyFor(data, 'page', 'US'), 'usd');
  assert.equal(currencyFor(data, 'page', 'BR'), 'eur');
  assert.equal(currencyFor(data, 'page', null), 'eur');
});

test('priceFor', () => {
  assert.deepEqual(priceFor(data, 'page', 'month', 'PT'), { amount: 3.49, currency: 'eur' });
  assert.deepEqual(priceFor(data, 'seat', 'year', 'US', 2), { amount: 100, currency: 'usd' });
  assert.deepEqual(priceFor(data, 'seat', 'saving', 'US'), { amount: 10, currency: 'usd' });
  assert.deepEqual(priceFor(data, 'page', 'month', null), { amount: 4.99, currency: 'eur' });
});

test('formatPrice uses the shared per-language format, the same one the build uses', () => {
  assert.equal(formatPrice(data, 4.99, 'eur', 'en'), '€4.99');
  assert.equal(formatPrice(data, 50, 'usd', 'en'), '$50');
  assert.equal(formatPrice(data, 4.99, 'eur', 'de'), '4,99\u00A0€');
  assert.equal(formatPrice(data, 50, 'usd', 'ja'), '$50');
  assert.equal(formatPrice(data, 3.49, 'gbp', 'fr'), '3,49\u00A0£');
  const ar = formatPrice(data, 4.99, 'eur', 'ar');
  assert.doesNotMatch(ar, /[0-9]/);
  assert.match(ar, /\u066B/);
  assert.equal(formatPrice(data, 4.99, 'eur', 'xx'), '€4.99', 'an unknown language formats like English');
  assert.equal(formatPrice(data, 4.99, 'eur', 'pt-PT'), '4,99\u00A0€', '<html lang> carries a region');
});

test('every site language has a price format', () => {
  const site = readFileSync(new URL('../../../SiteConfig.yaml', import.meta.url), 'utf8');
  const others = site.match(/languages:\s*\[([^\]]*)\]/)[1].split(',').map(s => s.trim().replace(/"/g, ''));
  const languages = ['en', ...others];
  assert.ok(languages.length >= 13, `read ${languages.length} languages from SiteConfig.yaml`);
  for (const lang of languages) assert.ok(data.formats[lang], `no price format for ${lang}`);
});
