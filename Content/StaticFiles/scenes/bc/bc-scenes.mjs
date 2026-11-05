// Business Card page scenes, hosted by /scenes/scene-worker.mjs (data-scene="bc/<name>"). Every scene is built in code and is a pure function of its loop
// time (update(t)), so any frame can be shown or exported. One WebGL context on an OffscreenCanvas
// draws all of them, handed to each tile as an ImageBitmap, the same way the site's other scenes are.
// This runs in a worker: no document, so canvases are OffscreenCanvas and images are ImageBitmap.
import * as THREE from '../vendor/three.scenes.min.mjs';
const { CanvasTexture, SRGBColorSpace, Shape, ExtrudeGeometry, ShapeGeometry, Mesh, Group, MeshStandardMaterial, MeshBasicMaterial,
  ShaderMaterial, ShadowMaterial, PlaneGeometry, RingGeometry, TubeGeometry, CatmullRomCurve3, Vector3, Color, Box3, DoubleSide,
  Scene, PerspectiveCamera, DirectionalLight, WebGLRenderer, PMREMGenerator, NeutralToneMapping, PCFShadowMap,
  GLTFLoader, MeshoptDecoder, RoomEnvironment } = THREE;

const BASE = new URL('./', import.meta.url);
const QR = ["11111110010000100011001111111", "10000010010100001110001000001", "10111010000010110101101011101", "10111010010101001010001011101", "10111010010010000000001011101", "10000010101100011101001000001", "11111110101010101010101111111", "00000000010101011110000000000", "10010110110000101001010100000", "01110101011111011110111001001", "01010011101101110111000001110", "11000100000011001010101110110", "01011111111000110110011001011", "01000001110101111001110100000", "01101010110111100100110001111", "00010100100110010111101101010", "10011111000011000101010000010", "01001000001011111000011101001", "10101111011010111110110000011", "00011100001110100111000000011", "10111010100010011000111110100", "00000000111110110101100010111", "11111110010110001010101010010", "10000010101100101010100011101", "10111010011010011100111110010", "10111010110010001111101111101", "10111010001001001011100011101", "10000010011001111101101110010", "11111110101000000101100101010"];
const TW = '"Titillium Web", system-ui, sans-serif';
const BLUE = '#1A60CE', SKY = '#128CF0', YELLOW = '#FFC700', INK = '#212529', MUTED = '#686F76', LINE = '#E6E8EB';
const FLOOR = -2.75;

// ---- timing ----
const clamp = x => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const ss = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
const pop = (a, b, x) => { const k = clamp((x - a) / (b - a)); const c = 1.70158; return k === 0 ? 0 : 1 + (c + 1) * (k - 1) ** 3 + c * (k - 1) ** 2; };
const win = (a, b, c, d, x) => ss(a, b, x) * (1 - ss(c, d, x));
const arc = (from, to, k, lift) => [lerp(from[0], to[0], k), lerp(from[1], to[1], k) + Math.sin(Math.PI * k) * lift, lerp(from[2], to[2], k) + Math.sin(Math.PI * k) * .5];

const made = [];
// ---- 2D drawing for faces and screens ----
function tex(w, h, paint) {
  const c = new OffscreenCanvas(w, h);
  const x = c.getContext('2d');
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  made.push(t);
  t.paint = fn => { x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, w, h); x.textBaseline = 'middle'; fn(x, w, h); t.needsUpdate = true; return t; };
  if (paint) t.paint(paint);
  return t;
}
function say(x, s, cx, cy, font, color, align = 'center') {
  x.font = font; x.fillStyle = color; x.textAlign = align; x.fillText(s, cx, cy);
}
function box(x, a, b, w, h, r, fill, stroke, lw = 2) {
  x.beginPath(); x.roundRect(a, b, w, h, r);
  if (fill) { x.fillStyle = fill; x.fill(); }
  if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.stroke(); }
}
function wordmark(x, cx, cy, size, ink, align = 'center') {
  const nfc = `300 ${size}px ${TW}`, cool = `700 ${size * .92}px Caveat, cursive`;
  x.font = nfc; const a = x.measureText('NFC').width;
  x.font = cool; const b = x.measureText('.cool').width;
  const left = align === 'center' ? cx - (a + b) / 2 : align === 'right' ? cx - a - b : cx;
  say(x, 'NFC', left, cy, nfc, ink, 'left');
  say(x, '.cool', left + a, cy + size * .04, cool, YELLOW, 'left');
}
// The NFC mark points forward: )))
function waves(x, cx, cy, size, color) {
  x.strokeStyle = color; x.lineCap = 'round'; x.lineWidth = size * .13;
  for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(cx - size * .35, cy, size * (.3 + i * .3), -.75, .75); x.stroke(); }
}
function qr(x, a, b, size, dark = '#111') {
  const n = QR.length, m = size / n;
  x.fillStyle = dark;
  QR.forEach((row, j) => [...row].forEach((v, i) => { if (v === '1') x.fillRect(a + i * m, b + j * m, m + .5, m + .5); }));
}
const images = {};
const SW = 660, SH = 1434;

// ---- 3D parts ----
function outline(w, h, r) {
  const s = new Shape(), a = -w / 2, b = -h / 2;
  s.moveTo(a + r, b); s.lineTo(a + w - r, b); s.absarc(a + w - r, b + r, r, -Math.PI / 2, 0);
  s.lineTo(a + w, b + h - r); s.absarc(a + w - r, b + h - r, r, 0, Math.PI / 2);
  s.lineTo(a + r, b + h); s.absarc(a + r, b + h - r, r, Math.PI / 2, Math.PI);
  s.lineTo(a, b + r); s.absarc(a + r, b + r, r, Math.PI, Math.PI * 1.5);
  return s;
}
function faceGeo(w, h, r) {
  const g = new ShapeGeometry(outline(w, h, r), 12), p = g.attributes.position, u = g.attributes.uv;
  for (let i = 0; i < p.count; i++) u.setXY(i, p.getX(i) / w + .5, p.getY(i) / h + .5);
  return g;
}
function plate(w, h, { d = .07, r = .14, color = '#fff', map, back, rough = .5, metal = 0 } = {}) {
  const g = new Group();
  const bev = Math.min(.014, d / 3);
  const geo = new ExtrudeGeometry(outline(w - bev * 2, h - bev * 2, Math.max(.01, r - bev)), { depth: d - bev * 2, bevelEnabled: true, bevelSize: bev, bevelThickness: bev, bevelSegments: 2, curveSegments: 12 });
  geo.translate(0, 0, -d / 2 + bev);
  const body = new Mesh(geo, new MeshStandardMaterial({ color, roughness: rough, metalness: metal }));
  body.castShadow = true;
  g.add(body);
  g.body = body;
  if (map) {
    const face = new Mesh(faceGeo(w, h, r), new MeshBasicMaterial({ map, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    face.position.z = d / 2 + .004;
    g.add(face);
    g.face = face;
  }
  if (back) {
    const face = new Mesh(faceGeo(w, h, r), new MeshBasicMaterial({ map: back, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    face.position.z = -d / 2 - .004;
    face.rotation.y = Math.PI;
    g.add(face);
  }
  return g;
}
const PX = 170;
// A pill or chip whose face can be repainted when its value changes.
function chip(w, h, paint, opts = {}) {
  const t = tex(Math.round(w * PX), Math.round(h * PX));
  const p = plate(w, h, { r: opts.r ?? h / 2, d: opts.d ?? .16, map: t, color: opts.color ?? '#fff' });
  let key;
  p.show = (k, fn = paint) => {
    if (k === key) return;
    key = k;
    t.paint((x, W, H) => { box(x, 0, 0, W, H, 0, opts.color ?? '#fff'); fn(x, W, H, k); });
  };
  p.show(opts.first ?? 0);
  return p;
}
function label(w, h, text, color = INK) {
  return chip(w, h, (x, W, H) => say(x, text, W / 2, H / 2 + 2, `600 ${Math.round(H * .46)}px ${TW}`, color));
}
function setOpacity(o, v) {
  o.visible = v > .004;
  o.traverse(m => { if (m.isMesh) { m.material.transparent = v < .999; m.material.opacity = v; } });
}
function setScale(o, s) { o.visible = s > .004; o.scale.setScalar(Math.max(s, .001)); }
function ring(radius, color = SKY) {
  const m = new Mesh(new RingGeometry(radius * .93, radius, 64), new MeshBasicMaterial({ color, transparent: true, side: DoubleSide, toneMapped: false, depthWrite: false }));
  return m;
}
function ripple(m, k, grow = 1) {
  m.visible = k > 0 && k < 1;
  m.scale.setScalar(.35 + k * grow);
  m.material.opacity = (1 - k) * .8;
}
function screenMaterial(textures) {
  const mat = new ShaderMaterial({
    toneMapped: false,
    uniforms: { a: { value: textures[0] }, b: { value: textures[0] }, t: { value: 0 }, mode: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `varying vec2 vUv; uniform sampler2D a, b; uniform float t, mode;
      void main(){
        vec4 c = texture2D(a, vUv);
        if (mode < .5) c = mix(c, texture2D(b, vUv), t);
        else {
          vec2 u = vec2(vUv.x, vUv.y - (1.0 - t));
          vec4 moved = u.y >= 0.052 ? texture2D(b, u) : vec4(c.rgb * (1.0 - .35 * t), 1.0);
          c = vUv.y < 0.052 ? mix(c, texture2D(b, vUv), t) : moved;
        }
        gl_FragColor = c;
        #include <colorspace_fragment>
      }`,
  });
  mat.show = (i, j = i, k = 0, mode = 0) => {
    mat.uniforms.a.value = textures[i]; mat.uniforms.b.value = textures[j];
    mat.uniforms.t.value = k; mat.uniforms.mode.value = mode;
  };
  return mat;
}
let phoneGltf, tagsGltf, macGltf, bizGltf;
// A tag from the home hero's scene (nfctags.glb), lying face on to the camera at the given width.
function realTag(name, width) {
  const part = tagsGltf.scene.getObjectByName(name).clone(true);
  part.position.set(0, 0, 0); part.quaternion.identity(); part.scale.set(1, 1, 1);
  const turn = new Group();
  turn.add(part);
  const size = new Box3().setFromObject(turn).getSize(new Vector3());
  if (size.y <= size.x && size.y <= size.z) turn.rotation.x = Math.PI / 2;
  else if (size.x <= size.y && size.x <= size.z) turn.rotation.y = Math.PI / 2;
  const g = new Group();
  g.add(turn);
  turn.updateMatrixWorld(true);
  const box = new Box3().setFromObject(g), now = box.getSize(new Vector3());
  turn.position.sub(box.getCenter(new Vector3()));
  g.scale.setScalar(width / Math.max(now.x, now.y));
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}
// The MacBook from the blog figures, without its reader and cable, showing the given texture.
// What makes the plain laptop read as a real one: true metal, printed keys and speaker grilles. Only this page's scenes; the blog's figures keep the model as it is.
const KEY_ROWS = [
  [[1.5, 'esc'], ...['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map(k => [1, k]), [1, '']],
  [[1, '`'], ...'1234567890-='.split('').map(k => [1, k]), [1.5, 'delete']],
  [[1.5, 'tab'], ...'QWERTYUIOP[]\\'.split('').map(k => [1, k])],
  [[1.75, 'caps lock'], ...'ASDFGHJKL;\''.split('').map(k => [1, k]), [1.75, 'return']],
  [[2.25, 'shift'], ...'ZXCVBNM,./'.split('').map(k => [1, k]), [2.25, 'shift']],
  [[1, 'fn'], [1, 'control'], [1, 'option'], [1.25, 'command'], [5, ''], [1.25, 'command'], [1, 'option'], [1, '←'], [1, '↑↓'], [1, '→']],
];
function macDetails(root) {
  // These screens are full-screen pages with no menu bar for a notch to sit in, so it would only cut into them.
  root.traverse(o => { if (o.name.startsWith('MacNotch')) o.visible = false; });
  const look = {
    MacAluminium: { color: '#D9DADC', metalness: .55, roughness: .42, envMapIntensity: 1.25 },
    MacGlass: { color: '#050506', roughness: .14, envMapIntensity: .45 },
    MacKeyboardWell: { color: '#050506', roughness: .8 },
    MacKeys: { color: '#0D0E10', roughness: .46, envMapIntensity: .9 },
    MacTrackpad: { color: '#CDCED1', metalness: .55, roughness: .24, envMapIntensity: 1.25 },
    MacTrackpadGap: { color: '#6A6C70', metalness: .6, roughness: .5 },
  };
  root.traverse(o => { const l = o.isMesh && look[o.material?.name]; if (l) { const { color, ...rest } = l; o.material.color.set(color); Object.assign(o.material, rest); } });
  let keys = null;
  root.traverse(o => { if (o.isMesh && o.material?.name === 'MacKeys') keys = o; });
  if (!keys || keys.getObjectByName('MacLegends')) return;
  keys.geometry.computeBoundingBox();
  const b = keys.geometry.boundingBox, W = b.max.x - b.min.x, D = b.max.z - b.min.z, H = b.max.y - b.min.y;
  // The model's trackpad runs right up to the front edge. A real one sits close under the keyboard with a clear margin in front: shrink it towards the keys.
  let pad = null;
  root.traverse(o => { if (o.isMesh && o.material?.name === 'MacTrackpad') pad = o; });
  if (pad) {
    root.updateMatrixWorld(true);
    pad.geometry.computeBoundingBox();
    const pb = pad.geometry.boundingBox, keyMid = keys.localToWorld(b.getCenter(new Vector3()));
    const end = z => pad.localToWorld(new Vector3((pb.min.x + pb.max.x) / 2, pb.max.y, z)).distanceTo(keyMid);
    const anchor = end(pb.min.z) < end(pb.max.z) ? pb.min.z : pb.max.z;
    root.traverse(o => {
      if (!o.isMesh || !['MacTrackpad', 'MacTrackpadGap'].includes(o.material?.name)) return;
      const g = o.geometry.clone(), p = g.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, anchor + (p.getZ(i) - anchor) * .76);
      p.needsUpdate = true; g.computeBoundingBox(); g.computeBoundingSphere(); o.geometry = g;
    });
  }
  // A flat decal on the deck, in the keys' own coordinates: x and z as fractions of the keyboard, measured from its left and back edges.
  const decal = (name, map, x0, x1, z0, z1, y, order = 2) => {
    const geo = new PlaneGeometry(1, 1), pos = geo.attributes.position;
    const X = f => b.min.x + f * W, Z = f => b.min.z + f * D;
    [[x0, z0], [x1, z0], [x0, z1], [x1, z1]].forEach(([p, q], i) => pos.setXYZ(i, X(p), y, Z(q)));
    pos.needsUpdate = true; geo.computeVertexNormals();
    const m = new Mesh(geo, new MeshBasicMaterial({ map, transparent: true, depthWrite: false, toneMapped: false, side: DoubleSide }));
    m.name = name; m.renderOrder = order; keys.add(m); return m;
  };
  const legends = tex(2048, 848, (x, CW, CH) => {
    x.clearRect(0, 0, CW, CH);
    const P = CW / 14.5, RH = CH / 6;
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(238,240,243,.92)';
    KEY_ROWS.forEach((row, r) => {
      let at = 0;
      row.forEach(([w, label]) => {
        if (label) {
          const long = label.length > 2;
          x.font = `400 ${r === 0 ? 20 : long ? 21 : 38}px -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif`;
          x.fillText(label, (at + w / 2) * P, (r + .5) * RH);
        }
        at += w;
      });
    });
  });
  legends.anisotropy = 16;
  decal('MacLegends', legends, 0, 1, 0, 1, b.max.y + H * .12);
  // Speaker grilles either side of the keyboard: rows of tiny dark holes.
  const holes = tex(64, 560, (x, CW, CH) => {
    x.clearRect(0, 0, CW, CH); x.fillStyle = 'rgba(20,21,24,.86)';
    for (let r = 0; r < 70; r++) for (let c = 0; c < 8; c++) { x.beginPath(); x.arc(4 + c * 8 + (r % 2) * 4 - 2, 4 + r * 8, 2.3, 0, 7); x.fill(); }
  });
  holes.anisotropy = 16;
  const GW = .04, GAP = .021;
  decal('MacGrilleL', holes, -GAP - GW, -GAP, 0, 1, b.min.y + H * .1, 1);
  decal('MacGrilleR', holes, 1 + GAP, 1 + GAP + GW, 0, 1, b.min.y + H * .1, 1);
}
function laptop(width, map) {
  const root = macGltf.scene.clone(true);
  const keep = o => o.name.startsWith('Mac') || o.children.some(keep);
  const drop = [];
  root.traverse(o => { if (o !== root && !keep(o)) drop.push(o); });
  drop.forEach(o => o.removeFromParent());
  const facing = new Group();
  facing.rotation.y = Math.PI;
  facing.add(root);
  const size = new Box3().setFromObject(facing).getSize(new Vector3());
  facing.scale.setScalar(width / size.x);
  facing.updateMatrixWorld(true);
  facing.position.sub(new Box3().setFromObject(facing).getCenter(new Vector3()));
  const g = new Group();
  g.add(facing);
  g.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
  macDetails(root);
  // The screen has rounded corners, like the real display: everything outside them shows the black glass behind.
  const rounded = tex(1280, 800, (x, W, H) => { x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.fillStyle = '#fff'; x.beginPath(); x.roundRect(0, 0, W, H, 26); x.fill(); });
  rounded.anisotropy = 16;
  root.getObjectByName('MacDisplay').traverse(o => { if (o.isMesh) { o.material = new MeshBasicMaterial({ map, alphaMap: rounded, transparent: true, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }); o.castShadow = false; } });
  return g;
}
function phone(height, textures) {
  const parts = (phoneGltf.scene.getObjectByName('Phone') ?? phoneGltf.scene).clone(true);
  const facing = new Group();
  facing.rotation.y = Math.PI;
  facing.add(parts);
  const size = new Box3().setFromObject(facing).getSize(new Vector3());
  const k = height / size.y;
  facing.scale.setScalar(k);
  facing.updateMatrixWorld(true);
  facing.position.sub(new Box3().setFromObject(facing).getCenter(new Vector3()));
  const g = new Group();
  g.add(facing);
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  const mat = screenMaterial(textures);
  parts.getObjectByName('Object_13').traverse(o => { if (o.isMesh) { o.material = mat; o.castShadow = false; } });
  g.screen = mat;
  return g;
}
const screenTex = paint => { const t = tex(SW, SH, paint); t.flipY = false; return t; };

let environment;
function stage(dur, still, build) {
  const scene = new Scene();
  scene.environment = environment;
  scene.environmentIntensity = .62;
  const key = new DirectionalLight('#fff', 1.75);
  key.position.set(-1.6, 11, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 26 });
  key.shadow.radius = 10; key.shadow.bias = -.0006; key.shadow.normalBias = .01;
  scene.add(key);
  const floor = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: .16 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = FLOOR; floor.receiveShadow = true;
  scene.add(floor);
  const root = new Group();
  scene.add(root);
  const camera = new PerspectiveCamera(26, 1.25, 7, 34);
  camera.position.set(0, .8, 14.5);
  camera.lookAt(0, -.05, 0);
  const update = build(root);
  return { scene, camera, root, dur, still, update };
}

// ---- the scenes ----
// Every phone shows a real capture of the app (DigitalBusinessCardApp/screenshots/raw), except the
// Lock Screen, which is drawn to the layout and colours of LiveConferenceThreeViewsView (Calm look).
const SYS = '-apple-system, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';
const STATUS = [['New', '#3B8BEB'], ['Contacted', '#F2994A'], ['Qualified', '#34C759'], ['Converted', '#C94BD6']];

function person(x, cx, cy, r, color = '#fff') {
  x.fillStyle = color;
  x.beginPath(); x.arc(cx, cy - r * .32, r * .42, 0, 7); x.fill();
  x.beginPath(); x.ellipse(cx, cy + r * .62, r * .72, r * .5, 0, Math.PI, 0); x.fill();
}
function lockScreen(x, W, H, card) {
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#16335F'); g.addColorStop(.55, '#2A5E9E'); g.addColorStop(1, '#101C33');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.save(); x.scale(W / 440, H / 956);
  x.restore();
  x.save(); x.globalCompositeOperation = 'screen'; x.drawImage(images['card-dark'], 0, 0, 660, 96, 0, 0, W, 96 * W / 660); x.restore();
  x.save(); x.scale(W / 440, H / 956);
  say(x, 'Wednesday, November 4', 220, 104, `600 21px ${SYS}`, 'rgba(255,255,255,.9)');
  say(x, '9:41', 220, 172, `600 96px ${SYS}`, 'rgba(255,255,255,.95)');
  x.save(); x.beginPath(); x.roundRect(14, 668, 412, 156, 26); x.clip(); x.drawImage(card, 14, 668, 412, 156); x.restore();
  [[66], [374]].forEach(([a]) => { x.beginPath(); x.arc(a, 878, 25, 0, 7); x.fillStyle = 'rgba(255,255,255,.16)'; x.fill(); });
  box(x, 150, 938, 140, 5, 3, '#fff');
  x.restore();
}
// The NFC.cool card from the Business Card scenes (NFCcoolScenes/assets/bizcard/card_nfc.png), ISO card proportions.
// Charcoal disappears on the dark stage, so in dark mode it is the blue NFC.cool card (assets/card/card_face.png).
let darkTheme = false;
const isDark = () => darkTheme;
const nfcCards = [];
const applyCardTheme = () => nfcCards.forEach(c => {
  const dark = isDark();
  c.face.material.map = dark ? c.blue : c.charcoal;
  c.body.material.color.set(dark ? '#1283E6' : '#26272C');
});
// The page's theme, from the player whenever it changes.
export function setDark(value) {
  darkTheme = value;
  applyCardTheme();
}
// WebGL ignores flipY on an ImageBitmap, so a texture that needs it gets a canvas copy of the image.
const upright = im => { const c = new OffscreenCanvas(im.width, im.height); c.getContext('2d').drawImage(im, 0, 0); return c; };
const nfcCard = width => {
  const load = name => { const t = new THREE.Texture(upright(images[name])); made.push(t); t.colorSpace = SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true; return t; };
  const c = plate(width, width * shape('nfc-card'), { r: width * .042, d: width * .016, color: '#26272C', map: load('nfc-card'), rough: .4 });
  c.charcoal = c.face.material.map;
  c.blue = load('nfc-card-blue');
  nfcCards.push(c);
  applyCardTheme();
  return c;
};
const pendingUploads = [];
const shot = name => { const t = new THREE.Texture(images[name]); made.push(t); t.colorSpace = SRGBColorSpace; t.flipY = false; t.anisotropy = 8; t.needsUpdate = true; pendingUploads.push(t); return t; };
const tile = name => { const t = new THREE.Texture(upright(images[name])); made.push(t); t.colorSpace = SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true; return t; };
const shape = name => images[name].height / images[name].width;
const TILE_W = 1224 / 1158;

// ---- props for the "who it's for" scenes ----
const solid = (w, h, d, color, r = .05) => {
  const geo = new ExtrudeGeometry(outline(w - r * 2, h - r * 2, Math.min(r, .04)), { depth: d - r * 2, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: 3, curveSegments: 6 });
  geo.translate(0, 0, -d / 2 + r);
  const m = new Mesh(geo, new MeshStandardMaterial({ color, roughness: .62 }));
  m.castShadow = true;
  return m;
};
const cylinder = (rTop, rBottom, h, color, rough = .5, metal = 0) => {
  const m = new Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 40), new MeshStandardMaterial({ color, roughness: rough, metalness: metal }));
  m.castShadow = true;
  return m;
};
const realPart = (gltf, name, height) => {
  const part = gltf.scene.getObjectByName(name).clone(true);
  const g = new Group();
  g.add(part);
  g.updateMatrixWorld(true);
  const box3 = new Box3().setFromObject(g), size = box3.getSize(new Vector3());
  part.position.sub(box3.getCenter(new Vector3()));
  g.scale.setScalar(height / size.y);
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.material = o.material.clone(); o.material.opacity = 1; o.material.transparent = false; o.visible = true; } });
  return g;
};
const countChip = (name, w) => chip(w, .92, (x, W, H, v) => {
  say(x, name, W / 2, H * .3, `400 ${H * .23}px ${TW}`, MUTED);
  say(x, String(v), W / 2, H * .67, `700 ${H * .38}px ${TW}`, INK);
}, { r: .2 });
function leadChip(name, w) {
  return chip(w, .62, (x, W, H) => {
    const r = H * .36, cx = H / 2 + 2, cy = H / 2;
    if (images.emma && name.startsWith('Emma')) {
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip(); x.drawImage(images.emma, cx - r, cy - r, r * 2, r * 2); x.restore();
    } else {
      x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#C7D2E2'; x.fill();
      person(x, cx, cy, H * .26);
    }
    say(x, name, H + 4, H / 2 + 1, `600 ${H * .4}px ${TW}`, INK, 'left');
  }, { d: .13 });
}
function houseModel() {
  const g = new Group();
  const wall = solid(3.5, 2.05, 2.2, '#F7F4EE', .04);
  wall.position.y = 1.03;
  const roofShape = new Shape();
  roofShape.moveTo(-2.05, 0); roofShape.lineTo(0, 1.3); roofShape.lineTo(2.05, 0); roofShape.closePath();
  const roofGeo = new ExtrudeGeometry(roofShape, { depth: 2.6, bevelEnabled: false });
  roofGeo.translate(0, 0, -1.3);
  const roof = new Mesh(roofGeo, new MeshStandardMaterial({ color: '#B95D42', roughness: .7 }));
  roof.position.y = 2.05; roof.castShadow = true;
  const door = solid(.68, 1.28, .08, '#1A60CE', .02);
  door.position.set(.15, .65, 1.11);
  const windowAt = x => { const w = solid(.68, .68, .05, '#BFE3FF', .015); w.position.set(x, 1.28, 1.11); return w; };
  g.add(wall, roof, door, windowAt(-1.05), windowAt(1.15));
  return g;
}
function yardSign(hero) {
  const g = new Group();
  const post = solid(.13, 3.05, .13, '#F7F7F5', .02);
  post.position.set(-1.05, 1.52, 0);
  const arm = solid(2.15, .11, .11, '#F7F7F5', .02);
  arm.position.set(-.05, 2.98, 0);
  const logo = images[hero];
  const panel = plate(1.95, 1.4, { r: .05, d: .06, map: tex(780, 560, x => {
    box(x, 0, 0, 780, 560, 0, '#fff');
    say(x, 'OPEN HOUSE', 390, 74, `700 48px ${TW}`, '#B3123A');
    const lw = 560, lh = lw * logo.height / logo.width;
    x.drawImage(logo, 110, 130 + (300 - lh) / 2, lw, lh);
  }) });
  panel.position.set(-.05, 2.2, 0);
  g.add(post, arm, panel);
  return g;
}
function crossSign(color) {
  const g = new Group();
  const base = plate(1.25, 1.25, { r: .22, d: .1, color: '#fff' });
  const a = solid(.26, .78, .05, color, .015), b = solid(.78, .26, .05, color, .015);
  a.position.z = .07; b.position.z = .07;
  g.add(base, a, b);
  return g;
}
function coffeeCup() {
  const g = new Group();
  const cup = cylinder(.27, .2, .36, '#FBFAF7');
  cup.position.y = .22;
  const coffee = cylinder(.24, .24, .01, '#4A2C1B', .3);
  coffee.position.y = .4;
  const saucer = cylinder(.42, .32, .05, '#FBFAF7');
  saucer.position.y = .03;
  g.add(saucer, cup, coffee);
  return g;
}
function highTable() {
  const g = new Group();
  const top = cylinder(2.05, 2.05, .09, '#D9DDE3', .4);
  top.position.y = 2.96;
  const stem = cylinder(.09, .09, 2.9, '#A7ADB6', .28, .8);
  stem.position.y = 1.47;
  const foot = cylinder(.82, .92, .06, '#A7ADB6', .28, .8);
  foot.position.y = .03;
  g.add(top, stem, foot);
  return g;
}
function drinkGlass(color) {
  const g = new Group();
  const liquid = cylinder(.2, .17, .42, color, .25);
  liquid.position.y = .23;
  const glass = cylinder(.24, .2, .68, '#FFFFFF', .08);
  glass.material.transparent = true; glass.material.opacity = .28;
  glass.position.y = .34;
  g.add(liquid, glass);
  return g;
}
function workVan() {
  const g = new Group();
  const body = solid(4.8, 2.05, 2.1, '#F4F5F7', .16);
  body.position.set(0, 1.5, 0);
  const cab = solid(1.25, 1.45, 2.05, '#F4F5F7', .16);
  cab.position.set(2.9, 1.2, 0);
  const glass = solid(.72, .68, 2.08, '#293341', .06);
  glass.position.set(3.05, 1.5, 0);
  const logo = images['logo-trades'];
  const lw = 2.1, lh = lw * logo.height / logo.width;
  const side = plate(lw, lh, { r: .03, d: .02, map: tex(810, Math.round(810 * lh / lw), (x, W, H) => x.drawImage(logo, 0, 0, W, H)) });
  side.position.set(-.1, 1.5, 1.06);
  const wheelAt = x => {
    const t = cylinder(.46, .46, .3, '#1B1D21', .8);
    t.rotation.x = Math.PI / 2;
    t.position.set(x, .46, 1.0);
    return t;
  };
  g.add(body, cab, glass, side, wheelAt(-1.5), wheelAt(2.6));
  return g;
}
function toolboxModel() {
  const g = new Group();
  const body = solid(2.25, 1.02, 1.75, '#C8961A', .05);
  body.position.y = .53;
  const lid = solid(2.3, .24, 1.8, '#26272C', .05);
  lid.position.y = 1.15;
  const handle = solid(.82, .1, .18, '#1B1D21', .03);
  handle.position.y = 1.32;
  g.add(body, lid, handle);
  return g;
}

const SCENES = {
  // Three ways to hand over a card, each ending with the card on the other person's phone.
  share() {
    return stage(10.5, 1.9, root => {
      const blank = screenTex((x, W, H) => lockScreenPlain(x, W, H));
      const clip = screenTex((x, W, H) => {
        lockScreenPlain(x, W, H);
        const w = W - 32, h = w * 1060 / 880;
        x.save(); x.beginPath(); x.roundRect(16, H - h - 26, w, h, 54); x.clip();
        x.drawImage(images['appclip-sheet'], 16, H - h - 26, w, h); x.restore();
      });
      const receiver = phone(5, [blank, shot('card'), clip]);
      receiver.position.set(2.2, -.12, 0); receiver.rotation.set(-.03, -.26, 0);
      root.add(receiver);
      const nfc = nfcCard(3.2);
      const sender = phone(4.7, [shot('overview'), shot('wallet')]);
      root.add(nfc, sender);
      const labels = [label(2.1, .72, 'NFC tap'), label(3.4, .72, 'QR code and App Clip'), label(2.35, .72, 'Apple Wallet')];
      labels.forEach(l => { l.position.set(-2.0, 2.62, .2); root.add(l); });
      const rings = [0, 1, 2].map(() => { const m = ring(1.2); m.position.set(.95, .95, .25); root.add(m); return m; });
      const shown = [1, 2, 1];
      return t => {
        const act = Math.floor(t / 3.5) % 3, p = t % 3.5;
        const inOut = win(.1, .9, 2.85, 3.35, p);
        const touch = win(.85, 1.15, 1.25, 1.75, p);
        nfc.visible = act === 0 && inOut > .03;
        sender.visible = act > 0 && inOut > .03;
        labels.forEach((l, i) => setScale(l, i === act ? pop(.05, .5, p) * (1 - ss(3.05, 3.35, p)) : 0));
        if (act === 0) {
          nfc.position.set(lerp(-6.4, -1.75, inOut) + touch * 1.15, -.3 + touch * .7, .6);
          nfc.rotation.set(-.04, .34 - touch * .1, .05 - touch * .1);
        } else {
          sender.position.set(lerp(-6.4, -1.95, inOut) + touch * .3, -.3, .3);
          sender.rotation.set(-.02, .26 - touch * .08, 0);
          sender.screen.show(act - 1);
        }
        rings.forEach((m, i) => { act === 0 ? ripple(m, clamp((p - 1.05 - i * .16) / .85), 1.1) : (m.visible = false); });
        receiver.screen.show(0, shown[act], ss(1.45, 1.95, p) * (1 - ss(3.0, 3.35, p)), act === 1 ? 0 : 1);
      };
    });
  },
  // A card goes out, a lead comes back and climbs through the app's own statuses.
  leads() {
    return stage(11, 8, root => {
      const banner = screenTex((x, W, H) => {
        x.drawImage(images.leads, 0, 0, W, H);
        x.save(); x.scale(W / 440, H / 956);
        box(x, 12, 62, 416, 80, 26, 'rgba(250,250,252,.97)');
        x.save(); x.beginPath(); x.arc(52, 102, 26, 0, 7); x.clip(); x.drawImage(images.emma, 26, 76, 52, 52); x.restore();
        say(x, 'New Lead', 90, 88, `600 16px ${SYS}`, '#111', 'left');
        say(x, 'Emma Rousseau was added as a new lead.', 90, 112, `400 14px ${SYS}`, '#111', 'left');
        x.restore();
      });
      const me = phone(4.9, [shot('leads'), banner, shot('lead-detail')]);
      me.position.set(-2.72, -.2, 0); me.rotation.y = .28;
      root.add(me);
      const visitor = plate(1.15, 1.15, { r: .575, d: .1, color: '#C7D2E2', map: tex(230, 230, (x, W) => x.drawImage(images.emma, 0, 0, W, W)) });
      visitor.position.set(.75, 2.3, 0);
      root.add(visitor);
      const mini = plate(1.1, 1.1 * shape('hero-nicolo'), { r: .07, map: tile('hero-nicolo') });
      root.add(mini);
      const lead = leadChip('Emma', 1.7);
      root.add(lead);
      const off = new Color('#DDE1E7');
      const blocks = STATUS.map(([, c], i) => {
        const h = .62 + i * .58;
        const b = plate(1.14, h, { d: 1.1, r: .08, color: '#DDE1E7', rough: .6 });
        b.position.set(-1.0 + i * 1.18, FLOOR + h / 2 + .01, 0);
        b.on = new Color(c); b.top = FLOOR + h;
        root.add(b);
        return b;
      });
      const status = chip(2.5, .78, (x, W, H, i) => {
        const [name, c] = STATUS[i];
        x.beginPath(); x.arc(H * .55, H / 2, H * .17, 0, 7); x.fillStyle = c; x.fill();
        say(x, name, H * .85, H / 2 + 2, `600 ${H * .46}px ${TW}`, INK, 'left');
      });
      status.position.set(.75, 1.05, .1);
      root.add(status);
      const burst = ring(1, STATUS[3][1]); root.add(burst);
      const seat = i => [blocks[i].position.x, blocks[i].top + .42, .62];
      const hops = [3.7, 4.9, 6.1, 7.3];
      const home = [-2.1, 1.3, .6], far = [.75, 2.3, .3];
      return t => {
        const end = 1 - ss(10.1, 10.8, t);
        mini.visible = t > .2 && t < 1.45;
        mini.position.set(...arc([-2.2, .3, .5], far, ss(.3, 1.4, t), .9));
        mini.rotation.z = Math.sin(t * 2) * .15;
        setScale(visitor, pop(.0, .4, t) * (1 + win(1.35, 1.5, 1.5, 1.8, t) * .12) * end);
        let pos = far, step = -1;
        if (t < 2.7) pos = arc(far, home, ss(1.75, 2.7, t), .55);
        else if (t < hops[0]) pos = home;
        hops.forEach((h, i) => {
          if (t < h) return;
          step = i;
          pos = arc(i ? seat(i - 1) : home, seat(i), ss(h, h + .55, t), i ? .55 : .9);
        });
        lead.position.set(...pos);
        setScale(lead, pop(1.65, 1.95, t) * end);
        lead.rotation.z = -Math.sin(Math.PI * clamp((t - (hops[step] ?? 0)) / .55)) * (step >= 0 ? .14 : 0);
        blocks.forEach((b, i) => b.body.material.color.copy(off).lerp(b.on, ss(hops[i] + .35, hops[i] + .6, t) * end));
        if (step >= 0) status.show(step);
        setScale(status, pop(hops[0] + .3, hops[0] + .7, t) * end);
        burst.position.set(...seat(3));
        ripple(burst, clamp((t - (hops[3] + .5)) / .8), 1.2);
        if (t < 4.5) me.screen.show(0, 1, win(2.45, 2.75, 3.5, 3.9, t));
        else me.screen.show(0, 2, win(4.8, 5.3, 8.6, 9.2, t), 1);
      };
    });
  },
  // The real My Business Cards list at 10 / 10: each tap opens that card, real captures of one person.
  cards() {
    const N = 10, STEP = 1.6, H = 5.2;
    // Row centres in the capture, as a share of its height.
    const rowY = i => (930 + i * 168) / 2868;
    return stage(N * STEP, 2.5, root => {
      const list = phone(H, [shot('ten-list')]);
      list.position.set(-2.1, -.2, 0); list.rotation.set(-.02, .2, 0);
      list.screen.show(0);
      const open = phone(H, Array.from({ length: N }, (_, i) => shot(`ten-${String(i).padStart(2, '0')}`)));
      open.position.set(2.1, -.2, 0); open.rotation.set(-.02, -.2, 0);
      root.add(list, open);
      const count = label(2.5, .62, 'Up to 10 cards');
      count.position.set(0, 2.82, .1);
      root.add(count);
      const SW3D = H * 1320 / 2868;
      const glow = new Mesh(new PlaneGeometry(SW3D * .88, H * 150 / 2868), new MeshBasicMaterial({ color: SKY, transparent: true, depthWrite: false, toneMapped: false }));
      const dot = new Mesh(new RingGeometry(0, .15, 40), new MeshBasicMaterial({ color: SKY, transparent: true, depthWrite: false, toneMapped: false }));
      const tap = ring(.26);
      [glow, dot, tap].forEach(m => { m.material.depthTest = false; m.renderOrder = 5; list.add(m); });
      return t => {
        const k = t / STEP, i = Math.floor(k) % N, p = (k - Math.floor(k)) * STEP;
        const next = (i + 1) % N, y = H / 2 - rowY(next) * H;
        glow.position.set(0, y, .16);
        glow.material.opacity = win(.1, .25, .7, 1.2, p) * .3;
        dot.position.set(SW3D * .22, y, .17);
        dot.material.opacity = win(.05, .18, .3, .5, p) * .8;
        dot.visible = dot.material.opacity > .01;
        tap.position.set(SW3D * .22, y, .17);
        ripple(tap, clamp((p - .18) / .5), .9);
        open.screen.show(i, next, ss(.4, .95, p), 1);
      };
    });
  },
  // The real analytics screen through its four periods, its real tiles and link taps floating out.
  insights() {
    const P = ['7d', '30d', '90d', '12m'], STEP = 3.2;
    return stage(P.length * STEP, 5, root => {
      const app = phone(5.2, P.map(p => shot(`an-${p}`)));
      app.position.set(-2.72, -.12, 0); app.rotation.y = .26;
      root.add(app);
      const W = 3.7;
      const stats = P.map(p => { const c = plate(W, W * shape(`stats-${p}`), { r: .2, map: tile(`stats-${p}`), d: .1 }); c.position.set(1.05, -.25, .5); root.add(c); return c; });
      const periods = P.map(p => { const c = plate(4.3, 4.3 * shape(`period-${p}`), { r: .17, map: tile(`period-${p}`), d: .1 }); c.position.set(1.05, 2.72, .4); root.add(c); return c; });
      return t => {
        const a = Math.floor(t / STEP) % P.length, p = t % STEP, change = ss(0, .35, p);
        const prev = (a + P.length - 1) % P.length;
        stats.forEach((c, i) => {
          c.rotation.set(-.04, -.14, 0);
          if (i === a) setScale(c, lerp(.96, 1, pop(0, .35, p))); else c.visible = false;
        });
        periods.forEach((c, i) => { c.visible = i === a; c.rotation.set(-.03, -.08, 0); });
        app.screen.show(a);
      };
    });
  },
  // A private card opens with its PIN; the data leaves as a ZIP.
  privacy() {
    return stage(11, 3.7, root => {
      const app = phone(5, [shot('settings')]);
      app.position.set(-2.72, -.15, 0); app.rotation.y = .26;
      app.screen.show(0);
      root.add(app);
      const W = 2.9, H = W * shape('hero-nicolo');
      const card = plate(W, H, { r: .17, map: tile('hero-nicolo') });
      const small = new OffscreenCanvas(22, 21);
      { const im = images['hero-nicolo'], c = small.getContext('2d'); c.fillStyle = '#F2F3F5'; c.fillRect(0, 0, 22, 21); c.drawImage(im, im.width * .05, im.height * .05, im.width * .9, im.height * .9, 1, 1, 20, 19); }
      const blur = tex(640, 600, x => { x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.drawImage(small, 0, 0, 640, 600); });
      const veil = new Mesh(faceGeo(W, H, .17), new MeshBasicMaterial({ map: blur, transparent: true, toneMapped: false }));
      veil.position.z = .045;
      card.add(veil);
      root.add(card);
      // The padlock: a bevelled charcoal body like the NFC.cool card, a satin shackle that lifts and
      // swings on its right leg, a keyhole in the brand yellow.
      const padlock = new Group();
      const BW = 1.26, BH = 1.02, BD = .4, BEV = .07;
      const bodyGeo = new ExtrudeGeometry(outline(BW - BEV * 2, BH - BEV * 2, .17), { depth: BD - BEV * 2, bevelEnabled: true, bevelSize: BEV, bevelThickness: BEV, bevelSegments: 6, curveSegments: 16 });
      bodyGeo.translate(0, 0, -BD / 2 + BEV);
      const body = new Mesh(bodyGeo, new MeshStandardMaterial({ color: '#2B2D33', roughness: .38, metalness: .25 }));
      body.castShadow = true;
      const keyShape = new Shape();
      keyShape.absarc(0, .08, .125, -Math.PI * .22, Math.PI * 1.22);
      keyShape.lineTo(-.075, -.22); keyShape.quadraticCurveTo(-.075, -.26, -.035, -.26);
      keyShape.lineTo(.035, -.26); keyShape.quadraticCurveTo(.075, -.26, .075, -.22);
      keyShape.closePath();
      const keyhole = new Mesh(new ShapeGeometry(keyShape, 24), new MeshBasicMaterial({ color: YELLOW, toneMapped: false }));
      keyhole.position.z = BD / 2 + .002;
      const R0 = .315, LEG = .62;
      const path = [[-R0, -LEG], [-R0, -LEG * .5], [-R0, 0]];
      for (let a = 1; a < 12; a++) { const k = Math.PI * (1 - a / 12); path.push([Math.cos(k) * R0, Math.sin(k) * R0]); }
      path.push([R0, 0], [R0, -LEG * .5], [R0, -LEG]);
      const shackleMesh = new Mesh(new TubeGeometry(new CatmullRomCurve3(path.map(([a, b]) => new Vector3(a, b, 0))), 96, .088, 20), new MeshStandardMaterial({ color: '#AEB4BD', metalness: .55, roughness: .34 }));
      shackleMesh.castShadow = true;
      shackleMesh.position.x = -R0;
      const shackle = new Group();
      shackle.add(shackleMesh);
      shackle.position.set(R0, .86, 0);
      padlock.add(shackle, body, keyhole);
      // Its soft shadow on the card.
      const contact = new Mesh(new PlaneGeometry(2.3, 2.3), new MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false, map: tex(256, 256, x => {
        const g = x.createRadialGradient(128, 128, 20, 128, 128, 128);
        g.addColorStop(0, 'rgba(20,24,34,.42)'); g.addColorStop(.55, 'rgba(20,24,34,.16)'); g.addColorStop(1, 'rgba(20,24,34,0)');
        x.fillStyle = g; x.fillRect(0, 0, 256, 256);
      }) }));
      contact.position.set(.03, -.17, .06);
      contact.renderOrder = 2;
      card.add(contact);
      root.add(padlock);
      const pin = chip(2.6, .8, (x, W, H, n) => {
        for (let i = 0; i < 4; i++) {
          x.beginPath(); x.arc(W / 2 + (i - 1.5) * H * .85, H / 2, H * .17, 0, 7);
          if (i < n) { x.fillStyle = BLUE; x.fill(); } else { x.strokeStyle = '#ADB5BD'; x.lineWidth = 5; x.stroke(); }
        }
      });
      pin.position.set(1.05, 1.95, .2);
      root.add(pin);
      const exportLabel = label(2.7, .72, 'Export all data');
      exportLabel.position.set(1.05, 1.95, .2);
      root.add(exportLabel);
      const zip = chip(1.5, 1.3, (x, W, H) => {
        box(x, 0, 0, W, H, 0, BLUE);
        x.fillStyle = '#fff';
        for (let i = 0; i < 6; i++) x.fillRect(W / 2 - 10, i * 19 + 5, i % 2 ? 20 : 10, 9);
        say(x, 'ZIP', W / 2, H * .72, `700 ${H * .28}px ${TW}`, '#fff');
      }, { r: .14, d: .45, color: BLUE });
      zip.position.set(2.85, -1.8, .3);
      root.add(zip);
      const docs = [0, 1, 2].map(() => {
        const d = chip(.62, .8, (x, W, H) => { x.fillStyle = '#C3CAD3'; for (let i = 0; i < 4; i++) x.fillRect(W * .2, H * (.2 + i * .17), W * (i === 3 ? .35 : .6), H * .06); }, { r: .06, d: .05 });
        root.add(d);
        return d;
      });
      return t => {
        const moved = win(4.4, 5.0, 9.4, 10.0, t);
        const cx = lerp(1.05, .55, moved), cy = lerp(-.45, .05, moved);
        card.position.set(cx, cy, 0);
        card.rotation.set(-.04, -.12, 0);
        card.scale.setScalar(lerp(1, .82, moved));
        padlock.position.set(1.05, -.62, .55);
        padlock.rotation.set(-.03, -.16, 0);
        pin.show([.7, 1.1, 1.5, 1.9].filter(v => t >= v && t < 9.9).length);
        setScale(pin, 1 - win(3.7, 4.1, 9.7, 10.2, t));
        setScale(exportLabel, win(4.2, 4.6, 8.8, 9.2, t));
        const open = ss(2.1, 2.65, t) * (1 - ss(9.95, 10.45, t));
        shackle.position.y = .86 + ss(0, .55, open) * .3;
        shackle.rotation.y = -ss(.45, 1, open) * Math.PI * .72;
        const gone = ss(2.75, 3.1, t) * (1 - ss(9.7, 10.05, t));
        setScale(padlock, 1 - gone);
        contact.visible = gone < 1; contact.material.opacity = 1 - gone;
        veil.material.opacity = 1 - ss(2.65, 3.25, t) * (1 - ss(9.6, 10.2, t));
        veil.visible = veil.material.opacity > .004;
        setScale(zip, pop(4.9, 5.3, t) * (1 - ss(8.9, 9.3, t)) * (1 + [5.9, 6.5, 7.1].reduce((a, h) => a + win(h, h + .08, h + .08, h + .3, t) * .07, 0)));
        docs.forEach((d, i) => {
          const a = 5.3 + i * .6;
          d.position.set(...arc([.55, .05 + (i - 1) * .3, .4], [2.85, -1.7, .5], ss(a, a + .7, t), 1));
          setScale(d, win(a - .05, a + .12, a + .55, a + .72, t));
          d.rotation.z = Math.sin(t * 2 + i) * .15;
        });
      };
    });
  },
  // Five real looks of one card, each in the viewer's light mode and then dark.
  appearance() {
    const looks = [['nicolo', SKY], ['consultant', '#1F4E79'], ['coach', '#D8572A'], ['broker', '#2E5E4E'], ['photographer', '#6D466B']];
    const STEP = 2.7, N = looks.length;
    return stage(N * 2 * STEP, 1.2, root => {
      const textures = looks.flatMap((_, i) => [shot(`look-${i + 1}-light`), shot(`look-${i + 1}-dark`)]);
      const device = phone(5.5, textures);
      device.position.set(0, -.08, 0); device.rotation.set(-.02, -.12, 0);
      root.add(device);
      const coin = plate(1.05, 1.05, { r: .525, d: .14 });
      const colours = label(1.85, .52, 'Your colours');
      colours.position.set(-2.95, -.45, .1);
      const logos = looks.map(([p]) => {
        const img = images[`logo-${p}`];
        const t = tex(560, 220, x => {
          box(x, 0, 0, 560, 220, 0, '#fff');
          const k = Math.min(470 / img.width, 150 / img.height), w = img.width * k, h = img.height * k;
          x.drawImage(img, (560 - w) / 2, (220 - h) / 2, w, h);
        });
        const l = plate(2.05, .8, { r: .12, map: t, d: .08 });
        root.add(l);
        return l;
      });
      const logoTag = label(1.6, .52, 'Your logo');
      logoTag.position.set(2.95, -.45, .1);
      const toggle = chip(1.6, .8, (x, W, H, k) => {
        box(x, 0, 0, W, H, 0, k > .5 ? '#4A505C' : '#EEF1F5');
        const kx = lerp(H / 2, W - H / 2, k);
        x.beginPath(); x.arc(kx, H / 2, H * .36, 0, 7); x.fillStyle = k > .5 ? '#FFFFFF' : YELLOW; x.fill();
      });
      toggle.position.set(2.95, 1.75, .2);
      const mode = chip(1.95, .56, (x, W, H, d) => say(x, d ? 'Viewer: dark' : 'Viewer: light', W / 2, H / 2 + 2, `600 ${H * .42}px ${TW}`, INK));
      mode.position.set(2.95, 1.02, .1);
      root.add(coin, colours, logoTag, toggle, mode);
      return t => {
        const a = Math.floor(t / STEP) % (N * 2), p = t % STEP, look = a >> 1, dark = a % 2 === 1, next = (look + 1) % N;
        const fly = dark ? ss(1.3, 1.95, p) : 1, arrive = dark ? pop(0, .4, p) : 0;
        const coinStart = [-2.95, .55, .3], logoStart = [2.95, -1.3, .3], target = [0, .3, 1];
        const tint = looks[next][1], shownLogo = next;
        coin.body.material.color.set(tint);
        coin.position.set(...arc(coinStart, target, fly, .35));
        setScale(coin, arrive * (1 - fly));
        logos.forEach((l, i) => {
          l.visible = i === shownLogo;
          if (i === shownLogo) { l.position.set(...arc(logoStart, target, fly, .35)); setScale(l, arrive * (1 - fly)); }
        });
        const night = dark ? 1 - ss(1.9, 2.5, p) : ss(1.8, 2.4, p);
        toggle.show(Math.round(night * 12) / 12); mode.show(night > .5 ? 1 : 0);
        if (dark) device.screen.show(a, (a + 1) % (N * 2), ss(1.85, 2.5, p), 1);
        else device.screen.show(a, a + 1, ss(1.8, 2.4, p));
      };
    });
  },
  // The team taps real NFC.cool tags; every lead lands as a row in the web dashboard's Leads inbox.
  team() {
    const crew = [['coach', 'Ayo'], ['engineer', 'Rin'], ['trades', 'Devon']];
    const leadsIn = [
      ['Emma Appleseed', 'Pinecrest Group', 0], ['Freya Lindholm', 'Northscape', 1],
      ['Idris Bello', 'Tanner & Kade', 2], ['Tom Alvarez', 'Fieldstone Design', 0],
    ];
    const WHEN = [2.9, 4.1, 5.3, 6.5];
    const face = (x, p, cx, cy, r) => {
      const img = images[`hero-${p}`], k = img.width / 1224;
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip();
      x.drawImage(img, (612 - 300) * k, (396 - 300) * k, 600 * k, 600 * k, cx - r, cy - r, r * 2, r * 2);
      x.restore();
    };
    const pill = (x, text, color, bg, a, cy, H = 40) => {
      x.font = `600 ${H * .56}px ${TW}`;
      const w = x.measureText(text).width + H * .9;
      box(x, a, cy - H / 2, w, H, H / 2, bg);
      say(x, text, a + w / 2, cy + 1, `600 ${H * .56}px ${TW}`, color);
      return w;
    };
    const STATUS_BG = { New: ['#1A60CE', '#DCEBFF'], Contacted: ['#B86A12', '#FFE9CF'], Qualified: ['#1E8A4A', '#D9F5E2'], Converted: ['#A331B0', '#F8DDFB'] };
    const paintInbox = (x, W0, H0, n, slide, status) => {
      const Z = 1.3, W = W0 / Z, H = H0 / Z;
      x.scale(Z, Z);
      box(x, 0, 0, W, H, 0, '#F5F6F8');
      box(x, 18, 46, 262, H - 66, 22, '#fff', '#E6E8EB', 2);
      wordmark(x, 48, 96, 44, INK, 'left');
      [['Overview', 0], ['Members', 0], ['Cards', 0], ['Leads', 1], ['Settings', 0]].forEach(([s, on], i) => {
        const y = 170 + i * 62;
        if (on) box(x, 34, y - 26, 230, 52, 12, '#DCEBFF');
        say(x, s, 58, y + 1, `${on ? 600 : 400} 25px ${TW}`, INK, 'left');
        if (on && n) { box(x, 206, y - 15, 44, 30, 15, '#fff'); say(x, String(n), 228, y + 1, `600 19px ${TW}`, '#1A60CE'); }
      });
      say(x, 'Leads', 314, 92, `700 46px ${TW}`, INK, 'left');
      box(x, W - 158, 62, 128, 56, 14, '#fff', SKY, 2);
      say(x, 'Export', W - 94, 91, `600 24px ${TW}`, INK);
      box(x, 300, 136, W - 322, H - 156, 20, '#fff', '#E6E8EB', 2);
      const count = s => status.slice(0, n).filter(v => v === s).length;
      let a = 322;
      [['All', n], ['New', count('New')], ['Contacted', count('Contacted')], ['Qualified', count('Qualified')]].forEach(([s, c], i) => {
        a += pill(x, `${s} ${c}`, i === 0 ? '#fff' : INK, i === 0 ? SKY : '#EEF1F5', a, 180) + 10;
      });
      const heads = [322, 610, 790];
      ['Lead', 'Captured by', 'Status'].forEach((s, i) => say(x, s, heads[i], 232, `600 20px ${TW}`, MUTED, 'left'));
      x.fillStyle = '#E6E8EB'; x.fillRect(300, 252, W - 322, 2);
      if (!n) { say(x, 'Leads your team collects land here', (300 + W - 22) / 2, 440, `400 27px ${TW}`, MUTED); return; }
      const ROW = 104, top = 256;
      x.save(); x.beginPath(); x.rect(300, 254, W - 322, H - 280); x.clip();
      for (let i = n - 1; i >= 0; i--) {
        const newest = i === n - 1;
        const y = top + ROW * (n - 1 - i) + (newest ? 0 : -ROW * (1 - slide));
        x.globalAlpha = newest ? slide : 1;
        const [name, company, who] = leadsIn[i];
        say(x, name, heads[0], y + 38, `600 30px ${TW}`, INK, 'left');
        say(x, company, heads[0], y + 74, `400 23px ${TW}`, MUTED, 'left');
        face(x, crew[who][0], heads[1] + 24, y + 52, 24);
        say(x, crew[who][1], heads[1] + 58, y + 53, `400 25px ${TW}`, INK, 'left');
        const [c, bg] = STATUS_BG[status[i]];
        pill(x, status[i], c, bg, heads[2], y + 52, 42);
        x.globalAlpha = 1;
        x.fillStyle = '#F0F1F3'; x.fillRect(300, y + ROW, W - 322, 2);
      }
      x.restore();
    };
    return stage(14, 10.2, root => {
      const screen = tex(1280, 800);
      screen.flipY = false;
      const mac = laptop(5.9, screen);
      mac.position.set(0, -.72, -.7);
      mac.rotation.set(-.2, 0, 0);
      root.add(mac);
      const members = crew.map(([p], i) => {
        const H = 1.3, c = plate(H * TILE_W, H, { r: .09, color: '#E9EBEE', map: tile(`hero-${p}`), back: tile(`team-${p}`) });
        const seat = [-2.75 + i * 2.75, 1.98, -.1 - Math.abs(i - 1) * .1];
        c.position.set(...seat);
        root.add(c);
        const tag = i === 0 ? nfcCard(1.15) : realTag(['', 'Tag1Sticker', 'Tag6Fob'][i], .72);
        root.add(tag);
        const r = ring(.9); r.position.set(seat[0] + .85, seat[1] - .35, .4); root.add(r);
        return { c, tag, r, seat };
      });
      const brand = label(2.75, .62, 'One brand, locked');
      brand.position.set(0, 2.78, .2);
      root.add(brand);
      const flying = leadsIn.map(([name]) => {
        const f = chip(2.3, .6, (x, W, H) => say(x, name, W / 2, H / 2 + 2, `600 ${H * .42}px ${TW}`, INK), { d: .1, r: .14 });
        root.add(f);
        return f;
      });
      const assign = chip(2.7, .62, (x, W, H) => {
        face(x, 'engineer', H * .55, H / 2, H * .36);
        say(x, 'Assigned to Rin', H * 1.05, H / 2 + 2, `600 ${H * .4}px ${TW}`, INK, 'left');
      }, { d: .12 });
      assign.position.set(2.0, -.35, 1.3);
      root.add(assign);
      let last = '';
      return t => {
        const end = t > 13 ? 0 : 1;
        members.forEach((m, i) => {
          const flip = ss(.8 + i * .22, 1.4 + i * .22, t) * (1 - ss(12.9 + i * .1, 13.5 + i * .1, t));
          m.c.rotation.set(-.03, flip * Math.PI, 0);
          let press = 0;
          leadsIn.forEach(([, , who], k) => { if (who === i) press = Math.max(press, win(WHEN[k] - .45, WHEN[k] - .1, WHEN[k] + .05, WHEN[k] + .4, t)); });
          m.tag.position.set(m.seat[0] + .85 - press * .4, m.seat[1] - .5 + press * .28 + Math.sin(t * 1.2 + i) * .02, .45 + press * .1);
          m.tag.rotation.set(-.08, -.25, .14 - press * .1);
          let k = 0;
          leadsIn.forEach(([, , who], j) => { if (who === i && t >= WHEN[j] - .1 && t < WHEN[j] + .8) k = (t - WHEN[j] + .1) / .8; });
          ripple(m.r, k, .9);
        });
        setScale(brand, pop(2.0, 2.45, t) * (1 - ss(12.6, 13, t)));
        flying.forEach((f, i) => {
          const from = [members[leadsIn[i][2]].seat[0], members[leadsIn[i][2]].seat[1] - .7, .7];
          const k = ss(WHEN[i], WHEN[i] + .7, t);
          f.position.set(...arc(from, [.4, -.15, 1.1], k, .2));
          setScale(f, win(WHEN[i] - .02, WHEN[i] + .15, WHEN[i] + .55, WHEN[i] + .75, t));
        });
        const n = WHEN.filter(w => t > w + .55).length * end;
        const latest = n ? WHEN[n - 1] + .55 : 0;
        const slide = n ? Math.round(ss(latest, latest + .35, t) * 10) / 10 : 1;
        const status = ['New', 'New', 'New', 'New'];
        if (t > 8.2) status[3] = 'Contacted';
        if (t > 9.6) status[2] = 'Qualified';
        if (t > 10.8) status[0] = 'Converted';
        const key = `${n},${slide},${status}`;
        if (key !== last) { last = key; screen.paint((x, W, H) => paintInbox(x, W, H, n, slide, status)); }
        setScale(assign, pop(7.7, 8.1, t) * (1 - ss(9.3, 9.6, t)));
      };
    });
  },
  // Someone scans the Lock Screen QR; the new lead comes up, gets a tag, and the counts have risen.
  conference() {
    return stage(11, 4.8, root => {
      const faces = { qr: tile('live-qr'), a: tile('live-lead-a'), b: tile('live-lead-b'), s: tile('live-stats-b') };
      const lock = screenTex();
      const mine = phone(5.4, [lock]);
      mine.position.set(-2.15, -.1, 0); mine.rotation.set(-.02, .2, 0);
      mine.screen.show(0);
      const theirs = phone(4.3, [shot('card')]);
      theirs.screen.show(0);
      const zoom = plate(4.05, 4.05 * 468 / 1236, { r: .22, d: .12, color: '#17181C', map: faces.qr });
      zoom.position.set(.5, -1.82, 2.5);
      zoom.rotation.set(-.05, -.05, 0);
      root.add(mine, theirs, zoom);
      const rings = [0, 1].map(() => { const r = ring(1); r.position.set(-1.95, -1.2, .4); root.add(r); return r; });
      let last = '';
      return t => {
        const here = win(.6, 1.5, 7.9, 8.8, t);
        const show = ss(2.45, 3.15, t);
        theirs.position.set(lerp(7, 2.55, here), .15 + Math.sin(t * 1.3) * .03, .5);
        // The other phone's camera faces the Lock Screen, then it turns round with the card open.
        theirs.rotation.set(-.03, lerp(-2.45, -.34, show), lerp(.15, -.02, here));
        // A new lead brings up the Lead view, as in the widget; then the Stats view.
        const key = t < 3.4 || t >= 9.6 ? 'qr' : t < 4.7 ? 'a' : t < 6 ? 'b' : 's';
        if (key !== last) {
          last = key;
          zoom.face.material.map = faces[key];
          const img = { qr: 'live-qr', a: 'live-lead-a', b: 'live-lead-b', s: 'live-stats-b' }[key];
          lock.paint((x, W, H) => lockScreen(x, W, H, images[img]));
        }
        setScale(zoom, 1 + win(3.4, 3.5, 3.5, 3.8, t) * .04);
        rings.forEach((r, i) => ripple(r, clamp((t - 1.7 - i * .2) / .8), 1));
      };
    });
  },
};
function lockScreenPlain(x, W, H) {
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#2B2F3A'); g.addColorStop(1, '#14161C');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.save(); x.scale(W / 440, H / 956);
  x.restore();
  x.save(); x.globalCompositeOperation = 'screen'; x.drawImage(images['card-dark'], 0, 0, 660, 96, 0, 0, W, 96 * W / 660); x.restore();
  x.save(); x.scale(W / 440, H / 956);
  say(x, 'Wednesday, November 4', 220, 104, `600 21px ${SYS}`, 'rgba(255,255,255,.9)');
  say(x, '9:41', 220, 172, `600 96px ${SYS}`, 'rgba(255,255,255,.95)');
  x.restore();
}

