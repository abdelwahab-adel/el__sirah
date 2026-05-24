/* ═══════════════════════════════════════════════════════════════
   السيرة النبوية — script-enhanced.js
   Dark Mode + Particles + Parallax + Theme Manager
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 1. THEME MANAGER (Dark / Light Mode)
// ═══════════════════════════════════════════════════════════════
class ThemeManager {
  constructor() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.theme = localStorage.getItem('seerah_theme') ||
                 (this.prefersDark.matches ? 'dark' : 'light');
    this.init();
  }
  init() {
    this.apply(this.theme);
    this.prefersDark.addEventListener('change', e => {
      if (!localStorage.getItem('seerah_theme')) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
  }
  apply(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('seerah_theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
  toggle() {
    this.apply(this.theme === 'dark' ? 'light' : 'dark');
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. PARTICLE SYSTEM (Welcome Screen Stars)
// ═══════════════════════════════════════════════════════════════
class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.count = window.innerWidth < 600 ? 30 : 60;
  }
  create() {
    if (!this.container) return;
    for (let i = 0; i < this.count; i++) {
      const p = document.createElement('div');
      p.className = 'welcome-particle';
      const size    = Math.random() * 3 + 1;
      const left    = Math.random() * 100;
      const delay   = Math.random() * 6;
      const dur     = Math.random() * 8 + 6;
      const opacity = Math.random() * 0.7 + 0.1;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}%;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
        opacity:0;
        background: ${Math.random() > 0.7 ? '#D4AF37' : '#ffffff'};
      `;
      this.container.appendChild(p);
      this.particles.push(p);
    }
  }
  destroy() {
    this.particles.forEach(p => p.remove());
    this.particles = [];
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. HERO PARALLAX
// ═══════════════════════════════════════════════════════════════
function setupParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const ornaments = hero.querySelectorAll('.hero-ornament');
  const content   = hero.querySelector('.hero-content');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.5) {
        ornaments.forEach((o, i) => {
          const speed = 0.08 + i * 0.04;
          o.style.transform = `translateY(${scrollY * speed}px)`;
        });
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.18}px)`;
          content.style.opacity   = `${1 - scrollY / (window.innerHeight * 0.85)}`;
        }
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 4. ANIMATED HERO STARS (canvas-free, CSS-only twinkle)
// ═══════════════════════════════════════════════════════════════
function createHeroStars() {
  const container = document.querySelector('.hero-stars');
  if (!container) return;
  const count = window.innerWidth < 600 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size    = Math.random() * 2.5 + 0.5;
    const x       = Math.random() * 100;
    const y       = Math.random() * 100;
    const dur     = Math.random() * 4 + 2;
    const delay   = Math.random() * 5;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      top:${y}%; left:${x}%;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(star);
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. COUNTER ANIMATION (hero stats)
// ═══════════════════════════════════════════════════════════════
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}

function setupCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.count));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ═══════════════════════════════════════════════════════════════
// 6. SEARCH QUICK-OPEN (Ctrl+K / /)
// ═══════════════════════════════════════════════════════════════
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      goTo('search-sec');
      setTimeout(() => document.getElementById('mainSearch')?.focus(), 500);
    }
    if (e.key === 'Escape') {
      closeSahabiModal();
      document.getElementById('navLinks')?.classList.remove('open');
      document.querySelector('.nav-toggle')?.classList.remove('active');
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// 7. SMOOTH SECTION HIGHLIGHT (active nav glow)
// ═══════════════════════════════════════════════════════════════
function setupSectionObserver() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        const on = a.getAttribute('onclick') || '';
        a.classList.toggle('active', on.includes(`'${id}'`));
      });
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
}

// ═══════════════════════════════════════════════════════════════
// 8. LAZY IMAGE LOADING
// ═══════════════════════════════════════════════════════════════
function setupLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src;
        e.target.removeAttribute('data-src');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '200px' });
  images.forEach(img => obs.observe(img));
}

// ═══════════════════════════════════════════════════════════════
// 9. READING POSITION MEMORY
// ═══════════════════════════════════════════════════════════════
function saveScrollPosition() {
  const pos  = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct  = docH > 0 ? (pos / docH * 100).toFixed(1) : 0;
  localStorage.setItem('seerah_scroll_pct', pct);
}

function restoreScrollPosition() {
  const pct = parseFloat(localStorage.getItem('seerah_scroll_pct') || '0');
  if (pct > 2) {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (pct / 100) * docH;
    setTimeout(() => {
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      showToast('↩️ استُعيد موضع قراءتك', '📖');
    }, 1200);
  }
}

// ═══════════════════════════════════════════════════════════════
// 10. SHARE HANDLER
// ═══════════════════════════════════════════════════════════════
window.SeerahShare = {
  page() {
    const data = {
      title: 'السيرة النبوية الشريفة ﷺ',
      text:  'تجربة رقمية إسلامية تفاعلية في حياة خير البشر محمد ﷺ',
      url:   window.location.href,
    };
    if (navigator.share) navigator.share(data).catch(() => {});
    else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('✅ تم نسخ رابط الموقع'));
    }
  },
  hadith(text, source) {
    const content = `"${text}"\n\n${source}\n\n— السيرة النبوية الشريفة`;
    if (navigator.share) navigator.share({ title: 'حديث شريف', text: content }).catch(() => {});
    else navigator.clipboard.writeText(content).then(() => showToast('✅ تم نسخ الحديث'));
  }
};

// ═══════════════════════════════════════════════════════════════
// 11. DARK SECTIONS COLOR SYNC
// ═══════════════════════════════════════════════════════════════
function syncDarkSections(theme) {
  // pattern-bg sections (listen, hadith)
  const darkSections = document.querySelectorAll('.pattern-bg');
  darkSections.forEach(s => {
    if (theme === 'dark') {
      s.style.background = '#051a0a';
    } else {
      s.style.background = '';
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// 12. FLOATING ORNAMENTS ANIMATION (SVG stars in hero)
// ═══════════════════════════════════════════════════════════════
function animateOrnaments() {
  const ornaments = document.querySelectorAll('.hero-ornament');
  ornaments.forEach((o, i) => {
    const offset = i * 120;
    o.style.animationDelay = `${offset}ms`;
  });
}

// ═══════════════════════════════════════════════════════════════
// 13. WELCOME PARTICLES INIT
// ═══════════════════════════════════════════════════════════════
let particleSystem = null;
function initWelcomeParticles() {
  const container = document.querySelector('.welcome-particles');
  if (!container) return;
  particleSystem = new ParticleSystem(container);
  particleSystem.create();
}

// ═══════════════════════════════════════════════════════════════
// 14. MINI PLAYER VOLUME SYNC
// ═══════════════════════════════════════════════════════════════
function setupMiniPlayerVolume() {
  const slider = document.getElementById('mp-volume');
  if (!slider) return;
  slider.addEventListener('input', e => {
    if (typeof setVolume === 'function') setVolume(e.target.value);
  });
  // Restore saved volume
  const saved = localStorage.getItem('seerah_volume');
  if (saved) {
    slider.value = saved;
    if (typeof setVolume === 'function') setVolume(saved);
  }
  slider.addEventListener('change', e => {
    localStorage.setItem('seerah_volume', e.target.value);
  });
}

// ═══════════════════════════════════════════════════════════════
// 15. PERFORMANCE: THROTTLE SCROLL EVENTS
// ═══════════════════════════════════════════════════════════════
function throttle(fn, ms = 100) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn.apply(this, args); }
  };
}

// ═══════════════════════════════════════════════════════════════
// 16. GLOBAL EXPOSE (SeerahApp)
// ═══════════════════════════════════════════════════════════════
window.SeerahApp = {
  theme:   null,
  version: '3.0',
  share:   window.SeerahShare,
};

// ═══════════════════════════════════════════════════════════════
// 17. MAIN INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // Theme
  const tm = new ThemeManager();
  window.SeerahApp.theme = tm;

  // Theme toggle button
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      tm.toggle();
      syncDarkSections(tm.theme);
    });
    themeBtn.innerHTML = tm.theme === 'dark' ? '☀️' : '🌙';
  }
  syncDarkSections(tm.theme);

  // Welcome particles
  const welcomed = localStorage.getItem('seerah_v3_welcomed');
  if (!welcomed) initWelcomeParticles();

  // Hero
  createHeroStars();
  setupParallax();
  animateOrnaments();

  // Counters
  setupCounters();

  // Keyboard
  setupKeyboardShortcuts();

  // Section observer for nav highlight
  setupSectionObserver();

  // Lazy images
  setupLazyImages();

  // Mini player volume
  setupMiniPlayerVolume();

  // Restore reading position (skip on fresh welcome)
  if (welcomed) {
    window.addEventListener('load', restoreScrollPosition);
  }

  // Save scroll on unload
  window.addEventListener('beforeunload', saveScrollPosition, { passive: true });

  // Scroll save (throttled)
  window.addEventListener('scroll', throttle(saveScrollPosition, 2000), { passive: true });

  console.log('%c✦ السيرة النبوية الشريفة ﷺ — v3.0 ✦', 'color:#D4AF37;font-family:serif;font-size:16px;font-weight:bold;');
  console.log('%cمنصة إسلامية تفاعلية متكاملة', 'color:#1E7A4E;font-family:sans-serif;font-size:12px;');
});
