(function () {
  function init() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle with accessibility updates
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
})();
