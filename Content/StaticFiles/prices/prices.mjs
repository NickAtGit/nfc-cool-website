// Region-aware prices. The build writes every web price as
// <span class="price" data-price="<product>" data-interval="month|year|saving" [data-quantity="n"]>
// with the price a visitor of unknown country sees. This module swaps in the visitor's own: the
// country from the browser's language region, the tier and currency from /prices/prices.json,
// which mirrors the service (web/page_plan/tiers.py), so the page shows what Checkout will charge.
// No network beyond that file, no tracking; without JS the built default stays.

const REGION = /^[A-Za-z]{2,3}[-_]([A-Za-z]{2})\b/;

// The service's guess_country: only a region subtag counts, no guessing from the language.
export function countryFromLanguage(lang) {
  const match = REGION.exec((lang || '').trim());
  return match ? match[1].toUpperCase() : null;
}

export function tierFor(data, country) {
  return (country && data.tierByCountry[country]) || 'A';
}

export function currencyFor(data, product, country) {
  return (country && data.currencyByCountry[country]) || data.baseCurrency[product];
}

export function priceFor(data, product, interval, country, quantity = 1) {
  const tier = data.amounts[product][tierFor(data, country)];
  const cents = interval === 'saving'
    ? Math.round(Number(tier.month) * 1200) - Math.round(Number(tier.year) * 100)
    : Math.round(Number(tier[interval]) * 100);
  return { amount: (cents * quantity) / 100, currency: currencyFor(data, product, country) };
}

// Not Intl: its output differs between browsers and from the build's Swift, so a page would
// change its text on load. Both sides read data.formats instead (see prices.json).
export function formatPrice(data, amount, currency, locale) {
  const format = data.formats[String(locale).split(/[-_]/)[0].toLowerCase()] || data.formats.en;
  let number = Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace('.', format.decimal);
  if (format.digits) number = number.replace(/[0-9]/g, d => format.digits[d]);
  const symbol = data.symbols[currency];
  return format.after.includes(currency) ? `${number}\u00A0${symbol}` : `${symbol}${number}`;
}

export function applyRegionPrices(root, data, lang) {
  const country = countryFromLanguage(lang);
  const locale = root.documentElement.lang || 'en';
  root.querySelectorAll('[data-price]').forEach(el => {
    const product = el.getAttribute('data-price');
    const interval = el.getAttribute('data-interval');
    if (!data.amounts[product] || !['month', 'year', 'saving'].includes(interval)) return;
    const quantity = Number(el.getAttribute('data-quantity') || 1);
    const { amount, currency } = priceFor(data, product, interval, country, quantity);
    el.textContent = formatPrice(data, amount, currency, locale);
  });
}

if (typeof document !== 'undefined') {
  fetch('/prices/prices.json')
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(data => applyRegionPrices(document, data, navigator.language))
    .catch(() => { /* the built default stays */ });
}
