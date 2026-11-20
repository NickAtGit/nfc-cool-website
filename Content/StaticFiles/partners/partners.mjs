// The partner page: the earnings calculator and the live founding count.
// The seat price comes from /prices/prices.json (the visitor's own tier and currency, like every
// other price on the site); the hero card's rate and count from the service. Without JS, or when
// either fails, the page keeps its built text: 40% over a founding sentence with no number, and a
// USD example.
import { countryFromLanguage, priceFor, currencyFor, formatPrice } from '../prices/prices.mjs';

const FOUNDING_URL = 'https://business.nfc.cool/partners/founding.json';
// The rates the calculator starts with, and keeps when the service's answer has none: 20% and the
// founding 40%. The service's founding.json carries both (`rate`, `founding_rate`, whole percents).
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

// The calculator's rates as fractions, from the service's answer: its `rate` and `founding_rate`
// (whole percents, 20 and 40 today), each falling back to the built-in figure when it is missing
// or not a percent.
export function ratesFrom(answer) {
  const percent = v => (Number.isInteger(v) && v > 0 && v <= 100 ? v / 100 : null);
  return {
    standard: percent(answer && answer.rate) ?? STANDARD,
    founding: percent(answer && answer.founding_rate) ?? FOUNDING,
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

// Returns { setRates }, so the service's rates repaint the figures when its answer arrives.
function wireCalculator(root, data, lang) {
  const box = root.querySelector('[data-partner-calc]');
  if (!box) return null;
  let rates = { standard: STANDARD, founding: FOUNDING };
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
  const $ = sel => box.querySelector(sel);
  // The built page's own defaults: the sliders' values (each range's middle) and yearly.
  const state = {
    teams: Number(($('[data-in=teams]') || {}).value) || 26,
    people: Number(($('[data-in=people]') || {}).value) || 51,
    interval: (box.querySelector('[data-interval][aria-pressed="true"]') || { getAttribute: () => 'year' }).getAttribute('data-interval'),
  };
  const set = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };

  function paint() {
    const args = { teams: state.teams, people: state.people, interval: state.interval, seatPrice };
    const found = earnings({ ...args, rate: rates.founding });
    const std = earnings({ ...args, rate: rates.standard });
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
    box.querySelectorAll('.partner-result').forEach(card => leadWith(card, state.interval));
  }

  $('[data-in=teams]').addEventListener('input', e => { state.teams = Number(e.target.value); paint(); });
  $('[data-in=people]').addEventListener('input', e => { state.people = Number(e.target.value); paint(); });
  box.querySelectorAll('[data-interval]').forEach(b =>
    b.addEventListener('click', () => { state.interval = b.getAttribute('data-interval'); paint(); }));
  paint();
  return { setRates(next) { rates = next; paint(); } };
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
    const calc = wireCalculator(root, await res.json(), navigator.language);
    if (calc) calc.setRates(ratesFrom(await founding));
  } catch { /* the built example stays */ }
}

if (typeof document !== 'undefined') boot(document);
