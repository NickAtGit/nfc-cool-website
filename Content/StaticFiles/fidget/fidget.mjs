import { Group, NeutralToneMapping, PCFShadowMap, Plane, Raycaster, SRGBColorSpace, Vector2, Vector3, WebGLRenderer } from 'three';
import { createAudio } from './audio.mjs';
import { createBehavior } from './behavior.mjs';
import { createCameraRig, createControls } from './controls.mjs';
import { createFaceModel } from './face-model.mjs';
import { createFaceTexture } from './face.mjs';
import { loadFigure } from './figure.mjs';
import { createFx } from './fx.mjs';
import { dprFor } from './layout.mjs';
import { easeOutBack, frameDt } from './math.mjs';
import { createTierMonitor, pickInitialTier, TIERS } from './quality.mjs';
import { CAMERA_TARGET, createStage } from './scene.mjs';
import { createTurntable } from './turntable.mjs';

document.documentElement.dataset.booted = 'loading';

const params = new URLSearchParams(location.search);
const DEBUG = params.has('debug');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const $ = id => document.getElementById(id);
const canvas = $('stage');

const ANNOUNCE = {
  asleep: 'It fell asleep. Tap it to wake it up.',
  dizzy: 'Whoa, it is dizzy.',
  scan: 'Scanning. Power up!',
};

function showFallback(message) {
  const el = $('fallback');
  if (message) el.querySelector('p').textContent = message;
  el.hidden = false;
  $('loader').classList.add('done');
  canvas.classList.remove('ready');
  document.documentElement.dataset.booted = 'fallback';
}

