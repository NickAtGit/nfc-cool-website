export const TIERS = ['low', 'medium', 'high'];

export function pickInitialTier({ override, coarsePointer, deviceMemory, hardwareConcurrency }) {
  if (TIERS.includes(override)) return override;
  if ((deviceMemory ?? 8) <= 2 || (hardwareConcurrency ?? 8) <= 2) return 'low';
  if (coarsePointer) return 'medium';
  return 'high';
}

/** Drops a tier when frames stay slower than `budgetMs` for `windowS` seconds.
 *  Never climbs back up, so the quality cannot oscillate. */
export function createTierMonitor({ budgetMs = 18, windowS = 2, graceS = 1.5 } = {}) {
  let slowFor = 0;
  let elapsed = 0;
  let ema = 16.7;
  return {
    get frameMs() { return ema; },
    /** Returns true when the caller should drop one tier. */
    sample(dtMs) {
      if (dtMs > 250) return false; // a hidden tab or a breakpoint, not load
      elapsed += dtMs / 1000;
      ema += (dtMs - ema) * 0.1;
      if (elapsed < graceS) return false; // shader compiles hitch the first frames
      slowFor = ema > budgetMs ? slowFor + dtMs / 1000 : 0;
      if (slowFor < windowS) return false;
      slowFor = 0;
      elapsed = 0;
      ema = 16.7;
      return true;
    },
  };
}
