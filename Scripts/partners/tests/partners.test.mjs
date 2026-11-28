import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { countryOptions, creemCurrency, DEFAULT_COUNTRY, exactMoney, earnings, foundingEarnings, foundingLine, foundingSplit, foundingState, hideFoundingOffers, leadWith, localNumber, money, percent, rateText, ratesFrom, seatShare, TAX } from '../../../Content/StaticFiles/partners/partners.mjs';
import { countryFromLanguage, priceFor } from '../../../Content/StaticFiles/prices/prices.mjs';

const data = JSON.parse(readFileSync(
  new URL('../../../Content/StaticFiles/prices/prices.json', import.meta.url), 'utf8'));
const STRINGS = { line: '{left} of {total} founding deals left: 40% for as long as the team pays' };

// A team's price is without VAT (2026-11-27): the buyer pays VAT on top, Creem takes its 2% partner
// fee, and the share is taken from what is left (docs.creem.io/merchant-of-record/finance/payouts).
test('monthly teams: 5 teams of 10 at $5 a month, the share of $4.90', () => {
  const seatPrice = { month: 5, year: 50 };
  assert.deepEqual(earnings({ teams: 5, people: 10, interval: 'month', seatPrice, rate: 0.4 }), { perMonth: 98, perYear: 1176 });
  assert.deepEqual(earnings({ teams: 5, people: 10, interval: 'month', seatPrice, rate: 0.2 }), { perMonth: 49, perYear: 588 });
});

test('yearly teams: 5 teams of 10 at $50 a year, the share of $49', () => {
  const seatPrice = { month: 5, year: 50 };
  const e = earnings({ teams: 5, people: 10, interval: 'year', seatPrice, rate: 0.4 });
  assert.equal(e.perYear, 980);
  assert.equal(Math.round(e.perMonth * 100), Math.round(980 / 12 * 100));
});

test('seatShare: only the 2% fee comes off the price, in cents that add up to it', () => {
  assert.deepEqual(seatShare(50), { fee: 1, base: 49 });
  assert.deepEqual(seatShare(35), { fee: 0.7, base: 34.3 });
  for (const price of [50, 35, 5, 20, 3.5]) {
    const s = seatShare(price);
    assert.equal(Math.round((s.fee + s.base) * 100), Math.round(price * 100));
  }
});

test('a German team pays its 19% VAT on top: 10 seats at 50 earn 20% of 49 each, as anywhere', () => {
  const seatPrice = { month: 5, year: 50 };
  assert.equal(earnings({ teams: 1, people: 10, interval: 'year', seatPrice, rate: 0.2 }).perYear, 98);
  assert.ok(TAX.DE > 0);  // the table stays: it is the country list
});

test('the founding column: at most the places left at 40%, the other teams at 20%', () => {
  assert.deepEqual(foundingSplit(20, null), { founding: 20, standard: 0 });
  assert.deepEqual(foundingSplit(20, 100), { founding: 20, standard: 0 });
  assert.deepEqual(foundingSplit(20, 5), { founding: 5, standard: 15 });
  assert.deepEqual(foundingSplit(20, 0), { founding: 0, standard: 20 });
  const seatPrice = { month: 5, year: 50 };
  const rates = { standard: 0.2, founding: 0.4 };
  const args = { people: 25, interval: 'year', seatPrice, rates };
  assert.equal(foundingEarnings({ ...args, teams: 20, left: null }).perYear, 9800);
  // 5 teams at 40% (2,450) and 15 at 20% (3,675).
  assert.equal(foundingEarnings({ ...args, teams: 20, left: 5 }).perYear, 6125);
});

test('the calculator starts in the United States, at 0% tax, and lists every country it knows', () => {
  assert.equal(DEFAULT_COUNTRY, 'US');
  assert.equal(TAX.US, 0);
  const options = countryOptions('de');
  assert.equal(options.length, Object.keys(TAX).length);
  assert.ok(options.some(o => o.code === 'US' && o.name === 'Vereinigte Staaten'));
  assert.ok(options.some(o => o.code === 'DE' && o.name === 'Deutschland'));
  const names = options.map(o => o.name);
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'de')));
  for (const code of Object.keys(TAX)) {
    assert.ok(data.amounts.seat[data.tierByCountry[code] || 'A'], `${code} has a seat price`);
  }
});

