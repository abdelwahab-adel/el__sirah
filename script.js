
// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const Stations=[
  {id:"30",name:"المختصر في السيرة النبوية",radio_url:"https://qurango.net/radio/almukhtasar_fi_alsiyra",category:"السيرة النبوية"},
  {id:"1",name:"إذاعة صور من حياة الصحابة رضوان الله عليهم",radio_url:"https://qurango.net/radio/sahabah",category:"السيرة النبوية"},
  {id:"4",name:"تفسير القرآن الكريم",radio_url:"https://qurango.net/radio/tafseer",category:"تفسير"},
  {id:"31",name:"المختصر في تفسير القرآن الكريم",radio_url:"https://qurango.net/radio/mukhtasartafsir",category:"تفسير"},
  {id:"17",name:"أذكار الصباح",radio_url:"https://qurango.net/radio/athkar_sabah",category:"أذكار"},
  {id:"18",name:"أذكار المساء",radio_url:"https://qurango.net/radio/athkar_masa",category:"أذكار"},
  {id:"3",name:"إذاعة آيات السكينة",radio_url:"https://qurango.net/radio/sakeenah",category:"منوعات"},
  {id:"154",name:"إذاعة القرآن الكريم من القاهرة",radio_url:"https://stream.radiojar.com/8s5u5tpdtwzuv",category:"منوعات"},
  {id:"155",name:"إذاعة القرآن الكريم من المملكة العربية السعودية",radio_url:"https://stream.radiojar.com/0tpy1h0kxtzuv",category:"منوعات"},
  {id:"156",name:"إذاعة الحرم المكي",radio_url:"http://r7.tarat.com:8004/stream?type=http&nocache=114",category:"منوعات"},
  {id:"6",name:"الإذاعة العامة - اذاعة متنوعة لمختلف القراء",radio_url:"https://qurango.net/radio/mix",category:"منوعات"},
  {id:"2",name:"تراتيل قصيرة متميزة",radio_url:"https://qurango.net/radio/tarateel",category:"منوعات"},
  {id:"28",name:"الفتاوى",radio_url:"https://qurango.net/radio/fatwa",category:"فتاوى"},
  {id:"157",name:"إذاعة فتاوى الشيخ ابن عثيمين",radio_url:"https://server03.quran.com.kw:7147/;*.mp3",category:"فتاوى"},
  {id:"158",name:"إذاعة فتاوى الشيخ متولي الشعراوي",radio_url:"https://server03.quran.com.kw:7148/;*.mp3",category:"فتاوى"},
  {id:"24",name:"الرقية الشرعية",radio_url:"https://qurango.net/radio/roqiah",category:"الرقية الشرعية"},
  {id:"7",name:"تلاوات خاشعة",radio_url:"https://qurango.net/radio/salma",category:"قراء"},
  {id:"130",name:"مشاري العفاسي",radio_url:"https://qurango.net/radio/mishary_alafasi",category:"قراء"},
  {id:"125",name:"محمود خليل الحصري",radio_url:"https://qurango.net/radio/mahmoud_khalil_alhussary",category:"قراء"},
  {id:"148",name:"ياسر الدوسري",radio_url:"https://qurango.net/radio/yasser_aldosari",category:"قراء"},
  {id:"141",name:"ناصر القطامي",radio_url:"https://qurango.net/radio/nasser_alqatami",category:"قراء"},
  {id:"131",name:"مصطفى إسماعيل",radio_url:"https://qurango.net/radio/mustafa_ismail",category:"قراء"},
  {id:"128",name:"محمود علي البنا",radio_url:"https://qurango.net/radio/mahmoud_ali__albanna",category:"قراء"},
  {id:"159",name:"إذاعة نداء الإسلام",radio_url:"http://n07.radiojar.com/59096z743d0uv?rjttl=5",category:"منوعات"}
];

