// The partner page: the earnings calculator and the live founding count.
// The seat price comes from /prices/prices.json (the visitor's own tier and currency, like every
// other price on the site); the count from the service. Without JS, or when either fails, the
// page keeps its built text: a static founding sentence and a USD example.
import { countryFromLanguage, priceFor, currencyFor, formatPrice } from '../prices/prices.mjs';

const FOUNDING_URL = 'https://business.nfc.cool/partners/founding.json';
const STANDARD = 0.2;
const FOUNDING = 0.4;

const cents = n => Math.round(n * 100) / 100;

// Partner earnings from `teams` teams of `people` seats. A yearly team pays seatPrice.year per
// seat once a year, a monthly team pays seatPrice.month twelve times; `rate` is a fraction.
export function earnings({ teams, people, interval, seatPrice, rate }) {
  const seats = teams * people;
  const perYear = interval === 'year'
    ? seats * seatPrice.year * rate
    : seats * seatPrice.month * rate * 12;
  return { perMonth: cents(perYear / 12), perYear: cents(perYear) };
}

// The founding sentence with the live count, or null when the static sentence should show:
// no deals left, no answer, or an answer that is not what the service sends.
export function foundingLine(answer, strings) {
  if (!answer || !Number.isInteger(answer.left) || !Number.isInteger(answer.total)) return null;
  if (answer.left <= 0) return null;
  return strings.line.replace('{left}', answer.left).replace('{total}', answer.total);
}

function money(data, amount, currency, locale) {
  return formatPrice(data, Math.round(amount), currency, locale);
}

function wireCalculator(root, data, lang) {
  const box = root.querySelector('[data-partner-calc]');
  if (!box) return;
  const country = countryFromLanguage(lang);
  const currency = currencyFor(data, 'seat', country);
  const locale = root.documentElement ? root.documentElement.lang || 'en' : 'en';
  const seatPrice = {
    month: priceFor(data, 'seat', 'month', country).amount,
    year: priceFor(data, 'seat', 'year', country).amount,
  };
  const state = { teams: 5, people: 10, interval: 'month' };
  const $ = sel => box.querySelector(sel);
  const set = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };

  function paint() {
    const args = { teams: state.teams, people: state.people, interval: state.interval, seatPrice };
    const found = earnings({ ...args, rate: FOUNDING });
    const std = earnings({ ...args, rate: STANDARD });
    set('[data-out=teams]', state.teams);
    set('[data-out=people]', state.people);
    set('[data-out=found-month]', money(data, found.perMonth, currency, locale));
    set('[data-out=found-year]', money(data, found.perYear, currency, locale));
    set('[data-out=std-month]', money(data, std.perMonth, currency, locale));
    set('[data-out=std-year]', money(data, std.perYear, currency, locale));
    const each = state.interval === 'year'
      ? `${formatPrice(data, seatPrice.year, currency, locale)} a year`
      : `${formatPrice(data, seatPrice.month, currency, locale)} a month`;
    set('[data-out=price-line]', each);
    box.querySelectorAll('[data-interval]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.getAttribute('data-interval') === state.interval)));
  }

  $('[data-in=teams]').addEventListener('input', e => { state.teams = Number(e.target.value); paint(); });
  $('[data-in=people]').addEventListener('input', e => { state.people = Number(e.target.value); paint(); });
  box.querySelectorAll('[data-interval]').forEach(b =>
    b.addEventListener('click', () => { state.interval = b.getAttribute('data-interval'); paint(); }));
  paint();
}

async function wireFounding(root) {
  const el = root.querySelector('[data-founding]');
  if (!el) return;
  const strings = { line: el.getAttribute('data-line') || '' };
  let answer = null;
  try {
    const res = await fetch(FOUNDING_URL, { headers: { Accept: 'application/json' } });
    answer = res.ok ? await res.json() : null;
  } catch { answer = null; }
  const line = strings.line ? foundingLine(answer, strings) : null;
  if (line) el.textContent = line;
}

export async function boot(root) {
  wireFounding(root);
  try {
    const res = await fetch('/prices/prices.json');
    if (!res.ok) return;
    wireCalculator(root, await res.json(), navigator.language);
  } catch { /* the built example stays */ }
}

if (typeof document !== 'undefined') boot(document);
