import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { earnings, foundingLine, foundingState, hideFoundingOffers, localNumber, money, rateText, ratesFrom } from '../../../Content/StaticFiles/partners/partners.mjs';
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

test('numbers follow the page language, like the build writes them', () => {
  assert.equal(localNumber(1200, 'en-US'), '1,200');
  assert.equal(localNumber(1200, 'de-DE'), '1.200');
  assert.equal(localNumber(120000, 'fr-FR'), '120\u202F000');
  assert.equal(localNumber(1200, 'ru-RU'), '1\u00A0200');
  assert.equal(localNumber(5, 'ar'), '٥');
  assert.equal(localNumber(100000, 'ar'), '١٠٠٬٠٠٠');
  assert.equal(localNumber(999, 'en'), '999');
});

test('money groups thousands and keeps the symbol where the language puts it', () => {
  assert.equal(money(data, 1200, 'usd', 'en-US'), '$1,200');
  assert.equal(money(data, 120000, 'usd', 'de-DE'), '120.000\u00A0$');
  assert.equal(money(data, 600, 'usd', 'ar'), '$٦٠٠');
  assert.equal(money(data, 1200, 'usd', 'ar'), '$١٬٢٠٠');
  assert.equal(money(data, 1200, 'eur', 'pt-PT'), '1.200\u00A0€');
});

test('foundingLine writes the count in the page language', () => {
  const line = '{left} من {total}';
  assert.equal(foundingLine({ left: 63, total: 100 }, { line }, 'ar'), '٦٣ من ١٠٠');
  assert.equal(foundingLine({ left: 1000, total: 1500 }, STRINGS, 'de-DE').slice(0, 13), '1.000 of 1.50');
});

test('every locale page carries the strings the script fills in', () => {
  const dir = new URL('../../../Content/Pages/', import.meta.url);
  const pages = readdirSync(dir).filter(f => /^business-card-partners(\.[a-z]{2})?\.md$/.test(f));
  assert.equal(pages.length, 13);
  for (const file of pages) {
    const text = readFileSync(new URL(file, dir), 'utf8');
    const attr = name => (text.match(new RegExp(`${name}="([^"]*)"`)) || [])[1] || '';
    assert.ok(attr('data-line').includes('{left}') && attr('data-line').includes('{total}'), `${file}: data-line`);
    assert.ok(/class="partner-result is-founding" data-founding-only/.test(text), `${file}: the 40% column can be hidden`);
    assert.ok(attr('data-per-month').includes('{price}'), `${file}: data-per-month`);
    assert.ok(attr('data-per-year').includes('{price}'), `${file}: data-per-year`);
    // The built sentence names no total: Nico can raise it, and only the live line knows it.
    const fallback = (text.match(/data-founding[^>]*>([^<]*)</) || [])[1] || '';
    assert.ok(fallback && !/[0-9\u0660-\u0669]/.test(fallback.replace(/[24]0|[٢٤]٠/g, '')), `${file}: the fallback names no number`);
    // The hero card: a big rate the script can rewrite in the page's own percent, built as 40%.
    const big = text.match(/<p class="partner-rate" data-rate data-format="([^"]*)">([^<]*)</);
    assert.ok(big && big[1].includes('{n}'), `${file}: the card's rate has a data-format`);
    assert.equal(big[2], big[1].replace('{n}', file.includes('.ar.') ? '٤٠' : '40'), `${file}: the built rate is 40%`);
    assert.ok(/class="partner-rate-count" data-founding data-line=/.test(text), `${file}: the count sits in the card`);
    assert.ok(!text.includes('partner-home'), `${file}: no Partner home illustration`);
  }
});

test('foundingState: open while deals are left, gone at zero, unknown on any failure', () => {
  assert.equal(foundingState({ left: 63, total: 100 }), 'open');
  assert.equal(foundingState({ left: 0, total: 100 }), 'gone');
  assert.equal(foundingState({ left: 0, total: 250 }), 'gone');
  assert.equal(foundingState(null), 'unknown');
  assert.equal(foundingState({ error: 'x' }), 'unknown');
  assert.equal(foundingState({ left: '0', total: 100 }), 'unknown');
});

test('at zero left, every 40% offer is hidden and the 20% figures stay', () => {
  const el = (attrs) => ({ hidden: false, attrs });
  const sentence = el('data-founding'), column = el('data-founding-only'), standard = el('');
  const all = [sentence, column, standard];
  const root = { querySelectorAll: sel => {
    assert.equal(sel, '[data-founding], [data-founding-only]');
    return all.filter(e => e.attrs === 'data-founding' || e.attrs === 'data-founding-only');
  } };
  hideFoundingOffers(root);
  assert.deepEqual(all.map(e => e.hidden), [true, true, false]);
});

test('ratesFrom: the service\'s rate and founding_rate, the built-in 20% and 40% otherwise', () => {
  assert.deepEqual(ratesFrom({ left: 63, total: 100, rate: 20, founding_rate: 40 }), { standard: 0.2, founding: 0.4 });
  assert.deepEqual(ratesFrom({ rate: 25, founding_rate: 45 }), { standard: 0.25, founding: 0.45 });
  assert.deepEqual(ratesFrom(null), { standard: 0.2, founding: 0.4 });
  assert.deepEqual(ratesFrom({ error: 'x' }), { standard: 0.2, founding: 0.4 });
  assert.deepEqual(ratesFrom({ rate: '20', founding_rate: 0 }), { standard: 0.2, founding: 0.4 });
  assert.deepEqual(ratesFrom({ rate: 30 }), { standard: 0.3, founding: 0.4 });
});

test('rateText: 40% while deals are left, 20% once none are, nothing on a failure', () => {
  const open = { left: 63, total: 100, rate: 20, founding_rate: 40 };
  const gone = { left: 0, total: 100, rate: 20, founding_rate: 40 };
  assert.equal(rateText(open, '{n}%'), '40%');
  assert.equal(rateText(gone, '{n}%'), '20%');
  assert.equal(rateText(open, '{n}\u00A0%', 'de'), '40\u00A0%');
  assert.equal(rateText(gone, '%{n}', 'tr'), '%20');
  assert.equal(rateText(open, '{n}٪', 'ar'), '٤٠٪');
  assert.equal(rateText({ left: 5, total: 100, founding_rate: 45 }, '{n}%'), '45%');
  assert.equal(rateText(null, '{n}%'), null);
  assert.equal(rateText({ error: 'x' }, '{n}%'), null);
  assert.equal(rateText(open, ''), null);
});