const timelineData=[
  {year:"٥٧١ م",title:"مولد النبي ﷺ",icon:"🌙",desc:"وُلد محمد بن عبدالله ﷺ في مكة المكرمة عام الفيل، في شهر ربيع الأول، في بيت أبي طالب، وكان ميلاده نوراً أضاء الدنيا."},
  {year:"٦١٠ م",title:"البعثة النبوية",icon:"📖",desc:"نزل الوحي على النبي ﷺ في غار حراء بجبل النور، وكانت أول الآيات: اقرأ باسم ربك الذي خلق."},
  {year:"٦١٣ م",title:"الدعوة الجهرية",icon:"📣",desc:"أعلن النبي ﷺ دعوته للناس جهاراً على جبل الصفا، وبدأت مرحلة الصبر على أذى المشركين."},
  {year:"٦١٥ م",title:"الهجرة إلى الحبشة",icon:"🕊",desc:"هاجر بعض الصحابة إلى الحبشة فراراً من أذى قريش، وأجارهم النجاشي بحسن استقباله."},
  {year:"٦٢٢ م",title:"الهجرة إلى المدينة",icon:"🌴",desc:"هاجر النبي ﷺ وصحابته إلى المدينة المنورة، وكانت هذه الهجرة بداية التاريخ الهجري."},
  {year:"٦٢٤ م",title:"غزوة بدر الكبرى",icon:"⚔️",desc:"أول المعارك الكبرى للمسلمين، انتصر فيها المسلمون انتصاراً عظيماً رغم قلة عددهم."},
  {year:"٦٣٠ م",title:"فتح مكة المكرمة",icon:"🕌",desc:"دخل النبي ﷺ مكة فاتحاً في رمضان، وعفا عن أهلها قائلاً: اذهبوا فأنتم الطلقاء."},
  {year:"٦٣٢ م",title:"حجة الوداع",icon:"🤲",desc:"أدّى النبي ﷺ فريضة الحج وخطب خطبته الشهيرة، وأكمل الله الدين وأتمّ النعمة."},
  {year:"٦٣٢ م",title:"وفاة الرسول ﷺ",icon:"☁️",desc:"انتقل النبي ﷺ إلى الرفيق الأعلى في اثنتي عشرة من ربيع الأول، وهو ابن ثلاث وستين سنة."}
];

const ghazawatData=[
  {name:"غزوة بدر الكبرى",date:"رمضان ٢ هـ",reason:"اعتراض قافلة قريش التجارية وردع العدوان",result:"انتصار عظيم للمسلمين، مقتل كبار قريش",num:1},
  {name:"غزوة أحد",date:"شوال ٣ هـ",reason:"انتقام قريش لهزيمة بدر",result:"خسارة جزئية بسبب مخالفة الرماة للأمر",num:2},
  {name:"غزوة الخندق",date:"شوال ٥ هـ",reason:"تحالف الأحزاب لمحاصرة المدينة",result:"دفاع ناجح بفضل حفر الخندق وفشل الحصار",num:3},
  {name:"صلح الحديبية",date:"ذي القعدة ٦ هـ",reason:"رغبة المسلمين في أداء العمرة",result:"صلح عشر سنوات أتاح انتشار الإسلام",num:4},
  {name:"غزوة خيبر",date:"محرم ٧ هـ",reason:"وقف مؤامرات اليهود ضد المسلمين",result:"فتح خيبر وتوطيد الأمن في المدينة",num:5},
  {name:"فتح مكة المكرمة",date:"رمضان ٨ هـ",reason:"نقض قريش لبنود صلح الحديبية",result:"دخول مكة فتحاً بلا إراقة دماء تقريباً",num:6},
];

const shamailData=[
  {icon:"💛",title:"الرحمة",desc:"كان ﷺ رحيماً بالصغير والكبير والحيوان، وما خُيِّر بين أمرين إلا اختار أيسرهما."},
  {icon:"⚖️",title:"العدل",desc:"لم يفرق ﷺ بين شريف ووضيع في الحق، وقال: لو أن فاطمة سرقت لقطعت يدها."},
  {icon:"😊",title:"حسن الخلق",desc:"كان ﷺ أحسن الناس خلقاً، دائم البشر، سهل الحجاب، لين الجانب للجميع."},
  {icon:"🤝",title:"الوفاء",desc:"كان ﷺ وفياً لأصحابه ومحبيه، يتذكر معروف من أحسن إليه ولا ينساه أبداً."},
  {icon:"🌿",title:"الزهد",desc:"كان ﷺ يؤثر الآخرة على الدنيا، وتوفي ودرعه مرهونة عند يهودي في طعام لأهله."},
  {icon:"📿",title:"العبادة",desc:"كان ﷺ يقوم الليل حتى تتفطر قدماه، ويصوم النوافل ويجتهد في العشر الأواخر."},
  {icon:"🤲",title:"الكرم",desc:"كان ﷺ أجود الناس بالخير، ما سأله أحد حاجة فردّه، وكان أجود من الريح المرسلة."},
  {icon:"🦁",title:"الشجاعة",desc:"كان ﷺ أشجع الناس، يثبت يوم المعركة ويكون أقرب الناس إلى صفوف العدو."},
];

const hadithData=[
  {text:"إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله.",rawi:"عمر بن الخطاب رضي الله عنه",source:"متفق عليه"},
  {text:"المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه.",rawi:"عبدالله بن عمرو رضي الله عنه",source:"البخاري"},
  {text:"لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",rawi:"أنس بن مالك رضي الله عنه",source:"متفق عليه"},
  {text:"الدين النصيحة. قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.",rawi:"تميم الداري رضي الله عنه",source:"مسلم"},
  {text:"من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت.",rawi:"أبو هريرة رضي الله عنه",source:"متفق عليه"},
  {text:"اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.",rawi:"أبو ذر الغفاري رضي الله عنه",source:"الترمذي"},
];

