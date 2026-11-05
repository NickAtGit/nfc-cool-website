// The heavy half of the live 3D scenes: three.js, the GLBs, shaders, textures and the render loop,
// all in a worker, so none of it can keep a tap waiting. Scripts/scenes/live-scenes.mjs is the page's
// half and starts this; read its header first. Scripts/scenes/build.sh --js minifies this file to
// Content/StaticFiles/scenes/ like the player.
//
// The scene packages are NFCcoolScenes' app exports (Scripts/scenes/build.sh): a GLB with the
// baked animation, the manifest with the opacity tracks, lights and camera, and the phone-screen
// video, played the way OnboardingKit's FeatureScenePlayer plays them in the app. A scene whose
// manifest names no phone or screen video (cardfan) is just the GLB and the manifest. Each scene
// loops like the app's page does and renders only while it is on screen.
//
// One WebGL context on an OffscreenCanvas draws every scene; each frame goes to the page as an
// ImageBitmap. (Copying with a 2D drawImage does not work: Chrome defers the copy to the end of the
// frame, by when the shared buffer holds the last scene drawn.) A worker has no <video>, so the
// page plays the screen video and sends its frames here.
import {
  AnimationMixer, DoubleSide, GLTFLoader, MeshBasicMaterial, MeshoptDecoder,
  NeutralToneMapping, PCFShadowMap, PMREMGenerator, PointLight, RoomEnvironment, SRGBColorSpace, Scene,
  SpotLight, VideoFrameTexture, WebGLRenderer,
} from './vendor/three.scenes.min.mjs';

const BASE = new URL('./', import.meta.url);
let debug = false;
const log = (...args) => debug && console.log('[live-scenes]', ...args);

let glCanvas = null;
let renderer = null;
let environment = null;
let loader = null;
let phonePromise = null;
const loadPhone = () => (phonePromise ??= loader.loadAsync(new URL('feature_phone.glb', BASE).href));

const views = new Map();
let theme = { attr: null, prefersDark: false };
let hidden = false;

self.addEventListener('message', ({ data }) => {
  switch (data.t) {
    case 'init':
      debug = data.debug;
      theme = data.theme;
      start();
      break;
    case 'view':
      updateView(data);
      break;
    case 'release-hold':
      views.get(data.id).holding = false;
      wake();
      break;
    case 'shown':
      awaitingShown = false;
      break;
    case 'video-frame':
      takeVideoFrame(data);
      break;
    case 'video-state':
      setVideoState(views.get(data.id), data.state);
      break;
    case 'theme':
      theme = data.theme;
      applyThemes();
      break;
    case 'hidden':
      hidden = data.hidden;
      if (hidden) running = false;
      else wake();
      break;
    case 'call':
      workerCalls[data.name](data.args).then(
        value => self.postMessage({ t: 'reply', call: data.call, value }),
        error => self.postMessage({ t: 'reply', call: data.call, error: String(error) }),
      );
      break;
    case 'reply':
      replies.get(data.call)?.(data);
      replies.delete(data.call);
      break;
  }
});

function start() {
  try {
    glCanvas = new OffscreenCanvas(1, 1);
    renderer = new WebGLRenderer({ canvas: glCanvas, alpha: true, antialias: true, premultipliedAlpha: true });
  } catch (error) {
    // No WebGL2 on a worker's OffscreenCanvas in this browser: the page keeps its images.
    self.postMessage({ t: 'down', reason: String(error) });
    return;
  }
  renderer.outputColorSpace = SRGBColorSpace;
  // Blender renders these scenes with Khronos PBR Neutral (studio.py), and so does three.
  renderer.toneMapping = NeutralToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(1); // sizes below are already in device pixels
  // Only a scene whose manifest asks for shadows has a light and meshes that cast them.
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const pmrem = new PMREMGenerator(renderer);
  environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

  glCanvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    running = false;
    for (const view of views.values()) view.state = 'failed';
    self.postMessage({ t: 'lost' });
  });

  views.forEach(maybeLoad);
}

