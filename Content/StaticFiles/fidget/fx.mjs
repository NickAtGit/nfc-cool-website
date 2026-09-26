import {
  CanvasTexture, Color, DoubleSide, DynamicDrawUsage, ExtrudeGeometry, Group, InstancedMesh, Mesh,
  MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, RingGeometry,
  RoundedBoxGeometry, Shape, Sprite, SpriteMaterial, SRGBColorSpace, Vector3,
} from 'three';
import { clamp, damp, easeInOutCubic, easeOutBack, lerp, smoothstep, TAU } from './math.mjs';

const CONFETTI_COLORS = ['#FF6B5B', '#FFC94A', '#7FD1B9', '#8E9BFF', '#FF9ECF', '#FFFFFF'];
const SCAN_COLOR = new Color('#38D2F2').multiplyScalar(1.6); // above 1 so it blooms
const PHONE_HIDDEN = { pos: new Vector3(1.9, 1.0, 1.3), rot: new Vector3(-0.3, -1.0, 0.35), scale: 0.8 };
// A real phone dwarfs the toy, so the prop is scaled down. Landscape has room beside the
// figure; a portrait screen does not, so there a smaller phone tucks in at the base's
// front right corner, inside the frame and clear of the dock.
const PHONE_BESIDE = { pos: new Vector3(0.62, 0.3, 0.42), rot: new Vector3(-1.05, -0.6, 0.2), scale: 0.8 };
const PHONE_CORNER = { pos: new Vector3(0.3, 0.3, 0.42), rot: new Vector3(-1.0, -0.5, 0.2), scale: 0.55 };
const BOOT_S = 0.6;
const INK = { light: '#5C6275', dark: '#DDE2EC' };

function glyphTexture(char) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.font = '800 104px system-ui, -apple-system, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = '#ffffff';
  g.fillText(char, 64, 70);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** The phone's lock screen: a dark gradient with the white NFC.cool wordmark. The logo
 *  loads asynchronously and is drawn in when ready; the phone only appears during a scan. */
function phoneScreenTexture() {
  const w = 300;
  const h = 620;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.beginPath();
  g.roundRect(0, 0, w, h, 34);
  g.clip();
  const bg = g.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0F1726');
  bg.addColorStop(1, '#1B2B45');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  const texture = new CanvasTexture(c);
  texture.colorSpace = SRGBColorSpace;
  const logo = new Image();
  logo.onload = () => {
    // Turned 90 degrees so the wordmark runs along the phone's long side, top to bottom.
    const lw = h * 0.78;
    const lh = lw * (logo.naturalHeight / logo.naturalWidth);
    g.save();
    g.translate(w / 2, h / 2);
    g.rotate(Math.PI / 2);
    g.drawImage(logo, -lw / 2, -lh / 2, lw, lh);
    g.restore();
    texture.needsUpdate = true;
  };
  logo.src = 'nfc-cool-logo-white.webp';
  return texture;
}

/**
 * Everything that is not the figure: dizzy stars, Zzz, confetti, scan rings, the
 * glow of the chest light and base rim, the face screen booting, and the phone that
 * performs the scan.
 * `anchors.head(target)` writes the head's world position into `target`.
 */
