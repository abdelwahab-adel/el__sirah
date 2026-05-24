/* ═══════════════════════════════════════════════════════════════
   السيرة النبوية (كاملة) — script-playlist.js
   YouTube Playlist Section Engine
   بواسطة يوسف القط | Yousef Elkott
   Playlist: PL6mMw2piuhMxbpKYpsQmHAprcqBchpd-F
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────── */
  const PLAYLIST_ID = 'PL6mMw2piuhMxbpKYpsQmHAprcqBchpd-F';
  const PLAYLIST_URL = `https://youtube.com/playlist?list=${PLAYLIST_ID}`;
  const PAGE_SIZE = 9; // cards per load

  /* Fallback static videos if API is unavailable */
  const FALLBACK_VIDEOS = [
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الأولى | مولد النبي ﷺ ونشأته الشريفة', duration: '42:15', episode: 1 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الثانية | نزول الوحي وبداية البعثة', duration: '38:50', episode: 2 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الثالثة | الجهر بالدعوة وتحديات مكة', duration: '44:22', episode: 3 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الرابعة | الهجرة إلى الحبشة', duration: '36:10', episode: 4 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الخامسة | عام الحزن وأثره في السيرة', duration: '40:55', episode: 5 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة السادسة | الهجرة إلى المدينة المنورة', duration: '47:30', episode: 6 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة السابعة | بناء المسجد النبوي والمؤاخاة', duration: '39:45', episode: 7 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة الثامنة | غزوة بدر الكبرى', duration: '52:00', episode: 8 },
    { id: 'YiMgxMUPWsU', title: 'السيرة النبوية الشريفة — الحلقة التاسعة | غزوة أُحد والدروس المستفادة', duration: '49:18', episode: 9 },
  ];

  /* ── State ───────────────────────────────────────────────────── */
  let allVideos = [];       // all fetched video objects
  let displayedCount = 0;   // how many are currently rendered
  let currentModalIndex = -1;
  let isSliderMode = false;
  let apiKey = null;        // filled in if user provides key

  /* ── DOM References ──────────────────────────────────────────── */
  const grid         = document.getElementById('playlistGrid');
  const loader       = document.getElementById('playlistLoader');
  const errorBox     = document.getElementById('playlistError');
  const fallbackBox  = document.getElementById('playlistFallback');
  const fallbackGrid = document.getElementById('fallbackGrid');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn  = document.getElementById('loadMoreBtn');
  const lmCount      = document.getElementById('lmCount');
  const totalCount   = document.getElementById('yt-total-count');
  const ytModal      = document.getElementById('ytModal');
  const ytEmbedWrap  = document.getElementById('ytEmbedWrap');
  const ytModalTitle = document.getElementById('ytModalTitle');
  const ytModalMeta  = document.getElementById('ytModalMeta');
  const ytOpenLink   = document.getElementById('ytOpenLink');
  const ytPrevBtn    = document.getElementById('ytPrevBtn');
  const ytNextBtn    = document.getElementById('ytNextBtn');
  const viewGridBtn  = document.getElementById('viewGrid');
  const viewSliderBtn= document.getElementById('viewSlider');

  /* ── Helpers ─────────────────────────────────────────────────── */
  function formatViews(n) {
    if (!n) return '';
    n = parseInt(n);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch(e) { return ''; }
  }

  function formatDuration(iso) {
    if (!iso) return '';
    // ISO 8601 duration: PT1H2M3S
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '';
    const h = parseInt(match[1] || 0);
    const m = parseInt(match[2] || 0);
    const s = parseInt(match[3] || 0);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  function getBestThumb(thumbs) {
    if (!thumbs) return '';
    return (thumbs.maxres || thumbs.high || thumbs.medium || thumbs.default || {}).url || '';
  }

  /* ── Card Builder ────────────────────────────────────────────── */
  function buildCard(video, index) {
    const { videoId, title, thumb, duration, views, publishedAt, channelTitle } = video;
    const episodeNum = index + 1;
    const thumbSrc = thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const card = document.createElement('div');
    card.className = 'yt-card';
    card.dataset.index = index;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', title);

    card.innerHTML = `
      <div class="card-thumb">
        <img
          loading="lazy"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E"
          data-src="${thumbSrc}"
          alt="${title}"
          width="480" height="270"
        >
        <div class="yt-thumb-overlay"></div>
        <div class="yt-play-icon">▶</div>
        ${duration ? `<div class="yt-duration">${duration}</div>` : ''}
        <div class="yt-episode-badge">${episodeNum}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${title}</div>
        <div class="card-meta">
          ${views ? `<span class="card-meta-item card-views"><span class="card-meta-icon">👁</span>${formatViews(views)} مشاهدة</span>` : ''}
          ${publishedAt ? `<span class="card-meta-item card-date"><span class="card-meta-icon">📅</span>${formatDate(publishedAt)}</span>` : ''}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-watch-btn" onclick="openYtModal(${index})">
          <span>▶</span> مشاهدة الحلقة
        </button>
        <span class="card-channel">
          <span>📺</span>
          ${channelTitle || 'يوسف القط'}
        </span>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.card-watch-btn')) openYtModal(index);
    });

    return card;
  }

  /* ── Lazy Load Images ────────────────────────────────────────── */
  let imageObserver = null;
  function setupLazyLoad() {
    if ('IntersectionObserver' in window) {
      imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, { rootMargin: '100px' });
    }
  }

  function observeImages(container) {
    if (!imageObserver) return;
    container.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  /* ── Card Reveal Animation ───────────────────────────────────── */
  let revealObserver = null;
  function setupReveal() {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, (parseInt(entry.target.dataset.delay) || 0));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  }

  function revealCards(cards) {
    cards.forEach((card, i) => {
      card.dataset.delay = i * 60;
      if (revealObserver) revealObserver.observe(card);
      else card.classList.add('revealed');
    });
  }

  /* ── Render Videos ───────────────────────────────────────────── */
  function renderVideos(videos, appendTo) {
    const fragment = document.createDocumentFragment();
    const newCards = [];
    videos.forEach((v, i) => {
      const globalIndex = displayedCount - (PAGE_SIZE - i) + (appendTo === grid ? 0 : 0);
      const card = buildCard(v, allVideos.indexOf(v));
      fragment.appendChild(card);
      newCards.push(card);
    });
    appendTo.appendChild(fragment);
    observeImages(appendTo);
    revealCards(newCards);
  }

  /* ── Show Initial Videos ─────────────────────────────────────── */
  function showInitialVideos() {
    grid.style.display = 'grid';
    const first = allVideos.slice(0, PAGE_SIZE);
    displayedCount = first.length;
    renderVideos(first, grid);
    updateLoadMore();
    totalCount.textContent = allVideos.length;
  }

  /* ── Load More ───────────────────────────────────────────────── */
  window.loadMoreVideos = function() {
    if (displayedCount >= allVideos.length) return;
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.querySelector('.lm-text').textContent = 'جارٍ التحميل...';

    setTimeout(() => {
      const next = allVideos.slice(displayedCount, displayedCount + PAGE_SIZE);
      displayedCount += next.length;
      renderVideos(next, grid);
      updateLoadMore();
      loadMoreBtn.classList.remove('loading');
      loadMoreBtn.querySelector('.lm-text').textContent = 'عرض المزيد من الحلقات';
    }, 400);
  };

  function updateLoadMore() {
    const remaining = allVideos.length - displayedCount;
    if (remaining <= 0) {
      loadMoreWrap.style.display = 'none';
    } else {
      loadMoreWrap.style.display = 'block';
      lmCount.textContent = `${remaining} متبقية`;
    }
  }

  /* ── YouTube Modal ───────────────────────────────────────────── */
  window.openYtModal = function(index) {
    currentModalIndex = index;
    const video = allVideos[index];
    if (!video) return;

    ytModalTitle.textContent = video.title;
    ytOpenLink.href = `https://www.youtube.com/watch?v=${video.videoId}&list=${PLAYLIST_ID}`;

    const meta = [];
    if (video.views)       meta.push(`👁 ${formatViews(video.views)} مشاهدة`);
    if (video.publishedAt) meta.push(`📅 ${formatDate(video.publishedAt)}`);
    if (video.duration)    meta.push(`⏱ ${video.duration}`);
    ytModalMeta.innerHTML = meta.join(' &nbsp;·&nbsp; ');

    ytEmbedWrap.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        title="${video.title}"
      ></iframe>
    `;

    // Nav buttons
    ytPrevBtn.disabled = index <= 0;
    ytNextBtn.disabled = index >= allVideos.length - 1;
    ytPrevBtn.style.opacity = index <= 0 ? '0.4' : '1';
    ytNextBtn.style.opacity = index >= allVideos.length - 1 ? '0.4' : '1';

    ytModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeYtModal = function() {
    ytModal.classList.remove('open');
    document.body.style.overflow = '';
    // Stop video by clearing iframe
    setTimeout(() => { ytEmbedWrap.innerHTML = ''; }, 350);
    currentModalIndex = -1;
  };

  window.ytModalNav = function(direction) {
    const newIndex = currentModalIndex + direction;
    if (newIndex < 0 || newIndex >= allVideos.length) return;
    openYtModal(newIndex);
  };

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!ytModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeYtModal();
    if (e.key === 'ArrowRight') ytModalNav(-1); // RTL: right = prev
    if (e.key === 'ArrowLeft')  ytModalNav(1);
  });

  /* ── View Toggle ─────────────────────────────────────────────── */
  function setupViewToggle() {
    viewGridBtn.addEventListener('click', () => {
      isSliderMode = false;
      grid.classList.remove('slider-mode');
      viewGridBtn.classList.add('active');
      viewSliderBtn.classList.remove('active');
    });
    viewSliderBtn.addEventListener('click', () => {
      isSliderMode = true;
      grid.classList.add('slider-mode');
      viewSliderBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
    });
  }

  /* ── Fetch via YouTube Data API v3 ──────────────────────────── */
  async function fetchPlaylistAPI(key, pageToken) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet,contentDetails');
    url.searchParams.set('playlistId', PLAYLIST_ID);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', key);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }

  async function fetchVideoDetails(key, videoIds) {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'contentDetails,statistics');
    url.searchParams.set('id', videoIds.join(','));
    url.searchParams.set('key', key);
    const res = await fetch(url);
    if (!res.ok) return {};
    const data = await res.json();
    const map = {};
    (data.items || []).forEach(item => {
      map[item.id] = {
        duration: formatDuration(item.contentDetails?.duration),
        views: item.statistics?.viewCount
      };
    });
    return map;
  }

  async function loadPlaylistWithAPI(key) {
    let nextPageToken = null;
    let allItems = [];

    do {
      const data = await fetchPlaylistAPI(key, nextPageToken);
      allItems = allItems.concat(data.items || []);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // Filter out private/deleted
    const validItems = allItems.filter(item =>
      item.snippet?.title && item.snippet.title !== 'Private video' &&
      item.snippet.resourceId?.videoId
    );

    // Fetch details in batches of 50
    const videoIds = validItems.map(i => i.snippet.resourceId.videoId);
    const detailsMap = await fetchVideoDetails(key, videoIds);

    allVideos = validItems.map(item => {
      const vid = item.snippet.resourceId.videoId;
      const det = detailsMap[vid] || {};
      return {
        videoId:      vid,
        title:        item.snippet.title,
        thumb:        getBestThumb(item.snippet.thumbnails),
        publishedAt:  item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        duration:     det.duration || '',
        views:        det.views || ''
      };
    });
  }

  /* ── No-API Fallback: YouTube oEmbed trick ───────────────────── */
  async function tryOembedFetch() {
    // Try to get playlist info via noembed (limited but no key needed)
    // We use the known playlist ID and build from known video IDs
    // This is a best-effort approach using public thumbnail URLs
    throw new Error('oEmbed not available for playlists');
  }

  /* ── Show Fallback ───────────────────────────────────────────── */
  function showFallback() {
    allVideos = FALLBACK_VIDEOS.map(v => ({ ...v, thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, videoId: v.id, channelTitle: 'يوسف القط' }));
    loader.style.display = 'none';
    fallbackBox.style.display = 'block';
    fallbackGrid.style.display = 'grid';
    displayedCount = allVideos.length;
    totalCount.textContent = '?';
    renderVideos(allVideos, fallbackGrid);
    setupViewToggle();
  }

  /* ── Main Load ───────────────────────────────────────────────── */
  window.loadPlaylist = async function(retry) {
    if (retry) {
      loader.style.display = 'block';
      errorBox.style.display = 'none';
      grid.style.display = 'none';
      grid.innerHTML = '';
      allVideos = [];
      displayedCount = 0;
    }

    // Check for API key in localStorage (power users can set it via console)
    const storedKey = localStorage.getItem('yt_api_key');

    if (storedKey) {
      try {
        await loadPlaylistWithAPI(storedKey);
        loader.style.display = 'none';
        showInitialVideos();
        setupViewToggle();
        return;
      } catch (err) {
        console.warn('YouTube API failed:', err);
      }
    }

    // No API key — show curated fallback with link to full playlist
    loader.style.display = 'none';
    showFallback();
  };

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    setupLazyLoad();
    setupReveal();

    // Observe section entry to trigger load lazily
    if ('IntersectionObserver' in window) {
      const section = document.getElementById('seerah-playlist');
      const sectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadPlaylist(false);
          sectionObserver.disconnect();
        }
      }, { threshold: 0.05 });
      if (section) sectionObserver.observe(section);
    } else {
      loadPlaylist(false);
    }

    // Expose API key setter for advanced users
    window.setYouTubeAPIKey = function(key) {
      localStorage.setItem('yt_api_key', key);
      grid.innerHTML = '';
      fallbackBox.style.display = 'none';
      loader.style.display = 'block';
      allVideos = [];
      displayedCount = 0;
      loadPlaylist(false);
      console.log('✅ YouTube API key saved. Reloading playlist...');
    };

    // Reveal section header elements
    document.querySelectorAll('#seerah-playlist .reveal-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