// ---- what the page tells us about a view ----
function updateView({ id, key, frameFill, posterFrame, visible, width, height }) {
  let view = views.get(id);
  if (!view) {
    view = {
      id, key, frameFill, posterFrame,
      // The scene holds on the poster's frame until the poster has faded out.
      holding: true,
      state: 'idle', // idle → loading → ready | failed
      visible: false,
      width: 0,
      height: 0,
      scene: null,
    };
    views.set(id, view);
  }
  const wasVisible = view.visible;
  Object.assign(view, { visible, width, height });
  maybeLoad(view);
  // A code-built scene gives its textures back while it is off screen (a long page would run out).
  if (wasVisible && !visible) view.scene?.release?.();
  wake();
}

function maybeLoad(view) {
  if (renderer && view.visible && view.state === 'idle') load(view);
}

// Two scenes at a time, so a fast scroll does not queue up every package at once.
let inFlight = 0;
const queue = [];
function load(view) {
  view.state = 'loading';
  queue.push(view);
  pump();
}
function pump() {
  while (inFlight < 2 && queue.length) {
    const view = queue.shift();
    inFlight++;
    const started = performance.now();
    buildScene(view)
      .then(scene => seekTo(view, scene, view.posterFrame))
      .then(scene => {
        view.scene = scene;
        view.state = 'ready';
        log(`${view.key} ready in ${Math.round(performance.now() - started)} ms`);
        self.postMessage({ t: 'ready', id: view.id });
        wake();
      })
      .catch(error => {
        view.state = 'failed';
        console.warn(`[live-scenes] ${view.key}`, error);
        self.postMessage({ t: 'failed', id: view.id });
      })
      .finally(() => {
        inFlight--;
        pump();
      });
  }
}

