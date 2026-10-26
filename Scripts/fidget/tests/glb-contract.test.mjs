import { test } from 'node:test';
import assert from 'node:assert/strict';
import { animationDuration, readGlb, triangleCount } from './glb.mjs';
import {
  BONE_NAMES, CLIP_NAMES, LIMITS, LOOPING_CLIPS, MATERIALS, REGIONS, ROOT_NODE,
} from '../../../Content/StaticFiles/fidget/contract.mjs';

const { json, byteLength } = readGlb(new URL('../../../Content/StaticFiles/fidget/figure.glb', import.meta.url));
const nodeNames = json.nodes.map(n => n.name);

test('ships every clip the runtime plays', () => {
  const names = json.animations.map(a => a.name);
  assert.deepEqual(CLIP_NAMES.filter(c => !names.includes(c)), []);
});

test('each bone exists exactly once, so no track can bind to a mesh with the same name', () => {
  for (const bone of BONE_NAMES) assert.equal(nodeNames.filter(n => n === bone).length, 1, bone);
  assert.ok(nodeNames.includes(ROOT_NODE));
});

test('carries the materials the runtime restyles', () => {
  const names = json.materials.map(m => m.name);
  for (const name of Object.values(MATERIALS)) assert.ok(names.includes(name), name);
});

test('tags every tap region on some node', () => {
  const regions = new Set(json.nodes.map(n => n.extras?.region).filter(Boolean));
  for (const region of REGIONS) assert.ok(regions.has(region), region);
});

test('fits the size and triangle budgets, meshopt-compressed, with no textures', () => {
  assert.ok(byteLength <= LIMITS.bytes, `${byteLength} bytes`);
  assert.ok(triangleCount(json) <= LIMITS.triangles, `${triangleCount(json)} triangles`);
  assert.ok((json.extensionsUsed ?? []).includes('EXT_meshopt_compression'));
  assert.equal((json.images ?? []).length, 0);
});

test('looping clips are long enough to loop without a visible hitch', () => {
  for (const name of LOOPING_CLIPS) {
    const animation = json.animations.find(a => a.name === name);
    assert.ok(animationDuration(json, animation) >= 1.9, name);
  }
});
