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

    // Animated counters for the statistics section. Each element with the
    // `counter` class will count up from 0 to its data-target attribute
    // when it enters the viewport. A suffix (e.g. '+') can be provided
    // via the data-suffix attribute.
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.getAttribute('data-target')) || 0;
              const suffix = el.getAttribute('data-suffix') || '';
              let start = null;
              const duration = 2000; // total duration of the count animation in ms
              function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const ratio = Math.min(progress / duration, 1);
                const current = Math.floor(ratio * target);
                el.textContent = `${current}${suffix}`;
                if (progress < duration) {
                  window.requestAnimationFrame(animate);
                } else {
                  el.textContent = `${target}${suffix}`;
                }
              }
              // Start the animation
              window.requestAnimationFrame(animate);
              // Stop observing this element after animation is triggered
              obs.unobserve(el);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      // If IntersectionObserver isn't available, set counters instantly
      counters.forEach((el) => {
        const target = el.getAttribute('data-target') || el.textContent;
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `${target}${suffix}`;
      });
    }

    // Hero entrance animations using GSAP. If GSAP is available we
    // animate the hero columns on page load for a dramatic entrance.
    if (typeof gsap !== 'undefined') {
      const heroText = document.querySelector('.hero-col-text');
      const heroImage = document.querySelector('.hero-col-image');
      if (heroText && heroImage) {
        gsap.from(heroText, { x: -60, opacity: 0, duration: 1.0, ease: 'power3.out' });
        gsap.from(heroImage, { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out' });
      }
    }
  });
})();