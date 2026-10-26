import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';

register('./three-resolve.mjs', import.meta.url);
const THREE = await import('three');
const { createFigure } = await import('../../../Content/StaticFiles/fidget/figure.mjs');

const GLB = readFileSync(new URL('../../../Content/StaticFiles/fidget/figure.glb', import.meta.url));
const AHEAD = new THREE.Vector3(0, 0.75, 10);

async function freshFigure() {
  await THREE.MeshoptDecoder.ready;
  const loader = new THREE.GLTFLoader().setMeshoptDecoder(THREE.MeshoptDecoder);
  const gltf = await loader.parseAsync(GLB.buffer.slice(GLB.byteOffset, GLB.byteOffset + GLB.byteLength), '');
  return createFigure(gltf);
}

/** Where the face points, in degrees around the figure's vertical axis. */
function headYaw(figure) {
  figure.object.updateMatrixWorld(true);
  const head = figure.bones.head.getWorldPosition(new THREE.Vector3());
  const face = figure.object.getObjectByName('visor').getWorldPosition(new THREE.Vector3()).sub(head);
  return Math.atan2(face.x, face.z) * 180 / Math.PI;
}

/** Plays `clip` on two fresh figures in lockstep, one with gaze off and one looking
 *  straight ahead, and returns the largest difference in head yaw. Looking straight
 *  ahead should change almost nothing, whatever the clip does with the head. */
async function gazeDrift(clip, seconds) {
  const plain = await freshFigure();
  const gazing = await freshFigure();
  plain.play(clip);
  gazing.play(clip);
  let worst = 0;
  for (let i = 0; i < seconds * 60; i++) {
    plain.update(1 / 60, { gazeTarget: AHEAD, gazeWeight: 0, spinVelocity: 0 });
    gazing.update(1 / 60, { gazeTarget: AHEAD, gazeWeight: 1, spinVelocity: 0 });
    worst = Math.max(worst, Math.abs(headYaw(gazing) - headYaw(plain)));
  }
  return { worst, gazing };
}

for (const [clip, seconds] of [['idle', 12], ['wave', 2.4], ['dance', 8], ['look_around', 5]]) {
  test(`looking straight ahead does not turn the head during ${clip}`, async () => {
    const { worst } = await gazeDrift(clip, seconds);
    assert.ok(worst < 3, `the head drifted ${worst.toFixed(1)} degrees from the clip`);
  });
}

test('bone rotations stay unit quaternions', async () => {
  const { gazing } = await gazeDrift('dance', 8);
  for (const name of ['head', 'chest', 'antenna_1', 'antenna_2']) {
    assert.ok(Math.abs(gazing.bones[name].quaternion.length() - 1) < 1e-4, name);
  }
});

test('a pointer off to the side turns the dancing head no further than the gaze clamp', async () => {
  const plain = await freshFigure();
  const gazing = await freshFigure();
  const side = new THREE.Vector3(10, 0.75, 3);
  plain.play('dance');
  gazing.play('dance');
  let worst = 0;
  for (let i = 0; i < 8 * 60; i++) {
    plain.update(1 / 60, { gazeTarget: side, gazeWeight: 0, spinVelocity: 0 });
    gazing.update(1 / 60, { gazeTarget: side, gazeWeight: 1, spinVelocity: 0 });
    worst = Math.max(worst, Math.abs(headYaw(gazing) - headYaw(plain)));
  }
  // GAZE_YAW is 0.6 rad (34 degrees); a stacking bug blows straight past it
  assert.ok(worst < 40, `the head turned ${worst.toFixed(1)} degrees past the clip`);
});
