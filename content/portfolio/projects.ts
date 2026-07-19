import type { Project } from '../../types';

export const portfolio: Project[] = [
    {
      id: "souqeastren",
      coverImage: "/assets/souq-estren/souq-panar.png",
      heroImage: "/assets/souq-estren/souq-hero.png",
      logoImage: "/assets/souq-estren/sq-simple-no-backwightcolor.png",
      galleryImages: [
        "/assets/souq-estren/souq-1-previw.png",
        "/assets/souq-estren/souq-2-previw.png",
        "/assets/souq-estren/souq-3-previw.png",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "shadcn/ui",
        "next-intl",
        "Zustand",
        "Mollie",
        "React PDF",
        "jsPDF",
        "Recharts",
        "Zod",
        "Vercel",
      ],
      translations: {
        ar: {
          title: "SouqEastren — Eastern Souq",
          category: "منصة سوق إلكتروني (Marketplace)",
          shortDescription:
            "منصة وساطة لبقالة أونلاين في هولندا — تربط البقالات بالعملاء مع طلبات، توصيل ديناميكي، دفع، وفواتير قانونية.",
          challenge:
            "الحاجة لمنصة تجمع عدة بقالات في سوق واحد، مع حساب توصيل حسب المسافة، ضرائب BTW الهولندية (9%/21%)، عمولات المنصة، ومدفوعات iDEAL — كل ذلك في نظام واحد متكامل.",
          solution:
            "تطوير منصة Next.js كاملة: سلة وcheckout، Mollie، لوحات تحكم (عميل / صاحب بقالة / مدير / أدمن)، حساب مسافة عبر Nominatim، فواتير PDF، ومدفوعات نصف شهرية للبقالات.",
          statusLabel: "قيد التطوير",
        },
        en: {
          title: "SouqEastren — Eastern Souq",
          category: "Online Marketplace Platform",
          shortDescription:
            "An online grocery marketplace platform in the Netherlands — connecting grocery stores with customers through orders, dynamic delivery, payments, and legal invoicing.",
          challenge:
            "The need for a platform bringing multiple grocery stores together in one marketplace, with distance-based delivery costs, Dutch BTW tax (9%/21%), platform commissions, and iDEAL payments — all within one integrated system.",
          solution:
            "Built a complete Next.js platform: cart and checkout, Mollie integration, multiple dashboards (customer / store owner / manager / admin), Nominatim-based distance calculation, PDF invoicing, and bi-weekly store payouts.",
          statusLabel: "In Development",
        },
        nl: {
          title: "SouqEastren — Eastern Souq",
          category: "Online Marktplaatsplatform",
          shortDescription:
            "Een online marktplaatsplatform voor supermarkten in Nederland — verbindt winkels met klanten via bestellingen, dynamische bezorging, betalingen en wettelijke facturatie.",
          challenge:
            "De behoefte aan een platform dat meerdere supermarkten samenbrengt in één marktplaats, met afstandsgebaseerde bezorgkosten, Nederlandse BTW (9%/21%), platformcommissies en iDEAL-betalingen — allemaal in één geïntegreerd systeem.",
          solution:
            "Ontwikkeling van een volledig Next.js-platform: winkelwagen en checkout, Mollie-integratie, meerdere dashboards (klant / winkeleigenaar / manager / beheerder), afstandsberekening via Nominatim, PDF-facturatie en tweewekelijkse uitbetalingen aan winkels.",
          statusLabel: "In Ontwikkeling",
        },
      },
    },
    {
      id: "alasaylf",
      coverImage: "/assets/asayle-website/Alasyale-panar.png",
      heroImage: "/assets/asayle-website/Alasayl-herp.png",
      logoImage: "/assets/asayle-website/alsayle-logo.png",
      galleryImages: [
        "/assets/asayle-website/asayl-preview-1.png",
        "/assets/asayle-website/asayl-preview-2.png",
        "/assets/asayle-website/asayl-preview-3.png",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "next-intl",
        "React Hook Form",
        "Zod",
        "Resend",
        "React Email",
        "Google Maps API",
        "Swiper",
        "Vercel",
      ],
      link: "https://www.alasaylf.com/",
      translations: {
        ar: {
          title: "Alasayl Transport",
          category: "تصميم مواقع إحترافي",
          shortDescription:
            "موقع احترافي متعدد اللغات لشركة نقل بضائع في هولندا — يعرض الخدمات، الأسطول، الشركاء، ونموذج طلب عرض سعر.",
          challenge:
            "شركة نقل محلية تحتاج حضوراً رقمياً يعكس احترافيتها أمام عملاء B2B وB2C، مع إمكانية التواصل بلغات متعددة (عربي/إنجليزي/هولندي). كانت تعتمد على التواصل التقليدي دون منصة تعريفية موحّدة.",
          solution:
            "بناء موقع Next.js متعدد اللغات مع تصميم احترافي، نماذج تواصل مع إرسال بريد عبر Resend، خرائط Google، وSEO جاهز — مناسب لعرض خدمات النقل والشراكات (Amazon, DHL).",
          statusLabel: "قيد الاستخدام الفعلي",
        },
        en: {
          title: "Alasayl Transport",
          category: "Professional Web Design",
          shortDescription:
            "A professional multilingual website for a freight transport company in the Netherlands — showcasing services, fleet, partners, and a quote request form.",
          challenge:
            "A local transport company needed a digital presence reflecting its professionalism to B2B and B2C clients, with multilingual communication (Arabic/English/Dutch). It previously relied on traditional communication without a unified presentation platform.",
          solution:
            "Built a multilingual Next.js website with professional design, contact forms with email delivery via Resend, Google Maps integration, and SEO-ready structure — suited for showcasing transport services and partnerships (Amazon, DHL).",
          statusLabel: "Actively In Use",
        },
        nl: {
          title: "Alasayl Transport",
          category: "Professioneel Webdesign",
          shortDescription:
            "Een professionele meertalige website voor een vrachtvervoerbedrijf in Nederland — met diensten, wagenpark, partners en een offerteaanvraagformulier.",
          challenge:
            "Een lokaal transportbedrijf had een digitale aanwezigheid nodig die professionaliteit uitstraalt naar B2B- en B2C-klanten, met meertalige communicatie (Arabisch/Engels/Nederlands). Voorheen werd vertrouwd op traditionele communicatie zonder uniform presentatieplatform.",
          solution:
            "Ontwikkeling van een meertalige Next.js-website met professioneel ontwerp, contactformulieren met e-mailverzending via Resend, Google Maps-integratie en SEO-gereed — geschikt voor het presenteren van transportdiensten en partnerschappen (Amazon, DHL).",
          statusLabel: "Actief In Gebruik",
        },
      },
    },
    {
      id: "my-work",
      hasFictionalData: true,
      coverImage: "/assets/my-work/mywork-panar.png",
      heroImage: "/assets/my-work/mywork-hero.png",
      logoImage: "/assets/my-work/mywork-logo.png",
      galleryImages: [
        "/assets/my-work/mywork-preview-1.png",
        "/assets/my-work/mywork-preview-2.png",
        "/assets/my-work/mywork-preview-3.png",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Supabase",
        "Express",
        "Supabase Edge Functions",
        "AWS Textract",
        "PWA",
        "Vercel",
      ],
      translations: {
        ar: {
          title: "My-Work",
          category: "نظام إدارة موارد بشرية",
          shortDescription:
            "تطبيق ويب داخلي لجدولة السائقين وإدارة الرواتب الأسبوعية — للمديرين والسائقين في بيئة ZZP.",
          challenge:
            "شركة نقل تعتمد على جداول يدوية وملفات PDF لكشوف الرواتب — عملية بطيئة وعرضة للأخطاء، بدون ربط بين الموظفين والبيانات المالية.",
          solution:
            "تطبيق React + Supabase مع جدولة ISO-8601، نظام رواتب ذكي (رفع PDF → AWS Textract → ربط تلقائي برقم الراتب)، توقيع رقمي، وإشعارات فورية — PWA للموبايل.",
          statusLabel: "تطبيق داخلي/خاص لعميل",
        },
        en: {
          title: "My-Work",
          category: "HR Management System",
          shortDescription:
            "An internal web app for driver scheduling and weekly payroll management — for managers and drivers in a ZZP environment.",
          challenge:
            "A transport company relied on manual schedules and PDF payslips — a slow, error-prone process with no link between employees and financial data.",
          solution:
            "A React + Supabase application with ISO-8601 scheduling, a smart payroll system (PDF upload → AWS Textract → automatic payslip linking), digital signatures, and instant notifications — built as a PWA for mobile.",
          statusLabel: "Private Internal Client Application",
        },
        nl: {
          title: "My-Work",
          category: "HR-beheersysteem",
          shortDescription:
            "Een interne webapp voor het inplannen van chauffeurs en het beheren van wekelijkse loonadministratie — voor managers en chauffeurs in een ZZP-omgeving.",
          challenge:
            "Een transportbedrijf vertrouwde op handmatige roosters en PDF-loonstroken — een traag en foutgevoelig proces zonder koppeling tussen medewerkers en financiële gegevens.",
          solution:
            "Een React + Supabase-applicatie met ISO-8601-planning, een slim loonsysteem (PDF-upload → AWS Textract → automatische koppeling aan loonstrook), digitale handtekening en directe meldingen — gebouwd als PWA voor mobiel.",
          statusLabel: "Privé Interne Klanttoepassing",
        },
      },
    },
    {
      id: "ms-phone-store",
      coverImage: "/assets/ms-phone-store/ms-panar.png",
      heroImage: "/assets/ms-phone-store/ms-hero.png",
      logoImage: "/assets/ms-phone-store/ms-fage-logo.png",
      galleryImages: [
        "/assets/ms-phone-store/ms-preview-1.png",
        "/assets/ms-phone-store/ms-preview-2.png",
        "/assets/ms-phone-store/ms-preview-3.png",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "shadcn/ui",
        "next-intl",
        "TipTap",
        "Framer Motion",
        "yet-another-react-lightbox",
        "Zod",
        "Vercel",
      ],
      link: "https://m-s-phone-store.vercel.app/",
      translations: {
        ar: {
          title: "M&S Phone Store",
          category: "موقع تجاري بكتالوج منتجات",
          shortDescription:
            "موقع متجر جوالات في Hoensbroek — إصلاح، إكسسوارات، أجهزة مستعملة، مع لوحة تحكم لإدارة المنتجات والمحتوى.",
          challenge:
            "محل جوالات محلي يحتاج موقعاً يعرض خدماته ومنتجاته بلغات متعددة، مع إمكانية تحديث الأسعار والمحتوى دون الاعتماد على مطوّر في كل مرة.",
          solution:
            "تطوير موقع احترافي ثلاثي اللغات (هولندي/إنجليزي/عربي)، مع موديول منتجات وصفحات محسّنة لمحركات البحث، لوحة تحكم لإدارة المحتوى، زر تواصل مباشر عبر واتساب، ومحتوى غني بالصور مع إمكانية التكبير.",
          statusLabel: "تم التصميم والتطوير بالكامل، بانتظار تفعيل العميل",
        },
        en: {
          title: "M&S Phone Store",
          category: "Business Website with Product Catalog",
          shortDescription:
            "A mobile phone store website in Hoensbroek — repairs, accessories, used devices, with a dashboard for managing products and content.",
          challenge:
            "A local phone store needed a website to showcase its services and products in multiple languages, with the ability to update prices and content without relying on a developer each time.",
          solution:
            "Built a professional trilingual website (Dutch/English/Arabic), with a product module and SEO-optimized pages, a content management dashboard, a direct WhatsApp contact button, and rich media content with image zoom.",
          statusLabel: "Fully Designed & Developed, Awaiting Client Activation",
        },
        nl: {
          title: "M&S Phone Store",
          category: "Bedrijfswebsite met Productcatalogus",
          shortDescription:
            "Een website voor een telefoonwinkel in Hoensbroek — reparaties, accessoires, gebruikte toestellen, met een dashboard voor het beheren van producten en content.",
          challenge:
            "Een lokale telefoonwinkel had een website nodig om diensten en producten in meerdere talen te presenteren, met de mogelijkheid om prijzen en content zelf bij te werken zonder telkens een developer nodig te hebben.",
          solution:
            "Ontwikkeling van een professionele drietalige website (Nederlands/Engels/Arabisch), met een productmodule en SEO-geoptimaliseerde pagina's, een dashboard voor contentbeheer, een directe WhatsApp-contactknop, en rijke media-content met inzoomfunctie.",
          statusLabel: "Volledig Ontworpen & Ontwikkeld, In Afwachting van Klantactivering",
        },
      },
    },
];
