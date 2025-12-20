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

  // ===== ROLE-BASED NAVIGATION =====
  function updateNavigationForRole() {
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'system_admin') {
      // Replace navbar with admin menu
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.borderTop = '3px solid #FFD700'; // Gold border for admin
        navbar.style.borderBottom = '3px solid #FFD700';
      }

      // Update logo link to admin.html
      const logoLink = document.querySelector('.logo a');
      if (logoLink) {
        logoLink.href = './admin.html';
      }

      // Replace nav menu with admin-only menu (Home, Dashboard, Admin)
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) {
        navMenu.innerHTML = `
          <a href="./index.html" class="nav-link">Home</a>
          <a href="./dashboard.html" class="nav-link">Dashboard</a>
          <a href="./admin.html" class="nav-link">Admin</a>
        `;
      }

      // Hide patient-specific nav items if they exist in the original menu
      const allNavLinks = document.querySelectorAll('.nav-menu a');
      allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('daily-logs') || href.includes('ai-analysis') ||
          href.includes('progress') || href.includes('crisis') ||
          href.includes('recommendations') || href.includes('sessions'))) {
          link.style.display = 'none';
        }
      });
    }
  }

  // ===== INIT FUNCTION =====
  function init() {
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initActiveNav();
    updateNavigationForRole();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
