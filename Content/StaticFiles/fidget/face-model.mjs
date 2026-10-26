import { clamp, damp } from './math.mjs';

const BLINK_S = 0.14;

// eye: width/height multipliers, lid (0 open, 1 shut), arc (1 happy ^, <0 content sleep)
// mode: how the eyes are drawn. mouth: width, open (0..1), smile (-1..1)
export const EXPRESSIONS = {
  neutral: { eye: { w: 1, h: 1, lid: 0, arc: 0 }, mode: 'normal', mouth: { w: 0.35, open: 0, smile: 0.35 } },
  happy: { eye: { w: 1.05, h: 0.9, lid: 0, arc: 1 }, mode: 'normal', mouth: { w: 0.5, open: 0.35, smile: 1 } },
  giggle: { eye: { w: 1, h: 1, lid: 0, arc: 0 }, mode: 'squint', mouth: { w: 0.55, open: 0.6, smile: 1 } },
  surprised: { eye: { w: 1.2, h: 1.25, lid: 0, arc: 0 }, mode: 'normal', mouth: { w: 0.25, open: 0.9, smile: 0 } },
  sleepy: { eye: { w: 1.05, h: 1, lid: 0.6, arc: 0 }, mode: 'normal', mouth: { w: 0.3, open: 0.15, smile: 0 } },
  asleep: { eye: { w: 1.05, h: 1, lid: 1, arc: -0.4 }, mode: 'normal', mouth: { w: 0.22, open: 0.1, smile: 0.2 } },
  dizzy: { eye: { w: 1.1, h: 1.1, lid: 0, arc: 0 }, mode: 'spiral', mouth: { w: 0.45, open: 0.25, smile: -0.6 } },
  star: { eye: { w: 1.25, h: 1.25, lid: 0, arc: 0 }, mode: 'star', mouth: { w: 0.55, open: 0.7, smile: 1 } },
};

/** The face as numbers: expressions tween, the eyes follow a gaze, and it blinks
 *  on its own. face.mjs draws whatever `state` says. */
export function createFaceModel({ rng = Math.random } = {}) {
  const state = {
    eye: { ...EXPRESSIONS.neutral.eye },
    mouth: { ...EXPRESSIONS.neutral.mouth },
    gaze: { x: 0, y: 0 },
    mode: 'normal',
    prevMode: 'normal',
    modeMix: 1, // 0 -> 1 crossfade from prevMode into mode
    blink: 0,
  };
  let target = EXPRESSIONS.neutral;
  let expression = 'neutral';
  const gazeGoal = { x: 0, y: 0 };
  let blinkTimer = 2 + rng() * 3;
  let blinkPhase = -1;
  let doubleBlink = false;

  return {
    state,
    get expression() { return expression; },
    set(name) {
      const next = name in EXPRESSIONS ? name : 'neutral';
      if (next === expression) return;
      expression = next;
      target = EXPRESSIONS[next];
      if (target.mode !== state.mode) {
        state.prevMode = state.mode;
        state.mode = target.mode;
        state.modeMix = 0;
      }
    },
    look(x, y) {
      gazeGoal.x = clamp(x, -1, 1);
      gazeGoal.y = clamp(y, -1, 1);
    },
    blink() {
      if (blinkPhase < 0) blinkPhase = 0;
    },
    update(dt) {
      for (const k in state.eye) state.eye[k] = damp(state.eye[k], target.eye[k], 14, dt);
      for (const k in state.mouth) state.mouth[k] = damp(state.mouth[k], target.mouth[k], 12, dt);
      state.gaze.x = damp(state.gaze.x, gazeGoal.x, 18, dt);
      state.gaze.y = damp(state.gaze.y, gazeGoal.y, 18, dt);
      state.modeMix = Math.min(1, state.modeMix + dt / 0.18);

      if (blinkPhase >= 0) {
        blinkPhase += dt / BLINK_S;
        state.blink = Math.sin(Math.min(1, blinkPhase) * Math.PI);
        if (blinkPhase >= 1) {
          blinkPhase = -1;
          state.blink = 0;
          blinkTimer = doubleBlink ? 0.12 : 2 + rng() * 4;
          doubleBlink = false;
        }
      } else if (state.mode === 'normal' && state.eye.lid < 0.5) {
        blinkTimer -= dt;
        if (blinkTimer <= 0) {
          blinkPhase = 0;
          doubleBlink = rng() < 0.18;
        }
      }
    },
  };
}
