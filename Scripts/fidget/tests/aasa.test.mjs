import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The AASA claims nfc.cool for the Tools app, so on an iPhone with the app installed Safari
// shows an "Open" banner on every matching page. The page's own head tag never sees it, so
// /fidget/ has to be excluded here. Legacy paths match in order: the NOT lines must come first.
const aasa = JSON.parse(readFileSync(
  new URL('../../../Content/StaticFiles/.well-known/apple-app-site-association', import.meta.url), 'utf8'));

// The appID that opens `path`, or null. Entries are tried in order, like iOS does.
function claimant(path) {
  for (const { appID, paths } of aasa.applinks.details) {
    for (const pattern of paths) {
      const negated = pattern.startsWith('NOT ');
      const glob = negated ? pattern.slice(4) : pattern;
      const regex = new RegExp('^' + glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      if (regex.test(path)) {
        if (negated) break;
        return appID;
      }
    }
  }
  return null;
}
const claims = path => claimant(path) !== null;

test('the Tools app does not claim /fidget/, so Safari shows no app banner there', () => {
  for (const path of ['/fidget', '/fidget/', '/fidget/index.html']) {
    assert.equal(claims(path), false, `${path} is claimed by a universal link`);
  }
});

test('every other page stays a universal link', () => {
  for (const path of ['/', '/features/nfc-reader-writer/', '/de/blog/', '/fidgets/', '/fidget-spinner/']) {
    assert.equal(claims(path), true, `${path} lost its universal link`);
  }
});

const BUSINESS_CARD = 'FMXL9R3NPC.io.stanc.DigitalBusinessCardApp';
const TOOLS = 'FMXL9R3NPC.de.nicolo-stanciu.nfcing';

test('/business-card/pages/ opens the Business Card app, not Tools (?make=page from a free page)', () => {
  for (const path of ['/business-card/pages', '/business-card/pages/']) {
    assert.equal(claimant(path), BUSINESS_CARD, path);
  }
});

test('the rest of /business-card/ still belongs to Tools', () => {
  assert.equal(claimant('/business-card/'), TOOLS);
  assert.equal(claimant('/business-card/teams/'), TOOLS);
});
