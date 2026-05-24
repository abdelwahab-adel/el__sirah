/* ═══════════════════════════════════════════════════════════════
   السيرة النبوية الشريفة — script.js
   البيانات الكاملة + نظام الصوت + المنطق الأساسي
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 1. STATIONS DATA
// ═══════════════════════════════════════════════════════════════
const Stations = [
  // السيرة النبوية
  { id:"30", name:"المختصر في السيرة النبوية", radio_url:"https://qurango.net/radio/almukhtasar_fi_alsiyra", category:"السيرة النبوية" },
  { id:"1",  name:"صور من حياة الصحابة رضوان الله عليهم", radio_url:"https://qurango.net/radio/sahabah", category:"السيرة النبوية" },
  // التفسير
  { id:"4",  name:"تفسير القرآن الكريم", radio_url:"https://qurango.net/radio/tafseer", category:"تفسير" },
  { id:"31", name:"المختصر في تفسير القرآن الكريم", radio_url:"https://qurango.net/radio/mukhtasartafsir", category:"تفسير" },
  // أذكار
  { id:"17", name:"أذكار الصباح", radio_url:"https://qurango.net/radio/athkar_sabah", category:"أذكار" },
  { id:"18", name:"أذكار المساء", radio_url:"https://qurango.net/radio/athkar_masa", category:"أذكار" },
  { id:"24", name:"الرقية الشرعية", radio_url:"https://qurango.net/radio/roqiah", category:"أذكار" },
  // قراء
  { id:"130", name:"مشاري العفاسي", radio_url:"https://qurango.net/radio/mishary_alafasi", category:"قراء" },
  { id:"125", name:"محمود خليل الحصري", radio_url:"https://qurango.net/radio/mahmoud_khalil_alhussary", category:"قراء" },
  { id:"148", name:"ياسر الدوسري", radio_url:"https://qurango.net/radio/yasser_aldosari", category:"قراء" },
  { id:"141", name:"ناصر القطامي", radio_url:"https://qurango.net/radio/nasser_alqatami", category:"قراء" },
  { id:"131", name:"مصطفى إسماعيل", radio_url:"https://qurango.net/radio/mustafa_ismail", category:"قراء" },
  { id:"128", name:"محمود علي البنا", radio_url:"https://qurango.net/radio/mahmoud_ali__albanna", category:"قراء" },
  { id:"7",   name:"تلاوات خاشعة", radio_url:"https://qurango.net/radio/salma", category:"قراء" },
  // منوعات
  { id:"3",   name:"إذاعة آيات السكينة", radio_url:"https://qurango.net/radio/sakeenah", category:"منوعات" },
  { id:"154", name:"إذاعة القرآن الكريم من القاهرة", radio_url:"https://stream.radiojar.com/8s5u5tpdtwzuv", category:"منوعات" },
  { id:"155", name:"إذاعة القرآن الكريم من المملكة العربية السعودية", radio_url:"https://stream.radiojar.com/0tpy1h0kxtzuv", category:"منوعات" },
  { id:"156", name:"إذاعة الحرم المكي", radio_url:"http://r7.tarat.com:8004/stream", category:"منوعات" },
  { id:"6",   name:"الإذاعة العامة - مختلف القراء", radio_url:"https://qurango.net/radio/mix", category:"منوعات" },
  { id:"2",   name:"تراتيل قصيرة متميزة", radio_url:"https://qurango.net/radio/tarateel", category:"منوعات" },
  { id:"159", name:"إذاعة نداء الإسلام", radio_url:"http://n07.radiojar.com/59096z743d0uv", category:"منوعات" },
  // فتاوى
  { id:"28",  name:"الفتاوى", radio_url:"https://qurango.net/radio/fatwa", category:"فتاوى" },
  { id:"157", name:"فتاوى الشيخ ابن عثيمين", radio_url:"https://server03.quran.com.kw:7147/;*.mp3", category:"فتاوى" },
];

// ═══════════════════════════════════════════════════════════════
// 2. TIMELINE DATA (موسّع)
// ═══════════════════════════════════════════════════════════════
const timelineData = [
  // ─ مرحلة ما قبل البعثة ─
  { year:"٥٧١ م", era:"ما قبل البعثة", title:"مولد النبي ﷺ",
    icon:"🌙",
    desc:"وُلد محمد بن عبدالله ﷺ في مكة المكرمة عام الفيل، في شهر ربيع الأول، في بيت آمنة بنت وهب. كان والده عبدالله قد توفي قبل ولادته. وتوقّف النور يومها في أرجاء الكون، وأضاء قصور الشام.",
    details:"وُلد النبي ﷺ يوم الاثنين 12 ربيع الأول في عام الفيل. وقيل إن نار المجوس انطفأت، وإيوان كسرى تصدّع في ليلة مولده. أرضعته ثويبة ثم حليمة السعدية في بني سعد حيث أمضى سنوات طفولته الأولى ونشأ في بيئة نقية، وهناك حدثت له حادثة شق الصدر الأولى التي طهّر الله بها قلبه." },
  { year:"٥٧٦ م", era:"ما قبل البعثة", title:"وفاة الأم آمنة",
    icon:"🕊️",
    desc:"توفيت أمه السيدة آمنة بنت وهب في الأبواء عند عودتها من يثرب، وهو في سنته السادسة. فكفله جدّه عبدالمطلب ثم عمّه أبو طالب بعد وفاة الجد.",
    details:"عند عودتها من زيارة أخوال جدّه في يثرب، توفيت آمنة بالأبواء. تكفله جده عبد المطلب وكان يُدْنيه منه ويُكرمه. ولما توفي عبد المطلب وعمر النبي ﷺ ثماني سنوات، كفله عمه أبو طالب وضمّه لأبنائه وكان يحبه حباً شديداً ويدافع عنه حتى آخر لحظة في حياته." },
  { year:"٥٨٣ م", era:"ما قبل البعثة", title:"رحلة الشام مع عمّه",
    icon:"🐪",
    desc:"سافر النبي ﷺ في الثانية عشرة من عمره مع عمه أبي طالب إلى الشام تاجراً، فرأى بُحيرا الراهب علامات النبوة فيه وحذّر أبا طالب من اليهود.",
    details:"في هذه الرحلة توقفوا في بصرى بالشام، فرأى الراهب بَحِيرى الغمامة تظلل النبي ﷺ، ورأى خاتم النبوة بين كتفيه. فنصح أبا طالب بأن يعود به إلى مكة خشية عليه من اليهود إذا عرفوا أنه النبي المنتظر." },
  { year:"٥٩٥ م", era:"ما قبل البعثة", title:"الزواج من السيدة خديجة رضي الله عنها",
    icon:"💛",
    desc:"تزوّج النبي ﷺ السيدة خديجة بنت خويلد وعمره خمس وعشرون سنة، وكانت من خيرة نساء قريش. كانت أول المؤمنين به، وأول من صدّق برسالته، ووقفت إلى جانبه في أشد الأوقات.",
    details:"عمل النبي ﷺ في تجارة السيدة خديجة، ولما رأت أمانته وصدقه وبركته (عن طريق غلامها ميسرة)، رغبت في الزواج منه. تزوجها فأنجبت له القاسم، زينب، رقية، أم كلثوم، فاطمة، وعبد الله. ولم يتزوج عليها حتى توفيت." },
  { year:"٦٠٥ م", era:"ما قبل البعثة", title:"إعادة بناء الكعبة وحكم النزاع",
    icon:"🕌",
    desc:"حين أعادت قريش بناء الكعبة واختلفوا على من يضع الحجر الأسود، تحاكموا إلى أول داخل، فكان محمد ﷺ، فقضى بأن يُوضع الحجر على رداء ويأخذ من كل قبيلة شيخٌ بطرف.",
    details:"بعد سيل اجتاح مكة، هدمت قريش الكعبة لتجديدها. وعندما وصلوا لموضع الحجر الأسود تنازعوا حتى كادوا يقتتلون. ثم اتفقوا على تحكيم أول من يدخل، فكان النبي ﷺ، وقالوا: 'هذا الأمين، رضينا'. بحكمته جعلهم يشتركون جميعاً في شرف رفع الحجر بوضعه في ثوب." },
  // ─ مرحلة البعثة المكية ─
  { year:"٦١٠ م", era:"البعثة المكية", title:"نزول الوحي في غار حراء",
    icon:"📖",
    desc:"في الثاني عشر من ربيع الأول، نزل جبريل عليه السلام على النبي ﷺ في غار حراء بأول آيات القرآن: «اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ». عاد النبي يرتجف، فطمأنته خديجة وأعلن مع مَن آمنوا أول الدعوة سراً.",
    details:"كان ﷺ يعتزل الناس في غار حراء يتفكر في ملكوت السماوات. وفي رمضان من السنة الأربعين من عمره، نزل عليه جبريل وضمه قائلاً 'اقرأ'. عاد إلى خديجة خائفاً فزمّلته، وقالت كلمتها الشهيرة: 'والله لا يخزيك الله أبداً، إنك لتصل الرحم، وتصدق الحديث...'. ثم أخذته لورقة بن نوفل الذي بشره بالنبوة." },
  { year:"٦١٣ م", era:"البعثة المكية", title:"الجهر بالدعوة على الصفا",
    icon:"📣",
    desc:"صعد النبي ﷺ جبل الصفا ونادى قريشاً: «يا صباحاه!» وأخبرهم بدعوته. قال له أبو لهب: «تبّاً لك»، فأُنزلت سورة المسد. وبدأت مرحلة الصبر على أذى المشركين والاستهزاء والتعذيب.",
    details:"بعد ثلاث سنوات من الدعوة السرية، أمره الله بالجهر: {فَاصْدَعْ بِمَا تُؤْمَرُ}. واجهت قريش الدعوة بالسخرية ثم الاضطهاد. وتعرّض المستضعفون من المسلمين (مثل بلال وآل ياسر وخباب) لعذاب شديد، بينما حمى أبو طالب النبي ﷺ من أذى قريش المباشر." },
  { year:"٦١٥ م", era:"البعثة المكية", title:"الهجرة الأولى إلى الحبشة",
    icon:"⛵",
    desc:"هاجر نحو خمسة عشر مسلماً إلى الحبشة فراراً من اضطهاد قريش، وأجارهم النجاشي ملك الحبشة. كانت أول هجرة في الإسلام، وفيها أعلن النجاشي إسلامه سراً.",
    details:"لما اشتد الأذى، أشار النبي ﷺ على أصحابه بالهجرة إلى الحبشة 'فإن بها ملكاً لا يُظلم عنده أحد'. فهاجر 11 رجلاً و4 نسوة، ثم تبعهم آخرون. حاول مبعوثا قريش (عمرو بن العاص وعبد الله بن أبي ربيعة) استردادهم، لكن النجاشي رفض بعد سماعه للقرآن من جعفر بن أبي طالب." },
  { year:"٦١٩ م", era:"البعثة المكية", title:"عام الحزن — وفاة خديجة وأبي طالب",
    icon:"☁️",
    desc:"في عام واحد توفيت السيدة خديجة أم المؤمنين، وعمّه أبو طالب الذي كان يحميه. سمّي هذا العام بـ«عام الحزن». ازداد أذى قريش، فتوجّه النبي ﷺ إلى الطائف يطلب النصرة فأُذي وطُرد منها.",
    details:"في السنة العاشرة للبعثة، توفي أبو طالب الذي كان الدرع الواقي للنبي ﷺ، وبعده بأيام توفيت الزوجة الوفية خديجة. حزن النبي ﷺ حزناً شديداً وتجرأت عليه قريش. ذهب للطائف طالباً الحماية فكذبوه ورموه بالحجارة حتى دميت قدماه الشريفتان." },
  { year:"٦٢٠ م", era:"البعثة المكية", title:"الإسراء والمعراج",
    icon:"✨",
    desc:"أُسري بالنبي ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السماوات العلا حتى سِدرة المنتهى. فُرضت الصلوات الخمس في هذه الرحلة الروحانية العظيمة.",
    details:"جاءت الرحلة تكريماً وتثبيتاً له بعد عام الحزن. أُسري به على 'البراق' إلى بيت المقدس وصلى بالأنبياء. ثم عُرج به للسماوات العلا ورأى الجنة والنار وسدرة المنتهى، وفُرضت الصلاة خمسين ثم خُففت إلى خمس. في الصباح، كذبته قريش بينما صدّقه أبو بكر ليلُقَّب بـ'الصديق'." },
  // ─ مرحلة المدينة ─
  { year:"٦٢٢ م", era:"المرحلة المدنية", title:"الهجرة العظيمة إلى المدينة",
    icon:"🌴",
    desc:"هاجر النبي ﷺ مع صاحبه أبي بكر الصديق، واختبآ ثلاثة أيام في غار ثور. وصل إلى يثرب (المدينة المنورة) في ربيع الأول، فاستقبله الأنصار بحفاوة بالغة. وكانت هذه الهجرة بداية التاريخ الهجري.",
    details:"تآمرت قريش في 'دار الندوة' لقتل النبي ﷺ ليلة الهجرة. نام علي بن أبي طالب في فراشه. وخرج النبي ﷺ وصاحبه أبو بكر إلى غار ثور. استعانوا بعبد الله بن أريقط ليدلهم على طريق غير مألوف. وصلوا قباء ثم المدينة فاستقبله الأنصار بنشيد 'طلع البدر علينا'." },
  { year:"٦٢٣ م", era:"المرحلة المدنية", title:"بناء المسجد النبوي وصحيفة المدينة",
    icon:"🏛️",
    desc:"بنى النبي ﷺ المسجد النبوي الشريف وآخى بين المهاجرين والأنصار. وأبرم صحيفة المدينة التي تُعدّ أول دستور مكتوب في التاريخ ينظّم العلاقات بين المسلمين واليهود والمشركين.",
    details:"بُرِكَت ناقة النبي ﷺ (القصواء) في أرض لغلامين يتيمين، فاشتراها وبنى عليها المسجد ومساكنه. شارك النبي ﷺ بنفسه في البناء لنقل الحجارة واللّبِن. أصبح المسجد مركزاً للعبادة، والتعليم، وإدارة شؤون الدولة والمجتمع الجديد." },
  { year:"٦٢٤ م", era:"المرحلة المدنية", title:"غزوة بدر الكبرى — يوم الفرقان",
    icon:"⚔️",
    desc:"أول المعارك الكبرى، خرج فيها ٣١٣ مسلماً مقابل ١٠٠٠ مشرك. انتصر المسلمون انتصاراً مؤزراً بنصر الله، وقُتل كبار قريش كأبي جهل. سمّاها الله «يوم الفرقان».",
    details:"خرج المسلمون لاعتراض قافلة لأبي سفيان تعويضاً لأموالهم المسلوبة بمكة. نجت القافلة، وأصرّ أبو جهل على القتال لفرض هيبة قريش. أمدّ الله المسلمين بالملائكة، فقُتل 70 وأُسر 70 من المشركين، ليكون هذا اليوم 'يوم الفرقان'." },
  { year:"٦٢٧ م", era:"المرحلة المدنية", title:"غزوة الأحزاب — الخندق",
    icon:"🛡️",
    desc:"تحالف عشرة آلاف مشرك لمحاصرة المدينة، فأشار سلمان الفارسي بحفر خندق. صمد المسلمون ثلاثة أسابيع وانسحب الأحزاب خاسرين. قال الله: «وَكَفَى اللَّهُ الْمُؤْمِنِينَ الْقِتَالَ».",
    details:"جمع اليهود (بنو النضير) قبائل العرب في جيش ضخم من 10,000 مقاتل. أشار سلمان بحفر الخندق شمال المدينة. عانى المسلمون من البرد والجوع والخوف، ونقض 'بنو قريظة' العهد من الداخل. ثم أرسل الله ريحاً شديدة اقتلعت خيام الأحزاب فانهزموا دون قتال." },
  { year:"٦٢٨ م", era:"المرحلة المدنية", title:"صلح الحديبية",
    icon:"📜",
    desc:"توجّه النبي ﷺ مع ألف وأربعمائة صحابي لأداء العمرة، فصدّتهم قريش. وعُقد صلح الحديبية لعشر سنوات. بدا ظاهراً كأنه تنازل، لكن الله سماه «فتحاً مبيناً» إذ فتح الباب لانتشار الإسلام.",
    details:"رأى النبي ﷺ رؤيا أنه يطوف بالبيت فخرج معتمراً. منعتهم قريش. بُويع المسلمون تحت الشجرة (بيعة الرضوان). انتهى الأمر بصلح لمدة 10 سنوات، وشروط بدت مجحفة، لكنها سمحت للمسلمين بنشر الإسلام بأمان ودخول كبار القادة فيه كخالد وعمرو." },
  { year:"٦٣٠ م", era:"المرحلة المدنية", title:"فتح مكة المكرمة",
    icon:"🕌",
    desc:"دخل النبي ﷺ مكة المكرمة في رمضان فاتحاً بعشرة آلاف مقاتل. طاف بالكعبة وكسّر الأصنام. ثم عفا عن أهل مكة قائلاً: «اذهبوا فأنتم الطلقاء»؛ موقف لم تشهده الحضارة من قبل.",
    details:"نقضت قريش العهد بمساعدة 'بني بكر' ضد 'خزاعة' حلفاء المسلمين. جهّز النبي ﷺ جيشاً من 10,000 وتوجه سراً لمكة. دخلها خافضاً رأسه تواضعاً، وحطّم الأصنام حول الكعبة، وأعلن العفو العام عن أهل مكة الذين آذوه طويلاً قائلاً: 'اذهبوا فأنتم الطلقاء'." },
  { year:"٦٣٢ م", era:"المرحلة المدنية", title:"حجة الوداع",
    icon:"🤲",
    desc:"أدّى النبي ﷺ فريضة الحج مع مئة وأربعة وعشرين ألف صحابي. خطب خطبته الخالدة: «أيها الناس، إني قد تركت فيكم ما إن تمسكتم به لن تضلوا: كتاب الله». وأنزل الله: «الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ».",
    details:"في السنة العاشرة، حج النبي ﷺ وعلّم الناس مناسكهم. وفي خطبة الوداع بعرفة، أرسى مبادئ حقوق الإنسان في الإسلام: حرمة الدماء والأموال، وإلغاء ربا الجاهلية وثاراتها، والمساواة بين الناس، والوصية بالنساء خيراً." },
  { year:"٦٣٢ م", era:"المرحلة المدنية", title:"وفاة المصطفى ﷺ",
    icon:"💚",
    desc:"انتقل حبيب الله ﷺ إلى الرفيق الأعلى في الثاني عشر من ربيع الأول، سنة ١١ هجرية، وهو ابن ثلاث وستين سنة. وكانت آخر كلماته: «الصلاة... وما ملكت أيمانكم». فُجع المسلمون وبكوا المدينة لوفاته.",
    details:"بدأ مرضه ﷺ بصداع وحمى، فاستأذن زوجاته أن يُمَرَّض في بيت عائشة. أوصى بالصلاة وبالمماليك، وأمر أبا بكر أن يصلي بالناس. وفي ضحى الاثنين، اختار 'الرفيق الأعلى'. كاد المسلمون أن يفقدوا صوابهم حتى ثبّتهم أبو بكر قائلاً: 'من كان يعبد محمداً فإن محمداً قد مات، ومن كان يعبد الله فإن الله حي لا يموت'." },
];

// ═══════════════════════════════════════════════════════════════
// 3. GHAZAWAT DATA (موسّع)
// ═══════════════════════════════════════════════════════════════
const ghazawatData = [
  { num:1,  name:"غزوة بدر الكبرى",   date:"رمضان ٢ هـ — مارس ٦٢٤م",
    reason:"اعتراض قافلة قريش التجارية واختبار قوة المسلمين بعد الهجرة",
    result:"انتصار عظيم رغم فارق العدد (٣١٣ مسلم × ١٠٠٠ مشرك). مقتل أبي جهل وكبار قريش." },
  { num:2,  name:"غزوة أحد",          date:"شوال ٣ هـ — مارس ٦٢٥م",
    reason:"انتقام قريش لهزيمتهم في بدر بجيش قوامه ٣٠٠٠ مقاتل",
    result:"خسارة جزئية بسبب مخالفة الرماة أمر النبي ﷺ. استُشهد سيد الشهداء حمزة بن عبد المطلب." },
  { num:3,  name:"غزوة الخندق (الأحزاب)", date:"شوال ٥ هـ — مارس ٦٢٧م",
    reason:"تحالف قبائل متعددة لمحاصرة المدينة واستئصال المسلمين",
    result:"دفاع ناجح بفضل حفر الخندق. رُدّ الأحزاب بعد ثلاثة أسابيع خاسرين بلا معركة كبرى." },
  { num:4,  name:"صلح الحديبية",      date:"ذي القعدة ٦ هـ — مارس ٦٢٨م",
    reason:"توجّه النبي ﷺ وأصحابه لأداء العمرة فصدّتهم قريش",
    result:"هدنة عشر سنوات. كان فتحاً مبيناً أتاح انتشار الإسلام واسعاً في شبه الجزيرة." },
  { num:5,  name:"غزوة خيبر",        date:"محرم ٧ هـ — يناير ٦٢٨م",
    reason:"وقف مؤامرات اليهود وحلفائهم ضد المسلمين بعد الخندق",
    result:"فتح حصون خيبر على يد علي بن أبي طالب. توطيد الأمن في الشمال ودخل اقتصادي للمسلمين." },
  { num:6,  name:"فتح مكة المكرمة", date:"رمضان ٨ هـ — يناير ٦٣٠م",
    reason:"نقض قريش بنود صلح الحديبية بمهاجمتهم حليفة المسلمين قبيلة خزاعة",
    result:"دخول مكة فتحاً سلمياً بلا إراقة دماء تقريباً. تطهير الكعبة من ٣٦٠ صنماً. العفو العام عن أهل مكة." },
  { num:7,  name:"غزوة حنين",        date:"شوال ٨ هـ — يناير ٦٣٠م",
    reason:"هجوم قبيلتَي هوازن وثقيف على المسلمين إثر فتح مكة",
    result:"انتصار بعد انكسار أولي بسبب الإعجاب بالكثرة. غنائم وفيرة. دخول ٢٠٠٠٠ نفس في الإسلام." },
  { num:8,  name:"غزوة تبوك",        date:"رجب ٩ هـ — أكتوبر ٦٣٠م",
    reason:"مواجهة الإمبراطورية الرومانية في أقصى الجزيرة العربية لحماية الحدود الشمالية",
    result:"لم تقع معركة. عقد معاهدات مع حكام المنطقة. إثبات قوة المسلمين وردع الروم. كشف أمر المنافقين." },
];

// ═══════════════════════════════════════════════════════════════
// 4. SAHABA DATA (جديد)
// ═══════════════════════════════════════════════════════════════
const sahabaData = [
  { icon:"👑", name:"أبو بكر الصديق", nickname:"الصدّيق — أول الخلفاء الراشدين",
    desc:"أول من أسلم من الرجال الأحرار، وأوثق الناس بالنبي ﷺ. صاحب الغار وخليفته من بعده. قال عنه ﷺ: «ما صبّ الله في صدري شيئاً إلا وصببته في صدر أبي بكر».",
    quote:"ما حملت رسول الله ﷺ إلى أحد ولا حمله أحد إليّ، وكنت أوثقهم به وأحبّهم إليه.",
    badge:"من العشرة المبشرين بالجنة" },
  { icon:"⚔️", name:"عمر بن الخطاب", nickname:"الفاروق — ثاني الخلفاء الراشدين",
    desc:"أسلم في السنة السادسة من البعثة وكان إسلامه فتحاً للمسلمين. عُرف بعدله الذي لا يُحابي أحداً. فتح في خلافته الشام والعراق ومصر وفارس.",
    quote:"لو عثرت بغلة في العراق لخشيت أن يسألني الله عنها، لماذا لم تُصلح لها الطريق يا عمر.",
    badge:"من العشرة المبشرين بالجنة" },
  { icon:"📿", name:"عثمان بن عفان", nickname:"ذو النورين — ثالث الخلفاء الراشدين",
    desc:"تزوّج بنتَي النبي ﷺ رقية ثم أم كلثوم فلُقّب بـ«ذي النورين». جمع القرآن الكريم في مصحف واحد وأرسل نسخه إلى الأمصار.",
    quote:"والله ما قتلتُ نفساً في جاهلية ولا إسلام، وما زنيتُ في جاهلية ولا إسلام.",
    badge:"من العشرة المبشرين بالجنة" },
  { icon:"🦁", name:"علي بن أبي طالب", nickname:"أسد الله — رابع الخلفاء الراشدين",
    desc:"ابن عم النبي ﷺ وزوج فاطمة الزهراء. أسلم وهو صغير وربّاه النبي في بيته. باب مدينة علم النبي ﷺ. اشتُهر بفقهه وشجاعته وعدله.",
    quote:"اعرفِ الحقَّ تعرف أهله.",
    badge:"من العشرة المبشرين بالجنة" },
  { icon:"✨", name:"بلال بن رباح", nickname:"مؤذّن النبي ﷺ — سيد المؤذنين",
    desc:"عبد حبشي عُذّب بالرمضاء ليترك الإسلام فكان يقول: «أحد أحد». اشتراه أبو بكر وحرّره. اختاره النبي ﷺ أول مؤذن في الإسلام. صعد إلى ظهر الكعبة يوم الفتح ليؤذن.",
    quote:"أحد، أحد.",
    badge:"السابق الأول من الموالي" },
  { icon:"🌿", name:"أبو هريرة", nickname:"حافظ حديث النبي ﷺ",
    desc:"أكثر الصحابة رواية للحديث النبوي. أسلم عام خيبر ولازم النبي ﷺ ثلاث سنوات فحفظ آلاف الأحاديث. دعا له النبي ﷺ بالحفظ فلم ينسَ بعدها شيئاً.",
    quote:"إن الناس يقولون أكثر أبو هريرة من الحديث. والله لولا آيتان أنزل الله في كتابه ما حدّثت.",
    badge:"أكثر الصحابة رواية للحديث" },
  { icon:"📖", name:"عبد الله بن مسعود", nickname:"أُمّ عبد — حامل نعلي رسول الله",
    desc:"من أوائل المسلمين. كان يمشي مع النبي ﷺ أينما ذهب. قال عنه ﷺ: «من أراد أن يقرأ القرآن غضاً كما أُنزل، فليقرأه على قراءة ابن أم عبد».",
    quote:"من كان مستنّاً فليستنَّ بمن قد مات أولئك أصحاب محمد ﷺ.",
    badge:"من كبار فقهاء الصحابة" },
  { icon:"🌟", name:"سلمان الفارسي", nickname:"المحبوب — ابن الإسلام",
    desc:"أصله من فارس، طلب الحق فتنقّل بين ديانات ومعلمين حتى وصل إلى المدينة فأسلم. صاحب فكرة حفر الخندق في غزوة الأحزاب. قال عنه النبي ﷺ: «سلمان منّا أهل البيت».",
    quote:"ثلاثة لا تقولنّ فيهم إلا خيراً: علي وفاطمة والحسن والحسين.",
    badge:"من كبار الصحابة الفرسان" },
  { icon:"🤲", name:"خالد بن الوليد", nickname:"سيف الله المسلول",
    desc:"قائد عسكري فذّ لم يُهزم في معركة قط. أسلم عام صلح الحديبية. قاد فتوحات الشام والعراق. قال عنه ﷺ: «نعم عبد الله وأخو العشيرة، وسيف من سيوف الله».",
    quote:"ما أتيتُ فراشاً منذ أسلمتُ إلا وتحتي سيفي، أريد أن أُقاتل في سبيل الله.",
    badge:"أمير الجيوش الإسلامية" },
  { icon:"💎", name:"عائشة بنت أبي بكر", nickname:"أم المؤمنين — الحميراء",
    desc:"زوج النبي ﷺ المحبوبة وأعلم النساء في الإسلام. روت آلاف الأحاديث وأفتت في الفقه والطب واللغة. وصفها النبي بـ«الحميراء».",
    quote:"كان خلقه القرآن.",
    badge:"أم المؤمنين — أعلم نساء الصحابة" },
  { icon:"🏅", name:"سعد بن أبي وقاص", nickname:"أسد القادسية — فاتح فارس",
    desc:"أول من رمى بسهم في سبيل الله. دعا له النبي ﷺ أن تُستجاب دعوته. قاد جيوش المسلمين في القادسية ففتح فارس وكسر امبراطوريتها إلى الأبد.",
    quote:"دعا لي رسول الله ﷺ بثلاث دعوات، لا أدري بأيّهن أسرّ.",
    badge:"من العشرة المبشرين بالجنة" },
  { icon:"🌸", name:"فاطمة الزهراء", nickname:"سيدة نساء أهل الجنة",
    desc:"ابنة النبي ﷺ وزوج علي وأم الحسن والحسين. سيدة نساء أهل الجنة. قال عنها أبوها ﷺ: «فاطمة بضعة مني، يؤلمني ما يؤلمها».",
    quote:"من أهديت إليه كلمة لا إله إلا الله فقد أُعطي الجنة.",
    badge:"سيدة نساء العالمين" },
];

// ═══════════════════════════════════════════════════════════════
// 5. SHAMAIL DATA (موسّع)
// ═══════════════════════════════════════════════════════════════
const shamailData = [
  { icon:"💛", title:"الرحمة",       desc:"كان ﷺ رحيماً بالصغير والكبير والبهيمة. دخل المسجد ذات يوم فوجد رجلاً مريضاً فقال: ما كان حاجتك؟ وما خُيّر بين أمرين إلا اختار أيسرهما ما لم يكن إثماً." },
  { icon:"⚖️", title:"العدل",        desc:"لم يفرّق ﷺ بين شريف ووضيع في الحق. قال: «لو أن فاطمة بنت محمد سرقت لقطعت يدها». كان أعدل خلق الله وأبعدهم عن المحاباة والمحسوبية." },
  { icon:"😊", title:"حسن الخلق",   desc:"كان ﷺ أحسن الناس خلقاً وأبشّهم وجهاً، دائم البِشر، سهل الحجاب، لين الجانب. قالت عائشة: «ما كان فاحشاً ولا متفحشاً، ولا صخاباً في الأسواق»." },
  { icon:"🤝", title:"الوفاء",       desc:"كان ﷺ وفياً لأصحابه حتى بعد وفاتهم. كان يُكرم أصدقاء خديجة حتى بعد وفاتها، وكان إذا ذُبحت الشاة يبعث بها إلى صديقات خديجة." },
  { icon:"🌿", title:"الزهد",        desc:"توفي ﷺ ودرعه مرهونة عند يهودي في طعام لأهله. ما ترك ديناراً ولا درهماً. وكان يقول: «ما لي وللدنيا؟ ما أنا في الدنيا إلا كراكب استظلّ تحت شجرة ثم راح وتركها»." },
  { icon:"📿", title:"العبادة",       desc:"كان ﷺ يقوم الليل حتى تتفطّر قدماه. فقالت عائشة: لماذا؟ قال: «أفلا أكون عبداً شكوراً؟». وكان يصوم النوافل ويجتهد في العشر الأواخر من رمضان." },
  { icon:"🤲", title:"الكرم",        desc:"كان ﷺ أجود الناس بالخير. ما سأله أحد حاجة فردّه إلا بها أو بعذر. قال جابر: «ما سُئل النبي ﷺ شيئاً قط فقال لا»." },
  { icon:"🦁", title:"الشجاعة",     desc:"كان ﷺ أشجع الناس. كانوا يلجؤون إليه يوم المعركة. قال علي: «كنا إذا اشتدّ البأس ولقي القومُ القومَ اتّقينا برسول الله ﷺ، وما كان أحد أقرب من العدو منه»." },
  { icon:"🌸", title:"التواضع",      desc:"كان ﷺ يجلس مع الفقراء والمساكين ويعود المرضى ويشهد الجنائز. يمشي مع العبد والأَمَة في حاجتهما. لا يتميّز على أصحابه حتى ليأتيه الغريب فلا يعرفه." },
  { icon:"💬", title:"حسن المعاملة", desc:"كان ﷺ يُسلّم على الصغير قبل الكبير، ولا يسبق أحداً بالسلام. ويُقبل بوجهه على مَن يحدّثه. لا يحتقر أحداً ولا يُعيّره." },
  { icon:"🌙", title:"التطيّب",      desc:"كان ﷺ أطيب الناس رائحة. تفوح منه رائحة أطيب من المسك، حتى قال أنس: «ما شممت ريح عنبر ولا مسك ولا شيئاً أطيب من ريح رسول الله ﷺ»." },
  { icon:"📘", title:"الحكمة",       desc:"كان ﷺ أحكم الناس وأعمقهم تفكيراً. يضع الأمور في مواضعها ويعرف كيف يخاطب كل إنسان. قال الله: «وَمَا يَنطِقُ عَنِ الْهَوَى. إِنْ هُوَ إِلَّا وَحْيٌ يُوحَى»." },
];

// ═══════════════════════════════════════════════════════════════
// 6. HADITH DATA (موسّع)
// ═══════════════════════════════════════════════════════════════
const hadithData = [
  { text:"إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله.", rawi:"عمر بن الخطاب رضي الله عنه", source:"متفق عليه" },
  { text:"لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.", rawi:"أنس بن مالك رضي الله عنه", source:"متفق عليه" },
  { text:"المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه.", rawi:"عبدالله بن عمرو رضي الله عنه", source:"البخاري" },
  { text:"الدين النصيحة. قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.", rawi:"تميم الداري رضي الله عنه", source:"مسلم" },
  { text:"من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت.", rawi:"أبو هريرة رضي الله عنه", source:"متفق عليه" },
  { text:"اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.", rawi:"أبو ذر الغفاري رضي الله عنه", source:"الترمذي — حسن صحيح" },
  { text:"خيركم من تعلّم القرآن وعلّمه.", rawi:"عثمان بن عفان رضي الله عنه", source:"البخاري" },
  { text:"تبسّمك في وجه أخيك صدقة.", rawi:"أبو ذر الغفاري رضي الله عنه", source:"الترمذي" },
  { text:"إن الله رفيق يحب الرفق، ويعطي على الرفق ما لا يعطي على العنف وما لا يعطي على سواه.", rawi:"عائشة رضي الله عنها", source:"مسلم" },
  { text:"من نفّس عن مؤمن كربةً من كُرَب الدنيا، نفّس الله عنه كربةً من كُرَب يوم القيامة.", rawi:"أبو هريرة رضي الله عنه", source:"مسلم" },
  { text:"المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير.", rawi:"أبو هريرة رضي الله عنه", source:"مسلم" },
  { text:"ما من مسلم يغرس غرساً أو يزرع زرعاً فيأكل منه طير أو إنسان أو بهيمة إلا كان له به صدقة.", rawi:"أنس بن مالك رضي الله عنه", source:"متفق عليه" },
];

// ═══════════════════════════════════════════════════════════════
// 7. DAILY WISDOM DATA (موسّع)
// ═══════════════════════════════════════════════════════════════
const dailyItems = [
  { type:"حديث شريف",   text:"خيركم من تعلّم القرآن وعلّمه.", source:"رواه البخاري" },
  { type:"من الشمائل", text:"كان رسول الله ﷺ أحسن الناس وجهاً وأحسنه خلقاً، لم يمدحه مادح إلا صدق فيه.", source:"البخاري ومسلم" },
  { type:"حكمة نبوية",  text:"المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير.", source:"رواه مسلم" },
  { type:"دعاء مأثور",  text:"اللهم إني أسألك العافية في الدنيا والآخرة.", source:"سنن أبي داود" },
  { type:"حديث شريف",   text:"تبسّمك في وجه أخيك صدقة.", source:"رواه الترمذي" },
  { type:"من الشمائل", text:"ما مسّ رسول الله ﷺ حريراً ألين من كفّه، ولا شممت مسكاً أطيب من رائحته ﷺ.", source:"البخاري" },
  { type:"حديث شريف",   text:"إن الله رفيق يحب الرفق في الأمر كله.", source:"رواه البخاري" },
  { type:"حكمة نبوية",  text:"الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن ما بين السماوات والأرض.", source:"رواه مسلم" },
  { type:"دعاء مأثور",  text:"اللهم أعنّي على ذِكرك وشُكرك وحُسن عبادتك.", source:"سنن أبي داود والنسائي" },
  { type:"حديث شريف",   text:"إن من أحبّكم إليّ وأقربكم منّي مجلساً يوم القيامة أحاسنُكم أخلاقاً.", source:"رواه الترمذي — حسن" },
  { type:"من الشمائل", text:"كان ﷺ يحب الأعمال التي يُداوَم عليها وإن قلّت.", source:"البخاري ومسلم" },
  { type:"حكمة نبوية",  text:"من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنة.", source:"رواه مسلم" },
  { type:"حديث شريف",   text:"لا يحل لمسلم أن يهجر أخاه فوق ثلاث.", source:"رواه البخاري" },
  { type:"دعاء مأثور",  text:"رب اشرح لي صدري، ويسّر لي أمري.", source:"القرآن الكريم — طه ٢٥-٢٦" },
  { type:"من الشمائل", text:"كان ﷺ إذا دخل بيته بدأ بالسواك.", source:"رواه مسلم" },
];

// ═══════════════════════════════════════════════════════════════
// 8. AUDIO SYSTEM
// ═══════════════════════════════════════════════════════════════
let currentStation = null;
const audio = new Audio();
audio.volume = 0.8;
audio.addEventListener('play',  () => updateMiniPlayer(true));
audio.addEventListener('pause', () => updateMiniPlayer(false));
audio.addEventListener('error', () => showToast('⚠️ تعذّر تشغيل المحطة، جاري المحاولة...'));

// ── Mini Player ─────────────────────────────────────────────
function showMiniPlayer(station) {
  const mp = document.getElementById('mini-player');
  if (!mp) return;
  document.getElementById('mp-name').textContent  = station.name;
  document.getElementById('mp-cat').textContent   = station.category;
  mp.classList.add('visible');
  document.body.style.paddingBottom = '72px';
}
function hideMiniPlayer() {
  const mp = document.getElementById('mini-player');
  if (!mp) return;
  mp.classList.remove('visible');
  document.body.style.paddingBottom = '';
}
function updateMiniPlayer(playing) {
  const btn = document.getElementById('mp-play-btn');
  if (btn) btn.innerHTML = playing ? '⏸' : '▶';
}

// ── Play a station ──────────────────────────────────────────
function playStation(s) {
  if (currentStation && currentStation.id === s.id) {
    togglePlay(); return;
  }
  currentStation = s;
  audio.src = s.radio_url;
  audio.play().catch(() => showToast('⚠️ تعذّر الاتصال بالمحطة'));
  showMiniPlayer(s);
  localStorage.setItem('seerah_last_station', JSON.stringify(s));
  renderStations(getFilteredStations());
}

function togglePlay() {
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}
function stopAudio() {
  audio.pause(); audio.src = '';
  currentStation = null;
  hideMiniPlayer();
  renderStations(getFilteredStations());
}
function setVolume(v) { audio.volume = v / 100; }

// ── Stations Render ─────────────────────────────────────────
function getFilteredStations() {
  const q   = (document.getElementById('stationSearch')?.value || '').trim().toLowerCase();
  const cat = document.getElementById('catFilter')?.value || '';
  return Stations.filter(s => {
    const mQ = !q   || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    const mC = !cat || s.category === cat;
    return mQ && mC;
  });
}
function filterStations() { renderStations(getFilteredStations()); }

function renderStations(list) {
  const grid = document.getElementById('stationsGrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = `<div style="color:rgba(255,255,255,0.45);text-align:center;padding:3rem;font-family:Tajawal,sans-serif;grid-column:1/-1;">لا توجد نتائج مطابقة</div>`;
    return;
  }
  grid.innerHTML = list.map(s => {
    const playing = currentStation && currentStation.id === s.id;
    const waveHTML = playing ? `<div class="wave-bars"><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div></div>` : `<div class="play-icon">▶</div>`;
    return `
      <div class="station-card ${playing ? 'playing' : ''}" id="sc-${s.id}" onclick="playStation(${JSON.stringify(s).replace(/"/g,"'")})">
        <div class="station-cat">${s.category}</div>
        <div class="station-name">${s.name}</div>
        <div class="station-play">
          ${waveHTML}
          <span>${playing ? 'جارٍ التشغيل...' : 'اضغط للاستماع'}</span>
        </div>
      </div>`;
  }).join('');
  if (typeof observeElements === 'function') {
    observeElements(grid.querySelectorAll('.station-card'));
  }
}

function buildStations() {
  const cats = [...new Set(Stations.map(s => s.category))].sort();
  const sel  = document.getElementById('catFilter');
  if (sel) {
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      sel.appendChild(opt);
    });
  }
  renderStations(Stations);
}

// ═══════════════════════════════════════════════════════════════
// 9. TIMELINE BUILDER
// ═══════════════════════════════════════════════════════════════
function buildTimeline() {
  const wrap = document.getElementById('timelineWrap');
  if (!wrap) return;

  // Group by era
  const eras = [...new Set(timelineData.map(t => t.era))];
  let html = '';
  let itemIdx = 0;

  eras.forEach(era => {
    html += `<div class="tl-phase-label">${era}</div>`;
    timelineData.filter(t => t.era === era).forEach((item, i) => {
      const isEven = (itemIdx % 2 === 1);
      html += `
        <div class="tl-item" style="transition-delay:${(i * 0.08).toFixed(2)}s">
          <div class="tl-card" onclick="this.classList.toggle('expanded'); const more = this.querySelector('.tl-more'); if(this.classList.contains('expanded')){more.innerHTML='إخفاء التفاصيل ↑'}else{more.innerHTML='اقرأ المزيد ←'}">
            <div class="tl-era">${item.era}</div>
            <div class="tl-year">${item.year}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <span class="tl-more">اقرأ المزيد ←</span>
            <div class="tl-details">${item.details}</div>
          </div>
          <div class="tl-dot">${item.icon}</div>
          <div class="tl-empty"></div>
        </div>`;
      itemIdx++;
    });
  });
  wrap.innerHTML = html;

  // Animate on scroll
  observeElements(wrap.querySelectorAll('.tl-item'));
}

// ═══════════════════════════════════════════════════════════════
// 10. GHAZAWAT BUILDER
// ═══════════════════════════════════════════════════════════════
function buildGhazawat() {
  const grid = document.getElementById('ghazawatGrid');
  if (!grid) return;
  grid.innerHTML = ghazawatData.map((g, i) => `
    <div class="ghaz-card" style="transition-delay:${(i * 0.08).toFixed(2)}s">
      <div class="ghaz-header">
        <div class="ghaz-num">${g.num}</div>
        <h3>${g.name}</h3>
        <div class="ghaz-date">📅 ${g.date}</div>
      </div>
      <div class="ghaz-body">
        <div class="ghaz-row">
          <div class="ghaz-lbl">السبب</div>
          <div class="ghaz-val">${g.reason}</div>
        </div>
        <div class="ghaz-row">
          <div class="ghaz-lbl">النتيجة</div>
          <div class="ghaz-val">${g.result}</div>
        </div>
      </div>
    </div>`).join('');
  observeElements(grid.querySelectorAll('.ghaz-card'));
}

// ═══════════════════════════════════════════════════════════════
// 11. SAHABA BUILDER
// ═══════════════════════════════════════════════════════════════
function buildSahaba() {
  const grid = document.getElementById('sahabaGrid');
  if (!grid) return;
  grid.innerHTML = sahabaData.map((s, i) => `
    <div class="sahabi-card" style="transition-delay:${(i * 0.06).toFixed(2)}s" onclick="openSahabiModal(${i})">
      <div class="sahabi-header">
        <div class="sahabi-avatar">${s.icon}</div>
        <div class="sahabi-title-ar">${s.name}</div>
        <div class="sahabi-nickname">${s.nickname}</div>
      </div>
      <div class="sahabi-body">
        <p class="sahabi-desc">${s.desc.substring(0, 120)}...</p>
        <span class="sahabi-badge">${s.badge}</span>
      </div>
    </div>`).join('');
  observeElements(grid.querySelectorAll('.sahabi-card'));
}

function openSahabiModal(idx) {
  const s = sahabaData[idx];
  const modal = document.getElementById('sahabi-modal');
  if (!modal) return;
  modal.querySelector('.modal-avatar').textContent  = s.icon;
  modal.querySelector('.modal-name').textContent    = s.name;
  modal.querySelector('.modal-nickname').textContent = s.nickname;
  modal.querySelector('.modal-desc').textContent    = s.desc;
  modal.querySelector('.modal-quote').textContent   = '«' + s.quote + '»';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSahabiModal() {
  const modal = document.getElementById('sahabi-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════════
// 12. SHAMAIL BUILDER
// ═══════════════════════════════════════════════════════════════
function buildShamail() {
  const grid = document.getElementById('shamailGrid');
  if (!grid) return;
  grid.innerHTML = shamailData.map((s, i) => `
    <div class="shamail-card" style="transition-delay:${(i * 0.06).toFixed(2)}s">
      <div class="shamail-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>`).join('');
  observeElements(grid.querySelectorAll('.shamail-card'));
}

// ═══════════════════════════════════════════════════════════════
// 13. HADITH BUILDER
// ═══════════════════════════════════════════════════════════════
function buildHadith() {
  const grid = document.getElementById('hadithGrid');
  if (!grid) return;
  grid.innerHTML = hadithData.map((h, i) => `
    <div class="hadith-card" style="transition-delay:${(i * 0.06).toFixed(2)}s">
      <div class="hadith-text">${h.text}</div>
      <div class="hadith-meta">
        <div class="hadith-rawi">رواه: ${h.rawi}</div>
        <div class="hadith-source">${h.source}</div>
      </div>
    </div>`).join('');
  observeElements(grid.querySelectorAll('.hadith-card'));
}

// ═══════════════════════════════════════════════════════════════
// 14. DAILY WISDOM
// ═══════════════════════════════════════════════════════════════
let dailyIdx = new Date().getDate() % dailyItems.length;
function loadDaily(next = false) {
  if (next) dailyIdx = (dailyIdx + 1) % dailyItems.length;
  const item = dailyItems[dailyIdx];
  const typeEl = document.getElementById('dailyType');
  const textEl = document.getElementById('dailyText');
  const srcEl  = document.getElementById('dailySource');
  if (!typeEl) return;
  typeEl.style.opacity = '0';
  textEl.style.opacity = '0';
  setTimeout(() => {
    typeEl.textContent = item.type;
    textEl.textContent = item.text;
    if (srcEl) srcEl.textContent = '— ' + item.source;
    typeEl.style.transition = 'opacity 0.5s';
    textEl.style.transition = 'opacity 0.5s';
    typeEl.style.opacity = '1';
    textEl.style.opacity = '1';
  }, 300);
}
function shareDaily() {
  const item = dailyItems[dailyIdx];
  const text = `${item.type}\n\n"${item.text}"\n\n${item.source}\n\n— منصة السيرة النبوية الشريفة`;
  if (navigator.share) {
    navigator.share({ title: 'حكمة من السيرة', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('✅ تم نسخ الحكمة'));
  }
}

// ═══════════════════════════════════════════════════════════════
// 15. SMART SEARCH
// ═══════════════════════════════════════════════════════════════
const searchableData = [
  ...timelineData.map(t  => ({ type:'سيرة',    text: t.title + ' ' + t.desc,   section:'timeline' })),
  ...ghazawatData.map(g  => ({ type:'غزوة',    text: g.name + ' ' + g.reason + ' ' + g.result, section:'ghazawat' })),
  ...sahabaData.map(s    => ({ type:'صحابي',   text: s.name + ' ' + s.nickname + ' ' + s.desc, section:'sahaba'   })),
  ...hadithData.map(h    => ({ type:'حديث',    text: h.text + ' ' + h.rawi,    section:'hadith'   })),
  ...shamailData.map(s   => ({ type:'شمائل',   text: s.title + ' ' + s.desc,   section:'shamail'  })),
  ...Stations.map(s      => ({ type:'محطة',    text: s.name + ' ' + s.category, section:'listen', station:s })),
  ...dailyItems.map(d    => ({ type:'حكمة',    text: d.type + ' ' + d.text,     section:'daily'    })),
];

function doSearch(q) {
  const res = document.getElementById('searchResults');
  if (!res) return;
  if (!q.trim()) { res.innerHTML = ''; return; }
  const q_lower = q.trim().toLowerCase();
  const matches = searchableData
    .filter(d => d.text.includes(q.trim()) || d.text.toLowerCase().includes(q_lower))
    .slice(0, 12);
  if (!matches.length) {
    res.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:3rem;font-family:Tajawal,sans-serif;">لا توجد نتائج مطابقة لـ «${q}»</div>`;
    return;
  }
  res.innerHTML = matches.map((m, i) => {
    const highlighted = m.text.replace(
      new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      match => `<mark>${match}</mark>`
    );
    const onclick = m.station
      ? `onclick="playStation(${JSON.stringify(m.station).replace(/"/g,"'")}); goTo('listen')"`
      : `onclick="goTo('${m.section}')"`;
    return `
      <div class="result-item" style="transition-delay:${i*0.04}s;animation-delay:${i*0.04}s;cursor:pointer" ${onclick}>
        <div class="result-type">${m.type}</div>
        <div class="result-text">${highlighted.substring(0, 180)}${highlighted.length > 180 ? '...' : ''}</div>
      </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// 16. NAVIGATION HELPERS
// ═══════════════════════════════════════════════════════════════
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 68;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  document.getElementById('navLinks')?.classList.remove('open');
  document.querySelector('.nav-toggle')?.classList.remove('active');
}
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
  document.querySelector('.nav-toggle')?.classList.toggle('active');
}

// ═══════════════════════════════════════════════════════════════
// 17. WELCOME OVERLAY
// ═══════════════════════════════════════════════════════════════
const fullText = "مرحبًا بك في رحلتك عبر السيرة النبوية الشريفة ﷺ";
let charIdx = 0;
function typeWelcome() {
  const el = document.getElementById('welcomeTyping');
  if (!el) return;
  if (charIdx < fullText.length) {
    el.textContent += fullText[charIdx++];
    setTimeout(typeWelcome, 45);
  } else {
    document.getElementById('welcomeBtn')?.classList.add('show');
  }
}
function closeWelcome() {
  localStorage.setItem('seerah_v3_welcomed', '1');
  const overlay = document.getElementById('welcomeOverlay');
  if (overlay) { overlay.classList.add('hidden'); }
}
const wasWelcomed = localStorage.getItem('seerah_v3_welcomed');
if (wasWelcomed) {
  const ov = document.getElementById('welcomeOverlay');
  if (ov) ov.style.display = 'none';
} else {
  setTimeout(typeWelcome, 900);
}

// ═══════════════════════════════════════════════════════════════
// 18. INTERSECTION OBSERVER (scroll animations)
// ═══════════════════════════════════════════════════════════════
function observeElements(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ─── Reveal all .reveal elements ─────────────────────────────
function setupRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(r => obs.observe(r));
}

// ═══════════════════════════════════════════════════════════════
// 19. TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════════
function showToast(msg, icon = '📢') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ═══════════════════════════════════════════════════════════════
// 20. READING PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
function setupProgressBar() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? (window.scrollY / docH) : 0;
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 21. BACK TO TOP
// ═══════════════════════════════════════════════════════════════
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ═══════════════════════════════════════════════════════════════
// 22. ACTIVE NAV LINKS (on scroll)
// ═══════════════════════════════════════════════════════════════
function setupActiveNav() {
  const sections = ['hero','timeline','listen','ghazawat','sahaba','shamail','hadith','daily','search-sec'];
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.scrollY >= el.offsetTop - 120) current = id;
    });
    links.forEach(a => {
      const onclick = a.getAttribute('onclick') || '';
      a.classList.toggle('active', onclick.includes(`'${current}'`));
    });
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 23. NAV SCROLL BEHAVIOR
// ═══════════════════════════════════════════════════════════════
function setupNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 24. INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildTimeline();
  buildStations();
  buildGhazawat();
  buildSahaba();
  buildShamail();
  buildHadith();
  loadDaily();
  setupProgressBar();
  setupBackToTop();
  setupActiveNav();
  setupNavScroll();
  setupRevealObserver();

  // Close modal on backdrop click
  document.getElementById('sahabi-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeSahabiModal();
  });

  // Restore last station info
  const last = localStorage.getItem('seerah_last_station');
  if (last) {
    try {
      const s = JSON.parse(last);
      showToast(`آخر استماع: ${s.name}`, '🎙️');
    } catch(e) {}
  }
});
