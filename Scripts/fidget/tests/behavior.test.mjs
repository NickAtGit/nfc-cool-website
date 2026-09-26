import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBehavior, DIZZY_S, IDLE_SLEEP_S, IDLE_YAWN_S } from '../../../Content/StaticFiles/fidget/behavior.mjs';

const DURATIONS = {
  idle: 4, look_around: 5, wave: 2.4, jump: 1.2, giggle: 1, hop: 0.8, dizzy: 2, yawn: 2.5,
  sleep_enter: 1.5, sleep_loop: 4, wake_startle: 0.8, dance: 2, power_up: 2.5,
};

function harness() {
  const log = [];
  const behavior = createBehavior({
    durations: DURATIONS,
    rng: () => 0.5,
    onPlay: clip => log.push(['play', clip]),
    onCue: (kind, name) => log.push([kind, name]),
    onExpression: name => log.push(['expr', name]),
    onState: mode => log.push(['state', mode]),
  });
  const run = seconds => {
    for (let t = 0; t < seconds - 1e-9; t += 1 / 30) behavior.update(1 / 30);
  };
  const plays = () => log.filter(e => e[0] === 'play').map(e => e[1]);
  const has = (kind, name) => log.some(e => e[0] === kind && e[1] === name);
  const finishIntro = () => run(1.55 + DURATIONS.power_up);
  return { behavior, log, run, plays, has, finishIntro };
}

test('the intro is a scan: a dormant figure is tapped awake and powers up', () => {
  const { behavior, run, plays, has } = harness();
  assert.deepEqual(plays(), ['sleep_loop']);
  assert.ok(has('expr', 'asleep'));
  assert.equal(behavior.mode, 'intro');
  run(0.5);
  assert.ok(has('fx', 'phone_in'));
  assert.ok(!has('fx', 'boot'));
  run(0.8);
  assert.ok(has('sfx', 'chirp') && has('fx', 'scan_rings') && has('fx', 'boot'));
  run(0.3);
  assert.equal(plays().at(-1), 'power_up');
  run(DURATIONS.power_up);
  assert.ok(has('fx', 'phone_out'));
  assert.equal(plays().at(-1), 'idle');
  assert.equal(behavior.mode, 'idle');
});

test('pokes cannot interrupt the intro', () => {
  const { behavior, run, plays } = harness();
  run(1.8);
  behavior.poke('head');
  assert.ok(!plays().includes('giggle'));
});

test('the scan button replays the tap without booting the screen again', () => {
  const { behavior, run, plays, has, log, finishIntro } = harness();
  finishIntro();
  const boots = log.filter(e => e[1] === 'boot').length;
  behavior.action('scan');
  run(1.3);
  assert.ok(plays().filter(p => p === 'power_up').length === 2);
  run(DURATIONS.power_up);
  assert.equal(plays().at(-1), 'idle');
  assert.equal(log.filter(e => e[1] === 'boot').length, boots);
  assert.ok(has('fx', 'phone_out'));
});

test('a poke on the head giggles, then settles back into idle', () => {
  const { behavior, run, plays, has, finishIntro } = harness();
  finishIntro();
  behavior.poke('head');
  assert.equal(plays().at(-1), 'giggle');
  run(0.2);
  assert.ok(has('babble', 'giggle'));
  run(DURATIONS.giggle);
  assert.equal(plays().at(-1), 'idle');
});

test('yawns after 20 s idle and falls asleep at 45 s, and a touch wakes it', () => {
  const { behavior, run, plays, has } = harness();
  run(IDLE_YAWN_S + 0.5);
  assert.ok(plays().includes('yawn'));
  assert.ok(!plays().includes('sleep_enter'));
  run(IDLE_SLEEP_S - IDLE_YAWN_S);
  assert.ok(plays().includes('sleep_enter'));
  run(2);
  assert.equal(behavior.mode, 'asleep');
  behavior.activity();
  assert.equal(plays().at(-1), 'wake_startle');
  assert.ok(has('fx', 'zzz_off'));
  run(1);
  assert.equal(plays().at(-1), 'idle');
});

test('dance is a toggle that becomes the base loop and never falls asleep', () => {
  const { behavior, run, plays, has, finishIntro } = harness();
  finishIntro();
  behavior.action('dance');
  assert.equal(plays().at(-1), 'dance');
  assert.ok(has('music', 'on'));
  behavior.action('jump');
  run(DURATIONS.jump + 0.1);
  assert.equal(plays().at(-1), 'dance');
  run(IDLE_SLEEP_S + 5);
  assert.ok(!plays().includes('sleep_enter'));
  behavior.action('dance');
  assert.equal(plays().at(-1), 'idle');
  assert.ok(has('music', 'off'));
});

test('dizzy lasts DIZZY_S with stars, then cools down', () => {
  const { behavior, run, plays, has, finishIntro } = harness();
  finishIntro();
  behavior.dizzy();
  assert.equal(plays().at(-1), 'dizzy');
  assert.ok(has('fx', 'stars_on'));
  run(DIZZY_S + 0.1);
  assert.ok(has('fx', 'stars_off'));
  assert.equal(plays().at(-1), 'idle');
  behavior.dizzy();
  assert.equal(plays().at(-1), 'idle');
  run(2.1);
  behavior.dizzy();
  assert.equal(plays().at(-1), 'dizzy');
});
