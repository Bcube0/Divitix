// Navigation toggle for mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

// Reveal elements on scroll using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
const options = {
  threshold: 0.2,
};

const revealOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // if the reveal contains counters, start counting
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach((counter) => animateCounter(counter));
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnScroll, options);
revealElements.forEach((el) => observer.observe(el));

// Counter animation
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1500; // 1.5 seconds
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Floating label handling for contact form
document.querySelectorAll('.input-group input, .input-group textarea').forEach((input) => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('filled');
  });
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      input.parentElement.classList.remove('filled');
    }
  });
});

// Close nav when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (
    navMenu &&
    hamburger &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// Interactive 3D tilt effect for service cards. This adds an extra layer of
// engagement by tilting cards based on the mouse position. When the mouse
// leaves the card, the transform resets. Note: hover translation defined
// in CSS will be overridden while moving the mouse.
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -10;
    const rotateY = (x / rect.width) * 10;
    card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Automatically highlight the correct navigation link based on the current page
// and handle user clicks to update the active state. Without this logic the
// "active" class set in the HTML can become stale when navigating between
// pages or using anchors. This function inspects the current URL path and
// applies the active class to the matching link. It also binds click
// handlers so that clicking a link will highlight it and clear other
// highlights. The logic runs after the DOM is fully loaded.
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const path = window.location.pathname;

  // Remove any existing active classes first
  navLinks.forEach((link) => link.classList.remove('active'));

  // Decide which section of the site we are currently viewing based on the path.
  // When browsing the site locally (file protocol) the pathname will include
  // the full file system path (e.g. "/home/oai/share/website/index.html"). When
  // deployed on a server it will look like "/services/" or "/contact/".
  let activeKeyword;
  if (path.includes('services')) {
    activeKeyword = 'services';
  } else if (path.includes('contact')) {
    activeKeyword = 'contact';
  } else if (path.includes('about')) {
    activeKeyword = 'about';
  } else if (path.includes('why-us')) {
    activeKeyword = 'whyus';
  } else {
    // Default to home for everything else (index page and anchor views)
    activeKeyword = 'home';
  }

  // Apply the active class based on the chosen keyword. Nav links are
  // annotated with data-page attributes such as "home", "services" and
  // "contact" to make matching robust regardless of file paths. If the
  // link's data-page matches the active keyword, it should be highlighted.
  navLinks.forEach((link) => {
    const page = link.dataset.page;
    if (page === activeKeyword) {
      link.classList.add('active');
    }
  });

  // When a nav link is clicked on the same page (e.g. anchors), manually set
  // the active state. This ensures immediate feedback on the home page when
  // navigating to sections like #choose or #about.
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((ln) => ln.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Initialise the navigation active state when the DOM is ready. If the
// DOMContentLoaded event has already fired (for example when the script is
// placed at the end of the body), call the function immediately. Otherwise
// wait until the DOM has loaded.
if (document.readyState !== 'loading') {
  setActiveNavLink();
} else {
  document.addEventListener('DOMContentLoaded', setActiveNavLink);
}

// Simple slideshow for the showcase section. The slides automatically transition
// every 5 seconds. Each slide has the class "slide" and the currently visible
// slide carries the class "active". When there is only one slide, the
// slideshow is skipped.
(function () {
  const slideshow = document.querySelector('.slideshow');
  if (!slideshow) return;
  const slides = slideshow.querySelectorAll('.slide');
  if (slides.length <= 1) return;
  let current = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  function next() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  setInterval(next, 5000);
})();