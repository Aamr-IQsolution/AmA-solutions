import type { WorkPrinciple } from '../../types';

export const workPrinciples: WorkPrinciple[] = [
    {
      id: "wp1",
      icon: "fa-ban",
      translations: {
        ar: {
          title: "بدون قوالب جاهزة",
          description:
            "كل مشروع نبنيه من الصفر ليعكس احتياجك الفعلي فقط، بدون الاعتماد على قوالب WordPress أو Elementor الجاهزة.",
        },
        en: {
          title: "No templates, ever",
          description:
            "Every project is built from scratch to reflect exactly what you need, never off-the-shelf WordPress or Elementor templates.",
        },
        nl: {
          title: "Nooit templates",
          description:
            "Elk project wordt vanaf nul gebouwd om precies te weerspiegelen wat u nodig heeft, nooit kant-en-klare WordPress- of Elementor-templates.",
        },
      },
    },
    {
      id: "wp2",
      icon: "fa-shield-halved",
      translations: {
        ar: {
          title: "الأمان من اليوم الأول",
          description:
            "الحماية ليست إضافة لاحقة عندنا، بل جزء أساسي من بنية أي مشروع منذ أول سطر كود.",
        },
        en: {
          title: "Security from day one",
          description:
            "Protection isn't an afterthought here; it's built into every project's architecture from the very first line of code.",
        },
        nl: {
          title: "Beveiliging vanaf dag één",
          description:
            "Bescherming is bij ons geen bijzaak; het maakt vanaf de eerste regel code deel uit van de architectuur van elk project.",
        },
      },
    },
    {
      id: "wp3",
      icon: "fa-comments",
      translations: {
        ar: {
          title: "تواصل مباشر، بدون وسطاء",
          description:
            "تتحدث مباشرة مع من ينفّذ مشروعك فعلياً، بدون طبقات إدارية أو تأخير في اتخاذ القرار.",
        },
        en: {
          title: "Direct communication, no middlemen",
          description:
            "You speak directly with the person actually building your project, with no management layers slowing decisions down.",
        },
        nl: {
          title: "Directe communicatie, geen tussenpersonen",
          description:
            "U spreekt rechtstreeks met degene die uw project daadwerkelijk bouwt, zonder managementlagen die beslissingen vertragen.",
        },
      },
    },
];
