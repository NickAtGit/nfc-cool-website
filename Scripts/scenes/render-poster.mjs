// Renders a live scene's poster still: frame <data-poster-frame> of the page's
// <img data-scene> at its <data-frame-fill>, drawn by live-scenes.mjs itself in headless Chrome,
// so the still and the first frame of the animation match exactly.
//
//   node Scripts/scenes/render-poster.mjs <page URL> <out.webp> [size]
//   e.g. (with `swift run Site serve` running)
//   node Scripts/scenes/render-poster.mjs http://localhost:8080/business-card/ \
//     Content/Assets/images/BusinessCard/LanyardScene-v2.webp
//
// size is the square's side in pixels (default 960, the 480 px hero at 2x). Needs Google Chrome
// and Node 22+ (global WebSocket). Uses the page's ?debug hook (window.liveScenes).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [pageURL, outFile, size = '960'] = process.argv.slice(2);
if (!pageURL || !outFile) {
  console.error('usage: node Scripts/scenes/render-poster.mjs <page URL> <out.webp> [size]');
  process.exit(1);
}
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), 'render-poster-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--autoplay-policy=no-user-gesture-required', '--enable-unsafe-swiftshader', '--window-size=1400,1000',
  'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  const url = new URL(pageURL);
  url.searchParams.set('debug', '');
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    target = await fetch(`http://127.0.0.1:${PORT}/json/new?${url}`, { method: 'PUT' }).then(r => r.json()).catch(() => null);
  }
  if (!target) throw new Error('Chrome did not start');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    pending.get(message.id)?.(message);
    pending.delete(message.id);
  });
  const evaluate = expression => new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, message => {
      const details = message.result?.exceptionDetails;
      if (message.error) reject(new Error(message.error.message));
      else if (details) reject(new Error(details.exception?.description ?? details.text));
      else resolve(message.result.result.value);
    });
    ws.send(JSON.stringify({ id: messageId, method: 'Runtime.evaluate', params: { expression, awaitPromise: true, returnByValue: true } }));
  });

  const dataURL = await evaluate(`(async () => {
    const started = Date.now();
    while (!window.liveScenes?.views?.[0]?.scene) {
      if (Date.now() - started > 30000) throw new Error('scene not ready: ' + (window.liveScenes?.views?.[0]?.state ?? 'no live scene on the page'));
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    // The still is the light page's: scenes with themed parts (nfctags' waves) draw them in
    // their light colours, whatever the headless browser prefers.
    document.documentElement.dataset.theme = 'light';
    await new Promise(resolve => setTimeout(resolve, 50));
    const { views, renderer, render, seekTo } = window.liveScenes;
    const view = views[0];
    view.scene.video?.pause();
    await seekTo(view.scene, view.posterFrame);
    renderer.setSize(${Number(size)}, ${Number(size)}, false);
    render(view.scene, ${Number(size)}, ${Number(size)}, view.frameFill);
    const blob = await renderer.domElement.convertToBlob({ type: 'image/webp', quality: 0.9 });
    return await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(blob); });
  })()`);
  writeFileSync(outFile, Buffer.from(dataURL.split(',')[1], 'base64'));
  console.log(`wrote ${outFile}`);
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
