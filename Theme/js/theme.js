document.addEventListener('DOMContentLoaded', function() {
   // Strip `?noredirect=1` from the URL once the page has loaded. The
   // fallback-redirect pages for EN-only static slugs (Terms, Privacy in
   // DE/JA) target `/{slug}/?noredirect=1` to bypass the inline language-
   // redirect script (otherwise we'd loop forever). After the page is up,
   // there's no reason to keep the query param visible.
   try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('noredirect')) {
         url.searchParams.delete('noredirect');
         const cleaned = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') + url.hash;
         history.replaceState(null, '', cleaned);
      }
   } catch (e) { /* old browser, no-op */ }

   // External links → new tab. Any anchor whose hostname differs from the
   // current origin gets target="_blank" + rel="noopener noreferrer" so the
   // user stays on the marketing site after clicking out (and the opened tab
   // can't access window.opener of this page).
   document.querySelectorAll('a[href]').forEach(function(a) {
      const href = a.getAttribute('href');
      if (!href) return;
      // Skip relative paths, fragments, mailto/tel/javascript schemes
      if (!/^https?:\/\//i.test(href)) return;
      // Skip if author already set a target explicitly
      if (a.hasAttribute('target')) return;
      try {
         const url = new URL(href, window.location.href);
         if (url.host === window.location.host) return;
      } catch (e) {
         return;
      }
      a.setAttribute('target', '_blank');
      const existingRel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (!existingRel.includes('noopener')) existingRel.push('noopener');
      if (!existingRel.includes('noreferrer')) existingRel.push('noreferrer');
      a.setAttribute('rel', existingRel.join(' '));
   });

   // Email de-obfuscation - EmailObfuscationProcessor (build step) drops the
   // real `mailto:` href and stashes it Base64-encoded in `data-eml`, so
   // harvester bots (which don't run JS) can't scrape the address. Here we
   // decode it back onto the link. Decoding goes through Uint8Array +
   // TextDecoder rather than bare atob so a non-ASCII subject would survive.
   // Without JS the link is inert, but its generic label ("Email us" etc.)
   // still reads fine - no address is exposed either way.
   document.querySelectorAll('a[data-eml]').forEach(function(el) {
      try {
         const bytes = Uint8Array.from(atob(el.getAttribute('data-eml')), function(c) {
            return c.charCodeAt(0);
         });
         el.setAttribute('href', new TextDecoder().decode(bytes));
         el.removeAttribute('data-eml');
      } catch (e) { /* link stays inert, no address leaked */ }
   });

   // Dark mode toggle
   const toggle = document.querySelector('.sk-theme-toggle');
   if (toggle) {
      toggle.addEventListener('click', function() {
         const current = document.documentElement.getAttribute('data-theme');
         const next = current === 'dark' ? 'light' : 'dark';
         document.documentElement.setAttribute('data-theme', next);
         localStorage.setItem('theme', next);
      });
   }

   // Language picker - dropdown listing every configured locale. The set
   // of locales is read from the hreflang <link> tags SiteKit already emits
   // on every page, so adding a new language only requires adding it to
   // SiteConfig.yaml localization.languages -- no JS change needed.
   document.querySelectorAll('.sk-lang-picker').forEach(function(picker) {
      const btn = picker.querySelector('.sk-lang-btn');
      const menu = picker.querySelector('.sk-lang-menu');
      const labelEl = btn && btn.querySelector('.sk-lang-current');
      if (!btn || !menu) return;

      // Normalize to bare language code: `<html lang>` is `en-US` / `de-DE` /
      // `ja-JP` since LocaleRegionProcessor added country codes for SEO, but
      // the `labels` / `names` maps below are keyed on bare codes (en/de/ja).
      const currentLang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
      const alternates = Array.from(
         document.querySelectorAll('link[rel="alternate"][hreflang]')
      )
         .map(function(link) {
            return { lang: link.getAttribute('hreflang').toLowerCase(), href: link.getAttribute('href') };
         })
         .filter(function(item) { return item.lang && item.lang !== 'x-default'; });

      // Fallback if no hreflang links present (e.g., single-locale site): keep
      // the picker but only show the current locale.
      const seen = new Set();
      const locales = alternates.filter(function(item) {
         if (seen.has(item.lang)) return false;
         seen.add(item.lang);
         return true;
      });
      if (!locales.length) {
         picker.style.display = 'none';
         return;
      }

      // Display labels per locale code: flag emojis for visual recognition,
      // full names spelled out in their own language in the menu.
      // (Extend here when adding locales.) Windows 10+ and all modern
      // mobile/desktop browsers render these via Segoe UI Emoji or system
      // emoji fonts — no Twemoji dependency needed.
      const labels = { en: '🇺🇸', de: '🇩🇪', ja: '🇯🇵' };
      const names  = { en: 'English', de: 'Deutsch', ja: '日本語' };

      // Set the button label to the current locale.
      if (labelEl) labelEl.textContent = labels[currentLang] || currentLang.toUpperCase();
      btn.setAttribute('aria-haspopup', 'menu');
      btn.setAttribute('aria-expanded', 'false');

      // Populate the menu with one item per locale.
      menu.textContent = '';
      menu.setAttribute('role', 'menu');
      locales.sort(function(a, b) { return a.lang.localeCompare(b.lang); });
      locales.forEach(function(item) {
         const a = document.createElement('a');
         a.href = item.href;
         a.setAttribute('hreflang', item.lang);
         a.setAttribute('role', 'menuitem');
         a.className = 'sk-lang-item' + (item.lang === currentLang ? ' is-current' : '');
         const code = document.createElement('span');
         code.className = 'sk-lang-item-code';
         code.textContent = labels[item.lang] || item.lang.toUpperCase();
         const name = document.createElement('span');
         name.className = 'sk-lang-item-name';
         name.textContent = names[item.lang] || item.lang;
         a.appendChild(code);
         a.appendChild(name);
         a.addEventListener('click', function() {
            try { localStorage.setItem('preferredLang', item.lang); } catch (e) {}
         });
         menu.appendChild(a);
      });

      // Toggle menu on button click.
      function setOpen(open) {
         picker.classList.toggle('is-open', open);
         btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      btn.addEventListener('click', function(event) {
         event.preventDefault();
         event.stopPropagation();
         setOpen(!picker.classList.contains('is-open'));
      });
      // Close on outside click or Escape.
      document.addEventListener('click', function(event) {
         if (!picker.classList.contains('is-open')) return;
         if (!event.target.closest('.sk-lang-picker')) setOpen(false);
      });
      document.addEventListener('keydown', function(event) {
         if (event.key === 'Escape' && picker.classList.contains('is-open')) setOpen(false);
      });
   });

   // FAQ accordion - details/summary handles this natively

   // Mobile burger menu - SiteKit doesn't emit a toggle button, so we inject
   // one and wire it to the existing `.sk-nav-list` / `.sk-nav-open` pattern.
   (function() {
      const nav = document.querySelector('.sk-site-nav');
      const navList = document.querySelector('.sk-nav-list');
      if (!nav || !navList || document.querySelector('.sk-nav-toggle')) return;

      const toggle = document.createElement('button');
      toggle.className = 'sk-nav-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Toggle navigation menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'sk-nav-list');
      // Build a hamburger + close SVG pair so the burger reads as the same
      // visual weight as the lang-globe / theme-toggle icons next to it
      // (both use a 2-unit stroke on a 24×24 viewBox rendered at 16×16).
      const SVG_NS = 'http://www.w3.org/2000/svg';
      function makeIcon(modifierClass, lines) {
         const svg = document.createElementNS(SVG_NS, 'svg');
         svg.setAttribute('class', 'sk-nav-toggle-icon ' + modifierClass);
         svg.setAttribute('width', '16');
         svg.setAttribute('height', '16');
         svg.setAttribute('viewBox', '0 0 24 24');
         svg.setAttribute('fill', 'none');
         svg.setAttribute('stroke', 'currentColor');
         svg.setAttribute('stroke-width', '2');
         svg.setAttribute('stroke-linecap', 'round');
         svg.setAttribute('stroke-linejoin', 'round');
         svg.setAttribute('aria-hidden', 'true');
         lines.forEach(function(coords) {
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', coords[0]);
            line.setAttribute('y1', coords[1]);
            line.setAttribute('x2', coords[2]);
            line.setAttribute('y2', coords[3]);
            svg.appendChild(line);
         });
         return svg;
      }
      toggle.appendChild(makeIcon('sk-nav-toggle-icon-open',
         [[4, 7, 20, 7], [4, 12, 20, 12], [4, 17, 20, 17]]));
      toggle.appendChild(makeIcon('sk-nav-toggle-icon-close',
         [[6, 6, 18, 18], [18, 6, 6, 18]]));
      if (!navList.id) navList.id = 'sk-nav-list';
      nav.appendChild(toggle);

      function setOpen(open) {
         navList.classList.toggle('sk-nav-open', open);
         toggle.classList.toggle('is-open', open);
         toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
         document.body.classList.toggle('sk-mobile-menu-open', open);
      }

      toggle.addEventListener('click', function() {
         setOpen(!navList.classList.contains('sk-nav-open'));
      });

      // Close on outside click + on link click
      document.addEventListener('click', function(event) {
         if (!navList.classList.contains('sk-nav-open')) return;
         if (event.target.closest('.sk-nav-toggle')) return;
         if (event.target.closest('.sk-nav-list a')) { setOpen(false); return; }
         if (!event.target.closest('.sk-site-nav')) setOpen(false);
      });

      // Close when crossing back to desktop width
      const mq = window.matchMedia('(min-width: 769px)');
      mq.addEventListener('change', function(e) { if (e.matches) setOpen(false); });
   })();

   // Newsletter form - POSTs directly to the shared Mailjet-proxy Cloudflare
   // Worker that's already in production for the NFC.cool iOS apps. The Worker
   // has its Mailjet credentials + target list ID baked in and accepts a
   // simple `{ email }` body; CORS is wide-open so any origin works.
   document.querySelectorAll('.newsletter-form').forEach(function(form) {
      const status = form.querySelector('.newsletter-status');
      const button = form.querySelector('button[type="submit"]');
      const input = form.querySelector('input[type="email"]');
      const endpoint = form.dataset.endpoint || 'https://mailjet.02mining-hollers.workers.dev/';
      const successText = form.dataset.success || 'Thanks!';
      const errorText = form.dataset.error || 'Something went wrong. Please try again.';

      function setStatus(text, kind) {
         if (!status) return;
         status.textContent = text;
         status.classList.remove('is-success', 'is-error');
         if (kind) status.classList.add('is-' + kind);
      }

      form.addEventListener('submit', async function(event) {
         event.preventDefault();
         if (!input || !input.value) return;
         button.disabled = true;
         setStatus('…');
         try {
            const response = await fetch(endpoint, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: input.value.trim() })
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            setStatus(successText, 'success');
            input.value = '';
         } catch (err) {
            setStatus(errorText, 'error');
         } finally {
            button.disabled = false;
         }
      });
   });

   // NFC Tap Counter demo - the /tap-counter/ page. A NTAG21x tag written
   // with NFC.cool Tools' Tap Counter feature appends `?nfc={uid}x{counter}`
   // to this page's URL on every scan: counter is a hex string (6 chars,
   // padded), uid is a 14-char hex serial, joined by a literal `x`. Either
   // part can appear alone. The chip did the counting - this block only
   // decodes the query string and reveals the result.
   (function() {
      const demo = document.getElementById('tap-counter-demo');
      if (!demo) return;
      const raw = new URLSearchParams(window.location.search).get('nfc');
      if (!raw) return;

      const isHex = function(s) { return /^[0-9a-fA-F]+$/.test(s); };
      let uid = null;
      let counterHex = null;
      if (raw.indexOf('x') !== -1) {
         const parts = raw.split('x');
         uid = parts[0];
         counterHex = parts[1];
      } else if (/^[0-9a-fA-F]{14}$/.test(raw)) {
         uid = raw;
      } else if (isHex(raw)) {
         counterHex = raw;
      }

      const tagId = uid && isHex(uid) ? uid.toUpperCase() : null;
      const count = counterHex && isHex(counterHex) ? parseInt(counterHex, 16) : null;
      // Nothing usable in the parameter - leave the instructional state up.
      if (tagId === null && count === null) return;

      const countRow = demo.querySelector('.tap-demo-count-row');
      const idRow = demo.querySelector('.tap-demo-id-row');
      const countEl = demo.querySelector('[data-tap-count]');
      const idEl = demo.querySelector('[data-tap-id]');
      const rawEl = demo.querySelector('[data-tap-raw]');

      if (count !== null && countEl) {
         countEl.textContent = count.toLocaleString();
      } else if (countRow) {
         countRow.style.display = 'none';
      }

      if (tagId !== null && idEl) {
         idEl.textContent = tagId;
      } else if (idRow) {
         idRow.style.display = 'none';
      }

      if (rawEl) rawEl.textContent = raw;
      demo.classList.add('is-active');
   })();

   // Online NFC Reader + Writer - the /nfc-reader/ page. Uses the Web NFC
   // API (NDEFReader: scan / write / makeReadOnly), which exists only in
   // Chrome on Android. data-state picks the visible .nfc-reader-panel and
   // data-mode highlights the Read/Write tab. The HTML default state is
   // "desktop", so a no-JS visitor still lands on a usable panel.
   (function() {
      const app = document.getElementById('nfc-reader-app');
      if (!app) return;

      function setState(s) { app.setAttribute('data-state', s); }
      function stateNow() { return app.getAttribute('data-state'); }
      function setMode(m) {
         app.setAttribute('data-mode', m);
         app.querySelectorAll('[data-nfc-tab]').forEach(function(tab) {
            tab.setAttribute('aria-selected', tab.getAttribute('data-nfc-tab') === m ? 'true' : 'false');
         });
      }

      // Route non-Android-Chrome visitors to a device-specific panel. Web NFC
      // (NDEFReader) ships only in Chrome on Android; iPhone and desktop get
      // their own guidance instead of a misleading "unsupported" fallback.
      const ua = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /Android/.test(ua);
      if (!('NDEFReader' in window)) {
         setState(isIOS ? 'ios' : (isAndroid ? 'android-other' : 'desktop'));
         return;
      }

      const recordsEl = app.querySelector('[data-nfc-records]');
      const serialEl = app.querySelector('[data-nfc-serial]');
      const errorEl = app.querySelector('[data-nfc-error-msg]');
      const writtenEl = app.querySelector('[data-nfc-written]');
      const inputEl = app.querySelector('[data-nfc-input]');
      const inputErrEl = app.querySelector('[data-nfc-input-error]');
      const lockStartWrap = app.querySelector('[data-nfc-lock-start-wrap]');
      const lockConfirmEl = app.querySelector('[data-nfc-lock-confirm]');

      let scanReader = null;     // held so the active scan isn't GC'd
      let readArmed = false;     // reader.scan() is already listening
      let writeType = 'url';     // 'url' | 'text'
      let lastAction = 'read';   // what the error panel's retry re-runs
      let opAbort = null;        // aborts an in-flight write / lock

      setMode('read');
      setState('read-ready');

      // --- Reading -----------------------------------------------------
      // Decode one NDEF record into { label, value, href? }.
      function decodeRecord(record) {
         const type = record.recordType;
         try {
            if (type === 'text') {
               return { label: 'Text', value: new TextDecoder(record.encoding || 'utf-8').decode(record.data) };
            }
            if (type === 'url' || type === 'absolute-url') {
               const url = new TextDecoder().decode(record.data);
               return { label: 'Link', value: url, href: url };
            }
            if (type === 'mime') {
               return { label: record.mediaType || 'Data', value: record.data.byteLength + ' bytes' };
            }
            if (type === 'empty') {
               return { label: 'Empty', value: 'No data on this record.' };
            }
            return { label: String(type), value: new TextDecoder().decode(record.data) };
         } catch (e) {
            return { label: String(type || 'Record'), value: '(could not be decoded)' };
         }
      }

      function showResult(event) {
         serialEl.textContent = event.serialNumber ? event.serialNumber.toUpperCase() : 'unavailable';
         recordsEl.textContent = '';
         const records = (event.message && event.message.records) || [];
         if (!records.length) {
            const li = document.createElement('li');
            li.className = 'nfc-reader-record';
            li.textContent = 'The tag is readable but holds no records.';
            recordsEl.appendChild(li);
         } else {
            records.forEach(function(record) {
               const decoded = decodeRecord(record);
               const li = document.createElement('li');
               li.className = 'nfc-reader-record';
               const label = document.createElement('span');
               label.className = 'nfc-reader-record-label';
               label.textContent = decoded.label;
               const value = document.createElement(decoded.href ? 'a' : 'span');
               value.className = 'nfc-reader-record-value';
               value.textContent = decoded.value;
               if (decoded.href) {
                  value.href = decoded.href;
                  value.target = '_blank';
                  value.rel = 'noopener nofollow';
               }
               li.appendChild(label);
               li.appendChild(value);
               recordsEl.appendChild(li);
            });
         }
         setState('result');
      }

      async function startScan() {
         lastAction = 'read';
         setState('scanning');
         // The reader stays armed once scan() resolves; onreading is guarded
         // on data-state so taps only count while the panel is "scanning".
         if (readArmed) return;
         try {
            scanReader = new NDEFReader();
            scanReader.onreading = function(event) {
               if (stateNow() === 'scanning') showResult(event);
            };
            scanReader.onreadingerror = function() {
               if (stateNow() !== 'scanning') return;
               errorEl.textContent = "I couldn't read that tag. Hold it flat against the top of your phone, then try again.";
               lastAction = 'read';
               setState('error');
            };
            await scanReader.scan();
            readArmed = true;
         } catch (e) {
            handleError(e, 'read');
         }
      }

      // --- Writing -----------------------------------------------------
      function buildRecord() {
         const raw = (inputEl.value || '').trim();
         if (!raw) {
            inputErrEl.textContent = writeType === 'url'
               ? 'Enter a link to write to the tag.'
               : 'Enter some text to write to the tag.';
            inputEl.focus();
            return null;
         }
         if (writeType === 'url') {
            let url = raw;
            if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = 'https://' + url;
            try {
               new URL(url);
            } catch (e) {
               inputErrEl.textContent = "That doesn't look like a valid link.";
               inputEl.focus();
               return null;
            }
            inputErrEl.textContent = '';
            return { recordType: 'url', data: url };
         }
         inputErrEl.textContent = '';
         return { recordType: 'text', data: raw, lang: 'en' };
      }

      async function startWrite() {
         const record = buildRecord();
         if (!record) return;
         lastAction = 'write';
         setState('writing');
         opAbort = new AbortController();
         try {
            const writer = new NDEFReader();
            await writer.write({ records: [record] }, { signal: opAbort.signal });
            writtenEl.textContent = record.data;
            resetLockConfirm();
            setState('written');
         } catch (e) {
            if (e && e.name === 'AbortError') return; // caller already set the next state
            handleError(e, 'write');
         }
      }

      // --- Locking -----------------------------------------------------
      function resetLockConfirm() {
         lockStartWrap.hidden = false;
         lockConfirmEl.hidden = true;
      }

      async function startLock() {
         lastAction = 'lock';
         setState('locking');
         opAbort = new AbortController();
         try {
            const locker = new NDEFReader();
            await locker.makeReadOnly({ signal: opAbort.signal });
            setState('locked');
         } catch (e) {
            if (e && e.name === 'AbortError') return; // caller already set the next state
            handleError(e, 'lock');
         }
      }

      // --- Shared ------------------------------------------------------
      function handleError(e, action) {
         lastAction = action;
         const name = e && e.name;
         let msg;
         if (name === 'NotAllowedError') {
            msg = 'NFC access was blocked. Allow NFC for this site, then try again.';
         } else if (name === 'NotSupportedError') {
            msg = "This phone can't reach an NFC chip. Check that NFC is switched on in Android settings.";
         } else if (name === 'NotReadableError') {
            msg = "Android couldn't open NFC. Make sure NFC is turned on, then try again.";
         } else if (action === 'write') {
            msg = "The tag couldn't be written. It may be locked, too small, or it moved away too soon.";
         } else if (action === 'lock') {
            msg = "The tag couldn't be locked. Hold it still against your phone and try again.";
         } else {
            msg = 'The scan stopped unexpectedly. Hold a tag to your phone and try again.';
         }
         errorEl.textContent = msg;
         setState('error');
      }

      function retry() {
         if (lastAction === 'write') startWrite();
         else if (lastAction === 'lock') startLock();
         else startScan();
      }

      function cancelOp() {
         const wasLocking = stateNow() === 'locking';
         if (opAbort) opAbort.abort();
         if (wasLocking) {
            resetLockConfirm();
            setState('written');
            return;
         }
         setState(app.getAttribute('data-mode') === 'write' ? 'write-ready' : 'read-ready');
      }

      function switchMode(mode) {
         if (opAbort) opAbort.abort();
         setMode(mode);
         setState(mode === 'write' ? 'write-ready' : 'read-ready');
      }

      function setWriteType(type) {
         writeType = type;
         app.setAttribute('data-write-type', type);
         inputEl.type = type === 'url' ? 'url' : 'text';
         inputEl.placeholder = type === 'url' ? 'https://example.com' : 'Your text here';
         inputEl.value = '';
         inputErrEl.textContent = '';
      }

      // --- Wiring ------------------------------------------------------
      function onClick(selector, handler) {
         app.querySelectorAll(selector).forEach(function(el) {
            el.addEventListener('click', handler);
         });
      }
      onClick('[data-nfc-scan], [data-nfc-again]', startScan);
      onClick('[data-nfc-write]', startWrite);
      onClick('[data-nfc-write-again]', function() { switchMode('write'); });
      onClick('[data-nfc-retry]', retry);
      onClick('[data-nfc-cancel]', cancelOp);
      onClick('[data-nfc-lock-start]', function() {
         lockStartWrap.hidden = true;
         lockConfirmEl.hidden = false;
      });
      onClick('[data-nfc-lock-cancel]', resetLockConfirm);
      onClick('[data-nfc-lock-go]', startLock);
      app.querySelectorAll('[data-nfc-tab]').forEach(function(tab) {
         tab.addEventListener('click', function() { switchMode(tab.getAttribute('data-nfc-tab')); });
      });
      app.querySelectorAll('[data-nfc-type]').forEach(function(btn) {
         btn.addEventListener('click', function() { setWriteType(btn.getAttribute('data-nfc-type')); });
      });
      inputEl.addEventListener('keydown', function(e) {
         if (e.key === 'Enter') { e.preventDefault(); startWrite(); }
      });
   })();
});
