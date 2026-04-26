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
