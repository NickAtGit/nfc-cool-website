// Renders the phone figures' still: the phone straight on, with its screen cut out (transparent),
// drawn by phone-figures.mjs itself in headless Chrome, so the still and the live phone's first
// frame match exactly. Also prints where the screen sits in the box, for .phone-figure-screens in
// Theme/css/phone-figure.css.
//
//   node Scripts/scenes/render-phone-shell.mjs <URL of a post with a phone figure> [device] [out.webp]
//   e.g. (with `swift run Site serve` running)
//   node Scripts/scenes/render-phone-shell.mjs http://localhost:8080/blog/read-passport-nfc-chip/
//
// device is phone (default), einkcase, ipad or mac, the figure's data-device; the page needs a
// figure of it.
// out.webp defaults to Content/StaticFiles/scenes/blog_<device>_shell.webp, at 2x of the device's box. Needs Google Chrome and Node 22+. Uses the page's ?debug hook
// (window.phoneFigures).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [pageURL, device = 'phone', outFile = new URL(`../../Content/StaticFiles/scenes/blog_${device}_shell.webp`, import.meta.url).pathname] = process.argv.slice(2);
if (!pageURL) {
  console.error('usage: node Scripts/scenes/render-phone-shell.mjs <page URL> [out.webp]');
  process.exit(1);
}
// 2x of each device's box (phone-figure.css): a 300 px phone or case, a 350 px iPad, a 480 px Mac.
const [WIDTH, HEIGHT] = { phone: [600, 960], einkcase: [600, 960], ipad: [700, 1000], mac: [960, 640] }[device];
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9334;
const profile = mkdtempSync(join(tmpdir(), 'render-phone-shell-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--enable-unsafe-swiftshader', '--window-size=1400,1000', 'about:blank',
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

  // Let the page load first: an evaluation that starts on the blank tab dies with its navigation.
  await sleep(2000);
  const result = await evaluate(`(async () => {
    const started = Date.now();
    // The figure goes live once it is near the viewport.
    const isDevice = v => (v.figure.dataset.device ?? 'phone') === ${JSON.stringify(device)};
    const figure = [...document.querySelectorAll('figure.phone-figure')].find(f => (f.dataset.device ?? 'phone') === ${JSON.stringify(device)});
    figure?.scrollIntoView();
    while (!window.phoneFigures?.views?.find(isDevice)?.renderShell) {
      if (Date.now() - started > 30000) throw new Error('figure not live: ' + (window.phoneFigures ? 'still loading' : 'no phone figure on the page'));
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    const view = window.phoneFigures.views.find(isDevice);
    return { shell: view.renderShell(${WIDTH}, ${HEIGHT}), screen: view.screenRect() };
  })()`);
  writeFileSync(outFile, Buffer.from(result.shell.split(',')[1], 'base64'));
  console.log(`wrote ${outFile}`);
  const { left, top, width, height } = result.screen;
  console.log(`.phone-figure-screens { left: ${left}%; top: ${top}%; width: ${width}%; height: ${height}%; }`);
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
