import type { Language, SectionContent } from '../../types';

export const servicesHeader: Record<Language, SectionContent> = {
    en: { title: "Our Specialized Services", highlight: "Specialized" },
    ar: { title: "خدماتنا المتخصصة", highlight: "المتخصصة" },
    nl: { title: "Onze Gespecialiseerde Diensten", highlight: "Gespecialiseerde" }
};

export const portfolioHeader: Record<Language, SectionContent> = {
    en: { title: "Our Featured Masterpieces", highlight: "Featured", description: "Explore some of our latest digital transformations and success stories." },
    ar: { title: "روائع أعمالنا المختارة", highlight: "المختارة", description: "استكشف بعضًا من أحدث التحولات الرقمية وقصص النجاح لدينا." },
    nl: { title: "Onze Uitgelichte Meesterwerken", highlight: "Uitgelichte", description: "Ontdek enkele van onze nieuwste digital transformaties en success verhalen." }
};

export const teamHeader: Record<Language, SectionContent> = {
    en: { title: "Our Team", highlight: "Team" },
    ar: { title: "فريقنا", highlight: "فريقنا" },
    nl: { title: "Ons Team", highlight: "Team" }
};

export const teamIntro: Record<Language, string> = {
    ar: "axonXcode يقودها مهندس البرمجيات عامر العواد بشكل مباشر — خبرة عملية متخصصة في هندسة البرمجيات وأمن المعلومات، مع تواصل مباشر بدون وسطاء بينك وبين من ينفّذ مشروعك فعلياً. هذا التواصل المباشر يعني قرارات أسرع، فهماً أدق لاحتياجك، ومسؤولية واضحة لا تضيع بين طبقات إدارية. ومقر العمل الرئيسي في هيرلن، هولندا.",
    en: "axonXcode is led directly by software engineer Aamr Al-Awwad — hands-on expertise in software engineering and information security, with direct communication straight to the person actually building your project, no middlemen. That direct line means faster decisions, a sharper understanding of your needs, and clear accountability that never gets lost across management layers. Our main base is Heerlen, the Netherlands.",
    nl: "axonXcode wordt rechtstreeks geleid door software-engineer Aamr Al-Awwad — praktijkgerichte expertise in software-engineering en informatiebeveiliging, met directe communicatie met degene die uw project daadwerkelijk bouwt, zonder tussenpersonen. Deze directe lijn betekent snellere beslissingen, een scherper begrip van uw behoeften, en duidelijke verantwoordelijkheid die nooit verloren gaat in managementlagen. Onze hoofdbasis is Heerlen, Nederland.",
};

export const footer: Record<Language, { copyright: string; credits: string }> = {
    en: { copyright: "All rights reserved", credits: "Designed & Developed by axonXcode" },
    ar: { copyright: "جميع الحقوق محفوظة", credits: "تصميم وتطوير فريق axonXcode" },
    nl: { copyright: "Alle rechten voorbehouden", credits: "Ontworpen en ontwikkeld door axonXcode" }
};
