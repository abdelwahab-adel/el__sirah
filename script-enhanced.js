/* ═══════════════════════════════════════════════════════════════════════
   السيرة النبوية - نظام JavaScript المحسّن V2
   Enhanced Modern Islamic System
   ═══════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════
// 1. DARK MODE SYSTEM
// ═══════════════════════════════════════════════════════════════════════

class ThemeManager {
  constructor() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.theme = localStorage.getItem('seerah_theme') || this.detectTheme();
    this.init();
  }

  detectTheme() {
    return this.prefersDark.matches ? 'dark' : 'light';
  }

  init() {
    this.applyTheme(this.theme);
    this.prefersDark.addEventListener('change', (e) => {
      this.theme = e.matches ? 'dark' : 'light';
      this.applyTheme(this.theme);
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('seerah_theme', theme);
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    return this.theme;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 2. NAVIGATION SYSTEM
// ═══════════════════════════════════════════════════════════════════════

class NavigationManager {
  constructor() {
    this.nav = document.querySelector('nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.links = document.querySelectorAll('.nav-links a');
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    // Hamburger menu toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Scroll-aware navbar
    window.addEventListener('scroll', () => this.handleScroll());

    // Close menu when clicking links
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Smooth scrolling
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (target) {
          e.preventDefault();
          this.goToSection(target);
        }
      });
    });
  }

  toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('open');
      this.toggle.classList.toggle('active');
    }
  }

  closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.remove('open');
      this.toggle.classList.remove('active');
    }
  }

  handleScroll() {
    this.lastScrollY = window.scrollY;
    if (this.lastScrollY > 50) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }
  }

  goToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 3. FAVORITES SYSTEM
// ═══════════════════════════════════════════════════════════════════════

class FavoritesManager {
  constructor() {
    this.key = 'seerah_favorites';
    this.favorites = this.load();
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '{}');
    } catch {
      return {};
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.favorites));
  }

  add(type, id, data) {
    if (!this.favorites[type]) {
      this.favorites[type] = [];
    }
    if (!this.favorites[type].some(item => item.id === id)) {
      this.favorites[type].push({ id, data, addedAt: new Date().toISOString() });
      this.save();
      return true;
    }
    return false;
  }

  remove(type, id) {
    if (this.favorites[type]) {
      this.favorites[type] = this.favorites[type].filter(item => item.id !== id);
      this.save();
      return true;
    }
    return false;
  }

  isFavorite(type, id) {
    return this.favorites[type]?.some(item => item.id === id) || false;
  }

  getAll(type) {
    return this.favorites[type] || [];
  }

  clear() {
    this.favorites = {};
    this.save();
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 4. READING PROGRESS TRACKER
// ═══════════════════════════════════════════════════════════════════════

class ProgressTracker {
  constructor() {
    this.key = 'seerah_progress';
    this.sessionStart = new Date();
    this.readingTime = 0;
    this.lastActiveTime = Date.now();
    this.init();
  }

  init() {
    // Track reading time
    setInterval(() => {
      if (Date.now() - this.lastActiveTime < 60000) { // Active in last 1 minute
        this.readingTime += 1;
        this.saveProgress();
      }
    }, 1000);

    // Update last active time
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        this.lastActiveTime = Date.now();
      }, { passive: true });
    });

    // Track scroll progress
    window.addEventListener('scroll', () => this.trackScroll(), { passive: true });

    // Page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.saveProgress();
      }
    });
  }

  trackScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    localStorage.setItem('seerah_scroll_pos', scrolled);
  }

  saveProgress() {
    const progress = {
      time: this.readingTime,
      sections: this.getVisitedSections(),
      lastVisit: new Date().toISOString(),
      scrollPos: localStorage.getItem('seerah_scroll_pos'),
    };
    localStorage.setItem(this.key, JSON.stringify(progress));
  }

  getVisitedSections() {
    const sections = [];
    document.querySelectorAll('section[id]').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sections.push(section.id);
      }
    });
    return sections;
  }

  getProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '{}');
    } catch {
      return {};
    }
  }

  getReadingTime() {
    return this.readingTime;
  }

  getReadingTimeFormatted() {
    const hours = Math.floor(this.readingTime / 3600);
    const minutes = Math.floor((this.readingTime % 3600) / 60);
    const seconds = this.readingTime % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 5. SMART SEARCH
// ═══════════════════════════════════════════════════════════════════════

class SmartSearch {
  constructor() {
    this.searchHistory = this.loadHistory();
    this.searchBox = document.getElementById('mainSearch');
    if (this.searchBox) {
      this.searchBox.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  }

  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('seerah_search_history') || '[]');
    } catch {
      return [];
    }
  }

  saveHistory() {
    const limited = this.searchHistory.slice(-20); // Keep last 20
    localStorage.setItem('seerah_search_history', JSON.stringify(limited));
  }

  addToHistory(query) {
    if (query.trim()) {
      this.searchHistory.push({
        query,
        timestamp: new Date().toISOString(),
      });
      this.saveHistory();
    }
  }

  fuzzyMatch(str, query) {
    const letters = query.toLowerCase().split('');
    let matches = 0;
    let startIndex = -1;

    for (let singleLetter of letters) {
      const index = str.toLowerCase().indexOf(singleLetter, startIndex + 1);
      if (index === -1) return null;
      startIndex = index;
      matches++;
    }

    return { matches, startIndex };
  }

  handleSearch(query) {
    if (query.length > 0) {
      this.addToHistory(query);
    }
  }

  search(query, data) {
    if (!query.trim()) return [];

    return data
      .map(item => ({
        ...item,
        match: this.fuzzyMatch(item.text || '', query),
      }))
      .filter(item => item.match !== null)
      .sort((a, b) => b.match.matches - a.match.matches)
      .slice(0, 10);
  }

  getHistory() {
    return this.searchHistory;
  }

  clearHistory() {
    this.searchHistory = [];
    localStorage.removeItem('seerah_search_history');
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 6. SHARE & EXPORT
// ═══════════════════════════════════════════════════════════════════════

class ShareManager {
  static share(title, text, url) {
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url,
      }).catch(err => console.log('Share failed:', err));
    } else {
      this.copyToClipboard(url);
    }
  }

  static copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('تم نسخ الرابط!');
    });
  }

  static exportAsJSON(data, filename = 'seerah-data.json') {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  static exportAsCSV(data, filename = 'seerah-data.csv') {
    const csv = this.arrayToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  static arrayToCSV(array) {
    if (!array.length) return '';

    const headers = Object.keys(array[0]);
    const csv = [
      headers.join(','),
      ...array.map(obj => headers.map(key => `"${obj[key]}"`).join(',')),
    ].join('\n');

    return csv;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 7. PERFORMANCE MONITOR
// ═══════════════════════════════════════════════════════════════════════

class PerformanceMonitor {
  static async measure() {
    const metrics = {
      navigationTiming: this.getNavigationTiming(),
      resourceTiming: this.getResourceTiming(),
      customMetrics: {
        interactive: this.calculateInteractiveTime(),
      },
    };

    return metrics;
  }

  static getNavigationTiming() {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    return {
      dns: nav.domainLookupEnd - nav.domainLookupStart,
      tcp: nav.connectEnd - nav.connectStart,
      ttfb: nav.responseStart - nav.requestStart,
      download: nav.responseEnd - nav.responseStart,
      domInteractive: nav.domInteractive,
      domComplete: nav.domComplete,
      loadComplete: nav.loadEventEnd,
    };
  }

  static getResourceTiming() {
    const resources = performance.getEntriesByType('resource');
    return {
      count: resources.length,
      avgDuration: resources.reduce((sum, r) => sum + r.duration, 0) / resources.length,
      totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    };
  }

  static calculateInteractiveTime() {
    return performance.now();
  }

  static async sendMetrics(endpoint) {
    try {
      const metrics = await this.measure();
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      });
    } catch (err) {
      console.error('Failed to send metrics:', err);
    }
  }

  static logMetrics() {
    console.table(this.getNavigationTiming());
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 8. SERVICE WORKER REGISTRATION
// ═══════════════════════════════════════════════════════════════════════

class ServiceWorkerManager {
  static register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(reg => {
          console.log('Service Worker registered:', reg);
        })
        .catch(err => {
          console.log('Service Worker registration failed:', err);
        });
    }
  }

  static unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.unregister());
      });
    }
  }

  static async cacheAssets(assets) {
    try {
      const cache = await caches.open('seerah-v1');
      await cache.addAll(assets);
    } catch (err) {
      console.error('Cache error:', err);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 9. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════

// Initialize all managers
const themeManager = new ThemeManager();
const navigationManager = new NavigationManager();
const favoritesManager = new FavoritesManager();
const progressTracker = new ProgressTracker();
const smartSearch = new SmartSearch();

// Add dark mode toggle button if not exists
document.addEventListener('DOMContentLoaded', () => {
  // Create theme toggle button
  if (!document.querySelector('.theme-toggle')) {
    const nav = document.querySelector('nav');
    if (nav) {
      const themeBtn = document.createElement('button');
      themeBtn.className = 'theme-toggle';
      themeBtn.title = 'تبديل الوضع الليلي';
      themeBtn.innerHTML = '🌙';
      themeBtn.addEventListener('click', () => {
        const newTheme = themeManager.toggle();
        themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      });
      nav.appendChild(themeBtn);

      // Set initial icon
      const icon = themeManager.theme === 'dark' ? '☀️' : '🌙';
      themeBtn.innerHTML = icon;
    }
  }

  // Register service worker
  ServiceWorkerManager.register();

  // Log performance metrics
  if (window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
      setTimeout(() => PerformanceMonitor.logMetrics(), 1000);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════════
// 10. UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('ar-SA', options);
}

// Format time
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Debounce function
function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle function
function throttle(func, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Lazy load images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// ═══════════════════════════════════════════════════════════════════════
// 11. EXPORT FOR GLOBAL USE
// ═══════════════════════════════════════════════════════════════════════

window.SeerahApp = {
  theme: themeManager,
  favorites: favoritesManager,
  progress: progressTracker,
  search: smartSearch,
  share: ShareManager,
  performance: PerformanceMonitor,
  serviceWorker: ServiceWorkerManager,
  utils: {
    formatDate,
    formatTime,
    debounce,
    throttle,
    isInViewport,
  },
};

console.log('🎙️ السيرة النبوية - Enhanced System Loaded ✅');
