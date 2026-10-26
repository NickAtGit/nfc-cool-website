export const IDLE_YAWN_S = 20;
export const IDLE_SLEEP_S = 45;
export const DIZZY_S = 3.6;
const DIZZY_COOLDOWN_S = 2;
const SNORE_EVERY_S = 3.4;
const GLANCE_EVERY = [7, 12];
const PRIORITY = { base: 0, glance: 0, action: 1, reaction: 2, dizzy: 3, scan: 4 };

/** clip -> [seconds into the clip, cue]. Cues are `kind:name`: sfx, babble, fx, music,
 *  plus `expr:<face>` and `play:<clip>`, which the state machine handles itself. */
export const CUES = {
  wave: [[0.15, 'babble:hi']],
  jump: [[0.28, 'sfx:jump'], [0.88, 'sfx:land']],
  giggle: [[0, 'sfx:boop'], [0.12, 'babble:giggle']],
  hop: [[0, 'sfx:boop'], [0.2, 'sfx:jump_small'], [0.5, 'sfx:land_soft']],
  yawn: [[0.25, 'sfx:yawn']],
  sleep_enter: [[1.1, 'fx:zzz_on']],
  wake_startle: [[0, 'babble:surprised'], [0, 'fx:zzz_off']],
  power_up: [[0, 'sfx:riser'], [1.0, 'sfx:fanfare'], [1.0, 'fx:confetti'], [1.0, 'fx:glow'], [1.0, 'babble:wheee']],
};

const SCAN_TIMELINE = [
  [0, 'fx:phone_in'], [0, 'expr:surprised'],
  [0.85, 'sfx:chirp'], [0.85, 'fx:scan_rings'],
  [1.15, 'play:power_up'],
  [2.4, 'fx:phone_out'],
];

// The page opens the way a real NFC tap would: the figure sleeps with its screen off
// until a phone taps its base, then the screen boots and it powers up.
const INTRO_TIMELINE = [
  [0.4, 'fx:phone_in'],
  [1.25, 'sfx:chirp'], [1.25, 'fx:scan_rings'], [1.25, 'fx:boot'], [1.25, 'expr:surprised'],
  [1.55, 'play:power_up'],
  [2.8, 'fx:phone_out'],
];

export const EXPRESSION_FOR = {
  idle: 'neutral', look_around: 'neutral', wave: 'happy', jump: 'happy', giggle: 'giggle', hop: 'happy',
  dizzy: 'dizzy', yawn: 'sleepy', sleep_enter: 'sleepy', sleep_loop: 'asleep', wake_startle: 'surprised',
  dance: 'happy', power_up: 'star',
};

// How much the head may follow the pointer on top of each clip.
const GAZE_FOR = {
  idle: 1, look_around: 0, wave: 0.6, jump: 0.3, giggle: 0.4, hop: 0.5, dizzy: 0, yawn: 0,
  sleep_enter: 0, sleep_loop: 0, wake_startle: 0.3, dance: 0.2, power_up: 0,
};

const POKE_CLIP = { head: 'giggle', belly: 'hop' };

/**
 * What the figure is doing, as a pure state machine. It never touches three.js: it
 * calls onPlay(clip), onExpression(face), onCue(kind, name) and onState(mode).
 * Modes: intro (a scan that boots the figure), idle, oneshot, dizzy, asleep, scan.
 */
