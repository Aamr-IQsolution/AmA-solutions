/**
 * يحتوي هذا الملف على القيم الثابتة والإعدادات الأولية للموقع.
 */
import { SiteConfig, Language } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  siteName: "AmA-DigitAdmiral",
  logo: "https://i.ibb.co/hxD60pRY/logo-cercle-no-background.png",
  contactEmail: "Aamr.alawad@gmail.com",
  phone: "+123456789",
  socials: [
    { id: '1', platform: 'Instagram', icon: 'fa-instagram', link: 'https://instagram.com' },
    { id: '2', platform: 'Facebook', icon: 'fa-facebook', link: 'https://facebook.com' },
    { id: '3', platform: 'LinkedIn', icon: 'fa-linkedin', link: 'https://linkedin.com' },
    { id: '4', platform: 'GitHub', icon: 'fa-github', link: 'https://github.com' },
  ],
  hero: {
    en: { title: "Connect. Create. Engage.", subtitle: "Professional Web Design & Social Media Marketing Experts in the Netherlands." },
    ar: { title: "تواصل. ابتكار. تفاعل.", subtitle: "خبراء تصميم المواقع المتميزين وخدمات التسويق الرقمي المتكاملة في هولندا." },
    nl: { title: "Verbind. Creëer. Betrek.", subtitle: "Professionele Webdesign & Social Media Marketing Experts in Nederland." }
  },
  servicesHeader: {
    en: { title: "Our Specialized Services", highlight: "Specialized" },
    ar: { title: "خدماتنا المتخصصة", highlight: "المتخصصة" },
    nl: { title: "Onze Gespecialiseerde Diensten", highlight: "Gespecialiseerde" }
  },
  portfolioHeader: {
    en: { title: "Our Featured Masterpieces", highlight: "Featured", description: "Explore some of our latest digital transformations and success stories." },
    ar: { title: "روائع أعمالنا المختارة", highlight: "المختارة", description: "استكشف بعضًا من أحدث التحولات الرقمية وقصص النجاح لدينا." },
    nl: { title: "Onze Uitgelichte Meesterwerken", highlight: "Uitgelichte", description: "Ontdek enkele van onze nieuwste digital transformaties en success verhalen." }
  },
  pricingHeader: {
    en: { title: "Social Media Packages", highlight: "Packages", description: "Strategic marketing plans tailored for the Dutch market growth." },
    ar: { title: "باقات السوشيال ميديا", highlight: "باقات", description: "خطط تسويقية استراتيجية مصممة لنمو أعمالك في السوق الهولندي." },
    nl: { title: "Social Media Pakketten", highlight: "Pakketten", description: "Strategische marketingplannen op maat voor de Nederlandse markt." }
  },
  webPricingHeader: {
    en: { title: "Web Design Pricing", highlight: "Web Design", description: "Professional high-end development for modern businesses." },
    ar: { title: "أسعار تصميم المواقع", highlight: "تصميم المواقع", description: "تطوير احترافي وحلول ذكية للشركات العصرية بأسعار تنافسية." },
    nl: { title: "Webdesign Prijzen", highlight: "Webdesign", description: "Professionele hoogwaardige ontwikkeling voor moderne bedrijven." }
  },
  footer: {
    en: { copyright: "All rights reserved", credits: "Designed & Developed by Expert Programming Team" },
    ar: { copyright: "جميع الحقوق محفوظة", credits: "تصميم وتطوير فريق البرمجة الخبير" },
    nl: { copyright: "Alle rechten voorbehouden", credits: "Ontworpen en ontwikkeld door Expert Programming Team" }
  },
  services: [
    {
      id: "1",
      icon: "fa-laptop-code",
      translations: {
        en: { 
          name: "Custom Web Development", 
          description: "Tailor-made digital experiences built with the latest technologies.",
          expertDetails: "We specialize in high-performance web applications using React, Next.js, and Python backends. Our architecture ensures scalability, top-tier security, and ultra-fast loading times optimized for global users."
        },
        ar: { 
          name: "تطوير مواقع مخصص", 
          description: "تجارب رقمية مصممة خصيصاً باستخدام أحدث التقنيات العالمية.",
          expertDetails: "نحن متخصصون في بناء تطبيقات الويب عالية الأداء باستخدام تقنيات React و Next.js مع خلفيات برمجية قوية بلغة Python. تضمن بنيتنا التحتية القابلة للتوسع أماناً فائقاً وسرعة تحميل استثنائية."
        },
        nl: { 
          name: "Maatwerk Webontwikkeling", 
          description: "Op maat gemaakte digitale ervaringen gebouwd met de nieuwste technologieën.",
          expertDetails: "Wij zijn gespecialiseerd in krachtige webapplicaties met React, Next.js en Python backends. Onze architectuur garandeert schaalbaarheid, topbeveiliging en ultrasnelle laadtijden."
        }
      }
    },
    {
      id: "2",
      icon: "fa-bullseye",
      translations: {
        en: { 
          name: "Strategic Social Media", 
          description: "Data-driven marketing strategies to elevate your brand presence.",
          expertDetails: "Our marketing approach involves deep audience analysis and algorithmic optimization. We manage paid campaigns across Meta, LinkedIn, and TikTok with a focus on ROI, brand authority, and high engagement rates."
        },
        ar: { 
          name: "استراتيجيات السوشيال ميديا", 
          description: "استراتيجيات تسويقية قائمة على البيانات لتعزيز حضور علامتك التجارية.",
          expertDetails: "يتضمن نهجنا التسويقي تحليلاً عميقاً للجمهور وتحسيناً خوارزمياً مستمراً. ندير حملات مدفوعة على Meta و LinkedIn و TikTok مع التركيز التام على العائد على الاستثمار وقوة العلامة التجارية."
        },
        nl: { 
          name: "Strategische Social Media", 
          description: "Data-gedreven marketingstrategieën om uw merkaanwezigheid te vergroten.",
          expertDetails: "Onze marketingaanpak omvat diepgaande doelgroepanalyse en algoritmische optimalisatie. Wij beheren betaalde campagnes op Meta, LinkedIn en TikTok met een focus op ROI."
        }
      }
    },
    {
      id: "3",
      icon: "fa-film",
      translations: {
        en: { 
          name: "Professional Ad Videos + Photos", 
          description: "Professional video creation and editing, and photo design and editing.",
          expertDetails: "We create and edit videos professionally for content creators and design professional, SEO-friendly images with the best quality standards suitable for each platform."
        },
        ar: { 
          name: "فيدوهات إعلانية إحترافية+ صور", 
          description: "إنشاء وتعديل مقاطع الفيديو بشكل إحترافي وتصميم وتعديل الصور",
          expertDetails: "نقوم بإنشاء وتعديل الفيدوهات بشكل إحترافي لصناع المحتوى وتصميم صور إحترافية صديقة لمحركات البحث بأفضل معايير الجودة المناسبة لكل منصة."
        },
        nl: { 
          name: "Professionele Advertentievideo's + Foto's", 
          description: "Professionele video creatie en bewerking, en foto ontwerp en bewerking.",
          expertDetails: "We creëren en bewerken professioneel video's voor content creators en ontwerpen professionele, SEO-vriendelijke afbeeldingen met de beste kwaliteitsnormen die geschikt zijn voor elk platform."
        }
      }
    },
    {
      id: "4",
      icon: "fa-cart-shopping",
      translations: {
        en: { 
          name: "E-Commerce Excellence", 
          description: "Robust online stores designed to convert visitors into loyal customers.",
          expertDetails: "We build conversion-centric e-commerce platforms. From custom Shopify themes to headless commerce solutions, we integrate seamless payment gateways and automated inventory management for a hassle-free operation."
        },
        ar: { 
          name: "التميز في التجارة الإلكترونية", 
          description: "متاجر إلكترونية قوية مصممة لتحويل الزوار إلى عملاء دائمين.",
          expertDetails: "نقوم ببناء منصات تجارة إلكترونية تركز على التحويل. من قوالب Shopify المخصصة إلى حلول التجارة المنفصلة (Headless)، ندمج بوابات دفع سلسة وأنظمة إدارة مخزون مؤتمتة لعملية بيع خالية من المتاعب."
        },
        nl: { 
          name: "E-Commerce Uitmuntendheid", 
          description: "Robuuste online winkels ontworpen om bezoekers om te zetten in loyale klanten.",
          expertDetails: "Wij bouwen conversiegerichte e-commerce platforms. Van aangepaste Shopify-thema's tot headless commerce oplossingen met naadloze betalingsgateways."
        }
      }
    },
    {
      id: "5",
      icon: "fa-pen-nib",
      translations: {
        en: { 
          name: "Brand Visual Identity", 
          description: "Crafting iconic visual languages that tell your unique brand story.",
          expertDetails: "Visual identity is more than a logo; it's a system. We define typography, color theory, and UI component libraries that ensure brand consistency across all digital and physical touchpoints."
        },
        ar: { 
          name: "الهوية البصرية للعلامة", 
          description: "صياغة لغات بصرية أيقونية تروي قصة علامتك التجارية الفريدة.",
          expertDetails: "الهوية البصرية هي أكثر من مجرد شعار؛ إنها نظام متكامل. نحدد الخطوط، نظرية الألوان، ومكتبات مكونات واجهة المستخدم التي تضمن تناسق العلامة التجارية عبر كافة المنصات الرقمية والواقعية."
        },
        nl: { 
          name: "Visuele Merkidentiteit", 
          description: "Iconische visuele talen creëren die uw unieke merkverhaal vertellen.",
          expertDetails: "Visuele identiteit is meer dan een logo. We definiëren typografie, kleurtheorie en UI-componentbibliotheken die merkconsistentie garanderen."
        }
      }
    },
    {
      id: "6",
      icon: "fa-rocket",
      translations: {
        en: { 
          name: "Growth & Scaling", 
          description: "Turbocharge your business growth with our automation and scaling tools.",
          expertDetails: "We implement automation pipelines and AI-driven tools to scale your operations. Our growth hacking strategies are backed by A/B testing and behavioral analytics to ensure every marketing euro is maximized."
        },
        ar: { 
          name: "النمو والتوسع الرقمي", 
          description: "عزز نمو عملك من خلال أدوات الأتمتة والتوسع التي نوفرها.",
          expertDetails: "نطبق خطوط إنتاج مؤتمتة وأدوات مدعومة بالذكاء الاصطناعي لتوسيع عملياتك. استراتيجياتنا للنمو مدعومة باختبارات A/B وتحليلات سلوكية لضمان تحقيق أقصى استفادة من كل ميزانية تسويقية."
        },
        nl: { 
          name: "Groei & Schaling", 
          description: "Geef uw bedrijfsgroei een boost met onze automatiseringstools.",
          expertDetails: "Wij implementeren automatiseringspipelines en AI-gestuurde tools. Onze groei-strategieën worden ondersteund door A/B-testen en gedragsanalyses."
        }
      }
    }
  ],
  portfolio: [
    {
      id: "p1",
      image: "https://picsum.photos/600/400?random=11",
      category: "E-Commerce",
      link: "https://google.com",
      translations: {
        en: { title: "Modern Fashion Hub", description: "A sleek, dark-themed online store." },
        ar: { title: "مركز أزياء عصري", description: "متجر إلكتروني أنيق بطابع عصري داكن." },
        nl: { title: "Moderne Mode Hub", description: "Een strakke online winkel met een donker thema." }
      }
    },
    {
      id: "p2",
      image: "https://i.ibb.co/PvfL3nSr/Logo-Tasneem-Min-round-no-background.png",
      category: "Social Media",
      link: "https://www.facebook.com/profile.php?id=61583301257685",
      translations: {
        en: { title: "Tasneem", description: "Content management, design, advertising campaigns." },
        ar: { title: "بقالة تسنييم", description: "إدارة محتوى, تصميم , حملات إعلانية." },
        nl: { title: "Tasneem", description: "Contentbeheer, ontwerp, advertentiecampagnes." }
      }
    }
  ],
  plans: [
    {
      id: "sm-1",
      price: 349,
      isPopular: false,
      translations: {
        en: { name: "Starter Ads", buttonText: "Order Now", features: ["1 Social Channel", "Content Management", "4 Posts Monthly", "Ad Account Setup Creation", "Visual Identity/Logo/Colors Creation +€50"] },
        ar: { name: "الباقة الأساسية", buttonText: "اطلب الآن", features: ["منصة تواصل واحدة", "إدارة المحتوى", "4 منشورات شهرياً", "إنشاء إعدادات الحساب الإعلاني", "إنشاء هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Starter Pakket", buttonText: "Nu Bestellen", features: ["1 Social Media Kanaal", "Contentbeheer", "4 Berichten p/m", "Advertentieaccount Aanmaken", "Visuele Identiteit/Logo/Kleuren Creatie +€50"] }
      }
    },
    {
      id: "sm-2",
      price: 649,
      isPopular: true,
      translations: {
        en: { name: "Grow Plan", buttonText: "Order Now", features: ["2 Social Channels", "6 Posts Monthly", "Create 1 Ad Campaign Monthly", "Ad Campaign Management", "Create 1 Professional Video Monthly", "Create 4 Stories Monthly", "Visual Identity/Logo/Colors +€50"] },
        ar: { name: "باقة النمو", buttonText: "اطلب الآن", features: ["منصتي تواصل", "6 منشورات شهرياً", "إنشاء حملة إعلانية شهرياً", "إدارة الحملات الإعلانية", "إنشاء 1 فيديو إحترافي شهرياً", "إنشاء 4 ستوري شهرياً", "هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Groei Pakket", buttonText: "Nu Bestellen", features: ["2 Social Kanalen", "6 Berichten p/m", "Maak 1 advertentiecampagne per maand", "Advertentiecampagnebeheer", "Maak 1 professionele video per maand", "Maak 4 stories per maand", "Visuele identiteit/logo/kleuren +€50"] }
      }
    },
    {
      id: "sm-3",
      price: 999,
      isPopular: false,
      translations: {
        en: { name: "Pro Plan", buttonText: "Order Now", features: ["3 Social Channels", "8 Posts Monthly", "Full Advertising Strategy", "Audience Analysis Management", "Create 2 Videos Monthly", "Create 6 Stories Monthly", "Visual Identity/Logo/Colors +€50"] },
        ar: { name: "باقة الاحتراف", buttonText: "اطلب الآن", features: ["3 منصات تواصل", "8 منشورات شهرياً", "إستراتيجية إعلانية كاملة", "إنشاء وإدارة تحليل للجمهور", "إنشاء 2 فيديو شهرياً", "إنشاء 6 ستوري شهرياً", "هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Pro Pakket", buttonText: "Nu Bestellen", features: ["3 Social Kanalen", "8 Berichten p/m", "Volledige advertentiestrategie", "Beheer van doelgroepanalyse", "Maak 2 video's per maand", "Maak 6 stories per maand", "Visuele identiteit/logo/kleuren +€50"] }
      }
    },
    {
      id: "sm-4",
      price: 1899,
      isPopular: false,
      translations: {
        en: { name: "Elite Scale", buttonText: "Order Now", features: ["Multi-Channel Ads", "Video Content", "Weekly Analytics", "Priority Support"] },
        ar: { name: "باقة النخبة", buttonText: "اطلب الآن", features: ["إعلانات متعددة المنصات", "صناعة محتوى فيديو", "تحليلات أسبوعية", "دعم فني ذو أولوية"] },
        nl: { name: "Elite Pakket", buttonText: "Nu Bestellen", features: ["Multi-Channel Ads", "Video Content", "Wekelijkse Analytics", "Priority Support"] }
      }
    }
  ],
  webPlans: [
    {
      id: "web-1",
      price: 899,
      isPopular: false,
      translations: {
        en: { name: "Landing Page", buttonText: "Start Project", features: ["Professional Design", "Mobile Friendly", "Contact Form", "SEO Ready"] },
        ar: { name: "صفحة أساسية", buttonText: "ابدأ مشروعك", features: ["تصميم احترافي", "متوافق مع الجوال", "نموذج تواصل", "تحسين محركات البحث"] },
        nl: { name: "Landingspagina", buttonText: "Project Starten", features: ["Professioneel Design", "Mobielvriendelijk", "Contactformulier", "SEO Klaar"] }
      }
    },
    {
      id: "web-2",
      price: 1799,
      isPopular: true,
      translations: {
        en: { name: "Business Pro", buttonText: "Start Project", features: ["5-8 Pages", "Admin Dashboard", "Multilingual Support", "High Speed"] },
        ar: { name: "باقة الأعمال", buttonText: "ابدأ مشروعك", features: ["5-8 صفحات", "لوحة تحكم كاملة", "دعم لغات متعددة", "سرعة عالية جداً"] },
        nl: { name: "Business Pro", buttonText: "Project Starten", features: ["5-8 Pagina's", "Admin Dashboard", "Meertalige Ondersteuning", "Hoge Snelheid"] }
      }
    },
    {
      id: "web-3",
      price: 3499,
      isPopular: false,
      translations: {
        en: { name: "E-Commerce", buttonText: "Start Project", features: ["Full Online Store", "Payment Gateway", "Inventory System", "Automated Emails"] },
        ar: { name: "متجر إلكتروني", buttonText: "ابدأ مشروعك", features: ["متجر أونلاين كامل", "بوابة دفع إلكتروني", "نظام إدارة مخزون", "رسائل تلقائية"] },
        nl: { name: "E-Commerce", buttonText: "Project Starten", features: ["Volledige Webshop", "Betalingssysteem", "Voorraadbeheer", "Geautomatiseerde Emails"] }
      }
    }
  ]
};

export const UI_TEXTS = {
  en: {
    home: "Home",
    services: "Services",
    portfolio: "Works",
    prices: "Pricing",
    webPrices: "Web Development",
    contact: "Contact Us",
    admin: "Dashboard",
    login: "Login",
    logout: "Exit",
    save: "Save Changes",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    settings: "Settings",
    dashboard: "Stats",
    users: "Team Management",
    currency: "€",
    adminPanel: "Admin Panel",
    visuals: "Visuals",
    general: "General",
    addService: "Add Service",
    addProject: "Add Project",
    addPlan: "Add Plan",
    confirmDelete: "Are you sure you want to delete?",
    cancel: "Cancel",
    yesDelete: "Yes, Delete",
    siteName: "Site Name",
    logoUrl: "Logo URL",
    email: "Email",
    whatsapp: "WhatsApp",
    category: "Category",
    imageUrl: "Image URL",
    projectLink: "Project Link (Optional)",
    username: "Username",
    role: "Role",
    status: "Status",
    actions: "Actions",
    selectLang: "Language",
    addUser: "Add Member",
    owner: "Owner",
    adminRole: "Administrator",
    moderator: "Moderator",
    permissions: "Permissions",
    active: "Active",
    inactive: "Suspended",
    features: "Features (One per line)",
    buttonText: "Button Text",
    isPopular: "Mark as Popular",
    planName: "Plan Name",
    sectionTitles: "Section Headers",
    mainTitle: "Main Title",
    highlightWord: "Highlight Word",
    description: "Description",
    tooManyAttempts: "Too many failed attempts. Access blocked.",
    tryAgainIn: "Please try again after",
    minutes: "minutes",
    footerSettings: "Footer Settings",
    copyrightText: "Copyright Text",
    creditsText: "Credits/Developed By",
    socials: "Social Media",
    platform: "Platform",
    icon: "Icon Class",
    link: "URL Link",
    addSocial: "Add Channel",
    expertDetails: "Expert Deep Explanation"
  },
  ar: {
    home: "الرئيسية",
    services: "خدماتنا",
    portfolio: "أعمالنا",
    prices: "أسعار التسويق",
    webPrices: "أسعار المواقع",
    contact: "تواصل معنا",
    admin: "لوحة التحكم",
    login: "تسجيل الدخول",
    logout: "خروج",
    save: "حفظ التغييرات",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    settings: "الإعدادات",
    dashboard: "الإحصائيات",
    users: "إدارة الفريق",
    currency: "€",
    adminPanel: "لوحة التحكم",
    visuals: "المظهر",
    general: "عام",
    addService: "إضافة خدمة",
    addProject: "إضافة مشروع",
    addPlan: "إضافة باقة",
    confirmDelete: "هل أنت متأكد من الحذف؟",
    cancel: "إلغاء",
    yesDelete: "نعم، احذف",
    siteName: "اسم الموقع",
    logoUrl: "رابط الشعار",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    category: "الفئة",
    imageUrl: "رابط الصورة",
    projectLink: "رابط المشروع (اختياري)",
    username: "اسم المستخدم",
    role: "الدور",
    status: "الحالة",
    actions: "الإجراءات",
    selectLang: "اللغة",
    addUser: "إضافة عضو",
    owner: "مالك",
    adminRole: "مدير",
    moderator: "مشرف",
    permissions: "الصلاحيات",
    active: "نشط",
    inactive: "معطل",
    features: "المميزات (ميزة في كل سطر)",
    buttonText: "نص الزر",
    isPopular: "تمييز كباقة رائجة",
    planName: "اسم الباقة",
    sectionTitles: "عناوين الأقسام",
    mainTitle: "العنوان الرئيسي",
    highlightWord: "الكلمة المميزة",
    description: "الوصف",
    tooManyAttempts: "محاولات دخول فاشلة كثيرة. تم حظر الدخول مؤقتاً.",
    tryAgainIn: "يرجى المحاولة مرة أخرى بعد",
    minutes: "دقيقة",
    footerSettings: "إعدادات التذييل",
    copyrightText: "نص حقوق الملكية",
    creditsText: "نص الحقوق البرمجية (تطوير)",
    socials: "وسائل التواصل الاجتماعي",
    platform: "اسم المنصة",
    icon: "كود الأيقونة (fontawesome)",
    link: "الرابط",
    addSocial: "إضافة قناة تواصل",
    expertDetails: "شرح الخبراء المعمق"
  },
  nl: {
    home: "Home",
    services: "Diensten",
    portfolio: "Werken",
    prices: "Marketing Prijzen",
    webPrices: "Web Prijzen",
    contact: "Contact",
    admin: "Beheer",
    login: "Inloggen",
    logout: "Uitloggen",
    save: "Wijzigingen opslaan",
    edit: "Bewerken",
    delete: "Verwijderen",
    add: "Toevoegen",
    settings: "Instellingen",
    dashboard: "Dashboard",
    users: "Team Management",
    currency: "€",
    adminPanel: "Beheerderspaneel",
    visuals: "Visueel",
    general: "Algemeen",
    addService: "Dienst toevoegen",
    addProject: "Project toevoegen",
    addPlan: "Plan toevoegen",
    confirmDelete: "Weet u zeker dat u wilt verwijderen?",
    cancel: "Annuleren",
    yesDelete: "Ja, Verwijderen",
    siteName: "Site naam",
    logoUrl: "Logo URL",
    email: "E-mail",
    whatsapp: "WhatsApp",
    category: "Categorie",
    imageUrl: "Afbeeldings-URL",
    projectLink: "Projectlink (Optioneel)",
    username: "Gebruikersnaam",
    role: "Rol",
    status: "Status",
    actions: "Acties",
    selectLang: "Taal",
    addUser: "Lid Toevoegen",
    owner: "Eigenaar",
    adminRole: "Beheerder",
    moderator: "Moderator",
    permissions: "Machtigingen",
    active: "Actief",
    inactive: "Geschorst",
    features: "Functies (één per regel)",
    buttonText: "Knoptekst",
    isPopular: "Markeer als populair",
    planName: "Plannaam",
    sectionTitles: "Sectiekoppen",
    mainTitle: "Hoofdtitel",
    highlightWord: "Markeer Woord",
    description: "Beschrijving",
    tooManyAttempts: "Te veel mislukte pogingen. Toegang geblokkeerd.",
    tryAgainIn: "Probeer het opnieuw na",
    minutes: "minuten",
    footerSettings: "Footer Instellingen",
    copyrightText: "Copyright Tekst",
    creditsText: "Credits Tekst",
    socials: "Sociale Media",
    platform: "Platform",
    icon: "Icoonklasse",
    link: "Link",
    addSocial: "Kanaal Toevoegen",
    expertDetails: "Expert Diepgaande Uitleg"
  }
};