/* ─── Tercezenha — Sub-page shared JS ──────────────────────── */

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis smooth scroll ──────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ─── Active nav link ──────────────────────────────────────────
(function markActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-header nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// ─── Page hero entrance ───────────────────────────────────────
(function animatePageHero() {
  const eyebrow = document.querySelector('.page-hero .hero-eyebrow');
  const title   = document.querySelector('.page-hero .page-title');
  const sub     = document.querySelector('.page-hero .hero-sub');
  if (!title) return;

  const tl = gsap.timeline({ delay: 0.1 });
  if (eyebrow) tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' });
  tl.from(title, { y: 50, opacity: 0, duration: 0.9, ease: 'power4.out' }, eyebrow ? '-=0.4' : '0');
  if (sub)    tl.from(sub,    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
})();

// ─── Scroll reveal: individual elements ──────────────────────
// Add data-reveal to any element for a fade-up on scroll enter
document.querySelectorAll('[data-reveal]').forEach(el => {
  gsap.from(el, {
    y: 36,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
});

// ─── Scroll reveal: staggered groups ─────────────────────────
// Add data-reveal-group to a container — its direct children stagger in
document.querySelectorAll('[data-reveal-group]').forEach(group => {
  const children = Array.from(group.children);
  gsap.from(children, {
    y: 40,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    stagger: 0.07,
    scrollTrigger: {
      trigger: group,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

// ─── Scroll reveal: table rows ────────────────────────────────
document.querySelectorAll('[data-reveal-rows]').forEach(table => {
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  gsap.from(rows, {
    x: -24,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.06,
    scrollTrigger: {
      trigger: table,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

// ─── Scroll reveal: alternating event cards ──────────────────
document.querySelectorAll('.event-card').forEach((card, i) => {
  gsap.from(card, {
    x: i % 2 === 0 ? -50 : 50,
    opacity: 0,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
});

// ─── Carousel — crossfade + Ken Burns ─────────────────────────
(function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const slides   = track.querySelectorAll('.carousel-slide');
  const total    = slides.length;
  const counter  = document.getElementById('carousel-counter');
  const progress = document.getElementById('carousel-progress');
  let current    = 0;
  let animating  = false;
  let kenBurns   = null;

  // Mirror each slide's image as a blurred background
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) slide.style.backgroundImage = `url('${img.src}')`;
  });

  // Stack all slides, show only first
  gsap.set(slides, { autoAlpha: 0, scale: 1 });
  gsap.set(slides[0], { autoAlpha: 1 });

  function startKenBurns(slide) {
    if (kenBurns) kenBurns.kill();
    const img = slide.querySelector('img');
    if (!img) return;
    gsap.set(img, { scale: 1, xPercent: 0, yPercent: 0 });
    kenBurns = gsap.to(img, {
      scale: 1.05,
      xPercent: Math.random() > 0.5 ? 1.5 : -1.5,
      yPercent: Math.random() > 0.5 ? 1   : -1,
      duration: 9,
      ease: 'none',
    });
  }
  startKenBurns(slides[0]);

  function updateProgress(idx) {
    if (!progress) return;
    gsap.to(progress, { width: ((idx + 1) / total * 100) + '%', duration: 0.5, ease: 'power2.out' });
  }
  updateProgress(0);

  function goTo(index) {
    if (animating) return;
    animating = true;

    const prev = current;
    current = (index + total) % total;

    if (kenBurns) kenBurns.kill();

    // Outgoing: zoom out + fade
    const prevImg = slides[prev].querySelector('img');
    if (prevImg) gsap.to(prevImg, { scale: 1.12, duration: 0.8, ease: 'power2.inOut' });
    gsap.to(slides[prev], { autoAlpha: 0, duration: 0.65, ease: 'power2.inOut' });

    // Incoming: zoom in from slightly small + fade
    const nextImg = slides[current].querySelector('img');
    if (nextImg) gsap.set(nextImg, { scale: 0.96, xPercent: 0, yPercent: 0 });
    gsap.fromTo(slides[current],
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.65,
        ease: 'power2.inOut',
        onComplete() {
          animating = false;
          startKenBurns(slides[current]);
        },
      }
    );
    if (nextImg) gsap.to(nextImg, { scale: 1, duration: 0.65, ease: 'power2.inOut' });

    if (counter) counter.textContent = (current + 1) + ' / ' + total;
    updateProgress(current);
  }

  document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();

// ─── Trote card 3D tilt ───────────────────────────────────────
document.querySelectorAll('.trote-card').forEach(card => {
  const img = card.querySelector('.trote-card__img');

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    gsap.to(card, {
      rotateY:           x * 9,
      rotateX:          -y * 6,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power2.out',
    });
    if (img) gsap.to(img, { x: x * 14, y: y * 10, duration: 0.45, ease: 'power2.out' });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0, rotateX: 0,
      transformPerspective: 900,
      duration: 0.8,
      ease: 'elastic.out(1, 0.55)',
    });
    if (img) gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.55)' });
  });
});

// ─── Hero photo parallax ──────────────────────────────────────
(function initHeroParallax() {
  const hero = document.querySelector('.page-hero--photo');
  if (!hero) return;
  gsap.to(hero, {
    backgroundPositionY: '35%',
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
})();
