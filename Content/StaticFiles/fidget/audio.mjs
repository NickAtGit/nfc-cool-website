// Every sound is synthesized with the Web Audio API: zero bytes to download, and the
// spin sounds can follow the spin speed. Nothing here runs until createAudio().

export const BPM = 120;
const STEP = 60 / BPM / 4; // one 16th note
const LOOKAHEAD = 0.12;
const TICK_MIN_GAP = 1 / 22;
const VOICE_PITCH = 420;

export const midiToHz = n => 440 * 2 ** ((n - 69) / 12);

// Two bars of 16ths: kick on 1 and 3, clap on 2 and 4, off-beat hats, a bass line and
// an arpeggio over C, F, G, C.
export const DANCE_PATTERN = (() => {
  const steps = Array.from({ length: 32 }, () => []);
  for (let s = 0; s < 32; s += 8) steps[s].push({ voice: 'kick' });
  for (let s = 4; s < 32; s += 8) steps[s].push({ voice: 'clap' });
  for (let s = 2; s < 32; s += 4) steps[s].push({ voice: 'hat' });
  const bass = { 0: 36, 3: 36, 6: 43, 8: 41, 11: 41, 14: 43, 16: 43, 19: 43, 22: 38, 24: 36, 27: 36, 30: 43 };
  for (const [s, note] of Object.entries(bass)) steps[+s].push({ voice: 'bass', note });
  const chords = [[60, 64, 67, 72], [65, 69, 72, 77], [67, 71, 74, 79], [60, 64, 67, 72]];
  for (let s = 0; s < 32; s += 2) steps[s].push({ voice: 'lead', note: chords[Math.floor(s / 8)][(s / 2) % 4] });
  return steps;
})();

/** Which step times to schedule now. When the tab stalled for longer than a step,
 *  skip ahead instead of firing a burst of overdue notes. */
export function stepsToSchedule(nextTime, now, lookahead = LOOKAHEAD, stepDur = STEP) {
  let skipped = 0;
  if (nextTime < now - stepDur) {
    skipped = Math.ceil((now - nextTime) / stepDur);
    nextTime += skipped * stepDur;
  }
  const times = [];
  while (nextTime < now + lookahead) {
    times.push(nextTime);
    nextTime += stepDur;
  }
  return { times, nextTime, skipped };
}

export function readMuted(storage, key = 'fidget:muted') {
  try {
    return storage?.getItem(key) === '1';
  } catch {
    return false;
  }
}

export function writeMuted(storage, muted, key = 'fidget:muted') {
  try {
    storage?.setItem(key, muted ? '1' : '0');
  } catch {
    // private mode or blocked storage: the toggle still works for this visit
  }
}

function defaultStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function createAudio({ storage = defaultStorage(), key = 'fidget:muted' } = {}) {
  let ctx = null;
  let master = null;
  let reverbSend = null;
  let noiseBuffer = null;
  let whoosh = null;
  let musicBus = null;
  let muted = readMuted(storage, key);
  let lastTick = 0;
  let lastWhoosh = -1;
  const music = { on: false, timer: 0, next: 0, step: 0 };

  function impulse(seconds, decay) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
    }
    return buffer;
  }

  function init() {
    const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AudioCtx) return false;
    ctx = new AudioCtx({ latencyHint: 'interactive' });
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.knee.value = 10;
    comp.ratio.value = 4;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.9;
    master.connect(comp).connect(ctx.destination);
    const reverb = ctx.createConvolver();
    reverb.buffer = impulse(1.3, 3);
    reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.25;
    reverbSend.connect(reverb).connect(master);
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    musicBus = ctx.createGain();
    musicBus.gain.value = 0.0001;
    musicBus.connect(master);
    const src = ctx.createBufferSource();
    const band = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = noiseBuffer;
    src.loop = true;
    band.type = 'bandpass';
    band.Q.value = 0.9;
    band.frequency.value = 400;
    gain.gain.value = 0;
    src.connect(band).connect(gain).connect(master);
    src.start();
    whoosh = { band, gain };
    return true;
  }

  // ---- building blocks ----

  function out(node, reverb = 0.2, bus = master) {
    node.connect(bus);
    if (reverb > 0) {
      const send = ctx.createGain();
      send.gain.value = reverb;
      node.connect(send).connect(reverbSend);
    }
  }

  function envelope(param, t, { attack = 0.005, peak = 0.4, hold = 0, release = 0.2 }) {
    param.setValueAtTime(0.0001, t);
    param.exponentialRampToValueAtTime(peak, t + attack);
    param.setValueAtTime(peak, t + attack + hold);
    param.exponentialRampToValueAtTime(0.0001, t + attack + hold + release);
    return t + attack + hold + release;
  }

  function tone(type, f0, f1, t, dur, peak, { reverb = 0.15, bus, attack = 0.005 } = {}) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const end = envelope(gain.gain, t, { attack, peak, release: dur });
    osc.connect(gain);
    out(gain, reverb, bus);
    osc.start(t);
    osc.stop(end + 0.02);
    return osc;
  }

  function noise(t, dur, { filter = 'bandpass', freq = 1000, freqTo, q = 1, peak = 0.3, attack = 0.004, hold = 0, reverb = 0.1, bus } = {}) {
    const src = ctx.createBufferSource();
    const biquad = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = noiseBuffer;
    biquad.type = filter;
    biquad.frequency.setValueAtTime(freq, t);
    if (freqTo) biquad.frequency.exponentialRampToValueAtTime(freqTo, t + attack + hold + dur);
    biquad.Q.value = q;
    const end = envelope(gain.gain, t, { attack, peak, hold, release: dur });
    src.connect(biquad).connect(gain);
    out(gain, reverb, bus);
    src.start(t, Math.random() * 1.5);
    src.stop(end + 0.02);
  }

  // A tiny formant voice: a sawtooth through two band-pass filters per vowel.
  const VOWELS = { a: [730, 1090], e: [530, 1840], i: [300, 2200], o: [570, 840], u: [320, 870] };
  function syllable(t, { f0, f1 = f0, vowel = 'a', dur = 0.08, peak = 0.9 }) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const [F1, F2] = VOWELS[vowel];
    for (const [f, q, level] of [[F1 * 1.3, 6, 1], [F2 * 1.3, 8, 0.55]]) {
      const band = ctx.createBiquadFilter();
      const lv = ctx.createGain();
      band.type = 'bandpass';
      band.frequency.value = f;
      band.Q.value = q;
      lv.gain.value = level;
      osc.connect(band).connect(lv).connect(gain);
    }
    const end = envelope(gain.gain, t, { attack: 0.01, peak, hold: dur * 0.55, release: dur * 0.5 });
    out(gain, 0.2);
    osc.start(t);
    osc.stop(end + 0.02);
  }

  const PHRASES = { // [vowel, pitch ratio, seconds, glide-to ratio]
    hi: [['e', 1, 0.07], ['i', 1.12, 0.07], ['a', 1.25, 0.17, 1.5]],
    giggle: [['i', 1.5, 0.05], ['i', 1.36, 0.05], ['i', 1.46, 0.05], ['i', 1.3, 0.05], ['i', 1.42, 0.08]],
    surprised: [['o', 1.1, 0.16, 1.7]],
    wheee: [['i', 1.2, 0.6, 2.1]],
  };

  function babble(name) {
    if (!ctx || muted) return;
    let at = ctx.currentTime;
    for (const [vowel, ratio, dur, glide = ratio] of PHRASES[name] ?? []) {
      const wobble = 1 + (Math.random() - 0.5) * 0.06;
      syllable(at, { vowel, dur, f0: VOICE_PITCH * ratio * wobble, f1: VOICE_PITCH * glide * wobble });
      at += dur + 0.03;
    }
  }

  const SFX = {
    boop: t => {
      tone('sine', 900, 420, t, 0.16, 0.45);
      tone('triangle', 1800, 840, t, 0.08, 0.08);
    },
    jump: t => tone('triangle', 280, 920, t, 0.2, 0.3),
    jump_small: t => tone('triangle', 360, 760, t, 0.14, 0.22),
    land: t => {
      tone('sine', 150, 55, t, 0.16, 0.7, { reverb: 0.05 });
      noise(t, 0.07, { filter: 'lowpass', freq: 500, peak: 0.25 });
    },
    land_soft: t => tone('sine', 180, 80, t, 0.12, 0.35, { reverb: 0.05 }),
    chirp: t => {
      tone('sine', 1400, 1400, t, 0.07, 0.28, { reverb: 0.1 });
      tone('sine', 2100, 2100, t + 0.11, 0.09, 0.28, { reverb: 0.1 });
    },
    riser: t => {
      const osc = ctx.createOscillator();
      const lp = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 1.0);
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(300, t);
      lp.frequency.exponentialRampToValueAtTime(6000, t + 1.0);
      lp.Q.value = 4;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.95);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      osc.connect(lp).connect(gain);
      out(gain, 0.3);
      osc.start(t);
      osc.stop(t + 1.15);
      noise(t, 0.2, { filter: 'highpass', freq: 1500, freqTo: 6000, attack: 0.9, peak: 0.1 });
    },
    fanfare: t => {
      [523.25, 659.25, 783.99].forEach((f, i) => {
        tone('triangle', f, f, t + i * 0.09, 0.2, 0.26);
        tone('square', f, f, t + i * 0.09, 0.1, 0.04);
      });
      const top = tone('triangle', 1046.5, 1046.5, t + 0.27, 0.7, 0.3, { reverb: 0.35 });
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      lfo.frequency.value = 6;
      depth.gain.value = 10;
      lfo.connect(depth).connect(top.frequency);
      lfo.start(t + 0.3);
      lfo.stop(t + 1.1);
      for (const f of [261.63, 329.63, 392]) tone('sine', f, f, t + 0.27, 0.9, 0.08, { reverb: 0.4, attack: 0.05 });
    },
    dizzy: t => {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 1.3);
      lfo.frequency.value = 7;
      depth.gain.value = 70;
      lfo.connect(depth).connect(osc.frequency);
      const end = envelope(gain.gain, t, { attack: 0.03, peak: 0.25, hold: 0.9, release: 0.4 });
      osc.connect(gain);
      out(gain, 0.25);
      osc.start(t);
      lfo.start(t);
      osc.stop(end);
      lfo.stop(end);
      for (let i = 0; i < 4; i++) {
        const f = 2200 + Math.random() * 1400;
        tone('sine', f, f * 1.2, t + 0.15 + i * 0.32, 0.07, 0.07, { reverb: 0.6 });
      }
    },
    yawn: t => {
      syllable(t, { vowel: 'a', f0: 330, f1: 210, dur: 1.1, peak: 0.8 });
      noise(t, 1.0, { freq: 900, q: 0.7, peak: 0.04, attack: 0.2 });
    },
    snore: t => {
      noise(t, 0.9, { filter: 'lowpass', freq: 380, q: 2, peak: 0.12, attack: 0.9, reverb: 0.05 });
      tone('sine', 820, 700, t + 1.2, 0.45, 0.025, { attack: 0.1 });
    },
    pop: t => tone('sine', 1300, 320, t, 0.05, 0.2),
  };

  const MUSIC = {
    kick: t => tone('sine', 150, 45, t, 0.16, 0.7, { reverb: 0, bus: musicBus }),
    clap: t => {
      noise(t, 0.09, { freq: 1500, q: 0.8, peak: 0.22, reverb: 0.2, bus: musicBus });
      noise(t + 0.012, 0.07, { freq: 1700, q: 0.8, peak: 0.16, reverb: 0.2, bus: musicBus });
    },
    hat: t => noise(t, 0.03, { filter: 'highpass', freq: 7000, peak: 0.06, reverb: 0, bus: musicBus }),
    bass: (t, note) => {
      const osc = ctx.createOscillator();
      const lp = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = midiToHz(note);
      lp.type = 'lowpass';
      lp.frequency.value = 700;
      const end = envelope(gain.gain, t, { attack: 0.005, peak: 0.16, hold: STEP * 0.8, release: STEP * 0.8 });
      osc.connect(lp).connect(gain);
      out(gain, 0, musicBus);
      osc.start(t);
      osc.stop(end + 0.02);
    },
    lead: (t, note) => tone('triangle', midiToHz(note), midiToHz(note), t, STEP * 1.4, 0.08, { reverb: 0.3, bus: musicBus }),
  };

  function musicTick() {
    const { times, nextTime, skipped } = stepsToSchedule(music.next, ctx.currentTime);
    music.step = (music.step + skipped) % 32;
    for (const t of times) {
      if (!muted) for (const ev of DANCE_PATTERN[music.step]) MUSIC[ev.voice](t, ev.note);
      music.step = (music.step + 1) % 32;
    }
    music.next = nextTime;
  }

  function syncMusic() {
    const shouldRun = music.on && ctx && ctx.state === 'running';
    if (shouldRun && !music.timer) {
      music.next = ctx.currentTime + 0.06;
      music.step = 0;
      musicBus.gain.setTargetAtTime(0.7, ctx.currentTime, 0.05);
      music.timer = setInterval(musicTick, 25);
      musicTick();
    } else if (!shouldRun && music.timer) {
      clearInterval(music.timer);
      music.timer = 0;
      musicBus.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
    }
  }

  return {
    get muted() { return muted; },
    get voices() { return [...Object.keys(SFX), ...Object.keys(PHRASES).map(p => `babble:${p}`)]; },
    /** Call from a user gesture: browsers only start audio after one. */
    unlock() {
      if (!ctx && !init()) return;
      if (ctx.state !== 'running') ctx.resume().then(syncMusic);
      else syncMusic();
    },
    setMuted(value) {
      muted = value;
      writeMuted(storage, value, key);
      if (master) master.gain.setTargetAtTime(value ? 0 : 0.9, ctx.currentTime, 0.03);
    },
    play(name) {
      if (!ctx || muted) return;
      if (name.startsWith('babble:')) return babble(name.slice(7));
      SFX[name]?.(ctx.currentTime);
    },
    babble,
    tick(speed) {
      if (!ctx || muted) return;
      const t = ctx.currentTime;
      if (t - lastTick < TICK_MIN_GAP) return;
      lastTick = t;
      const k = Math.min(1, speed / 30);
      noise(t, 0.012, { freq: 2600 + 2400 * k, q: 8, peak: 0.12 + 0.12 * k, reverb: 0.05 });
      tone('sine', 3200 + 800 * k, 3000, t, 0.01, 0.05, { reverb: 0 });
    },
    spin(speed) {
      if (!whoosh) return;
      const level = Math.min(1, Math.max(0, (speed - 4) / 30)) ** 1.5 * 0.28;
      if (Math.abs(level - lastWhoosh) < 0.002) return;
      lastWhoosh = level;
      whoosh.gain.gain.setTargetAtTime(level, ctx.currentTime, 0.08);
      whoosh.band.frequency.setTargetAtTime(250 + speed * 55, ctx.currentTime, 0.08);
    },
    music(on) {
      music.on = on;
      syncMusic();
    },
    suspend() {
      if (!ctx) return;
      clearInterval(music.timer);
      music.timer = 0;
      ctx.suspend();
    },
    resume() {
      if (ctx && !document.hidden) ctx.resume().then(syncMusic);
    },
  };
}
