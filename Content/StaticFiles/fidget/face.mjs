import { CanvasTexture, SRGBColorSpace } from 'three';
import { TAU } from './math.mjs';

// Same aspect as the visor (0.40 x 0.25) and the same layout as face_image.py.
const W = 512;
const H = 320;
const EYE = { x: [0.32 * W, 0.68 * W], y: 0.47 * H, w: 72, h: 118 };
const MOUTH_Y = 0.8 * H;

function overlay() {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(0,0,0,0.28)';
  for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1.5);
  const v = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.6);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.45)');
  g.fillStyle = v;
  g.fillRect(0, 0, W, H);
  return c;
}

function signature(s) {
  return [s.eye.w, s.eye.h, s.eye.lid, s.eye.arc, s.blink, s.gaze.x, s.gaze.y, s.mouth.w, s.mouth.open, s.mouth.smile]
    .map(v => v.toFixed(2)).join(',') + s.mode;
}

/** Draws the face model onto a canvas the visor shows as its emissive map. */
export function createFaceTexture(model, { color = '#8FF6FF' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d');
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = false; // glTF UVs have their origin at the top left
  texture.anisotropy = 4;
  const scan = overlay();
  let last = '';
  let time = 0;

  function pill(cx, cy, w, h) {
    g.beginPath();
    g.roundRect(cx - w / 2, cy - h / 2, w, h, Math.min(w, h) / 2 * 0.95);
    g.fill();
  }

  function curve(cx, cy, w, sag, width) {
    g.lineWidth = width;
    g.beginPath();
    g.moveTo(cx - w / 2, cy);
    g.quadraticCurveTo(cx, cy + sag * 2, cx + w / 2, cy);
    g.stroke();
  }

  function spiral(cx, cy, r, side) {
    g.lineWidth = 9;
    g.beginPath();
    const turns = 3;
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const a = side * (t * turns * TAU + time * 7);
      const x = cx + Math.cos(a) * r * t;
      const y = cy + Math.sin(a) * r * t;
      if (i) g.lineTo(x, y);
      else g.moveTo(x, y);
    }
    g.stroke();
  }

  function star(cx, cy, r) {
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU - Math.PI / 2 + Math.sin(time * 3) * 0.12;
      const rad = i % 2 ? r * 0.45 : r;
      const x = cx + Math.cos(a) * rad;
      const y = cy + Math.sin(a) * rad;
      if (i) g.lineTo(x, y);
      else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }

  function chevron(cx, cy, w, h, side) {
    g.lineWidth = 16;
    g.beginPath();
    g.moveTo(cx - (w / 2) * side, cy - h / 2);
    g.lineTo(cx + (w / 2) * side, cy);
    g.lineTo(cx - (w / 2) * side, cy + h / 2);
    g.stroke();
  }

  function eye(mode, cx, cy, side, s) {
    const w = EYE.w * s.eye.w;
    const h = EYE.h * s.eye.h;
    if (mode === 'spiral') return spiral(cx, cy, w * 0.62, side);
    if (mode === 'star') return star(cx, cy, w * 0.72 * (1 + 0.06 * Math.sin(time * 9)));
    if (mode === 'squint') return chevron(cx, cy, w * 0.5, h * 0.4, side);
    const closed = Math.max(s.eye.lid, s.blink);
    const open = h * (1 - closed);
    const alpha = g.globalAlpha;
    if (open < 10) return curve(cx, cy + h * 0.3, w * 0.95, s.eye.arc < 0 ? 10 * -s.eye.arc : 0, 14);
    const arc = Math.max(0, s.eye.arc);
    if (arc < 1) {
      g.globalAlpha = alpha * (1 - arc);
      pill(cx, cy + (h - open) * 0.3, w, open);
    }
    if (arc > 0) {
      g.globalAlpha = alpha * arc;
      curve(cx, cy + h * 0.12, w, -h * 0.22, 18);
    }
    g.globalAlpha = alpha;
  }

  function mouth(m, ox) {
    const cx = W / 2 + ox;
    const w = 240 * m.w;
    const sag = m.smile * 16;
    const open = m.open * 34;
    if (open < 6) return curve(cx, MOUTH_Y, w, sag, 10);
    g.beginPath();
    g.moveTo(cx - w / 2, MOUTH_Y);
    g.quadraticCurveTo(cx, MOUTH_Y + sag * 2 - open * 0.2, cx + w / 2, MOUTH_Y);
    g.quadraticCurveTo(cx, MOUTH_Y + sag * 2 + open * 2, cx - w / 2, MOUTH_Y);
    g.closePath();
    g.fill();
  }

  function draw(dt) {
    time += dt;
    const s = model.state;
    const animated = s.mode === 'spiral' || s.mode === 'star' || s.modeMix < 1;
    const key = animated ? '' : signature(s);
    if (!animated && key === last) return;
    last = key;
    g.globalAlpha = 1;
    g.fillStyle = '#000';
    g.fillRect(0, 0, W, H);
    g.save();
    g.shadowColor = color;
    g.shadowBlur = 16;
    g.fillStyle = color;
    g.strokeStyle = color;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    const gx = s.gaze.x * 26;
    const gy = -s.gaze.y * 16;
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      if (s.modeMix < 1) {
        g.globalAlpha = 1 - s.modeMix;
        eye(s.prevMode, EYE.x[i] + gx, EYE.y + gy, side, s);
      }
      g.globalAlpha = s.modeMix;
      eye(s.mode, EYE.x[i] + gx, EYE.y + gy, side, s);
    }
    g.globalAlpha = 1;
    mouth(s.mouth, gx * 0.4);
    g.restore();
    g.drawImage(scan, 0, 0);
    texture.needsUpdate = true;
  }

  return { texture, draw };
}
