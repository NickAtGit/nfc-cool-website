// The partner page: the earnings calculator and the live founding count.
// The calculator's country of sale is picked by the visitor (the United States to start, never
// guessed from the browser): it sets the seat price (its tier and currency in /prices/prices.json,
// like every other price on the site) and the tax Creem takes out of that price. The hero card's
// rate and count come from the service. Without JS, or when either fails, the page keeps its
// built text: 40% over a founding sentence with no number, and the United States example.
import { priceFor, currencyFor, formatPrice } from '../prices/prices.mjs';

const FOUNDING_URL = 'https://business.nfc.cool/partners/founding.json';
// The rates the calculator starts with, and keeps when the service's answer has none: 20% and the
// founding 40%. The service's founding.json carries both (`rate`, `founding_rate`, whole percents).
const STANDARD = 0.2;
const FOUNDING = 0.4;

// Creem sells teams at tax-inclusive prices: it takes the buyer's VAT or sales tax out of the
// price, then its 2% affiliate platform fee, and the partner's share is taken from what is left
// (docs.creem.io/merchant-of-record/finance/payouts). Creem's own 3.9% + 0.40 is not taken off
// before the share.
export const PARTNER_FEE = 0.02;

// The countries the calculator offers and their standard national VAT, GST or sales tax rate, in
// percent: every country Creem sells to (all but the ones it blocks, docs.creem.io supported
// countries) whose rate is clear. A copy of the service's web/partners/vat.py (STANDARD_RATES):
// change the two together. 0 where there is no national one (the United States, where the
// calculator starts; Brazil; the Gulf states without VAT); Canada is the federal GST only.
export const TAX = {
  // Europe
  AD: 4.5, AL: 20, AM: 20, AT: 20, AZ: 18, BA: 17, BE: 21, BG: 20, CH: 8.1, CY: 19, CZ: 21, DE: 19,
  DK: 25, EE: 24, ES: 21, FI: 25.5, FR: 20, GB: 20, GE: 18, GR: 24, HR: 25, HU: 27, IE: 23, IS: 24,
  IT: 22, LI: 8.1, LT: 21, LU: 17, LV: 21, MC: 20, MD: 20, ME: 21, MK: 18, MT: 18, NL: 21, NO: 25,
  PL: 23, PT: 23, RO: 21, RS: 20, SE: 25, SI: 22, SK: 23, TR: 20, UA: 20, XK: 18,
  // The Americas
  US: 0, CA: 5, MX: 16, AR: 21, BB: 17.5, BO: 13, BR: 0, BS: 10, BZ: 12.5, CL: 19, CO: 19, CR: 13,
  DO: 18, EC: 15, GT: 12, GY: 14, HN: 15, JM: 15, PA: 7, PE: 18, PY: 10, SR: 10, SV: 13, TT: 12.5,
  UY: 22,
  // Asia and the Pacific
  AU: 10, BD: 15, BN: 0, FJ: 15, HK: 0, ID: 11, IN: 18, JP: 10, KG: 12, KH: 10, KR: 10, KZ: 16,
  LA: 10, LK: 18, MN: 10, MO: 0, MV: 8, MY: 8, NP: 13, NZ: 15, PG: 10, PH: 12, SG: 9, TH: 7, TW: 5,
  UZ: 12, VN: 10,
  // The Middle East and Africa
  AE: 5, AO: 14, BF: 18, BH: 10, BJ: 18, BW: 14, CI: 18, CM: 19.25, CV: 15, DZ: 19, EG: 14, ET: 15,
  GA: 18, GM: 15, IL: 18, JO: 16, KE: 16, KW: 0, LB: 11, LS: 15, MA: 20, MG: 20, MU: 15, MW: 16.5,
  MZ: 16, NA: 15, NG: 7.5, OM: 5, QA: 0, RW: 18, SA: 15, SC: 15, SL: 15, SN: 18, SZ: 15, TG: 18,
  TN: 19, TZ: 18, UG: 18, ZA: 15, ZM: 16,
};
export const DEFAULT_COUNTRY = 'US';

// The currency Creem charges a team in a country: it sells in EUR and USD only, so USD where the
// site's price is in dollars and EUR everywhere else, the UK included. The service's
// page_plan.creem_catalog.currency_for.
export function creemCurrency(data, country) {
  return currencyFor(data, 'seat', country) === 'usd' ? 'usd' : 'eur';
}

// An amount with its cents, for the per-person table: 50.00, 7.98 (prices.mjs's formatPrice
// writes whole amounts without them).
export function exactMoney(data, amount, currency, locale) {
  const format = data.formats[String(locale).split(/[-_]/)[0].toLowerCase()] || data.formats.en;
  let number = amount.toFixed(2).replace('.', format.decimal);
  if (format.digits) number = number.replace(/[0-9]/g, d => format.digits[d]);
  const symbol = data.symbols[currency];
  return format.after.includes(currency) ? `${number} ${symbol}` : `${symbol}${number}`;
}