test("percent: the page's own percent and decimal mark", () => {
  assert.equal(percent(data, 19, '{n}%', 'en'), '19%');
  assert.equal(percent(data, 25.5, '{n}\u00A0%', 'de'), '25,5\u00A0%');
  assert.equal(percent(data, 0, '%{n}', 'tr'), '%0');
  assert.equal(percent(data, 20, '{n}٪', 'ar'), '٢٠٪');
});

test('Creem charges in USD where the site prices in dollars, in EUR everywhere else', () => {
  assert.equal(creemCurrency(data, 'US'), 'usd');
  assert.equal(creemCurrency(data, 'RO'), 'usd');
  assert.equal(creemCurrency(data, 'BR'), 'usd');
  assert.equal(creemCurrency(data, 'DE'), 'eur');
  assert.equal(creemCurrency(data, 'GB'), 'eur');
});

test('exactMoney keeps the cents, in the page language', () => {
  assert.equal(exactMoney(data, 50, 'usd', 'en'), '$50.00');
  assert.equal(exactMoney(data, 7.98, 'eur', 'de'), '7,98\u00A0€');
  assert.equal(exactMoney(data, 9.8, 'usd', 'ar'), '$٩٫٨٠');
});

// docs.creem.io/merchant-of-record/supported-countries: no purchases from these.
const CREEM_BLOCKED = 'AF AQ BY MM BI CF TD CU CD CG ER HT IR IQ LY ML AN NI KP RU SO SS SD SY VE YE ZW'.split(' ');

