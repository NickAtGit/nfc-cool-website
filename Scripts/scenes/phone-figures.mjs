// Phone figures: a 3D iPhone in a blog post that shows the app's screens, step by step.
//
// PhoneFigureProcessor expands a post's <figure class="phone-figure"> into its final markup at
// build time: a device box (the screenshots, stacked, behind a still of the phone with its screen
// cut out), the step buttons and the dots. So the figure is laid out before any script runs, and
// works in three tiers:
//   1. No JS: the first screen in the phone still, every step's text beside or under it.
//   2. This module, always: buttons, dots, arrow keys, swipe and tap step through the screens,
//      which cross-fade in the DOM, so their text stays pin-sharp. A stage (data-layout="stage")
//      also moves on by itself while it is in view, until the reader takes over.
//   3. WebGL2, no reduced motion, no Save-Data: once the page is idle and the figure is near the
//      viewport, three.js and the phone (blog_phone.glb, ~150 KB) load and a canvas draws the same
//      phone, straight on, exactly over the still. It fades in, turns gently towards the text, and
//      then follows the pointer: hovering leans it, a drag turns it. A step change pushes the next
//      screen in from the side, the way the app itself navigates; the phone holds still for it.
//      It draws only while something moves.
//
// The still (blog_phone_shell.webp) is drawn by this module itself (?debug, see
// Scripts/scenes/render-phone-shell.mjs), so the two match; window.phoneFigures.screenRect()
// prints where the screen sits, for .phone-figure-screens in Theme/css/phone-figure.css.
//
// This is the source: Scripts/scenes/build.sh --js bundles it (with ./phone-figures/*.mjs) into
// Content/StaticFiles/scenes/, next to the three bundle it shares with live-scenes.mjs.
import { createSteps } from './phone-figures/steps.mjs';
import { createSpring } from './phone-figures/spring.mjs';
import { createSwipe } from './phone-figures/gesture.mjs';

const BASE = new URL('./', import.meta.url);
const MAX_DPR = 2;
const NEAR_VIEWPORT = '300px';
// The camera: the device straight on, filling PHONE_FILL of its box (CSS aspect-ratio, 5 / 8 for a
// phone) in whichever direction is tighter.
const FOV = 20;
const PHONE_FILL = 0.84;
// The pose it rests in once live, turned towards the text (degrees), and how far a drag turns it.
const REST_YAW = 14;
const REST_PITCH = 3;
const HOVER_YAW = 15;
const HOVER_PITCH = 10;
const DRAG_YAW = 35;
const DRAG_PITCH = 15;
const PUSH_MS = 460;
// What a figure shows (data-device): the phone from the front, its screen showing the shots, or
// the phone in the orange NFC e-ink case from the back, its e-ink panel showing them. pin is how
// much of the top of the screen stays put through a push (the phone's status bar).
// aspect is the box's (width / height, matching the CSS); stillPitch the tilt (degrees) the still
// and the first frame show it at, so a laptop's display faces the camera with its deck in view.
const DEVICES = {
  phone: { model: 'blog_phone.glb', screen: 'Object_13', back: false, pin: 0.052, aspect: 5 / 8, stillPitch: 0 },
  einkcase: { model: 'blog_einkcase.glb', screen: 'EInkPanel', back: true, pin: -1, aspect: 5 / 8, stillPitch: 0 },
};

