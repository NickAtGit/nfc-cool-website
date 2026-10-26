// Tells a step swipe from a page scroll on a touch screen. The phone has touch-action: pan-y, so
// the browser keeps vertical scrolling; a move only counts as a swipe once it is clearly sideways.
export function createSwipe({ rtl = false, distance = 48, flick = 24, flickMs = 160, tapSlop = 8, tapMs = 300 } = {}) {
  return {
    // true / false once the direction is clear, null while it is not yet.
    isHorizontal({ dx, dy }) {
      if (Math.hypot(dx, dy) < 10) return null;
      return Math.abs(dx) > Math.abs(dy) * 1.5;
    },
    // What a finished touch was: 'next', 'prev', 'tap' or null.
    classify({ dx, dy, ms }) {
      if (Math.abs(dx) <= tapSlop && Math.abs(dy) <= tapSlop) return ms <= tapMs ? 'tap' : null;
      if (Math.abs(dx) < Math.abs(dy) * 1.5) return null;
      const far = Math.abs(dx) >= distance && ms < 800;
      const quick = Math.abs(dx) >= flick && ms <= flickMs;
      if (!far && !quick) return null;
      // Swiping left pulls the next screen in, the way a carousel does; RTL reads the other way.
      return (dx < 0) !== rtl ? 'next' : 'prev';
    },
  };
}
