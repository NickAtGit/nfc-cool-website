// Live 3D scenes: an <img data-scene="<key>" data-poster-frame="<n>"> comes to life in place.
//
// The image is frame <n> of scene <key>, rendered by this player at the same framing
// (Scripts/scenes/render-poster.mjs). It stays a plain image until the page has loaded and the
// browser is idle; only then is three.js fetched, and the scene's files once the image comes near
// the viewport. When the scene's first frame is drawn, held on frame <n>, the image fades out and
// the canvas fades in and plays on from there. Reduced motion, Save-Data, no WebGL2 or any error:
// the image simply stays. LiveSceneScriptProcessor loads this module on pages that need it.
//
// The scene packages are NFCcoolScenes' app exports (Scripts/scenes/build.sh): a GLB with the
// baked animation, the manifest with the opacity tracks, lights and camera, and the phone-screen
// video, played the way OnboardingKit's FeatureScenePlayer plays them in the app. Each scene
// loops like the app's page does and renders only while it is on screen.
//
// One WebGL context on an OffscreenCanvas draws every scene (browsers cap contexts at about 16,
// Safari lower); each frame is handed to the image's canvas as an ImageBitmap, so it scrolls
// with the page natively. (Copying with a 2D drawImage does not work: Chrome defers the copy to
// the end of the frame, by when the shared buffer holds the last scene drawn.)
//
// data-frame-fill sets how much of the app's square frame the image shows (1 = all of it; the
// Business Card hero uses 0.5, because its lanyard set runs well past the app's frame).
// ?debug logs timings and exposes window.liveScenes, which render-poster.mjs drives.

const BASE = new URL('./', import.meta.url);
const MAX_DPR = 2;
const NEAR_VIEWPORT = '300px';