const figures = [...document.querySelectorAll('figure.phone-figure')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;
const rtl = document.documentElement.dir === 'rtl';
const debug = new URLSearchParams(location.search).has('debug');
const log = (...args) => debug && console.log('[phone-figures]', ...args);

const views = figures.map(setUp);

if (views.length && !reducedMotion && !saveData && hasWebGL2()) {
  afterLoad().then(goLive).catch(error => console.warn('[phone-figures]', error));
} else {
  log('3D skipped', { reducedMotion, saveData });
}
if (debug) window.phoneFigures = { views };

// ---- tier 2: the DOM figure ----

function setUp(figure) {
  const device = figure.querySelector('.phone-figure-device');
  const shots = [...figure.querySelectorAll('.phone-figure-shot')];
  const items = [...figure.querySelectorAll('.phone-figure-steps > li')];
  const buttons = items.map(li => li.querySelector('.phone-figure-step'));
  const dots = [...figure.querySelectorAll('.phone-figure-dots > button')];
  const view = { figure, device, shots, live: null };

  const show = i => {
    shots.forEach((shot, k) => shot.classList.toggle('is-active', k === i));
    items.forEach((li, k) => li.classList.toggle('is-active', k === i));
    buttons.forEach((b, k) => b?.setAttribute('aria-pressed', String(k === i)));
    dots.forEach((d, k) => d.setAttribute('aria-pressed', String(k === i)));
  };
  view.steps = createSteps({
    count: shots.length,
    onChange: (i, from) => {
      show(i);
      view.live?.change(i, from);
    },
  });
  show(0);

  buttons.forEach((b, i) => b?.addEventListener('click', () => view.steps.go(i, { user: true })));
  dots.forEach((d, i) => d.addEventListener('click', () => view.steps.go(i, { user: true })));
  figure.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (!figure.contains(document.activeElement) || event.target.closest('input, textarea')) return;
    const forward = (event.key === 'ArrowRight') !== rtl;
    forward ? view.steps.next({ user: true }) : view.steps.prev({ user: true });
    // Keep focus on the control of the step now showing, so the keys keep working from there.
    const visible = [...buttons, ...dots].filter(b => b && b.offsetParent && b.getAttribute('aria-pressed') === 'true');
    visible[0]?.focus({ preventScroll: true });
    event.preventDefault();
  });

  // Touch: swipe sideways or tap the phone to step; vertical moves stay the page's (pan-y).
  const swipe = createSwipe({ rtl });
  let touch = null;
  device.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') return;
    touch = { x: event.clientX, y: event.clientY, t: performance.now(), id: event.pointerId };
  });
  device.addEventListener('pointercancel', () => { touch = null; });
  device.addEventListener('pointerup', event => {
    if (!touch || event.pointerId !== touch.id) return;
    const gesture = swipe.classify({ dx: event.clientX - touch.x, dy: event.clientY - touch.y, ms: performance.now() - touch.t });
    touch = null;
    if (gesture === 'next' || gesture === 'tap') view.steps.next({ user: true });
    else if (gesture === 'prev') view.steps.prev({ user: true });
  });
  // A mouse click on the phone (without dragging it, see goLive) also moves on.
  device.addEventListener('click', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    if (view.dragged) { view.dragged = false; return; }
    view.steps.next({ user: true });
  });

  // A stage moves on by itself while most of it is in view, on screens with a real pointer only:
  // on a phone the reader scrolls past, and a figure changing under their thumb is a distraction.
  const autoplay = figure.dataset.layout === 'stage' && shots.length > 1 && !reducedMotion
    && matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (autoplay) {
    new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? view.steps.play() : view.steps.pause();
    }, { threshold: 0.6 }).observe(figure);
  }
  return view;
}

// ---- tier 3: the live phone ----

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

