/**
 * ═══════════════════════════════════════════════════════════════
 * ANIMATIONS — IntersectionObserver scroll reveals
 * ═══════════════════════════════════════════════════════════════
 */

export function initAnimations() {
  // ── Scroll reveal elements ───────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  const staggerElements = document.querySelectorAll('.reveal-stagger');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-stagger--visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  staggerElements.forEach(el => staggerObserver.observe(el));

  // ── Lazy image loading ───────────────────────────────────────
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  // ── Parallax effect on hero (subtle) ─────────────────────────
  const heroBackground = document.querySelector('.hero__background img');
  if (heroBackground && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}
