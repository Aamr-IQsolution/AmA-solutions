import type { AddOn } from '../../types';

export const addOns: AddOn[] = [
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
];