async function goLive() {
  const t0 = performance.now();
  const THREE = await import('./vendor/three.scenes.min.mjs');
  log(`three loaded in ${Math.round(performance.now() - t0)} ms`);
  const {
    Box3, DirectionalLight, GLTFLoader, Group, MeshBasicMaterial, MeshoptDecoder, NeutralToneMapping,
    NoBlending, PMREMGenerator, PerspectiveCamera, RoomEnvironment, SRGBColorSpace, Scene, ShaderMaterial,
    Texture, Vector3, WebGLRenderer,
  } = THREE;

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const models = new Map();
  const loadModel = name => {
    if (!models.has(name)) models.set(name, loader.loadAsync(new URL(name, BASE).href));
    return models.get(name);
  };

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const view = views.find(v => v.figure === entry.target);
      mount(view).catch(error => console.warn('[phone-figures]', error));
    }
  }, { rootMargin: NEAR_VIEWPORT });
  views.forEach(view => observer.observe(view.figure));

  if (debug) Object.assign(window.phoneFigures, { THREE });

  async function mount(view) {
    const started = performance.now();
    const { device } = view;
    const canvas = document.createElement('canvas');
    canvas.className = 'phone-figure-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: debug });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = NeutralToneMapping;
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.9;
    pmrem.dispose();
    const key = new DirectionalLight(0xffffff, 1.6);
    key.position.set(-0.4, 0.6, 1);
    scene.add(key);

    const kind = DEVICES[view.figure.dataset.device] ?? DEVICES.phone;
    const gltf = await loadModel(kind.model);
    const parts = (gltf.scene.getObjectByName('Phone') ?? gltf.scene).clone(true);
    // The model's screen faces -Z: turn it to the camera (or, for the case, show its back) and
    // centre it, so it turns about its own middle.
    const facing = new Group();
    facing.rotation.y = kind.back ? 0 : Math.PI;
    facing.add(parts);
    const center = new Box3().setFromObject(facing).getCenter(new Vector3());
    facing.position.sub(center);
    const pose = new Group();
    pose.add(facing);
    scene.add(pose);
    const size = new Box3().setFromObject(pose).getSize(new Vector3());

    const camera = new PerspectiveCamera(FOV, kind.aspect, 0.05, 5);
    const halfTan = Math.tan(FOV * Math.PI / 360);
    camera.position.set(0, 0, Math.max(
      size.y / PHONE_FILL / 2 / halfTan,
      size.x / PHONE_FILL / 2 / (halfTan * kind.aspect),
    ));
    camera.lookAt(0, 0, 0);

    // The screen: shot a, and shot b on its way in, either fading over a or pushing it aside the
    // way an iOS navigation push does (b slides in from the side, a drifts a third of the way out).
    const screen = parts.getObjectByName(kind.screen);
    if (!screen) throw new Error('no screen mesh');
    const base = new ShaderMaterial({
      toneMapped: false,
      uniforms: { a: { value: null }, b: { value: null }, t: { value: 0 }, dir: { value: 1 }, pin: { value: kind.pin } },
      vertexShader: `varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      // No texture reads inside branches: the GPU works out which mip level to sample from the
      // neighbouring pixels, and where they take different branches (the edge of the status bar
      // band) the guess goes wrong and draws a dashed line. Every pixel samples all four, then picks.
      fragmentShader: `uniform sampler2D a; uniform sampler2D b; uniform float t; uniform float dir; uniform float pin;
        varying vec2 vUv;
        void main() {
          // dir 1: b comes in from the right; -1: from the left. x runs in the direction of travel.
          float x = dir > 0.0 ? vUv.x : 1.0 - vUv.x;
          float edge = 1.0 - t;
          float bx = x - edge;
          float ax = x + t * 0.33;
          vec4 pushedB = texture2D(b, vec2(dir > 0.0 ? bx : 1.0 - bx, vUv.y));
          vec4 pushedA = texture2D(a, vec2(dir > 0.0 ? ax : 1.0 - ax, vUv.y));
          vec4 stillA = texture2D(a, vUv);
          vec4 stillB = texture2D(b, vUv);
          pushedB.rgb *= 1.0 - 0.12 * smoothstep(0.0, 0.03, 0.03 - bx); // a soft shadow on b's leading edge
          pushedA.rgb *= 1.0 - 0.18 * t; // a dims as it goes, like the screen underneath a push
          vec4 pushed = mix(pushedA, pushedB, step(edge, x));
          // The status bar stays put through a push, as on iOS (every shot has the same 9:41 bar;
          // glTF UVs run top down).
          vec4 still = mix(stillA, stillB, step(0.5, t));
          gl_FragColor = mix(pushed, still, step(vUv.y, pin));
          #include <colorspace_fragment>
        }`,
    });
    // GLTFLoader may keep the node as a group around the mesh: dress the meshes under it.
    screen.traverse(o => { if (o.isMesh) o.material = base; });

    const textures = new Map();
    const textureFor = async i => {
      if (!textures.has(i)) {
        textures.set(i, (async () => {
          const img = view.shots[i];
          img.loading = 'eager';
          await img.decode();
          const texture = new Texture(img);
          texture.colorSpace = SRGBColorSpace;
          texture.flipY = false; // glTF UVs
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.needsUpdate = true;
          return texture;
        })());
      }
      return textures.get(i);
    };
    base.uniforms.a.value = base.uniforms.b.value = await textureFor(view.steps.index);

    // Which way is "towards the text": a stage's phone sits at the start of the line, a float's at its end.
    const atStart = view.figure.dataset.layout === 'stage' ? view.figure.dataset.side !== 'end' : view.figure.dataset.side === 'start';
    const towardsText = (atStart !== rtl) ? 1 : -1;
    const yaw = createSpring({ value: 0 });
    const pitch = createSpring({ value: kind.stillPitch });
    const rest = { yaw: towardsText * REST_YAW, pitch: kind.stillPitch + REST_PITCH };
    let fade = null; // { to, start }

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
      width = Math.round(device.clientWidth * dpr);
      height = Math.round(device.clientHeight * dpr);
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      invalidate();
    };

    let running = false;
    let last = 0;
    function invalidate() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }
    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      yaw.step(dt);
      pitch.step(dt);
      if (fade) {
        const t = Math.min(1, (now - fade.start) / PUSH_MS);
        base.uniforms.t.value = 1 - Math.pow(1 - t, 3); // ease out, like a navigation push
        if (t === 1) {
          base.uniforms.a.value = base.uniforms.b.value;
          base.uniforms.t.value = 0;
          fade = null;
        }
      }
      draw();
      if (!yaw.settled || !pitch.settled || fade) requestAnimationFrame(frame);
      else running = false;
    }
    function draw() {
      pose.rotation.set(pitch.value * Math.PI / 180, yaw.value * Math.PI / 180, 0);
      renderer.render(scene, camera);
    }

    view.live = {
      async change(to, from) {
        const texture = await textureFor(to);
        if (view.steps.index !== to) return; // the reader has already moved on
        if (fade) base.uniforms.a.value = base.uniforms.b.value;
        const forward = to > from ? to - from <= view.shots.length / 2 : from - to > view.shots.length / 2;
        base.uniforms.b.value = texture;
        base.uniforms.t.value = 0;
        base.uniforms.dir.value = (forward !== rtl) ? 1 : -1; // back slides the other way, like iOS
        fade = { to, start: performance.now() };
        invalidate();
      },
    };

    // Pointer: hovering turns the phone to face the pointer (both axes the same way: the point under
    // the pointer recedes), dragging turns it further as if the screen were grabbed and pulled,
    // and letting go springs it back to rest. Touch never turns it: there, a swipe steps (setUp).
    let drag = null;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const relative = event => {
      const box = device.getBoundingClientRect();
      return { x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 };
    };
    if (fine) {
      device.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        if (drag) {
          const dx = event.clientX - drag.x;
          const dy = event.clientY - drag.y;
          if (Math.hypot(dx, dy) > 4) view.dragged = true;
          yaw.target = clamp(drag.yaw + dx * 0.45, -DRAG_YAW, DRAG_YAW);
          pitch.target = clamp(drag.pitch + dy * 0.3, kind.stillPitch - DRAG_PITCH, kind.stillPitch + DRAG_PITCH);
        } else {
          const p = relative(event);
          yaw.target = rest.yaw + p.x * 2 * HOVER_YAW;
          pitch.target = rest.pitch + p.y * 2 * HOVER_PITCH;
        }
        invalidate();
      });
      device.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        drag = { x: event.clientX, y: event.clientY, yaw: yaw.target, pitch: pitch.target };
        view.dragged = false;
        device.setPointerCapture(event.pointerId);
        device.classList.add('is-dragging');
        event.preventDefault(); // no text selection
      });
      const release = () => {
        if (!drag) return;
        drag = null;
        device.classList.remove('is-dragging');
        yaw.target = rest.yaw;
        pitch.target = rest.pitch;
        invalidate();
      };
      device.addEventListener('pointerup', release);
      device.addEventListener('lostpointercapture', release);
      device.addEventListener('pointerleave', () => {
        if (drag) return;
        yaw.target = rest.yaw;
        pitch.target = rest.pitch;
        invalidate();
      });
    }

    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      running = true; // stop drawing for good
      view.live = null;
      device.classList.remove('is-live');
      canvas.remove();
    });

    // First frame: straight on, exactly the still. Then fade the canvas in and turn to rest.
    device.append(canvas);
    resize();
    new ResizeObserver(resize).observe(device);
    draw();
    device.classList.add('is-live');
    log(`figure live in ${Math.round(performance.now() - started)} ms`);
    setTimeout(() => {
      yaw.target = rest.yaw;
      pitch.target = rest.pitch;
      invalidate();
    }, 450);

    if (debug) {
      Object.assign(view, { renderer, scene, camera, pose, screen, draw, yaw, pitch });
      // The still: the phone straight on, its screen cut out (alpha 0) for the shots behind it.
      view.renderShell = (w, h) => {
        const hole = new MeshBasicMaterial({ color: 0x000000, opacity: 0, blending: NoBlending });
        screen.traverse(o => { if (o.isMesh) o.material = hole; });
        pose.rotation.set(kind.stillPitch * Math.PI / 180, 0, 0);
        renderer.setSize(w, h, false);
        renderer.render(scene, camera);
        const url = canvas.toDataURL('image/webp', 0.92);
        screen.traverse(o => { if (o.isMesh) o.material = base; });
        resize();
        return url;
      };
      // Where the screen lands in the box, straight on, as CSS percentages of it.
      view.screenRect = () => {
        pose.rotation.set(kind.stillPitch * Math.PI / 180, 0, 0);
        pose.updateMatrixWorld(true);
        const box = new Box3().setFromObject(screen);
        const corners = [new Vector3(box.min.x, box.min.y, box.max.z), new Vector3(box.max.x, box.max.y, box.max.z)]
          .map(v => v.project(camera));
        const [a, b] = corners;
        const pct = v => +(v * 100).toFixed(3);
        return {
          left: pct((Math.min(a.x, b.x) + 1) / 2),
          top: pct((1 - Math.max(a.y, b.y)) / 2),
          width: pct(Math.abs(b.x - a.x) / 2),
          height: pct(Math.abs(b.y - a.y) / 2),
        };
      };
    }
  }
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
