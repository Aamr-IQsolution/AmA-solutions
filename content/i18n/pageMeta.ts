import type { Language } from '../../types';
import type { PageMetaKey } from './pageMetaKey';

export type { PageMetaKey } from './pageMetaKey';

export const PAGE_META: Record<
  PageMetaKey,
  Record<Language, { title: string; description: string }>
> = {
home: {
    nl: {
      title: 'AxonXcode – Webontwikkeling & Maatwerk Software | Heerlen',
      description:
        'Professionele website of maatwerk software nodig? AxonXcode bouwt snelle, SEO-vriendelijke oplossingen voor het MKB in Heerlen, Maastricht en heel Nederland.',
    },
    en: {
      title: 'AxonXcode – Custom Web Development & Software | Netherlands',
      description:
        'AxonXcode builds fast, SEO-friendly websites and custom software for small businesses across the Netherlands, based in Heerlen.',
    },
    ar: {
      title: 'axonXcode – شركة برمجة ذات خبرة عالية وحلول رقمية مخصصة في هولندا',
      description:
        'axonXcode شركة برمجة عربية-هولندية في هولندا، متخصصة في تصميم مواقع احترافية وحلول برمجية مخصصة للشركات الصغيرة والمتوسطة في هيرلن وسائر أنحاء هولندا.',
    },
  },
  services: {
    nl: {
      title: 'Diensten – Webontwikkeling, Maatwerk Software & Beveiliging | AxonXcode',
      description:
        'Ontdek onze diensten: professionele websites, maatwerk webapplicaties, API-koppelingen en digitale beveiliging voor bedrijven in Nederland.',
    },
    en: {
      title: 'Services – Web Development, Custom Software & Security | AxonXcode',
      description:
        "From business websites to custom web applications and API integrations — explore AxonXcode's full range of software development services.",
    },
    ar: {
      title: 'خدماتنا – برمجة مواقع وتطبيقات مخصصة وأمن رقمي | axonXcode',
      description:
        'تصفح خدمات axonXcode: تصميم مواقع احترافية، تطبيقات ويب مخصصة، ربط الأنظمة الخارجية، وحماية رقمية مستمرة لعملك.',
    },
  },
  team: {
    nl: {
      title: 'Ons Team – axonXcode',
      description:
        'Maak kennis met axonXcode, geleid door software-engineer Aamr Al-Awwad, met directe communicatie zonder tussenpersonen voor uw softwareproject.',
    },
    en: {
      title: 'Our Team – axonXcode',
      description:
        'Meet axonXcode, led by software engineer Aamr Al-Awwad, with direct no-middleman communication to build your software project.',
    },
    ar: {
      title: 'فريقنا – axonXcode',
      description:
        'تعرّف على axonXcode، بقيادة مهندس البرمجيات عامر العواد، وتواصل مباشر بدون وسطاء لتنفيذ مشروعك البرمجي.',
    },
  },
  portfolio: {
    nl: {
      title: 'Portfolio – Websites & Software Projecten | AxonXcode',
      description:
        'Bekijk voorbeelden van websites en maatwerk softwareprojecten die AxonXcode heeft ontwikkeld voor klanten in Nederland.',
    },
    en: {
      title: "Portfolio – Websites & Software We've Built | AxonXcode",
      description:
        'Explore real websites and custom software projects delivered by AxonXcode for clients across the Netherlands.',
    },
    ar: {
      title: 'أعمالنا – مواقع وتطبيقات نفّذناها | axonXcode',
      description:
        'استعرض نماذج حقيقية من المواقع والتطبيقات البرمجية التي طوّرتها axonXcode لعملائها في هولندا.',
    },
  },
  pricing: {
    nl: {
      title: 'Prijzen – Website Laten Maken vanaf €1.299 | AxonXcode',
      description:
        'Transparante prijzen voor een professionele website of maatwerk software. Bekijk onze pakketten voor het MKB in Nederland.',
    },
    en: {
      title: 'Pricing – Professional Website from €1,299 | AxonXcode',
      description:
        "Clear, one-time pricing for a professional business website or custom software. See AxonXcode's packages for small businesses.",
    },
    ar: {
      title: 'الأسعار – موقع احترافي بسعر ثابت من 1299€ | axonXcode',
      description:
        'أسعار واضحة وشفافة لموقع احترافي أو حل برمجي مخصص. اطّلع على باقات axonXcode المصممة للشركات الصغيرة والمتوسطة.',
    },
  },
  contact: {
    nl: {
      title: 'Contact – Start Jouw Project met AxonXcode | Heerlen',
      description:
        'Klaar om te starten? Neem contact op met AxonXcode in Heerlen voor een vrijblijvend gesprek over jouw website of softwareproject.',
    },
    en: {
      title: 'Contact AxonXcode – Start Your Project | Heerlen, NL',
      description:
        'Ready to build your website or software? Get in touch with AxonXcode in Heerlen, Netherlands for a free consultation.',
    },
    ar: {
      title: 'تواصل معنا – ابدأ مشروعك مع axonXcode | هيرلن',
      description:
        'جاهز تبدأ مشروعك؟ تواصل مع axonXcode في هيرلن، هولندا، واحصل على استشارة مجانية لموقعك أو حلك البرمجي.',
    },
  },
  cookieSettings: {
    nl: {
      title: 'Cookie-instellingen | AxonXcode',
      description:
        'Beheer uw cookievoorkeuren op de AxonXcode-website: essentiële cookies en optionele Google Analytics.',
    },
    en: {
      title: 'Cookie Settings | AxonXcode',
      description:
        'Manage your cookie preferences on the AxonXcode website: essential cookies and optional Google Analytics.',
    },
    ar: {
      title: 'إعدادات الكوكيز | axonXcode',
      description:
        'أدِر تفضيلات الكوكيز على موقع axonXcode: الكوكيز الأساسية وكوكيز Google Analytics الاختيارية.',
    },
  },
  privacy: {
    nl: {
      title: 'Privacyverklaring | AxonXcode',
      description:
        'Lees hoe AxonXcode persoonsgegevens verwerkt en beschermt wanneer u onze website en diensten gebruikt.',
    },
    en: {
      title: 'Privacy Policy | AxonXcode',
      description:
        'Learn how AxonXcode processes and protects personal data when you use our website and services.',
    },
    ar: {
      title: 'سياسة الخصوصية | axonXcode',
      description:
        'تعرّف على كيفية معالجة axonXcode لبياناتك الشخصية وحمايتها عند استخدام موقعنا وخدماتنا.',
    },
  },
  terms: {
    nl: {
      title: 'Algemene Voorwaarden | AxonXcode',
      description:
        'De algemene voorwaarden voor het gebruik van de AxonXcode-website en onze digitale diensten.',
    },
    en: {
      title: 'Terms & Conditions | AxonXcode',
      description:
        'The terms and conditions that apply when you use the AxonXcode website and our digital services.',
    },
    ar: {
      title: 'الشروط والأحكام | axonXcode',
      description:
        'الشروط والأحكام التي تنطبق عند استخدام موقع axonXcode وخدماتنا الرقمية.',
    },
  },
};
