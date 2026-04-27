/* ── SCROLL REVEAL ──────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── NAV SHRINK ON SCROLL ───────────────────── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 80){
    nav.style.boxShadow = '0 4px 32px rgba(14,14,12,0.12)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

/* ── TEXT SPLIT ANIMATION (hero title) ──────── */
document.querySelectorAll('.s-title').forEach(el => {
  if(el.closest('#hero')) return;
});

/* ── STEP HOVER SOUND EFFECT (visual only) ──── */
document.querySelectorAll('.step').forEach(s => {
  s.addEventListener('mouseenter', () => {
    s.querySelector('.step-n').style.transform = 'translateX(4px)';
  });
  s.addEventListener('mouseleave', () => {
    s.querySelector('.step-n').style.transform = '';
  });
});

/* ── TESTIMONIAL CAROUSEL ───────────────────── */
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.testi-grid');
  const slides = Array.from(track.querySelectorAll('.tcard'));
  const prevBtn = carousel.querySelector('.testi-prev');
  const nextBtn = carousel.querySelector('.testi-next');
  const dots = carousel.querySelector('.testi-dots');
  let index = 0;

  slides.forEach((_, slideIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testi-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${slideIndex + 1}`);
    dot.addEventListener('click', () => {
      index = slideIndex;
      updateCarousel();
    });
    dots.appendChild(dot);
  });

  const dotButtons = Array.from(dots.querySelectorAll('.testi-dot'));

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0);
    const offset = index * (slideWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;

    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
      index += 1;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel, { passive: true });
  updateCarousel();
});

// HAMBURGER 
const hamburger = document.getElementById('navHamburger');
const navLinks = document.querySelector('.nav-links');
const blurOverlay = document.getElementById('navBlurOverlay');

function openNav() {
  hamburger.classList.add('open');
  navLinks.classList.add('mobile-open');
  blurOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  blurOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeNav() : openNav();
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on overlay click
blurOverlay.addEventListener('click', closeNav);
