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

   // Language toggle — flips between default locale ("/") and "/de/" prefix.
   // SiteKit ships an empty dropdown menu; we hijack the button to navigate
   // directly to the locale counterpart of the current page.
   document.querySelectorAll('.sk-lang-btn').forEach(function(btn) {
      const labelEl = btn.querySelector('.sk-lang-current');
      const path = window.location.pathname;
      const isDe = path === '/de' || path.startsWith('/de/');
      const target = isDe
         ? (path === '/de' ? '/' : path.replace(/^\/de/, ''))
         : '/de' + path;
      if (labelEl) labelEl.textContent = isDe ? 'EN' : 'DE';
      btn.setAttribute('aria-label', isDe ? 'Switch to English' : 'Switch to German');
      btn.addEventListener('click', function(event) {
         event.preventDefault();
         try { localStorage.setItem('preferredLang', isDe ? 'en' : 'de'); } catch (e) {}
         window.location.pathname = target;
      });
   });

   // FAQ accordion — details/summary handles this natively

   // Mobile burger menu — SiteKit doesn't emit a toggle button, so we inject
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
      for (let i = 0; i < 3; i++) {
         const bar = document.createElement('span');
         bar.className = 'sk-nav-toggle-bar';
         toggle.appendChild(bar);
      }
      if (!navList.id) navList.id = 'sk-nav-list';
      nav.insertBefore(toggle, navList);

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

   // Newsletter form — POSTs to a same-origin endpoint (Cloudflare Pages Function
   // or similar) that proxies to Mailjet using server-side credentials.
   document.querySelectorAll('.landing-newsletter-form').forEach(function(form) {
      const status = form.querySelector('.landing-newsletter-status');
      const button = form.querySelector('button[type="submit"]');
      const input = form.querySelector('input[type="email"]');
      const endpoint = form.dataset.endpoint || '/api/subscribe';
      const listID = form.dataset.listId || '';
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
               body: JSON.stringify({ email: input.value.trim(), listID: listID, locale: document.documentElement.lang || 'en' })
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
