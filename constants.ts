/**
 * يحتوي هذا الملف على القيم الثابتة والإعدادات الأولية للموقع.
 */
import { SiteConfig, Language } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  siteName: "AxonXcode",
  logo: "/assets/simple-logo-X-decoreted-no-background.png",
  brandXImage: "/assets/axon-x-letter.png",
  contactEmail: "Aamr.alawad@gmail.com",
  phone: "+31685582647",
  socials: [
    { id: '1', platform: 'Instagram', icon: 'fa-instagram', link: 'https://instagram.com' },
    { id: '2', platform: 'Facebook', icon: 'fa-facebook', link: 'https://www.facebook.com/profile.php?id=61587772950053' },
    { id: '3', platform: 'LinkedIn', icon: 'fa-linkedin', link: 'https://www.linkedin.com/in/aamr-alawad-35444b361' },
    { id: '4', platform: 'GitHub', icon: 'fa-github', link: 'https://github.com/Aamr-IQsolution' },
  ],
  hero: {
    en: { 
      title: "Connect. Create. Engage.", 
      subtitle: '"axonXcode: We turn digital visions into tangible reality." We specialize in building smartphone applications and websites that combine programming intelligence (Axon) and precision in execution (Xcode).' 
    },
    ar: { 
      title: "تواصل. ابتكار. تفاعل.", 
      subtitle: '"axonXcode: نحول الرؤى الرقمية إلى واقع ملموس." نحن متخصصون في بناء تطبيقات الهواتف الذكية والمواقع الإلكترونية التي تجمع بين الذكاء البرمجي (Axon) والدقة في التنفيذ (Xcode).' 
    },
    nl: { 
      title: "Verbind. Creëer. Betrek.", 
      subtitle: '"axonXcode: Wij zetten digitale visies om in tastbare realiteit." Wij zijn gespecialiseerd in het bouwen van smartphoneapplicaties en websites die programmeerintelligentie (Axon) en precisie in uitvoering (Xcode) combineren.' 
    }
  },
  stats: {
    projects: 4,
    clients: 15,
    translations: {
      en: { projectsLabel: "Projects delivered", clientsLabel: "Happy clients" },
      ar: { projectsLabel: "مشاريع منجزة", clientsLabel: "عملاء راضون" },
      nl: { projectsLabel: "Projecten", clientsLabel: "Tevreden klanten" },
    },
  },
  testimonials: [
    {
      initials: "JD",
      image: "/assets/arabic-rounded-400.png",
      translations: {
        en: {
          name: "Jan de Vries",
          role: "Owner, De Vries Handel",
          quote: "Excellent service and professional work. Our new website increased online sales by 40%!",
        },
        ar: {
          name: "Jan de Vries",
          role: "مالك، De Vries Handel",
          quote: "خدمة ممتازة وعمل احترافي. موقعنا الجديد زاد مبيعاتنا عبر الإنترنت بنسبة 40٪!",
        },
        nl: {
          name: "Jan de Vries",
          role: "Eigenaar, De Vries Handel",
          quote: "Uitstekende service en professioneel werk. Onze nieuwe website heeft onze online verkoop met 40% verhoogd!",
        },
      },
    },
    {
      initials: "MB",
      image: "/assets/Maria-Bakker-rounded-400.png",
      translations: {
        en: {
          name: "Maria Bakker",
          role: "Marketing Manager",
          quote: "Very happy with their social media campaigns. Our reach tripled in just 3 months!",
        },
        ar: {
          name: "Maria Bakker",
          role: "مديرة تسويق",
          quote: "سعيدة جداً بحملات التواصل الاجتماعي. تضاعف وصولنا ثلاث مرات في 3 أشهر فقط!",
        },
        nl: {
          name: "Maria Bakker",
          role: "Marketing Manager",
          quote: "Zeer tevreden met hun social media campagnes. Ons bereik is verdriedubbeld in slechts 3 maanden!",
        },
      },
    },
    {
      initials: "PJ",
      image: "/assets/Pieter-Jansen-rounded-400.png",
      translations: {
        en: {
          name: "Pieter Jansen",
          role: "CEO, TechStart NL",
          quote: "A professional team with great technical expertise. They delivered our business app perfectly.",
        },
        ar: {
          name: "Pieter Jansen",
          role: "الرئيس التنفيذي، TechStart NL",
          quote: "فريق محترف بخبرة تقنية رائعة. سلّموا تطبيق عملنا بشكل مثالي.",
        },
        nl: {
          name: "Pieter Jansen",
          role: "CEO, TechStart NL",
          quote: "Professioneel team met geweldige technische expertise. Ze hebben onze bedrijfsapp perfect opgeleverd.",
        },
      },
    },
  ],
  faqs: [
    {
      translations: {
        en: {
          question: "How long does a web project take?",
          answer: "A standard website takes 4–6 weeks, depending on complexity and features.",
        },
        ar: {
          question: "كم يستغرق مشروع ويب؟",
          answer: "الموقع القياسي يستغرق 4–6 أسابيع حسب التعقيد والميزات.",
        },
        nl: {
          question: "Hoe lang duurt een webproject?",
          answer: "Een standaard website neemt 4-6 weken in beslag, afhankelijk van de complexiteit en functionaliteiten.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Which technologies do you use?",
          answer: "We work with modern tech like React, Next.js, Python, and cloud platforms for best performance.",
        },
        ar: {
          question: "ما التقنيات التي تستخدمونها؟",
          answer: "نعمل بتقنيات حديثة مثل React وNext.js وPython ومنصات سحابية لأفضل أداء.",
        },
        nl: {
          question: "Welke technologieën gebruiken jullie?",
          answer: "Wij werken met moderne tech zoals React, Next.js, Python en cloud platforms voor optimale prestaties.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Do you offer maintenance after launch?",
          answer: "Yes—we offer maintenance plans for updates, security, and technical support.",
        },
        ar: {
          question: "هل تقدمون صيانة بعد التسليم؟",
          answer: "نعم، لدينا خطط صيانة للتحديثات والأمان والدعم الفني.",
        },
        nl: {
          question: "Bieden jullie onderhoud na oplevering?",
          answer: "Ja, wij bieden verschillende onderhoudsplannen aan voor updates, beveiliging en technische ondersteuning.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Can you improve my existing website?",
          answer: "Absolutely—we can analyze and optimize your site for performance and user experience.",
        },
        ar: {
          question: "هل يمكن تحسين موقعي الحالي؟",
          answer: "بالطبع—نحلل ونحسن موقعك للأداء وتجربة المستخدم.",
        },
        nl: {
          question: "Kunnen jullie mijn bestaande website verbeteren?",
          answer: "Absoluut! Wij kunnen uw huidige website analyseren en optimaliseren voor betere prestaties en gebruikerservaring.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "What does a basic website cost?",
          answer: "A professional website starts from €1,299. We offer packages for every budget and need.",
        },
        ar: {
          question: "كم تكلفة موقع أساسي؟",
          answer: "يبدأ الموقع الاحترافي من 1299 يورو. لدينا باقات لكل ميزانية.",
        },
        nl: {
          question: "Wat zijn de kosten voor een basis website?",
          answer: "Een professionele website begint vanaf €1.299. We bieden verschillende pakketten aan voor elk budget en behoefte.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Do I get access to the source code?",
          answer: "No—the source code is the company's intellectual property and is not delivered with the website.",
        },
        ar: {
          question: "هل أحصل على الشيفرة المصدرية؟",
          answer: "لا، الشيفرة ملك فكري للشركة ولا يتم تسليمها مع الموقع.",
        },
        nl: {
          question: "Krijg ik toegang tot de broncode?",
          answer: "Nee, de broncode is intellectueel eigendom van het bedrijf en wordt niet meegeleverd met de website.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Do you offer payment plans?",
          answer: "Yes—we offer flexible payment options. Contact us for a personal proposal.",
        },
        ar: {
          question: "هل توجد خطط دفع؟",
          answer: "نعم، نوفر خيارات دفع مرنة. تواصل معنا لعرض مخصص.",
        },
        nl: {
          question: "Werken jullie met betalingsplannen?",
          answer: "Ja, we bieden flexibele betalingsopties aan. Neem contact op voor een persoonlijk voorstel.",
        },
      },
    },
  ],
  homeSectionCopy: {
    pricing: {
      en: {
        titleBefore: "Our ",
        titleHighlight: "Packages",
        titleAfter: "",
        subtitle: "Choose the plan that fits you",
        seeAll: "View all packages →",
        popularBadge: "Most popular",
        orderNow: "Order now",
      },
      ar: {
        titleBefore: "",
        titleHighlight: "الباقات",
        titleAfter: " لدينا",
        subtitle: "اختر الباقة المناسبة لك",
        seeAll: "عرض كل الباقات ←",
        popularBadge: "الأكثر شعبية",
        orderNow: "اطلب الآن",
      },
      nl: {
        titleBefore: "Onze ",
        titleHighlight: "Pakketten",
        titleAfter: "",
        subtitle: "Kies het pakket dat bij u past",
        seeAll: "Bekijk alle pakketten →",
        popularBadge: "Meest populair",
        orderNow: "Bestel nu",
      },
    },
    testimonials: {
      en: {
        titleBefore: "What our clients ",
        titleHighlight: "say",
        titleAfter: "",
      },
      ar: {
        titleBefore: "ماذا ",
        titleHighlight: "يقول",
        titleAfter: " عملاؤنا",
      },
      nl: {
        titleBefore: "Wat onze klanten ",
        titleHighlight: "zeggen",
        titleAfter: "",
      },
    },
    faq: {
      en: {
        titleBefore: "",
        titleHighlight: "FAQ",
        titleAfter: "",
      },
      ar: {
        titleBefore: "",
        titleHighlight: "الأسئلة الشائعة",
        titleAfter: "",
      },
      nl: {
        titleBefore: "Veelgestelde ",
        titleHighlight: "vragen",
        titleAfter: "",
      },
    },
    cta: {
      en: {
        title: "Ready to grow digitally?",
        subtitle: "Tell us about your project—we’ll get back to you quickly.",
        button: "Contact us",
      },
      ar: {
        title: "جاهز للنمو رقمياً؟",
        subtitle: "صف لنا مشروعك وسنعود إليك بسرعة.",
        button: "تواصل معنا",
      },
      nl: {
        title: "Klaar om digitaal te groeien?",
        subtitle: "Vertel ons over uw project—we reageren snel.",
        button: "Neem contact op",
      },
    },
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
  teamHeader: {
    en: { title: "Meet Our Experts", highlight: "Experts" },
    ar: { title: "تعرف على خبرائنا", highlight: "خبرائنا" },
    nl: { title: "Ontmoet Onze Experts", highlight: "Experts" }
  },
  footer: {
    en: { copyright: "All rights reserved", credits: "Designed & Developed by axonXcode" },
    ar: { copyright: "جميع الحقوق محفوظة", credits: "تصميم وتطوير فريق axonXcode" },
    nl: { copyright: "Alle rechten voorbehouden", credits: "Ontworpen en ontwikkeld door axonXcode" }
  },
  services: [
    {
      id: "1",
      icon: "fa-laptop-code",
      translations: {
        en: {
          name: "Custom Web Development",
          description: "Tailor-made digital experiences built with the latest technologies.",
          expertDetails: "We specialize in high-performance web applications using React, Next.js, and Python backends. Our architecture ensures scalability, top-tier security, and ultra-fast loading times optimized for global users.",
          highlights: [
            { icon: "fa-code", text: "Custom-written code, no templates" },
            { icon: "fa-gauge-high", text: "High performance and fast loading" },
            { icon: "fa-mobile-screen-button", text: "Fully responsive across devices" },
          ],
        },
        ar: {
          name: "تطوير مواقع مخصص",
          description: "تجارب رقمية مصممة خصيصاً باستخدام أحدث التقنيات العالمية.",
          expertDetails: "نحن متخصصون في بناء تطبيقات الويب عالية الأداء باستخدام تقنيات React و Next.js مع خلفيات برمجية قوية بلغة Python. تضمن بنيتنا التحتية القابلة للتوسع أماناً فائقاً وسرعة تحميل استثنائية.",
          highlights: [
            { icon: "fa-code", text: "كود مكتوب خصيصاً بدون قوالب جاهزة" },
            { icon: "fa-gauge-high", text: "أداء وسرعة تحميل عالية" },
            { icon: "fa-mobile-screen-button", text: "تصميم متجاوب مع كل الأجهزة" },
          ],
        },
        nl: {
          name: "Maatwerk Webontwikkeling",
          description: "Op maat gemaakte digitale ervaringen gebouwd met de nieuwste technologieën.",
          expertDetails: "Wij zijn gespecialiseerd in krachtige webapplicaties met React, Next.js en Python backends. Onze architectuur garandeert schaalbaarheid, topbeveiliging en ultrasnelle laadtijden.",
          highlights: [
            { icon: "fa-code", text: "Op maat geschreven code, geen templates" },
            { icon: "fa-gauge-high", text: "Hoge prestaties en snelle laadtijd" },
            { icon: "fa-mobile-screen-button", text: "Volledig responsief op alle apparaten" },
          ],
        },
      },
    },
    {
      id: "4",
      icon: "fa-cart-shopping",
      translations: {
        en: {
          name: "E-Commerce Excellence",
          description: "Robust online stores designed to convert visitors into loyal customers.",
          expertDetails: "We build conversion-centric e-commerce platforms. From custom Shopify themes to headless commerce solutions, we integrate seamless payment gateways and automated inventory management for a hassle-free operation.",
          highlights: [
            { icon: "fa-credit-card", text: "Secure, integrated payment gateways" },
            { icon: "fa-boxes-stacked", text: "Smart automated inventory management" },
            { icon: "fa-chart-line", text: "Continuous conversion rate optimization" },
          ],
        },
        ar: {
          name: "التميز في التجارة الإلكترونية",
          description: "متاجر إلكترونية قوية مصممة لتحويل الزوار إلى عملاء دائمين.",
          expertDetails: "نقوم ببناء منصات تجارة إلكترونية تركز على التحويل. من قوالب Shopify المخصصة إلى حلول التجارة المنفصلة (Headless)، ندمج بوابات دفع سلسة وأنظمة إدارة مخزون مؤتمتة لعملية بيع خالية من المتاعب.",
          highlights: [
            { icon: "fa-credit-card", text: "بوابات دفع آمنة ومتكاملة" },
            { icon: "fa-boxes-stacked", text: "إدارة مخزون آلية ذكية" },
            { icon: "fa-chart-line", text: "تحسين مستمر لمعدل التحويل" },
          ],
        },
        nl: {
          name: "E-Commerce Uitmuntendheid",
          description: "Robuuste online winkels ontworpen om bezoekers om te zetten in loyale klanten.",
          expertDetails: "Wij bouwen conversiegerichte e-commerce platforms. Van aangepaste Shopify-thema's tot headless commerce oplossingen met naadloze betalingsgateways.",
          highlights: [
            { icon: "fa-credit-card", text: "Veilige, geïntegreerde betalingsgateways" },
            { icon: "fa-boxes-stacked", text: "Slim geautomatiseerd voorraadbeheer" },
            { icon: "fa-chart-line", text: "Continue optimalisatie van conversieratio's" },
          ],
        },
      },
    },
    {
      id: "5",
      icon: "fa-diagram-project",
      translations: {
        en: {
          name: "Custom Web & SaaS Applications",
          description: "We build complete web systems and applications tailored to your business",
          expertDetails: "We build complete web platforms and applications tailored to your business, from the initial concept through to launch. We use a flexible, scalable architecture that supports your growing user base without needing to rebuild the system from scratch later.",
          highlights: [
            { icon: "fa-code-branch", text: "Flexible, scalable software architecture" },
            { icon: "fa-users-gear", text: "Multi-user role and permission management" },
            { icon: "fa-cloud", text: "Reliable, growth-ready cloud hosting" },
          ],
        },
        ar: {
          name: "تطبيقات ويب وأنظمة SaaS مخصصة",
          description: "نبني أنظمة وتطبيقات ويب متكاملة مصممة خصيصاً لطبيعة عملك",
          expertDetails: "نبني منصات وتطبيقات ويب متكاملة مصممة خصيصاً حسب طبيعة عملك، بدءاً من الفكرة الأولية وحتى الإطلاق. نعتمد بنية برمجية مرنة وقابلة للتوسع تدعم نمو مستخدميك دون الحاجة لإعادة بناء النظام من الصفر لاحقاً.",
          highlights: [
            { icon: "fa-code-branch", text: "بنية برمجية مرنة قابلة للتوسع" },
            { icon: "fa-users-gear", text: "إدارة صلاحيات ومستخدمين متعددين" },
            { icon: "fa-cloud", text: "استضافة سحابية موثوقة وقابلة للنمو" },
          ],
        },
        nl: {
          name: "Maatwerk Web- & SaaS-applicaties",
          description: "Wij bouwen complete websystemen en applicaties op maat van uw bedrijf",
          expertDetails: "Wij bouwen complete webplatforms en applicaties op maat van uw bedrijf, van het eerste concept tot de lancering. We gebruiken een flexibele, schaalbare architectuur die uw groeiende gebruikersbestand ondersteunt zonder dat het systeem later helemaal opnieuw gebouwd hoeft te worden.",
          highlights: [
            { icon: "fa-code-branch", text: "Flexibele, schaalbare software-architectuur" },
            { icon: "fa-users-gear", text: "Beheer van meerdere gebruikersrollen en rechten" },
            { icon: "fa-cloud", text: "Betrouwbare, groeiklare cloud hosting" },
          ],
        },
      },
    },
    {
      id: "6",
      icon: "fa-shield-halved",
      translations: {
        en: {
          name: "Digital Security & Continuous Protection",
          description: "Proactive protection for your website and data, built on information security best practices",
          expertDetails: "We apply multiple layers of protection to every project — from regular security updates to closing known vulnerabilities before they can be exploited. We continuously monitor the infrastructure to ensure your website and your customers' data stay protected without requiring repeated manual intervention from you.",
          highlights: [
            { icon: "fa-rotate", text: "Regular, ongoing security updates" },
            { icon: "fa-lock", text: "Protection against common vulnerabilities (XSS/Injection)" },
            { icon: "fa-chart-simple", text: "Proactive infrastructure monitoring" },
          ],
        },
        ar: {
          name: "الأمان الرقمي والحماية المستمرة",
          description: "حماية استباقية لموقعك وبياناتك، مبنية على أفضل ممارسات أمن المعلومات",
          expertDetails: "نطبّق طبقات حماية متعددة على كل مشروع — من تحديثات الأمان الدورية إلى إغلاق الثغرات المعروفة قبل استغلالها. نراقب البنية التحتية باستمرار لضمان بقاء موقعك وبيانات عملائك محمية دون تدخل يدوي متكرر من طرفك.",
          highlights: [
            { icon: "fa-rotate", text: "تحديثات أمنية دورية ومستمرة" },
            { icon: "fa-lock", text: "حماية من الثغرات الشائعة (XSS/Injection)" },
            { icon: "fa-chart-simple", text: "مراقبة استباقية للبنية التحتية" },
          ],
        },
        nl: {
          name: "Digitale Beveiliging & Continue Bescherming",
          description: "Proactieve bescherming voor uw website en gegevens, gebaseerd op best practices in informatiebeveiliging",
          expertDetails: "Wij passen meerdere beveiligingslagen toe op elk project — van regelmatige beveiligingsupdates tot het dichten van bekende kwetsbaarheden voordat ze misbruikt worden. Wij monitoren de infrastructuur continu zodat uw website en klantgegevens beschermd blijven zonder herhaaldelijke handmatige tussenkomst van uw kant.",
          highlights: [
            { icon: "fa-rotate", text: "Regelmatige, doorlopende beveiligingsupdates" },
            { icon: "fa-lock", text: "Bescherming tegen veelvoorkomende kwetsbaarheden (XSS/Injection)" },
            { icon: "fa-chart-simple", text: "Proactieve infrastructuurmonitoring" },
          ],
        },
      },
    },
    {
      id: "7",
      icon: "fa-plug",
      translations: {
        en: {
          name: "External Systems & API Integration",
          description: "We connect your website to any external service your business needs — payment gateways, accounting, and more",
          expertDetails: "We connect your website or system to any external service your business needs to run smoothly — payment gateways, accounting software, or CRM systems. The goal is for all your tools to work together as one integrated system instead of staying separate and disconnected.",
          highlights: [
            { icon: "fa-money-check-dollar", text: "Secure payment gateway integration" },
            { icon: "fa-file-invoice", text: "Sync with accounting and invoicing systems" },
            { icon: "fa-key", text: "Secure API key management" },
          ],
        },
        ar: {
          name: "ربط الأنظمة الخارجية وواجهات API",
          description: "نربط موقعك بأي خدمة خارجية تحتاجها — بوابات دفع، محاسبة، وغيرها",
          expertDetails: "نربط موقعك أو نظامك بأي خدمة خارجية تحتاجها لتشغيل عملك بسلاسة — بوابات دفع إلكترونية، برامج محاسبة، أو أنظمة إدارة علاقات العملاء. الهدف أن تعمل كل أدواتك معاً كنظام واحد متكامل بدل أن تبقى منفصلة ومتفرقة.",
          highlights: [
            { icon: "fa-money-check-dollar", text: "ربط بوابات الدفع الإلكتروني بأمان" },
            { icon: "fa-file-invoice", text: "مزامنة مع أنظمة المحاسبة والفوترة" },
            { icon: "fa-key", text: "إدارة آمنة لمفاتيح الوصول (API Keys)" },
          ],
        },
        nl: {
          name: "Koppeling Externe Systemen & API's",
          description: "Wij koppelen uw website aan elke externe dienst die uw bedrijf nodig heeft — betalingsgateways, boekhouding en meer",
          expertDetails: "Wij koppelen uw website of systeem aan elke externe dienst die uw bedrijf nodig heeft om soepel te draaien — betalingsgateways, boekhoudsoftware of CRM-systemen. Het doel is dat al uw tools samenwerken als één geïntegreerd systeem in plaats van los van elkaar te blijven.",
          highlights: [
            { icon: "fa-money-check-dollar", text: "Veilige koppeling van betalingsgateways" },
            { icon: "fa-file-invoice", text: "Synchronisatie met boekhoud- en factureringssystemen" },
            { icon: "fa-key", text: "Veilig beheer van API-sleutels" },
          ],
        },
      },
    },
    {
      id: "8",
      icon: "fa-gears",
      translations: {
        en: {
          name: "Business Process Automation",
          description: "We turn your repetitive manual tasks into automated processes that save time and reduce errors",
          expertDetails: "We design software solutions that automate repetitive administrative and operational tasks within your business — from order management to internal workflow organization — reducing reliance on manual entry and lowering the chance of human error, freeing up more time to focus on growing your business.",
          highlights: [
            { icon: "fa-arrows-rotate", text: "Automating repetitive daily tasks" },
            { icon: "fa-triangle-exclamation", text: "Reducing human errors from manual entry" },
            { icon: "fa-clock", text: "Real, measurable operational time savings" },
          ],
        },
        ar: {
          name: "أتمتة العمليات الإدارية والتشغيلية",
          description: "نحوّل مهامك المتكررة اليدوية إلى عمليات آلية توفر وقتك وتقلل الأخطاء",
          expertDetails: "نصمم حلولاً برمجية تؤتمت المهام الإدارية والتشغيلية المتكررة داخل عملك — من إدارة الطلبات إلى تنظيم سير العمل الداخلي — لتقليل الاعتماد على الإدخال اليدوي وتقليل احتمالية الخطأ البشري، مما يمنحك وقتاً أكبر للتركيز على نمو عملك.",
          highlights: [
            { icon: "fa-arrows-rotate", text: "أتمتة المهام اليومية المتكررة" },
            { icon: "fa-triangle-exclamation", text: "تقليل الأخطاء البشرية الناتجة عن الإدخال اليدوي" },
            { icon: "fa-clock", text: "توفير وقت تشغيلي حقيقي وقابل للقياس" },
          ],
        },
        nl: {
          name: "Automatisering van Bedrijfsprocessen",
          description: "Wij zetten uw herhalende handmatige taken om in geautomatiseerde processen die tijd besparen en fouten verminderen",
          expertDetails: "Wij ontwerpen softwareoplossingen die herhalende administratieve en operationele taken binnen uw bedrijf automatiseren — van orderbeheer tot interne workflow-organisatie — waardoor de kans op menselijke fouten kleiner wordt en u meer tijd overhoudt om uw bedrijf te laten groeien.",
          highlights: [
            { icon: "fa-arrows-rotate", text: "Automatisering van herhalende dagelijkse taken" },
            { icon: "fa-triangle-exclamation", text: "Vermindering van menselijke fouten door handmatige invoer" },
            { icon: "fa-clock", text: "Echte, meetbare operationele tijdsbesparing" },
          ],
        },
      },
    },
    {
      id: "9",
      icon: "fa-database",
      translations: {
        en: {
          name: "Custom Databases & Secure Backend",
          description: "We design secure backend data architecture custom-built for your project's scale",
          expertDetails: "We design custom backend database architecture suited to your project's size and data type, applying strict security standards to protect your customers' information. Every database is carefully built to handle growth without affecting performance speed.",
          highlights: [
            { icon: "fa-server", text: "Data architecture tailored to your project size" },
            { icon: "fa-user-lock", text: "Strict per-user access permissions" },
            { icon: "fa-shield", text: "Advanced protection for sensitive customer data" },
          ],
        },
        ar: {
          name: "قواعد بيانات مخصصة وحلول Backend آمنة",
          description: "نصمم بنية بيانات خلفية آمنة مصممة خصيصاً لحجم مشروعك",
          expertDetails: "نصمم بنية بيانات خلفية مخصصة تناسب حجم مشروعك ونوع بياناته، مع تطبيق معايير أمان صارمة لحماية معلومات عملائك. كل قاعدة بيانات تُبنى بعناية لتتحمل النمو دون تأثير على سرعة الأداء.",
          highlights: [
            { icon: "fa-server", text: "بنية بيانات مصممة حسب حجم مشروعك" },
            { icon: "fa-user-lock", text: "صلاحيات وصول محكمة لكل مستخدم" },
            { icon: "fa-shield", text: "حماية متقدمة لبيانات العملاء الحساسة" },
          ],
        },
        nl: {
          name: "Maatwerk Databases & Veilige Backend",
          description: "Wij ontwerpen veilige backend-data-architectuur op maat van de schaal van uw project",
          expertDetails: "Wij ontwerpen maatwerk backend-databasearchitectuur die past bij de omvang en het type data van uw project, met strikte beveiligingsnormen om de gegevens van uw klanten te beschermen. Elke database is zorgvuldig gebouwd om groei aan te kunnen zonder de prestaties te beïnvloeden.",
          highlights: [
            { icon: "fa-server", text: "Data-architectuur afgestemd op uw projectomvang" },
            { icon: "fa-user-lock", text: "Strikte toegangsrechten per gebruiker" },
            { icon: "fa-shield", text: "Geavanceerde bescherming van gevoelige klantgegevens" },
          ],
        },
      },
    },
    {
      id: "10",
      icon: "fa-screwdriver-wrench",
      translations: {
        en: {
          name: "Monthly Maintenance & VIP Content Management",
          description: "We handle your website updates and content monthly without you needing to learn any dashboard",
          expertDetails: "We take care of your website every month — security updates, and any text or image changes you'd like — without you needing to learn a complex dashboard or touch any code. Just send us your request, and we handle it.",
          highlights: [
            { icon: "fa-shield-heart", text: "Regular security updates handled for you" },
            { icon: "fa-pen", text: "Text and image edits done on request" },
            { icon: "fa-headset", text: "Direct, fast communication for any change request" },
          ],
        },
        ar: {
          name: "الصيانة الشهرية وإدارة المحتوى VIP",
          description: "نتولى تحديث موقعك ومحتواه شهرياً دون حاجتك لتعلم أي لوحة تحكم",
          expertDetails: "نتولى عنك متابعة موقعك شهرياً — تحديثات الأمان، وأي تعديل على النصوص أو الصور ترغب به — دون أن تحتاج لتعلم لوحة تحكم معقدة أو التعامل مع أي كود. فقط أرسل لنا طلبك، ونحن ننفذه.",
          highlights: [
            { icon: "fa-shield-heart", text: "تحديثات أمان دورية دون تدخل منك" },
            { icon: "fa-pen", text: "تعديل النصوص والصور حسب طلبك" },
            { icon: "fa-headset", text: "تواصل مباشر وسريع لأي طلب تعديل" },
          ],
        },
        nl: {
          name: "Maandelijks Onderhoud & VIP Contentbeheer",
          description: "Wij regelen uw website-updates en content maandelijks zonder dat u een dashboard hoeft te leren",
          expertDetails: "Wij zorgen elke maand voor uw website — beveiligingsupdates en eventuele tekst- of afbeeldingswijzigingen die u wenst — zonder dat u een complex dashboard hoeft te leren of met code te maken krijgt. Stuur ons gewoon uw verzoek, en wij regelen het.",
          highlights: [
            { icon: "fa-shield-heart", text: "Regelmatige beveiligingsupdates volledig voor u geregeld" },
            { icon: "fa-pen", text: "Tekst- en afbeeldingswijzigingen op aanvraag" },
            { icon: "fa-headset", text: "Direct en snel contact voor elk wijzigingsverzoek" },
          ],
        },
      },
    },
    {
      id: "11",
      icon: "fa-language",
      translations: {
        en: {
          name: "Multi-Language Support & Full Responsiveness",
          description: "Your website reaches your audience wherever they are, in their language and on any device",
          expertDetails: "We design your website to reach your audience wherever they are and in whichever language they prefer, ensuring a smooth, consistent experience whether they're browsing on mobile, desktop, or tablet.",
          highlights: [
            { icon: "fa-earth-europe", text: "Multi-language support tailored to your audience" },
            { icon: "fa-mobile-screen-button", text: "100% responsive design across all devices" },
            { icon: "fa-eye", text: "Consistent, seamless user experience everywhere" },
          ],
        },
        ar: {
          name: "دعم متعدد اللغات وتصميم متجاوب بالكامل",
          description: "موقعك يصل لجمهورك أينما كان، بلغته وعلى أي جهاز",
          expertDetails: "نصمم موقعك ليصل إلى جمهورك أينما كان وبأي لغة يفضلها، مع ضمان أن تجربته تبقى سلسة ومتناسقة سواء تصفح من الهاتف أو الحاسوب أو التابلت.",
          highlights: [
            { icon: "fa-earth-europe", text: "دعم لغات متعددة حسب جمهورك المستهدف" },
            { icon: "fa-mobile-screen-button", text: "تصميم متجاوب 100% لكل الأجهزة" },
            { icon: "fa-eye", text: "تجربة مستخدم متسقة وسلسة أينما تصفح" },
          ],
        },
        nl: {
          name: "Meertalige Ondersteuning & Volledige Responsiviteit",
          description: "Uw website bereikt uw publiek waar ze ook zijn, in hun taal en op elk apparaat",
          expertDetails: "Wij ontwerpen uw website zodat deze uw publiek bereikt waar ze ook zijn en in de taal die ze verkiezen, met een soepele en consistente ervaring op mobiel, desktop of tablet.",
          highlights: [
            { icon: "fa-earth-europe", text: "Meertalige ondersteuning afgestemd op uw doelgroep" },
            { icon: "fa-mobile-screen-button", text: "100% responsief ontwerp voor alle apparaten" },
            { icon: "fa-eye", text: "Consistente, naadloze gebruikerservaring overal" },
          ],
        },
      },
    },
  ],
  team: [
    {
      id: "t1",
      image: "/assets/profile-aamr.png",
      translations: {
        en: {
          name: "Aamr Al-Awwad",
          title: "Professional Software Engineer",
          bio: "A software engineer specializing in building integrated digital solutions and information security. I combine coding precision with the discipline of closing vulnerabilities to deliver secure, high-performance code. I turn ideas into smart applications and manage data flow to ensure the best performance with maximum protection and reliability."
        },
        ar: {
          name: "عامر العواد",
          title: "مهندس برمجيات محترف",
          bio: "مهندس برمجيات متخصص في بناء الحلول الرقمية المتكاملة، وأمن المعلومات، أجمع بين دقة الكود واحترافية سد الثغرات لعمل أكواد آمنة وسريعة. أحول الأفكار إلى تطبيقات ذكية وأدير تدفق البيانات لأضمن أفضل أداء بأقصى مستوى حماية ومنطقية."
        },
        nl: {
          name: "Aamr Al-Awwad",
          title: "Professionele Software Engineer",
          bio: "Een software engineer gespecialiseerd in het bouwen van geïntegreerde digitale oplossingen en informatiebeveiliging. Ik combineer code-precisie met de discipline om kwetsbaarheden te dichten voor veilige, snelle code. Ik zet ideeën om in slimme applicaties en beheer de gegevensstroom voor optimale prestaties met maximale bescherming en betrouwbaarheid."
        }
      }
    }
  ],
  portfolio: [
    {
      id: "p1",
      image: "/assets/AmA facelofo after editting with codes background-1.jpg",
      category: "Content Creation",
      link: "https://www.facebook.com/admeral.ama2",
      translations: {
        en: { title: "Content Creation", description: "Content creator / ad management / video creation / photos / full content management" },
        ar: { title: "صناعة محتوى", description: "صانع محتوى / إدارة إعلانات / إنشاء فيديوهات / صور / إدارة محتوى شامل" },
        nl: { title: "Contentcreatie", description: "Content creator / advertentiebeheer / video’s maken / foto’s / volledig contentbeheer" }
      }
    },
    {
      id: "p2",
      image: "/assets/Logo-Tasneem-Min-round-no-background.png",
      category: "Social Media",
      link: "https://www.facebook.com/profile.php?id=61583301257685",
      translations: {
        en: { title: "Tasneem", description: "Content management / design / advertising campaigns" },
        ar: { title: "بقالة تسنيم", description: "إدارة محتوى / تصميم / حملات إعلانية" },
        nl: { title: "Tasneem", description: "Contentbeheer / ontwerp / advertentiecampagnes" }
      }
    },
    {
      id: "p3",
      image: "/assets/sq-simple-backwightcolor.png",
      category: "WEB SHOP DESIGN",
      link: "https://souqeastren.vercel.app/",
      translations: {
        en: { title: "Web Shop Design", description: "SouqEastren — e‑commerce shop design / data protection / delivery / sales / content management" },
        ar: { title: "متجر إلكتروني", description: "SouqEastren — تصميم متجر إلكتروني / حماية البيانات / توصيل / بيع / إدارة محتوى" },
        nl: { title: "Webwinkelontwerp", description: "SouqEastren — webwinkelontwerp / gegevensbescherming / levering / verkoop / contentbeheer" }
      }
    },
    {
      id: "p4",
      image: "/assets/simple-logo-X-decoreted-no-background.png",
      category: "Web Design",
      link: "/",
      translations: {
        en: { title: "Website Design", description: "axonXcode - Basic/Informational/Contact/Service Website" },
        ar: { title: "تصميم موقع", description: "axonXcode - تصميم موقع أساسي / تعريفي / تواصل / تقديم خدمات" },
        nl: { title: "Website Ontwerp", description: "axonXcode - Basis/Informatieve/Contact/Diensten Website" }
      }
    },
    {
      id: "p5",
      image: "/assets/alasaylef-nobackground.png",
      category: "WEB DESIGN",
      link: "https://www.alasaylf.com/",
      translations: {
        en: { title: "Website Design", description: "Alasaylf — corporate website / interactive / service-focused / administrative" },
        ar: { title: "تصميم موقع", description: "Alasaylf — تصميم موقع شركة / تفاعلي / خدمي / إداري" },
        nl: { title: "Websiteontwerp", description: "Alasaylf — bedrijfswebsite / interactief / diensten / administratief" }
      }
    }
  ],
  mainPlans: [
    {
      id: "main-1",
      annualPrice: 0,
      annualTotal: 0,
      setupFeeAnnual: 0,
      isPopular: false,
      isCustom: false,
      isFree: true,
      translations: {
        en: {
          name: "Free Page",
          buttonText: "Start Free",
          setupFeeNote: "No domain or email included — subdomain only. 💡 Perfect for experiencing our quality and starting your digital presence instantly with zero financial risk.",
          features: [
            "One dedicated informational page",
            "Professional design with a single Hero Background image",
            "Basic Logo Placement",
            "Interactive contact form with message reception",
            "100% mobile-friendly design",
            "Fast loading speed and free basic protection",
            "Basic SEO-ready structure",
            "Free subdomain hosting (yourname.axonxcode.com)",
          ],
        },
        ar: {
          name: "الباقة المجانية",
          buttonText: "ابدأ مجاناً",
          setupFeeNote: "بدون دومين أو إيميل مخصص — رابط فرعي فقط. 💡 مثالية لتجربة جودة عملنا وبدء حضورك الرقمي فوراً دون أي مخاطرة مادية.",
          features: [
            "صفحة معلوماتية واحدة مخصصة",
            "تصميم احترافي مع صورة خلفية رئيسية واحدة (Hero Background)",
            "وضع الشعار الأساسي (Logo Placement)",
            "نموذج تواصل تفاعلي واستقبال الرسائل",
            "تصميم متوافق 100% مع شاشات الهواتف الذكية",
            "سرعة تحميل عالية وحماية أساسية مجانية",
            "بنية أولية مهيأة لمحركات البحث (Basic SEO)",
            "استضافة مجانية على رابط فرعي (yourname.axonxcode.com)",
          ],
        },
        nl: {
          name: "Gratis Pagina",
          buttonText: "Start Gratis",
          setupFeeNote: "Geen domein of e-mail inbegrepen — alleen subdomein. 💡 Ideaal om onze kwaliteit te ervaren en direct te starten met uw digitale aanwezigheid, zonder enig financieel risico.",
          features: [
            "Eén op maat gemaakte informatiepagina",
            "Professioneel design met één Hero-achtergrondafbeelding",
            "Basis Logo Plaatsing",
            "Interactief contactformulier met berichtontvangst",
            "100% mobielvriendelijk ontwerp",
            "Snelle laadtijd en gratis basisbeveiliging",
            "SEO-klare basisstructuur",
            "Gratis subdomein hosting (yourname.axonxcode.com)",
          ],
        },
      },
    },
    {
      id: "main-2",
      annualPrice: 1299,
      annualTotal: 0,
      setupFeeAnnual: 0,
      isPopular: true,
      isCustom: false,
      translations: {
        en: {
          name: "Business Pro",
          buttonText: "Start Project",
          setupFeeNote: "🎁 Launch gift: your first month completely free (hosting + email + VIP content management), so you start your project with zero extra running costs!",
          features: [
            "5 to 8 fully custom pages (no templates)",
            "Multi-language support (Dutch/English, with option to add another language)",
            "Ultra-fast performance",
            "High-level security with continuous updates",
            "Mobile-friendly design + SEO ready",
            "Direct, interactive contact form for your clients",
            "VIP Managed content service: included in the monthly maintenance plan, we handle any text or image update for you monthly without dashboard complexity",
            "Optional add-ons on request: dynamic CMS dashboard, external API integrations, or custom software features",
            "Built-in visitor analytics (Google Analytics), fully compliant with EU cookie privacy requirements",
            "Price excludes domain & hosting — requires the monthly maintenance & hosting subscription",
          ],
        },
        ar: {
          name: "باقة الأعمال",
          buttonText: "ابدأ مشروعك",
          setupFeeNote: "🎁 هدية الباقة: أول شهر مجاناً بالكامل من باقة (الاستضافة + الإيميل + إدارة المحتوى VIP)، لتبدأ مشروعك بدون أي مصاريف تشغيلية إضافية!",
          features: [
            "5 إلى 8 صفحات مخصصة بالكامل (بدون قوالب جاهزة)",
            "دعم لغات متعددة (هولندي / إنجليزي / مع إمكانية إضافة لغات أخرى)",
            "سرعة فائقة",
            "أمان عالي المستوى وتحديث مستمر",
            "تصميم متوافق مع الموبايل + مهيأ لمحركات البحث (SEO)",
            "نموذج تواصل مباشر وتفاعلي مع عملائك",
            "خدمة إدارة المحتوى (VIP Managed): ضمن باقة الصيانة الشهرية ننجز لك أي تعديل على النصوص أو الصور شهرياً دون الحاجة لتعقيدات لوحات التحكم",
            "إضافات اختيارية حسب الطلب: لوحة تحكم CMS ديناميكية، ربط أنظمة خارجية (API)، أو تطوير ميزات برمجية خاصة",
            "تحليلات زوار مدمجة (Google Analytics) مع الالتزام بمتطلبات خصوصية الكوكيز الأوروبية",
            "السعر لا يشمل الدومين والاستضافة — يتطلب الاشتراك في باقة الصيانة والاستضافة الشهرية",
          ],
        },
        nl: {
          name: "Business Pro",
          buttonText: "Project Starten",
          setupFeeNote: "🎁 Startcadeau: uw eerste maand volledig gratis (hosting + e-mail + VIP contentbeheer), zodat u zonder extra operationele kosten start!",
          features: [
            "5 tot 8 volledig maatwerk pagina's (geen templates)",
            "Meertalige ondersteuning (Nederlands/Engels, met optie voor een extra taal)",
            "Supersnelle prestaties",
            "Hoog beveiligingsniveau met continue updates",
            "Mobielvriendelijk design + SEO klaar",
            "Direct, interactief contactformulier voor uw klanten",
            "VIP Managed contentservice: inbegrepen in het maandelijkse onderhoudsplan, wij verwerken elke tekst- of afbeeldingswijziging maandelijks voor u zonder dashboard-complexiteit",
            "Optionele add-ons op aanvraag: dynamisch CMS-dashboard, koppelingen met externe API's, of maatwerk software functies",
            "Ingebouwde bezoekersanalyse (Google Analytics), volledig conform de Europese cookie-privacyregels",
            "Prijs is exclusief domein & hosting — vereist het maandelijkse onderhouds- en hostingabonnement",
          ],
        },
      },
    },
    {
      id: "main-3",
      annualPrice: 0,
      annualTotal: 0,
      setupFeeAnnual: 0,
      isPopular: false,
      isCustom: true,
      translations: {
        en: {
          name: "Custom Solutions",
          buttonText: "Contact Us",
          setupFeeNote: "",
          customPriceLabel: "Custom Price",
          features: [
            "Advanced e-commerce store development (Custom E-commerce)",
            "Fully custom web applications and systems (Web & SaaS Apps)",
            "Administrative and operational workflow automation",
            "Scalable software architecture built for future growth",
            "Advanced integration with external systems, payment gateways, and accounting software (API Integration)",
            "Enterprise-grade custom dashboards and data management",
            "Solving complex software problems and optimizing existing systems",
            "Custom, high-security databases tailored to project scale and needs",
            "High-priority technical and security support, defined per project",
          ],
        },
        ar: {
          name: "الحلول المتقدمة",
          buttonText: "تواصل معنا",
          setupFeeNote: "",
          customPriceLabel: "سعر مخصص",
          features: [
            "تطوير المتاجر الإلكترونية المتقدمة (Custom E-commerce)",
            "تطبيقات ويب وأنظمة مخصصة بالكامل (Web & SaaS Apps)",
            "أتمتة العمليات الإدارية والتشغيلية للشركات (Workflow Automation)",
            "هندسة معمارية برمجية قابلة للتوسع المستقبلي (Scalable Architecture)",
            "ربط متقدم مع الأنظمة الخارجية، بوابات الدفع، وبرمجيات المحاسبة (API Integration)",
            "لوحات تحكم وإدارة بيانات مخصصة بمستوى الشركات (Enterprise Dashboards)",
            "حل المشاكل البرمجية المعقدة وتحسين أداء الأنظمة الحالية",
            "قواعد بيانات مخصصة وعالية الأمان حسب حجم واحتياجات المشروع",
            "دعم فني وأمني ذو أولوية قصوى، يُحدَّد حسب طبيعة كل مشروع",
          ],
        },
        nl: {
          name: "Maatwerk Oplossingen",
          buttonText: "Neem Contact Op",
          setupFeeNote: "",
          customPriceLabel: "Prijs op Maat",
          features: [
            "Ontwikkeling van geavanceerde webshops (Custom E-commerce)",
            "Volledig maatwerk webapplicaties en systemen (Web & SaaS Apps)",
            "Automatisering van administratieve en operationele workflows",
            "Schaalbare software-architectuur voor toekomstige groei",
            "Geavanceerde koppelingen met externe systemen, betalingsgateways en boekhoudsoftware (API-integratie)",
            "Maatwerk dashboards en databeheer op ondernemingsniveau",
            "Oplossen van complexe softwareproblemen en optimaliseren van bestaande systemen",
            "Maatwerk, hoogbeveiligde databases afgestemd op schaal en behoeften van het project",
            "Technische en beveiligingsondersteuning met hoge prioriteit, per project bepaald",
          ],
        },
      },
    },
  ],
  addOns: [
    {
      id: "monthly-maintenance",
      price: 25,
      period: "month",
      icon: "fa-screwdriver-wrench",
      translations: {
        en: {
          name: "Monthly Maintenance",
          description: "Security updates + one content edit per month",
        },
        ar: {
          name: "صيانة شهرية",
          description: "تحديثات أمان + تعديل محتوى واحد شهرياً",
        },
        nl: {
          name: "Maandelijks Onderhoud",
          description: "Beveiligingsupdates + één content-update per maand",
        },
      },
    },
    {
      id: "hosting-bundle",
      price: 50,
      period: "month",
      icon: "fa-shield-halved",
      translations: {
        en: {
          name: "Hosting + Maintenance Bundle",
          description: "Domain name, website hosting, company email, and monthly maintenance combined",
        },
        ar: {
          name: "باقة الاستضافة + الصيانة الشاملة",
          description: "اسم النطاق ، استضافة الموقع , إيميل بإسم الشركة، وصيانة شهرية مجمّعة",
        },
        nl: {
          name: "Hosting + Onderhoud Bundel",
          description: "Domeinnaam, websitehosting, zakelijk e-mailadres en maandelijks onderhoud gecombineerd",
        },
      },
    },
  ],
};

