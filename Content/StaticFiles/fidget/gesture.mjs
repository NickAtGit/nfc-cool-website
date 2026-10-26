export const TAP_MAX_MS = 220;
export const TAP_MAX_PX = 8;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_PX = 30;
const VELOCITY_WINDOW_MS = 90;
const REST_BEFORE_LIFT_MS = 60; // a finger that stopped before lifting throws nothing

/**
 * Turns raw pointer events into intents. Pure: pass timestamps in ms.
 *   move() -> { kind: 'spin', dx, start? } | { kind: 'tilt', dy, start? } | { kind: 'pinch', ratio } | null
 *   up()   -> { kind: 'tap', x, y, double } | { kind: 'release', axis, vx, vy } | null
 * The first move past the slop locks the drag to one axis, so a spin never tilts.
 */
export function createGestureTracker() {
  const pointers = new Map();
  let axis = null; // 'x' | 'y' | 'pinch'
  let pinchStart = 0;
  let lastTap = null;

  const spread = () => {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  return {
    get active() { return pointers.size > 0; },
    get pinching() { return axis === 'pinch'; },

    down(id, x, y, t) {
      pointers.set(id, { x0: x, y0: y, t0: t, x, y, samples: [{ x, y, t }] });
      if (pointers.size === 2) {
        axis = 'pinch';
        pinchStart = spread();
      }
    },

    move(id, x, y, t) {
      const p = pointers.get(id);
      if (!p) return null;
      const dx = x - p.x;
      const dy = y - p.y;
      p.x = x;
      p.y = y;
      p.samples.push({ x, y, t });
      while (p.samples.length > 2 && t - p.samples[0].t > VELOCITY_WINDOW_MS) p.samples.shift();
      if (axis === 'pinch') {
        return pointers.size >= 2 && pinchStart > 0 ? { kind: 'pinch', ratio: spread() / pinchStart } : null;
      }
      if (!axis) {
        const mx = x - p.x0;
        const my = y - p.y0;
        if (Math.hypot(mx, my) <= TAP_MAX_PX) return null;
        axis = Math.abs(mx) >= Math.abs(my) * 0.8 ? 'x' : 'y';
        return axis === 'x' ? { kind: 'spin', dx: mx, start: true } : { kind: 'tilt', dy: my, start: true };
      }
      return axis === 'x' ? { kind: 'spin', dx } : { kind: 'tilt', dy };
    },

    up(id, x, y, t) {
      const p = pointers.get(id);
      if (!p) return null;
      pointers.delete(id);
      const was = axis;
      if (pointers.size === 0) {
        axis = null;
        pinchStart = 0;
      }
      if (was === 'pinch') return null;
      if (!was) {
        if (t - p.t0 > TAP_MAX_MS) return null; // a long press is not a tap
        const double = !!lastTap && t - lastTap.t < DOUBLE_TAP_MS && Math.hypot(x - lastTap.x, y - lastTap.y) < DOUBLE_TAP_PX;
        lastTap = double ? null : { x, y, t };
        return { kind: 'tap', x, y, double };
      }
      const first = p.samples[0];
      const last = p.samples[p.samples.length - 1];
      const span = Math.max(1, last.t - first.t);
      const k = t - last.t > REST_BEFORE_LIFT_MS ? 0 : 1000 / span;
      return { kind: 'release', axis: was, vx: (last.x - first.x) * k, vy: (last.y - first.y) * k };
    },

    cancel(id) {
      pointers.delete(id);
      if (pointers.size === 0) {
        axis = null;
        pinchStart = 0;
      }
    },
  };
}
