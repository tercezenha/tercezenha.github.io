/* ─── Tercezenha — Landing Page ─────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

const loader      = document.getElementById('loader');
const loaderBar   = document.getElementById('loader-bar');
const loaderPct   = document.getElementById('loader-percent');
const canvas      = document.getElementById('canvas');
const ctx         = canvas.getContext('2d');
const videoWrap   = document.getElementById('video-wrap');
const darkOverlay = document.getElementById('dark-overlay');
const hero        = document.getElementById('hero');
const marqueeWrap = document.getElementById('marquee-wrap');
const marqueeText = document.querySelector('.marquee-text');
const scrollCont  = document.getElementById('scroll-container');

const FRAME_COUNT  = 122;
const FRAME_SPEED  = 2.0;   // animation completes at 50% of total scroll
let currentScale = 0.2;     // 0 = contain (full shirt), 1 = cover (fills viewport)
const FIRST_BATCH  = 12;    // frames to load before showing the page

const frames = new Array(FRAME_COUNT).fill(null);
let currentFrame = 0;
let sampledBg = '#080808';
let loadedCount = 0;

// ─── Loader ────────────────────────────────────────────────────
function setLoaderProgress(pct) {
  loaderBar.style.width = pct + '%';
  loaderPct.textContent = Math.round(pct) + '%';
}

function hideLoader() {
  setLoaderProgress(100);
  setTimeout(() => {
    loader.classList.add('hidden');
    initPage();
  }, 350);
}

// ─── Frame Preloader ───────────────────────────────────────────
function frameSrc(i) {
  return `frames/frame_${String(i + 1).padStart(4, '0')}.webp`;
}

function loadFrame(index) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => { frames[index] = img; resolve(); };
    img.onerror = () => resolve(); // skip broken frames gracefully
    img.src = frameSrc(index);
  });
}

// Phase 1: load first batch → show page
async function preloadFirstBatch() {
  const batch = [];
  for (let i = 0; i < FIRST_BATCH; i++) batch.push(loadFrame(i));
  await Promise.all(batch);
  setLoaderProgress(90);
  resizeCanvas();
  drawFrame(0);
  hideLoader();
  // Phase 2: load remaining frames in background
  preloadRemaining();
}

function preloadRemaining() {
  let i = FIRST_BATCH;
  function next() {
    if (i >= FRAME_COUNT) return;
    loadFrame(i).then(() => {
      loadedCount++;
      i++;
      next();
    });
  }
  // Load 4 at a time concurrently
  for (let t = 0; t < 4; t++) next();
}

// ─── Canvas renderer ───────────────────────────────────────────
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = window.innerWidth  * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  drawFrame(currentFrame);
}

function sampleBgColor(img) {
  const tmp = document.createElement('canvas');
  tmp.width = tmp.height = 4;
  const tc = tmp.getContext('2d');
  // Sample from top-left corner (always the black bg region) rather than averaging
  // the full image, which would produce a dark-purple fill that doesn't match frame edges
  tc.drawImage(img, 0, 0, Math.round(img.naturalWidth * 0.08), Math.round(img.naturalHeight * 0.08), 0, 0, 4, 4);
  const d = tc.getImageData(0, 0, 1, 1).data;
  sampledBg = `rgb(${d[0]},${d[1]},${d[2]})`;
}

function drawFrame(index) {
  const img = frames[index];
  if (!img) return;

  const cw = canvas.width  / (window.devicePixelRatio || 1);
  const ch = canvas.height / (window.devicePixelRatio || 1);
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const containScale = Math.min(cw / iw, ch / ih); // full image fits, no crop
  const coverScale   = Math.max(cw / iw, ch / ih); // fills viewport, crops excess
  const scale = containScale + (coverScale - containScale) * currentScale;
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.fillStyle = sampledBg;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);

  // Re-sample bg color every 20 frames
  if (index % 20 === 0) sampleBgColor(img);
}

// ─── Init ──────────────────────────────────────────────────────
function initPage() {
  initLenis();
  animateHeroIn();
  initHeroTransition();
  initFrameScrub();
  initSections();
  initDarkOverlay();
  initMarquee();
  initCounters();
  window.addEventListener('resize', resizeCanvas);
}

// ─── Lenis ─────────────────────────────────────────────────────
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ─── Hero entrance ─────────────────────────────────────────────
function animateHeroIn() {
  const words   = document.querySelectorAll('.hero-title .word');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const cue     = document.querySelector('.scroll-cue');

  gsap.timeline({ delay: 0.1 })
    .from(eyebrow, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
    .from(words,   { y: 60, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power4.out' }, '-=0.4')
    .from(sub,     { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .from(cue,     { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
}

// ─── Hero fade-out + canvas circle-wipe ────────────────────────
function initHeroTransition() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      const p = self.progress;

      // Hero fades out in first 6% of scroll
      hero.style.opacity = Math.max(0, 1 - p / 0.06);

      // Canvas fade-in: 2% → 9% — pure opacity, no scale competing with frames
      const revealStart = 0.02, revealEnd = 0.09;
      const r = Math.min(1, Math.max(0, (p - revealStart) / (revealEnd - revealStart)));
      const eased = r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2;
      videoWrap.style.opacity = eased;

      // Marquee opacity: in at 38%, out at 92%
      const mIn = 0.38, mOut = 0.92, mFade = 0.04;
      let mOp = 0;
      if (p >= mIn && p <= mOut) {
        if (p < mIn + mFade)       mOp = (p - mIn) / mFade;
        else if (p > mOut - mFade) mOp = (mOut - p) / mFade;
        else                       mOp = 1;
      }
      marqueeWrap.style.opacity = mOp;

      // Scroll-driven zoom: 0.87 → 1.0 from canvas reveal to 22% — cinematic pull-in
      const zoomEnd = 0.22;
      const rawT   = Math.min(1, Math.max(0, (p - REVEAL_END) / (zoomEnd - REVEAL_END)));
      const easedT = rawT * rawT * (3 - 2 * rawT); // smoothstep
      const newScale = easedT; // 0 (contain) → 1 (cover)
      if (Math.abs(newScale - currentScale) > 0.0001) {
        currentScale = newScale;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    }
  });
}

// ─── Frame scrub (canvas) ──────────────────────────────────────
const REVEAL_END = 0.09; // matches revealEnd in initHeroTransition

function initFrameScrub() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      const p = self.progress;

      // Hold on frame 0 while canvas is still fading in — no competing motion
      if (p < REVEAL_END) {
        if (currentFrame !== 0) {
          currentFrame = 0;
          requestAnimationFrame(() => drawFrame(0));
        }
        return;
      }

      // Remap remaining scroll so animation begins cleanly after reveal
      const adjusted    = (p - REVEAL_END) / (1 - REVEAL_END);
      const accelerated = Math.min(adjusted * FRAME_SPEED, 1);
      const index       = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
      if (index !== currentFrame) {
        currentFrame = index;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    }
  });
}

// ─── Section animations ────────────────────────────────────────
function initSections() {
  // Read the actual container height so section positions stay in sync on mobile
  // (CSS sets 550vh on mobile vs 850vh on desktop — hardcoding 850 breaks mobile).
  const totalVh  = scrollCont.offsetHeight / window.innerHeight * 100;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Only process sections that are visible in this layout.
  // On mobile, .section-stats is display:none so it is skipped here and
  // its overlay/counter code is also guarded separately.
  const sections = [...document.querySelectorAll('.scroll-section')]
    .filter(s => getComputedStyle(s).display !== 'none');

  // Mobile: evenly redistribute the 4 visible sections (001, 002, 003, CTA)
  // so removing the stats block leaves no gap or dark patch.
  // We write back to dataset.enter / dataset.leave so initDarkOverlay,
  // which runs next and reads those same attributes, stays in sync.
  if (isMobile) {
    const START = 0.20, END = 1.0, PAD = 0.02;
    const slot  = (END - START) / sections.length;
    sections.forEach((section, i) => {
      const e = START + i * slot + PAD;
      const l = (i === sections.length - 1) ? END : START + (i + 1) * slot - PAD;
      section.dataset.enter = (e * 100).toFixed(2);
      section.dataset.leave = (l * 100).toFixed(2);
    });
  }

  sections.forEach(section => {
    const enter   = parseFloat(section.dataset.enter) / 100;
    const leave   = parseFloat(section.dataset.leave) / 100;
    const midPct  = (enter + leave) / 2;
    const persist = section.dataset.persist === 'true';

    // On mobile: use a single calm entrance for all sections so there is
    // no clipping, scattering or x-offset motion on a small screen.
    const animType = isMobile ? 'fade-up' : section.dataset.animation;

    section.style.top = (midPct * (totalVh - 100) + 50) + 'vh';

    const children = section.querySelectorAll(
      '.section-label, .section-heading, .section-body, .cta-button, .stats-grid, .stat'
    );

    const enterTl = buildEnterTimeline(animType, children);
    // On mobile: gentle fade-up exit so content doesn't clip or scatter
    // while the next section is already arriving.
    const leaveTl = isMobile
      ? gsap.timeline({ paused: true }).to(children, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' })
      : buildLeaveTimeline(animType, children);
    let wasIn = false;

    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const p    = self.progress;
        const isIn = p >= enter && p <= leave;

        if (isIn && !wasIn) {
          wasIn = true;
          section.classList.add('is-visible');
          section.style.opacity = '1';
          leaveTl.pause();
          enterTl.restart();
        } else if (!isIn && wasIn && !persist) {
          wasIn = false;
          section.classList.remove('is-visible');
          enterTl.pause();
          leaveTl.restart();
          leaveTl.eventCallback('onComplete', () => {
            if (!wasIn) section.style.opacity = '0';
          });
        }
      }
    });
  });
}

// Enter: each section has a distinct directional entrance.
// Uses fromTo so the visible end-state is always explicit — prevents
// leave-timeline pollution from corrupting re-entry on scroll-back.
function buildEnterTimeline(type, children) {
  const tl = gsap.timeline({ paused: true });
  switch (type) {
    case 'fade-up':
      // 001 — drift up from below
      tl.fromTo(children, { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
      break;
    case 'slide-right':
      // 002 — sweep in from the right
      tl.fromTo(children, { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out' });
      break;
    case 'clip-reveal':
      // 003 — wipe up from bottom
      tl.fromTo(children, { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power4.inOut' });
      break;
    case 'stagger-up':
      // 004 — cascade up with scale
      tl.fromTo(children, { y: 60, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
      break;
    case 'scale-up':
      // 005 — expand from center
      tl.fromTo(children, { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.12, duration: 1.0, ease: 'power2.out' });
      break;
    default:
      tl.fromTo(children, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }
  return tl;
}

// Leave: distinct exit per section, different direction from the enter
function buildLeaveTimeline(type, children) {
  const tl = gsap.timeline({ paused: true });
  switch (type) {
    case 'fade-up':
      // 001 — content floats further up and dissolves
      tl.to(children, { y: -45, opacity: 0, stagger: { each: 0.08, from: 'end' }, duration: 0.65, ease: 'power3.in' });
      break;
    case 'slide-right':
      // 002 — sweeps out to the left (opposite of entry)
      tl.to(children, { x: -80, opacity: 0, stagger: { each: 0.10, from: 'end' }, duration: 0.65, ease: 'power3.in' });
      break;
    case 'clip-reveal':
      // 003 — wipe closes from the top down (opposite direction)
      tl.to(children, { clipPath: 'inset(0 0 100% 0)', opacity: 0, stagger: { each: 0.12, from: 'end' }, duration: 0.9, ease: 'power4.inOut' });
      break;
    case 'stagger-up':
      // 004 — numbers scatter and fall
      tl.to(children, { y: 50, scale: 0.85, opacity: 0, stagger: { each: 0.10, from: 'random' }, duration: 0.65, ease: 'power3.in' });
      break;
    case 'scale-up':
      // 005 — shrinks away (persists, so this rarely fires)
      tl.to(children, { scale: 0.9, opacity: 0, stagger: { each: 0.10, from: 'end' }, duration: 0.65, ease: 'power2.in' });
      break;
    default:
      tl.to(children, { opacity: 0, duration: 0.4, ease: 'power2.in' });
  }
  return tl;
}

// ─── Dark overlay ──────────────────────────────────────────────
// Each section with data-overlay="X" darkens the canvas to opacity X while visible.
function initDarkOverlay() {
  const fadeRange = 0.03;

  // Skip sections hidden by CSS (e.g. .section-stats on mobile) so their
  // overlay zone is excluded. The dataset values were already rewritten by
  // initSections() for the visible sections, so these are always in sync.
  const overlayZones = [...document.querySelectorAll('[data-overlay]')]
    .filter(el => getComputedStyle(el).display !== 'none')
    .map(el => ({
      enter:   parseFloat(el.dataset.enter)   / 100,
      leave:   parseFloat(el.dataset.leave)   / 100,
      opacity: parseFloat(el.dataset.overlay),
    }));

  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      const p = self.progress;
      let max = 0;

      for (const { enter, leave, opacity } of overlayZones) {
        let op = 0;
        if (p >= enter - fadeRange && p < enter)     op = opacity * (p - (enter - fadeRange)) / fadeRange;
        else if (p >= enter && p <= leave)            op = opacity;
        else if (p > leave && p <= leave + fadeRange) op = opacity * (1 - (p - leave) / fadeRange);
        if (op > max) max = op;
      }

      darkOverlay.style.opacity = max;
    }
  });
}

// ─── Marquee ───────────────────────────────────────────────────
function initMarquee() {
  gsap.to(marqueeText, {
    xPercent: -35,
    ease: 'none',
    scrollTrigger: { trigger: scrollCont, start: 'top top', end: 'bottom bottom', scrub: true }
  });
}

// ─── Counters ──────────────────────────────────────────────────
function initCounters() {
  const counterEls = document.querySelectorAll('.stat-number');
  if (!counterEls.length) return;

  const statsSection = document.querySelector('.section-stats');
  if (!statsSection) return;
  if (getComputedStyle(statsSection).display === 'none') return; // hidden on mobile
  const enter = parseFloat(statsSection.dataset.enter) / 100;

  counterEls.forEach(el => {
    const target   = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0');
    const obj      = { val: 0 };
    let hasAnimated = false;

    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const p = self.progress;
        if (p >= enter && !hasAnimated) {
          hasAnimated = true;
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power1.out',
            onUpdate() {
              el.textContent = decimals === 0
                ? Math.round(obj.val).toString()
                : obj.val.toFixed(decimals);
            }
          });
        } else if (p < enter - 0.02 && hasAnimated) {
          hasAnimated = false;
          obj.val = 0;
          el.textContent = '0';
          gsap.killTweensOf(obj);
        }
      }
    });
  });
}

// ─── Boot ──────────────────────────────────────────────────────
preloadFirstBatch();