export function createBehavior({ durations, rng = Math.random, onPlay, onCue, onExpression = () => {}, onState = () => {} }) {
  let mode = 'intro';
  let cur = null;
  let idleT = 0;
  let glanceT = 0;
  let yawned = false;
  let cooldown = 0;
  let snoreT = 0;
  let scanT = 0;
  let scanQueue = [];
  let dancing = false;
  let expression = null;

  const nextGlance = () => GLANCE_EVERY[0] + rng() * (GLANCE_EVERY[1] - GLANCE_EVERY[0]);

  function setMode(next) {
    if (next === mode) return;
    mode = next;
    onState(next);
  }

  function express(name) {
    if (!name || name === expression) return;
    expression = name;
    onExpression(name);
  }

  function fire(cue) {
    const [kind, name] = cue.split(':');
    if (kind === 'expr') express(name);
    else if (kind === 'play') play(name, PRIORITY.scan);
    else onCue(kind, name);
  }

  function runCues() {
    for (const c of cur.cues) {
      if (!c.done && cur.t >= c.at) {
        c.done = true;
        fire(c.cue);
      }
    }
  }

  function play(clip, priority) {
    cur = { clip, priority, t: 0, duration: durations[clip], cues: (CUES[clip] ?? []).map(([at, cue]) => ({ at, cue, done: false })) };
    onPlay(clip);
    express(EXPRESSION_FOR[clip]);
    runCues();
  }

  function base() {
    setMode('idle');
    play(dancing ? 'dance' : 'idle', PRIORITY.base);
  }

  function oneshot(clip, priority) {
    setMode('oneshot');
    play(clip, priority);
  }

  function runTimeline(timeline) {
    scanT = 0;
    scanQueue = timeline.map(item => item.slice());
    while (scanQueue.length && scanQueue[0][0] <= 0) fire(scanQueue.shift()[1]);
  }

  function finishScan() {
    while (scanQueue.length) fire(scanQueue.shift()[1]);
    base();
  }

  function update(dt) {
    cooldown = Math.max(0, cooldown - dt);
    if (mode !== 'asleep' && !dancing) idleT += dt;
    cur.t += dt;
    runCues();

    if (mode === 'scan' || mode === 'intro') {
      scanT += dt;
      while (scanQueue.length && scanT >= scanQueue[0][0]) fire(scanQueue.shift()[1]);
      if (cur.clip === 'power_up' && cur.t >= cur.duration - 0.25) finishScan();
      return;
    }
    if (mode === 'dizzy') {
      if (cur.t >= DIZZY_S) {
        onCue('fx', 'stars_off');
        cooldown = DIZZY_COOLDOWN_S;
        base();
      }
      return;
    }
    if (mode === 'asleep') {
      if (cur.clip === 'sleep_enter' && cur.t >= cur.duration) play('sleep_loop', PRIORITY.base);
      snoreT += dt;
      if (snoreT >= SNORE_EVERY_S) {
        snoreT = 0;
        onCue('sfx', 'snore');
      }
      return;
    }

    // Boredom may interrupt an idle glance, never anything the user started.
    const bored = !dancing && (mode === 'idle' || (mode === 'oneshot' && cur.clip === 'look_around'));
    if (bored && idleT >= IDLE_SLEEP_S) {
      setMode('asleep');
      snoreT = 0;
      play('sleep_enter', PRIORITY.base);
      return;
    }
    if (bored && idleT >= IDLE_YAWN_S && !yawned) {
      yawned = true;
      oneshot('yawn', PRIORITY.action);
      return;
    }
    if (mode === 'oneshot') {
      if (cur.t >= cur.duration - 0.2) base();
      return;
    }
    if (mode === 'idle' && !dancing) {
      glanceT -= dt;
      if (glanceT <= 0) {
        glanceT = nextGlance();
        oneshot('look_around', PRIORITY.glance);
      }
    }
  }

  /** Any user input. Returns true when it woke the figure up. */
  function activity() {
    idleT = 0;
    yawned = false;
    if (mode !== 'asleep') return false;
    oneshot('wake_startle', PRIORITY.reaction);
    return true;
  }

  function poke(region) {
    if (activity()) return;                   // the first touch only wakes it up
    if (cur.clip === 'wake_startle') return;  // ...including the tap that lands mid-startle
    if (region === 'base') {
      onCue('fx', 'scan_rings');
      onCue('sfx', 'chirp');
      return;
    }
    const clip = POKE_CLIP[region];
    if (!clip || cur.priority > PRIORITY.reaction) return;
    oneshot(clip, PRIORITY.reaction);
  }

  function action(name) {
    if (name === 'dance') {
      dancing = !dancing;
      activity();
      onCue('music', dancing ? 'on' : 'off');
      if (mode === 'idle') base();
      return;
    }
    if (name === 'scan') {
      if (mode === 'scan' || mode === 'intro') return;
      activity();
      setMode('scan');
      cur.priority = PRIORITY.scan;
      runTimeline(SCAN_TIMELINE);
      return;
    }
    activity();
    if (mode === 'scan' || mode === 'intro' || mode === 'dizzy' || cur.priority > PRIORITY.action) return;
    oneshot(name, PRIORITY.action);
  }

  function dizzy() {
    if (cooldown > 0 || mode === 'scan' || mode === 'intro' || mode === 'dizzy') return;
    activity();
    setMode('dizzy');
    play('dizzy', PRIORITY.dizzy);
    onCue('fx', 'stars_on');
    onCue('sfx', 'dizzy');
  }

  glanceT = nextGlance();
  play('sleep_loop', PRIORITY.scan); // dormant until the intro's tap
  runTimeline(INTRO_TIMELINE);

  return {
    update, activity, poke, action, dizzy,
    get mode() { return mode; },
    get clip() { return cur.clip; },
    get dancing() { return dancing; },
    get gaze() { return mode === 'scan' ? 0.3 : GAZE_FOR[cur.clip] ?? 0; },
  };
}
