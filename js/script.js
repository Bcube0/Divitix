// Minimal JavaScript for Dvitix
// This script handles toggling a mobile navigation menu if a hamburger button exists.
// Immediately invoked function to encapsulate our logic and avoid polluting
// the global scope. Handles mobile nav toggling and reveal animations.
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    // Close the mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  // Reveal animations using IntersectionObserver. Elements with the class
  // `reveal` start hidden and slide into view when scrolled into the viewport.
  document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = parseFloat(el.dataset.delay) || 0;
              // Apply a transition delay based on the data-delay attribute
              el.style.transitionDelay = `${delay}s`;
              el.classList.add('visible');
              obs.unobserve(el);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      reveals.forEach((el) => observer.observe(el));
    } else {
      // If IntersectionObserver is not supported, show all elements immediately
      reveals.forEach((el) => el.classList.add('visible'));
    }
  });
})();