// The partner page: the earnings calculator and the live founding count.
// The seat price comes from /prices/prices.json (the visitor's own tier and currency, like every
// other price on the site); the count from the service. Without JS, or when either fails, the
// page keeps its built text: a static founding sentence and a USD example.
import { countryFromLanguage, priceFor, currencyFor, formatPrice } from '../prices/prices.mjs';

const FOUNDING_URL = 'https://business.nfc.cool/partners/founding.json';
const STANDARD = 0.2;
const FOUNDING = 0.4;

const cents = n => Math.round(n * 100) / 100;

// How each site language groups thousands and writes digits. Mirrors the build's
// Sources/Site/Helpers/LocaleNumber.swift, so a figure the script writes looks like one the build
// wrote. prices.json's formats leave grouping out because no price reaches four digits; the
// calculator's yearly totals do.
const NUMBER_STYLES = {
  en: { grouping: ',' }, de: { grouping: '.' }, ja: { grouping: ',' }, pt: { grouping: '.' },
  zh: { grouping: ',' }, id: { grouping: '.' }, es: { grouping: '.' }, fr: { grouping: '\u202F' },
  ar: { grouping: '\u066C', digits: '٠١٢٣٤٥٦٧٨٩' }, it: { grouping: '.' }, tr: { grouping: '.' },
  ru: { grouping: '\u00A0' }, uk: { grouping: '\u00A0' },
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
  return text.replace(/[0-9\u0660-\u0669]{4,}/u, run => groupRun(run, styleFor(locale).grouping));
}

// Partner earnings from `teams` teams of `people` seats. A yearly team pays seatPrice.year per
// seat once a year, a monthly team pays seatPrice.month twelve times; `rate` is a fraction.
export function earnings({ teams, people, interval, seatPrice, rate }) {
  const seats = teams * people;
  const perYear = interval === 'year'
    ? seats * seatPrice.year * rate
    : seats * seatPrice.month * rate * 12;
  return { perMonth: cents(perYear / 12), perYear: cents(perYear) };
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

const pageLocale = root => (root.documentElement && root.documentElement.lang) || 'en';

function wireCalculator(root, data, lang) {
  const box = root.querySelector('[data-partner-calc]');
  if (!box) return;
  // Intentional: the region (so the price and currency) comes from the browser's language, like
  // every other price on the site, while the way numbers are written comes from the page's
  // <html lang>. A German reader in Brazil sees Brazil's price written the German way.
  const country = countryFromLanguage(lang);
  const currency = currencyFor(data, 'seat', country);
  const locale = pageLocale(root);
  // The page's own words around the seat price, translated per locale like data-line.
  const perMonth = box.getAttribute('data-per-month') || '{price} a month';
  const perYear = box.getAttribute('data-per-year') || '{price} a year';
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
    set('[data-out=teams]', localNumber(state.teams, locale));
    set('[data-out=people]', localNumber(state.people, locale));
    set('[data-out=found-month]', money(data, found.perMonth, currency, locale));
    set('[data-out=found-year]', money(data, found.perYear, currency, locale));
    set('[data-out=std-month]', money(data, std.perMonth, currency, locale));
    set('[data-out=std-year]', money(data, std.perYear, currency, locale));
    const each = state.interval === 'year'
      ? perYear.replace('{price}', formatPrice(data, seatPrice.year, currency, locale))
      : perMonth.replace('{price}', formatPrice(data, seatPrice.month, currency, locale));
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

// Everything on the page that offers 40% as available: the hero sentence ([data-founding]) and
// the calculator's founding column ([data-founding-only]). Hidden once the service says none are
// left, so only the 20% figures remain; an error leaves them as built.
export function hideFoundingOffers(root) {
  root.querySelectorAll('[data-founding], [data-founding-only]').forEach(el => { el.hidden = true; });
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
  if (foundingState(answer) === 'gone') { hideFoundingOffers(root); return; }
  const line = strings.line ? foundingLine(answer, strings, pageLocale(root)) : null;
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