const images = [...document.querySelectorAll('img[data-scene][data-poster-frame]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;
const debug = new URLSearchParams(location.search).has('debug');
const log = (...args) => debug && console.log('[live-scenes]', ...args);

if (images.length && !reducedMotion && !saveData && 'OffscreenCanvas' in window && hasWebGL2()) {
  afterLoad().then(start).catch(error => console.warn('[live-scenes]', error));
} else {
  log('skipped', { reducedMotion, saveData });
}

function hasWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function afterLoad() {
  const loaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => addEventListener('load', resolve, { once: true }));
  return loaded.then(() => new Promise(resolve => {
    if ('requestIdleCallback' in window) requestIdleCallback(resolve, { timeout: 2000 });
    else setTimeout(resolve, 200);
  }));
}

async function start() {
  const t0 = performance.now();
  const THREE = await import('./vendor/three.scenes.min.mjs');
  log(`three loaded in ${Math.round(performance.now() - t0)} ms`);
  const {
    AnimationMixer, DoubleSide, GLTFLoader, MeshBasicMaterial, MeshoptDecoder, NeutralToneMapping,
    PMREMGenerator, PointLight, RoomEnvironment, SRGBColorSpace, Scene, VideoTexture, WebGLRenderer,
  } = THREE;

  const glCanvas = new OffscreenCanvas(1, 1);
  const renderer = new WebGLRenderer({ canvas: glCanvas, alpha: true, antialias: true, premultipliedAlpha: true });
  renderer.outputColorSpace = SRGBColorSpace;
  // Blender renders these scenes with Khronos PBR Neutral (studio.py), and so does three.
  renderer.toneMapping = NeutralToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(1); // sizes below are already in device pixels

  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  let phonePromise = null;
  const loadPhone = () => (phonePromise ??= loader.loadAsync(new URL('feature_phone.glb', BASE).href));

  const views = images.map(img => ({
    img,
    key: img.dataset.scene,
    frameFill: Number(img.dataset.frameFill) || 1,
    posterFrame: Number(img.dataset.posterFrame),
    // The scene holds on the poster's frame until the poster has faded out.
    holding: true,
    state: 'idle', // idle → loading → ready | failed
    visible: false,
    canvas: null,
    ctx: null,
    scene: null,
  }));

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const view = views.find(v => v.img === entry.target || v.canvas === entry.target);
      if (!view) continue;
      view.visible = entry.isIntersecting;
      if (view.visible && view.state === 'idle') load(view);
      if (view.scene) view.visible ? play(view) : view.scene.video.pause();
    }
    wake();
  }, { rootMargin: NEAR_VIEWPORT });
  views.forEach(view => observer.observe(view.img));

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
      buildScene(view.key)
        .then(scene => seekTo(scene, view.posterFrame))
        .then(scene => {
          view.scene = scene;
          view.state = 'ready';
          log(`${view.key} ready in ${Math.round(performance.now() - started)} ms`);
          if (view.visible) play(view);
          wake();
        })
        .catch(error => {
          view.state = 'failed';
          console.warn(`[live-scenes] ${view.key}`, error);
        })
        .finally(() => {
          inFlight--;
          pump();
        });
    }
  }

  async function buildScene(key) {
    const [gltf, manifest, phone, videoSrc] = await Promise.all([
      loader.loadAsync(new URL(`${key}.glb`, BASE).href),
      fetch(new URL(`${key}.json`, BASE)).then(r => {
        if (!r.ok) throw new Error(`manifest ${r.status}`);
        return r.json();
      }),
      loadPhone(),
      // A server without range requests (python's http.server) leaves a video unseekable even
      // once it is fully buffered, and the scene starts on its poster's frame; a blob URL always
      // seeks. The clips are ~100 KB.
      fetch(new URL(`${key}_screen.mp4`, BASE)).then(r => {
        if (!r.ok) throw new Error(`screen video ${r.status}`);
        return r.blob();
      }).then(blob => URL.createObjectURL(blob)),
    ]);
    const scene = new Scene();
    scene.environment = environment;
    scene.environmentIntensity = manifest.environmentIntensity ?? 0.25;
    scene.add(gltf.scene);

    for (const light of manifest.lights ?? []) {
      // Blender's light watts are display-referred: a point light of P watts lights a surface
      // like a three.js point light of P / 4π (three's lux carries no 683 lm/W exposure).
      const point = new PointLight(light.color, light.energyW / (4 * Math.PI), 3, 2);
      point.position.fromArray(light.position);
      scene.add(point);
    }

    // The phone ships once and is attached under each scene's animated Phone, like the app does.
    const video = makeVideo(videoSrc);
    const phoneNode = gltf.scene.getObjectByName(manifest.phone?.entity ?? 'Phone');
    if (phoneNode && phone) {
      const parts = phone.scene.getObjectByName('Phone') ?? phone.scene;
      for (const child of parts.clone(true).children) phoneNode.add(child);
      const screen = phoneNode.getObjectByName(manifest.phone.screenEntity);
      if (screen) {
        const texture = new VideoTexture(video);
        texture.colorSpace = SRGBColorSpace;
        texture.flipY = false; // glTF UVs
        const material = new MeshBasicMaterial({ map: texture, toneMapped: false });
        screen.traverse(o => { if (o.isMesh) o.material = material; });
      }
      for (const name of manifest.phone.hiddenEntities ?? []) {
        const hidden = phoneNode.getObjectByName(name);
        if (hidden) hidden.visible = false;
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

    const mixer = new AnimationMixer(gltf.scene);
    for (const clip of gltf.animations) mixer.clipAction(clip).play();

    const camera = gltf.cameras.find(c => c.name === manifest.camera?.entity) ?? gltf.cameras[0];
    if (!camera) throw new Error('no camera');

    const fps = manifest.fps ?? 30;
    const frameCount = manifest.frameCount;
    return {
      scene,
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

  function play(view) {
    if (!view.holding) view.scene.video.play().catch(() => {});
  }

  // Puts the scene, screen video included, on the given frame.
  async function seekTo(scene, frame) {
    const time = (frame - 1) / scene.fps;
    const { video } = scene;
    if (video.readyState < 1) await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }));
    video.currentTime = time;
    await new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));
    scene.scene.traverse(o => { if (o.material?.map?.isVideoTexture) o.material.map.needsUpdate = true; });
    scene.time = time;
    step(scene, 0);
    return scene;
  }

  function makeVideo(src) {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = src;
    return video;
  }

  function byName(root, name) {
    // GLTFLoader sanitizes node names the way PropertyBinding does.
    return root.getObjectByName(name) ?? root.getObjectByName(name.replace(/\s/g, '_').replace(/[[\].:/]/g, ''));
  }

  function step(entry, dt) {
    entry.time = (entry.time + dt) % entry.duration;
    // The screen video is exactly one loop long; keep the animation on its clock.
    const video = entry.video;
    if (video.readyState >= 2 && !video.paused && Math.abs(video.currentTime - entry.time) > 0.12) {
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
  let running = false;
  let last = 0;
  let slowFrames = 0;
  let frameInterval = 0; // 0 = every display frame; 1/30 s once the device struggles

  const needsFrame = view => view.visible && view.state === 'ready';

  function wake() {
    if (running || document.hidden) return;
    if (!views.some(needsFrame)) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      views.forEach(v => v.scene?.video.pause());
    } else {
      views.forEach(v => v.visible && v.scene && play(v));
      wake();
    }
  });

  let accumulated = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    accumulated += dt;
    if (accumulated >= frameInterval) {
      const started = performance.now();
      for (const view of views) {
        if (!needsFrame(view)) continue;
        if (!view.holding) step(view.scene, accumulated);
        draw(view);
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
    }
    if (views.some(needsFrame)) requestAnimationFrame(frame);
    else running = false;
  }

  function draw(view) {
    const box = view.canvas?.isConnected ? view.canvas : view.img;
    const cssWidth = box.offsetWidth;
    const cssHeight = box.offsetHeight;
    if (!cssWidth || !cssHeight) return;
    const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
    const width = Math.round(cssWidth * dpr);
    const height = Math.round(cssHeight * dpr);

    if (glCanvas.width !== width || glCanvas.height !== height) renderer.setSize(width, height, false);
    fitCamera(view.scene, width, height, view.frameFill);
    renderer.render(view.scene.scene, view.scene.camera);

    if (!view.canvas) swapIn(view, cssWidth, cssHeight);
    // Chrome scales the bitmap to the canvas's own width and height (300 x 150 by default)
    // before CSS sizes the element; Safari shows it at its own size. Match them.
    if (view.canvas.width !== width || view.canvas.height !== height) {
      view.canvas.width = width;
      view.canvas.height = height;
    }
    view.ctx.transferFromImageBitmap(glCanvas.transferToImageBitmap());
  }

  // The canvas holds the poster's frame: fade the poster out, then fade the canvas in in its
  // place and let the scene play on.
  function swapIn(view, cssWidth, cssHeight) {
    const { img } = view;
    const canvas = document.createElement('canvas');
    canvas.className = `${img.className} live-scene`.trim();
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', img.alt);
    canvas.dataset.scene = view.key;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.aspectRatio = `${cssWidth} / ${cssHeight}`;
    canvas.style.height = 'auto';
    canvas.style.maxWidth = '100%';
    view.canvas = canvas;
    view.ctx = canvas.getContext('bitmaprenderer');
    img.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'forwards' }).finished.then(() => {
      if (view.canvas !== canvas || view.state !== 'ready') return;
      observer.unobserve(img);
      img.replaceWith(canvas);
      observer.observe(canvas);
      img.getAnimations().forEach(animation => animation.cancel());
      view.holding = false;
      play(view);
      canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
    });
  }

  glCanvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    running = false;
    for (const view of views) {
      view.img.getAnimations().forEach(animation => animation.cancel());
      if (view.canvas?.isConnected) view.canvas.replaceWith(view.img);
      view.scene?.video.pause();
      view.state = 'failed';
    }
  });

  if (debug) window.liveScenes = { views, renderer, step, fitCamera, seekTo };
}
