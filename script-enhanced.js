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

/* ═══════════════════════════════════════════════════════════════
   قسم يوتيوب — YouTube Playlist Manager
   ═══════════════════════════════════════════════════════════════ */

const YT_DATA = {
  // مجموعة فيديوهات السيرة النبوية — بيانات ثابتة عالية الجودة
  videos: [
    {
      id: 'dQQh0V2NBVY',
      title: 'السيرة النبوية الشاملة — من الميلاد إلى البعثة',
      desc: 'رحلة شاملة وموثقة في حياة النبي محمد ﷺ من مولده الشريف في مكة المكرمة حتى نزول الوحي وبداية البعثة المباركة.',
      duration: '1:12:34',
      views: '٢.٤ مليون',
      date: 'منذ ٣ أشهر',
      tag: 'سيرة',
      filter: 'seerah',
      featured: true
    },
    {
      id: 'HZlShgRF_4Y',
      title: 'غزوة بدر الكبرى — الفرقان بين الحق والباطل',
      desc: 'قصة أول معركة فاصلة في الإسلام، دروس في التوكل والإيمان والتخطيط.',
      duration: '48:22',
      views: '١.١ مليون',
      date: 'منذ ٦ أشهر',
      tag: 'غزوات',
      filter: 'ghazawat'
    },
    {
      id: 'lrb5vmjqvao',
      title: 'أخلاق النبي ﷺ — الرحمة والعدل والكرم',
      desc: 'استعراض جميل لأخلاق سيد الأنام ﷺ وكيف كانت في تعامله مع الصحابة والمخالفين.',
      duration: '32:10',
      views: '٨٧٨ ألف',
      date: 'منذ سنة',
      tag: 'أخلاق',
      filter: 'akhlaq'
    },
    {
      id: 'qW3BMKJi_LY',
      title: 'تلاوة خاشعة — سورة آل عمران كاملة',
      desc: 'تلاوة مرتلة خاشعة بصوت الشيخ مشاري راشد العفاسي من سورة آل عمران الكريمة.',
      duration: '54:08',
      views: '٣.٢ مليون',
      date: 'منذ ٢ سنة',
      tag: 'قرآن',
      filter: 'quran'
    },
    {
      id: 'r9lGhWNqOc4',
      title: 'غزوة أحد — دروس في الثبات والابتلاء',
      desc: 'قصة غزوة أحد بالتفصيل وما استخلصه العلماء من دروس عميقة في الصبر والثبات على الحق.',
      duration: '41:55',
      views: '٦٥٠ ألف',
      date: 'منذ ٨ أشهر',
      tag: 'غزوات',
      filter: 'ghazawat'
    },
    {
      id: 'Ib3sBlFJCmg',
      title: 'هجرة النبي ﷺ إلى المدينة — ملحمة الإيمان',
      desc: 'تفاصيل الهجرة النبوية الشريفة وما رافقها من أحداث مثيرة كقصة غار ثور وفداء أبي بكر الصديق.',
      duration: '39:17',
      views: '٩٢٠ ألف',
      date: 'منذ ٥ أشهر',
      tag: 'سيرة',
      filter: 'seerah'
    },
    {
      id: 'ggCi0jgN6BY',
      title: 'فتح مكة المكرمة — رحمة بلا حدود',
      desc: 'يوم الفتح العظيم وكيف عفا النبي ﷺ عن أعدائه، درس إنساني لا يتكرر في التاريخ.',
      duration: '44:30',
      views: '١.٧ مليون',
      date: 'منذ ١٠ أشهر',
      tag: 'سيرة',
      filter: 'seerah'
    },
    {
      id: '4bMVlk-RiiQ',
      title: 'تلاوة سورة الرحمن — الشيخ القطامي',
      desc: 'تلاوة رائعة من سورة الرحمن بصوت الشيخ ناصر القطامي في أجواء روحانية فريدة.',
      duration: '22:14',
      views: '٤.١ مليون',
      date: 'منذ ٣ سنوات',
      tag: 'قرآن',
      filter: 'quran'
    },
    {
      id: 'AyHpnvMLmFw',
      title: 'الصحابة الكرام — خالد بن الوليد سيف الله المسلول',
      desc: 'قصة الصحابي الجليل خالد بن الوليد رضي الله عنه، من أعظم القادة العسكريين في التاريخ.',
      duration: '35:40',
      views: '٥٥٠ ألف',
      date: 'منذ ٧ أشهر',
      tag: 'أخلاق',
      filter: 'akhlaq'
    },
    {
      id: 'J8HBCBOXgno',
      title: 'غزوة الخندق — حين أحاط الأعداء بالمدينة',
      desc: 'الأحزاب ومعجزة الخندق وكيف نصر الله المؤمنين في أحلك الظروف وأشدها وطأة.',
      duration: '38:00',
      views: '٧٢٠ ألف',
      date: 'منذ ٩ أشهر',
      tag: 'غزوات',
      filter: 'ghazawat'
    },
    {
      id: '6qlrCaJHIdo',
      title: 'أذكار الصباح والمساء — تلاوة هادئة',
      desc: 'أذكار الصباح والمساء النبوية المأثورة بصوت هادئ وترتيل جميل للاطمئنان والسكينة.',
      duration: '28:55',
      views: '٢.٩ مليون',
      date: 'منذ ٢ سنة',
      tag: 'قرآن',
      filter: 'quran'
    },
    {
      id: 'K1pVj7oFLpc',
      title: 'صفات النبي ﷺ الخَلقية والخُلقية',
      desc: 'وصف النبي ﷺ من كتب الشمائل والسنة النبوية، كيف كان يبدو ويتصرف في حياته اليومية.',
      duration: '26:44',
      views: '١.٤ مليون',
      date: 'منذ سنة',
      tag: 'أخلاق',
      filter: 'akhlaq'
    }
  ],
  perPage: 8,
  currentPage: 0,
  currentFilter: 'all'
};

