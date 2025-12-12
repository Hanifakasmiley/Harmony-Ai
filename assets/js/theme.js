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
      // Remove any existing event listeners by cloning
      const newBtn = mobileMenuBtn.cloneNode(true);
      mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);

      // Set initial state
      newBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      newBtn.classList.remove('open');

      // Add click handler
      newBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = navMenu.classList.toggle('active');
        newBtn.classList.toggle('open', isActive);
        newBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');

        console.log('Mobile menu toggled:', isActive);
      });

      // Close menu when clicking a link
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
          navMenu.classList.remove('active');
          newBtn.classList.remove('open');
          newBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', function (e) {
        if (!newBtn.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          newBtn.classList.remove('open');
          newBtn.setAttribute('aria-expanded', 'false');
        }
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
