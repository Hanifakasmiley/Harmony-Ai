(function () {
  function init() {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    // Ensure a theme toggle exists (create if missing)
    function ensureThemeToggle() {
      let t = document.querySelector('.theme-toggle');
      if (t) return t;

      t = document.createElement('button');
      t.className = 'theme-toggle';
      t.type = 'button';
      t.title = 'Toggle dark mode';
      t.style.minWidth = '40px';

      // Fallback placement: prefer navActions, else top-right floating
      if (navActions) {
        navActions.insertBefore(t, navActions.firstChild || null);
      } else {
        t.style.position = 'fixed';
        t.style.right = '16px';
        t.style.top = '16px';
        t.style.zIndex = 99999;
        document.body.appendChild(t);
      }
      return t;
    }

    var themeToggle = ensureThemeToggle();

    // Apply saved theme immediately
    var savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Update toggle UI
    updateToggleUI();

    // Attach listener
    themeToggle.addEventListener('click', function () {
      var isDark = bodyElement.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      updateToggleUI();
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: isDark ? 'dark' : 'light' } }));
    });

    function updateToggleUI() {
      var isDark = bodyElement.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }

    function applyTheme(t) {
      if (t === 'dark') {
        bodyElement.classList.add('dark-mode');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        bodyElement.classList.remove('dark-mode');
        htmlElement.setAttribute('data-theme', 'light');
      }
    }

    // Mobile menu toggle with accessibility updates
    if (mobileMenuBtn && navMenu) {
      // ensure aria-expanded exists
      if (!mobileMenuBtn.hasAttribute('aria-expanded')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }

      // Initialize button state based on menu
      const initActive = navMenu.classList.contains('active');
      mobileMenuBtn.classList.toggle('open', initActive);
      mobileMenuBtn.setAttribute('aria-expanded', initActive ? 'true' : 'false');

      mobileMenuBtn.addEventListener('click', function () {
        const isActive = navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open', isActive);
        mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });

      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
          navMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === './' + currentPage || href === './' + currentPage.replace('.html', '.html') || href === currentPage) {
        link.classList.add('active');
      } else if (currentPage === '' && href === './index.html') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose ThemeManager
  window.ThemeManager = {
    isDark: () => document.body.classList.contains('dark-mode'),
    toggle: () => document.querySelector('.theme-toggle')?.click(),
    set: (theme) => {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    }
  };
})();