const cents = n => Math.round(n * 100) / 100;

// One person's payment and what is left of it for the partner's share: the tax in it, Creem's
// partner fee, and the base the share is taken from. Each in cents, so the three add up to the
// price the way the page writes them.
export function seatShare(price, tax) {
  const net = price / (1 + tax / 100);
  const taxAmount = cents(price - net);
  const fee = cents(net * PARTNER_FEE);
  return { taxAmount, fee, base: cents(price - taxAmount - fee) };
}

// How each site language groups thousands and writes digits. Mirrors the build's
// Sources/Site/Helpers/LocaleNumber.swift, so a figure the script writes looks like one the build
// wrote. prices.json's formats leave grouping out because no price reaches four digits; the
// calculator's yearly totals do.
const NUMBER_STYLES = {
  en: { grouping: ',' }, de: { grouping: '.' }, ja: { grouping: ',' }, pt: { grouping: '.' },
  zh: { grouping: ',' }, id: { grouping: '.' }, es: { grouping: '.' }, fr: { grouping: ' ' },
  ar: { grouping: '٬', digits: '٠١٢٣٤٥٦٧٨٩' }, it: { grouping: '.' }, tr: { grouping: '.' },
  ru: { grouping: ' ' }, uk: { grouping: ' ' },
};
const styleFor = locale => NUMBER_STYLES[String(locale || 'en').split(/[-_]/)[0].toLowerCase()] || NUMBER_STYLES.en;
const groupRun = (run, sep) => run.replace(/(?<=.)(?=(?:.{3})+$)/gu, sep);

// A whole number the way the page's language writes it: 1,200 (en), 1.200 (de), ١٬٢٠٠ (ar).
export function localNumber(n, locale) {
  const style = styleFor(locale);
  const text = groupRun(String(Math.round(Math.abs(n))), style.grouping);
  const signed = n < 0 ? `-${text}` : text;
  return style.digits ? signed.replace(/[0-9]/g, d => style.digits[d]) : signed;
}

// A whole amount of money: prices.mjs's formatPrice (symbol side, digits), with thousands grouped.
export function money(data, amount, currency, locale) {
  const text = formatPrice(data, Math.round(amount), currency, locale);
  return text.replace(/[0-9٠-٩]{4,}/u, run => groupRun(run, styleFor(locale).grouping));
}

// A tax rate in the page's own percent ("{n}%", "{n} %", "%{n}", "{n}٪"), with the language's
// decimal mark when the rate has one: 19%, 25,5 %, ٢٠٪.
export function percent(data, n, format, locale) {
  const lang = String(locale || 'en').split(/[-_]/)[0].toLowerCase();
  const f = data.formats[lang] || data.formats.en;
  let text = Number.isInteger(n) ? localNumber(n, locale) : String(n).replace('.', f.decimal);
  if (!Number.isInteger(n) && f.digits) text = text.replace(/[0-9]/g, d => f.digits[d]);
  return format.replace('{n}', text);
}

// Partner earnings from `teams` teams of `people` seats. A yearly team pays seatPrice.year per
// seat once a year, a monthly team pays seatPrice.month twelve times; `tax` is the country's rate
// in percent and `rate` the partner's share as a fraction, taken from what tax and Creem's partner
// fee leave of each payment.
export function earnings({ teams, people, interval, seatPrice, rate, tax = 0 }) {
  const seats = teams * people;
  const perYear = interval === 'year'
    ? seats * seatShare(seatPrice.year, tax).base * rate
    : seats * seatShare(seatPrice.month, tax).base * rate * 12;
  return { perMonth: cents(perYear / 12), perYear: cents(perYear) };
}

// How many of `teams` teams can still be founding deals: all of them while the service's count is
// unknown, at most the places left once it is known. The rest earn the standard rate.
export function foundingSplit(teams, left) {
  const founding = Number.isInteger(left) && left >= 0 ? Math.min(teams, left) : teams;
  return { founding, standard: teams - founding };
}

// The founding column: its founding teams at the founding rate, any teams past the places left at
// the standard rate.
export function foundingEarnings({ teams, left, rates, ...args }) {
  const split = foundingSplit(teams, left);
  const a = earnings({ ...args, teams: split.founding, rate: rates.founding });
  const b = earnings({ ...args, teams: split.standard, rate: rates.standard });
  return { perMonth: cents(a.perMonth + b.perMonth), perYear: cents(a.perYear + b.perYear), split };
}