export const UI_TEXTS = {
  en: {
    home: "Home",
    services: "Services",
    portfolio: "Projects",
    prices: "Pricing",
    team: "Our Team",
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
    expertDetails: "Expert Deep Explanation",
    homeHeroPrimary: "Begin your project",
    homeHeroSecondary: "Book a consultation",
    contactFormName: "Name",
    contactFormMessage: "Message",
    contactFormNamePh: "John Doe",
    contactFormEmailPh: "john@example.com",
    contactFormMessagePh: "Tell us about your project...",
    contactMailSubject: "New project inquiry from {name}",
    contactMailBody:
      'Hello {brand} Team,\n\nI am interested in your services.\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}',
    footerSitemap: "Sitemap",
    footerColExplore: "Explore",
    footerColPricing: "Pricing",
    footerColContact: "Contact",
    cookieConsentMessage:
      "We use essential cookies to run this website, and analytics cookies (Google Analytics) to understand and improve site performance. You can choose which cookies to allow.",
    cookieConsentAccept: "Accept All",
    cookieConsentEssential: "Essential Only",
  },
  ar: {
    home: "الرئيسية",
    services: "خدماتنا",
    portfolio: "أعمالنا",
    prices: "أسعار التسويق",
    team: "فريقنا",
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
    expertDetails: "شرح الخبراء المعمق",
    homeHeroPrimary: "ابدأ مشروعك",
    homeHeroSecondary: "احجز استشارة",
    contactFormName: "الاسم",
    contactFormMessage: "الرسالة",
    contactFormNamePh: "الاسم الكامل",
    contactFormEmailPh: "example@email.com",
    contactFormMessagePh: "صف لنا مشروعك أو استفسارك...",
    contactMailSubject: "استفسار مشروع جديد من {name}",
    contactMailBody:
      'مرحباً فريق {brand}،\n\nأنا مهتم بخدماتكم.\n\nالاسم: {name}\nالبريد: {email}\n\nالرسالة:\n{message}',
    footerSitemap: "خريطة الموقع",
    footerColExplore: "تصفح",
    footerColPricing: "الأسعار والباقات",
    footerColContact: "تواصل",
    cookieConsentMessage:
      "نستخدم كوكيز أساسية لتشغيل الموقع، وكوكيز تحليلية (Google Analytics) لفهم أداء الموقع وتحسينه. يمكنك اختيار نوع الكوكيز التي توافق عليها.",
    cookieConsentAccept: "قبول الكل",
    cookieConsentEssential: "قبول الأساسية فقط",
  },
  nl: {
    home: "Home",
    services: "Diensten",
    portfolio: "Projecten",
    prices: "Marketing Prijzen",
    team: "Ons Team",
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
    expertDetails: "Expert Diepgaande Uitleg",
    homeHeroPrimary: "Begin je project",
    homeHeroSecondary: "Boek consultatie",
    contactFormName: "Naam",
    contactFormMessage: "Bericht",
    contactFormNamePh: "Jan Jansen",
    contactFormEmailPh: "jan@voorbeeld.nl",
    contactFormMessagePh: "Vertel kort over uw project...",
    contactMailSubject: "Nieuw projectaanvraag van {name}",
    contactMailBody:
      'Hallo {brand}-team,\n\nIk ben geïnteresseerd in jullie diensten.\n\nNaam: {name}\nE-mail: {email}\n\nBericht:\n{message}',
    footerSitemap: "Sitemap",
    footerColExplore: "Ontdekken",
    footerColPricing: "Tarieven",
    footerColContact: "Contact",
    cookieConsentMessage:
      "Wij gebruiken essentiële cookies om deze website te laten werken, en analytische cookies (Google Analytics) om de prestaties van de site te begrijpen en te verbeteren. U kunt kiezen welke cookies u toestaat.",
    cookieConsentAccept: "Alles Accepteren",
    cookieConsentEssential: "Alleen Essentieel",
  }
};
