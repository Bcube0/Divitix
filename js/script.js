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