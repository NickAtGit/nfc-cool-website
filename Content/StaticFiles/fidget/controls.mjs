import { Spherical } from 'three';
import { createGestureTracker } from './gesture.mjs';
import { distanceScale } from './layout.mjs';
import { clamp, damp, TAU } from './math.mjs';

const POLAR = { rest: 1.33, min: 0.95, max: 1.6 };   // rad from straight up
const DISTANCE = { rest: 3.35, min: 2.3, max: 5.2 };
const TILT_PER_PX = 0.005;
const KEY_SPIN = 7;      // rad/s per arrow press
const KEY_TILT = 0.12;
const KEY_ZOOM = 0.88;
const KEYMAP = { w: 'wave', j: 'jump', d: 'dance', s: 'scan', m: 'mute', '?': 'help' };

/** Orbits the camera around the figure: tilt and zoom are springs, the azimuth only
 *  drifts a little (the figure spins, not the camera). */
export function createCameraRig(camera, target) {
  const spherical = new Spherical();
  let scale = 1;
  let time = 0;
  const rig = {
    polar: POLAR.rest,
    goalPolar: POLAR.rest,
    distance: DISTANCE.rest,
    goalDistance: DISTANCE.rest,
    setAspect(aspect) {
      scale = distanceScale(aspect, camera.fov, DISTANCE.rest);
    },
    tilt(delta) {
      rig.goalPolar = clamp(rig.goalPolar + delta, POLAR.min, POLAR.max);
    },
    zoom(factor) {
      rig.goalDistance = clamp(rig.goalDistance * factor, DISTANCE.min, DISTANCE.max);
    },
    setDistance(d) {
      rig.goalDistance = clamp(d, DISTANCE.min, DISTANCE.max);
    },
    reset() {
      rig.goalPolar = POLAR.rest;
      rig.goalDistance = DISTANCE.rest;
    },
    update(dt, { reducedMotion = false } = {}) {
      time += dt;
      rig.polar = damp(rig.polar, rig.goalPolar, 9, dt);
      rig.distance = damp(rig.distance, rig.goalDistance, 7, dt);
      const drift = reducedMotion ? 0 : Math.sin(time * 0.3) * 0.035;
      spherical.set(rig.distance * scale, rig.polar, drift);
      camera.position.setFromSpherical(spherical).add(target);
      camera.lookAt(target);
    },
  };
  return rig;
}

export function createControls({ canvas, turntable, rig, onTap, onActivity, onAction }) {
  const gesture = createGestureTracker();
  const pointer = { x: 0, y: 0, lastMove: -Infinity };
  let pinchBase = rig.goalDistance;

  const anglePerPx = () => TAU / (0.9 * Math.max(320, Math.min(canvas.clientWidth, canvas.clientHeight)));
  const track = e => {
    pointer.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    pointer.y = -(e.clientY / canvas.clientHeight) * 2 + 1;
    pointer.lastMove = performance.now();
  };

  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId);
    track(e);
    gesture.down(e.pointerId, e.clientX, e.clientY, e.timeStamp);
    if (gesture.pinching) {
      if (turntable.grabbed) turntable.release(0); // a second finger mid-spin: stop, then zoom
      pinchBase = rig.goalDistance;
    }
    onActivity();
  });

  canvas.addEventListener('pointermove', e => {
    track(e);
    const intent = gesture.move(e.pointerId, e.clientX, e.clientY, e.timeStamp);
    if (!intent) return;
    onActivity();
    if (intent.kind === 'spin') {
      if (intent.start) turntable.grab();
      turntable.drag(intent.dx * anglePerPx());
    } else if (intent.kind === 'tilt') {
      rig.tilt(-intent.dy * TILT_PER_PX);
    } else if (intent.kind === 'pinch') {
      rig.setDistance(pinchBase / intent.ratio);
    }
  });

  canvas.addEventListener('pointerup', e => {
    const intent = gesture.up(e.pointerId, e.clientX, e.clientY, e.timeStamp);
    if (intent?.kind === 'release' && intent.axis === 'x') turntable.release(intent.vx * anglePerPx());
    else if (turntable.grabbed && !gesture.active) turntable.release(0);
    if (intent?.kind === 'tap') {
      onTap(e.clientX, e.clientY);
      if (intent.double) rig.reset();
    }
  });

  canvas.addEventListener('pointercancel', e => {
    gesture.cancel(e.pointerId);
    if (turntable.grabbed) turntable.release(0);
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    rig.zoom(Math.exp(e.deltaY * 0.0015));
    onActivity();
  }, { passive: false });

  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.repeat && !e.key.startsWith('Arrow')) return;
    if (handleKey(e.key)) {
      e.preventDefault();
      onActivity();
    }
  });

  function handleKey(key) {
    switch (key) {
      case 'ArrowLeft': turntable.impulse(-KEY_SPIN); return true;
      case 'ArrowRight': turntable.impulse(KEY_SPIN); return true;
      case 'ArrowUp': rig.tilt(-KEY_TILT); return true;
      case 'ArrowDown': rig.tilt(KEY_TILT); return true;
      case '+': case '=': rig.zoom(KEY_ZOOM); return true;
      case '-': case '_': rig.zoom(1 / KEY_ZOOM); return true;
      case '0': rig.reset(); return true;
      default: {
        const action = KEYMAP[key.toLowerCase()];
        if (!action) return false;
        onAction(action);
        return true;
      }
    }
  }

  return { pointer };
}
