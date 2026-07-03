document.addEventListener('DOMContentLoaded', function() {
   /* __LANG_DATA_START__ */
   // Per-locale UI strings consumed below (language picker + nav toggle).
   // This whole block is regenerated at build time by LangPickerDataProcessor
   // from Strings/Localizable.json, so adding a language never needs a JS edit.
   // The values here are dev/fallback defaults only.
   const labels = { en: '🇺🇸', de: '🇩🇪', ja: '🇯🇵' };
   const names = { en: 'English', de: 'Deutsch', ja: '日本語' };
   const navToggleLabels = { en: 'Toggle navigation menu', de: 'Toggle navigation menu', ja: 'Toggle navigation menu' };
   const CURRENT_LANG = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
   /* __LANG_DATA_END__ */

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

      // `labels` / `names` are defined once at the top of this handler (and
      // regenerated from the string catalog at build time). Flag emojis render
      // via Segoe UI Emoji / system emoji fonts - no Twemoji dependency needed.

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
      toggle.setAttribute('aria-label', navToggleLabels[CURRENT_LANG] || navToggleLabels.en || 'Toggle navigation menu');
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

      // Display the UID as colon-separated hex byte pairs (04:A1:B2:...).
      const tagId = uid && isHex(uid) ? uid.toUpperCase().match(/.{1,2}/g).join(':') : null;
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
});

// Affiliate country picker: mark the visitor's most likely local Amazon store
// with a small badge so they don't have to hunt for their flag. Pure progressive
// enhancement - the grid works without JS, and this only reads navigator.language
// (no network, no tracking). The badge label comes from data-badge-label so each
// locale can translate it without touching this script.
document.addEventListener('DOMContentLoaded', function () {
   var grids = document.querySelectorAll('.affiliate-country-grid');
   if (!grids.length) return;
   var lang = (navigator.language || '').trim();
   if (!lang) return;
   var parts = lang.split('-');
   var region = (parts[1] || '').toUpperCase();
   if (!region) {
      var langToRegion = { en: 'US', de: 'DE', fr: 'FR', it: 'IT', es: 'ES', nl: 'NL', sv: 'SE', pl: 'PL' };
      region = langToRegion[(parts[0] || '').toLowerCase()] || '';
   }
   if (!region) return;
   grids.forEach(function (grid) {
      var tile = grid.querySelector('[data-region="' + region + '"]');
      if (!tile) return;
      tile.classList.add('is-local');
      var badge = document.createElement('span');
      badge.className = 'affiliate-country-badge';
      badge.textContent = grid.getAttribute('data-badge-label') || 'Your store';
      tile.appendChild(badge);
   });
});