const dailyItems=[
  {type:"حديث شريف",text:"خيركم من تعلّم القرآن وعلّمه.",source:"رواه البخاري"},
  {type:"من الشمائل",text:"كان رسول الله ﷺ أحسن الناس وجهاً وأحسنه خلقاً، لم يمدحه مادح إلا صدق فيه.",source:"البخاري ومسلم"},
  {type:"حكمة نبوية",text:"المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير.",source:"رواه مسلم"},
  {type:"دعاء مأثور",text:"اللهم إني أسألك العافية في الدنيا والآخرة.",source:"سنن أبي داود"},
  {type:"حديث شريف",text:"تبسّمك في وجه أخيك صدقة.",source:"رواه الترمذي"},
  {type:"من الشمائل",text:"ما مسّ رسول الله ﷺ حريراً ألين من كفّه، ولا شممت مسكاً أطيب من رائحته ﷺ.",source:"البخاري"},
  {type:"حديث شريف",text:"إن الله رفيق يحب الرفق، ويعطي على الرفق ما لا يعطي على العنف.",source:"رواه مسلم"},
];

// ═══════════════════════════════════════════
// WELCOME
// ═══════════════════════════════════════════
const welcomed = localStorage.getItem('seerah_v2_welcomed');
const fullText = "مرحبًا بك في رحلتك عبر السيرة النبوية الشريفة ﷺ";
let charIdx = 0;

function typeWelcome(){
  if(charIdx < fullText.length){
    document.getElementById('welcomeTyping').textContent += fullText[charIdx++];
    setTimeout(typeWelcome, 50);
  } else {
    document.getElementById('welcomeBtn').classList.add('show');
  }
}

function closeWelcome(){
  localStorage.setItem('seerah_v2_welcomed','1');
  document.getElementById('welcomeOverlay').classList.add('hidden');
}

if(welcomed){
  document.getElementById('welcomeOverlay').style.display = 'none';
} else {
  setTimeout(typeWelcome, 800);
}

// ═══════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════
function goTo(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
  document.getElementById('navLinks').classList.remove('open');
}
function toggleNav(){
  document.getElementById('navLinks').classList.toggle('open');
}

// ═══════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════
function buildTimeline(){
  const wrap = document.getElementById('timelineWrap');
  timelineData.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'tl-item fade-in';
    div.style.animationDelay = (i * 0.08) + 's';
    const isEven = i % 2 === 1;
    div.innerHTML = `
      <div class="tl-card">
        <div class="tl-year">${item.year}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="tl-more">اقرأ المزيد ←</span>
      </div>
      <div class="tl-dot">${item.icon}</div>
      <div class="tl-empty"></div>
    `;
    wrap.appendChild(div);
  });
}

// ═══════════════════════════════════════════
// STATIONS / AUDIO
// ═══════════════════════════════════════════
let currentStation = null;
const audio = document.getElementById('audioPlayer');

function buildStations(){
  const cats = [...new Set(Stations.map(s => s.category))].sort();
  const sel = document.getElementById('catFilter');
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    sel.appendChild(opt);
  });
  renderStations(Stations);
}

