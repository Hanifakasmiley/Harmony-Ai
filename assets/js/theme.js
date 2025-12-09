(function () {
  // ===== THEME TOGGLE FUNCTIONALITY =====
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
    updateThemeIcon(isDark);

    // Dispatch custom event for charts to update
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
  }

  function updateThemeIcon(isDark) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  function initThemeToggle() {
    // Check if theme toggle already exists, if not create it
    let themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
      const navActions = document.querySelector('.nav-actions');
      if (navActions) {
        themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.type = 'button';
        navActions.insertBefore(themeToggle, navActions.firstChild);
      }
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  // ===== MOBILE MENU FUNCTIONALITY =====
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
      if (!mobileMenuBtn.hasAttribute('aria-expanded')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }

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
  }

  // ===== ACTIVE NAV LINK =====
  function initActiveNav() {
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

  // ===== INIT FUNCTION =====
  function init() {
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
