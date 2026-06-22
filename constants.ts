/**
 * يحتوي هذا الملف على القيم الثابتة والإعدادات الأولية للموقع.
 */
import { SiteConfig, Language } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  siteName: "axonXcode",
  logo: "/assets/semple-logo-last-rounded-no-wight-color.png",
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
          answer: "A basic website starts from €899. We offer packages for every budget and need.",
        },
        ar: {
          question: "كم تكلفة موقع أساسي؟",
          answer: "يبدأ الموقع الأساسي من 899 يورو. لدينا باقات لكل ميزانية.",
        },
        nl: {
          question: "Wat zijn de kosten voor een basis website?",
          answer: "Een basis website begint vanaf €899. We bieden verschillende pakketten aan voor elk budget en behoefte.",
        },
      },
    },
    {
      translations: {
        en: {
          question: "Do I get access to the source code?",
          answer: "Yes—all code is yours. We deliver full ownership and documentation at handover.",
        },
        ar: {
          question: "هل أحصل على الشيفرة المصدرية؟",
          answer: "نعم، الشيفرة لك بالكامل مع التسليم والتوثيق.",
        },
        nl: {
          question: "Krijg ik toegang tot de broncode?",
          answer: "Ja, alle code is van u. We leveren volledige eigendom en documentatie bij oplevering.",
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
          expertDetails: "Visuele identiteit is meer than een logo. We definiëren typografie, kleurtheorie en UI-componentbibliotheken die merkconsistentie garanderen."
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
  team: [
    {
      id: "t1",
      image: "/assets/profile-aamr.png",
      translations: {
        en: {
          name: "Aamr Al-Awwad",
          title: "Software Engineer & Digital Marketer",
          bio: "A software engineer specializing in building integrated digital solutions. I combine code precision with digital marketing professionalism. I turn ideas into smart applications and manage your social media presence to ensure your brand's growth."
        },
        ar: {
          name: "عامر العواد",
          title: "مهندس برمجيات ومسوق رقمي",
          bio: "مهندس برمجيات متخصص في بناء الحلول الرقمية المتكاملة، أجمع بين دقة الكود واحترافية التسويق الرقمي. أحول الأفكار إلى تطبيقات ذكية وادير حضورك على السوشيال ميديا لضمان نمو علامتك التجارية."
        },
        nl: {
          name: "Aamr Al-Awwad",
          title: "Software Engineer & Digitale Marketeer",
          bio: "Een software engineer gespecialiseerd in het bouwen van geïntegreerde digitale oplossingen. Ik combineer code-precisie met professionaliteit in digitale marketing. Ik zet ideeën om in slimme applicaties en beheer uw aanwezigheid op sociale media om de groei van uw merk te garanderen."
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
      image: "/assets/semple-logo-last-rounded-no-wight-color.png",
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
          setupFeeNote: "No domain or email included — subdomain only",
          features: [
            "Single Informational Page",
            "Basic Logo Placement",
            "Contact Form",
            "Subdomain Hosting (e.g. yourname.axonxcode.com)",
          ],
        },
        ar: {
          name: "الباقة المجانية",
          buttonText: "ابدأ مجاناً",
          setupFeeNote: "بدون دومين أو إيميل مخصص — رابط فرعي فقط",
          features: [
            "صفحة معلوماتية واحدة",
            "وضع لوغو أساسي",
            "نموذج تواصل",
            "استضافة على رابط فرعي (مثل yourname.axonxcode.com)",
          ],
        },
        nl: {
          name: "Gratis Pagina",
          buttonText: "Start Gratis",
          setupFeeNote: "Geen domein of e-mail inbegrepen — alleen subdomein",
          features: [
            "Eén Informatiepagina",
            "Basis Logo Plaatsing",
            "Contactformulier",
            "Subdomein Hosting (bijv. yourname.axonxcode.com)",
          ],
        },
      },
    },
    {
      id: "main-2",
      annualPrice: 150,
      annualTotal: 1650,
      setupFeeAnnual: 120,
      isPopular: true,
      isCustom: false,
      translations: {
        en: {
          name: "Business Growth",
          buttonText: "Get Started",
          setupFeeNote: "One-time setup fee €120",
          features: [
            "5-Page Professional Website",
            "Contact Form + SSL Certificate",
            "CMS Dashboard",
            "Built-in Database — up to 1GB, no extra fees",
            "Hosting + Domain + 1 Official Email",
            "1 Content Edit Monthly",
          ],
        },
        ar: {
          name: "باقة النمو",
          buttonText: "ابدأ الآن",
          setupFeeNote: "رسوم التأسيس 120€ تُدفع مرة واحدة",
          features: [
            "موقع احترافي 5 صفحات",
            "نموذج اتصال + شهادة SSL",
            "لوحة تحكم CMS",
            "قاعدة بيانات مدمجة بدون رسوم إضافية (حتى 1GB)",
            "استضافة + نطاق + إيميل رسمي",
            "تعديل محتوى واحد شهرياً",
          ],
        },
        nl: {
          name: "Business Groei",
          buttonText: "Begin Nu",
          setupFeeNote: "Eenmalige installatiekosten €120",
          features: [
            "Professionele Website 5 Pagina's",
            "Contactformulier + SSL Certificaat",
            "CMS Dashboard",
            "Ingebouwde database — tot 1GB, geen extra kosten",
            "Hosting + Domein + 1 Officieel E-mail",
            "1 Content Update per Maand",
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
            "E-Commerce Development",
            "Custom Web Applications",
            "Business Automation",
            "Technical Problem Solving",
          ],
        },
        ar: {
          name: "الحلول المتقدمة",
          buttonText: "تواصل معنا",
          setupFeeNote: "",
          customPriceLabel: "سعر مخصص",
          features: [
            "تطوير المتاجر الإلكترونية",
            "تطبيقات ويب مخصصة",
            "أتمتة الأعمال",
            "حل المشاكل البرمجية",
          ],
        },
        nl: {
          name: "Maatwerk Oplossingen",
          buttonText: "Neem Contact Op",
          setupFeeNote: "",
          customPriceLabel: "Prijs op Maat",
          features: [
            "E-Commerce Ontwikkeling",
            "Maatwerk Webapplicaties",
            "Bedrijfsautomatisering",
            "Technische Probleemoplossing",
          ],
        },
      },
    },
  ],
  plans: [
    {
      id: "sm-1",
      price: 150,
      isPopular: false,
      translations: {
        en: { name: "Starter Ads", buttonText: "Order Now", features: ["1 Social Channel", "Content Management", "4 Posts Monthly", "Ad Account Setup Creation", "Visual Identity/Logo/Colors Creation +€50"] },
        ar: { name: "الباقة الأساسية", buttonText: "اطلب الآن", features: ["منصة تواصل واحدة", "إدارة المحتوى", "4 منشورات شهرياً", "إنشاء إعدادات الحساب الإعلاني", "إنشاء هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Starter Pakket", buttonText: "Nu Bestellen", features: ["1 Social Media Kanaal", "Contentbeheer", "4 Berichten p/m", "Advertentieaccount Aanmaken", "Visuele Identiteit/Logo/Kleuren Creatie +€50"] }
      }
    },
    {
      id: "sm-2",
      price: 199,
      isPopular: true,
      translations: {
        en: { name: "Grow Plan", buttonText: "Order Now", features: ["1 to 2 Social Channels", "4 Posts Monthly", "Create 1 Ad Campaign Monthly", "Ad Campaign Management", "Create 1 Video Monthly", "Create 4 Stories Monthly", "Visual Identity/Logo/Colors +€50"] },
        ar: { name: "باقة النمو", buttonText: "اطلب الآن", features: ["من 1 إلى 2 منصات تواصل", "4 منشورات شهرياً", "إنشاء حملة إعلانية شهرياً", "إدارة الحملات الإعلانية", "إنشاء 1 فيديو شهرياً", "إنشاء 4 ستوري شهرياً", "هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Groei Pakket", buttonText: "Nu Bestellen", features: ["1 tot 2 Sociale Kanalen", "4 Berichten p/m", "Maak 1 advertentiecampagne per maand", "Advertentiecampagnebeheer", "Maak 1 video per maand", "Maak 4 stories per maand", "Visuele identiteit/logo/kleuren +€50"] }
      }
    },
    {
      id: "sm-3",
      price: 300,
      isPopular: false,
      translations: {
        en: { name: "Pro Plan", buttonText: "Order Now", features: ["1 to 3 Social Channels", "6 Posts Monthly", "Full Advertising Strategy", "Audience Analysis Management", "Create 2 Videos Monthly", "Create 6 Stories Monthly", "Visual Identity/Logo/Colors +€50"] },
        ar: { name: "باقة الاحتراف", buttonText: "اطلب الآن", features: ["من 1 إلى 3 منصات تواصل", "6 منشورات شهرياً", "إستراتيجية إعلانية كاملة", "إنشاء وإدارة تحليل للجمهور", "إنشاء 2 فيديو شهرياً", "إنشاء 6 ستوري شهرياً", "هوية بصرية/شعار/ألوان +€50"] },
        nl: { name: "Pro Pakket", buttonText: "Nu Bestellen", features: ["1 tot 3 Sociale Kanalen", "6 Berichten p/m", "Volledige advertentiestrategie", "Beheer van doelgroepanalyse", "Maak 2 video's per maand", "Maak 6 stories per maand", "Visuele identiteit/logo/kleuren +€50"] }
      }
    }
  ],
  webPlans: [
    {
      id: "web-1",
      price: 499,
      isPopular: false,
      translations: {
        en: { name: "Landing Page", buttonText: "Start Project", features: ["Professional Design", "Mobile Friendly", "Contact Form", "SEO Ready"] },
        ar: { name: "صفحة أساسية", buttonText: "ابدأ مشروعك", features: ["تصميم احترافي", "متوافق مع الجوال", "نموذج تواصل", "تحسين محركات البحث"] },
        nl: { name: "Landingspagina", buttonText: "Project Starten", features: ["Professioneel Design", "Mobielvriendelijk", "Contactformulier", "SEO Klaar"] }
      }
    },
    {
      id: "web-2",
      price: 1299,
      isPopular: true,
      translations: {
        en: { name: "Business Pro", buttonText: "Start Project", features: ["5-8 Pages", "Admin Dashboard", "Multilingual Support", "High Speed", "Database: Free (500MB) / First Year", "Database (optional): 1GB for €7.99/month after the first year"] },
        ar: { name: "باقة الأعمال", buttonText: "ابدأ مشروعك", features: ["5-8 صفحات", "لوحة تحكم كاملة", "دعم لغات متعددة", "سرعة عالية جداً", "قاعدة بيانات: مجانية (500MB) / السنة الأولى", "قاعدة بيانات (اختياري): 1GB بسعر 7.99€/شهر بعد السنة الأولى"] },
        nl: { name: "Business Pro", buttonText: "Project Starten", features: ["5-8 Pagina's", "Admin Dashboard", "Meertalige Ondersteuning", "Hoge Snelheid", "Database: Gratis (500MB) / Eerste Jaar", "Database (optioneel): 1GB voor €7.99/maand na het eerste jaar"] }
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
  ],
  addOns: [
    {
      id: "addon-1",
      price: 45,
      icon: "fa-film",
      duration: "20s",
      translations: {
        en: {
          name: "Promotional Video",
          description: "20-second promotional video — editing and motion graphics only, no on-site filming",
        },
        ar: {
          name: "فيديو إعلاني",
          description: "فيديو إعلاني 20 ثانية — مونتاج وموشن جرافيك فقط، بدون تصوير ميداني",
        },
        nl: {
          name: "Promotievideo",
          description: "20 seconden promotievideo — montage en motion graphics, geen locatieopnames",
        },
      },
    },
    {
      id: "addon-2",
      price: 120,
      icon: "fa-video",
      duration: "60s",
      translations: {
        en: {
          name: "Professional Video",
          description: "60-second professional video — editing and motion graphics only, no on-site filming",
        },
        ar: {
          name: "فيديو احترافي",
          description: "فيديو احترافي 60 ثانية — مونتاج وموشن جرافيك فقط، بدون تصوير ميداني",
        },
        nl: {
          name: "Professionele Video",
          description: "60 seconden professionele video — montage en motion graphics, geen locatieopnames",
        },
      },
    },
    {
      id: "addon-3",
      price: 50,
      icon: "fa-camera",
      translations: {
        en: {
          name: "On-Site Photography",
          description: "Professional on-site photography session — extra service added to any plan",
        },
        ar: {
          name: "تصوير ميداني",
          description: "جلسة تصوير ميدانية احترافية — خدمة إضافية تُضاف على أي باقة",
        },
        nl: {
          name: "Locatiefotografie",
          description: "Professionele locatiefotografiesessie — extra service bij elk pakket",
        },
      },
    },
    {
      id: "addon-4",
      price: 130,
      period: "year",
      icon: "fa-globe",
      translations: {
        en: {
          name: "Domain + Email Hosting",
          description: "Annual domain registration + professional email hosting — for one-time purchase clients or free-plan upgrades",
        },
        ar: {
          name: "استضافة الدومين + الإيميل",
          description: "تسجيل دومين سنوي + استضافة إيميل مهني — لعملاء الشراء المباشر أو ترقية الباقة المجانية",
        },
        nl: {
          name: "Domein + E-mail Hosting",
          description: "Jaarlijkse domeinregistratie + professionele e-mailhosting — voor eenmalige klanten of upgrades van het gratis plan",
        },
      },
    },
    {
      id: "addon-5",
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
      id: "addon-6",
      price: 30,
      period: "month",
      icon: "fa-shield-halved",
      translations: {
        en: {
          name: "Hosting + Maintenance Bundle",
          description: "Domain, email hosting, and monthly maintenance combined",
        },
        ar: {
          name: "باقة الاستضافة + الصيانة الشاملة",
          description: "دومين، استضافة إيميل، وصيانة شهرية مجمّعة",
        },
        nl: {
          name: "Hosting + Onderhoud Bundel",
          description: "Domein, e-mailhosting en maandelijks onderhoud gecombineerd",
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
  }
};
