// Which screen a phone figure shows, and the timer that moves it on while the figure is in view.
// The reader's first click, key or swipe ends the auto-advance for good: from then on the figure
// only moves when they move it.
export function createSteps({ count, interval = 4500, timers = globalThis, onChange = () => {} }) {
  let index = 0;
  let autoplay = count > 1;
  let playing = false;
  let timer = null;

  const schedule = () => {
    timers.clearTimeout(timer);
    timer = playing && autoplay ? timers.setTimeout(() => { go(index + 1); }, interval) : null;
  };

  function go(i, { user = false } = {}) {
    if (count < 2) return;
    if (user) autoplay = false;
    const wrapped = Number.isInteger(i) && (i < 0 || i >= count) && Math.abs(i - index) === 1
      ? (i + count) % count // next/prev wrap around
      : Math.min(count - 1, Math.max(0, i)); // a direct pick is clamped
    if (wrapped !== index) {
      const from = index;
      index = wrapped;
      onChange(index, from);
    }
    schedule();
  }

  return {
    get index() { return index; },
    get autoplay() { return autoplay; },
    go,
    next: opts => go(index + 1, opts),
    prev: opts => go(index - 1, opts),
    play() { playing = true; schedule(); },
    pause() { playing = false; schedule(); },
  };
}
