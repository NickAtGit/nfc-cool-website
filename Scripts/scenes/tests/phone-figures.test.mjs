import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSteps } from '../phone-figures/steps.mjs';
import { createSpring } from '../phone-figures/spring.mjs';
import { createSwipe } from '../phone-figures/gesture.mjs';

// A fake clock for the auto-advance timer: run() fires every timer due by then.
function fakeTimers() {
  let now = 0;
  let timers = [];
  return {
    setTimeout: (fn, ms) => { const t = { fn, at: now + ms }; timers.push(t); return t; },
    clearTimeout: t => { timers = timers.filter(x => x !== t); },
    run(ms) {
      now += ms;
      for (;;) {
        const due = timers.filter(t => t.at <= now).sort((a, b) => a.at - b.at)[0];
        if (!due) break;
        timers = timers.filter(t => t !== due);
        due.fn();
      }
    },
  };
}

test('steps wrap around in both directions and report each change once', () => {
  const changes = [];
  const steps = createSteps({ count: 3, onChange: (i, from) => changes.push([from, i]) });
  steps.next(); steps.next(); steps.next();
  steps.prev();
  assert.deepEqual(changes, [[0, 1], [1, 2], [2, 0], [0, 2]]);
  assert.equal(steps.index, 2);
});

test('going to the current step changes nothing; out-of-range steps are clamped', () => {
  const changes = [];
  const steps = createSteps({ count: 3, onChange: i => changes.push(i) });
  steps.go(0);
  steps.go(9);
  steps.go(-4);
  assert.deepEqual(changes, [2, 0]);
});

test('auto-advance runs only while playing and stops for good on the first interaction', () => {
  const timers = fakeTimers();
  const changes = [];
  const steps = createSteps({ count: 3, interval: 4500, timers, onChange: i => changes.push(i) });
  steps.play();
  timers.run(4500);
  timers.run(4500);
  assert.deepEqual(changes, [1, 2]);
  steps.pause(); // scrolled out of view
  timers.run(20000);
  assert.deepEqual(changes, [1, 2]);
  steps.play(); // back in view
  timers.run(4500);
  assert.deepEqual(changes, [1, 2, 0]);
  steps.go(2, { user: true });
  steps.play(); // in view again: the reader took over, so nothing moves on its own
  timers.run(20000);
  assert.deepEqual(changes, [1, 2, 0, 2]);
  assert.equal(steps.autoplay, false);
});

test('a single screen never auto-advances', () => {
  const timers = fakeTimers();
  let changed = false;
  const steps = createSteps({ count: 1, interval: 1000, timers, onChange: () => { changed = true; } });
  steps.play();
  timers.run(10000);
  steps.next();
  assert.equal(changed, false);
});

test('the spring settles on its target without overshooting far, and reports when it rests', () => {
  const spring = createSpring({ value: 0 });
  spring.target = 20;
  let peak = 0;
  let frames = 0;
  while (!spring.settled && frames < 600) {
    spring.step(1 / 60);
    peak = Math.max(peak, spring.value);
    frames++;
  }
  assert.ok(spring.settled, 'never settled');
  assert.ok(frames < 120, `took ${frames} frames`);
  assert.ok(Math.abs(spring.value - 20) < 0.05);
  assert.ok(peak < 20 * 1.1, `overshot to ${peak}`);
});

test('a kick sets the spring moving away from rest and it comes back', () => {
  const spring = createSpring({ value: 5 });
  spring.target = 5;
  assert.ok(spring.settled);
  spring.kick(120);
  assert.equal(spring.settled, false);
  spring.step(1 / 60);
  assert.ok(spring.value > 5);
  for (let i = 0; i < 300; i++) spring.step(1 / 60);
  assert.ok(spring.settled);
  assert.ok(Math.abs(spring.value - 5) < 0.05);
});

test('a long frame does not blow the spring up', () => {
  const spring = createSpring({ value: 0 });
  spring.target = 30;
  spring.step(2); // a tab that was in the background
  assert.ok(Number.isFinite(spring.value));
  assert.ok(Math.abs(spring.value) < 60);
});

test('a horizontal swipe steps: left is next, right is previous (mirrored in RTL)', () => {
  const swipe = createSwipe();
  assert.equal(swipe.classify({ dx: -80, dy: 6, ms: 200 }), 'next');
  assert.equal(swipe.classify({ dx: 80, dy: -4, ms: 200 }), 'prev');
  const rtl = createSwipe({ rtl: true });
  assert.equal(rtl.classify({ dx: -80, dy: 6, ms: 200 }), 'prev');
  assert.equal(rtl.classify({ dx: 80, dy: -4, ms: 200 }), 'next');
});

test('a mostly vertical move is a scroll, never a step', () => {
  const swipe = createSwipe();
  assert.equal(swipe.classify({ dx: -60, dy: 90, ms: 200 }), null);
  assert.equal(swipe.isHorizontal({ dx: 6, dy: 14 }), false);
  assert.equal(swipe.isHorizontal({ dx: 18, dy: 5 }), true);
  assert.equal(swipe.isHorizontal({ dx: 3, dy: 1 }), null); // too early to tell
});

test('a short still touch is a tap; a slow small drag is nothing', () => {
  const swipe = createSwipe();
  assert.equal(swipe.classify({ dx: 2, dy: 3, ms: 120 }), 'tap');
  assert.equal(swipe.classify({ dx: 20, dy: 3, ms: 900 }), null);
  assert.equal(swipe.classify({ dx: 4, dy: 2, ms: 900 }), null); // a long press is not a tap
});

test('a quick flick counts even when short', () => {
  const swipe = createSwipe();
  assert.equal(swipe.classify({ dx: -32, dy: 4, ms: 90 }), 'next');
});
