document.addEventListener('DOMContentLoaded', function() {
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

      const currentLang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
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

      // Display labels per locale code (extend here when adding locales).
      const labels = { en: 'EN', de: 'DE', ja: 'JA' };
      const names  = { en: 'English', de: 'Deutsch', ja: '日本語' /* 日本語 */ };

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
});