/* ─── Helpers ────────────────────────────────────────────────── */
function ytGetThumb(id, quality = 'hqdefault') {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

function ytFilteredVideos() {
  const f = YT_DATA.currentFilter;
  return f === 'all' ? YT_DATA.videos : YT_DATA.videos.filter(v => v.filter === f);
}

/* ─── Build Featured Card ────────────────────────────────────── */
function ytBuildFeatured() {
  const v = YT_DATA.videos.find(x => x.featured) || YT_DATA.videos[0];
  const img = document.getElementById('ytFeaturedImg');
  img.src = ytGetThumb(v.id, 'maxresdefault');
  img.onerror = () => { img.src = ytGetThumb(v.id); };
  img.alt = v.title;

  document.getElementById('ytFeaturedTitle').textContent = v.title;
  document.getElementById('ytFeaturedDesc').textContent = v.desc;
  document.getElementById('ytFeaturedDuration').textContent = v.duration;
  document.getElementById('ytFeaturedViews').textContent = '👁 ' + v.views;
  document.getElementById('ytFeaturedDate').textContent = '🕐 ' + v.date;
  document.getElementById('ytFeaturedTag').textContent = v.tag;

  document.getElementById('ytFeaturedPlay').onclick = () => openYtModal(v);
  document.getElementById('ytFeaturedWatchBtn').onclick = () => openYtModal(v);
}

/* ─── Build Video Cards ──────────────────────────────────────── */
function ytBuildCards(reset = false) {
  const grid = document.getElementById('ytGrid');
  if (reset) { grid.innerHTML = ''; YT_DATA.currentPage = 0; }

  const all = ytFilteredVideos();
  const start = YT_DATA.currentPage * YT_DATA.perPage;
  const slice = all.slice(start, start + YT_DATA.perPage);

  if (all.length === 0) {
    grid.innerHTML = '<div class="yt-empty">لا توجد فيديوهات في هذا التصنيف حالياً</div>';
    document.getElementById('ytLoadMore').style.display = 'none';
    return;
  }

  slice.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'yt-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="yt-card-thumb">
        <img data-src="${ytGetThumb(v.id)}" src="" alt="${v.title}" loading="lazy"
          onerror="this.src='${ytGetThumb(v.id)}'">
        <div class="yt-card-overlay">
          <div class="yt-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <div class="yt-card-duration">${v.duration}</div>
      </div>
      <div class="yt-card-body">
        <div class="yt-card-tag">${v.tag}</div>
        <div class="yt-card-title">${v.title}</div>
        <div class="yt-card-meta">
          <span>👁 ${v.views}</span>
          <span>🕐 ${v.date}</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openYtModal(v));
    grid.appendChild(card);
  });

  // Lazy load images
  ytLazyLoad();

  YT_DATA.currentPage++;
  const totalShown = YT_DATA.currentPage * YT_DATA.perPage;
  const btn = document.getElementById('ytLoadMore');
  if (totalShown >= all.length) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'inline-flex';
    btn.disabled = false;
    btn.innerHTML = '<span class="yt-load-text">عرض المزيد من الفيديوهات</span><span class="yt-load-icon">↓</span>';
  }
}

function loadMoreYtVideos() {
  const btn = document.getElementById('ytLoadMore');
  btn.innerHTML = '<span class="yt-spinner"></span><span class="yt-load-text" style="margin-right:8px">جارٍ التحميل...</span>';
  btn.disabled = true;
  setTimeout(() => ytBuildCards(false), 600);
}

/* ─── Lazy Loading ───────────────────────────────────────────── */
function ytLazyLoad() {
  const imgs = document.querySelectorAll('.yt-card-thumb img[data-src]');
  if (!imgs.length) return;
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    imgs.forEach(img => obs.observe(img));
  } else {
    imgs.forEach(img => { img.src = img.dataset.src; });
  }
}

/* ─── Filters ────────────────────────────────────────────────── */
function ytInitFilters() {
  document.querySelectorAll('.yt-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.yt-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      YT_DATA.currentFilter = btn.dataset.filter;
      ytBuildCards(true);
    });
  });
}

/* ─── View Toggle ────────────────────────────────────────────── */
function setYtView(type) {
  const grid = document.getElementById('ytGrid');
  document.getElementById('viewGrid').classList.toggle('active', type === 'grid');
  document.getElementById('viewSlider').classList.toggle('active', type === 'slider');
  grid.classList.toggle('slider-view', type === 'slider');
}

/* ─── Modal ──────────────────────────────────────────────────── */
function openYtModal(v) {
  const modal = document.getElementById('yt-modal');
  document.getElementById('ytIframe').src =
    `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`;
  document.getElementById('ytModalTitle').textContent = v.title;
  document.getElementById('ytModalViews').textContent = '👁 ' + v.views;
  document.getElementById('ytModalDate').textContent = '🕐 ' + v.date;
  document.getElementById('ytModalLink').href = `https://www.youtube.com/watch?v=${v.id}`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeYtModal(e, force) {
  if (!force && e && e.target !== document.getElementById('yt-modal')) return;
  document.getElementById('yt-modal').classList.remove('open');
  document.getElementById('ytIframe').src = '';
  document.body.style.overflow = '';
}

/* ─── Keyboard Shortcut ──────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeYtModal(null, true);
});

/* ─── Init ───────────────────────────────────────────────────── */
function initYouTubeSection() {
  ytBuildFeatured();
  ytBuildCards(true);
  ytInitFilters();
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initYouTubeSection);
} else {
  initYouTubeSection();
}
