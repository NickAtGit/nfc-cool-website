import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const DIR = new URL('../../../Content/StaticFiles/fidget/', import.meta.url);

test('the vendored bundle exports every name the modules import from three', async () => {
  const bundle = await import(new URL('vendor/three.bundle.min.mjs', DIR));
  const missing = [];
  for (const file of readdirSync(DIR).filter(f => f.endsWith('.mjs'))) {
    const source = readFileSync(new URL(file, DIR), 'utf8');
    for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*'three'/g)) {
      for (const name of match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean)) {
        if (!(name in bundle)) missing.push(`${file}: ${name}`);
      }
    }
  }
  assert.deepEqual(missing, []);
});
