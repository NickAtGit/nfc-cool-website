import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { earnings, foundingLine } from '../../../Content/StaticFiles/partners/partners.mjs';
import { countryFromLanguage, priceFor } from '../../../Content/StaticFiles/prices/prices.mjs';

const data = JSON.parse(readFileSync(
  new URL('../../../Content/StaticFiles/prices/prices.json', import.meta.url), 'utf8'));
const STRINGS = { line: '{left} of {total} founding deals left: 40% for as long as the team pays' };

test('monthly teams: 5 teams of 10 at $5 a month', () => {
  const seatPrice = { month: 5, year: 50 };
  assert.deepEqual(earnings({ teams: 5, people: 10, interval: 'month', seatPrice, rate: 0.4 }), { perMonth: 100, perYear: 1200 });
  assert.deepEqual(earnings({ teams: 5, people: 10, interval: 'month', seatPrice, rate: 0.2 }), { perMonth: 50, perYear: 600 });
});

test('yearly teams: 5 teams of 10 at $50 a year', () => {
  const seatPrice = { month: 5, year: 50 };
  const e = earnings({ teams: 5, people: 10, interval: 'year', seatPrice, rate: 0.4 });
  assert.equal(e.perYear, 1000);
  assert.equal(Math.round(e.perMonth * 100), Math.round(1000 / 12 * 100));
});

test('foundingLine: the count while deals are left', () => {
  assert.equal(foundingLine({ left: 63, total: 100, rate: 20, founding_rate: 40 }, STRINGS),
    '63 of 100 founding deals left: 40% for as long as the team pays');
});

test('foundingLine: null at zero left and on any failure', () => {
  assert.equal(foundingLine({ left: 0, total: 100 }, STRINGS), null);
  assert.equal(foundingLine(null, STRINGS), null);
  assert.equal(foundingLine(undefined, STRINGS), null);
  assert.equal(foundingLine({ error: 'x' }, STRINGS), null);
  assert.equal(foundingLine({ left: 'many', total: 100 }, STRINGS), null);
});

test('a pt visitor gets the tier B seat price: 35.00 a year', () => {
  const price = priceFor(data, 'seat', 'year', countryFromLanguage('pt-PT'));
  assert.equal(price.amount, 35);
});
