import { AnimationMixer, Euler, GLTFLoader, LoopOnce, LoopRepeat, MeshoptDecoder, Quaternion, Vector3 } from 'three';
import { BONE_NAMES, CLIP_NAMES, LOOPING_CLIPS, MATERIALS } from './contract.mjs';
import { clamp, damp } from './math.mjs';

const GAZE_YAW = 0.6;     // rad the head may turn toward the pointer
const GAZE_PITCH = 0.35;  // rad it may look up or down
const ANTENNA_K = 140;    // spring stiffness
const ANTENNA_C = 9;      // spring damping

const _figure = new Quaternion();
const _figureInv = new Quaternion();
const _world = new Quaternion();
const _parent = new Quaternion();
const _rot = new Quaternion();
const _euler = new Euler();
const _head = new Vector3();
const _local = new Vector3();
const _acc = new Vector3();

/** Applies `rotation`, expressed in the figure's own axes (Y up, face toward +Z),
 *  to `bone` on top of whatever the animation mixer set this frame. */
function rotateInFigureSpace(bone, rotation) {
  _world.copy(_figure).multiply(rotation).multiply(_figureInv);
  bone.parent.getWorldQuaternion(_parent);
  bone.quaternion.premultiply(_parent).premultiply(_world).premultiply(_parent.invert());
}

export async function loadFigure(url, { onProgress } = {}) {
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(url, e => {
    if (e.lengthComputable) onProgress?.(e.loaded / e.total);
  });
  return createFigure(gltf);
}

