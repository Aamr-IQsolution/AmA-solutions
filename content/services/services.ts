import type { Service } from '../../types';

export const services: Service[] = [
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
];
