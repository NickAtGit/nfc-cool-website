const DPR_CAP = { high: 2, medium: 1.5, low: 1 };
const MIN_VISIBLE_WIDTH = 1.1; // world units: the 0.62 base plus breathing room

export function dprFor(tier, devicePixelRatio) {
  return Math.min(devicePixelRatio || 1, DPR_CAP[tier] ?? 1);
}

/** Portrait screens see less width at the same distance, so pull the camera back
 *  until the base fits. Landscape keeps the authored distance. */
export function distanceScale(aspect, fovDeg = 30, baseDistance = 3.35) {
  const visibleWidth = 2 * Math.tan((fovDeg * Math.PI) / 360) * baseDistance * aspect;
  return Math.max(1, MIN_VISIBLE_WIDTH / visibleWidth);
}