/** Wraps a parsed figure.glb: clip playback plus the procedural layer. */
export function createFigure(gltf) {
  const object = gltf.scene;

  const bones = {};
  for (const name of BONE_NAMES) {
    bones[name] = object.getObjectByName(name);
    if (!bones[name]) throw new Error(`figure.glb is missing bone ${name}`);
  }

  let faceMaterial = null;
  let coreMaterial = null;
  let rimMaterial = null;
  object.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = true;
    o.receiveShadow = true;
    if (o.material.name === MATERIALS.face) faceMaterial = o.material;
    if (o.material.name === MATERIALS.core) coreMaterial = o.material;
    if (o.material.name === MATERIALS.baseRim) rimMaterial = o.material;
  });

  const mixer = new AnimationMixer(object);
  const pool = new Map(); // two copies per clip, so a clip can crossfade into itself
  for (const clip of gltf.animations) pool.set(clip.name, { copies: [clip, clip.clone()], next: 0 });
  for (const name of CLIP_NAMES) if (!pool.has(name)) throw new Error(`figure.glb is missing clip ${name}`);
  const durations = Object.fromEntries(CLIP_NAMES.map(n => [n, pool.get(n).copies[0].duration]));

  const antennaRest = [bones.antenna_1.quaternion.clone(), bones.antenna_2.quaternion.clone()];
  // Bones the procedural layer rotates on top of the clips, and the pure clip pose they had.
  // three's PropertyMixer only writes a bone when its animated value changed, so without
  // restoring this first, last frame's gaze stays on the bone and this frame's stacks on it.
  const layered = [bones.chest, bones.head];
  const clipPose = layered.map(b => b.quaternion.clone());
  const gaze = { yaw: 0, pitch: 0, weight: 0 };
  const eyes = { x: 0, y: 0 };
  const antenna = { x: 0, z: 0, vx: 0, vz: 0 };
  const prevTip = new Vector3();
  const tipVelocity = new Vector3();
  let hasPrev = false;
  let current = null;

  function play(name, { fade = 0.22, timeScale = 1 } = {}) {
    const entry = pool.get(name);
    const action = mixer.clipAction(entry.copies[entry.next]);
    entry.next = 1 - entry.next;
    const loop = LOOPING_CLIPS.includes(name);
    action.reset();
    action.setLoop(loop ? LoopRepeat : LoopOnce, Infinity);
    action.clampWhenFinished = !loop;
    action.timeScale = timeScale;
    action.play();
    if (current && current !== action) action.crossFadeFrom(current, fade, false);
    current = action;
  }

  /** Runs the mixer, then layers gaze, spin lag and the antenna spring on top.
   *  Returns where the eyes should look, in -1..1 screen-of-the-face units. */
  function update(dt, { gazeTarget, gazeWeight = 1, spinVelocity = 0 }) {
    layered.forEach((bone, i) => bone.quaternion.copy(clipPose[i]));
    mixer.update(dt);
    layered.forEach((bone, i) => clipPose[i].copy(bone.quaternion));
    object.updateMatrixWorld(true);
    object.getWorldQuaternion(_figure);
    _figureInv.copy(_figure).invert();

    // Inertia: the chest and head lag behind the spin.
    const lag = clamp(-spinVelocity * 0.012, -0.3, 0.3);
    rotateInFigureSpace(bones.chest, _rot.setFromEuler(_euler.set(0, lag * 0.5, 0)));

    // Gaze toward the target, clamped, and never over the shoulder.
    bones.head.getWorldPosition(_head);
    _local.copy(gazeTarget).sub(_head).applyQuaternion(_figureInv);
    const yaw = Math.atan2(_local.x, _local.z);
    const pitch = Math.atan2(_local.y, Math.hypot(_local.x, _local.z));
    const behind = Math.abs(yaw) > 1.9;
    gaze.weight = damp(gaze.weight, behind ? 0 : gazeWeight, 5, dt);
    gaze.yaw = damp(gaze.yaw, clamp(yaw, -GAZE_YAW, GAZE_YAW), 7, dt);
    gaze.pitch = damp(gaze.pitch, clamp(pitch, -GAZE_PITCH, GAZE_PITCH), 7, dt);
    rotateInFigureSpace(bones.head, _rot.setFromEuler(_euler.set(-gaze.pitch * gaze.weight, gaze.yaw * gaze.weight + lag, 0, 'YXZ')));
    eyes.x = clamp((behind ? 0 : yaw) / 0.9, -1, 1) * gaze.weight;
    eyes.y = clamp(pitch / 0.5, -1, 1) * gaze.weight;

    // Antenna: a damped spring pushed by the acceleration of its base, plus a
    // centrifugal lean while spinning (it sits off the spin axis).
    bones.antenna_1.getWorldPosition(_head);
    if (hasPrev && dt > 0) {
      _acc.copy(_head).sub(prevTip).divideScalar(dt).sub(tipVelocity);
      tipVelocity.add(_acc);
      _acc.divideScalar(dt).applyQuaternion(_figureInv);
    } else {
      _acc.set(0, 0, 0);
    }
    prevTip.copy(_head);
    hasPrev = true;
    const pushX = clamp(_acc.z * 0.02 - _acc.y * 0.006, -0.8, 0.8);
    const pushZ = clamp(-_acc.x * 0.02 - Math.min(spinVelocity * spinVelocity * 0.0012, 0.5), -0.8, 0.8);
    antenna.vx += (ANTENNA_K * (pushX - antenna.x) - ANTENNA_C * antenna.vx) * dt;
    antenna.vz += (ANTENNA_K * (pushZ - antenna.z) - ANTENNA_C * antenna.vz) * dt;
    antenna.x = clamp(antenna.x + antenna.vx * dt, -0.7, 0.7);
    antenna.z = clamp(antenna.z + antenna.vz * dt, -0.7, 0.7);
    bones.antenna_1.quaternion.copy(antennaRest[0]);
    bones.antenna_2.quaternion.copy(antennaRest[1]);
    rotateInFigureSpace(bones.antenna_1, _rot.setFromEuler(_euler.set(antenna.x * 0.6, 0, antenna.z * 0.6)));
    rotateInFigureSpace(bones.antenna_2, _rot.setFromEuler(_euler.set(antenna.x * 0.4, 0, antenna.z * 0.4)));
    return eyes;
  }

  function regionOf(hitObject) {
    for (let o = hitObject; o; o = o.parent) if (o.userData?.region) return o.userData.region;
    return null;
  }

  function setFaceMap(texture) {
    faceMaterial.emissiveMap = texture;
    faceMaterial.emissive.set(0xffffff);
    faceMaterial.emissiveIntensity = 3;
    faceMaterial.envMapIntensity = 0.45; // less glare over the face
    faceMaterial.needsUpdate = true;
  }

  return { object, bones, durations, play, update, regionOf, setFaceMap, faceMaterial, coreMaterial, rimMaterial };
}