export function createFx(scene, { anchors, glow = {}, reducedMotion = false, dark = false }) {
  const v = new Vector3();
  const dummy = new Object3D();
  let time = 0;

  // Dizzy stars orbit the head.
  const starShape = new Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU + Math.PI / 2;
    const r = i % 2 ? 0.015 : 0.036;
    if (i) starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const starGeometry = new ExtrudeGeometry(starShape, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2 });
  starGeometry.center();
  const starMaterial = new MeshStandardMaterial({ color: '#FFD54A', emissive: '#FFB300', emissiveIntensity: 1.4, roughness: 0.35 });
  const stars = new Group();
  for (let i = 0; i < 4; i++) {
    const m = new Mesh(starGeometry, starMaterial);
    m.castShadow = true;
    stars.add(m);
  }
  stars.visible = false;
  scene.add(stars);
  const starState = { on: false, amount: 0 };

  // Zzz rise from the head while it sleeps.
  const zTexture = glyphTexture('Z');
  const zs = Array.from({ length: 4 }, () => {
    const sprite = new Sprite(new SpriteMaterial({ map: zTexture, transparent: true, depthWrite: false, color: dark ? INK.dark : INK.light }));
    sprite.visible = false;
    scene.add(sprite);
    return { sprite, t: -1 };
  });
  const zState = { on: false, spawn: 0 };

  // Confetti: one instanced mesh, simple physics, flakes settle on the floor and base.
  const count = reducedMotion ? 60 : 200;
  const confetti = new InstancedMesh(new PlaneGeometry(0.026, 0.042), new MeshStandardMaterial({ side: DoubleSide, roughness: 0.55 }), count);
  confetti.instanceMatrix.setUsage(DynamicDrawUsage);
  confetti.frustumCulled = false;
  confetti.castShadow = true;
  confetti.visible = false;
  const color = new Color();
  for (let i = 0; i < count; i++) confetti.setColorAt(i, color.set(CONFETTI_COLORS[i % CONFETTI_COLORS.length]));
  scene.add(confetti);
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const rot = new Float32Array(count * 3);
  const spin = new Float32Array(count * 3);
  const rest = new Uint8Array(count);
  let confettiT = -1;

  // Scan rings ripple out from the base.
  const ringGeometry = new RingGeometry(0.318, 0.34, 96);
  ringGeometry.rotateX(-Math.PI / 2);
  const rings = Array.from({ length: 3 }, () => {
    const m = new Mesh(ringGeometry, new MeshBasicMaterial({ color: SCAN_COLOR, transparent: true, opacity: 0, depthWrite: false }));
    m.position.y = 0.004;
    m.visible = false;
    scene.add(m);
    return m;
  });
  let ringT = -1;

  // Glow: the chest light flares and the base rim lights up.
  let glowT = -1;
  const coreBase = glow.core?.emissiveIntensity ?? 1;

  // The phone that scans the base: a generic slab, no marks.
  const phone = new Group();
  const body = new Mesh(new RoundedBoxGeometry(0.34, 0.68, 0.034, 4, 0.05),
    new MeshPhysicalMaterial({ color: '#1C1E24', metalness: 0.4, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.06 }));
  body.castShadow = true;
  const screen = new Mesh(new PlaneGeometry(0.3, 0.62), new MeshBasicMaterial({ map: phoneScreenTexture(), transparent: true, color: new Color(1.5, 1.5, 1.5) }));
  screen.position.z = 0.0175;
  phone.add(body, screen);
  phone.visible = false;
  scene.add(phone);
  const phoneState = { t: 0, dir: 0 };
  let phoneShown = PHONE_BESIDE;

  function placePhone(k) {
    phone.position.lerpVectors(PHONE_HIDDEN.pos, phoneShown.pos, k);
    phone.scale.setScalar(lerp(PHONE_HIDDEN.scale, phoneShown.scale, Math.min(1, k)));
    phone.rotation.set(
      lerp(PHONE_HIDDEN.rot.x, phoneShown.rot.x, k),
      lerp(PHONE_HIDDEN.rot.y, phoneShown.rot.y, k),
      lerp(PHONE_HIDDEN.rot.z, phoneShown.rot.z, k),
    );
  }

  // The face screen powers on with a flicker whose lit share grows until it holds.
  let bootT = -1;

  function burst() {
    anchors.head(v);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TAU;
      const up = 2.2 + Math.random() * 1.6;
      const out = 0.5 + Math.random() * 1.1;
      pos.set([v.x, v.y + 0.1, v.z], i * 3);
      vel.set([Math.cos(a) * out, up, Math.sin(a) * out], i * 3);
      rot.set([Math.random() * TAU, Math.random() * TAU, Math.random() * TAU], i * 3);
      spin.set([(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16], i * 3);
      rest[i] = 0;
    }
    confettiT = 0;
    confetti.visible = true;
  }

  function update(dt) {
    time += dt;
    anchors.head(v);

    starState.amount = damp(starState.amount, starState.on ? 1 : 0, 8, dt);
    stars.visible = starState.amount > 0.01;
    if (stars.visible) {
      stars.children.forEach((m, i) => {
        const a = time * 3.2 + (i / 4) * TAU;
        m.position.set(v.x + Math.cos(a) * 0.27, v.y + 0.2 + Math.sin(time * 5 + i) * 0.02, v.z + Math.sin(a) * 0.27);
        m.rotation.set(0, time * 4 + i, 0.3);
        m.scale.setScalar(starState.amount * (0.9 + 0.1 * Math.sin(time * 8 + i)));
      });
    }

    if (zState.on) {
      zState.spawn -= dt;
      if (zState.spawn <= 0) {
        zState.spawn = 1.3;
        const free = zs.find(z => z.t < 0);
        if (free) free.t = 0;
      }
    }
    for (const z of zs) {
      if (z.t < 0) continue;
      z.t += dt;
      const p = z.t / 2.4;
      if (p >= 1) {
        z.t = -1;
        z.sprite.visible = false;
        continue;
      }
      z.sprite.visible = true;
      z.sprite.position.set(v.x + 0.16 + Math.sin(p * 5) * 0.05, v.y + 0.15 + p * 0.38, v.z);
      z.sprite.scale.setScalar(0.07 + p * 0.07);
      z.sprite.material.opacity = Math.min(1, p / 0.12) * (1 - smoothstep(0.7, 1, p));
    }

    if (confettiT >= 0) {
      confettiT += dt;
      const fade = 1 - clamp((confettiT - 3.4) / 0.8, 0, 1);
      const drag = Math.exp(-1.7 * dt);
      for (let i = 0; i < count; i++) {
        const k = i * 3;
        if (!rest[i]) {
          vel[k + 1] -= 4.2 * dt;
          vel[k] = vel[k] * drag + Math.sin(confettiT * 9 + i) * 0.5 * dt; // flutter
          vel[k + 1] *= drag;
          vel[k + 2] *= drag;
          pos[k] += vel[k] * dt;
          pos[k + 1] += vel[k + 1] * dt;
          pos[k + 2] += vel[k + 2] * dt;
          rot[k] += spin[k] * dt;
          rot[k + 1] += spin[k + 1] * dt;
          rot[k + 2] += spin[k + 2] * dt;
          const onBase = pos[k] * pos[k] + pos[k + 2] * pos[k + 2] < 0.31 * 0.31;
          const floor = onBase ? 0.086 : 0.003;
          if (pos[k + 1] <= floor && vel[k + 1] < 0) {
            pos[k + 1] = floor;
            rest[i] = 1;
            rot[k] = -Math.PI / 2;
            rot[k + 2] = 0;
          }
        }
        dummy.position.set(pos[k], pos[k + 1], pos[k + 2]);
        dummy.rotation.set(rot[k], rot[k + 1], rot[k + 2]);
        dummy.scale.setScalar(fade);
        dummy.updateMatrix();
        confetti.setMatrixAt(i, dummy.matrix);
      }
      confetti.instanceMatrix.needsUpdate = true;
      if (confettiT > 4.3) {
        confettiT = -1;
        confetti.visible = false;
      }
    }

    if (ringT >= 0) {
      ringT += dt;
      rings.forEach((m, i) => {
        const p = (ringT - i * 0.22) / 1.1;
        m.visible = p > 0 && p < 1;
        if (!m.visible) return;
        m.scale.setScalar(1 + p * 1.5);
        m.material.opacity = (1 - p) ** 1.5 * 0.9;
      });
      if (ringT > 1.8) ringT = -1;
    }

    if (glowT >= 0) {
      glowT += dt;
      const p = glowT / 1.6;
      const k = p < 0.12 ? p / 0.12 : Math.max(0, 1 - (p - 0.12) / 0.88);
      if (glow.core) glow.core.emissiveIntensity = coreBase * (1 + k * 5);
      if (glow.rim) glow.rim.emissive.copy(SCAN_COLOR).multiplyScalar(k * 0.6);
      if (p >= 1) glowT = -1;
    }

    if (bootT >= 0 && glow.face) {
      bootT += dt;
      const p = bootT / BOOT_S;
      const lit = p >= 1 ? 1 : Math.sin(p * 55) > 1 - 2 * p ? 0.4 + 0.6 * p : 0.04;
      glow.face.emissiveIntensity = (glow.faceOn ?? 3) * lit;
      if (p >= 1) bootT = -1;
    }

    if (phoneState.dir) {
      phoneState.t = Math.min(1, phoneState.t + dt / (phoneState.dir > 0 ? 0.8 : 0.6));
      placePhone(phoneState.dir > 0 ? easeOutBack(phoneState.t) : 1 - easeInOutCubic(phoneState.t));
      if (phoneState.dir > 0) phone.position.y += Math.sin(time * 3) * 0.008;
      if (phoneState.dir < 0 && phoneState.t >= 1) {
        phone.visible = false;
        phoneState.dir = 0;
      }
    }
  }

  return {
    update,
    stars(on) { starState.on = on; },
    zzz(on) {
      zState.on = on;
      zState.spawn = 0;
    },
    confetti: burst,
    rings() {
      ringT = 0;
      if (glowT < 0 && glow.rim) glowT = 0.9; // a short rim flash, without the big flare
    },
    glow() { glowT = 0; },
    boot() { bootT = 0; },
    phoneIn() {
      phone.visible = true;
      phoneState.t = 0;
      phoneState.dir = 1;
    },
    phoneOut() {
      phoneState.t = 0;
      phoneState.dir = -1;
    },
    setPortrait(portrait) {
      phoneShown = portrait ? PHONE_CORNER : PHONE_BESIDE;
    },
    setDark(isDark) {
      for (const z of zs) z.sprite.material.color.set(isDark ? INK.dark : INK.light);
    },
  };
}
