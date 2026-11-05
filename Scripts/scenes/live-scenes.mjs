// Live 3D scenes: an <img data-scene="<key>" data-poster-frame="<n>"> comes to life in place.
//
// The image is frame <n> of scene <key>, rendered by this player at the same framing
// (Scripts/scenes/render-poster.mjs). It stays a plain image until the page has loaded and the
// browser is idle; only then is the scene worker started, which fetches three.js, and the scene's
// files once the image comes near the viewport. When the scene's first frame is drawn, held on
// frame <n>, the image fades out and the canvas fades in and plays on from there. Reduced motion,
// Save-Data, no WebGL2 in a worker or any error: the image simply stays. LiveSceneScriptProcessor
// loads this module on pages that need it.
//
// This is the page's half of the player, and it never touches three.js or WebGL, so a tap is never
// kept waiting by a scene. Everything heavy (decoding the GLBs, compiling shaders, painting
// textures, rendering) runs in Scripts/scenes/scene-worker.mjs. What has to stay here is what a
// worker cannot reach: the images and canvases, the observers, the theme and the <video> elements.
// One WebGL context on an OffscreenCanvas in the worker draws every scene (browsers cap contexts at
// about 16, Safari lower); each frame comes back as an ImageBitmap for the image's canvas, so it
// scrolls with the page natively.
//
// This is the source: Scripts/scenes/build.sh --js minifies it to Content/StaticFiles/scenes/,
// which is what the site serves (AssetMinifier skips .mjs).
//
// data-frame-fill sets how much of the app's square frame the image shows (1 = all of it; the
// Business Card hero uses 0.5, because its lanyard set runs well past the app's frame).
// ?debug logs timings and exposes window.liveScenes, which render-poster.mjs drives.

const MAX_DPR = 2;
const NEAR_VIEWPORT = '300px';