// ---- building a scene ----
let bcScenes = null;
async function buildScene(view) {
  const { key } = view;
  // bc/<name>: a scene built in code (the Business Card page) rather than a package of files.
  if (key.startsWith('bc/')) {
    bcScenes = await import('./bc/bc-scenes.mjs');
    bcScenes.setDark(isDark());
    return bcScenes.build(key.slice(3), { renderer, loader, environment });
  }
  const manifestPromise = fetch(new URL(`${key}.json`, BASE)).then(r => {
    if (!r.ok) throw new Error(`manifest ${r.status}`);
    return r.json();
  });
  const [gltf, manifest, phone] = await Promise.all([
    loader.loadAsync(new URL(`${key}.glb`, BASE).href),
    manifestPromise,
    manifestPromise.then(m => m.phone ? loadPhone() : null),
    manifestPromise.then(m => m.screenVideo && ask('openVideo', { id: view.id, src: new URL(`${m.screenVideo}.mp4`, BASE).href })),
  ]);
  const scene = new Scene();
  scene.environment = environment;
  scene.environmentIntensity = manifest.environmentIntensity ?? 0.25;
  scene.add(gltf.scene);

  for (const light of manifest.lights ?? []) {
    // Blender's light watts are display-referred: a point light of P watts lights a surface
    // like a three.js point light of P / 4π (three's lux carries no 683 lm/W exposure).
    const intensity = light.energyW / (4 * Math.PI);
    if (light.type === 'spot') {
      // A spot aimed at the scene stands in for an area light that casts shadows: it falls off
      // the same way, and a one-sided area light of P watts shines P / π straight ahead.
      const distance = Math.hypot(...light.position.map((v, i) => v - light.target[i]));
      // The normal bias keeps the cards' own faces from shadowing themselves (a fine grain);
      // it stays well under the 2.5 mm between two cards, so their shadows hold.
      const { extent, mapSize = 1024, radius = 4, bias = -0.001, normalBias = 0.0012 } = light.shadow;
      const spot = new SpotLight(light.color, light.energyW / Math.PI, 0, Math.atan(1.5 * extent / distance), 0.4, 2);
      spot.position.fromArray(light.position);
      spot.target.position.fromArray(light.target);
      // The shadow camera covers just the scene (shadow.extent: its radius around the target),
      // so the map resolves the few millimetres between the cards.
      spot.castShadow = true;
      Object.assign(spot.shadow.camera, { near: distance - extent, far: distance + extent });
      spot.shadow.mapSize.set(mapSize, mapSize);
      Object.assign(spot.shadow, { radius, bias, normalBias });
      scene.add(spot, spot.target);
    } else {
      const point = new PointLight(light.color, intensity, 3, 2);
      point.position.fromArray(light.position);
      scene.add(point);
    }
  }
  if (manifest.shadows) gltf.scene.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
  // Glows (nfctags' waves and burst) light nothing and throw no shadow.
  for (const name of manifest.shadowless ?? []) {
    byName(gltf.scene, name)?.traverse(o => { o.castShadow = o.receiveShadow = false; });
  }

  // The phone ships once and is attached under each scene's animated Phone, like the app does.
  // The screen video plays on the page; this stands in for it (its clock) and its picture.
  const video = manifest.screenVideo ? { paused: true, readyState: 0, seenAt: 0, seenTime: 0, texture: null, get currentTime() {
    return this.paused ? this.seenTime : this.seenTime + (performance.now() - this.seenAt) / 1000;
  } } : null;
  view.video = video;
  const phoneNode = gltf.scene.getObjectByName(manifest.phone?.entity ?? 'Phone');
  if (phoneNode && phone) {
    const parts = phone.scene.getObjectByName('Phone') ?? phone.scene;
    for (const child of parts.clone(true).children) phoneNode.add(child);
    const screen = phoneNode.getObjectByName(manifest.phone.screenEntity);
    if (screen && video) {
      const texture = new VideoFrameTexture();
      texture.colorSpace = SRGBColorSpace;
      texture.flipY = false; // glTF UVs
      const material = new MeshBasicMaterial({ map: texture, toneMapped: false });
      screen.traverse(o => { if (o.isMesh) o.material = material; });
      video.texture = texture;
    }
    for (const name of manifest.phone.hiddenEntities ?? []) {
      const hiddenPart = phoneNode.getObjectByName(name);
      if (hiddenPart) hiddenPart.visible = false;
    }
  }

  for (const name of manifest.doubleSided ?? []) {
    byName(gltf.scene, name)?.traverse(o => { if (o.isMesh) o.material.side = DoubleSide; });
  }

  // Opacity tracks: one value per frame, applied to the entity and everything under it.
  const stepped = new Set(manifest.steppedOpacity ?? []);
  const tracks = [];
  for (const [name, values] of Object.entries(manifest.opacity ?? {})) {
    const node = byName(gltf.scene, name);
    if (!node) continue;
    const materials = [];
    node.traverse(o => {
      if (!o.isMesh) return;
      o.material = o.material.clone();
      o.material.transparent = true;
      materials.push(o.material);
    });
    tracks.push({ node, values, materials, stepped: stepped.has(name), base: materials.map(m => m.opacity) });
  }

  // Parts drawn in a colour per theme (nfctags' waves: brand blue on light, brand yellow on
  // dark), following the site's data-theme as the toggle flips it.
  const themed = Object.entries(manifest.themeColors ?? {}).map(([name, colors]) => ({ node: byName(gltf.scene, name), colors }))
    .filter(part => part.node);
  const applyTheme = () => {
    const name = theme.attr === 'dark' ? 'dark' : 'light';
    for (const { node, colors } of themed) {
      node.traverse(o => { if (o.isMesh) { o.material.color.set(colors[name]); o.material.emissive?.set(colors[name]); } });
    }
  };
  if (themed.length) {
    applyTheme();
    themeAppliers.push(applyTheme);
  }

  const mixer = new AnimationMixer(gltf.scene);
  for (const clip of gltf.animations) mixer.clipAction(clip).play();

  const camera = gltf.cameras.find(c => c.name === manifest.camera?.entity) ?? gltf.cameras[0];
  if (!camera) throw new Error('no camera');

  const fps = manifest.fps ?? 30;
  const frameCount = manifest.frameCount;
  return {
    scene,
    // Blender's view exposure, in stops.
    exposure: 2 ** (manifest.exposure ?? 0),
    camera,
    manifest,
    video,
    mixer,
    tracks,
    duration: frameCount / fps,
    fps,
    frameCount,
    time: 0,
  };
}

