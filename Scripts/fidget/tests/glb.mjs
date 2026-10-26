import { readFileSync } from 'node:fs';

/** Reads the JSON chunk of a binary glTF. Enough to check names, counts and extensions. */
export function readGlb(url) {
  const buf = readFileSync(url);
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB file');
  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));
  return { json, byteLength: buf.length };
}

export function triangleCount(json) {
  let total = 0;
  for (const mesh of json.meshes ?? []) {
    for (const prim of mesh.primitives) {
      if ((prim.mode ?? 4) !== 4) continue;
      const accessor = json.accessors[prim.indices ?? prim.attributes.POSITION];
      total += accessor.count / 3;
    }
  }
  return total;
}

export function animationDuration(json, animation) {
  return Math.max(...animation.samplers.map(s => json.accessors[s.input].max[0]));
}
