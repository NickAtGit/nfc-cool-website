// /business-card/pages/?make=page is where a free page's "Made with NFC.cool" link lands
// (service spec 2026-11-15-page-onboarding-design.md). On a phone it goes straight on to the
// Business Card app's store page; Android carries make=page through the Play install referrer,
// so the app opens on "make a page". When the app is installed, the universal link in
// /.well-known/apple-app-site-association opens it before this page loads. Computers and
// crawlers stay on the page.

const APP_STORE = 'https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=make-page&mt=8';
const PLAY = 'https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=make%3Dpage';

export function forwardTarget(search, userAgent) {
  if (new URLSearchParams(search).get('make') !== 'page') return null;
  const ua = userAgent || '';
  if (/bot|crawler|spider|slurp/i.test(ua)) return null;
  if (/iPhone|iPad|iPod/.test(ua)) return APP_STORE;
  if (/Android/.test(ua)) return PLAY;
  return null;
}

if (typeof location !== 'undefined') {
  const target = forwardTarget(location.search, navigator.userAgent);
  if (target) location.replace(target);
}