function byName(root, name) {
  // GLTFLoader sanitizes node names the way PropertyBinding does.
  return root.getObjectByName(name) ?? root.getObjectByName(name.replace(/\s/g, '_').replace(/[[\].:/]/g, ''));
}

// ---- the theme ----
const themeAppliers = [];
// Same rule the code-built scenes always used: the site's data-theme, or else the system's.
const isDark = () => (theme.attr ? theme.attr === 'dark' : theme.prefersDark);
function applyThemes() {
  themeAppliers.forEach(apply => apply());
  bcScenes?.setDark(isDark());
}

// ---- the screen video, from the page ----
function setVideoState(view, state) {
  const { video } = view;
  if (!video) return;
  video.paused = state.paused;
  video.readyState = state.readyState;
  video.seenTime = state.currentTime;
  video.seenAt = performance.now();
}

function takeVideoFrame({ id, frame, state }) {
  const view = views.get(id);
  self.postMessage({ t: 'frame-taken', id });
  const texture = view?.video?.texture;
  if (!texture) {
    frame.close();
    return;
  }
  setVideoState(view, state);
  // The picture already uploaded needs no frame kept open: only the latest stays, and it closes as
  // the next arrives, so a slow moment here cannot starve the browser's video decoder.
  const previous = texture.image;
  texture.setFrame(frame);
  previous?.close?.();
}

// Puts the scene, screen video included, on the given frame.
async function seekTo(view, entry, frame) {
  const time = (frame - 1) / entry.fps;
  entry.time = time;
  step(entry, 0);
  if (!entry.video) return entry;
  await ask('seekVideo', { id: view.id, time });
  entry.time = time;
  step(entry, 0);
  return entry;
}

function step(entry, dt) {
  entry.time = (entry.time + dt) % entry.duration;
  // The screen video is exactly one loop long; keep the animation on its clock.
  const video = entry.video;
  if (video && video.readyState >= 2 && !video.paused && Math.abs(video.currentTime - entry.time) > 0.12) {
    // Across the loop seam the two clocks are a whole loop apart, not out of sync.
    if (Math.abs(video.currentTime - entry.time) < entry.duration / 2) entry.time = video.currentTime;
  }
  entry.mixer.setTime(entry.time);
  const exact = entry.time * entry.fps;
  const i = Math.floor(exact) % entry.frameCount;
  const j = (i + 1) % entry.frameCount;
  for (const track of entry.tracks) {
    const a = track.values[i] ?? 1;
    const b = track.values[j] ?? a;
    const value = track.stepped ? a : a + (b - a) * (exact - Math.floor(exact));
    track.node.visible = value > 0.002;
    track.materials.forEach((m, k) => { m.opacity = track.base[k] * value; });
  }
}

function fitCamera(entry, width, height, frameFill) {
  const { camera, manifest } = entry;
  const aspect = width / height;
  // Same rule as the app: a portrait view shows the whole square frame across its width.
  const stretch = Math.max(1, 1 / aspect) / frameFill;
  if (camera.isOrthographicCamera) {
    const half = (manifest.camera.scale ?? 1) / 2 * stretch;
    camera.top = half;
    camera.bottom = -half;
    camera.left = -half * aspect;
    camera.right = half * aspect;
  } else {
    const halfAngle = (manifest.camera.verticalFovDegrees ?? camera.fov) * Math.PI / 360;
    camera.fov = 2 * Math.atan(Math.tan(halfAngle) * stretch) * 180 / Math.PI;
    camera.aspect = aspect;
  }
  camera.updateProjectionMatrix();
}