async function boot() {
  const gl = canvas.getContext('webgl2', { antialias: true, powerPreference: 'high-performance' });
  if (!gl) return showFallback();
  const renderer = new WebGLRenderer({ canvas, context: gl, antialias: true });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.info.autoReset = false; // count every pass of a frame, not just the last one

  const stage = createStage(renderer, {
    tier: pickInitialTier({
      override: params.get('tier'),
      coarsePointer: matchMedia('(pointer: coarse)').matches,
      deviceMemory: navigator.deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    }),
    dark: darkQuery.matches,
    reducedMotion,
  });
  const figure = await loadFigure('figure.glb', { onProgress: p => $('loader').style.setProperty('--p', p.toFixed(3)) });
  const spinner = new Group();
  spinner.add(figure.object);
  stage.scene.add(spinner);

  // ---- systems ----
  const audio = createAudio();
  const turntable = createTurntable();
  const rig = createCameraRig(stage.camera, CAMERA_TARGET);
  const face = createFaceModel();
  const faceTexture = createFaceTexture(face);
  figure.setFaceMap(faceTexture.texture);
  const FACE_ON = figure.faceMaterial.emissiveIntensity;
  figure.faceMaterial.emissiveIntensity = 0; // screen off: the intro's tap boots it

  const headPosition = target => figure.bones.head.getWorldPosition(target).add({ x: 0, y: 0.18, z: 0 });
  const fx = createFx(stage.scene, {
    anchors: { head: headPosition },
    glow: { core: figure.coreMaterial, rim: figure.rimMaterial, face: figure.faceMaterial, faceOn: FACE_ON },
    reducedMotion,
    dark: darkQuery.matches,
  });
  const FX_CUES = {
    stars_on: () => fx.stars(true),
    stars_off: () => fx.stars(false),
    zzz_on: () => fx.zzz(true),
    zzz_off: () => fx.zzz(false),
    confetti: () => fx.confetti(),
    scan_rings: () => fx.rings(),
    glow: () => fx.glow(),
    boot: () => fx.boot(),
    phone_in: () => fx.phoneIn(),
    phone_out: () => fx.phoneOut(),
  };

  const soundButton = $('sound');
  const danceButton = document.querySelector('[data-action="dance"]');
  const syncButtons = () => {
    soundButton.setAttribute('aria-pressed', String(!audio.muted));
    danceButton.setAttribute('aria-pressed', String(behavior.dancing));
  };

  const behavior = createBehavior({
    durations: figure.durations,
    onPlay: clip => figure.play(clip),
    onExpression: name => face.set(name),
    onCue: (kind, name) => {
      if (kind === 'sfx') audio.play(name);
      else if (kind === 'babble') audio.babble(name);
      else if (kind === 'fx') FX_CUES[name]?.();
      else if (kind === 'music') audio.music(name === 'on');
    },
    onState: mode => {
      if (ANNOUNCE[mode]) $('status').textContent = ANNOUNCE[mode];
    },
  });

  function onActivity() {
    audio.unlock();
    behavior.activity();
  }

  function onAction(name) {
    audio.unlock();
    if (name === 'mute') audio.setMuted(!audio.muted);
    else if (name === 'help') $('help').togglePopover();
    else behavior.action(name);
    syncButtons();
  }

  const tapRay = new Raycaster();
  const tapPoint = new Vector2();
  function onTap(x, y) {
    tapPoint.set((x / canvas.clientWidth) * 2 - 1, -(y / canvas.clientHeight) * 2 + 1);
    tapRay.setFromCamera(tapPoint, stage.camera);
    const hit = tapRay.intersectObject(figure.object, true)[0];
    const region = hit ? figure.regionOf(hit.object) : null;
    if (region) behavior.poke(region);
  }

  const controls = createControls({ canvas, turntable, rig, onTap, onActivity, onAction });
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => onAction(button.dataset.action));
  });
  soundButton.addEventListener('click', () => onAction('mute'));
  syncButtons();

  // Gaze: the pointer, projected onto a plane just in front of the figure. After a few
  // seconds without movement it looks back at the viewer.
  const gazeTarget = new Vector3();
  const gazeRay = new Raycaster();
  const gazePoint = new Vector2();
  const gazePlane = new Plane();
  function aimGaze() {
    const p = controls.pointer;
    if (performance.now() - p.lastMove > 2500) return gazeTarget.copy(stage.camera.position);
    gazePoint.set(p.x, p.y);
    gazeRay.setFromCamera(gazePoint, stage.camera);
    gazePlane.normal.copy(stage.camera.position).setY(0).normalize();
    gazePlane.constant = -0.6;
    if (!gazeRay.ray.intersectPlane(gazePlane, gazeTarget)) gazeTarget.copy(stage.camera.position);
    return gazeTarget;
  }

  // ---- sizing, theme, tiers ----
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    stage.resize(w, h, dprFor(stage.tier, devicePixelRatio));
    rig.setAspect(w / h);
    fx.setPortrait(w / h < 1.15);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();
  darkQuery.addEventListener('change', e => {
    stage.setDark(e.matches);
    fx.setDark(e.matches);
  });
  const monitor = createTierMonitor();

  // ---- debug overlay (?debug) ----
  let debugLine = null;
  if (DEBUG) {
    const panel = document.createElement('div');
    panel.className = 'debug glass';
    debugLine = document.createElement('div');
    const board = document.createElement('div');
    board.className = 'board';
    for (const voice of audio.voices) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = voice;
      b.addEventListener('click', () => {
        audio.unlock();
        audio.play(voice);
      });
      board.append(b);
    }
    panel.append(debugLine, board);
    document.body.append(panel);
    window.fidget = { behavior, turntable, stage, figure, audio, face, fx, rig };
  }

  // ---- the loop ----
  let last = performance.now();
  let running = true;
  let intro = 0;
  let debugT = 0;

  function frame(now) {
    if (!running) return;
    const dtMs = now - last;
    last = now;
    const dt = frameDt(dtMs);
    renderer.info.reset();

    intro = Math.min(1, intro + dt / 0.7);
    spinner.scale.setScalar(reducedMotion ? 1 : Math.max(0.001, easeOutBack(intro)));

    const spin = turntable.update(dt);
    if (spin.detents) audio.tick(spin.speed);
    if (spin.dizzy) behavior.dizzy();
    spinner.rotation.y = turntable.angle;
    audio.spin(spin.speed);

    behavior.update(dt);
    rig.update(dt, { reducedMotion });
    const eyes = figure.update(dt, { gazeTarget: aimGaze(), gazeWeight: behavior.gaze, spinVelocity: turntable.velocity });
    face.look(eyes.x, eyes.y);
    face.update(dt);
    faceTexture.draw(dt);
    fx.update(dt);

    stage.render(dt);

    if (monitor.sample(dtMs) && stage.tier !== 'low') {
      stage.setTier(TIERS[TIERS.indexOf(stage.tier) - 1]);
      resize();
    }
    if (debugLine && (debugT += dt) > 0.25) {
      debugT = 0;
      const info = renderer.info.render;
      debugLine.textContent = `${stage.tier} · ${Math.round(1000 / monitor.frameMs)} fps · ${info.calls} calls · ${info.triangles} tris · ${behavior.mode}/${behavior.clip}`;
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      audio.suspend();
    } else if (!running) {
      running = true;
      last = performance.now();
      audio.resume();
      requestAnimationFrame(frame);
    }
  });

  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault();
    running = false;
    showFallback('The 3D view was interrupted. Reload the page to play again.');
  });

  canvas.classList.add('ready');
  $('loader').classList.add('done');
  document.documentElement.dataset.booted = 'yes';
  requestAnimationFrame(frame);
}

boot().catch(error => {
  console.error('[fidget]', error);
  showFallback();
});
