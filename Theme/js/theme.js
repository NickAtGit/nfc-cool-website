// NFC.cool theme JS — dark mode toggle
(function() {
   const toggle = document.querySelector('.sk-theme-toggle');
   if (toggle) {
      toggle.addEventListener('click', function(e) {
         e.preventDefault();
         const current = document.documentElement.getAttribute('data-theme');
         const next = current === 'dark' ? 'light' : 'dark';
         document.documentElement.setAttribute('data-theme', next);
         localStorage.setItem('theme', next);
      });
   }
})();