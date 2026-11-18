import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forwardTarget } from '../../../Content/StaticFiles/pages/make-page.mjs';

// A free page's "Made with NFC.cool" link opens /business-card/pages/?make=page (service spec
// 2026-11-15-page-onboarding-design.md). Phones go on to the Business Card app's store page;
// Android carries make=page through the Play install referrer. Everyone else stays on the page.
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const IPAD = 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const PIXEL = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36';
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
const GOOGLEBOT = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const APP_STORE = 'https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=make-page&mt=8';
const PLAY = 'https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=make%3Dpage';

test('an iPhone or iPad goes to the App Store', () => {
  assert.equal(forwardTarget('?make=page', IPHONE), APP_STORE);
  assert.equal(forwardTarget('?make=page', IPAD), APP_STORE);
});

test('Android goes to Google Play with make=page as the install referrer', () => {
  assert.equal(forwardTarget('?make=page', PIXEL), PLAY);
});

test('a computer or a crawler stays on the page', () => {
  assert.equal(forwardTarget('?make=page', MAC), null);
  assert.equal(forwardTarget('?make=page', GOOGLEBOT), null);
});

test('without make=page nothing forwards', () => {
  assert.equal(forwardTarget('', IPHONE), null);
  assert.equal(forwardTarget('?make=card', IPHONE), null);
  assert.equal(forwardTarget('?utm_source=x', PIXEL), null);
});
