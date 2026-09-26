export const TAU = Math.PI * 2;

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const lerp = (a, b, t) => a + (b - a) * t;

export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Frame-rate independent exponential approach. `lambda` is in 1/s. */
export function damp(current, target, lambda, dt) {
  return target + (current - target) * Math.exp(-lambda * dt);
}

export const easeOutCubic = t => 1 - (1 - t) ** 3;
export const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const easeOutBack = (t, s = 1.70158) => 1 + (s + 1) * (t - 1) ** 3 + s * (t - 1) ** 2;

/** Milliseconds since the last frame, as a step the simulation can take safely.
 *  A long pause (hidden tab, breakpoint) becomes one ordinary 1/20 s step. */
export const frameDt = ms => Math.min(Math.max(ms, 0) / 1000, 1 / 20);

/** Seedable PRNG (mulberry32), so behaviour tests are deterministic. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