// The countries for the dropdown, named in the page's language and sorted the way it sorts.
export function countryOptions(locale, codes = Object.keys(TAX)) {
  let names = null;
  try { names = new Intl.DisplayNames([locale], { type: 'region' }); } catch { /* codes stay */ }
  return codes
    .map(code => ({ code, name: (names && names.of(code)) || code }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}

// The calculator's rates as fractions, from the service's answer: its `rate` and `founding_rate`
// (whole percents, 20 and 40 today), each falling back to the built-in figure when it is missing
// or not a percent.
export function ratesFrom(answer) {
  const pct = v => (Number.isInteger(v) && v > 0 && v <= 100 ? v / 100 : null);
  return {
    standard: pct(answer && answer.rate) ?? STANDARD,
    founding: pct(answer && answer.founding_rate) ?? FOUNDING,
  };
}

// What the service's answer says about the founding deals: 'open' (some left, show the count),
// 'gone' (a valid answer with none left: only 20% may show), or 'unknown' (no answer, or one that
// is not what the service sends: keep the built page, whose sentence names no number).
export function foundingState(answer) {
  if (!answer || !Number.isInteger(answer.left) || !Number.isInteger(answer.total)) return 'unknown';
  return answer.left > 0 ? 'open' : 'gone';
}

// The founding sentence with the live count, or null when it should not change: no deals left
// (the sentence is hidden then, see wireFounding) or no usable answer. `locale` is the page's
// language, so the count is written the way the rest of the page writes numbers.
export function foundingLine(answer, strings, locale = 'en') {
  if (foundingState(answer) !== 'open') return null;
  return strings.line
    .replace('{left}', localNumber(answer.left, locale))
    .replace('{total}', localNumber(answer.total, locale));
}

// The hero card's big rate, or null when it should stay as built: the founding rate while deals are
// left, the standard rate once none are, nothing on a failed or odd answer (the built card keeps
// its 40% beside a sentence that names no number). `format` is the page's own way of writing a
// percent, with {n} for the number ("{n}%", "{n} %", "%{n}", "{n}٪").
export function rateText(answer, format, locale = 'en') {
  const state = foundingState(answer);
  if (state === 'unknown' || !format || !format.includes('{n}')) return null;
  const rates = ratesFrom(answer);
  const rate = state === 'open' ? rates.founding : rates.standard;
  return format.replace('{n}', localNumber(Math.round(rate * 100), locale));
}

const pageLocale = root => (root.documentElement && root.documentElement.lang) || 'en';

// A result card leads with the chosen period: its line is the big one and comes first, the other
// period's line follows, small. Lines are the card's `[data-period]` paragraphs.
export function leadWith(card, interval) {
  const lead = card.querySelector(`[data-period="${interval}"]`);
  const other = card.querySelector(`[data-period]:not([data-period="${interval}"])`);
  if (!lead || !other) return;
  lead.classList.add('partner-big');
  other.classList.remove('partner-big');
  if (other.compareDocumentPosition(lead) & 4) other.parentNode.insertBefore(lead, other);
}

// Returns { setFounding }, so the service's answer (rates and places left) repaints the figures.
function wireCalculator(root, data) {
  const box = root.querySelector('[data-partner-calc]');
  if (!box) return null;
  let rates = { standard: STANDARD, founding: FOUNDING };
  let left = null;
  const locale = pageLocale(root);
  // The way the page writes a percent (the hero card's); the per-person table's own words sit on
  // its labels (data-year, data-month, data-line).
  const rateEl = root.querySelector('[data-rate]');
  const pctFormat = (rateEl && rateEl.getAttribute('data-format')) || '{n}%';
  const $ = sel => box.querySelector(sel);
  // The built page's own defaults: the sliders' values, yearly, and the United States.
  const state = {
    teams: Number(($('[data-in=teams]') || {}).value) || 20,
    people: Number(($('[data-in=people]') || {}).value) || 25,
    interval: (box.querySelector('[data-interval][aria-pressed="true"]') || { getAttribute: () => 'year' }).getAttribute('data-interval'),
    country: DEFAULT_COUNTRY,
  };
  const set = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };

  const select = $('[data-in=country]');
  if (select) {
    select.replaceChildren(...countryOptions(locale).map(({ code, name }) => {
      const option = root.createElement('option');
      option.value = code;
      option.textContent = name;
      option.selected = code === state.country;
      return option;
    }));
    select.addEventListener('change', e => { state.country = e.target.value; paint(); });
  }

  function paint() {
    const { country, interval } = state;
    const currency = creemCurrency(data, country);
    const seatPrice = {
      month: priceFor(data, 'seat', 'month', country).amount,
      year: priceFor(data, 'seat', 'year', country).amount,
    };
    const tax = TAX[country] ?? 0;
    const args = { teams: state.teams, people: state.people, interval, seatPrice, tax };
    const found = foundingEarnings({ ...args, left, rates });
    const std = earnings({ ...args, rate: rates.standard });
    set('[data-out=teams]', localNumber(state.teams, locale));
    set('[data-out=people]', localNumber(state.people, locale));
    set('[data-out=found-month]', money(data, found.perMonth, currency, locale));
    set('[data-out=found-year]', money(data, found.perYear, currency, locale));
    set('[data-out=std-month]', money(data, std.perMonth, currency, locale));
    set('[data-out=std-year]', money(data, std.perYear, currency, locale));
    const mixed = $('[data-out=mixed]');
    if (mixed) {
      mixed.hidden = found.split.standard === 0;
      mixed.textContent = (mixed.getAttribute('data-line') || '')
        .replace('{left}', localNumber(found.split.founding, locale))
        .replace('{rate}', localNumber(Math.round(rates.standard * 100), locale));
    }
    // The per-person table: one person's payment for the chosen period, what comes off it, and
    // the partner's share at each rate.
    const price = seatPrice[interval];
    const share = seatShare(price, tax);
    const exact = amount => exactMoney(data, amount, currency, locale);
    const pct = n => percent(data, n, pctFormat, locale);
    const heading = $('[data-out=b-heading]');
    if (heading) heading.textContent = heading.getAttribute(`data-${interval}`) || heading.textContent;
    set('[data-out=b-price]', exact(price));
    // No tax row where the country has none (the United States): a line of zeros says nothing.
    const taxRow = $('[data-tax-row]');
    if (taxRow) taxRow.hidden = tax === 0;
    set('[data-out=b-tax]', `−${exact(share.taxAmount)}`);
    set('[data-out=b-fee]', `−${exact(share.fee)}`);
    set('[data-out=b-base]', exact(share.base));
    set('[data-out=b-std]', exact(cents(share.base * rates.standard)));
    set('[data-out=b-found]', exact(cents(share.base * rates.founding)));
    box.querySelectorAll('[data-line][data-label]').forEach(label => {
      const n = { tax, std: Math.round(rates.standard * 100), found: Math.round(rates.founding * 100) }[label.getAttribute('data-label')];
      label.textContent = label.getAttribute('data-line').replace('{n}', pct(n));
    });
    box.querySelectorAll('[data-interval]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.getAttribute('data-interval') === interval)));
    box.querySelectorAll('.partner-result').forEach(card => leadWith(card, interval));
  }

  $('[data-in=teams]').addEventListener('input', e => { state.teams = Number(e.target.value); paint(); });
  $('[data-in=people]').addEventListener('input', e => { state.people = Number(e.target.value); paint(); });
  box.querySelectorAll('[data-interval]').forEach(b =>
    b.addEventListener('click', () => { state.interval = b.getAttribute('data-interval'); paint(); }));
  paint();
  return {
    setFounding(answer) {
      rates = ratesFrom(answer);
      left = foundingState(answer) === 'unknown' ? null : answer.left;
      paint();
    },
  };
}

// Everything on the page that offers 40% as available: the hero card's count ([data-founding]) and
// the calculator's founding column ([data-founding-only]). Hidden once the service says none are
// left, so only the 20% figures remain; an error leaves them as built.
export function hideFoundingOffers(root) {
  root.querySelectorAll('[data-founding], [data-founding-only]').forEach(el => { el.hidden = true; });
}

// The service's founding answer, or null when it fails.
async function fetchFounding() {
  try {
    const res = await fetch(FOUNDING_URL, { headers: { Accept: 'application/json' } });
    return res.ok ? await res.json() : null;
  } catch { return null; }
}

// The hero card: open, the founding rate and the live count; gone, the standard rate and no count
// (and the calculator's founding column hidden); unknown, the card as built.
function wireFounding(root, answer) {
  const locale = pageLocale(root);
  const big = root.querySelector('[data-rate]');
  const rate = big ? rateText(answer, big.getAttribute('data-format') || '', locale) : null;
  if (rate) big.textContent = rate;
  if (foundingState(answer) === 'gone') { hideFoundingOffers(root); return; }
  const el = root.querySelector('[data-founding]');
  if (!el) return;
  const strings = { line: el.getAttribute('data-line') || '' };
  const line = strings.line ? foundingLine(answer, strings, locale) : null;
  if (line) el.textContent = line;
}

export async function boot(root) {
  const founding = fetchFounding();
  founding.then(answer => wireFounding(root, answer));
  try {
    const res = await fetch('/prices/prices.json');
    if (!res.ok) return;
    const calc = wireCalculator(root, await res.json());
    if (calc) calc.setFounding(await founding);
  } catch { /* the built example stays */ }
}

if (typeof document !== 'undefined') boot(document);