function renderStations(list){
  const grid = document.getElementById('stationsGrid');
  grid.innerHTML = '';
  if(!list.length){
    grid.innerHTML = '<div style="color:rgba(255,255,255,0.5);text-align:center;padding:2rem;font-family:Tajawal,sans-serif;grid-column:1/-1;">لا توجد نتائج</div>';
    return;
  }
  list.forEach(s => {
    const isPlaying = currentStation && currentStation.id === s.id;
    const card = document.createElement('div');
    card.className = 'station-card' + (isPlaying ? ' playing' : '');
    card.id = 'sc-' + s.id;
    card.onclick = () => playStation(s);
    card.innerHTML = `
      <div class="station-cat">${s.category}</div>
      <div class="station-name">${s.name}</div>
      <div class="station-play">
        <div class="play-icon">${isPlaying ? '♫' : '▶'}</div>
        <span>${isPlaying ? 'جارٍ التشغيل...' : 'اضغط للاستماع'}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterStations(){
  const q = document.getElementById('stationSearch').value.trim().toLowerCase();
  const cat = document.getElementById('catFilter').value;
  const filtered = Stations.filter(s => {
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    const matchC = !cat || s.category === cat;
    return matchQ && matchC;
  });
  renderStations(filtered);
}

function playStation(s){
  if(currentStation && currentStation.id === s.id){ togglePlay(); return; }
  currentStation = s;
  audio.src = s.radio_url;
  audio.volume = 0.8;
  audio.play().catch(() => {});
  document.getElementById('npName').textContent = s.name;
  document.getElementById('nowPlaying').style.display = 'flex';
  localStorage.setItem('seerah_last_station', JSON.stringify(s));
  filterStations();
}

function togglePlay(){
  if(audio.paused) audio.play().catch(() => {});
  else audio.pause();
}
function stopAudio(){
  audio.pause(); audio.src = '';
  currentStation = null;
  document.getElementById('nowPlaying').style.display = 'none';
  filterStations();
}
function setVolume(v){ audio.volume = v / 100; }
function onAudioPlay(){ document.getElementById('playPauseBtn').textContent = '⏸'; }
function onAudioPause(){ document.getElementById('playPauseBtn').textContent = '▶'; }

const lastStation = localStorage.getItem('seerah_last_station');
if(lastStation){
  try {
    const s = JSON.parse(lastStation);
    document.getElementById('npName').textContent = s.name + ' (آخر استماع)';
  } catch(e){}
}

// ═══════════════════════════════════════════
// GHAZAWAT
// ═══════════════════════════════════════════
function buildGhazawat(){
  const grid = document.getElementById('ghazawatGrid');
  ghazawatData.forEach(g => {
    const div = document.createElement('div');
    div.className = 'ghaz-card fade-in';
    div.innerHTML = `
      <div class="ghaz-header">
        <div class="ghaz-num">${g.num}</div>
        <h3>${g.name}</h3>
        <div class="ghaz-date">📅 ${g.date}</div>
      </div>
      <div class="ghaz-body">
        <div class="ghaz-row"><div class="ghaz-lbl">السبب</div><div class="ghaz-val">${g.reason}</div></div>
        <div class="ghaz-row"><div class="ghaz-lbl">النتيجة</div><div class="ghaz-val">${g.result}</div></div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ═══════════════════════════════════════════
// SHAMAIL
// ═══════════════════════════════════════════
function buildShamail(){
  const grid = document.getElementById('shamailGrid');
  shamailData.forEach(s => {
    const div = document.createElement('div');
    div.className = 'shamail-card fade-in';
    div.innerHTML = `
      <div class="shamail-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    `;
    grid.appendChild(div);
  });
}

// ═══════════════════════════════════════════
// HADITH
// ═══════════════════════════════════════════
function buildHadith(){
  const grid = document.getElementById('hadithGrid');
  hadithData.forEach(h => {
    const div = document.createElement('div');
    div.className = 'hadith-card fade-in';
    div.innerHTML = `
      <div class="hadith-text">${h.text}</div>
      <div class="hadith-meta">
        <div class="hadith-rawi">رواه: ${h.rawi}</div>
        <div class="hadith-source">${h.source}</div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ═══════════════════════════════════════════
// DAILY
// ═══════════════════════════════════════════
let dailyIdx = new Date().getDate() % dailyItems.length;
function loadDaily(){
  dailyIdx = (dailyIdx + 1) % dailyItems.length;
  const item = dailyItems[dailyIdx];
  document.getElementById('dailyType').textContent = item.type;
  document.getElementById('dailyText').textContent = item.text;
  document.getElementById('dailySource').textContent = '— ' + item.source;
}
loadDaily();

// ═══════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════
const searchableData = [
  ...timelineData.map(t => ({type:'سيرة', text:t.title + ' — ' + t.desc})),
  ...ghazawatData.map(g => ({type:'غزوة', text:g.name + ' — ' + g.reason + ' — ' + g.result})),
  ...hadithData.map(h => ({type:'حديث', text:h.text + ' — ' + h.rawi})),
  ...Stations.map(s => ({type:'محطة', text:s.name + ' — ' + s.category, station:s})),
];

function doSearch(q){
  const res = document.getElementById('searchResults');
  if(!q.trim()){ res.innerHTML = ''; return; }
  const matches = searchableData.filter(d => d.text.includes(q.trim())).slice(0, 10);
  if(!matches.length){
    res.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:2rem;font-family:Tajawal,sans-serif;">لا توجد نتائج مطابقة</div>';
    return;
  }
  res.innerHTML = matches.map(m => `
    <div class="result-item" style="${m.station ? 'cursor:pointer' : ''}" ${m.station ? 'onclick="playStation(' + JSON.stringify(m.station).replace(/"/g,"'") + ');goTo(\'listen\')"' : ''}>
      <div class="result-type">${m.type}</div>
      <div class="result-text">${m.text}</div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
buildTimeline();
buildStations();
buildGhazawat();
buildShamail();
buildHadith();
