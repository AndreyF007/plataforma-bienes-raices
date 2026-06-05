/**
 * ═══════════════════════════════════════════════════════════════
 * NAVIGATION — Sticky navbar + mobile menu
 * ═══════════════════════════════════════════════════════════════
 */

export function initNavigation(config) {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navbar) return;

  // ── Sticky navbar on scroll ──────────────────────────────────
  let lastScroll = 0;
  const scrollThreshold = 50;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ── Mobile menu toggle ───────────────────────────────────────
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.contains('mobile-menu--active');

      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--active')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('mobile-menu--active');
    toggle.classList.add('navbar__toggle--active');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-menu--active');
    toggle.classList.remove('navbar__toggle--active');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  // ── Smooth scroll for nav links ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ── Active link highlighting ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function highlightActiveLink() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('navbar__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('navbar__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
}