// ---- professions: real objects floating on a transparent page, no stage, no floor ----
const proGltf = {};
let parseGlb, studio;
const SOFT = '#FFFFFF';
// A photographer's studio as reflections: big softboxes and dark gaps, so metal and glass read as real.
function studioScene() {
  const s = new Scene();
  s.add(new Mesh(new THREE.BoxGeometry(30, 30, 30), new MeshBasicMaterial({ color: new Color(.1, .1, .11), side: THREE.BackSide })));
  const panel = (w, h, power, pos, tint = [1, 1, 1]) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(tint[0] * power, tint[1] * power, tint[2] * power), side: DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
  };
  panel(16, 10, 9, [0, 14, 3]);              // overhead softbox
  panel(7, 16, 12, [-14, 3, 5], [1, .98, .95]);   // key, warm
  panel(2.2, 18, 10, [14, 2, 2], [.92, .96, 1]);  // rim strip, cool
  panel(14, 5, 2.4, [0, -7, 14]);            // low front fill
  panel(5, 9, 3, [5, 5, 14]);                // small front card
  panel(10, 3, 1.2, [0, -14, 0]);
  panel(16, 14, 1.5, [-2, 3, 15]);           // broad front wash for flat metal
  return s;
}
function floating(dur, still, build) {
  const scene = new Scene();
  scene.environment = studio;
  scene.environmentIntensity = .92;
  const key = new DirectionalLight('#fff', 1.15);
  key.position.set(-4.5, 8, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 26 });
  key.shadow.radius = 6; key.shadow.bias = -.0004; key.shadow.normalBias = .015;
  scene.add(key);
  const root = new Group();
  scene.add(root);
  const camera = new PerspectiveCamera(22, 1.25, 8, 36);
  camera.position.set(0, 0, 19.8);
  camera.lookAt(0, 0, 0);
  const update = build(root);
  return { scene, camera, root, dur, still, update };
}
// A scanned model, centred, with its longest side at the given size. `only` keeps some of its parts.
function prop(name, size, only, flat) {
  const root = proGltf[name].scene.clone(true);
  if (only) {
    const drop = [];
    root.traverse(o => { if (o.isMesh && !only.some(n => o.name === n || o.parent?.name === n)) drop.push(o); });
    drop.forEach(o => o.removeFromParent());
  }
  root.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = o.receiveShadow = true;
    ['map', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(k => { if (o.material[k]) o.material[k].anisotropy = 16; });
    // Glass: the page has nothing to refract, so lenses are a thin coat with highlights.
    if ((name === 'round_spectacles' || name === 'alarm_clock_01') && (o.material.transmission > 0 || /glass|lens/i.test(o.material.name))) { o.material = o.material.clone(); o.material.transmission = 0; o.material.transparent = true; o.material.opacity = .14; o.material.roughness = .06; o.material.color.set('#E8EEF4'); o.material.depthWrite = false; o.castShadow = false; }
  });
  const inner = new Group();
  inner.add(root);
  if (flat) {
    const d0 = new Box3().setFromObject(inner).getSize(new Vector3());
    if (d0.y <= d0.x && d0.y <= d0.z) root.rotation.x = Math.PI / 2;
    else if (d0.x <= d0.y && d0.x <= d0.z) root.rotation.y = Math.PI / 2;
    inner.updateMatrixWorld(true);
  }
  const b = new Box3().setFromObject(inner), dim = b.getSize(new Vector3());
  inner.scale.setScalar(size / Math.max(dim.x, dim.y, dim.z));
  inner.updateMatrixWorld(true);
  inner.position.sub(new Box3().setFromObject(inner).getCenter(new Vector3()));
  const g = new Group();
  g.add(inner);
  return g;
}
// A slow drift that closes on itself over the loop.
const drifter = (dur, items) => t => items.forEach(([o, p, r, phase = 0, amp = .06]) => {
  const a = t / dur * Math.PI * 2 + phase;
  o.position.set(p[0] + Math.cos(a) * amp * .4, p[1] + Math.sin(a) * amp, p[2]);
  o.rotation.set(r[0] + Math.sin(a) * .02, r[1] + Math.cos(a) * .03, r[2] + Math.sin(a + 1) * .012);
});
const mix3 = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));
// The phone rests, swings over so its top edge (where the NFC antenna is) meets the tag, and goes back with the card open.
const TILT = .95, REACH = 2.28, hitV = new Vector3();
// How the phone comes to a tag: it leaves quickly and settles softly, stays at one depth so it can't pass through anything, and only turns about the screen's own axis.
// Each scene shapes the path: arc bends it to one side, roll says when the phone turns (below 1 early, above 1 late).
const tapGo = (a, b, c, d, t) => t < c ? 1 - Math.pow(1 - ss(a, b, t), 2.4) : 1 - ss(c, d, t);
function tapPose(ph, rest, touch, tilt, go, z, { arc = 0, roll = 1 } = {}) {
  const dx = touch[0] - rest.p[0], dy = touch[1] - rest.p[1], len = Math.hypot(dx, dy) || 1, bow = Math.sin(go * Math.PI) * arc;
  ph.position.set(lerp(rest.p[0], touch[0], go) - dy / len * bow, lerp(rest.p[1], touch[1], go) + dx / len * bow, z);
  ph.rotation.set(lerp(rest.r[0], .03, go), lerp(rest.r[1], -.1, go), lerp(rest.r[2], tilt, Math.pow(go, roll)));
}
function tapper(dur, ph, rest, target, root, z, at = 1.1) {
  return t => {
    const a = t / dur * Math.PI * 2;
    const go = tapGo(at, at + .85, at + 1.25, at + 2.1, t);
    target.getWorldPosition(hitV); root.worldToLocal(hitV);
    const touch = [hitV.x + Math.sin(TILT) * REACH, hitV.y - Math.cos(TILT) * REACH];
    tapPose(ph, rest, touch, TILT, go, z);
    ph.position.y += Math.sin(a) * .05 * (1 - go);
    ph.rotation.y += Math.cos(a) * .018 * (1 - go);
    ph.screen.show(0, 1, ss(at + .95, at + 1.55, t) * (1 - ss(dur - .85, dur - .25, t)), 1);
    return go;
  };
}
// Each phone has its own wallpaper: three stops down the screen and two soft glows.
const WALLS = {
  blue: ['#0F2F66', '#1A60CE', '#0A1730', '#128CF0', '#0F3F9E'],
  violet: ['#231A5C', '#5B3FC4', '#120C33', '#B468F0', '#2C6BE0'],
  sunset: ['#5A1F3D', '#D8603F', '#27102C', '#FFB057', '#B02A5B'],
  teal: ['#06403F', '#0F8C80', '#04211F', '#4FE0C0', '#0C5F86'],
  gold: ['#1B1C20', '#3A3A40', '#0C0C0E', '#C9A25C', '#5C4A2A'],
  wine: ['#3A0A1E', '#8E1B3C', '#190510', '#E4577A', '#4C1A66'],
  ember: ['#28303A', '#C2591F', '#11151B', '#FFA245', '#37536B'],
  mono: ['#26282D', '#5D6068', '#101114', '#C9CCD3', '#3A3D45'],
  forest: ['#0E2E24', '#2E7A5E', '#07170F', '#8FD6A8', '#1B4E5C'],
};
function lockWall(x, W, H, wall = 'blue') {
  const [a, b, c, g1, g2] = WALLS[wall];
  const g = x.createLinearGradient(0, 0, W * .4, H);
  g.addColorStop(0, a); g.addColorStop(.5, b); g.addColorStop(1, c);
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  [[.82, .3, W * .95, g1, .75], [.12, .72, W * .85, g2, .7]].forEach(([u, v, r, col, o]) => {
    const glow = x.createRadialGradient(W * u, H * v, 0, W * u, H * v, r);
    x.globalAlpha = o; glow.addColorStop(0, col); glow.addColorStop(1, col + '00');
    x.fillStyle = glow; x.fillRect(0, 0, W, H); x.globalAlpha = 1;
  });
}
// The Lock Screen: status icons only on the right, date, clock, flashlight and camera, home bar.
function lockGlass(x, W, H, card, wall) {
  lockWall(x, W, H, wall);
  x.save(); x.beginPath(); x.rect(W * .6, 0, W * .4, 96 * W / 660); x.clip();
  x.globalCompositeOperation = 'screen'; x.drawImage(images['card-dark'], 0, 0, 660, 96, 0, 0, W, 96 * W / 660); x.restore();
  x.save(); x.scale(W / 440, H / 956);
  say(x, 'Wednesday, November 4', 220, 112, `600 21px ${SYS}`, 'rgba(255,255,255,.92)');
  say(x, '9:41', 220, 182, `600 96px ${SYS}`, 'rgba(255,255,255,.96)');
  if (card) { x.save(); x.beginPath(); x.roundRect(14, 668, 412, 156, 26); x.clip(); x.drawImage(card, 14, 668, 412, 156); x.restore(); }
  [66, 374].forEach((a, i) => {
    x.beginPath(); x.arc(a, 878, 25, 0, 7); x.fillStyle = 'rgba(255,255,255,.2)'; x.fill();
    x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineWidth = 2; x.lineJoin = 'round';
    if (!i) { x.beginPath(); x.roundRect(a - 5, 875, 10, 15, 2); x.fill(); x.beginPath(); x.moveTo(a - 7, 867); x.lineTo(a + 7, 867); x.lineTo(a + 5, 874); x.lineTo(a - 5, 874); x.closePath(); x.fill(); }
    else { x.beginPath(); x.roundRect(a - 12, 870, 24, 17, 4); x.fill(); x.beginPath(); x.roundRect(a - 5, 867, 10, 5, 1.5); x.fill(); x.beginPath(); x.arc(a, 878.5, 5, 0, 7); x.fillStyle = '#3468B8'; x.fill(); }
  });
  box(x, 150, 938, 140, 5, 3, '#fff');
  x.restore();
}
const lockOf = (card, wall) => screenTex((x, W, H) => lockGlass(x, W, H, card, wall));
const shadowless = o => { o.traverse(m => { if (m.isMesh) m.castShadow = false; }); return o; };
// The badge from the hero's lanyard, without the waves.
function lanyard(height) {
  const g = realPart(bizGltf, 'Lanyard', height);
  const waves = [];
  g.traverse(o => { if (/Wave/.test(o.name)) waves.push(o); });
  waves.forEach(o => o.removeFromParent());
  g.traverse(o => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (o.material.map && o.material.name !== 'Ribbon') {
      const face = (a, b) => { const t = tex(1024, 646, (x, W, H) => {
        const f = x.createLinearGradient(0, 0, W, H); f.addColorStop(0, a); f.addColorStop(1, b);
        x.fillStyle = f; x.fillRect(0, 0, W, H);
        wordmark(x, W / 2, H * .52, 210, '#fff');
      }); t.flipY = false; return t; };
      const light = face('#26282E', '#141519'), dark = face('#1A60CE', '#128CF0'), mat = o.material;
      mat.roughness = .42;
      // Charcoal is lost on the dark page, so in dark mode the badge is brand blue, like the card.
      o.onBeforeRender = () => { mat.map = isDark() ? dark : light; };
      mat.map = isDark() ? dark : light; mat.needsUpdate = true;
    }
  });
  return g;
}
// A real pin-tumbler key, in millimetres: 2 mm thin, cuts on one edge only, milled keyway, stamped bow, worn metal.
// Colour, roughness and bump are painted from the same layout, so grooves are dirty and edges are polished.
function keyMaps(stamp, seedStart) {
  const X0 = -33, X1 = 35, Y = 15, PX = 30, W = (X1 - X0) * PX, H = Y * 2 * PX;
  const mx = v => (v - X0) * PX, my = v => (Y - v) * PX;
  let seed = seedStart; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layout = (x, groove, stampInk, scr, blotch) => {
    // the keyway: two long milled channels and a shallow one
    [[1.5, 1.1], [-1.4, .85], [-3.05, .35]].forEach(([y, h]) => { x.filter = 'blur(2px)'; x.fillStyle = groove; x.fillRect(mx(.5), my(y + h / 2), 28.5 * PX, h * PX); });
    // recessed panel on the bow
    x.filter = 'blur(3px)'; x.strokeStyle = groove; x.lineWidth = 8; x.beginPath(); x.ellipse(mx(-10.4), my(0), 7.2 * PX, 8.6 * PX, 0, 0, 7); x.stroke();
    x.filter = 'blur(.6px)'; x.save(); x.translate(mx(-10.4), my(0)); x.rotate(-Math.PI / 2);
    x.fillStyle = stampInk; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 ${3.5 * PX}px "Titillium Web", sans-serif`; x.fillText(stamp[0], 0, -1.9 * PX);
    x.font = `400 ${2.1 * PX}px "Titillium Web", sans-serif`; x.fillText(stamp[1], 0, 2.5 * PX); x.restore(); x.filter = 'none';
    for (let i = 0; i < 1500; i++) { const a = rnd() * W, b = rnd() * H, l = 20 + rnd() * 240, d = (rnd() - .5) * .5; x.strokeStyle = scr(rnd()); x.lineWidth = .4 + rnd(); x.beginPath(); x.moveTo(a, b); x.lineTo(a + l, b + l * d); x.stroke(); }
    for (let i = 0; i < 70; i++) { const a = rnd() * W, b = rnd() * H, r = 12 + rnd() * 90, g = x.createRadialGradient(a, b, 0, a, b, r); g.addColorStop(0, blotch); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(a - r, b - r, r * 2, r * 2); }
  };
  const make = (bg, ...args) => { const t = tex(W, H, (x, w, h) => { x.fillStyle = bg; x.fillRect(0, 0, w, h); seed = seedStart; layout(x, ...args); }); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; t.repeat.set(1 / (X1 - X0), 1 / (Y * 2)); t.offset.set(-X0 / (X1 - X0), .5); t.anisotropy = 16; return t; };
  const color = make('#EFEFEF', '#7C7C7C', '#6A6A6A', v => `rgba(255,255,255,${.04 + v * .1})`, 'rgba(90,84,74,.1)');
  const rough = make('#6E6E6E', '#B6B6B6', '#BEBEBE', v => v > .5 ? 'rgba(60,60,60,.3)' : 'rgba(170,170,170,.28)', 'rgba(160,160,160,.1)');
  const bump = make('#8C8C8C', '#262626', '#2E2E2E', v => `rgba(${v > .5 ? '40,40,40' : '190,190,190'},.32)`, 'rgba(128,128,128,0)');
  rough.colorSpace = bump.colorSpace = THREE.NoColorSpace;
  return { color, rough, bump };
}
function houseKey(len, tint, stamp, seed) {
  const k = len / 56, s = new Shape();
  // Bow: a soft rounded head with a neck, the outline of a common house key.
  s.moveTo(0, -3.9);
  s.bezierCurveTo(-1.5, -3.9, -2.6, -5, -3.6, -6.8);
  s.bezierCurveTo(-5.4, -11.8, -11.6, -13.2, -17, -11.8);
  s.bezierCurveTo(-22, -10.4, -25, -5.4, -25, 0);
  s.bezierCurveTo(-25, 5.4, -22, 10.4, -17, 11.8);
  s.bezierCurveTo(-11.6, 13.2, -5.4, 11.8, -3.6, 6.8);
  s.bezierCurveTo(-2.6, 5, -1.5, 4.3, 0, 4.3);
  // Top edge: shoulder, then five V cuts of different depths.
  const depths = [1.1, 2.7, .7, 2.2, 1.5, 2.9];
  depths.forEach((d, i) => { const c = 4 + i * 4; s.lineTo(c - 1.1, 4.3); s.lineTo(c - .25, 4.3 - d); s.lineTo(c + .25, 4.3 - d); s.lineTo(c + 1.1, 4.3); });
  s.lineTo(28.4, 4.3); s.lineTo(31.6, 1.2); s.lineTo(31.6, -1); s.lineTo(30.4, -3.9); s.closePath();
  const hole = new THREE.Path(); hole.absarc(-20.6, 0, 2.9, 0, Math.PI * 2, true); s.holes.push(hole);
  const geo = new ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: true, bevelSize: .32, bevelThickness: .32, bevelSegments: 4, curveSegments: 40 });
  geo.translate(0, 0, -.7);
  const maps = keyMaps(stamp, seed);
  const m = new Mesh(geo, new MeshStandardMaterial({ color: tint, metalness: 1, roughness: 1, map: maps.color, roughnessMap: maps.rough, bumpMap: maps.bump, bumpScale: 1.4, envMapIntensity: 1.35 }));
  m.castShadow = m.receiveShadow = true;
  // The key hangs from its hole: the group's origin is the hole.
  m.position.x = 20.6;
  const g = new Group(); g.add(m); g.scale.setScalar(k);
  return g;
}
// A split ring: two turns of flat steel wire.
function splitRing(r) {
  const pts = []; for (let i = 0; i <= 240; i++) { const a = i / 240 * Math.PI * 4; pts.push(new Vector3(Math.cos(a) * r, Math.sin(a) * r, (i / 240 - .5) * r * .15)); }
  const m = new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 480, r * .04, 10), new MeshStandardMaterial({ color: '#D3D5D9', metalness: 1, roughness: .28, envMapIntensity: 1.3 }));
  m.castShadow = true; m.scale.z = 1;
  return m;
}
// A wine glass turned on a lathe, with real thin-glass highlights.
function wineGlass(h, wine = '#7A1022') {
  const k = h / 4, pts = [[0, 0], [.72, 0], [.74, .03], [.3, .1], [.09, .24], [.07, 1.4], [.1, 1.62], [.5, 2.0], [.78, 2.6], [.72, 3.4], [.62, 4], [.6, 4], [.69, 3.4], [.74, 2.6], [.46, 2.03], [.04, 1.72], [0, 1.7]];
  const curve = new THREE.SplineCurve(pts.map(([a, b]) => new THREE.Vector2(a * k, b * k)));
  const geo = new THREE.LatheGeometry(curve.getPoints(160), 96);
  const glass = new Mesh(geo, new THREE.MeshPhysicalMaterial({ color: '#fff', roughness: .03, metalness: 0, transparent: true, opacity: .018, envMapIntensity: 3.4, clearcoat: 1, clearcoatRoughness: .02, side: DoubleSide, depthWrite: false }));
  const rim = new Mesh(geo, new ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.FrontSide,
    vertexShader: 'varying vec3 n; varying vec3 v; void main(){ vec4 p = modelViewMatrix * vec4(position, 1.0); n = normalMatrix * normal; v = -p.xyz; gl_Position = projectionMatrix * p; }',
    fragmentShader: 'varying vec3 n; varying vec3 v; void main(){ float f = pow(1.0 - abs(dot(normalize(n), normalize(v))), 2.4); gl_FragColor = vec4(vec3(.56, .62, .68), f * .34); }',
  }));
  rim.renderOrder = 3;
  const lq = [[0, 1.76], [.42, 2.03], [.72, 2.6], [.73, 2.86], [0, 2.86]];
  const wineGeo = new THREE.LatheGeometry(new THREE.SplineCurve(lq.map(([a, b]) => new THREE.Vector2(a * k, b * k))).getPoints(60), 72);
  const liquid = new Mesh(wineGeo, new THREE.MeshPhysicalMaterial({ color: wine, roughness: .08, metalness: 0, clearcoat: 1, clearcoatRoughness: .04, envMapIntensity: 1.3, sheen: 0 }));
  { const p = wineGeo.attributes.position, c = new Float32Array(p.count * 3); for (let i = 0; i < p.count; i++) { const v = .28 + .95 * clamp((p.getY(i) / k - 1.8) / 1.06) ** 1.4; c.set([v, v, v], i * 3); } wineGeo.setAttribute('color', new THREE.BufferAttribute(c, 3)); liquid.material.vertexColors = true; }
  const g = new Group(); g.add(liquid, glass, rim); glass.renderOrder = 2;
  g.position.y = 0;
  const wrap = new Group(); g.position.y = -h / 2; wrap.add(g);
  return wrap;
}
// A stethoscope: tubing on a spline, a machined chest piece and steel ear tubes.
function stethoscope(size) {
  const g = new Group(), k = size / 5;
  const rubber = new MeshStandardMaterial({ color: '#1B1D22', roughness: .42 });
  const steel = new MeshStandardMaterial({ color: '#D5D8DD', metalness: 1, roughness: .2 });
  const tube = (pts, r, mat) => {
    const c = new CatmullRomCurve3(pts.map(p => new Vector3(p[0] * k, p[1] * k, p[2] * k)));
    const m = new Mesh(new TubeGeometry(c, 240, r * k, 16), mat); m.castShadow = m.receiveShadow = true; g.add(m); return m;
  };
  tube([[.4, -2.45, .1], [1.25, -2.1, .2], [1.6, -1.1, .05], [.75, -.2, -.1], [-.3, .15, 0], [-.4, .9, .05]], .058, rubber);
  tube([[-.4, .9, .05], [-.85, 1.35, .05], [-1.05, 2.15, .1]], .046, rubber);
  tube([[-.4, .9, .05], [.05, 1.35, .05], [.3, 2.15, .1]], .046, rubber);
  tube([[-1.05, 2.1, .1], [-1.06, 2.6, .12], [-.8, 3.0, .2]], .036, steel);
  tube([[.3, 2.1, .1], [.32, 2.6, .12], [.05, 3.0, .2]], .036, steel);
  [[-.8, 3.0, .2], [.05, 3.0, .2]].forEach(p => { const m = new Mesh(new THREE.SphereGeometry(.085 * k, 24, 16), rubber); m.position.set(p[0] * k, p[1] * k, p[2] * k); m.scale.set(1, 1.3, 1); g.add(m); });
  const y = new Mesh(new THREE.SphereGeometry(.105 * k, 24, 16), steel); y.position.set(-.4 * k, .9 * k, .05 * k); g.add(y);
  const prof = [[0, 0], [.44, 0], [.5, .03], [.5, .12], [.44, .16], [.36, .17], [.3, .22], [.12, .24], [.1, .34], [0, .34]].map(([a, b]) => new THREE.Vector2(a * k, b * k));
  const head = new Mesh(new THREE.LatheGeometry(prof, 96), steel); head.castShadow = true;
  head.rotation.x = Math.PI / 2; head.position.set(.2 * k, -2.5 * k, 0);
  g.add(head);
  return g;
}
// A printed sheet with soft paper shading: a form on the clipboard, a CV on the stack.
function paperSheet(w, h, paint) {
  const t = tex(Math.round(w * 200), Math.round(h * 200), (x, W, H) => { x.fillStyle = '#F6F5F1'; x.fillRect(0, 0, W, H); paint(x, W, H); });
  t.anisotropy = 16;
  const m = new Mesh(new PlaneGeometry(w, h), new MeshStandardMaterial({ map: t, roughness: .86 }));
  m.receiveShadow = true;
  return m;
}
const formLines = (x, W, H, top = .22) => {
  x.fillStyle = '#C9CDD3';
  for (let i = 0; i < 12; i++) x.fillRect(W * .09, H * (top + i * .056), W * (i % 4 === 3 ? .46 : .8), H * .006);
};
// What the Camera app draws over a QR code: corner brackets, and the yellow link pill once it reads it.
function cameraChrome(x, W, H, link) {
  const s = W * .8, a = W * .5 - s / 2, b = H * .46 - s / 2, L = s * .2;
  x.fillStyle = '#000'; x.fillRect(0, 0, W, H * .11); x.fillRect(0, H * .78, W, H * .22);
  x.strokeStyle = YELLOW; x.lineWidth = 7; x.lineCap = 'round';
  [[a, b, 1, 1], [a + s, b, -1, 1], [a, b + s, 1, -1], [a + s, b + s, -1, -1]].forEach(([p, q, u, v]) => { x.beginPath(); x.moveTo(p + u * L, q); x.lineTo(p, q); x.lineTo(p, q + v * L); x.stroke(); });
  x.beginPath(); x.arc(W / 2, H * .9, W * .095, 0, 7); x.strokeStyle = '#fff'; x.lineWidth = 6; x.stroke();
  x.beginPath(); x.arc(W / 2, H * .9, W * .078, 0, 7); x.fillStyle = '#fff'; x.fill();
  if (link) { box(x, W * .28, b + s + H * .016, W * .44, H * .036, H * .018, YELLOW); say(x, 'nfc.cool', W / 2, b + s + H * .035, `600 ${H * .019}px ${SYS}`, '#111'); }
}
function cameraView(slide, link) {
  return screenTex((x, W, H) => {
    x.fillStyle = '#0A0A0C'; x.fillRect(0, 0, W, H);
    const sw = W * 2.5, sh = sw * slide.height / slide.width;
    x.drawImage(slide, 0, 0, slide.width, slide.height, W * .5 - sw * .789, H * .46 - sh / 2, sw, sh);
    cameraChrome(x, W, H, link);
  });
}

// An Apple Wallet pass in the generic layout the service signs (api/v2views.py): logo, photo, NAME, ORGANIZATION, QR code.
function walletPass(h, passColor = '#007AFF') {
  const w = h * .7;
  const t = tex(840, 1200, (x, W, H) => {
    x.fillStyle = passColor; x.fillRect(0, 0, W, H);
    wordmark(x, 56, 92, 66, '#fff', 'left');
    const im = images['hero-nicolo'], k = im.width / 1224;
    x.save(); x.beginPath(); x.roundRect(W - 216, 150, 160, 190, 12); x.clip(); x.fillStyle = '#E9E9EE'; x.fillRect(W - 216, 150, 160, 190);
    x.drawImage(im, 345 * k, 120 * k, 534 * k, 634 * k, W - 216, 150, 160, 190); x.restore();
    say(x, 'NAME', 56, 186, `600 26px ${SYS}`, 'rgba(255,255,255,.72)', 'left');
    say(x, 'Nicolo Stanciu', 56, 248, `400 62px ${SYS}`, '#fff', 'left');
    say(x, 'ORGANIZATION', 56, 408, `600 26px ${SYS}`, 'rgba(255,255,255,.72)', 'left');
    say(x, 'NFC.cool', 56, 456, `400 42px ${SYS}`, '#fff', 'left');
    box(x, W / 2 - 210, 640, 420, 420, 22, '#fff'); qr(x, W / 2 - 180, 670, 360);
  });
  t.anisotropy = 16;
  const p = plate(w, h, { r: h * .035, d: .05, color: passColor, rough: .35 });
  const f = new Mesh(faceGeo(w, h, h * .035), new MeshStandardMaterial({ map: t, roughness: .32, envMapIntensity: .55, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  f.position.z = .026; f.receiveShadow = true; p.add(f);
  return p;
}
// The email a lead receives: the "brand" style of the service's follow_up.html.
const FU_BRAND = '#2E5E4E';
function emailBody(x, W, top, scale) {
  const u = n => n * scale;
  x.fillStyle = FU_BRAND; x.fillRect(0, top, W, u(92));
  const logo = images['logo-broker'], lw = Math.min(u(200), logo.width / logo.height * u(36)), lh = lw * logo.height / logo.width;
  box(x, u(26), top + u(46) - lh / 2 - u(8), lw + u(24), lh + u(16), u(8), '#fff'); x.drawImage(logo, u(38), top + u(46) - lh / 2, lw, lh);
  let y = top + u(136);
  const para = (lines, font, color, gap) => { lines.forEach(l => { say(x, l, u(28), y, font, color, 'left'); y += gap; }); };
  para(['Hi Emma,'], `400 ${u(23)}px ${SYS}`, '#212529', u(46));
  para(['Great meeting you at the show.', 'Here is my card, so you have my', 'details in one place.'], `400 ${u(23)}px ${SYS}`, '#212529', u(33));
  y += u(18);
  x.fillStyle = FU_BRAND; x.fillRect(u(28), y, W - u(56), u(2.5));
  y += u(54);
  const av = images['hero-broker'], k = av.width / 1224, r = u(30);
  x.save(); x.beginPath(); x.arc(u(58), y, r, 0, 7); x.clip(); x.drawImage(av, 312 * k, 96 * k, 600 * k, 600 * k, u(58) - r, y - r, r * 2, r * 2); x.restore();
  say(x, 'Samir Haddad', u(104), y - u(12), `700 ${u(22)}px ${SYS}`, '#212529', 'left');
  say(x, 'Partner · Haddad & Lowe', u(104), y + u(16), `400 ${u(19)}px ${SYS}`, '#686F76', 'left');
  y += u(58);
  box(x, u(28), y, u(208), u(50), u(25), FU_BRAND);
  say(x, 'Save my contact', u(132), y + u(26), `700 ${u(19)}px ${SYS}`, '#fff');
}
function mailScreen(x, W, H) {
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
  x.drawImage(images.leads, 0, 0, 660, 96, 0, 0, W, 96 * W / 660);
  const s = W / 440;
  say(x, '‹ Inbox', 16 * s, 84 * s, `400 ${20 * s}px ${SYS}`, '#007AFF', 'left');
  say(x, 'Samir Haddad', 16 * s, 128 * s, `600 ${20 * s}px ${SYS}`, '#111', 'left');
  say(x, 'To: Emma Appleseed', 16 * s, 156 * s, `400 ${16 * s}px ${SYS}`, '#8A8F96', 'left');
  say(x, 'Great meeting you', 16 * s, 192 * s, `700 ${23 * s}px ${SYS}`, '#111', 'left');
  x.fillStyle = '#E6E8EB'; x.fillRect(0, 214 * s, W, 1.5 * s);
  emailBody(x, W, 226 * s, s * .96);
  x.fillStyle = '#D1D5DB';
  box(x, 150 * s, 938 * s, 140 * s, 5 * s, 3 * s, '#111');
}
function lockBanner(x, W, H) {
  lockGlass(x, W, H, undefined, 'forest');
  x.save(); x.scale(W / 440, H / 956);
  box(x, 14, 268, 412, 84, 24, 'rgba(255,255,255,.88)');
  const g = x.createLinearGradient(0, 282, 0, 338); g.addColorStop(0, '#1FA2FF'); g.addColorStop(1, '#1A6DF0');
  box(x, 26, 282, 56, 56, 13, g);
  x.strokeStyle = '#fff'; x.lineWidth = 2.5; x.lineJoin = 'round'; x.beginPath(); x.roundRect(36, 296, 36, 27, 3); x.moveTo(36, 298); x.lineTo(54, 312); x.lineTo(72, 298); x.stroke();
  say(x, 'Samir Haddad', 94, 298, `600 19px ${SYS}`, '#111', 'left');
  say(x, 'Great meeting you', 94, 324, `400 18px ${SYS}`, '#333', 'left');
  say(x, 'now', 412, 298, `400 15px ${SYS}`, '#666', 'right');
  x.restore();
}
// A paper envelope that opens, takes the branded letter and closes.
function envelope(W, paper0 = FU_BRAND, backC = '#234A3D', flapC = '#376F5C', _unused, letterBody = emailBody) {
  const H = W * .64, g = new Group(), paper = paper0;
  const back = plate(W, H, { r: .05, d: .012, color: backC, rough: .7 });
  const lt = tex(800, 1000, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); letterBody(x, w, 0, w / 440); });
  lt.anisotropy = 16;
  const LW = W * .9, LH = LW * 1.2;
  const letter = plate(LW, LH, { r: .03, d: .012, color: '#fff', rough: .8 });
  const lf = new Mesh(faceGeo(LW, LH, .03), new MeshStandardMaterial({ map: lt, roughness: .75, envMapIntensity: .6, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  lf.position.z = .007; letter.add(lf);
  const pocketShape = new Shape();
  pocketShape.moveTo(-W / 2, -H / 2); pocketShape.lineTo(W / 2, -H / 2); pocketShape.lineTo(W / 2, H / 2 - .02); pocketShape.lineTo(0, -H * .06); pocketShape.lineTo(-W / 2, H / 2 - .02); pocketShape.closePath();
  const pocket = new Mesh(new ExtrudeGeometry(pocketShape, { depth: .012, bevelEnabled: false }), new MeshStandardMaterial({ color: paper, roughness: .62 }));
  pocket.position.z = .05; pocket.castShadow = pocket.receiveShadow = true;
  const flapShape = new Shape();
  flapShape.moveTo(-W / 2, 0); flapShape.lineTo(W / 2, 0); flapShape.quadraticCurveTo(W * .1, -H * .54, 0, -H * .57); flapShape.quadraticCurveTo(-W * .1, -H * .54, -W / 2, 0); flapShape.closePath();
  const flap = new Mesh(new ShapeGeometry(flapShape, 20), new MeshStandardMaterial({ color: flapC, roughness: .6, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -1 }));
  flap.castShadow = true;
  const hinge = new Group(); hinge.position.set(0, H / 2, .066); hinge.add(flap);
  g.add(back, letter, pocket, hinge);
  g.letter = letter; g.hinge = hinge; g.LH = LH; g.H = H;
  return g;
}
// The NFC.cool card with a lit face, so it catches the studio like the objects around it.
function litCard(w) {
  const c = nfcCard(w);
  c.face.material = new MeshStandardMaterial({ map: c.face.material.map, roughness: .38, metalness: .05, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  c.face.receiveShadow = true;
  return c;
}
const TAPEX = .1, TAPEY = -.1;
const corner = (card, w) => { const spot = new Group(), k = card.scale.x || 1; spot.position.set(w * .47 / k, w * .2 / k, 0); card.add(spot); return spot; };
const hitDecay = d => (d > 0 && d < 1 ? Math.exp(-d * 6) * Math.sin(d * 18) : 0);
const REST = { p: [2.25, -.02, .5], r: [-.06, -.34, .07] };
const DUR = 9;
function tapScene(card, make, rest = REST) {
  return floating(DUR, 5, root => {
    const { items, target } = make(root);
    const ph = phone(5.05, [lockOf(), shot(card)]);
    root.add(ph);
    const drift = drifter(DUR, items);
    // The phone travels in a plane in front of every object, so it can never pass through one.
    let top = -9;
    for (let i = 0; i < 12; i++) { drift(DUR * i / 12); items.forEach(([o]) => { o.updateWorldMatrix(true, true); top = Math.max(top, new Box3().setFromObject(o).max.z); }); }
    const tap = tapper(DUR, ph, rest, target, root, top + .65);
    return t => { drift(t); tap(t); };
  });
}
// Seats a tag on a real surface: casts down onto the object, then sits flush with the surface it finds.
function seat(tag, on, x, y, lift = .004) {
  on.updateWorldMatrix(true, true);
  const hit = new THREE.Raycaster(new Vector3(x, y, 40), new Vector3(0, 0, -1)).intersectObject(on, true)[0];
  if (!hit) throw new Error(`no surface at ${x}, ${y}`);
  const n = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
  const depth = new Box3().setFromObject(tag).getSize(new Vector3()).z;
  tag.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), n);
  tag.position.copy(hit.point).addScaledVector(n, depth / 2 + lift);
  return tag;
}
// A printed NFC.cool label, thin as a real sticker, to sit flush on a surface.
function labelTag(w, h) {
  const t = tex(Math.round(w * 400), Math.round(h * 400), (x, W, H) => {
    const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#1A60CE'); g.addColorStop(1, '#128CF0');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    wordmark(x, W / 2, H * .52, H * .52, '#fff');
  });
  t.anisotropy = 16;
  const m = new Mesh(faceGeo(w, h, h * .14), new MeshStandardMaterial({ map: t, roughness: .4, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
  m.receiveShadow = true;
  const g = new Group(); g.add(m);
  return g;
}
const withTag = (o, tag, at, r = [0, 0, 0]) => { const g = new Group(); tag.position.set(...at); tag.rotation.set(...r); g.add(o, tag); return g; };

const PRO = {
  trades() {
    return tapScene('card-trades', root => {
      const hammer = prop('cross_pein_hammer', 4.4), pliers = prop('pliers', 2.9);
      const tape = prop('measuring_tape_01', 2.6, null, true);
      const tag = labelTag(1.02, .52);
      seat(tag, tape, .36, .1, .006);
      const unit = new Group(); unit.add(tape, tag);
      root.add(hammer, pliers, unit);
      return { target: tag, items: [[hammer, [-2.95, .55, -1.9], [.2, .55, -.42], 0], [pliers, [-2.5, -1.75, -.7], [.1, -.25, -1.25], 2], [unit, [-1.1, .45, .2], [.04, .28, -.1], 1]] };
    });
  },
  realtors() {
    return tapScene('card-realtor', root => {
      const set = new Group(), R0 = .56;
      const ring = splitRing(R0), TURN = 1.05;
      ring.rotation.y = TURN; set.add(ring);
      const onRing = a => new Vector3(Math.cos(a) * R0, Math.sin(a) * R0, 0).applyAxisAngle(new Vector3(0, 1, 0), TURN);
      const k1 = houseKey(3.6, '#D2D4D8', ['KW1', '6 PIN'], 11), k2 = houseKey(3.25, '#C9A25C', ['SC1', '5 PIN'], 29);
      // Fanned out, as keys hang, so each hole and bow reads.
      k1.position.copy(onRing(-Math.PI / 2 + .42)); k1.rotation.set(.1, .18, -Math.PI / 2 + .52);
      k2.position.copy(onRing(-Math.PI / 2 - .42)); k2.rotation.set(-.1, -.14, -Math.PI / 2 - .5);
      const fob = realTag('Tag6Fob', 1.9);
      fob.position.copy(onRing(.1)).add(new Vector3(.82, -.62, 0)); fob.rotation.z = .1;
      set.add(k1, k2, fob);
      root.add(set);
      return { target: fob, items: [[set, [-2.15, 1.3, 0], [.05, .28, -.03], 0, .07]] };
    });
  },
  doctors() {
    return tapScene('card-doctor', root => {
      const board = prop('clipboard', 4.9, null, true);
      const sheet = paperSheet(2.95, 3.95, (x, W, H) => {
        say(x, 'Patient intake', W * .09, H * .1, `700 ${H * .036}px ${TW}`, INK, 'left');
        say(x, 'Harbour Family Practice', W * .09, H * .15, `400 ${H * .022}px ${TW}`, MUTED, 'left');
        formLines(x, W, H, .24);
      });
      sheet.position.set(0, -.3, .1);
      const tag = realTag('Tag1Sticker', .62);
      const unit = new Group(); unit.add(board, sheet); sheet.updateWorldMatrix(true, false); seat(tag, sheet, .82, .95); unit.add(tag);
      const scope = stethoscope(3);
      root.add(unit, scope);
      return { target: tag, items: [[unit, [-2.05, .25, -1.2], [.04, .3, .08], 0], [scope, [-1.95, -1.25, .75], [.02, .12, 1.2], 2, .04]] };
    });
  },
  sales() {
    return tapScene('card-broker', root => {
      const book = prop('binder_notebook', 4.4, ['binder_notebook_closed'], true);
      const pen = prop('stationery_supplies', 3.6, ['stationery_supplies_pen_fancy'], false);
      const card = litCard(2.45);
      book.rotation.z = Math.PI;
      const unit = new Group(); unit.add(book); book.updateWorldMatrix(true, true); seat(card, book, .2, .05, .01); card.rotateZ(-.08); unit.add(card);
      root.add(unit, pen);
      return { target: corner(card, 2.45), items: [[unit, [-2, .2, -.9], [-.1, .34, .1], 0], [pen, [-2.25, -1.7, .75], [.2, .2, .28], 2, .04]] };
    });
  },
  photographers() {
    return tapScene('card-photographer', root => {
      const cam = prop('Camera_01', 6);
      const tag = realTag('Tag2Brandcard', 1.55);
      root.add(cam, tag);
      return { target: corner(tag, 1.55), items: [[cam, [-1.95, -.55, -1.5], [.16, .3, -.1], 0, .05], [tag, [-1.35, 1.8, .3], [-.08, .3, .12], 2, .05]] };
    });
  },
  networking() {
    return tapScene('card', root => {
      const glass = wineGlass(4.5), card = litCard(2.3);
      root.add(glass, card);
      return { target: corner(card, 2.3), items: [[glass, [-3, .1, -.9], [.02, 0, .05], 0], [card, [-1.5, .85, .6], [-.1, .36, .1], 3, .05]] };
    });
  },
  // At a booth: a visitor's camera reads the Lock Screen, the lead comes up and the counts rise; the Wallet pass scans the same way.
  tradeshow() {
    const D = 14;
    return floating(D, 6.5, root => {
      const pass = walletPass(4.5, '#7B3FC4');
      const faces = { qr: 'live-qr', a: 'live-lead-a', b: 'live-lead-b', s: 'live-stats-b' };
      const lock = screenTex();
      const mine = phone(5.75, [lock]);
      mine.screen.show(0);
      const finder = screenTex((x, W, H) => {
        lockWall(x, W, H, 'teal'); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 0, W, H);
        const q = W * .6; box(x, W / 2 - q / 2 - 14, H * .46 - q / 2 - 14, q + 28, q + 28, 16, '#fff'); qr(x, W / 2 - q / 2, H * .46 - q / 2, q);
        cameraChrome(x, W, H);
      });
      const theirs = phone(4.3, [finder, shot('card')]);
      theirs.screen.show(0);
      root.add(pass, mine, theirs);
      const drift = drifter(D, [[pass, [-3.2, .25, -.8], [-.03, .34, .04], 0, .06], [mine, [-.5, -.05, .4], [-.05, .12, -.03], 1, .05]]);
      const REST2 = [2.8, -.45, 1.3], AT_LOCK = [.1, -.75, 2.4], AT_PASS = [-2.85, -.3, 2.4];
      let last = '';
      return t => {
        drift(t);
        const a = t / D * Math.PI * 2;
        // Lock Screen first, then over to the Wallet pass.
        const one = win(.5, 1.4, 3.1, 4.1, t), two = win(7.6, 8.8, 10.8, 12, t);
        const k = Math.max(one, two), target = t < 6 ? AT_LOCK : AT_PASS;
        theirs.position.set(lerp(REST2[0], target[0], k), lerp(REST2[1], target[1], k) + Math.sin(a) * .04, lerp(REST2[2], target[2], k));
        theirs.rotation.set(lerp(-.04, -.12, k), lerp(-.3, .04, k), lerp(.05, .08, k));
        const cardOpen = t < 6 ? ss(2.4, 3, t) * (1 - ss(7, 7.6, t)) : ss(9.7, 10.3, t) * (1 - ss(12.8, 13.5, t));
        theirs.screen.show(0, 1, cardOpen, 1);
        const key = t < 4.2 || t >= 13.3 ? 'qr' : t < 5.3 ? 'a' : t < 6.2 ? 'b' : 's';
        if (key !== last) { last = key; lock.paint((x, W, H) => lockGlass(x, W, H, images[faces[key]], 'teal')); }
      };
    });
  },
  // A speaker's closing slide: someone in the room scans it and has the card.
  keynote() {
    return floating(9, 5, root => {
      const slideCanvas = new OffscreenCanvas(1280, 800);
      const paintSlide = (x, W, H) => {
        const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#111520'); g.addColorStop(1, '#1B2436');
        x.fillStyle = g; x.fillRect(0, 0, W, H);
        wordmark(x, 90, 112, 62, '#fff', 'left');
        say(x, 'Thanks for listening', 90, 340, `600 76px ${TW}`, '#fff', 'left');
        say(x, 'Rin Nakashima, Meridian Systems', 90, 430, `400 38px ${TW}`, '#C2C8D0', 'left');
        say(x, 'Scan to save my card', 90, 490, `400 38px ${TW}`, '#C2C8D0', 'left');
        box(x, W - 480, H / 2 - 210, 420, 420, 26, '#fff');
        qr(x, W - 450, H / 2 - 180, 360);
      };
      paintSlide(Object.assign(slideCanvas.getContext('2d'), { textBaseline: 'middle' }), 1280, 800);
      const screen = tex(1280, 800, (x, W, H) => { x.textBaseline = 'middle'; paintSlide(x, W, H); });
      screen.flipY = false; screen.anisotropy = 16;
      const mac = laptop(6.9, screen);
      const ph = phone(4.15, [cameraView(slideCanvas), cameraView(slideCanvas, true), shot('card-engineer')]);
      root.add(mac, ph);
      const drift = drifter(9, [[mac, [-.5, .5, -1.8], [.1, .14, 0], 0, .05]]);
      return t => {
        drift(t);
        const a = t / 9 * Math.PI * 2, side = 1 - win(.4, 1.3, 3.4, 4.3, t);
        ph.position.set(lerp(1.15, 2.75, side), lerp(-.95, -.65, side) + Math.sin(a) * .04, lerp(2.5, 1.5, side));
        ph.rotation.set(lerp(.12, -.05, side), lerp(.05, -.3, side), lerp(-.03, .05, side));
        if (t < 2.45) ph.screen.show(0, 1, ss(1.6, 1.8, t));
        else if (t < 8.6) ph.screen.show(1, 2, ss(2.45, 3.05, t) * (1 - ss(8, 8.6, t)), 1);
        else ph.screen.show(1, 0, ss(8.6, 8.8, t));
      };
    });
  },
};
// The older feature scenes without their floor and label chips, so they sit on the page like the rest.
const OLD = { ...SCENES };
function unstaged(key, keep = () => true) {
  return () => {
    const st = OLD[key]();
    st.scene.traverse(o => { if (o.material?.isShadowMaterial) o.visible = false; });
    const run = st.update;
    st.update = t => { run(t); st.root.children.forEach(c => { if (c.show || !keep(c)) c.visible = false; }); };
    st.camera.position.z += .9;
    return st;
  };
}
Object.assign(PRO, {
  // Tap the tag, tap Save Contact, and the green check says it is done.
  share() {
    const D = 9;
    return floating(D, 6.2, root => {
      const card = litCard(3.5), spot = corner(card, 3.5);
      const ph = phone(5.05, [lockOf(undefined, 'violet'), shot('card')]);
      const press = pressFor(ph), front = frontOf(ph);
      const checkTex = tex(512, 512, (x, W, H) => {
        x.clearRect(0, 0, W, H);
        x.beginPath(); x.arc(W / 2, H / 2, W * .46, 0, 7); x.fillStyle = '#34C759'; x.fill();
        x.strokeStyle = '#fff'; x.lineWidth = W * .085; x.lineCap = x.lineJoin = 'round';
        x.beginPath(); x.moveTo(W * .29, H * .52); x.lineTo(W * .44, H * .67); x.lineTo(W * .72, H * .36); x.stroke();
      });
      const check = new Mesh(new PlaneGeometry(1.5, 1.5), new MeshBasicMaterial({ map: checkTex, transparent: true, depthWrite: false, toneMapped: false }));
      check.position.set(0, 0, front + .004); check.renderOrder = 4;
      const veil = new Mesh(faceGeo(2.3, 4.9, .3), new MeshBasicMaterial({ color: '#fff', transparent: true, depthWrite: false, toneMapped: false }));
      veil.position.z = front + .002; veil.renderOrder = 3;
      ph.add(veil, check);
      root.add(card, ph);
      const drift = drifter(D, [[card, [-1.95, .55, 0], [-.1, .42, .08], 0, .06]]);
      const tap = tapper(D, ph, REST, spot, root, .65, .8);
      const SAVE = 3.7;
      return t => {
        drift(t); tap(t);
        const focus = win(2.8, 3.3, 8.1, 8.7, t);
        ph.position.x = lerp(ph.position.x, 2.05, focus); ph.position.z += focus * .55;
        ph.rotation.y = lerp(ph.rotation.y, -.16, focus); ph.rotation.z = lerp(ph.rotation.z, .02, focus);
        press(t, [[SAVE, 0, -2.02]]);
        const on = pop(SAVE + .1, SAVE + .55, t) * (1 - ss(7.9, 8.3, t)), kick = hitDecay(t - SAVE - .2);
        check.visible = on > .01; check.scale.setScalar(Math.max(on, .001));
        veil.visible = on > .01; veil.material.opacity = Math.min(1, Math.max(on, 0)) * .78;
        ph.position.z += kick * .1; ph.rotation.y += kick * .05;
      };
    });
  },
  // The result of sharing: the pile of people you met grows while their leads fill the phone.
  leads() {
    const people = [['Samir Haddad', 'Haddad & Lowe'], ['Freya Lindholm', 'Northscape'], ['Idris Bello', 'Tanner & Kade'], ['Tom Alvarez', 'Fieldstone Design'], ['Yuki Sato', 'Halden Works'], ['Liam O\'Connell', 'Brightwater'], ['Nadia Costa', 'Costa & Reis'], ['Tobias Frank', 'Frank Studio'], ['Emma Appleseed', 'Pinecrest Group']];
    return floating(10, 7.4, root => {
      const W = 3.7, H = W * .58;
      const BRAND = ['#17324D', '#0F6B5C', '#B4472B', '#26282E', '#1A60CE', '#6D466B', '#8A6A1F', '#2E5E4E', '#7A1022'];
      const faces = people.map(([name, firm], i) => tex(1000, 580, (x, w, h) => {
        x.fillStyle = BRAND[i]; x.fillRect(0, 0, w, h);
        say(x, name, 80, 210, `700 78px ${TW}`, '#fff', 'left');
        say(x, firm, 80, 305, `400 48px ${TW}`, 'rgba(255,255,255,.82)', 'left');
        x.fillStyle = 'rgba(255,255,255,.8)'; x.fillRect(80, 385, 120, 8);
      }));
      const pile = new Group();
      const cards = faces.map((map, i) => {
        map.anisotropy = 16;
        const c = plate(W, H, { r: .07, d: .035, color: BRAND[i], rough: .6 });
        const f = new Mesh(faceGeo(W, H, .07), new MeshStandardMaterial({ map, roughness: .72, envMapIntensity: .22, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
        f.position.z = .0185; f.receiveShadow = true; c.add(f);
        c.body.receiveShadow = true;
        pile.add(c);
        return c;
      });
      const ph = phone(5.2, [shot('leads'), shot('lead-detail')]);
      // The card that becomes the lead: it leaves the pile and goes into the phone.
      const flyer = new Group();
      const flyBody = plate(W, H, { r: .07, d: .035, color: BRAND[8], rough: .6 });
      const flyFace = new Mesh(faceGeo(W, H, .07), new MeshStandardMaterial({ map: faces[8], roughness: .72, envMapIntensity: .22, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
      flyFace.position.z = .0185;
      flyer.add(flyBody, flyFace);
      flyBody.traverse(o => { o.castShadow = false; });
      root.add(pile, ph, flyer);
      const D = 10, PILE = [-1.75, -.5, -.2], PR = [-.62, .16, .16], PHONE = [2.35, 0, 1.3];
      const drift = drifter(D, [[pile, PILE, PR, 0, .05], [ph, PHONE, [-.05, -.28, .05], 1, .05]]);
      const SPOT = [[.03, .02, .1], [-.06, .05, -.09], [.05, -.04, .05], [-.03, -.03, -.14], [.07, .03, .13], [-.08, .01, -.05], [.02, .06, .08], [-.04, -.05, -.11], [.0, .0, .03]];
      // Each card is dealt onto the pile: it comes down from just above, from one side or the other, and settles flat.
      const FROM = [[-.42, .5], [.38, .56], [-.3, .6], [.44, .5], [-.46, .54], [.32, .6], [-.36, .5], [.42, .56], [-.28, .58]];
      const IN = i => .25 + i * .52, FLIGHT = .6, LIFT = 5.5, ARRIVE = 6.5, EXIT = 7.9, GAP = .14, LEG = .55;
      const settle = k => 1 - Math.pow(1 - k, 3);
      const worldPt = new Vector3(), flyPt = new Vector3();
      return t => {
        drift(t);
        // Each landing jolts the pile and it settles.
        let jolt = 0, turn = 0;
        cards.forEach((c, i) => { const d = t - IN(i) - FLIGHT * .7; if (d > 0 && d < 1) { const e = Math.exp(-d * 8) * Math.sin(d * 13); jolt += e * .025; turn += e * (i % 2 ? .005 : -.005); } });
        pile.position.y -= jolt;
        pile.rotation.z += turn;
        // Then the rest follow: card after card leaves the pile and goes into the phone.
        worldPt.set(ph.position.x, ph.position.y + .45, ph.position.z + .85);
        root.localToWorld(worldPt); pile.worldToLocal(worldPt);
        cards.forEach((c, i) => {
          const a = IN(i), k = clamp((t - a) / FLIGHT), e = settle(k);
          const leave = i === 8 ? 0 : clamp((t - EXIT - (7 - i) * GAP) / LEG), l = leave * leave * (3 - 2 * leave);
          c.visible = k > 0 && leave < 1 && !(i === 8 && t >= LIFT);
          if (!c.visible) return;
          const [x, y, r] = SPOT[i], [fx, fy] = FROM[i], side = fx < 0 ? -1 : 1;
          const hop = Math.sin(Math.PI * l);
          c.position.set(lerp(x + fx * (1 - e), worldPt.x, l), lerp(y + fy * (1 - e), worldPt.y, l), lerp(i * .05 + (1 - e) * 1.05, worldPt.z, l) + hop * .4);
          c.rotation.set(-(1 - e) * .26, side * (1 - e) * .14 + hop * .12, r + side * (1 - e) * .16 + l * -r);
          c.scale.setScalar(lerp(1, .2, l));
          const o = ss(0, .3, k) * (1 - ss(.86, 1, leave));
          c.traverse(m => { if (m.isMesh) { m.material.transparent = o < .999; m.material.opacity = o; } });
        });
        // The top card goes into the phone.
        const fly = clamp((t - LIFT) / (ARRIVE - LIFT)), f = fly * fly * (3 - 2 * fly);
        flyer.visible = t >= LIFT && fly < 1;
        if (flyer.visible) {
          const lift = Math.sin(Math.PI * f);
          flyPt.set(SPOT[8][0], SPOT[8][1], 8 * .05);
          pile.localToWorld(flyPt); root.worldToLocal(flyPt);
          flyer.position.set(lerp(flyPt.x, ph.position.x, f), lerp(flyPt.y, ph.position.y + .45, f) + lift * .75, lerp(flyPt.z, ph.position.z + .85, f) + lift * .3);
          flyer.rotation.set(lerp(PR[0], -.05, f), lerp(PR[1], -.28, f), lerp(PR[2] + SPOT[8][2], .05, f) + lift * -.25);
          flyer.scale.setScalar(lerp(1, .2, f));
          const o = 1 - ss(.82, 1, fly);
          flyer.traverse(m => { if (m.isMesh) { m.material.transparent = o < .999; m.material.opacity = o; } });
        }
        // The phone takes it in with a small kick, and the lead opens.
        const hit = at => { const d = t - at; return d > 0 && d < 1 ? Math.exp(-d * 6) * Math.sin(d * 18) : 0; };
        let kick = hit(ARRIVE - .1);
        for (let i = 0; i < 8; i++) kick += hit(EXIT + i * GAP + LEG - .05) * .6;
        ph.position.x += kick * .05; ph.rotation.y += kick * .05; ph.position.z += kick * .08;
        ph.screen.show(0, 1, ss(ARRIVE - .1, ARRIVE + .45, t) * (1 - ss(9.3, 9.85, t)), 1);
      };
    });
  },
  // One follow-up, start to finish: the letter goes in, the envelope flies to the phone, the notification lands, the email opens.
  followup() {
    const D = 10;
    return floating(D, .5, root => {
      const env = envelope(3.5);
      const ph = phone(5.2, [screenTex((x, W, H) => lockGlass(x, W, H, undefined, 'forest')), screenTex(lockBanner), screenTex(mailScreen)]);
      root.add(env, ph);
      const HOME = [-1.7, -.85, .3], HR = [-.1, .28, -.05], SEND = .9, ARRIVE = SEND + 2.3, BACK = 8.6;
      return t => {
        const w = t / D * Math.PI * 2, d = t - SEND, again = t > BACK + .1;
        // The phone takes the stage while the email is open, then makes room again.
        const focus = win(4, 4.9, BACK - .1, BACK + .7, t), kick = hitDecay(t - ARRIVE);
        const px = lerp(2.35, .1, focus);
        ph.position.set(px, Math.sin(w * 2 + 1) * .05, 1.2 + kick * .12 + focus * .5);
        ph.rotation.set(-.05, lerp(-.28, -.06, focus) + kick * .05, lerp(.05, .01, focus));
        const inn = again ? 0 : ss(0, .9, d), shut = again ? 0 : ss(.85, 1.3, d), go = again ? 0 : ss(1.45, 2.3, d);
        env.visible = t < ARRIVE || again;
        const lift = Math.sin(Math.PI * go);
        env.position.set(lerp(HOME[0], 2.35, go), lerp(HOME[1], .5, go) + lift * .8 + Math.sin(w * 2) * .05, lerp(HOME[2], 2.1, go));
        env.rotation.set(HR[0], HR[1] * (1 - go), HR[2] + lift * -.3);
        env.scale.setScalar(Math.max(again ? ss(BACK + .1, BACK + .75, t) : 1 - go * .8, .001));
        const open = 1 - shut;
        env.hinge.rotation.x = -Math.PI * 1.1 * open;
        // Open, the flap stands behind the letter; closed, it folds over the front.
        env.hinge.position.z = lerp(.066, -.02, open);
        // The letter folds as it goes in, so it fits the envelope.
        env.letter.position.set(0, lerp(env.LH * .56, 0, inn), .03);
        env.letter.scale.y = lerp(1, .56, inn);
        env.letter.visible = shut < .6;
        const fade = go > .85 ? 1 - ss(.85, 1, go) : 1;
        env.traverse(o => { if (o.isMesh) { o.material.transparent = fade < .999; o.material.opacity = fade; } });
        // Lock Screen, notification, email, and back to a quiet Lock Screen for the next one.
        if (t < ARRIVE + .9) ph.screen.show(0, 1, ss(ARRIVE - .02, ARRIVE + .2, t));
        else if (t < BACK) ph.screen.show(1, 2, ss(ARRIVE + .9, ARRIVE + 1.5, t), 1);
        else ph.screen.show(2, 0, ss(BACK, BACK + .6, t));
      };
    });
  },
  // One person, five cards: they turn on a carousel, and the one in front opens on the phone.
  cards() {
    const NAMES = ['ten-00', 'ten-01', 'ten-03', 'ten-02', 'ten-05'], N = NAMES.length, S = 2.6, D = N * S;
    return floating(D, 1.9, root => {
      // Clean cards drawn from the real portrait and logos, each with its brand's coloured border.
      const W = 2.05, H = W * .96, LOOK = [['logo-nicolo', '#128CF0'], ['logo-consultant', '#1F4E79'], ['logo-coach', '#D8572A'], ['logo-broker', '#2E5E4E'], ['logo-photographer', '#6D466B']];
      const tiles = LOOK.map(([logo, colour]) => {
        const t = tex(640, 614, (x, w, h) => {
          x.fillStyle = '#fff'; x.fillRect(0, 0, w, h);
          box(x, 10, 10, w - 20, h - 20, 56, null, colour, 7);
          const im = images['hero-nicolo'], k = im.width / 1224, r = 150, cy = 225;
          x.save(); x.beginPath(); x.arc(w / 2, cy, r, 0, 7); x.clip(); x.drawImage(im, 312 * k, 96 * k, 600 * k, 600 * k, w / 2 - r, cy - r, r * 2, r * 2); x.restore();
          const l = images[logo], lw = Math.min(330, l.width / l.height * 110), lh = lw * l.height / l.width; x.drawImage(l, w / 2 - lw / 2, 480 - lh / 2, lw, lh);
        });
        t.anisotropy = 16;
        const p = plate(W, H, { r: .19, d: .05, color: '#fff', rough: .5 });
        const f = new Mesh(faceGeo(W, H, .19), new MeshBasicMaterial({ map: t, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
        f.position.z = .028; p.add(f); root.add(p);
        return p;
      });
      const ph = phone(5.05, NAMES.map(shot));
      root.add(ph);
      const C = [-1.75, .05, -.7], RX = 1.75, RZ = 1.25;
      return t => {
        const w = t / D * Math.PI * 2, i = Math.floor(t / S) % N, p = t % S, turn = ss(.25, 1.25, p), spin = (i + turn) * Math.PI * 2 / N;
        const arrive = hitDecay(p - 1.25);
        tiles.forEach((c, k) => {
          const a = k * Math.PI * 2 / N - spin, depth = Math.cos(a), front = Math.max(0, depth) ** 6;
          c.position.set(C[0] + Math.sin(a) * RX, C[1] - depth * .55 + Math.sin(w * 2 + k) * .03 + front * .15, C[2] + depth * RZ);
          c.rotation.set(-.07, Math.sin(a) * .55, Math.sin(a) * -.05);
          c.scale.setScalar(.8 + (depth + 1) * .14);
        });
        ph.position.set(2.45 + arrive * .04, -.05 + Math.sin(w * 2 + 1) * .05, 1.2);
        ph.rotation.set(-.05, -.26 + arrive * .05, .04);
        ph.screen.show(i, (i + 1) % N, ss(.85, 1.45, p), 1);
      };
    });
  },
  // The app's four stat tiles, loose: each period they flip over in turn to their new numbers, with the chart on the phone.
  insights() {
    const P = ['7d', '30d', '90d', '12m'], STEP = 3, D = P.length * STEP;
    const CELL = [[34, 27], [357, 27], [34, 343], [357, 343]], CW = 309, CH = 300;
    return floating(D, 2 * STEP + 1.7, root => {
      const app = phone(5.2, P.map(p => shot(`an-${p}`)));
      const SIZE = 1.4, H = SIZE * CH / CW;
      const faces = CELL.map(([cx, cy]) => P.map(p => { const t = tex(CW * 2, CH * 2, (x, w, h) => { x.drawImage(images[`stats-${p}`], cx, cy, CW, CH, 0, 0, w, h); }); t.anisotropy = 16; return t; }));
      const tiles = CELL.map((_, i) => { const c = plate(SIZE, H, { r: SIZE * .15, d: .09, color: '#F0F0F2', map: faces[i][0], rough: .5 }); root.add(c); return c; });
      const pills = P.map(p => { const c = plate(4.1, 4.1 * shape(`period-${p}`), { r: .17, map: tile(`period-${p}`), d: .09 }); root.add(c); return c; });
      root.add(app);
      const HOME = [[.55, 1.42, .55], [2.2, 1.5, .3], [.6, -.2, .35], [2.25, -.12, .6]];
      // The chart, in the app's colours: views as a filled line, saves and leads under it. Each period it draws itself again.
      const LEN = 30, wave = (seed, base, amp, p) => Array.from({ length: LEN }, (_, i) => base + amp * (.55 * Math.sin(i * .42 + seed * 1.7 + p) + .3 * Math.sin(i * .17 + seed) + .22 * Math.sin(i * .93 + p * 2)) + i / LEN * amp * .5);
      const DATA = P.map((_, p) => ({ views: wave(1, .56, .24, p * 1.3), saves: wave(3, .24, .09, p * 1.1), leads: wave(5, .11, .05, p * 1.6) }));
      const CHW = 3.4, CHH = 1.28;
      const chartTex = tex(816, 308);
      const chart = plate(CHW, CHH, { r: .13, d: .08, color: '#F0F0F2', map: chartTex, rough: .5 });
      root.add(chart);
      let chartKey = '';
      const drawChart = (a, k) => {
        const key = `${a},${Math.round(k * 60)}`;
        if (key === chartKey) return;
        chartKey = key;
        chartTex.paint((x, W, H) => {
          x.fillStyle = '#F0F0F2'; x.fillRect(0, 0, W, H);
          [['Views', '#128CF0'], ['Saves', '#34C759'], ['Leads', '#F2994A']].forEach(([n, c], i) => { const lx = 34 + i * 128; x.beginPath(); x.arc(lx, 34, 8, 0, 7); x.fillStyle = c; x.fill(); say(x, n, lx + 16, 35, `400 24px ${TW}`, '#686F76', 'left'); });
          x.strokeStyle = '#DEDFE3'; x.lineWidth = 2;
          [.36, .62, .88].forEach(v => { x.beginPath(); x.moveTo(24, H * v); x.lineTo(W - 24, H * v); x.stroke(); });
          const px = i => 24 + i / (LEN - 1) * (W - 48), py = v => H * .94 - v * H * .76;
          const upto = k * (LEN - 1);
          const trace = vals => { x.beginPath(); for (let i = 0; i <= Math.floor(upto); i++) { i ? x.lineTo(px(i), py(vals[i])) : x.moveTo(px(i), py(vals[i])); } const j = Math.floor(upto), f = upto - j; if (j < LEN - 1) x.lineTo(lerp(px(j), px(j + 1), f), py(lerp(vals[j], vals[j + 1], f))); };
          const { views, saves, leads } = DATA[a];
          trace(views);
          x.save(); x.lineTo(px(upto), H * .94); x.lineTo(px(0), H * .94); x.closePath();
          const g = x.createLinearGradient(0, H * .2, 0, H * .94); g.addColorStop(0, 'rgba(18,140,240,.38)'); g.addColorStop(1, 'rgba(18,140,240,.02)'); x.fillStyle = g; x.fill(); x.restore();
          x.lineJoin = x.lineCap = 'round';
          [[views, '#128CF0', 5], [saves, '#34C759', 4], [leads, '#F2994A', 4]].forEach(([v, c, lw]) => { trace(v); x.strokeStyle = c; x.lineWidth = lw; x.stroke(); });
          if (k < 1) { const j = Math.floor(upto), f = upto - j, v = lerp(views[j], views[Math.min(j + 1, LEN - 1)], f); x.beginPath(); x.arc(px(upto), py(v), 10, 0, 7); x.fillStyle = '#128CF0'; x.fill(); x.lineWidth = 4; x.strokeStyle = '#fff'; x.stroke(); }
        });
      };
      const FLIP = .62, LAG = .13;
      return t => {
        const w = t / D * Math.PI * 2;
        tiles.forEach((c, i) => {
          // Each tile runs a little behind the one before it.
          const ti = (t - i * LAG + D) % D, a = Math.floor(ti / STEP) % P.length, p = ti % STEP, k = clamp(p / FLIP);
          const prev = (a + P.length - 1) % P.length, half = k < .5;
          c.face.material.map = faces[i][half ? prev : a];
          const flip = half ? ss(0, .5, k) * Math.PI / 2 : -(1 - ss(.5, 1, k)) * Math.PI / 2;
          const hop = Math.sin(Math.PI * k);
          const [x, y, z] = HOME[i], ph = i * 1.7;
          // Flipping tiles come forward without rising, and the gaps leave room for the swing, so no two ever touch.
          c.position.set(x + Math.cos(w * 2 + ph) * .025, y + Math.sin(w * 2 + ph) * .03, z + hop * .3);
          c.rotation.set(-.05 + Math.sin(w + ph) * .03, -.16 + flip + Math.cos(w * 2 + ph) * .035, Math.sin(w + ph) * .018);
        });
        const a = Math.floor(t / STEP) % P.length, p = t % STEP, prev = (a + P.length - 1) % P.length;
        pills.forEach((c, i) => {
          c.visible = i === a;
          c.position.set(1.4, 2.82 + Math.sin(w * 2) * .025, .3);
          c.rotation.set(-.03, -.1, 0);
          c.scale.setScalar(i === a ? lerp(.95, 1, pop(0, .35, p)) : 1);
        });
        drawChart(a, ss(.1, 1.5, p));
        chart.position.set(1.42, -1.96 + Math.sin(w * 2 + 2) * .03, .4);
        chart.rotation.set(-.04, -.14 + Math.sin(w) * .02, 0);
        const kick = p < 1 ? Math.exp(-p * 5) * Math.sin(p * 14) : 0;
        app.position.set(-2.72, -.1 + Math.sin(w * 2 + 1) * .05, 0);
        app.rotation.set(-.03, .26 + kick * .05 + Math.sin(w) * .025, -.012 + kick * .012);
        app.screen.show(prev, a, ss(0, .4, p));
      };
    });
  },
  // The result of branding: one card, right on a light phone and a dark one at the same moment.
  appearance() {
    const N = 5, STEP = 2.6;
    return floating(N * STEP, 1.2, root => {
      const light = [], dark = [];
      // Same five brands: white in light mode, black in dark, the colour in the borders.
      ['ten-00', 'ten-01', 'ten-03', 'ten-02', 'ten-05'].forEach((n, i) => { light.push(shot(n)); dark.push(shot(`look-${i + 1}-dark`)); });
      const a = phone(5.15, light), b = phone(5.15, dark);
      root.add(a, b);
      const drift = drifter(N * STEP, [[a, [-1.65, .05, .2], [-.04, .26, -.05], 0, .05], [b, [1.65, -.05, .2], [-.04, -.26, .05], 2, .05]]);
      return t => {
        drift(t);
        const i = Math.floor(t / STEP) % N, next = (i + 1) % N, k = ss(STEP - .55, STEP, t % STEP);
        a.screen.show(i, next, k, 1); b.screen.show(i, next, k, 1);
      };
    });
  },
  // The lock stays in view: the PIN fills in, the shackle opens, then snaps shut again.
  privacy() {
    const D = 8;
    return floating(D, 7, root => {
      const app = phone(5.2, [shot('settings')]);
      app.screen.show(0);
      root.add(app);
      const padlock = new Group();
      const BW = 1.26, BH = 1.02, BD = .4, BEV = .07;
      const bodyGeo = new ExtrudeGeometry(outline(BW - BEV * 2, BH - BEV * 2, .17), { depth: BD - BEV * 2, bevelEnabled: true, bevelSize: BEV, bevelThickness: BEV, bevelSegments: 6, curveSegments: 16 });
      bodyGeo.translate(0, 0, -BD / 2 + BEV);
      const body = new Mesh(bodyGeo, new MeshStandardMaterial({ color: '#2B2D33', roughness: .36, metalness: .35 }));
      body.castShadow = true;
      const keyShape = new Shape();
      keyShape.absarc(0, .08, .125, -Math.PI * .22, Math.PI * 1.22);
      keyShape.lineTo(-.075, -.22); keyShape.quadraticCurveTo(-.075, -.26, -.035, -.26);
      keyShape.lineTo(.035, -.26); keyShape.quadraticCurveTo(.075, -.26, .075, -.22);
      keyShape.closePath();
      const keyhole = new Mesh(new ShapeGeometry(keyShape, 24), new MeshBasicMaterial({ color: YELLOW, toneMapped: false }));
      keyhole.position.z = BD / 2 + .002;
      const R0 = .315, LEG = .62, path = [[-R0, -LEG], [-R0, -LEG * .5], [-R0, 0]];
      for (let a = 1; a < 12; a++) { const k = Math.PI * (1 - a / 12); path.push([Math.cos(k) * R0, Math.sin(k) * R0]); }
      path.push([R0, 0], [R0, -LEG * .5], [R0, -LEG]);
      const shackleMesh = new Mesh(new TubeGeometry(new CatmullRomCurve3(path.map(([a, b]) => new Vector3(a, b, 0))), 96, .088, 20), new MeshStandardMaterial({ color: '#C4C9D0', metalness: 1, roughness: .26, envMapIntensity: 1.3 }));
      shackleMesh.castShadow = true;
      shackleMesh.position.x = -R0;
      const shackle = new Group();
      shackle.add(shackleMesh);
      padlock.add(shackle, body, keyhole);
      padlock.scale.setScalar(1.75);
      root.add(padlock);
      // The four digits of the PIN.
      const dots = [0, 1, 2, 3].map(i => {
        const m = new Mesh(new THREE.SphereGeometry(.13, 32, 20), new MeshStandardMaterial({ color: '#128CF0', roughness: .25, metalness: .1, envMapIntensity: 1.2 }));
        m.position.set(1.4 + (i - 1.5) * .55, -1.95, .6);
        root.add(m);
        return m;
      });
      return t => {
        const w = t / D * Math.PI * 2;
        app.position.set(-1.85, -.1 + Math.sin(w + 1) * .05, -.3);
        app.rotation.set(-.04, .3 + Math.sin(w) * .03, -.03);
        dots.forEach((m, i) => { const a = .35 + i * .34, k = pop(a, a + .28, t) * (1 - ss(5.55, 5.9, t)); m.visible = k > .01; m.scale.setScalar(Math.max(k, .001)); m.position.y = -1.95 + Math.sin(w * 2 + i) * .03; });
        const open = ss(1.85, 2.5, t) * (1 - ss(5, 5.3, t));
        shackle.position.set(R0, .86 + ss(0, .55, open) * .3, 0);
        shackle.rotation.y = -ss(.45, 1, open) * Math.PI * .72;
        // It jumps a little when it opens, and snaps when it shuts.
        const d1 = t - 2.1, d2 = t - 5.3;
        const jolt = (d1 > 0 && d1 < 1 ? Math.exp(-d1 * 5) * Math.sin(d1 * 16) * .05 : 0) + (d2 > 0 && d2 < 1 ? Math.exp(-d2 * 6) * Math.sin(d2 * 22) * .09 : 0);
        padlock.position.set(1.4, -.3 + Math.sin(w * 2) * .06 + jolt, .3);
        padlock.rotation.set(-.04 + jolt * .6, -.28 + Math.sin(w) * .16, jolt * .5);
      };
    });
  },
  // Every lead lands in one inbox: the laptop alone, rows arriving and moving through the statuses.
  team() {
    const st = OLD.team();
    st.scene.traverse(o => { if (o.material?.isShadowMaterial) o.visible = false; });
    const run = st.update, kids = st.root.children, mac = kids[0];
    // The laptop, the three people and the leads flying in; not the tags, rings or labels.
    const members = [kids[1], kids[4], kids[7]], flying = kids.slice(11, 15), keep = new Set([mac, ...members, ...flying]);
    const WHEN = [2.9, 4.1, 5.3, 6.5], WHO = [0, 1, 2, 0], D = st.dur;
    mac.position.y = -1.2;
    members.forEach(m => m.scale.setScalar(1.32));
    const home = members.map((m, i) => [(i - 1) * 2.75, 2.45 - Math.abs(i - 1) * .22, .5]);
    st.update = t => {
      run(t);
      kids.forEach(c => { if (!keep.has(c)) c.visible = false; });
      const w = t / D * Math.PI * 2;
      members.forEach((m, i) => {
        let hop = 0;
        WHEN.forEach((a, k) => { if (WHO[k] === i) { const d = t - a + .2; if (d > 0 && d < 1) hop += Math.exp(-d * 4) * Math.sin(d * 9); } });
        const [x, y, z] = home[i];
        m.position.set(x + Math.cos(w * 2 + i * 2) * .04, y + Math.sin(w * 3 + i * 2) * .06 + Math.max(hop, -.2) * .24, z + Math.max(hop, 0) * .5);
        m.rotation.z += Math.sin(w * 2 + i * 2) * .025 + hop * .03;
      });
      mac.rotation.set(.02 + Math.sin(w * 2) * .012, Math.sin(w) * .05, 0);
      mac.position.y = -1.2 + Math.sin(w * 2 + 1) * .03;
    };
    const camera = new PerspectiveCamera(22, 1.25, 8, 36);
    camera.position.set(0, -.15, 24); camera.lookAt(0, -.15, 0);
    st.camera = camera;
    return st;
  },
});
// Each profession has its own moment; only the tap and the card it opens are shared.
const kickAt = (t, a) => hitDecay(t - a);
const TAPE_LABEL = [.62, .12], TAPE_MOUTH = [1.42, -.74];
const opens = (ph, t, a, D) => ph.screen.show(0, 1, ss(a, a + .6, t) * (1 - ss(D - .8, D - .2, t)), 1);
Object.assign(PRO, {
  // The keys are handed over: the set travels to the phone, then swings on its ring all the way back.
  realtors() {
    const D = 10;
    return floating(D, 7.4, root => {
      const set = new Group(), R0 = .56, TURN = 1.05;
      const ring = splitRing(R0); ring.rotation.y = TURN; set.add(ring);
      const onRing = a => new Vector3(Math.cos(a) * R0, Math.sin(a) * R0, 0).applyAxisAngle(new Vector3(0, 1, 0), TURN);
      const k1 = houseKey(3.6, '#D2D4D8', ['KW1', '6 PIN'], 11), k2 = houseKey(3.25, '#C9A25C', ['SC1', '5 PIN'], 29);
      k1.position.copy(onRing(-Math.PI / 2 + .42)); k1.rotation.set(.1, .18, -Math.PI / 2 + .52);
      k2.position.copy(onRing(-Math.PI / 2 - .42)); k2.rotation.set(-.1, -.14, -Math.PI / 2 - .5);
      const fob = realTag('Tag6Fob', 1.9);
      fob.position.copy(onRing(.1)).add(new Vector3(.82, -.62, 0)); fob.rotation.z = .1;
      set.add(k1, k2, fob);
      const ph = phone(5.05, [lockOf(undefined, 'sunset'), shot('card-realtor')]);
      root.add(set, ph);
      const travel = x => win(1, 1.85, 2.5, 3.3, x);
      return t => {
        const w = t / D * Math.PI * 2, go = travel(t);
        const kick = kickAt(t, 1.8);
        ph.position.set(2.3 + kick * .05, -.1 + Math.sin(w + 1) * .05, .3);
        ph.rotation.set(-.06, -.3 + kick * .05, .06);
        set.position.set(lerp(-2.2, -.55, go), lerp(1.35, 1.75, go) + Math.sin(w * 2) * .05, lerp(.1, 1.2, go));
        // It lags behind the hand on the way, and swings long after it stops.
        const lag = (travel(t + .05) - travel(t - .05)) * -1.4, d = t - 3.3;
        const swing = d > 0 ? Math.exp(-d * .62) * Math.sin(d * 3.1) * .42 : 0;
        set.rotation.set(.05, .28, lag + swing + kick * .12 + Math.sin(w * 2) * .03);
        opens(ph, t, 1.9, D);
      };
    });
  },
  // The intake form fills itself in, and the patient's phone comes over from the other side.
  doctors() {
    const D = 10;
    return floating(D, 7.4, root => {
      const board = prop('clipboard', 4.9, null, true);
      const paint = n => (x, W, H) => {
        x.fillStyle = '#F6F5F1'; x.fillRect(0, 0, W, H);
        say(x, 'Patient intake', W * .09, H * .1, `700 ${H * .036}px ${TW}`, INK, 'left');
        say(x, 'Harbour Family Practice', W * .09, H * .15, `400 ${H * .022}px ${TW}`, MUTED, 'left');
        formLines(x, W, H, .24);
        // Answers written on the lines, one by one.
        x.strokeStyle = '#1A4FA3'; x.lineWidth = H * .0035; x.lineCap = 'round';
        for (let i = 0; i < n; i++) {
          const y = H * (.24 + i * .112) - H * .012, L = W * (.5 + (i % 3) * .1);
          x.beginPath(); x.moveTo(W * .1, y);
          for (let a = 0; a < 16; a++) x.lineTo(W * .1 + L * a / 15, y + Math.sin(a * 2.1 + i) * H * .006);
          x.stroke();
        }
      };
      const sheet = paperSheet(2.95, 3.95, paint(0));
      sheet.position.set(0, -.3, .1);
      const tag = realTag('Tag1Sticker', .62);
      const unit = new Group(); unit.add(board, sheet); sheet.updateWorldMatrix(true, false); seat(tag, sheet, -.85, .95); unit.add(tag);
      const scope = stethoscope(3);
      const ph = phone(5.05, [lockOf(undefined, 'teal'), shot('card-doctor')]);
      root.add(unit, scope, ph);
      const hit = new Vector3();
      let last = -1;
      return t => {
        const w = t / D * Math.PI * 2, go = win(3.1, 3.95, 4.5, 5.3, t);
        const nudge = kickAt(t, 3.9);
        unit.position.set(1.55 - nudge * .06, .3 + Math.sin(w) * .05, -1.3);
        unit.rotation.set(.04, -.3 - nudge * .05, -.08);
        // The tubing sways on its own.
        scope.position.set(2.05, -1.35 + Math.sin(w * 2) * .04, .85);
        scope.rotation.set(.02, -.12, -1.2 + Math.sin(w * 2 + 1) * .09);
        const n = t > 8.9 ? 0 : [.5, 1, 1.5, 2, 2.5].filter(a => t > a).length;
        if (n !== last) { last = n; sheet.material.map.paint(paint(n)); }
        tag.getWorldPosition(hit); root.worldToLocal(hit);
        const TI = -.9, touch = [hit.x + Math.sin(TI) * 2.28, hit.y - Math.cos(TI) * 2.28];
        ph.position.set(lerp(-2.4, touch[0], go), lerp(-.05, touch[1], go) + Math.sin(w + 2) * .05 * (1 - go), 1.75);
        ph.rotation.set(-.05, lerp(.32, .1, go), lerp(-.06, TI, go));
        opens(ph, t, 4.05, D);
      };
    });
  },
  // The card is flicked across the table, spinning, and lands back with a bump; the pen signs.
  sales() {
    const D = 10;
    return floating(D, 7.2, root => {
      const book = prop('binder_notebook', 4.4, ['binder_notebook_closed'], true);
      book.rotation.z = Math.PI;
      const pen = prop('stationery_supplies', 3.6, ['stationery_supplies_pen_fancy'], false);
      const card = litCard(2.45);
      const ph = phone(5.05, [lockOf(undefined, 'gold'), shot('card-broker')]);
      root.add(book, pen, card, ph);
      const BOOK = [-2.05, .1, -1.3], HOME = [-1.9, .15, -.95];
      return t => {
        const w = t / D * Math.PI * 2;
        const out = ss(.9, 1.65, t), back = ss(2.5, 3.3, t), go = out * (1 - back);
        const land = kickAt(t, 3.3), arrive = kickAt(t, 1.65);
        book.position.set(BOOK[0], BOOK[1] - land * .07 + Math.sin(w) * .04, BOOK[2]);
        book.rotation.set(-.1 + land * .05, .34, Math.PI + .1 + land * .02);
        const lift = Math.sin(Math.PI * (out < 1 ? out : back));
        card.position.set(lerp(HOME[0], -.2, go), lerp(HOME[1], 1.55, go) + lift * .5 + Math.sin(w) * .04, lerp(HOME[2], 1.75, go) + lift * .35);
        // Two full turns each way, as a flicked card does.
        card.rotation.set(lerp(-.1, -.05, go), lerp(.34, -.1, go) + (out + back) * Math.PI * 2, lerp(.02, .1, go));
        ph.position.set(2.3 + arrive * .06, -.1 + Math.sin(w + 1) * .05, .3);
        ph.rotation.set(-.06, -.3 + arrive * .06, .06);
        // The pen signs: small quick strokes along a line on the notebook.
        const write = win(4, 4.3, 7, 7.3, t);
        pen.position.set(-2.55 + write * (((t - 4) * .28) % .9) * 1, -1.75 + write * Math.sin(t * 13) * .05, -.3 + write * .1);
        pen.rotation.set(.2 + write * Math.sin(t * 9) * .05, .2, .3 + write * Math.sin(t * 13) * .06);
        opens(ph, t, 1.75, D);
      };
    });
  },
  // A toast: the glass lifts and tips, and the card spins up between sips while the phone leans in.
  networking() {
    const D = 10;
    return floating(D, 7.4, root => {
      const glass = wineGlass(4.5), card = litCard(2.3);
      const spot = corner(card, 2.3);
      const ph = phone(5.05, [lockOf(undefined, 'wine'), shot('card')]);
      root.add(glass, card, ph);
      const hit = new Vector3();
      return t => {
        const w = t / D * Math.PI * 2;
        const toast = win(.4, 1.05, 1.5, 2.1, t), clink = kickAt(t, 1.05);
        glass.position.set(-3.1 + toast * .3, .1 + toast * .3 + Math.sin(w * 2) * .05, -.9);
        glass.rotation.set(.02, 0, .05 - toast * .24 + clink * .07 + Math.sin(w * 3) * .025);
        const spin = ss(1.9, 3, t) + ss(8.3, 9.3, t);
        card.position.set(-1.45, .85 + Math.sin(w * 2 + 1) * .07, .6);
        card.rotation.set(-.1, .36 + spin * Math.PI * 2, .1 + Math.sin(w * 2) * .04);
        spot.getWorldPosition(hit); root.worldToLocal(hit);
        // Here the phone only leans in, it barely tips.
        const go = win(3.1, 3.8, 4.4, 5.1, t), TI = .42, kick = kickAt(t, 3.8);
        ph.position.set(lerp(2.4, hit.x + Math.sin(TI) * 2.28, go) + kick * .03, lerp(-.1, hit.y - Math.cos(TI) * 2.28, go) + Math.sin(w + 1) * .05 * (1 - go), 1.65);
        ph.rotation.set(-.05, lerp(-.3, -.12, go), lerp(.06, TI, go));
        opens(ph, t, 3.95, D);
      };
    });
  },
  // On the job: the tape's blade pulls out and snaps back, the tools jump, then the phone lies across to the label.
  trades() {
    const D = 10;
    return floating(D, 7.8, root => {
      const hammer = prop('cross_pein_hammer', 4.3), pliers = prop('pliers', 2.7);
      const tape = prop('measuring_tape_01', 2.9, null, true);
      const tag = labelTag(.92, .46);
      seat(tag, tape, TAPE_LABEL[0], TAPE_LABEL[1], .006);
      const unit = new Group(); unit.add(tape, tag);
      // The blade: a yellow steel rule with its marks, and the hook at its end.
      const TOTAL = 3, marks = tex(1536, 96, (x, W, H) => {
        x.fillStyle = '#F2C230'; x.fillRect(0, 0, W, H);
        x.fillStyle = '#17181C';
        for (let i = 0; i <= 60; i++) { const big = i % 10 === 0, mid = i % 5 === 0; x.fillRect(i * W / 60, 0, big ? 5 : 3, big ? H * .62 : mid ? H * .46 : H * .28); if (big && i) say(x, String(i / 10 * 10), i * W / 60 + 10, H * .72, `700 30px ${TW}`, '#17181C', 'left'); }
      });
      marks.anisotropy = 16;
      marks.wrapS = THREE.ClampToEdgeWrapping;
      const bladeGeo = new PlaneGeometry(1, .2); bladeGeo.translate(.5, 0, 0);
      const blade = new Mesh(bladeGeo, new MeshStandardMaterial({ map: marks, metalness: .45, roughness: .36, envMapIntensity: 1.1, side: DoubleSide }));
      blade.castShadow = true;
      const hook = new Mesh(new THREE.BoxGeometry(.05, .26, .1), new MeshStandardMaterial({ color: '#8C9097', metalness: 1, roughness: .35 }));
      hook.castShadow = true;
      const bladeRoot = new Group(); bladeRoot.position.set(TAPE_MOUTH[0], TAPE_MOUTH[1], 0); bladeRoot.add(blade, hook);
      unit.add(bladeRoot);
      const ph = phone(5.05, [lockOf(undefined, 'ember'), shot('card-trades')]);
      root.add(hammer, pliers, unit, ph);
      const hit = new Vector3();
      return t => {
        const w = t / D * Math.PI * 2;
        // Drawn out by hand in two pulls, then let go: it snaps back and everything jumps.
        const pull = ss(.5, 1.05, t) * .55 + ss(1.3, 1.8, t) * .45, snap = ss(2.6, 2.86, t);
        const len = .02 + pull * (1 - snap) * 1.3 + (1 - snap) * 0 + Math.max(0, hitDecay(t - 2.86)) * .02;
        blade.scale.x = len;
        marks.repeat.x = len / TOTAL; marks.offset.x = 0;
        hook.position.x = len;
        const jolt = hitDecay(t - 2.86);
        unit.position.set(-1.5 - jolt * .1, -.55 + Math.abs(jolt) * .14 + Math.sin(w + 1) * .04, .3);
        unit.rotation.set(.04, .2, -.04 + jolt * .1);
        hammer.position.set(-2.95, 1.05 + Math.abs(jolt) * .1 + Math.sin(w * 2) * .05, -1.6);
        hammer.rotation.set(.2, .5, -.42 + jolt * .05 + Math.sin(w * 2) * .03);
        pliers.position.set(-2.75, -2.35 + Math.abs(jolt) * .12 + Math.sin(w * 2 + 2) * .04, .1);
        pliers.rotation.set(.12, -.25, -1.25 + jolt * .12);
        tag.getWorldPosition(hit); root.worldToLocal(hit);
        const go = win(3.3, 4.2, 4.9, 5.7, t), TI = 1.15, kick = kickAt(t, 4.2);
        ph.position.set(lerp(2.55, hit.x + Math.sin(TI) * 2.28, go) + kick * .03, lerp(.2, hit.y - Math.cos(TI) * 2.28, go) + Math.sin(w + 2) * .05 * (1 - go), 1.5);
        ph.rotation.set(-.05, lerp(-.3, -.08, go), lerp(.06, TI, go));
        opens(ph, t, 4.35, D);
      };
    });
  },
  // A shoot: the camera turns, fires twice with a flash, and the card turns to meet the phone.
  photographers() {
    const D = 10;
    return floating(D, 7.4, root => {
      const cam = prop('Camera_01', 6);
      const tag = realTag('Tag2Brandcard', 1.55);
      const spot = corner(tag, 1.55);
      const glowMap = tex(256, 256, (x, W, H) => {
        const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
        g.addColorStop(0, 'rgba(255,250,225,1)'); g.addColorStop(.25, 'rgba(255,236,170,.75)'); g.addColorStop(1, 'rgba(255,214,120,0)');
        x.clearRect(0, 0, W, H); x.fillStyle = g; x.fillRect(0, 0, W, H);
      });
      const flash = new Mesh(new PlaneGeometry(3.6, 3.6), new MeshBasicMaterial({ map: glowMap, transparent: true, depthWrite: false, toneMapped: false }));
      const ph = phone(5.05, [lockOf(undefined, 'mono'), shot('card-photographer')]);
      root.add(cam, tag, flash, ph);
      const hit = new Vector3();
      const FIRE = [1.2, 1.75];
      return t => {
        const w = t / D * Math.PI * 2;
        const shutter = FIRE.reduce((a, f) => a + hitDecay(t - f), 0);
        // It turns to the lens for the shots, then looks around.
        const aim = win(.3, 1, 2.3, 3, t);
        cam.position.set(-1.95, -.55 + Math.sin(w) * .05, -1.5);
        cam.rotation.set(.16 + shutter * .02, lerp(.3 + Math.sin(w * 2) * .34, .02, aim) + shutter * .02, -.1);
        const f = FIRE.reduce((a, b) => Math.max(a, t > b ? Math.exp(-(t - b) * 11) : 0), 0);
        flash.visible = f > .01;
        flash.material.opacity = f;
        flash.position.set(-1.3, -.42, .6);
        flash.scale.setScalar(.7 + f * .7);
        const spin = ss(2.7, 3.6, t);
        tag.position.set(-1.4, 1.8 + Math.sin(w * 2 + 1) * .05, .3);
        tag.rotation.set(-.08, .3 + spin * Math.PI * 2, .12);
        spot.getWorldPosition(hit); root.worldToLocal(hit);
        const go = win(3.5, 4.25, 4.85, 5.6, t), TI = .72, kick = kickAt(t, 4.25);
        ph.position.set(lerp(2.3, hit.x + Math.sin(TI) * 2.28, go) + kick * .03, lerp(-.1, hit.y - Math.cos(TI) * 2.28, go) + Math.sin(w + 1) * .05 * (1 - go), 3);
        ph.rotation.set(-.05, lerp(-.3, -.1, go), lerp(.06, TI, go));
        opens(ph, t, 4.4, D);
      };
    });
  },
});
const SYSF = SYS;
    const statusBar = (x, W) => x.drawImage(images.leads, 0, 0, 660, 96, 0, 0, W, 96 * W / 660);
    const face = (x, cx, cy, r) => { const im = images['hero-nicolo'], k = im.width / 1224; x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip(); x.drawImage(im, 312 * k, 96 * k, 600 * k, 600 * k, cx - r, cy - r, r * 2, r * 2); x.restore(); };
    // The phone's own New Contact sheet, filled in from the card.
    const sheet = (x, W, H) => {
      const u = W / 440;
      x.fillStyle = '#F2F2F7'; x.fillRect(0, 0, W, H);
      statusBar(x, W);
      say(x, 'Cancel', 18 * u, 92 * u, `400 ${20 * u}px ${SYSF}`, '#007AFF', 'left');
      say(x, 'New Contact', 220 * u, 92 * u, `600 ${20 * u}px ${SYSF}`, '#111');
      say(x, 'Done', 422 * u, 92 * u, `600 ${20 * u}px ${SYSF}`, '#007AFF', 'right');
      face(x, 220 * u, 210 * u, 76 * u);
      box(x, 16 * u, 310 * u, 408 * u, 150 * u, 14 * u, '#fff');
      [['Nicolo', 335], ['Stanciu', 385], ['NFC.cool', 435]].forEach(([v, y]) => say(x, v, 34 * u, y * u, `400 ${21 * u}px ${SYSF}`, '#111', 'left'));
      x.fillStyle = '#E5E5EA'; [360, 410].forEach(y => x.fillRect(34 * u, y * u, 390 * u, 1.5 * u));
      box(x, 16 * u, 480 * u, 408 * u, 100 * u, 14 * u, '#fff');
      say(x, 'mobile', 34 * u, 505 * u, `400 ${16 * u}px ${SYSF}`, '#111', 'left'); say(x, '901 234 567', 140 * u, 505 * u, `400 ${20 * u}px ${SYSF}`, '#007AFF', 'left');
      x.fillStyle = '#E5E5EA'; x.fillRect(34 * u, 530 * u, 390 * u, 1.5 * u);
      say(x, 'work', 34 * u, 555 * u, `400 ${16 * u}px ${SYSF}`, '#111', 'left'); say(x, 'demo@nfc.cool', 140 * u, 555 * u, `400 ${20 * u}px ${SYSF}`, '#007AFF', 'left');
      box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#111');
    };
    // Contacts, with the new one in its place in the list.
    const NAMES = [['L', ['Liam O\'Connell', 'Lucia Ferrara']], ['M', ['Marco Delgado', 'Mina Park']], ['N', ['Nadia Costa', 'Nicolo Stanciu', 'Noah Weber']], ['O', ['Olivia Grant']], ['P', ['Paolo Rossi']]];
    const contacts = (x, W, H) => {
      const u = W / 440;
      x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
      statusBar(x, W);
      say(x, 'Contacts', 18 * u, 120 * u, `700 ${38 * u}px ${SYSF}`, '#111', 'left');
      box(x, 16 * u, 150 * u, 408 * u, 40 * u, 11 * u, '#EFEFF4');
      say(x, 'Search', 48 * u, 171 * u, `400 ${19 * u}px ${SYSF}`, '#8A8A8F', 'left');
      let y = 214;
      NAMES.forEach(([l, ns]) => {
        x.fillStyle = '#F7F7F8'; x.fillRect(0, y * u, W, 30 * u);
        say(x, l, 18 * u, (y + 16) * u, `600 ${17 * u}px ${SYSF}`, '#6D6D72', 'left');
        y += 30;
        ns.forEach(n => {
          const me = n === 'Nicolo Stanciu';
          if (me) { x.fillStyle = 'rgba(0,122,255,.13)'; x.fillRect(0, y * u, W, 62 * u); face(x, 44 * u, (y + 31) * u, 22 * u); }
          const [a, b] = n.split(' ');
          x.font = `400 ${22 * u}px ${SYSF}`; const aw = x.measureText(a + ' ').width;
          say(x, a + ' ', (me ? 78 : 18) * u, (y + 31) * u, `400 ${22 * u}px ${SYSF}`, '#111', 'left');
          say(x, b, (me ? 78 : 18) * u + aw, (y + 31) * u, `600 ${22 * u}px ${SYSF}`, '#111', 'left');
          y += 62;
          x.fillStyle = '#E5E5EA'; x.fillRect(18 * u, (y - 1) * u, W, 1.2 * u);
        });
      });
      box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#111');
    };

const frontOf = ph => { ph.updateWorldMatrix(true, true); return new Box3().setFromObject(ph).max.z + .008; };
const pressFor = ph => {
  const front = frontOf(ph);
  const dot = new Mesh(new THREE.SphereGeometry(.2, 24, 16), new MeshBasicMaterial({ color: '#5B6470', transparent: true, depthWrite: false, toneMapped: false }));
  dot.scale.z = .08; ph.add(dot);
  return (t, list) => {
    dot.visible = false;
    list.forEach(([a, x, y]) => { const k = win(a - .22, a - .08, a + .02, a + .22, t); if (k > .01) { dot.visible = true; dot.material.opacity = k * .45; dot.position.set(x, y, front); dot.scale.set(1 - k * .12, 1 - k * .12, .08); } });
  };
};
// Puts the phone so its top edge meets a point, by amount go from its resting pose.
const reachV = new Vector3();
function reach(ph, root, target, go, tilt, rest, z, style) {
  target.getWorldPosition(reachV); root.worldToLocal(reachV);
  tapPose(ph, rest, [reachV.x + Math.sin(tilt) * 2.28, reachV.y - Math.cos(tilt) * 2.28], tilt, go, z, style);
}
const REST2 = { p: [2.3, -.1, 0], r: [-.06, -.3, .06] };
const appScreen = (x, W) => { x.fillStyle = '#fff'; x.fillRect(0, 0, W, W * 3); statusBar(x, W); };
// The selfie the two of them take, with what the app writes on it (renderedWithOverlay): the NFC.cool pill on top, the names below.
const LEAD_BRAND = '#2E5E4E', LEAD_GROUND = '#F2F2F7';
function selfiePhoto(x, a, b, w, h, overlay = true) {
  x.save(); x.beginPath(); x.rect(a, b, w, h); x.clip();
  const g = x.createLinearGradient(a, b, a, b + h); g.addColorStop(0, '#D7DEE5'); g.addColorStop(1, '#8C99A6'); x.fillStyle = g; x.fillRect(a, b, w, h);
  const sa = images['hero-broker'], k = sa.width / 1224, em = images.emma;
  const d = w * .66, cy = b + h * .3;
  // Two faces close together, as in a selfie: his behind, hers in front.
  x.save(); x.beginPath(); x.arc(a + w * .66, cy + d * .48, d * .47, 0, 7); x.clip(); x.drawImage(sa, 312 * k, 96 * k, 600 * k, 600 * k, a + w * .66 - d * .5, cy, d, d); x.restore();
  x.save(); x.beginPath(); x.arc(a + w * .35, cy + d * .54, d * .5, 0, 7); x.clip(); x.drawImage(em, a + w * .35 - d * .52, cy + d * .02, d * 1.04, d * 1.04); x.restore();
  if (overlay) {
    const pw = w * .5, ph = w * .135, px = a + (w - pw) / 2, py = b + w * .05;
    box(x, px, py, pw, ph, ph / 2, 'rgba(0,0,0,.55)'); wordmark(x, a + w / 2, py + ph / 2 + 1, w * .075, '#fff');
    const fs = Math.max(11, w * .06), lines = ['Samir Haddad • Emma Appleseed'];
    x.font = `700 ${fs}px ${TW}`; const tw = x.measureText(lines[0]).width, bw = Math.min(w * .92, tw + w * .08), bh = fs * 1.7;
    box(x, a + (w - bw) / 2, b + h - w * .05 - bh, bw, bh, bh / 2, 'rgba(0,0,0,.55)');
    say(x, lines[0], a + w / 2, b + h - w * .05 - bh / 2 + 1, `700 ${Math.min(fs, fs * (w * .86) / tw)}px ${TW}`, '#fff');
  }
  x.restore();
}
const leadChrome = (x, W, u) => {
  x.fillStyle = LEAD_GROUND; x.fillRect(0, 0, W, W * 3);
  statusBar(x, W);
  say(x, 'Connect Back', 220 * u, 96 * u, `600 ${20 * u}px ${SYS}`, '#111');
  say(x, 'Step 4 of 4', 18 * u, 132 * u, `400 ${15 * u}px ${TW}`, '#8A8A8F', 'left');
  box(x, 18 * u, 150 * u, 404 * u, 5 * u, 3 * u, '#E0E0E5'); box(x, 18 * u, 150 * u, 404 * u, 5 * u, 3 * u, '#007AFF');
  say(x, 'A photo with Samir?', 18 * u, 196 * u, `700 ${23 * u}px ${TW}`, '#111', 'left');
};
const leadButton = (x, u, y, label) => { box(x, 16 * u, y * u, 408 * u, 56 * u, 28 * u, LEAD_BRAND); say(x, label, 220 * u, (y + 29) * u, `600 ${20 * u}px ${TW}`, '#fff'); };
const selfieAsk = (x, W, H) => {
  const u = W / 440; leadChrome(x, W, u);
  const cx = 220 * u, cy = 390 * u;
  // The dashed ring, the two faces and the camera badge.
  x.save(); x.strokeStyle = LEAD_BRAND; x.lineWidth = 3 * u; x.setLineDash([9 * u, 7 * u]); x.beginPath(); x.arc(cx, cy, 116.5 * u, 0, 7); x.stroke(); x.restore();
  x.beginPath(); x.arc(cx, cy, 98 * u, 0, 7); x.fillStyle = '#DFE3E2'; x.fill();
  const r = 38 * u, sa = images['hero-broker'], k = sa.width / 1224;
  const ring = (ax, paint) => { x.beginPath(); x.arc(ax, cy, r + 3 * u, 0, 7); x.fillStyle = LEAD_GROUND; x.fill(); x.save(); x.beginPath(); x.arc(ax, cy, r, 0, 7); x.clip(); paint(); x.restore(); };
  ring(cx - 29 * u, () => x.drawImage(sa, 312 * k, 96 * k, 600 * k, 600 * k, cx - 29 * u - r, cy - r, r * 2, r * 2));
  ring(cx + 29 * u, () => { x.fillStyle = 'rgb(242,219,204)'; x.fillRect(cx - r + 29 * u, cy - r, r * 2, r * 2); say(x, 'EA', cx + 29 * u, cy + 1, `600 ${26 * u}px ${TW}`, 'rgb(122,69,33)'); });
  x.beginPath(); x.arc(cx + 64 * u, cy + 64 * u, 31 * u, 0, 7); x.fillStyle = LEAD_GROUND; x.fill();
  x.beginPath(); x.arc(cx + 64 * u, cy + 64 * u, 28 * u, 0, 7); x.fillStyle = LEAD_BRAND; x.fill();
  const bx = cx + 64 * u, by = cy + 64 * u; x.strokeStyle = '#fff'; x.lineWidth = 2.4 * u; x.lineJoin = 'round'; x.beginPath(); x.roundRect(bx - 13 * u, by - 8 * u, 26 * u, 18 * u, 4 * u); x.stroke(); x.beginPath(); x.moveTo(bx - 5 * u, by - 8 * u); x.lineTo(bx - 3 * u, by - 12 * u); x.lineTo(bx + 3 * u, by - 12 * u); x.lineTo(bx + 5 * u, by - 8 * u); x.stroke(); x.beginPath(); x.arc(bx, by + 1 * u, 4.5 * u, 0, 7); x.stroke();
  ['So you both remember where you met.', 'Your names go on the photo.'].forEach((l, i) => say(x, l, 220 * u, (560 + i * 26) * u, `400 ${18 * u}px ${TW}`, '#6D6D72'));
  leadButton(x, u, 802, 'Take the selfie');
  say(x, 'Skip', 220 * u, 884 * u, `500 ${18 * u}px ${TW}`, '#6D6D72');
  box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#111');
};
const selfieCam = (x, W, H) => { selfiePhoto(x, 0, 0, W, H, false); const u = W / 440; x.fillStyle = 'rgba(0,0,0,.9)'; x.fillRect(0, 0, W, 96 * u); x.fillRect(0, 780 * u, W, H); x.beginPath(); x.arc(220 * u, 860 * u, 34 * u, 0, 7); x.strokeStyle = '#fff'; x.lineWidth = 5 * u; x.stroke(); x.beginPath(); x.arc(220 * u, 860 * u, 27 * u, 0, 7); x.fillStyle = '#fff'; x.fill(); };
// The white-framed print with today's date, as LeadSelfiePrint draws it.
function selfiePrint(x, a, b, s) {
  const w = 280 * s, h = 388 * s;
  x.save(); x.shadowColor = 'rgba(0,0,0,.16)'; x.shadowBlur = 20 * s; x.shadowOffsetY = 16 * s; box(x, a, b, w, h, 22 * s, '#fff'); x.restore();
  x.save(); x.beginPath(); x.roundRect(a + 12 * s, b + 12 * s, 256 * s, 330 * s, 14 * s); x.clip(); selfiePhoto(x, a + 12 * s, b + 12 * s, 256 * s, 330 * s); x.restore();
  say(x, 'Nov 4, 2026', a + 14 * s, b + 362 * s, `500 ${13 * s}px ${SYS}`, 'rgb(107,107,107)', 'left');
}
const selfieDone = (x, W, H) => {
  const u = W / 440; leadChrome(x, W, u);
  x.save(); x.translate(220 * u, 430 * u); x.rotate(-2 * Math.PI / 180); selfiePrint(x, -140 * u, -194 * u, u); x.restore();
  [['Swap names', 136], ['Retake', 304]].forEach(([l, a], i) => {
    x.beginPath(); x.arc(a * u, 672 * u, 26 * u, 0, 7); x.fillStyle = '#fff'; x.fill();
    x.strokeStyle = '#111'; x.lineWidth = 2.4 * u; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath();
    if (!i) { [[-1, -5], [1, 5]].forEach(([d, oy]) => { x.moveTo((a - d * 10) * u, (672 + oy) * u); x.lineTo((a + d * 10) * u, (672 + oy) * u); x.moveTo((a + d * 6) * u, (672 + oy - 4) * u); x.lineTo((a + d * 10) * u, (672 + oy) * u); x.lineTo((a + d * 6) * u, (672 + oy + 4) * u); }); }
    else { x.arc(a * u, 672 * u, 10 * u, -.6, Math.PI * 1.45); x.moveTo((a + 8) * u, 666 * u); x.lineTo((a + 9) * u, 660 * u); x.moveTo((a + 8) * u, 666 * u); x.lineTo((a + 2) * u, 665 * u); }
    x.stroke();
    say(x, l, a * u, 716 * u, `400 ${15 * u}px ${TW}`, '#111');
  });
  leadButton(x, u, 802, 'Continue');
  box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#111');
};
// The App Clip sheet with the card's own picture and words.
const clipArt = (x, a, b, w, h) => {
  const g = x.createLinearGradient(a, b, a + w, b + h); g.addColorStop(0, '#8E1B3C'); g.addColorStop(1, '#D8603F'); x.fillStyle = g; x.fillRect(a, b, w, h);
  const glow = x.createRadialGradient(a + w * .8, b + h * .15, 0, a + w * .8, b + h * .15, w * .8); glow.addColorStop(0, 'rgba(255,214,150,.7)'); glow.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = glow; x.fillRect(a, b, w, h);
  const im = images['hero-realtor'], k = im.width / 1224; x.save(); x.beginPath(); x.arc(a + w / 2, b + h * .5, h * .34, 0, 7); x.clip(); x.drawImage(im, 312 * k, 96 * k, 600 * k, 600 * k, a + w / 2 - h * .34, b + h * .16, h * .68, h * .68); x.restore();
};
const clipSheet = (x, W, H) => {
  const u = W / 416;
  x.clearRect(0, 0, W, H);
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
  clipArt(x, 0, 0, W, 250 * u);
  say(x, 'Elena Marchetti', 22 * u, 290 * u, `700 ${25 * u}px ${SYS}`, '#111', 'left'); say(x, 'Marchetti Property', 22 * u, 324 * u, `400 ${18 * u}px ${SYS}`, '#6D6D72', 'left');
  box(x, 300 * u, 282 * u, 96 * u, 44 * u, 22 * u, '#007AFF'); say(x, 'Open', 348 * u, 305 * u, `600 ${19 * u}px ${SYS}`, '#fff');
  x.fillStyle = '#E5E5EA'; x.fillRect(22 * u, 365 * u, 372 * u, 1.5 * u);
  say(x, 'Powered by NFC.cool Business Card', 22 * u, 408 * u, `400 ${15 * u}px ${SYS}`, '#8A8A8F', 'left'); say(x, 'App Store ›', 394 * u, 408 * u, `400 ${15 * u}px ${SYS}`, '#8A8A8F', 'right');
};
const lockDim = (x, W, H) => { lockGlass(x, W, H, undefined, 'mono'); x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(0, 0, W, H); };
// The App Clip's Live Activity, from UnsavedContactLiveActivity.swift.
const unsavedLock = (x, W, H) => {
  lockGlass(x, W, H, undefined, 'violet');
  const u = W / 440;
  box(x, 14 * u, 640 * u, 412 * u, 130 * u, 26 * u, 'rgba(18,18,22,.86)');
  x.beginPath(); x.arc(62 * u, 705 * u, 28 * u, 0, 7); x.fillStyle = '#F2994A'; x.fill(); person(x, 62 * u, 705 * u, 24 * u);
  say(x, 'Unsaved Contact', 104 * u, 672 * u, `400 ${15 * u}px ${SYS}`, '#A0A0A8', 'left');
  x.font = `400 ${19 * u}px ${SYS}`; const w0 = x.measureText("You didn't save ").width;
  say(x, "You didn't save ", 104 * u, 702 * u, `400 ${19 * u}px ${SYS}`, '#D5D5DA', 'left'); say(x, 'Nicolo', 104 * u + w0, 702 * u, `700 ${19 * u}px ${SYS}`, '#fff', 'left');
  say(x, 'Tap to save to your contacts', 104 * u, 732 * u, `400 ${15 * u}px ${SYS}`, '#A0A0A8', 'left');
  x.strokeStyle = '#128CF0'; x.lineWidth = 3 * u; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(392 * u, 688 * u); x.lineTo(392 * u, 712 * u); x.moveTo(382 * u, 703 * u); x.lineTo(392 * u, 713 * u); x.lineTo(402 * u, 703 * u); x.moveTo(378 * u, 722 * u); x.lineTo(406 * u, 722 * u); x.stroke();
};
// iOS's own NFC sheet, over the app.
const scanSheet = done => (x, W, H) => {
  x.drawImage(images['card-actions'], 0, 0, W, H); x.fillStyle = 'rgba(0,0,0,.32)'; x.fillRect(0, 0, W, H);
  const u = W / 440; box(x, 10 * u, 520 * u, 420 * u, 410 * u, 44 * u, '#fff');
  say(x, done ? 'Done' : 'Ready to Scan', 220 * u, 586 * u, `400 ${30 * u}px ${SYS}`, '#8A8A8F');
  x.strokeStyle = '#007AFF'; x.lineWidth = 7 * u; x.lineCap = 'round'; x.lineJoin = 'round';
  if (done) { x.beginPath(); x.arc(220 * u, 695 * u, 60 * u, 0, 7); x.stroke(); x.beginPath(); x.moveTo(190 * u, 697 * u); x.lineTo(212 * u, 720 * u); x.lineTo(252 * u, 672 * u); x.stroke(); }
  else { x.beginPath(); x.roundRect(186 * u, 630 * u, 68 * u, 124 * u, 12 * u); x.stroke(); [0, 1, 2].forEach(i => { x.beginPath(); x.arc(262 * u, 650 * u, (18 + i * 12) * u, -1.1, .2); x.stroke(); }); }
  say(x, done ? 'Your card is on the tag.' : 'Hold your iPhone near an NFC tag.', 220 * u, 800 * u, `400 ${20 * u}px ${SYS}`, '#111');
  if (!done) { box(x, 40 * u, 845 * u, 360 * u, 56 * u, 18 * u, '#E5E5EA'); say(x, 'Cancel', 220 * u, 874 * u, `500 ${20 * u}px ${SYS}`, '#111'); }
};
const reminderLock = (x, W, H) => {
  lockGlass(x, W, H, undefined, 'teal');
  const u = W / 440; box(x, 14 * u, 268 * u, 412 * u, 84 * u, 24 * u, 'rgba(255,255,255,.88)');
  box(x, 26 * u, 282 * u, 56 * u, 56 * u, 13 * u, '#fff', '#D1D1D6', 1.5 * u);
  [['#FF9F0A', 298], ['#007AFF', 310], ['#FF3B30', 322]].forEach(([c, y]) => { x.beginPath(); x.arc(40 * u, y * u, 4 * u, 0, 7); x.fillStyle = c; x.fill(); x.fillStyle = '#C7C7CC'; x.fillRect(50 * u, (y - 1) * u, 24 * u, 2.5 * u); });
  say(x, 'Reminders', 94 * u, 298 * u, `600 ${19 * u}px ${SYS}`, '#111', 'left'); say(x, 'Follow up with Priya Raman', 94 * u, 324 * u, `400 ${18 * u}px ${SYS}`, '#333', 'left'); say(x, 'now', 412 * u, 298 * u, `400 ${15 * u}px ${SYS}`, '#666', 'right');
};
// The same team card under whoever holds it: the capture with the team's brand tile.
const teamCard = (base, tile) => (x, W, H) => { const k = W / 660; x.drawImage(images[base], 0, 0, W, H); x.save(); x.beginPath(); x.roundRect(23 * k, 210 * k, 614 * k, 581 * k, 34 * k); x.clip(); x.drawImage(images[tile], 23 * k, 210 * k, 614 * k, 581 * k); x.restore(); };
const inviteBody = (x, W, top, scale) => {
  const u = n => n * scale, logo = images['logo-consultant'], lw = Math.min(u(190), logo.width / logo.height * u(50)), lh = lw * logo.height / logo.width;
  x.drawImage(logo, u(30), top + u(26), lw, lh);
  say(x, 'Join Kovac Advisory', u(30), top + u(120), `700 ${u(29)}px ${SYS}`, '#212529', 'left');
  ['Anna Kovac has invited you to join', 'Kovac Advisory. Accept to set up your', "business card. It carries the team's", 'brand.'].forEach((l, i) => say(x, l, u(30), top + u(172 + i * 31), `400 ${u(21)}px ${SYS}`, '#495057', 'left'));
  box(x, u(30), top + u(306), u(230), u(56), u(14), '#128CF0'); say(x, 'Accept invitation', u(145), top + u(335), `700 ${u(20)}px ${SYS}`, '#fff');
};
const inviteMail = (x, W, H) => {
  const s = W / 440; x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); statusBar(x, W);
  say(x, '‹ Inbox', 16 * s, 84 * s, `400 ${20 * s}px ${SYS}`, '#007AFF', 'left');
  say(x, 'NFC.cool', 16 * s, 128 * s, `600 ${20 * s}px ${SYS}`, '#111', 'left');
  say(x, 'Join Kovac Advisory on NFC.cool', 16 * s, 170 * s, `700 ${21 * s}px ${SYS}`, '#111', 'left');
  x.fillStyle = '#E6E8EB'; x.fillRect(0, 194 * s, W, 1.5 * s);
  inviteBody(x, W, 210 * s, s * .96); box(x, 150 * s, 938 * s, 140 * s, 5 * s, 3 * s, '#111');
};
const inviteLanding = (x, W, H) => {
  const u = W / 440; x.fillStyle = '#F2F2F7'; x.fillRect(0, 0, W, H); statusBar(x, W);
  say(x, 'Team invite', 220 * u, 92 * u, `600 ${20 * u}px ${SYS}`, '#111');
  say(x, "You've been invited to a team", 220 * u, 290 * u, `700 ${27 * u}px ${SYS}`, '#111');
  ['Sign in, or create an account, and your', "team's business card is added to your cards."].forEach((l, i) => say(x, l, 220 * u, (340 + i * 28) * u, `400 ${18 * u}px ${SYS}`, '#6D6D72'));
  box(x, 30 * u, 720 * u, 380 * u, 58 * u, 29 * u, '#128CF0'); say(x, 'Create account', 220 * u, 750 * u, `600 ${21 * u}px ${SYS}`, '#fff');
  say(x, 'I already have an account', 220 * u, 812 * u, `400 ${19 * u}px ${SYS}`, '#128CF0'); say(x, 'Not now', 220 * u, 860 * u, `400 ${19 * u}px ${SYS}`, '#8A8A8F');
  box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#111');
};

Object.assign(PRO, {
  // After the tap, a selfie: their names go on the photo, and the print is theirs to keep.
  selfie() {
    const D = 11;
    return floating(D, 8.4, root => {
      const ph = phone(5.2, [screenTex(selfieAsk), screenTex(selfieCam), screenTex(selfieDone)]);
      const press = pressFor(ph);
      const pw = 2.75, phh = pw * 388 / 280;
      const t2 = tex(700, 970, (x, W, H) => { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.save(); x.beginPath(); x.roundRect(30, 30, W - 60, H * .85, 34); x.clip(); selfiePhoto(x, 30, 30, W - 60, H * .85); x.restore(); say(x, 'Nov 4, 2026', 36, H * .945, `500 34px ${SYS}`, 'rgb(107,107,107)', 'left'); });
      t2.anisotropy = 16;
      const print = plate(pw, phh, { r: .2, d: .02, color: '#fff', rough: .7 });
      const pf = new Mesh(faceGeo(pw, phh, .2), new MeshStandardMaterial({ map: t2, roughness: .4, envMapIntensity: .55, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
      pf.position.z = .012; pf.receiveShadow = true; print.add(pf);
      const flash = new Mesh(new PlaneGeometry(2.6, 5.4), new MeshBasicMaterial({ color: '#fff', transparent: true, depthWrite: false, toneMapped: false }));
      flash.position.z = frontOf(ph); ph.add(flash);
      root.add(print, ph);
      return t => {
        const w = t / D * Math.PI * 2, snap = t - 3.6, k = hitDecay(snap);
        const room = ss(4.2, 5.2, t) * (1 - ss(9.9, 10.6, t));
        ph.position.set(lerp(.1, 1.9, room), -.05 + Math.sin(w + 1) * .05, .8); ph.rotation.set(-.05 + k * .03, lerp(-.08, -.24, room) + k * .04, lerp(.01, .05, room));
        flash.visible = snap > 0 && snap < .35; flash.material.opacity = Math.max(0, 1 - snap / .35);
        press(t, [[1.7, 0, -1.82], [3.6, 0, -1.97]]);
        if (t < 2.4) ph.screen.show(0, 1, ss(1.8, 2.3, t), 1); else if (t < 9.8) ph.screen.show(1, 2, ss(4.1, 4.6, t)); else ph.screen.show(2, 0, ss(9.9, 10.5, t));
        // The print slides out of the phone and comes to rest beside it.
        const out = ss(4.3, 5.4, t) * (1 - ss(9.9, 10.5, t)), lift = Math.sin(Math.PI * out);
        print.visible = out > .01;
        print.position.set(lerp(.4, -2.05, out), lerp(.2, .05, out) + lift * .5 + Math.sin(w * 2) * .05, lerp(.2, .4, out) + lift * .3);
        print.rotation.set(-.05, lerp(-.24, .3, out), lerp(0, .06, out) + lift * .3 + Math.sin(w) * .02);
        print.scale.setScalar(Math.max(lerp(.5, 1, out), .001));
        print.traverse(o => { if (o.isMesh) { o.material.transparent = out < .3; o.material.opacity = clamp(out * 4); } });
      };
    });
  },
  // Your picture breaks into small pieces that stream into the NFC tag; a tap on the tag brings it up on the phone.
  firstscreen() {
    const D = 12;
    return floating(D, 2, root => {
      const W = 3.2, H = W * .6;
      const art = tex(960, 576, (x, w, h) => { x.clearRect(0, 0, w, h); x.save(); x.beginPath(); x.roundRect(0, 0, w, h, 44); x.clip(); clipArt(x, 0, 0, w, h); x.restore(); });
      art.anisotropy = 16;
      const picture = new Mesh(new PlaneGeometry(W, H), new MeshBasicMaterial({ map: art, transparent: true, toneMapped: false, side: DoubleSide, depthWrite: false, depthTest: false }));
      picture.renderOrder = 5;
      root.add(picture);
      const card = litCard(2.3), spot = corner(card, 2.3);
      const ph = phone(5.05, [lockOf(undefined, 'mono'), screenTex(lockDim), shot('card-realtor')]);
      const press = pressFor(ph);
      const front = frontOf(ph) + .002, SW = 2.2, SH = SW * 470 / 416, sheetTex = tex(832, 1880, (x, W, H) => { x.clearRect(0, 0, W, H); x.save(); x.translate(0, H / 2); clipSheet(x, W, H / 2); x.restore(); });
      // The canvas is twice the sheet: an empty half above it. Moving the window slides the sheet up inside the screen, so it can't show outside the phone.
      sheetTex.repeat.y = .5;
      sheetTex.anisotropy = 16;
      const sheetMesh = new Mesh(faceGeo(SW, SH, .17), new MeshBasicMaterial({ map: sheetTex, transparent: true, toneMapped: false, depthWrite: false }));
      sheetMesh.renderOrder = 3; ph.add(sheetMesh);
      root.add(card, ph);
      const TOP = [-1.95, 1.9, .9];
      return t => {
        const w = t / D * Math.PI * 2;
        const cardY = lerp(-.75, .25, win(4.3, 5.1, 5.7, 6.5, t));
        // One slow glide: the picture lands exactly on the tag, same size and angle, then the tag shows through it.
        const k = ss(1.9, 3.3, t) * (1 - ss(10.9, 11.9, t)), fade = ss(3.2, 4.1, t) * (1 - ss(10.4, 11, t));
        const bob = Math.sin(w * 2 + 1) * .04;
        card.position.set(-1.9, cardY + bob, .5); card.rotation.set(-.08, .36, .06);
        picture.position.set(lerp(TOP[0], -1.9, k), lerp(TOP[1], cardY + bob, k) + Math.sin(w * 2) * .05 * (1 - k), lerp(TOP[2], .5, k));
        picture.rotation.set(lerp(-.05, -.08, k), lerp(.3, .36, k), lerp(.04, .06, k));
        picture.scale.setScalar(lerp(1, 2.3 / 3.2, k));
        picture.material.opacity = 1 - fade;
        picture.visible = fade < .995;
        const go = tapGo(4.4, 5.2, 5.7, 6.5, t);
        reach(ph, root, spot, go, 1.12, REST2, 1.4, { roll: .7 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        press(t, [[8.1, .75, -1.02]]);
        const up = ss(5.4, 6.05, t), gone = ss(8.2, 8.55, t);
        sheetMesh.visible = up > .01 && gone < 1;
        sheetMesh.position.set(0, -1.08 + gone * .2, front);
        sheetTex.offset.y = .5 * (1 - up);
        sheetMesh.material.opacity = clamp(up * 3) * (1 - gone);
        if (t < 8.2) ph.screen.show(0, 1, ss(5.25, 5.7, t)); else if (t < 11.1) ph.screen.show(1, 2, ss(8.25, 8.8, t), 1); else ph.screen.show(2, 0, ss(11.1, 11.7, t));
      };
    });
  },
  // They close your card without saving. Later their Lock Screen reminds them, and a tap puts you in Contacts.
  secondchance() {
    const D = 13;
    return floating(D, 6.4, root => {
      const card = litCard(3.1), ph = phone(5.05, [shot('card'), screenTex(unsavedLock), screenTex(sheet), screenTex(contacts)]);
      const press = pressFor(ph);
      root.add(card, ph);
      const drift = drifter(D, [[card, [-2, .5, -.3], [-.1, .4, .08], 0, .06]]);
      return t => {
        drift(t);
        const w = t / D * Math.PI * 2;
        // Put away, screen dark, then it buzzes back.
        const away = win(1.2, 2.1, 3.4, 4.1, t), buzz = t > 3.4 && t < 4.5 ? Math.sin(t * 60) * .022 * (1 - (t - 3.4) / 1.1) : 0;
        ph.position.set(lerp(1.95, 3, away) + buzz, lerp(-.05, -.75, away) + Math.sin(w + 1) * .05, .5 - away * 1.2);
        ph.rotation.set(lerp(-.05, .35, away), lerp(-.2, -1.05, away), .03 + buzz * 2);
        press(t, [[5.5, .05, -.32], [7.6, .86, 2.02]]);
        if (t < 5.6) ph.screen.show(0, 1, ss(2.6, 2.7, t)); else if (t < 7.7) ph.screen.show(1, 2, ss(5.6, 6.2, t), 1); else if (t < 12.2) ph.screen.show(2, 3, ss(7.7, 8.2, t)); else ph.screen.show(3, 0, ss(12.2, 12.8, t));
      };
    });
  },
  // New job: the old printed card is ripped in two, and the same NFC card opens the new details.
  changejobs() {
    const D = 13;
    return floating(D, 10.2, root => {
      const W = 3, H = W * .58;
      const face = tex(900, 522, (x, w, h) => { x.fillStyle = '#2E5E4E'; x.fillRect(0, 0, w, h); say(x, 'Nicolo Stanciu', 66, 180, `700 76px ${TW}`, '#fff', 'left'); say(x, 'Haddad & Lowe', 66, 270, `400 48px ${TW}`, 'rgba(255,255,255,.85)', 'left'); x.fillStyle = 'rgba(255,255,255,.8)'; x.fillRect(66, 350, 120, 8); say(x, 'Partner', 66, 420, `400 36px ${TW}`, 'rgba(255,255,255,.7)', 'left'); });
      face.anisotropy = 16;
      // One jagged line down the card, shared by both halves.
      const TEAR = Array.from({ length: 15 }, (_, i) => { const v = i / 14; return [(Math.sin(i * 2.3) * .06 + Math.sin(i * 5.1) * .035 + (i % 2 ? .02 : -.02)) + .08, H / 2 - v * H]; });
      const half = (side, gap) => {
        const sh = new Shape(), o = side * W / 2;
        sh.moveTo(TEAR[0][0] + side * gap, H / 2);
        sh.lineTo(o, H / 2); sh.lineTo(o, -H / 2);
        [...TEAR].reverse().forEach(([x, y]) => sh.lineTo(x + side * gap, y));
        sh.closePath();
        const g = new ShapeGeometry(sh), p = g.attributes.position, u = g.attributes.uv;
        for (let i = 0; i < p.count; i++) u.setXY(i, p.getX(i) / W + .5, p.getY(i) / H + .5);
        return g;
      };
      // The print is on top; under the tear the paper's white core shows.
      const piece = side => {
        const g = new Group();
        const core = new Mesh(half(side, 0), new MeshStandardMaterial({ color: '#FBFAF6', roughness: .9, side: DoubleSide })); core.castShadow = true;
        const print = new Mesh(half(side, .035), new MeshStandardMaterial({ map: face, roughness: .62, envMapIntensity: .4, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })); print.position.z = .004; print.receiveShadow = true;
        g.add(core, print);
        return g;
      };
      const left = piece(-1), right = piece(1);
      // Whole until the moment it rips: the tear doesn't exist yet.
      const whole = plate(W, H, { r: .02, d: .012, color: '#2E5E4E', rough: .7 });
      const wf = new Mesh(faceGeo(W, H, .02), new MeshStandardMaterial({ map: face, roughness: .62, envMapIntensity: .4, transparent: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
      wf.position.z = .007; wf.receiveShadow = true; whole.add(wf); root.add(whole);
      const bits = Array.from({ length: 7 }, (_, i) => { const m = new Mesh(new ShapeGeometry((() => { const q = new Shape(); q.moveTo(-.05, -.04); q.lineTo(.05, -.05); q.lineTo(.03, .05); q.lineTo(-.04, .03); q.closePath(); return q; })()), new MeshStandardMaterial({ color: i % 3 ? '#FBFAF6' : '#2E5E4E', roughness: .9, side: DoubleSide, transparent: true })); root.add(m); return m; });
      const card = litCard(2.3), spot = corner(card, 2.3);
      const ph = phone(5.05, [lockOf(undefined, 'mono'), shot('ten-02'), shot('ten-04')]);
      root.add(left, right, card, ph);
      const HOME = [-2, -1.25, .1], RIP = 3.1;
      return t => {
        const w = t / D * Math.PI * 2;
        // Pulled apart from the top down, then the two halves fall away and a new card is printed for next time.
        const pull = ss(RIP, RIP + .75, t), fall = ss(RIP + .75, RIP + 2.2, t), again = ss(12.1, 12.8, t), tension = t > RIP - .5 && t < RIP ? Math.sin(t * 50) * .006 : 0;
        const show = again > 0 ? again : 1 - ss(RIP + 1.5, RIP + 2.2, t);
        [[left, -1], [right, 1]].forEach(([g, sd]) => {
          const op = again > 0 ? 1 : pull ? 1 - fall : 1, a = again > 0 ? 0 : pull;
          g.visible = show > .01;
          g.position.set(HOME[0] + sd * (a * .7 + fall * .35 + tension * 3) * (again > 0 ? 0 : 1), HOME[1] + Math.sin(w * 2) * .04 - fall * .95 * (again > 0 ? 0 : 1), HOME[2] + sd * a * .12);
          g.rotation.set(-.12 + fall * .4 * (again > 0 ? 0 : 1), .3 + sd * a * .4, sd * -(a * .42 + fall * .35) * (again > 0 ? 0 : 1) + .02);
          g.traverse(o => { if (o.isMesh) { o.material.transparent = show < .999; o.material.opacity = show * (o === g.children[0] ? 1 : 1); } });
        });
        // Before the rip, and after the new card fades in, only the whole card shows.
        const intact = t < RIP || again > 0;
        left.visible = right.visible = !intact && show > .01;
        whole.visible = intact;
        whole.position.set(HOME[0] + tension * 2, HOME[1] + Math.sin(w * 2) * .04, HOME[2]);
        whole.rotation.set(-.12, .3, .02);
        whole.traverse(o => { if (o.isMesh) { o.material.transparent = again > 0 && again < 1; o.material.opacity = again > 0 ? again : 1; } });
        bits.forEach((m, i) => {
          const d = t - RIP - .15 - i * .05, k = clamp(d / 1.3);
          m.visible = d > 0 && k < 1;
          m.position.set(HOME[0] + .1 + (i - 3) * .17 * k * 1.5, HOME[1] + .5 - i * .1 + k * .35 - k * k * 1.8, .5 + i * .03);
          m.rotation.set(k * 5 + i, k * 4, k * 6 + i * 2);
          m.material.opacity = 1 - ss(.7, 1, k);
        });
        card.position.set(-1.45, 1.35 + Math.sin(w * 2) * .05, .4); card.rotation.set(-.1, .34, .08);
        const g1 = tapGo(.7, 1.45, 2, 2.7, t), g2 = tapGo(6.2, 6.95, 7.5, 8.2, t), go = Math.max(g1, g2);
        reach(ph, root, spot, go, .95, { p: [2.4, -.1], r: [-.06, -.3, .06] }, 1.4, { arc: .25 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        if (t < 5.2) ph.screen.show(0, 1, ss(1.5, 2.1, t), 1); else if (t < 7) ph.screen.show(1, 0, ss(5.2, 5.8, t)); else if (t < 12) ph.screen.show(0, 2, ss(7, 7.6, t), 1); else ph.screen.show(2, 0, ss(12, 12.6, t));
      };
    });
  },
  // One card, any tag: four tags turn slowly on a carousel; the phone writes one, and a tap on another opens the card.
  writetag() {
    const D = 14;
    return floating(D, 11.2, root => {
      const tags = [['Tag4Coin', 1.3], ['Tag1Sticker', 1.25], ['Tag8Wristband', 1.5], ['Tag6Fob', 1.5]].map(([n, s]) => { const t = realTag(n, s); root.add(t); return t; });
      const ph = phone(5.05, [shot('card-actions'), screenTex(scanSheet(false)), screenTex(scanSheet(true)), lockOf(undefined, 'blue'), shot('card')]);
      const press = pressFor(ph);
      root.add(ph);
      const R0 = 1.25, C = [-2, 1.6];
      // The carousel rests while a tag is being tapped, and turns between taps.
      const turn = t => Math.PI * (ss(5.6, 7.6, t) + ss(12, 14, t)) ;
      return t => {
        const w = t / D * Math.PI * 2, spin = turn(t);
        tags.forEach((g, i) => {
          const a = spin + i * Math.PI / 2;
          g.position.set(C[0] + Math.sin(a) * R0, C[1] - Math.cos(a) * .62 + Math.sin(w * 2 + i) * .03, Math.cos(a) * 1);
          g.rotation.set(-.06, .28 + Math.sin(w + i) * .05, (i - 1.5) * .05);
        });
        const front = spin < Math.PI * .5 ? tags[0] : tags[2];
        // Two slow, even moves, nothing sudden.
        const g1 = tapGo(2.2, 3.4, 4.5, 5.6, t), g2 = tapGo(7.8, 9, 9.8, 11, t), go = Math.max(g1, g2);
        reach(ph, root, front, go, .8, { p: [2.3, -.1], r: [-.06, -.3, .06] }, 1.7, { roll: 1.3 });
        ph.position.y += Math.sin(w + 1) * .04 * (1 - go);
        press(t, [[1.3, -.6, -1.08]]);
        if (t < 3.4) ph.screen.show(0, 1, ss(1.4, 2, t), 1);
        else if (t < 5.4) ph.screen.show(1, 2, ss(3.4, 3.8, t));
        else if (t < 8.6) ph.screen.show(2, 3, ss(5.4, 6.1, t));
        else if (t < 13) ph.screen.show(3, 4, ss(8.7, 9.4, t), 1);
        else ph.screen.show(4, 0, ss(13, 13.7, t));
      };
    });
  },
  // Who was that? The contact, the event, and a reminder that rings when it is time.
  networkcontact() {
    const D = 12;
    return floating(D, 4.4, root => {
      const clock = prop('alarm_clock_01', 2.9);
      const badge = lanyard(3.4);
      const ph = phone(5.2, [shot('net-list'), shot('net-detail'), screenTex(reminderLock)]);
      const press = pressFor(ph);
      root.add(clock, badge, ph);
      return t => {
        const w = t / D * Math.PI * 2, ring = win(6.5, 6.7, 8, 8.2, t), shake = Math.sin(t * 46) * .05 * ring;
        clock.position.set(-1.45 + shake * .6, -1.45 + Math.abs(shake) * .6 + Math.sin(w) * .04, -.2);
        clock.rotation.set(.1, .35, shake * 1.4);
        badge.position.set(-2.95, 1.3 + Math.sin(w * 2) * .05, -1); badge.rotation.set(.03, .3, .05 + Math.sin(w * 2 + 1) * .05);
        const kick = hitDecay(t - 6.5);
        ph.position.set(1.9 + shake * .35, -.05 + Math.sin(w + 1) * .05, .7); ph.rotation.set(-.05, -.22 + kick * .05, .04);
        press(t, [[1.7, -.1, .85], [8.8, 0, 1.5]]);
        if (t < 6.2) ph.screen.show(0, 1, ss(1.8, 2.4, t), 1); else if (t < 8.9) ph.screen.show(1, 2, ss(6.2, 6.7, t)); else if (t < 11.2) ph.screen.show(2, 1, ss(8.9, 9.5, t), 1); else ph.screen.show(1, 0, ss(11.2, 11.8, t));
      };
    });
  },
  // The team's Leads page as a manager sees it: new leads arrive, get an owner, and move through the statuses.
  leadboard() {
    const D = 14;
    const PEOPLE = { Ayo: 'coach', Rin: 'engineer', Devon: 'trades' };
    const ROWS = [['Emma Appleseed', 'Pinecrest Group'], ['Freya Lindholm', 'Northscape'], ['Idris Bello', 'Tanner & Kade'], ['Tom Alvarez', 'Fieldstone Design'], ['Samir Haddad', 'Haddad & Lowe']];
    const COL = { New: ['#1A60CE', '#DCEBFF'], Contacted: ['#B86A12', '#FFE9CF'], Qualified: ['#1E8A4A', '#D9F5E2'], Converted: ['#A331B0', '#F8DDFB'] };
    // What each row holds, by time: [from time, owner, status].
    const EVENTS = [[[0, 'Rin', 'Qualified'], [8.2, 'Rin', 'Converted']], [[0, 'Ayo', 'Contacted'], [6.6, 'Ayo', 'Qualified']], [[0, 'Devon', 'New'], [3.6, 'Devon', 'Contacted']], [[0, null, 'New'], [2.2, 'Ayo', 'New'], [9.8, 'Ayo', 'Contacted']], [[5, null, 'New'], [7.4, 'Rin', 'New']]];
    const stateAt = (i, t) => { let v = null; EVENTS[i].forEach(e => { if (t >= e[0]) v = e; }); return v; };
    const face = (x, p, cx, cy, r) => { const img = images[`hero-${p}`], k = img.width / 1224; x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip(); x.drawImage(img, 312 * k, 96 * k, 600 * k, 600 * k, cx - r, cy - r, r * 2, r * 2); x.restore(); };
    const paint = (t, slide, hi) => (x, W, H) => {
      box(x, 0, 0, W, H, 0, '#F5F6F8');
      box(x, 16, 40, 250, H - 56, 20, '#fff', '#E6E8EB', 2);
      wordmark(x, 44, 86, 42, INK, 'left');
      ['Overview', 'Members', 'Cards', 'Leads', 'Insights', 'Settings'].forEach((n, i) => { const y = 156 + i * 58, on = n === 'Leads'; if (on) box(x, 32, y - 25, 218, 50, 12, '#DCEBFF'); say(x, n, 54, y + 1, `${on ? 600 : 400} 24px ${TW}`, INK, 'left'); });
      say(x, 'Leads', 296, 84, `700 44px ${TW}`, INK, 'left');
      box(x, W - 150, 54, 122, 54, 14, '#fff', SKY, 2); say(x, 'Export', W - 89, 82, `600 23px ${TW}`, INK);
      box(x, 282, 124, W - 300, H - 140, 18, '#fff', '#E6E8EB', 2);
      const live = ROWS.map((r, i) => [i, stateAt(i, t)]).filter(v => v[1]);
      const count = n => live.filter(v => v[1][2] === n).length;
      let a = 300;
      [['All', live.length], ...Object.keys(COL).map(n => [n, count(n)])].forEach(([n, c], i) => {
        x.font = `600 21px ${TW}`; const label = `${n} ${c}`, w = x.measureText(label).width + 34;
        box(x, a, 146, w, 42, 21, i ? '#EEF1F5' : SKY); say(x, label, a + w / 2, 168, `600 21px ${TW}`, i ? INK : '#fff'); a += w + 9;
      });
      const heads = [300, 700, 960];
      ['Lead', 'Owner', 'Status'].forEach((n, i) => say(x, n, heads[i], 216, `600 19px ${TW}`, MUTED, 'left'));
      x.fillStyle = '#E6E8EB'; x.fillRect(282, 236, W - 300, 2);
      const ROW = 100, order = live.map(v => v[0]).reverse();
      x.save(); x.beginPath(); x.rect(282, 238, W - 300, H - 256); x.clip();
      order.forEach((i, pos) => {
        const newest = pos === 0 && i === 4 && slide < 1, y = 238 + ROW * pos - (i !== 4 && live.length === 5 ? ROW * (1 - slide) : 0);
        x.globalAlpha = newest ? slide : 1;
        if (hi === i) { box(x, 286, y + 4, W - 308, ROW - 8, 10, '#F1F6FF'); }
        const [name, firm] = ROWS[i], [, owner, status] = stateAt(i, t);
        say(x, name, heads[0], y + 36, `600 28px ${TW}`, INK, 'left'); say(x, firm, heads[0], y + 70, `400 21px ${TW}`, MUTED, 'left');
        if (owner) { face(x, PEOPLE[owner], heads[1] + 24, y + 50, 23); say(x, owner, heads[1] + 56, y + 51, `400 24px ${TW}`, INK, 'left'); }
        else { box(x, heads[1], y + 30, 132, 40, 20, '#fff', SKY, 2); say(x, 'Assign', heads[1] + 66, y + 51, `600 20px ${TW}`, SKY); }
        const [c, bg] = COL[status]; x.font = `600 21px ${TW}`; const pw = x.measureText(status).width + 34;
        box(x, heads[2], y + 30, pw, 40, 20, bg); say(x, status, heads[2] + pw / 2, y + 51, `600 21px ${TW}`, c);
        x.globalAlpha = 1;
        x.fillStyle = '#F0F1F3'; x.fillRect(282, y + ROW - 1, W - 300, 2);
      });
      x.restore();
    };
    return floating(D, 11, root => {
      const screen = tex(1280, 800); screen.flipY = false; screen.anisotropy = 16;
      const mac = laptop(6.5, screen);
      root.add(mac);
      let last = '';
      const CHANGE = [2.2, 3.6, 5, 6.6, 7.4, 8.2, 9.8];
      return t => {
        const w = t / D * Math.PI * 2, tt = t > 13.2 ? 0 : t;
        mac.position.set(0, .35 + Math.sin(w) * .05, 0);
        mac.rotation.set(.22, Math.sin(w) * .1, 0);
        const slide = Math.round(ss(5, 5.5, tt) * 8) / 8;
        const near = CHANGE.findIndex(c => tt >= c - .5 && tt < c + .35);
        const hi = near < 0 ? -1 : [3, 2, 4, 1, 4, 0, 3][near];
        const key = `${EVENTS.map((_, i) => { const v = stateAt(i, tt); return v ? v[0] : '-'; })},${slide},${hi}`;
        if (key !== last) { last = key; screen.paint(paint(tt, tt >= 5 ? slide : 1, hi)); }
      };
    });
  },
  // Someone moves on: their tile leaves, and every lead they brought stays in the team's inbox.
  handover() {
    const st = OLD.team();
    st.scene.traverse(o => { if (o.material?.isShadowMaterial) o.visible = false; });
    const run = st.update, kids = st.root.children, mac = kids[0], members = [kids[1], kids[4], kids[7]], flying = kids.slice(11, 15), keep = new Set([mac, ...members, ...flying]);
    const D = 14;
    mac.position.y = -1.2;
    const home = members.map((m, i) => { m.scale.setScalar(1.32); return [(i - 1) * 2.75, 2.45 - Math.abs(i - 1) * .22, .5]; });
    members[0].traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; } });
    st.update = t => {
      run(Math.min(t, 7.6));
      kids.forEach(c => { if (!keep.has(c)) c.visible = false; });
      const w = t / D * Math.PI * 2, leave = ss(8.2, 9.8, t) * (1 - ss(12.9, 13.7, t));
      members.forEach((m, i) => {
        const [x, y, z] = home[i];
        m.position.set(x + (i ? 0 : -leave * .55), y + Math.sin(w * 3 + i * 2) * .05 - (i ? 0 : leave * .25), z - (i ? 0 : leave * 1.6));
        m.rotation.set(-.03, (i ? 0 : leave * .55), Math.sin(w * 2 + i * 2) * .02 + (i ? 0 : leave * .1));
        m.visible = true;
      });
      members[0].traverse(o => { if (o.isMesh) o.material.opacity = 1 - leave; });
      members[0].visible = leave < .99;
      mac.rotation.set(.02 + Math.sin(w * 2) * .012, Math.sin(w) * .05, 0);
      mac.position.y = -1.2 + Math.sin(w * 2 + 1) * .03;
    };
    const camera = new PerspectiveCamera(22, 1.25, 8, 36);
    camera.position.set(0, -.15, 24); camera.lookAt(0, -.15, 0);
    st.camera = camera; st.still = 11; st.dur = D;
    return st;
  },
  // A new hire: the invite flies to their phone, they accept, and the card in your brand is already there.
  invite() {
    const D = 12;
    return floating(D, .5, root => {
      const env = envelope(3.5, '#1F3B5C', '#172C45', '#2D5280', x => { x.fillStyle = '#fff'; }, inviteBody);
      const ph = phone(5.2, [lockOf(undefined, 'wine'), screenTex(inviteMail), screenTex(inviteLanding), shot('ten-01')]);
      const press = pressFor(ph);
      root.add(env, ph);
      const HOME = [-1.7, -.85, .3], HR = [-.1, .28, -.05], SEND = .9, ARRIVE = SEND + 2.3, BACK = 10.6;
      return t => {
        const w = t / D * Math.PI * 2, d = t - SEND, again = t > BACK;
        const focus = win(3.7, 4.5, BACK - .2, BACK + .6, t), kick = hitDecay(t - ARRIVE);
        ph.position.set(lerp(2.35, .1, focus), Math.sin(w * 2 + 1) * .05, 1.2 + kick * .12 + focus * .5);
        ph.rotation.set(-.05, lerp(-.28, -.06, focus) + kick * .05, lerp(.05, .01, focus));
        const inn = again ? 0 : ss(0, .9, d), shut = again ? 0 : ss(.85, 1.3, d), go = again ? 0 : ss(1.45, 2.3, d), lift = Math.sin(Math.PI * go);
        env.visible = t < ARRIVE || again;
        env.position.set(lerp(HOME[0], 2.35, go), lerp(HOME[1], .5, go) + lift * .8 + Math.sin(w * 2) * .05, lerp(HOME[2], 2.1, go));
        env.rotation.set(HR[0], HR[1] * (1 - go), HR[2] + lift * -.3);
        env.scale.setScalar(Math.max(again ? ss(BACK, BACK + .65, t) : 1 - go * .8, .001));
        const open = 1 - shut;
        env.hinge.rotation.x = -Math.PI * 1.1 * open; env.hinge.position.z = lerp(.066, -.02, open);
        env.letter.position.set(0, lerp(env.LH * .56, 0, inn), .03); env.letter.scale.y = lerp(1, .56, inn); env.letter.visible = shut < .6;
        const fade = go > .85 ? 1 - ss(.85, 1, go) : 1;
        env.traverse(o => { if (o.isMesh) { o.material.transparent = fade < .999; o.material.opacity = fade; } });
        press(t, [[5.4, -.45, -.2], [7.1, 0, -1.35]]);
        if (t < 5.5) ph.screen.show(0, 1, ss(ARRIVE, ARRIVE + .5, t), 1); else if (t < 7.2) ph.screen.show(1, 2, ss(5.5, 6, t), 1); else if (t < BACK) ph.screen.show(2, 3, ss(7.2, 7.8, t), 1); else ph.screen.show(3, 0, ss(BACK, BACK + .6, t));
      };
    });
  },
});
// A new match ball: 12 black pentagons and 20 white hexagons on a sphere, the seams pressed in.
function matchBall(r) {
  const g = (1 + Math.sqrt(5)) / 2, centres = [];
  [[0, 1, g], [0, 1, -g], [0, -1, g], [0, -1, -g], [1, g, 0], [1, -g, 0], [-1, g, 0], [-1, -g, 0], [g, 0, 1], [g, 0, -1], [-g, 0, 1], [-g, 0, -1]].forEach(v => centres.push([...v, 1]));
  [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1], [0, 1 / g, g], [0, 1 / g, -g], [0, -1 / g, g], [0, -1 / g, -g], [1 / g, g, 0], [1 / g, -g, 0], [-1 / g, g, 0], [-1 / g, -g, 0], [g, 0, 1 / g], [g, 0, -1 / g], [-g, 0, 1 / g], [-g, 0, -1 / g]].forEach(v => centres.push([...v, 0]));
  const C = centres.map(([a, b, c, p]) => { const l = Math.hypot(a, b, c); return [a / l, b / l, c / l, p]; });
  const W = 1024, H = 512, col = new OffscreenCanvas(W, H), bmp = new OffscreenCanvas(W, H);
  const cx = col.getContext('2d'), bx = bmp.getContext('2d'), ci = cx.createImageData(W, H), bi = bx.createImageData(W, H);
  for (let j = 0; j < H; j++) {
    const th = (j + .5) / H * Math.PI, st = Math.sin(th), ct = Math.cos(th);
    for (let i = 0; i < W; i++) {
      const ph = (i + .5) / W * Math.PI * 2, x = -Math.cos(ph) * st, y = ct, z = Math.sin(ph) * st;
      let best = -2, second = -2, pent = 0;
      for (const c of C) { const d = (x * c[0] + y * c[1] + z * c[2]) * (c[3] ? .975 : 1); if (d > best) { second = best; best = d; pent = c[3]; } else if (d > second) second = d; }
      const e = Math.min(1, (best - second) / .05), seam = Math.min(1, (best - second) / .007), o = (j * W + i) * 4;
      const base = pent ? [24, 26, 30] : [246, 247, 244], v = seam * .75 + .25;
      ci.data[o] = base[0] * v; ci.data[o + 1] = base[1] * v; ci.data[o + 2] = base[2] * v; ci.data[o + 3] = 255;
      const h = 255 * Math.sqrt(e); bi.data[o] = bi.data[o + 1] = bi.data[o + 2] = h; bi.data[o + 3] = 255;
    }
  }
  cx.putImageData(ci, 0, 0); bx.putImageData(bi, 0, 0);
  const map = new CanvasTexture(col), bump = new CanvasTexture(bmp);
  map.colorSpace = SRGBColorSpace; map.anisotropy = 16;
  const m = new Mesh(new THREE.SphereGeometry(r, 96, 64), new THREE.MeshPhysicalMaterial({ map, bumpMap: bump, bumpScale: 2.2, roughness: .42, clearcoat: .55, clearcoatRoughness: .3, envMapIntensity: 1 }));
  m.castShadow = true;
  const b = new Group(); b.add(m);
  return b;
}
const PEN_NIB = 0;
// A card from the Affiliate page's fan (cardfan.glb): 1 blue, 2 violet, 3 pink, 4 orange, 5 green, 6 charcoal.
function fanCard(n, width) {
  const part = proGltf.cardfan.scene.getObjectByName(`Card${n}`).clone(true);
  part.position.set(0, 0, 0); part.quaternion.identity(); part.scale.set(1, 1, 1);
  const turn = new Group(); turn.add(part);
  const size = new Box3().setFromObject(turn).getSize(new Vector3());
  if (size.y <= size.x && size.y <= size.z) turn.rotation.x = Math.PI / 2;
  else if (size.x <= size.y && size.x <= size.z) turn.rotation.y = Math.PI / 2;
  const g = new Group(); g.add(turn); turn.updateMatrixWorld(true);
  // The fan holds its cards upright; here they lie on their long side so the logo reads.
  { const d = new Box3().setFromObject(g).getSize(new Vector3()); if (d.y > d.x) { g.remove(turn); const lay = new Group(); lay.rotation.z = -Math.PI / 2; lay.add(turn); g.add(lay); g.updateMatrixWorld(true); } }
  const box3 = new Box3().setFromObject(g), now = box3.getSize(new Vector3());
  { const c = box3.getCenter(new Vector3()), top = g.children[0]; top.position.sub(c); }
  g.scale.setScalar(width / Math.max(now.x, now.y));
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}
const blueCard = w => { const c = litCard(w); nfcCards.pop(); c.face.material.map = c.blue; c.body.material.color.set('#1283E6'); return c; };
const glowTex = () => tex(256, 256, (x, W, H) => {
  const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
  g.addColorStop(0, 'rgba(255,250,225,1)'); g.addColorStop(.25, 'rgba(255,236,170,.75)'); g.addColorStop(1, 'rgba(255,214,120,0)');
  x.clearRect(0, 0, W, H); x.fillStyle = g; x.fillRect(0, 0, W, H);
});
// An iPhone call, in the app's demo person: her photo blurred behind everything, and the real six buttons with their icons and labels.
const callIcons = {
  audio(x) { x.beginPath(); x.moveTo(-17, -6); x.lineTo(-9, -6); x.lineTo(1, -15); x.lineTo(1, 15); x.lineTo(-9, 6); x.lineTo(-17, 6); x.closePath(); x.fill(); x.beginPath(); x.arc(2, 0, 9, -.8, .8); x.stroke(); x.beginPath(); x.arc(2, 0, 16, -.8, .8); x.stroke(); },
  video(x) { x.beginPath(); x.roundRect(-19, -11, 26, 22, 6); x.fill(); x.beginPath(); x.moveTo(10, -3); x.lineTo(20, -10); x.lineTo(20, 10); x.lineTo(10, 3); x.closePath(); x.fill(); },
  mute(x) { x.beginPath(); x.roundRect(-6.500, -17, 13, 23, 6.500); x.fill(); x.beginPath(); x.arc(0, -2, 11.500, .1, Math.PI - .1); x.stroke(); x.beginPath(); x.moveTo(0, 10); x.lineTo(0, 17); x.stroke(); },
  add(x) { x.beginPath(); x.arc(-4, -8, 7.500, 0, 7); x.fill(); x.beginPath(); x.moveTo(-18, 15); x.quadraticCurveTo(-17, 2, -4, 2); x.quadraticCurveTo(9, 2, 10, 15); x.closePath(); x.fill(); x.beginPath(); x.moveTo(14, -12); x.lineTo(14, 0); x.moveTo(8, -6); x.lineTo(20, -6); x.stroke(); },
  keys(x) { for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { if (r === 3 && c !== 1) continue; x.beginPath(); x.arc((c - 1) * 11, (r - 1.5) * 11, 3.700, 0, 7); x.fill(); } },
  end(x) { x.rotate(Math.PI * .75); x.lineWidth = 7; x.lineCap = 'butt'; x.beginPath(); x.arc(0, 15, 19, Math.PI * 1.22, Math.PI * 1.78); x.stroke(); [-1, 1].forEach(s => { x.save(); x.translate(s * 13.500, 3.500); x.rotate(s * .55); x.beginPath(); x.roundRect(-5, -4, 10, 11, 3); x.fill(); x.restore(); }); },
};
const callScreen = label => (x, W, H) => {
  const u = W / 440, im = images['hero-realtor'], k = im.width / 1224;
  // Her photo blurred to soft colour, with no face left in it: drawn tiny and stretched back up.
  const small = new OffscreenCanvas(5, 10);
  const sx = small.getContext('2d'); sx.imageSmoothingQuality = 'high'; sx.drawImage(im, 312 * k, 96 * k, 600 * k, 600 * k, -1, -1, 7, 12);
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.drawImage(small, 0, 0, W, H);
  x.fillStyle = 'rgba(16,12,18,.58)'; x.fillRect(0, 0, W, H);
  const g = x.createLinearGradient(0, H * .35, 0, H); g.addColorStop(0, 'rgba(10,8,12,0)'); g.addColorStop(1, 'rgba(10,8,12,.55)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.save(); x.globalCompositeOperation = 'screen'; x.beginPath(); x.rect(W * .6, 0, W * .4, 96 * W / 660); x.clip(); x.drawImage(images['card-dark'], 0, 0, 660, 96, 0, 0, W, 96 * W / 660); x.restore();
  x.save(); x.beginPath(); x.arc(220 * u, 212 * u, 62 * u, 0, 7); x.clip(); x.drawImage(im, 312 * k, 96 * k, 600 * k, 600 * k, 158 * u, 150 * u, 124 * u, 124 * u); x.restore();
  say(x, 'Elena Marchetti', 220 * u, 318 * u, `600 ${34 * u}px ${SYS}`, '#fff');
  say(x, label, 220 * u, 358 * u, `400 ${21 * u}px ${SYS}`, 'rgba(255,255,255,.72)');
  [['audio', 'Audio', 88, 610], ['video', 'FaceTime', 220, 610], ['mute', 'Mute', 352, 610], ['add', 'Add', 88, 758], ['end', 'End', 220, 758], ['keys', 'Keypad', 352, 758]].forEach(([icon, name, a, b]) => {
    const end = icon === 'end';
    x.beginPath(); x.arc(a * u, b * u, 44 * u, 0, 7); x.fillStyle = end ? '#FF3B30' : 'rgba(255,255,255,.17)'; x.fill();
    x.save(); x.translate(a * u, b * u); x.scale(u * 1.12, u * 1.12); x.fillStyle = x.strokeStyle = '#fff'; x.lineWidth = 3; x.lineCap = 'round'; callIcons[icon](x); x.restore();
    say(x, name, a * u, (b + 66) * u, `500 ${16 * u}px ${SYS}`, '#fff');
  });
  box(x, 150 * u, 938 * u, 140 * u, 5 * u, 3 * u, '#fff');
};
Object.assign(PRO, {
  // They tap the tag, your card opens, they call you, and then the keys change hands.
  realtors() {
    const D = 13;
    return floating(D, 10.6, root => {
      const tag = fanCard(6, 2.1), spot = corner(tag, 2.1);
      const set = new Group(), R0 = .56, TURN = 1.05;
      const ring = splitRing(R0); ring.rotation.y = TURN; set.add(ring);
      const onRing = a => new Vector3(Math.cos(a) * R0, Math.sin(a) * R0, 0).applyAxisAngle(new Vector3(0, 1, 0), TURN);
      const k1 = houseKey(3.6, '#D2D4D8', ['KW1', '6 PIN'], 11), k2 = houseKey(3.25, '#C9A25C', ['SC1', '5 PIN'], 29);
      k1.position.copy(onRing(-Math.PI / 2 + .42)); k1.rotation.set(.1, .18, -Math.PI / 2 + .52);
      k2.position.copy(onRing(-Math.PI / 2 - .42)); k2.rotation.set(-.1, -.14, -Math.PI / 2 - .5);
      set.add(k1, k2);
      const ph = phone(5.05, [lockOf(undefined, 'sunset'), shot('card-realtor'), screenTex(callScreen('calling…')), screenTex(callScreen('00:42'))]);
      root.add(tag, set, ph);
      const HAND = [-.35, 1.15, 2.1];
      return t => {
        const w = t / D * Math.PI * 2;
        tag.position.set(-2.2, 1.7 + Math.sin(w * 2) * .05, -.6); tag.rotation.set(-.07, .3, .05);
        const go = tapGo(.6, 1.6, 2.1, 2.9, t);
        reach(ph, root, spot, go, .95, REST2, 1.6, { arc: .35 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        // The call rings, is answered and ends; then the keys are handed over and swing to rest.
        const ringing = t > 3.9 && t < 5.2 ? Math.sin(t * 40) * .012 : 0;
        ph.rotation.z += ringing;
        if (t < 3.8) ph.screen.show(0, 1, ss(1.7, 2.3, t), 1);
        else if (t < 5.3) ph.screen.show(1, 2, ss(3.8, 4.3, t));
        else if (t < 6.9) ph.screen.show(2, 3, ss(5.3, 5.5, t));
        else if (t < 12) ph.screen.show(3, 1, ss(6.9, 7.4, t));
        else ph.screen.show(1, 0, ss(12, 12.6, t));
        const hand = ss(7.5, 8.6, t) * (1 - ss(11.9, 12.8, t));
        set.position.set(lerp(-2.6, HAND[0], hand), lerp(-.2, HAND[1], hand) + Math.sin(Math.PI * hand) * .35 + Math.sin(w * 2) * .03, lerp(-.3, HAND[2], hand));
        const d = t - 8.6, swing = d > 0 ? Math.exp(-d * .7) * Math.sin(d * 3.2) * .36 : 0;
        const lag = (ss(7.55, 8.65, t) - ss(7.45, 8.55, t)) * -1.4;
        set.rotation.set(.05, .28, swing + lag + Math.sin(w * 2) * .025);
      };
    });
  },
  // The deal: the card is flicked across the table, then the contract gets signed.
  sales() {
    const D = 11;
    return floating(D, 8.2, root => {
      const W = 3.05, H = W * 1.32;
      // A grown-up signature: quick, slanted script with one long stroke under it, revealed left to right.
      const SIG = Array.from({ length: 60 }, (_, i) => { const u = i / 59; return [.14 + u * .5, .838]; });
      const paint = k => (x, w, h) => {
        x.fillStyle = '#F7F6F1'; x.fillRect(0, 0, w, h);
        x.fillStyle = '#2E5E4E'; x.fillRect(0, 0, w, h * .1);
        const logo = images['logo-broker'], lw = w * .26, lh = lw * logo.height / logo.width; box(x, w * .07, h * .05 - lh / 2 - h * .01, lw + w * .04, lh + h * .02, h * .008, '#fff'); x.drawImage(logo, w * .09, h * .05 - lh / 2, lw, lh);
        say(x, 'Contract', w * .09, h * .165, `700 ${h * .046}px ${TW}`, '#17181C', 'left');
        x.fillStyle = '#8E949C'; for (let i = 0; i < 13; i++) x.fillRect(w * .09, h * (.225 + i * .034), w * (i % 5 === 4 ? .52 : .82), h * .0065);
        x.fillStyle = '#3C4046'; x.fillRect(w * .1, h * .87, w * .6, h * .004);
        say(x, 'Signature', w * .1, h * .895, `400 ${h * .022}px ${TW}`, '#4A4F55', 'left');
        say(x, 'Nov 4, 2026', w * .92, h * .86, `400 ${h * .022}px ${TW}`, '#4A4F55', 'right');
        if (k > 0) {
          x.save(); x.beginPath(); x.rect(0, h * .76, w * (.12 + k * .66), h * .14); x.clip();
          x.translate(w * .14, h * .85); x.transform(1, -.05, -.32, 1, 0, 0);
          say(x, 'E. Appleseed', 0, 0, `700 ${h * .068}px Caveat, cursive`, '#123A8C', 'left');
          x.strokeStyle = '#123A8C'; x.lineWidth = h * .0035; x.lineCap = 'round'; x.beginPath(); x.moveTo(w * .02, h * .03); x.bezierCurveTo(w * .2, h * .012, w * .36, h * .05, w * .52, h * .006); x.stroke();
          x.restore();
        }
      };
      const sheet = tex(700, 924, paint(0)); sheet.anisotropy = 16;
      const paper = plate(W, H, { r: .02, d: .03, color: '#EDEBE5', rough: .85 });
      const pf = new Mesh(faceGeo(W, H, .02), new MeshStandardMaterial({ map: sheet, roughness: .85, envMapIntensity: .28, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
      pf.position.z = .017; pf.receiveShadow = true; paper.add(pf);
      const pen = prop('stationery_supplies', 3, ['stationery_supplies_pen_fancy'], false);
      const card = fanCard(4, 2.05);
      const ph = phone(5.05, [lockOf(undefined, 'gold'), shot('card-broker')]);
      root.add(paper, pen, card, ph);
      const P = [-1.85, -.55, -1.2], HOME = [-2.75, 2.35, -.4];
      let last = -1;
      return t => {
        const w = t / D * Math.PI * 2;
        const out = ss(.8, 1.5, t), back = ss(2.3, 3, t), go = out * (1 - back), lift = Math.sin(Math.PI * (out < 1 ? out : back));
        const land = kickAt(t, 3), arrive = kickAt(t, 1.5);
        card.position.set(lerp(HOME[0], -.1, go), lerp(HOME[1], 1.7, go) + lift * .25 - land * .05 + Math.sin(w) * .04, lerp(HOME[2], 1.7, go) + lift * .3);
        card.rotation.set(-.08, lerp(.3, -.1, go) + (out + back) * Math.PI * 2, lerp(.03, .1, go));
        ph.position.set(2.3 + arrive * .06, -.1 + Math.sin(w + 1) * .05, .3);
        ph.rotation.set(-.06, -.3 + arrive * .06, .06);
        opens(ph, t, 1.6, D);
        paper.position.set(P[0], P[1] + Math.sin(w) * .03, P[2]); paper.rotation.set(-.06, .22, .04);
        // The signature appears under the nib, in one go.
        const sign = ss(4, 6.2, t) * (1 - ss(10, 10.6, t)), n = Math.round(sign * 59);
        if (n !== last) { last = n; sheet.paint(paint(sign)); }
        const near = win(3.4, 4, 6.2, 6.9, t), [su, sv] = SIG[Math.min(n, 59)];
        const tipX = P[0] - W / 2 + su * W, tipY = P[1] + H / 2 - sv * H;
        // The pen's centre sits half its length up from the nib, leaning as a hand holds it.
        const LEAN = 1.0, half = 1.5, cx = tipX + Math.sin(LEAN) * half, cy = tipY + Math.cos(LEAN) * half;
        pen.position.set(lerp(.1, cx, near), lerp(-2.45, cy, near), lerp(.1, -.75, near));
        pen.rotation.set(0, 0, lerp(.25, Math.PI / 2 - LEAN + PEN_NIB, near));
      };
    });
  },
  // Phone on the left: the glass lifts in a toast on the right, and the card turns as the phone leans in.
  networking() {
    const D = 10;
    return floating(D, 7.4, root => {
      const glass = wineGlass(4.5), card = fanCard(3, 2.3);
      const spot = new Group(), sk = card.scale.x || 1; spot.position.set(-2.3 * .47 / sk, 2.3 * .2 / sk, 0); card.add(spot);
      const ph = phone(5.05, [lockOf(undefined, 'wine'), shot('card')]);
      root.add(glass, card, ph);
      return t => {
        const w = t / D * Math.PI * 2;
        const toast = win(.4, 1.05, 1.5, 2.1, t), clink = kickAt(t, 1.05);
        glass.position.set(3.15 - toast * .3, .1 + toast * .3 + Math.sin(w * 2) * .05, -.9);
        glass.rotation.set(.02, 0, -.05 + toast * .24 - clink * .07 + Math.sin(w * 3) * .025);
        const spin = ss(1.9, 3, t) + ss(8.3, 9.3, t);
        card.position.set(1.1, 1.1 + Math.sin(w * 2 + 1) * .07, .6);
        card.rotation.set(-.1, -.3 + spin * Math.PI * 2, -.08 + Math.sin(w * 2) * .04);
        const go = win(3.1, 3.8, 4.4, 5.1, t);
        reach(ph, root, spot, go, -.6, { p: [-2.4, -.1], r: [-.06, .3, -.06] }, 1.65);
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 3.95, D);
      };
    });
  },
  // The phone in the middle of the tools: the tape's blade runs out and snaps back, and the striped card waits top right.
  trades() {
    const D = 10;
    return floating(D, 7.8, root => {
      const hammer = prop('cross_pein_hammer', 4.2), pliers = prop('pliers', 2.5);
      const tape = prop('measuring_tape_01', 2.5, null, true);
      const card = fanCard(4, 2.3), spot = new Group();
      { const k = card.scale.x || 1; spot.position.set(-2.3 * .47 / k, 2.3 * .2 / k, 0); card.add(spot); }
      const unit = new Group(); unit.add(tape);
      const marks = tex(1536, 96, (x, W, H) => {
        x.fillStyle = '#F2C230'; x.fillRect(0, 0, W, H); x.fillStyle = '#17181C';
        for (let i = 0; i <= 60; i++) { const big = i % 10 === 0, mid = i % 5 === 0; x.fillRect(i * W / 60, 0, big ? 5 : 3, big ? H * .62 : mid ? H * .46 : H * .28); if (big && i) say(x, String(i), i * W / 60 + 10, H * .72, `700 30px ${TW}`, '#17181C', 'left'); }
      });
      marks.anisotropy = 16; marks.wrapS = THREE.ClampToEdgeWrapping;
      const bladeGeo = new PlaneGeometry(1, .18); bladeGeo.translate(.5, 0, 0);
      const blade = new Mesh(bladeGeo, new MeshStandardMaterial({ map: marks, metalness: .45, roughness: .36, envMapIntensity: 1.1, side: DoubleSide }));
      const hook = new Mesh(new THREE.BoxGeometry(.05, .24, .1), new MeshStandardMaterial({ color: '#8C9097', metalness: 1, roughness: .35 }));
      const bladeRoot = new Group(); bladeRoot.position.set(1.22, -.64, 0); bladeRoot.add(blade, hook); unit.add(bladeRoot);
      const ph = phone(5.05, [lockOf(undefined, 'ember'), shot('card-trades')]);
      root.add(hammer, pliers, unit, card, ph);
      return t => {
        const w = t / D * Math.PI * 2;
        const pull = ss(.5, 1.05, t) * .55 + ss(1.3, 1.8, t) * .45, snap = ss(2.6, 2.86, t), len = .02 + pull * (1 - snap) * 1.05;
        blade.scale.x = len; marks.repeat.x = len / 3; hook.position.x = len;
        const jolt = hitDecay(t - 2.86);
        unit.position.set(.95 - jolt * .1, -1.75 + Math.abs(jolt) * .14 + Math.sin(w + 1) * .04, .3);
        unit.rotation.set(.04, -.12, -.03 + jolt * .1);
        hammer.position.set(-3.3, .9 + Math.abs(jolt) * .08 + Math.sin(w * 2) * .05, -1.6);
        hammer.rotation.set(.2, .5, -.3 + jolt * .05 + Math.sin(w * 2) * .03);
        pliers.position.set(-3.3, -2.45 + Math.abs(jolt) * .1 + Math.sin(w * 2 + 2) * .04, -.6);
        pliers.rotation.set(.12, -.25, -1.3 + jolt * .1);
        card.position.set(2.75, 1.75 + Math.sin(w * 2 + 1) * .06, .1); card.rotation.set(-.07, -.3, -.05);
        const go = win(3.3, 4.2, 4.9, 5.7, t);
        reach(ph, root, spot, go, -.85, { p: [-.35, -.1], r: [-.05, .1, -.02] }, 1.5);
        ph.position.y += Math.sin(w + 2) * .05 * (1 - go);
        opens(ph, t, 4.35, D);
      };
    });
  },
  // The camera is the star: large and low, it turns and fires; the blue card sits above it and the phone comes in from the right.
  photographers() {
    const D = 10;
    return floating(D, 7.4, root => {
      const cam = prop('Camera_01', 6.9);
      const card = fanCard(1, 1.9), spot = corner(card, 1.9);
      const flash = new Mesh(new PlaneGeometry(3.6, 3.6), new MeshBasicMaterial({ map: glowTex(), transparent: true, depthWrite: false, toneMapped: false }));
      const ph = phone(4.5, [lockOf(undefined, 'mono'), shot('card-photographer')]);
      root.add(cam, card, flash, ph);
      const FIRE = [1.2, 1.75];
      return t => {
        const w = t / D * Math.PI * 2, shutter = FIRE.reduce((a, f) => a + hitDecay(t - f), 0), aim = win(.3, 1, 2.3, 3, t);
        cam.position.set(-.9, -1 + Math.sin(w) * .05, -1.7);
        cam.rotation.set(.2 + shutter * .02, lerp(.25 + Math.sin(w * 2) * .3, .02, aim) + shutter * .02, -.06);
        const f = FIRE.reduce((a, b) => Math.max(a, t > b ? Math.exp(-(t - b) * 11) : 0), 0);
        flash.visible = f > .01; flash.material.opacity = f; flash.position.set(-.45, -.82, .6); flash.scale.setScalar(.8 + f * .8);
        const spin = ss(2.7, 3.6, t);
        card.position.set(-2.1, 2.05 + Math.sin(w * 2 + 1) * .05, .3); card.rotation.set(-.08, .3 + spin * Math.PI * 2, .08);
        const go = tapGo(3.65, 4.25, 4.85, 5.6, t);
        reach(ph, root, spot, go, 1, { p: [2.7, .2], r: [-.05, -.34, .07] }, 1.5, { arc: -.2 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 4.4, D);
      };
    });
  },
  // No more stack of CVs: page after page fans out and goes into the phone, as leads.
  recruiters() {
    const D = 10;
    return floating(D, .4, root => {
      const W = 3.1, H = W * 1.38;
      const page = i => { const t = tex(540, 745, (x, w, h) => { x.fillStyle = '#FAFAF7'; x.fillRect(0, 0, w, h); x.fillStyle = ['#1A60CE', '#2E5E4E', '#B4472B', '#6D466B', '#17324D', '#8A6A1F'][i % 6]; x.fillRect(0, 0, w, 54); say(x, ['Brochure', 'Price list', 'Contact sheet', 'Flyer', 'Handout', 'Notes'][i % 6], 34, 100, `700 34px ${TW}`, INK, 'left'); x.fillStyle = '#C9CDD3'; for (let k = 0; k < 13; k++) x.fillRect(34, 150 + k * 42, w * (k % 4 === 3 ? .5 : .84), 7); }); t.anisotropy = 16; const c = plate(W, H, { r: .02, d: .012, color: '#EDEBE5', rough: .85 }); const f = new Mesh(faceGeo(W, H, .02), new MeshStandardMaterial({ map: t, roughness: .8, envMapIntensity: .6, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })); f.position.z = .007; f.receiveShadow = true; c.add(f); return c; };
      const pages = Array.from({ length: 7 }, (_, i) => { const p = page(i); root.add(p); return p; });
      const ph = phone(5.05, [shot('card-recruiter'), shot('recruiter-leads')]);
      root.add(ph);
      const STACK = [-1.85, 0, -.6], PH = [2.25, -.05, 1.3], tgt = new Vector3();
      return t => {
        const w = t / D * Math.PI * 2;
        ph.position.set(PH[0], PH[1] + Math.sin(w + 1) * .05, PH[2]); ph.rotation.set(-.05, -.28, .05);
        let kick = 0;
        pages.forEach((p, i) => {
          const a = 1.2 + (6 - i) * .55, k = ss(a, a + .75, t), arrive = a + .75, back = ss(9 + i * .02, 9.7 + i * .02, t);
          kick += hitDecay(t - arrive) * .55;
          const hop = Math.sin(Math.PI * k), rest = [STACK[0] + ((i * 5) % 3 - 1) * .04, STACK[1] + ((i * 3) % 3 - 1) * .03, STACK[2] + i * .03];
          p.visible = k < 1 || back > 0;
          p.position.set(lerp(rest[0], PH[0], k), lerp(rest[1], PH[1] + .6, k) + hop * .6, lerp(rest[2], PH[2] + .75, k));
          p.rotation.set(-.04, lerp(.3, -.28, k), ((i * 37) % 11 - 5) * .012 + hop * (i % 2 ? .4 : -.4));
          p.scale.setScalar(Math.max(lerp(1, .18, k), .001));
          const o = (1 - ss(.85, 1, k)) * (k >= 1 ? 0 : 1) + (k >= 1 ? back : 0);
          p.traverse(m => { if (m.isMesh) { m.material.transparent = o < .999; m.material.opacity = o; } });
          if (k >= 1 && back > 0) { p.position.set(...rest); p.rotation.set(-.04, .3, ((i * 37) % 11 - 5) * .012); p.scale.setScalar(1); }
        });
        ph.rotation.y += kick * .05; ph.position.z += kick * .08;
        ph.screen.show(0, 1, ss(1, 1.6, t) * (1 - ss(9.1, 9.7, t)), 1);
      };
    });
  },
  // A gold medal swings on its ribbon, a dumbbell goes up and down, and the coach's coin opens the card.
  coaches() {
    const D = 9.6;
    return floating(D, 6.4, root => {
      // The medal: machined gold with a laurel and a 1, on a striped ribbon.
      const face = tex(512, 512, (x, W, H) => {
        x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
        x.strokeStyle = '#8C8C8C'; x.lineWidth = 7; x.beginPath(); x.arc(W / 2, H / 2, W * .4, 0, 7); x.stroke();
        for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2; x.save(); x.translate(W / 2 + Math.cos(a) * W * .33, H / 2 + Math.sin(a) * W * .33); x.rotate(a + .9); x.fillStyle = '#9A9A9A'; x.beginPath(); x.ellipse(0, 0, 21, 8, 0, 0, 7); x.fill(); x.restore(); }
        say(x, '1', W / 2, H / 2 + 8, `700 170px ${TW}`, '#6E6E6E');
      });
      face.colorSpace = THREE.NoColorSpace;
      const gold = new MeshStandardMaterial({ color: '#E2B23C', metalness: 1, roughness: .28, bumpMap: face, bumpScale: 3, envMapIntensity: 1.45, map: null });
      const R0 = 1.02;
      const disc = new Mesh(new THREE.CylinderGeometry(R0, R0, .1, 96, 1), [new MeshStandardMaterial({ color: '#C99A2E', metalness: 1, roughness: .32, envMapIntensity: 1.3 }), gold, gold]);
      disc.rotation.x = Math.PI / 2; disc.castShadow = true;
      const stripes = tex(256, 64, (x, W, H) => { x.fillStyle = '#1A60CE'; x.fillRect(0, 0, W, H); x.fillStyle = '#fff'; x.fillRect(W * .38, 0, W * .24, H); x.fillStyle = '#FFC700'; x.fillRect(W * .46, 0, W * .08, H); });
      const strap = sd => { const m = new Mesh(new THREE.BoxGeometry(.72, 3, .012), new MeshStandardMaterial({ map: stripes, roughness: .62 })); m.position.set(sd * .62, 2.35, -.02 - (sd > 0 ? .02 : 0)); m.rotation.z = sd * .4; m.castShadow = true; return m; };
      const ring = new Mesh(new THREE.TorusGeometry(.15, .035, 16, 48), new MeshStandardMaterial({ color: '#E2B23C', metalness: 1, roughness: .28 })); ring.position.y = R0 + .1;
      const medal = new Group(); medal.add(disc, ring, strap(-1), strap(1));
      medal.scale.setScalar(.92);
      // The dumbbell: knurled steel bar, hex rubber heads.
      const dumb = new Group();
      const bar = new Mesh(new THREE.CylinderGeometry(.13, .13, 2.1, 32), new MeshStandardMaterial({ color: '#C9CCD2', metalness: 1, roughness: .3, envMapIntensity: 1.35 })); bar.rotation.z = Math.PI / 2; bar.castShadow = true; dumb.add(bar);
      [-1, 1].forEach(sd => { const rubber = new MeshStandardMaterial({ color: '#17181C', roughness: .46, flatShading: true, envMapIntensity: 1.1 }); const head = new Mesh(new THREE.CylinderGeometry(.56, .56, .72, 6), rubber); head.rotation.z = Math.PI / 2; head.position.x = sd * 1.3; head.castShadow = true; const cap = new Mesh(new THREE.CylinderGeometry(.27, .27, .02, 40), new MeshStandardMaterial({ color: '#D6D8DC', metalness: 1, roughness: .25 })); cap.rotation.z = Math.PI / 2; cap.position.x = sd * 1.67; dumb.add(head, cap); });
      const coin = realTag('Tag1Sticker', 1.15);
      const ph = phone(5.05, [lockOf(undefined, 'teal'), shot('card-coach')]);
      root.add(medal, dumb, coin, ph);
      const P = 2.4;
      return t => {
        const w = t / D * Math.PI * 2, rep = (1 - Math.cos((t % P) / P * Math.PI * 2)) / 2;
        // The medal hangs from its ribbon and keeps swinging.
        const swing = Math.sin(w * 3) * .15;
        medal.position.set(-3 + Math.sin(swing) * 2.6, -.4 + (1 - Math.cos(swing)) * 1.4, -.8);
        medal.rotation.set(-.04, .34 + Math.sin(w * 2) * .16, swing * 1);
        // One slow, controlled rep after another.
        dumb.position.set(-.85, -2.3 + rep * 1.15, .1);
        dumb.rotation.set(.32 + rep * .18, .5, .1 - rep * .14);
        coin.position.set(-1.1, 2.05 + Math.sin(w * 2) * .06, .1); coin.rotation.set(-.08, .3, 0);
        const go = win(2.4, 3.2, 3.8, 4.6, t);
        reach(ph, root, coin, go, .85, REST2, 1.7);
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 3.35, D);
      };
    });
  },
  // Engineering and technology: machined gears mesh and turn, and the phone taps the NFC.cool card.
  engineers() {
    const D = 10, M = .105;
    const gear = (n, color, rough) => {
      const R = n * M / 2, out = R + M * .92, root0 = R - M * 1.1, sh = new Shape(), step = Math.PI * 2 / n;
      for (let i = 0; i < n; i++) {
        const a = i * step, pts = [[root0, -.5], [root0, -.31], [out, -.16], [out, .16], [root0, .31]];
        pts.forEach(([r, k], j) => { const x = Math.cos(a + k * step) * r, y = Math.sin(a + k * step) * r; i === 0 && j === 0 ? sh.moveTo(x, y) : sh.lineTo(x, y); });
      }
      sh.closePath();
      const bore = new THREE.Path(); bore.absarc(0, 0, Math.max(.12, R * .24), 0, Math.PI * 2, true); sh.holes.push(bore);
      // Lightening holes in the larger wheels.
      if (n >= 18) for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, h = new THREE.Path(); h.absarc(Math.cos(a) * R * .56, Math.sin(a) * R * .56, R * .13, 0, Math.PI * 2, true); sh.holes.push(h); }
      const geo = new ExtrudeGeometry(sh, { depth: .26, bevelEnabled: true, bevelSize: .016, bevelThickness: .016, bevelSegments: 2, curveSegments: 28 });
      geo.translate(0, 0, -.13);
      const m = new Mesh(geo, new MeshStandardMaterial({ color, metalness: 1, roughness: rough, envMapIntensity: 1.45 }));
      m.castShadow = m.receiveShadow = true;
      const g = new Group(); g.add(m); g.R = R; g.n = n;
      const hub = new Mesh(new THREE.CylinderGeometry(Math.max(.13, R * .26), Math.max(.13, R * .26), .34, 40), new MeshStandardMaterial({ color: '#2B2D33', metalness: .8, roughness: .35 })); hub.rotation.x = Math.PI / 2; g.add(hub);
      return g;
    };
    return floating(D, 7.4, root => {
      const big = gear(26, '#BFC3C9', .27), mid = gear(17, '#C9A25C', .3), small = gear(12, '#AEB3BA', .25);
      const train = new Group(); train.add(big, mid, small);
      const T1 = -.32, T2 = .95, DIST = (a, b) => a.R + b.R + M * .06;
      mid.position.set(Math.cos(T1) * DIST(big, mid), Math.sin(T1) * DIST(big, mid), 0);
      small.position.set(mid.position.x + Math.cos(T2) * DIST(mid, small), mid.position.y + Math.sin(T2) * DIST(mid, small), 0);
      const card = fanCard(2, 2.2), spot = corner(card, 2.2);
      const ph = phone(5.05, [lockOf(undefined, 'mono'), shot('card-engineer')]);
      root.add(train, card, ph);
      // Each wheel's angle follows from the one that drives it, so the teeth stay in mesh.
      const follow = (phi, a, b, th) => -phi * a.n / b.n + th * (1 + a.n / b.n) + Math.PI / b.n;
      return t => {
        const w = t / D * Math.PI * 2, go = win(1.8, 2.6, 3.2, 4, t);
        // One full turn per loop; a little kick when the card is tapped.
        const p1 = w + hitDecay(t - 2.6) * .025, p2 = follow(p1, big, mid, T1), p3 = follow(p2, mid, small, T2);
        big.rotation.z = p1; mid.rotation.z = p2; small.rotation.z = p3;
        train.position.set(-3.05, -1.15 + Math.sin(w) * .04, -1.3);
        train.rotation.set(-.26 + Math.sin(w) * .03, .42 + Math.sin(w) * .06, .05);
        card.position.set(-1.4, 2.15 + Math.sin(w * 2 + 1) * .05, .5); card.rotation.set(-.09, .3, .05);
        reach(ph, root, spot, go, .9, REST2, 1.6);
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 2.75, D);
      };
    });
  },
  // A client report on the table: its chart draws itself, the pen swoops in, rings the 18% and underlines the result with one fast stroke.
  consultants() {
    const D = 10;
    return floating(D, 7.4, root => {
      const W = 3.5, H = W * 1.3, BARS = [.28, .36, .33, .47, .55, .68, .84];
      // The ink's path on the page, from the size of the words it marks. The nib follows these same points, so pen and line can't part.
      const INK_BLUE = '#12315F', STEPS = 40;
      let U1 = .6, C18 = .5, RX = .1;
      const loopAt = p => { const a = -2.5 + p * Math.PI * 2 * 1.14; return [C18 + Math.cos(a) * RX * (1 + .1 * p), .69 + Math.sin(a) * .036 * (1 - .1 * p)]; };
      const underAt = p => [lerp(.075, U1 + .035, p), .727 + Math.sin(p * Math.PI) * .004 - Math.pow(p, 7) * .022];
      const paint = (k, ring, under) => (x, w, h) => {
        x.fillStyle = '#FBFAF7'; x.fillRect(0, 0, w, h);
        x.fillStyle = '#1F3B5C'; x.fillRect(0, 0, w, h * .012);
        say(x, 'Quarterly review', w * .08, h * .085, `700 ${h * .04}px ${TW}`, INK, 'left');
        say(x, 'Prepared for Northscape', w * .08, h * .13, `400 ${h * .024}px ${TW}`, MUTED, 'left');
        const base = h * .62, top = h * .2, bw = w * .084;
        x.strokeStyle = '#DEDFE3'; x.lineWidth = h * .002;
        [0, .33, .66, 1].forEach(v => { const y = base - (base - top) * v; x.beginPath(); x.moveTo(w * .08, y); x.lineTo(w * .92, y); x.stroke(); });
        BARS.forEach((v, i) => { const e = ss(i * .09, i * .09 + .4, k), bh = (base - top) * v * e; x.fillStyle = i === BARS.length - 1 ? '#1A60CE' : '#AFC3DD'; x.fillRect(w * .1 + i * w * .115, base - bh, bw, bh); });
        const font = `700 ${h * .05}px ${TW}`;
        say(x, 'Revenue up 18%', w * .08, h * .69, font, INK, 'left');
        x.font = font;
        { const all = x.measureText('Revenue up 18%').width / w, tail = x.measureText('18%').width / w; U1 = .08 + all; C18 = U1 - tail / 2; RX = tail / 2 + .022; }
        // Fast ink: thin at both ends of the stroke, full in the middle.
        const ink = (at, p) => { x.strokeStyle = INK_BLUE; x.lineCap = 'round'; const n = Math.round(p * STEPS); for (let i = 0; i < n; i++) { const a = at(i / STEPS), b = at((i + 1) / STEPS); x.lineWidth = h * (.0028 + .0034 * Math.sin((i + .5) / STEPS * Math.PI)); x.beginPath(); x.moveTo(a[0] * w, a[1] * h); x.lineTo(b[0] * w, b[1] * h); x.stroke(); } };
        if (ring > 0) ink(loopAt, ring);
        if (under > 0) ink(underAt, under);
        x.fillStyle = '#C9CDD3'; for (let i = 0; i < 5; i++) x.fillRect(w * .08, h * (.76 + i * .04), w * (i === 4 ? .46 : .84), h * .006);
      };
      const sheet = tex(700, 910, paint(0, 0, 0));
      sheet.anisotropy = 16;
      const under = plate(W, H, { r: .02, d: .03, color: '#EDEBE5', rough: .85 });
      const page = new Mesh(faceGeo(W, H, .02), new MeshStandardMaterial({ map: sheet, roughness: .78, envMapIntensity: .55, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
      page.position.z = .017; page.receiveShadow = true; under.add(page);
      const pen = prop('stationery_supplies', 3, ['stationery_supplies_pen_fancy'], false);
      const card = fanCard(6, 1.9);
      const spot = new Group(), sk = card.scale.x || 1; spot.position.set(-1.9 * .47 / sk, 1.9 * .2 / sk, 0); card.add(spot);
      const ph = phone(5.05, [lockOf(undefined, 'gold'), shot('ten-01')]);
      // The pen rides on the page, so its nib stays on the paper however the page moves.
      under.add(pen); pen.rotation.order = 'ZYX';
      root.add(under, card, ph);
      let last = '';
      return t => {
        const w = t / D * Math.PI * 2, reset = 1 - ss(9.1, 9.6, t), k = ss(.3, 2, t) * reset;
        const ringP = ss(2.45, 3.2, t), hopP = ss(3.2, 3.36, t), lineP = ss(3.36, 3.82, t);
        const ring = ringP * reset, line = lineP * reset;
        const key = `${Math.round(k * 30)},${Math.round(ring * STEPS)},${Math.round(line * STEPS)}`;
        if (key !== last) { last = key; sheet.paint(paint(k, ring, line)); }
        under.position.set(.8, -.7 + Math.sin(w) * .04, -1.1);
        under.rotation.set(-.08, -.24, -.05);
        // The pen sweeps in, writes and sweeps away. Held like a real pen: raised off the page, leaning with the stroke.
        const near = win(1.85, 2.45, 3.86, 4.6, t);
        const a = loopAt(ringP), b = underAt(lineP), u = lineP > 0 || hopP >= 1 ? b[0] : lerp(a[0], b[0], hopP), v = lineP > 0 || hopP >= 1 ? b[1] : lerp(a[1], b[1], hopP);
        const hop = Math.sin(hopP * Math.PI);
        const LEAN = 1.02 + Math.sin(ringP * Math.PI * 2.3) * .16 * (1 - lineP) - Math.sin(lineP * Math.PI) * .26;
        const TILT = .42 + hop * .14 + Math.sin(lineP * Math.PI) * .06, half = 1.5;
        const nx = (u - .5) * W, ny = (.5 - v) * H, nz = .03 + hop * .1;
        const cx = nx + Math.cos(TILT) * Math.sin(LEAN) * half, cy = ny + Math.cos(TILT) * Math.cos(LEAN) * half, cz = nz + Math.sin(TILT) * half;
        const arc = Math.sin(near * Math.PI) * (1 - ss(.82, 1, near)) * .55;
        pen.position.set(lerp(2.15, cx, near), lerp(-1.75, cy, near) + Math.sin(w * 2) * .03 * (1 - near), lerp(.28, cz, near) + arc);
        pen.rotation.set(0, lerp(0, -TILT, near), lerp(.5, Math.PI / 2 - LEAN + PEN_NIB, near) + Math.sin(near * Math.PI) * (1 - ss(.7, 1, near)) * .5);
        card.position.set(3.2, 1.6 + Math.sin(w * 2 + 1) * .05, -.1); card.rotation.set(-.08, -.26, -.05);
        const go = tapGo(4.7, 5.6, 6.1, 6.9, t);
        reach(ph, root, spot, go, -1.12, { p: [-2.45, -.1], r: [-.06, .3, -.06] }, 1.5, { arc: .4 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 5.75, D);
      };
    });
  },
});

// Real scans, or nothing: these replace every prop that was built in code.
const CODE = [
  [['import', '#C678DD'], [' BusinessCard', '#E6E8EB']], [],
  [['struct', '#C678DD'], [' Lead', '#61AFEF'], [': ', '#E6E8EB'], ['Identifiable', '#E5C07B'], [' {', '#E6E8EB']],
  [['    let', '#C678DD'], [' id', '#E06C75'], [': ', '#E6E8EB'], ['UUID', '#E5C07B']],
  [['    var', '#C678DD'], [' status', '#E06C75'], [' = ', '#E6E8EB'], ['Status', '#E5C07B'], ['.new', '#61AFEF']],
  [['    var', '#C678DD'], [' owner', '#E06C75'], [': ', '#E6E8EB'], ['Member', '#E5C07B'], ['?', '#E6E8EB']], [['}', '#E6E8EB']], [],
  [['func', '#C678DD'], [' assign', '#61AFEF'], ['(_ lead: ', '#E6E8EB'], ['Lead', '#E5C07B'], [') async {', '#E6E8EB']],
  [['    let', '#C678DD'], [' next', '#E06C75'], [' = ', '#E6E8EB'], ['await', '#C678DD'], [' team.nextFree()', '#E6E8EB']],
  [['    lead', '#E06C75'], ['.owner = next', '#E6E8EB']],
  [['    try await', '#C678DD'], [' inbox.save(lead)', '#E6E8EB']], [['}', '#E6E8EB']], [],
  [['// Runs on every new tap', '#7F848E']],
  [['func', '#C678DD'], [' onTap', '#61AFEF'], ['(card: ', '#E6E8EB'], ['Card', '#E5C07B'], [') {', '#E6E8EB']],
  [['    open', '#61AFEF'], ['(card.url)', '#E6E8EB']], [['}', '#E6E8EB']],
];
Object.assign(PRO, {
  // Lab work: the microscope turns slowly, and the phone taps the card.
  doctors() {
    const D = 10;
    return floating(D, 7.4, root => {
      const scope = prop('industrial_microscope', 4.3), card = fanCard(5, 2.15), spot = corner(card, 2.15);
      const ph = phone(5.05, [lockOf(undefined, 'teal'), shot('card-doctor')]);
      root.add(scope, card, ph);
      return t => {
        const w = t / D * Math.PI * 2;
        scope.position.set(-2.25, -1.1 + Math.sin(w) * .04, -1.3); scope.rotation.set(.05, -.2 + w, 0);
        card.position.set(-1.65, 1.8 + Math.sin(w * 2 + 1) * .05, .7); card.rotation.set(-.08, .3, .06);
        const go = tapGo(2.3, 2.8, 3.4, 4.2, t);
        reach(ph, root, spot, go, .92, REST2, 1.8, { roll: .6 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 2.95, D);
      };
    });
  },
  // The tools of the trade, all scanned, around the phone; the orange card waits top right.
  trades() {
    const D = 10;
    return floating(D, 7.8, root => {
      const hammer = prop('cross_pein_hammer', 4.2), pliers = prop('pliers', 2.6), wrench = prop('combination_wrench', 3, null, true);
      const card = fanCard(4, 2.3), spot = new Group();
      { const k = card.scale.x || 1; spot.position.set(-2.3 * .47 / k, 2.3 * .2 / k, 0); card.add(spot); }
      const ph = phone(5.05, [lockOf(undefined, 'ember'), shot('card-trades')]);
      root.add(hammer, pliers, wrench, card, ph);
      return t => {
        const w = t / D * Math.PI * 2, kick = hitDecay(t - 4.2);
        hammer.position.set(-3.3, .85 + Math.sin(w * 2) * .05, -1.6); hammer.rotation.set(.2, .5 + Math.sin(w) * .12, -.3 + Math.sin(w * 2) * .03);
        pliers.position.set(-3.3, -2.4 + Math.sin(w * 2 + 2) * .04, -.6); pliers.rotation.set(.12, -.25 + Math.sin(w + 1) * .12, -1.3);
        wrench.position.set(2.75, -1.45 + Math.sin(w * 2 + 1) * .04, -.3); wrench.rotation.set(-.1, -.25, 1.1 + Math.sin(w) * .22);
        card.position.set(2.75, 1.75 + Math.sin(w * 2 + 1) * .06 + Math.abs(kick) * .05, .1); card.rotation.set(-.07, -.3, -.05);
        const go = tapGo(3.5, 4.2, 4.9, 5.7, t);
        reach(ph, root, spot, go, -.85, { p: [-.35, -.1], r: [-.05, .1, -.02] }, 1.5, { arc: -.3, roll: 1.4 });
        ph.position.y += Math.sin(w + 2) * .05 * (1 - go);
        opens(ph, t, 4.35, D);
      };
    });
  },
  // Dinner and a show: the silver cover lifts off the plate and your card is what's served; the old stage mic waits beside it.
  networking() {
    const D = 10;
    const lathe = (pts, material, segs = 96) => {
      const m = new Mesh(new THREE.LatheGeometry(new THREE.SplineCurve(pts.map(([a, b]) => new THREE.Vector2(a, b))).getPoints(140), segs), material);
      m.castShadow = m.receiveShadow = true; return m;
    };
    const straight = (pts, material) => {
      const m = new Mesh(new THREE.LatheGeometry(pts.map(([a, b]) => new THREE.Vector2(a, b)), 96), material);
      m.castShadow = m.receiveShadow = true; return m;
    };
    const silver = new MeshStandardMaterial({ color: '#E6E7EA', metalness: 1, roughness: .34, envMapIntensity: 1.5, side: DoubleSide });
    return floating(D, 7.4, root => {
      // The plate: white porcelain with a thin silver line on the rim.
      const R = 1.62, plate = new Group();
      const china = new THREE.MeshPhysicalMaterial({ color: '#E6E3DC', roughness: .3, metalness: 0, clearcoat: .35, clearcoatRoughness: .25, envMapIntensity: .85 });
      plate.add(lathe([[0, 0], [.5, 0], [.6, .012], [.66, .05], [.82, .1], [.97, .13], [1, .145], [.985, .16], [.82, .13], [.66, .085], [.6, .056], [.5, .05], [0, .05]].map(([a, b]) => [a * R, b * R]), china));
      const line = new Mesh(new THREE.TorusGeometry(R * .992, .024, 12, 128), silver); line.rotation.x = Math.PI / 2; line.position.y = R * .15; line.castShadow = true; plate.add(line);
      // The card lies in the well of the plate.
      const CW = 1.62, card = fanCard(3, CW), bed = new Group();
      bed.rotation.x = -Math.PI / 2; bed.position.y = .05 * R + .035; bed.add(card); plate.add(bed);
      const spot = corner(card, CW);
      // The cover: one polished dome with a stem and a round knob.
      const C = 1.3, cover = new Group();
      cover.add(lathe([[1.045, 0], [1.03, .02], [1, .05], [.975, .2], [.9, .42], [.76, .63], [.56, .8], [.32, .91], [.12, .96], [0, .965]].map(([a, b]) => [a * C, b * C]), silver));
      cover.add(lathe([[.085, .955], [.05, 1], [.05, 1.04], [.1, 1.08], [.135, 1.13], [.12, 1.19], [.06, 1.225], [0, 1.23]].map(([a, b]) => [a * C, b * C]), silver));
      // The microphone: a 1950s stage mic. Chrome ribs around a dark core, on a short swivel stem.
      const chrome = new MeshStandardMaterial({ color: '#EDEEF0', metalness: 1, roughness: .2, envMapIntensity: 1.5 });
      const core = new MeshStandardMaterial({ color: '#141518', metalness: .3, roughness: .62 });
      const mic = new Group(), mi = new Group(), head = new Group(); mic.add(mi); mi.add(head);
      const HR = .56, HH = .42;
      // Half the head's width at height y: a capsule, straight in the middle and round at both ends.
      const widthAt = y => { const d = Math.max(0, Math.abs(y) - HH); return Math.sqrt(Math.max(0, HR * HR - d * d)); };
      const profile = (k, from, to, n = 48) => { const o = []; for (let i = 0; i <= n; i++) { const y = lerp(from, to, i / n); o.push([widthAt(y) * k, y]); } return o; };
      head.add(straight(profile(.9, -(HH + HR) * .96, (HH + HR) * .96), core));
      // Solid caps on top and at the bottom.
      head.add(straight([...profile(1, HH + .1, HH + HR), [0, HH + HR]], chrome));
      head.add(straight([[0, -(HH + HR)], ...profile(1, -(HH + HR), -(HH + .1))], chrome));
      // The ribs between them.
      const RIBS = 9;
      for (let i = 0; i < RIBS; i++) {
        const y = lerp(-(HH + .1), HH + .1, i / (RIBS - 1));
        const rib = new Mesh(new THREE.TorusGeometry(widthAt(y), .027, 12, 96), chrome);
        rib.rotation.x = Math.PI / 2; rib.position.y = y; rib.castShadow = true; head.add(rib);
      }
      // One bar down the middle, front and back.
      [1, -1].forEach(side => {
        const pts = profile(1, -(HH + .3), HH + .3, 20).map(([r, y]) => new Vector3(0, y, side * (r + .004)));
        const bar = new Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, .042, 10), chrome);
        bar.castShadow = true; head.add(bar);
      });
      head.scale.z = .76;
      head.position.y = .62;
      // Below the head: neck, swivel, stem and the threaded collar.
      const NB = .62 - (HH + HR) * .98;
      mi.add(straight([[.1, NB + .02], [.1, NB - .05], [.15, NB - .08], [.17, NB - .15], [.15, NB - .22], [.085, NB - .26], [.075, NB - .3], [.075, NB - .9], [.1, NB - .92], [.16, NB - .94], [.17, NB - 1.04], [.12, NB - 1.06], [0, NB - 1.06]], chrome));
      const ph = phone(5.05, [lockOf(undefined, 'wine'), shot('card')]);
      root.add(plate, cover, mic, ph);
      const AX = [0, Math.cos(1), Math.sin(1)], OPEN = [-2.95, 1.75, -1.5];
      return t => {
        const w = t / D * Math.PI * 2, bob = Math.sin(w * 2) * .04;
        plate.position.set(-2, -1.05 + bob, -.7); plate.rotation.set(1, 0, .06);
        const close = ss(8.5, 9.7, t), up = ss(.6, 1.25, t) * (1 - ss(9, 9.7, t)), away = ss(1, 2.3, t) * (1 - close);
        const gap = up * .95;
        const cx = -2 + AX[0] * gap, cy = -1.05 + bob + .115 * R * AX[1] + AX[1] * gap, cz = -.7 + .115 * R * AX[2] + AX[2] * gap;
        cover.position.set(lerp(cx, OPEN[0], away), lerp(cy, OPEN[1], away) + Math.sin(w + 1) * .04 * away, lerp(cz, OPEN[2], away));
        cover.rotation.set(lerp(1, .42, away), lerp(0, w * .35, away), lerp(.06, .22, away));
        mic.position.set(-.42, 1.45 + Math.sin(w * 2 + 2) * .05, -1.3);
        mic.rotation.set(-.08, 0, -.14 + Math.sin(w) * .03);
        mi.rotation.y = .35 + Math.sin(w) * .45;
        const go = tapGo(2.9, 3.9, 4.5, 5.3, t);
        reach(ph, root, spot, go, 1.45, REST2, 1.3, { arc: -.45, roll: 1.8 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 4.05, D);
      };
    });
  },
  // Nothing but the card and the phone: the card turns over as it comes to meet the tap.
  coaches() {
    const D = 9;
    return floating(D, 6.6, root => {
      const card = fanCard(1, 3.3), spot = corner(card, 3.3);
      const ph = phone(5.05, [lockOf(undefined, 'teal'), shot('card-coach')]);
      root.add(card, ph);
      return t => {
        const w = t / D * Math.PI * 2, turn = ss(.3, 1.7, t) + ss(7.2, 8.6, t);
        card.position.set(-1.9, .75 + Math.sin(w * 2) * .08, 0); card.rotation.set(-.1 + Math.sin(w) * .03, .36 + turn * Math.PI * 2, .06);
        const go = tapGo(2.2, 3, 3.6, 4.4, t);
        // Here the card comes over to meet the phone.
        card.position.x += go * .3; card.position.y += go * .35;
        reach(ph, root, spot, go, .95, REST2, 1.2);
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 3.15, D);
      };
    });
  },
  // At the desk: code scrolling on the laptop, and the phone taps the card beside it.
  engineers() {
    const D = 10;
    return floating(D, 7.4, root => {
      const screen = tex(1280, 800); screen.flipY = false; screen.anisotropy = 16;
      const paint = off => (x, W, H) => {
        x.fillStyle = '#171B22'; x.fillRect(0, 0, W, H);
        x.fillStyle = '#1F242D'; x.fillRect(0, 0, W, 56);
        ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { x.beginPath(); x.arc(30 + i * 28, 28, 9, 0, 7); x.fillStyle = c; x.fill(); });
        say(x, 'Leads.swift', W / 2, 29, `500 24px ui-monospace, Menlo, monospace`, '#AEB4BE');
        x.save(); x.beginPath(); x.rect(0, 56, W, H - 56); x.clip();
        const LH = 46, n = CODE.length;
        for (let i = -1; i < 18; i++) {
          const idx = Math.floor(off / LH) + i, y = 90 + i * LH - (off % LH), row = CODE[((idx % n) + n) % n];
          say(x, String(((idx % n) + n) % n + 1), 62, y, `400 26px ui-monospace, Menlo, monospace`, '#4B5361', 'right');
          let a = 100; x.font = `400 28px ui-monospace, Menlo, monospace`;
          row.forEach(([txt, c]) => { say(x, txt, a, y, `400 28px ui-monospace, Menlo, monospace`, c, 'left'); a += x.measureText(txt).width; });
        }
        x.restore();
      };
      const mac = laptop(5.2, screen), card = fanCard(2, 1.7), spot = corner(card, 1.7);
      const ph = phone(5.05, [lockOf(undefined, 'mono'), shot('card-engineer')]);
      root.add(mac, card, ph);
      let last = -1;
      return t => {
        const w = t / D * Math.PI * 2, off = Math.round(t / D * CODE.length * 46 / 3) * 3;
        if (off !== last) { last = off; screen.paint(paint(off)); }
        mac.position.set(-1.45, -.75 + Math.sin(w) * .04, -1.6); mac.rotation.set(.16, .2 + Math.sin(w) * .05, 0);
        card.position.set(-2.95, 1.42 + Math.sin(w * 2 + 1) * .05, .4); card.rotation.set(-.09, .3, .05);
        const go = tapGo(2.5, 3.2, 3.8, 4.6, t);
        reach(ph, root, spot, go, 1.3, REST2, 1.4, { arc: .3, roll: 1.5 });
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 3.35, D);
      };
    });
  },
  // Whatever you do: all your card styles fan open, and any of them opens your card.
  recruiters() {
    const D = 10;
    return floating(D, 6.8, root => {
      const W = 2.45, N = 6, cards = [];
      for (let i = 0; i < N; i++) { const pivot = new Group(), c = fanCard(i + 1, W); c.position.set(0, 1.25, i * .05); pivot.add(c); root.add(pivot); cards.push({ pivot, c }); }
      const front = cards[N - 2], spot = corner(front.c, W);
      const ph = phone(5.05, [lockOf(undefined, 'gold'), shot('card-recruiter')]);
      root.add(ph);
      return t => {
        const w = t / D * Math.PI * 2, open = ss(.4, 1.6, t) * (1 - ss(8.6, 9.7, t));
        cards.forEach(({ pivot }, i) => {
          pivot.position.set(-2.4, .3 + Math.sin(w * 2) * .05, -.6);
          pivot.rotation.set(-.08, .22, open * (.95 - i * .4) + Math.sin(w + i) * .012);
        });
        const go = tapGo(2.6, 3.4, 4, 4.8, t);
        // The front card rises out of the fan to meet the phone.
        front.c.position.y = 1.25 + go * .45;
        reach(ph, root, spot, go, .78, REST2, 1.4);
        ph.position.y += Math.sin(w + 1) * .05 * (1 - go);
        opens(ph, t, 3.55, D);
      };
    });
  },
});
Object.assign(SCENES, PRO);
// ---- what /scenes/live-scenes.mjs calls: builds a scene and hands it over in the shape of its own packages ----
const GLB = { phone: '/scenes/blog_phone.glb', tags: '/scenes/nfctags.glb', mac: '/scenes/blog_mac.glb', biz: '/scenes/bizcardroom.glb', cardfan: '/scenes/cardfan.glb' };
const propUrl = n => new URL(`props/${n}.glb`, import.meta.url).href;
const PROPS_FOR = {
  sales: ['stationery_supplies'], consultants: ['stationery_supplies'], trades: ['cross_pein_hammer', 'pliers', 'combination_wrench'], doctors: ['industrial_microscope'], photographers: ['Camera_01'],
};
const MODELS_FOR = { realtors: ['cardfan'], doctors: ['cardfan'], trades: ['cardfan'], photographers: ['cardfan'], sales: ['cardfan'], networking: ['cardfan'], engineers: ['cardfan', 'mac'], consultants: ['cardfan'], coaches: ['cardfan'], recruiters: ['cardfan'], keynote: ['mac'], team: ['tags', 'mac'], writetag: ['tags'], handover: ['tags', 'mac'], leadboard: ['mac'] };
const IMAGES_FOR = {"share": ["nfc-card", "nfc-card-blue", "card-dark", "card"], "leads": ["leads", "lead-detail"], "tradeshow": ["card", "live-qr", "card-dark", "live-lead-a", "live-lead-b", "live-stats-b", "hero-nicolo"], "cards": ["ten-00", "ten-01", "ten-03", "ten-02", "ten-05", "hero-nicolo", "logo-nicolo", "logo-consultant", "logo-coach", "logo-broker", "logo-photographer"], "insights": ["an-7d", "an-30d", "an-90d", "an-12m", "stats-7d", "stats-30d", "stats-90d", "stats-12m", "period-7d", "period-30d", "period-90d", "period-12m"], "appearance": ["ten-00", "ten-01", "ten-03", "ten-02", "ten-05", "look-1-dark", "look-2-dark", "look-3-dark", "look-4-dark", "look-5-dark"], "privacy": ["settings", "hero-nicolo"], "team": ["hero-coach", "team-coach", "nfc-card", "nfc-card-blue", "hero-engineer", "team-engineer", "hero-trades", "team-trades"], "realtors": ["card-dark", "card-realtor", "hero-realtor"], "doctors": ["card-dark", "card-doctor"], "sales": ["card-dark", "card-broker", "logo-broker", "nfc-card", "nfc-card-blue"], "keynote": ["card-engineer"], "networking": ["card-dark", "card"], "trades": ["card-dark", "card-trades"], "photographers": ["card-dark", "card-photographer", "nfc-card", "nfc-card-blue"], "followup": ["leads", "logo-broker", "hero-broker", "card-dark"], "selfie": ["card-dark", "leads", "emma", "hero-broker"], "firstscreen": ["card-dark", "leads", "hero-realtor", "card-realtor", "nfc-card", "nfc-card-blue"], "secondchance": ["card-dark", "leads", "card", "hero-nicolo", "nfc-card", "nfc-card-blue"], "changejobs": ["card-dark", "leads", "ten-02", "ten-04", "nfc-card", "nfc-card-blue"], "writetag": ["card-dark", "leads", "card-actions", "card"], "handover": ["hero-coach", "team-coach", "nfc-card", "nfc-card-blue", "hero-engineer", "team-engineer", "hero-trades", "team-trades"], "invite": ["card-dark", "leads", "logo-consultant", "ten-01"], "recruiters": ["card-dark", "card-recruiter"], "coaches": ["card-dark", "card-coach"], "engineers": ["card-dark", "card-engineer"], "consultants": ["card-dark", "ten-01", "nfc-card", "nfc-card-blue"], "leadboard": ["hero-coach", "hero-engineer", "hero-trades"]};
const imgLoads = new Map(), glbLoads = new Map();
// premultiplyAlpha none, as an <img> uploads: shot() hands the bitmap to WebGL as it is.
const image = name => { if (!imgLoads.has(name)) imgLoads.set(name, (async () => { const r = await fetch(new URL(`s/${name}.webp`, import.meta.url)); if (!r.ok) throw new Error(`image ${name} ${r.status}`); images[name] = await createImageBitmap(await r.blob(), { premultiplyAlpha: 'none' }); })()); return imgLoads.get(name); };
let boot;
function init(renderer, loader, env) {
  const glb = url => { if (!glbLoads.has(url)) glbLoads.set(url, loader.loadAsync(url)); return glbLoads.get(url); };
  boot ??= (async () => {
    // A worker sees none of the page's CSS fonts, so it loads the site's own here too (the browser's
    // cache already has them); the wordmark also needs the other two weights.
    const theme = w => new URL(`/assets/theme/fonts/TitilliumWeb-${w}.woff2`, import.meta.url).href;
    const own = f => new URL(`fonts/${f}.woff2`, import.meta.url).href;
    const faces = [['Titillium Web', theme(400), '400'], ['Titillium Web', theme(600), '600'], ['Titillium Web', theme(700), '700'], ['Titillium Web', own('titillium-300'), '300'], ['Caveat', own('caveat-700'), '700']];
    await Promise.all(faces.map(async ([family, url, weight]) => { const f = new FontFace(family, `url(${url})`, { weight, display: 'swap' }); await f.load(); self.fonts.add(f); }));
    environment = env;
    const pmrem = new PMREMGenerator(renderer);
    studio = pmrem.fromScene(studioScene(), .02).texture;
    pmrem.dispose();
    phoneGltf = await glb(GLB.phone);
  })();
  return { glb, ready: boot };
}
export async function build(key, { renderer, loader, environment: env }) {
  const { glb, ready } = init(renderer, loader, env);
  await ready;
  await Promise.all([
    ...(IMAGES_FOR[key] ?? []).map(image),
    ...(MODELS_FOR[key] ?? []).map(async m => { const g = await glb(GLB[m]); if (m === 'tags') tagsGltf = g; if (m === 'mac') macGltf = g; if (m === 'biz') bizGltf = g; if (m === 'cardfan') proGltf.cardfan = g; }),
    ...(PROPS_FOR[key] ?? []).map(async n => { proGltf[n] = await glb(propUrl(n)); }),
  ]);
  made.length = 0;
  const st = SCENES[key]();
  const own = [...made];
  st.scene.traverse(o => { const mt = o.material; if (mt) ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'bumpMap', 'emissiveMap', 'aoMap'].forEach(n => { if (mt[n]) own.push(mt[n]); }); });
  pendingUploads.length = 0;
  const fps = 30, w = Math.PI * 2 / st.dur;
  return {
    scene: st.scene, camera: st.camera, exposure: 1, video: null, tracks: [],
    manifest: { camera: { verticalFovDegrees: st.camera.fov } },
    // The player's clock drives the scene through the same call it uses for a baked animation.
    mixer: { setTime(t) { st.root.rotation.y = Math.sin(t * w) * .045; st.root.rotation.x = Math.cos(t * w) * .012; st.update(t); } },
    // Off screen a scene gives its textures back; three uploads them again when it next draws.
    release() { own.forEach(t => t.dispose()); },
    duration: st.dur, fps, frameCount: Math.round(st.dur * fps), time: 0,
  };
}