const images = [...document.querySelectorAll('img[data-scene][data-poster-frame]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;
const debug = new URLSearchParams(location.search).has('debug');
const log = (...args) => debug && console.log('[live-scenes]', ...args);

// Whether the worker gets a WebGL2 context is the worker's to find out: creating one here, just to
// ask, is itself a task long enough to block a tap.
if (images.length && !reducedMotion && !saveData && 'OffscreenCanvas' in window && 'Worker' in window) {
  afterLoad().then(start).catch(error => console.warn('[live-scenes]', error));
} else {
  log('skipped', { reducedMotion, saveData });
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

function start() {
  const worker = new Worker(new URL('./scene-worker.mjs', import.meta.url), { type: 'module' });

  const views = images.map((img, id) => ({
    id,
    img,
    key: img.dataset.scene,
    frameFill: Number(img.dataset.frameFill) || 1,
    posterFrame: Number(img.dataset.posterFrame),
    state: 'idle', // idle → loading → ready | failed
    visible: false,
    cssWidth: 0,
    cssHeight: 0,
    width: 0,
    height: 0,
    canvas: null,
    ctx: null,
    fade: null,
    video: null,
    pipe: null,
    framePending: false,
    held: true, // on the poster's frame until the poster has faded out
  }));

  // What the worker needs to know about a view, from when it first comes near the viewport.
  const sync = view => {
    if (!view.visible && view.state === 'idle') return;
    if (view.state === 'idle') view.state = 'loading';
    worker.postMessage({
      t: 'view', id: view.id, key: view.key, frameFill: view.frameFill, posterFrame: view.posterFrame,
      visible: view.visible, width: view.width, height: view.height,
    });
  };

  worker.postMessage({ t: 'init', debug, theme: currentTheme() });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const view = views.find(v => v.img === entry.target || v.canvas === entry.target);
      if (!view) continue;
      view.visible = entry.isIntersecting;
      if (view.state === 'ready') view.visible ? play(view) : pause(view);
      sync(view);
    }
  }, { rootMargin: NEAR_VIEWPORT });

  // The element's size in device pixels, read where layout is already clean.
  const measure = view => {
    const box = view.canvas?.isConnected ? view.canvas : view.img;
    const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
    const cssWidth = box.offsetWidth;
    const cssHeight = box.offsetHeight;
    const width = Math.round(cssWidth * dpr);
    const height = Math.round(cssHeight * dpr);
    const changed = width !== view.width || height !== view.height;
    Object.assign(view, { cssWidth, cssHeight, width, height });
    return changed;
  };
  const resizer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const view = views.find(v => v.img === entry.target || v.canvas === entry.target);
      if (view && measure(view)) sync(view);
    }
  });
  // Browser zoom or another screen changes the pixels without changing the CSS size.
  const watchDpr = () => matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener('change', () => {
    views.forEach(view => { if (measure(view)) sync(view); });
    watchDpr();
  }, { once: true });
  watchDpr();

  views.forEach(view => {
    observer.observe(view.img);
    resizer.observe(view.img);
  });

  // ---- what the worker asks of the page ----
  const pageCalls = {
    // A server without range requests (python's http.server) leaves a video unseekable even once
    // it is fully buffered, and the scene starts on its poster's frame; a blob URL always seeks.
    // The clips are ~100 KB.
    async openVideo({ id, src }) {
      const response = await fetch(src);
      if (!response.ok) throw new Error(`screen video ${response.status}`);
      const view = views[id];
      view.video = makeVideo(URL.createObjectURL(await response.blob()));
      for (const name of ['play', 'pause', 'seeked']) view.video.addEventListener(name, () => postVideoState(view));
    },
    // Puts the screen video on the given time, and its frame on the scene's screen.
    async seekVideo({ id, time }) {
      const view = views[id];
      const { video } = view;
      if (!video) return;
      // iOS Safari loads no frames for a video that has never played, so a seek there never
      // completes: start it (muted inline playback needs no gesture) and pause it right away. When
      // playing is refused (Low Power Mode), the waits below time out and the scene runs without
      // its screen video rather than not at all.
      if (video.readyState < 2) await within(3000, video.play().then(() => video.pause(), () => {}));
      if (video.readyState < 1) await within(3000, once(video, 'loadedmetadata'));
      video.currentTime = time;
      await within(3000, once(video, 'seeked'));
      await pushFrame(view);
    },
  };

  worker.addEventListener('message', ({ data }) => {
    switch (data.t) {
      case 'frames':
        for (const { id, bitmap } of data.frames) show(views[id], bitmap);
        worker.postMessage({ t: 'shown' });
        break;
      case 'ready':
        views[data.id].state = 'ready';
        if (views[data.id].visible) play(views[data.id]);
        break;
      case 'failed':
        views[data.id].state = 'failed';
        break;
      case 'frame-taken':
        views[data.id].framePending = false;
        break;
      case 'call':
        pageCalls[data.name](data.args).then(
          value => worker.postMessage({ t: 'reply', call: data.call, value }),
          error => worker.postMessage({ t: 'reply', call: data.call, error: String(error) }),
        );
        break;
      case 'reply':
        replies.get(data.call)?.(data);
        replies.delete(data.call);
        break;
      case 'down':
        // No WebGL2 in a worker here (or it could not start): the images stay.
        log('worker unavailable', data.reason);
        stop();
        break;
      case 'lost':
        restorePosters();
        break;
    }
  });
  // The worker's script failed to load or run. Whatever was on screen stays: a poster, or the last
  // frame a canvas was given.
  worker.addEventListener('error', event => {
    console.warn('[live-scenes]', event.message ?? 'worker failed');
    if (!views.some(view => view.canvas)) stop();
  });

  function stop() {
    observer.disconnect();
    resizer.disconnect();
    worker.terminate();
  }

  // ---- frames ----
  function show(view, bitmap) {
    if (!view.canvas) swapIn(view);
    // Chrome scales the bitmap to the canvas's own width and height (300 x 150 by default) before
    // CSS sizes the element; Safari shows it at its own size. Match them.
    if (view.canvas.width !== bitmap.width || view.canvas.height !== bitmap.height) {
      view.canvas.width = bitmap.width;
      view.canvas.height = bitmap.height;
    }
    view.ctx.transferFromImageBitmap(bitmap);
  }

  // The canvas holds the poster's frame: fade the poster out, then fade the canvas in in its
  // place and let the scene play on.
  function swapIn(view) {
    const { img, cssWidth, cssHeight } = view;
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
    // Kept, because a detached image's getAnimations() is empty: a fade left on it would hide the
    // poster if it ever has to come back.
    view.fade = img.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'forwards' });
    view.fade.finished.then(() => {
      if (view.canvas !== canvas || view.state !== 'ready') return;
      observer.unobserve(img);
      resizer.unobserve(img);
      img.replaceWith(canvas);
      observer.observe(canvas);
      resizer.observe(canvas);
      view.fade.cancel();
      view.held = false;
      worker.postMessage({ t: 'release-hold', id: view.id });
      play(view);
      canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
    }, () => {}); // cancelled: the poster is coming back
  }

  function restorePosters() {
    for (const view of views) {
      view.fade?.cancel();
      if (view.canvas?.isConnected) view.canvas.replaceWith(view.img);
      pause(view);
      view.state = 'failed';
    }
    stop();
  }

  // ---- the screen videos ----
  function makeVideo(src) {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = src;
    return video;
  }

  function play(view) {
    if (view.held || !view.video) return;
    view.video.play().catch(() => {});
    pipeFrames(view);
  }

  function pause(view) {
    view.video?.pause();
    view.pipe = null;
  }

  // A frame each time the video has a new one, only while it plays and only once the worker has
  // taken the last. The decoding is the browser's own, off this thread.
  function pipeFrames(view) {
    if (view.pipe) return;
    const pipe = view.pipe = {};
    const { video } = view;
    const arm = () => {
      if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(onFrame);
      else setTimeout(onFrame, 33);
    };
    const onFrame = () => {
      if (view.pipe !== pipe) return;
      if (!view.framePending) pushFrame(view);
      arm();
    };
    arm();
  }

  // A VideoFrame hands the decoded picture over without copying it.
  async function pushFrame(view) {
    const { video } = view;
    if (video.readyState < 2) return;
    let frame;
    try {
      frame = 'VideoFrame' in window ? new VideoFrame(video) : await createImageBitmap(video);
    } catch {
      frame = await createImageBitmap(video).catch(() => null);
    }
    if (!frame) return;
    view.framePending = true;
    worker.postMessage({ t: 'video-frame', id: view.id, frame, state: videoState(video) }, [frame]);
  }

  function videoState(video) {
    return { paused: video.paused, readyState: video.readyState, currentTime: video.currentTime };
  }

  function postVideoState(view) {
    worker.postMessage({ t: 'video-state', id: view.id, state: videoState(view.video) });
  }

  function once(target, name) {
    return new Promise(resolve => target.addEventListener(name, resolve, { once: true }));
  }

  // Settles with the promise, or after ms if it has not by then.
  function within(ms, promise) {
    return Promise.race([promise, new Promise(resolve => setTimeout(resolve, ms))]);
  }

  // ---- the page's state ----
  function currentTheme() {
    return { attr: document.documentElement.dataset.theme ?? null, prefersDark: matchMedia('(prefers-color-scheme: dark)').matches };
  }
  const postTheme = () => worker.postMessage({ t: 'theme', theme: currentTheme() });
  new MutationObserver(postTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', postTheme);

  document.addEventListener('visibilitychange', () => {
    views.forEach(view => {
      if (document.hidden) pause(view);
      else if (view.visible && view.state === 'ready') play(view);
    });
    worker.postMessage({ t: 'hidden', hidden: document.hidden });
  });

  // ---- ?debug: what render-poster.mjs drives ----
  const replies = new Map();
  let calls = 0;
  const ask = (name, args) => new Promise((resolve, reject) => {
    const call = ++calls;
    replies.set(call, data => (data.error ? reject(new Error(data.error)) : resolve(data.value)));
    worker.postMessage({ t: 'call', call, name, args });
  });
  if (debug) {
    window.liveScenes = {
      views,
      // A still of a loaded view at a frame (the poster's unless given), as a Blob.
      snapshot: (index, { frame, width, height, type = 'image/webp', quality = 0.9 }) => {
        pause(views[index]);
        return ask('snapshot', { id: views[index].id, frame, width, height, type, quality });
      },
    };
  }
}