test('the list holds no country Creem blocks, and every rate is a percent', () => {
  for (const code of CREEM_BLOCKED) assert.ok(!(code in TAX), `${code} is blocked by Creem`);
  for (const [code, rate] of Object.entries(TAX)) {
    assert.match(code, /^[A-Z]{2}$/);
    assert.ok(rate >= 0 && rate < 30, `${code}: ${rate}`);
  }
  assert.ok(Object.keys(TAX).length > 120);
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
    // The built sentence names no total: Nico can raise it, and only the live line knows it.
    const fallback = (text.match(/data-founding[^>]*>([^<]*)</) || [])[1] || '';
    assert.ok(fallback && !/[0-9\u0660-\u0669]/.test(fallback.replace(/[24]0|[٢٤]٠/g, '')), `${file}: the fallback names no number`);
    // The hero card: a big rate the script can rewrite in the page's own percent, built as 40%.
    const big = text.match(/<p class="partner-rate" data-rate data-format="([^"]*)">([^<]*)</);
    assert.ok(big && big[1].includes('{n}'), `${file}: the card's rate has a data-format`);
    assert.equal(big[2], big[1].replace('{n}', file.includes('.ar.') ? '٤٠' : '40'), `${file}: the built rate is 40%`);
    assert.ok(/class="partner-rate-count" data-founding data-line=/.test(text), `${file}: the count sits in the card`);
    assert.ok(!text.includes('partner-home'), `${file}: no Partner home illustration`);
    assert.ok(!text.includes('partner-kicker'), `${file}: no kicker above the h1`);
    // The calculator starts yearly, at 20 teams of 25 people, in the United States (never guessed).
    assert.ok(text.includes('min="1" max="50" value="20"'), `${file}: 20 teams to start`);
    assert.ok(text.includes('min="2" max="100" value="25"'), `${file}: 25 people to start`);
    assert.ok(/<select id="partner-country" class="nfc-reader-select" data-in="country"><option value="US" selected>[^<]+<\/option><\/select>/.test(text), `${file}: the country of sale, the United States`);
    // One person's payment as a table: price, Creem's fee, the base, the share at 20% and 40%.
    // No tax row: a team's price is without VAT, which the buyer pays on top (2026-11-27).
    assert.ok(!text.includes('data-tax-row') && !text.includes('b-tax'), `${file}: no tax row`);
    for (const key of ['b-price', 'b-fee', 'b-base', 'b-std', 'b-found']) {
      assert.ok(new RegExp(`<dd data-out="${key}">[^<]+</dd>`).test(text), `${file}: ${key}`);
    }
    assert.ok(/data-out="b-heading" data-year="[^"]+" data-month="[^"]+"/.test(text), `${file}: the table's heading for each period`);
    for (const key of ['std', 'found']) {
      assert.ok(new RegExp(`data-label="${key}" data-line="[^"]*\\{n\\}[^"]*"`).test(text), `${file}: ${key} label`);
    }
    assert.ok(/<div data-founding-only><dt>/.test(text), `${file}: the 40% row hides with the founding offers`);
    // How teams pay is the kit's segmented control.
    assert.ok(text.includes('<div class="segmented" role="group"'), `${file}: the segmented control`);
    assert.ok(!text.includes('partner-toggle'), `${file}: no old toggle`);
    const mixed = (text.match(/data-out="mixed" data-line="([^"]*)" hidden>/) || [])[1] || '';
    assert.ok(mixed.includes('{left}') && mixed.includes('{rate}'), `${file}: the founding note`);
    // No sentence between the heading and the calculator.
    assert.ok(/\n## [^\n]+\n\n<div class="partner-calc"/.test(text), `${file}: nothing between the heading and the calculator`);
    assert.ok(/<button type="button" data-interval="year" aria-pressed="true">[^<]*<\/button>\n<button type="button" data-interval="month" aria-pressed="false">/.test(text), `${file}: Pay yearly first and chosen`);
    for (const key of ['found', 'std']) {
      assert.ok(new RegExp(`<p class="partner-big" data-period="year">[^<]*<span data-out="${key}-year">[^<]+</span>[^<]*</p><p data-period="month">[^<]*<span data-out="${key}-month">`).test(text), `${file}: ${key} leads with the year`);
    }
    // The calls to action are the shared store-style badges (Sources/Site/Helpers/TeamButton.swift).
    assert.ok(text.includes('<div class="landing-store-buttons partner-actions">{{PARTNER_BUTTON}}{{DEMO_BUTTON}}</div>'), `${file}: the hero's two badges`);
    assert.ok(/<section class="landing-final-cta">[\s\S]*<div class="landing-store-buttons">\{\{PARTNER_BUTTON\}\}<\/div>/.test(text), `${file}: the closing badge`);
    assert.ok(!text.includes('landing-cta-button'), `${file}: no outline buttons left`);
    assert.ok(!/landing-cta-title">[^<]*NFC\.cool/.test(text), `${file}: no wordmark in the closing heading`);
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

test('the built defaults: 20 teams of 25 at $50 a year in the United States', () => {
  const seatPrice = { month: 5, year: 50 };
  assert.deepEqual(earnings({ teams: 20, people: 25, interval: 'year', seatPrice, rate: 0.4 }), { perMonth: 816.67, perYear: 9800 });
  assert.deepEqual(earnings({ teams: 20, people: 25, interval: 'year', seatPrice, rate: 0.2 }), { perMonth: 408.33, perYear: 4900 });
});

test('leadWith: the chosen period is the big first line, the other follows small', () => {
  const line = period => ({ period, classes: new Set(period === 'year' ? ['partner-big'] : []),
    get classList() { const c = this.classes; return { add: x => c.add(x), remove: x => c.delete(x) }; } });
  const card = { lines: [line('year'), line('month')],
    querySelector(sel) {
      const want = sel.match(/data-period="(\w+)"/)[1];
      return sel.includes(':not') ? this.lines.find(l => l.period !== want) : this.lines.find(l => l.period === want);
    } };
  for (const l of card.lines) {
    l.compareDocumentPosition = other => (card.lines.indexOf(other) > card.lines.indexOf(l) ? 4 : 2);
    l.parentNode = { insertBefore: (a, b) => { card.lines.splice(card.lines.indexOf(a), 1); card.lines.splice(card.lines.indexOf(b), 0, a); } };
  }
  leadWith(card, 'month');
  assert.deepEqual(card.lines.map(l => l.period), ['month', 'year']);
  assert.deepEqual(card.lines.map(l => l.classes.has('partner-big')), [true, false]);
  leadWith(card, 'year');
  assert.deepEqual(card.lines.map(l => l.period), ['year', 'month']);
  assert.deepEqual(card.lines.map(l => l.classes.has('partner-big')), [true, false]);
});
