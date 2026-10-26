import { clamp, TAU } from './math.mjs';

export const DETENT = TAU / 12;          // a tick every 30 degrees
export const DIZZY_SPEED = 2.5 * TAU;    // rad/s above which dizziness builds
export const SETTLE_SPEED = 0.6 * TAU;   // dizzy fires once the spin has slowed below this
export const MAX_SPEED = 7 * TAU;        // a wild flick is clamped here
const LINEAR_FRICTION = 0.4;             // 1/s, exponential decay
const COULOMB_FRICTION = 0.8;            // rad/s^2, constant decel so it actually stops
const DIZZY_GAIN = 1 / 18;               // meter per (rad/s over the threshold) per second
const DIZZY_DECAY = 0.12;                // meter per second while slow

export function createTurntable() {
  let lastDetent = 0;
  let pendingDizzy = false;
  const t = {
    angle: 0,
    velocity: 0,
    grabbed: false,
    dizziness: 0,
    grab() {
      t.grabbed = true;
      t.velocity = 0;
    },
    /** While held, the base follows the pointer 1:1. */
    drag(deltaAngle) {
      t.angle += deltaAngle;
    },
    /** Let go with the pointer's angular velocity (rad/s). */
    release(velocity) {
      t.grabbed = false;
      t.velocity = clamp(velocity, -MAX_SPEED, MAX_SPEED);
    },
    impulse(dv) {
      t.velocity = clamp(t.velocity + dv, -MAX_SPEED, MAX_SPEED);
    },
    /** Advances the physics. Returns { detents, dizzy, speed } for sound and behaviour. */
    update(dt) {
      if (!t.grabbed) {
        t.velocity *= Math.exp(-LINEAR_FRICTION * dt);
        const decel = COULOMB_FRICTION * dt;
        t.velocity = Math.abs(t.velocity) <= decel ? 0 : t.velocity - Math.sign(t.velocity) * decel;
        t.angle += t.velocity * dt;
      }
      const detent = Math.floor(t.angle / DETENT);
      const detents = Math.abs(detent - lastDetent);
      lastDetent = detent;

      const speed = Math.abs(t.velocity);
      if (speed > DIZZY_SPEED) t.dizziness += (speed - DIZZY_SPEED) * DIZZY_GAIN * dt;
      else if (!pendingDizzy) t.dizziness = Math.max(0, t.dizziness - DIZZY_DECAY * dt);
      if (t.dizziness >= 1) pendingDizzy = true;
      let dizzy = false;
      if (pendingDizzy && speed < SETTLE_SPEED) {
        dizzy = true;
        pendingDizzy = false;
        t.dizziness = 0;
      }
      return { detents, dizzy, speed };
    },
  };
  return t;
}