// ---- the shared loop ----
const nextFrame = self.requestAnimationFrame
  ? callback => self.requestAnimationFrame(callback)
  : callback => setTimeout(() => callback(performance.now()), 16);
let running = false;
let last = 0;
let slowFrames = 0;
let frameInterval = 0; // 0 = every display frame; 1/30 s once the device struggles
// One batch of frames at a time: while the page is busy, nothing piles up behind it, and the
// animation carries on from where it was once the page can show it.
let awaitingShown = false;

const needsFrame = view => view.visible && view.state === 'ready';
const anyNeedsFrame = () => { for (const view of views.values()) if (needsFrame(view)) return true; return false; };

// A tab switch leaves a frame callback pending, so each run of the loop carries its own token.
let loop = null;
function wake() {
  if (running || hidden) return;
  if (!anyNeedsFrame()) return;
  running = true;
  last = performance.now();
  const run = loop = {};
  nextFrame(now => frame(now, run));
}

let accumulated = 0;
function frame(now, run) {
  if (!running || run !== loop) return;
  // Capped like a single step was on the page, so a long wait does not jump the animation.
  accumulated = Math.min(0.1, accumulated + (now - last) / 1000);
  last = now;
  if (!awaitingShown && accumulated >= frameInterval) {
    const started = performance.now();
    const frames = [];
    for (const view of views.values()) {
      if (!needsFrame(view)) continue;
      if (!view.holding) step(view.scene, accumulated);
      const bitmap = draw(view);
      if (bitmap) frames.push({ id: view.id, bitmap });
    }
    accumulated = 0;
    // Drop to 30 fps when rendering alone keeps eating most of a 60 Hz frame.
    if (frameInterval === 0 && performance.now() - started > 12) {
      if (++slowFrames > 30) {
        frameInterval = 1 / 30;
        log('dropping to 30 fps');
      }
    } else {
      slowFrames = Math.max(0, slowFrames - 1);
    }
    if (frames.length) {
      awaitingShown = true;
      self.postMessage({ t: 'frames', frames }, frames.map(f => f.bitmap));
    }
  }
  if (anyNeedsFrame()) nextFrame(next => frame(next, run));
  else running = false;
}

function draw(view) {
  const { width, height } = view;
  if (!width || !height) return null;
  render(view.scene, width, height, view.frameFill);
  return glCanvas.transferToImageBitmap();
}

function render(entry, width, height, frameFill) {
  if (glCanvas.width !== width || glCanvas.height !== height) renderer.setSize(width, height, false);
  fitCamera(entry, width, height, frameFill);
  renderer.toneMappingExposure = entry.exposure;
  renderer.render(entry.scene, entry.camera);
}

// ---- asking the page, and being asked ----
const replies = new Map();
let calls = 0;
function ask(name, args) {
  return new Promise((resolve, reject) => {
    const call = ++calls;
    replies.set(call, data => (data.error ? reject(new Error(data.error)) : resolve(data.value)));
    self.postMessage({ t: 'call', call, name, args });
  });
}

const workerCalls = {
  // ?debug, for render-poster.mjs: a still of a view at a frame (the poster's unless given), as a Blob.
  async snapshot({ id, frame, width, height, type, quality }) {
    const view = views.get(id);
    if (view.state !== 'ready') throw new Error(`scene not ready: ${view.state}`);
    await seekTo(view, view.scene, frame ?? view.posterFrame);
    render(view.scene, width, height, view.frameFill);
    return glCanvas.convertToBlob({ type, quality });
  },
};
