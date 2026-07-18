import type { Language } from '../types';

export type LegalSection = {
  /** Unique section id used as in-page anchor, e.g. `section-1` */
  id: string;
  heading: string;
  body: string;
};

export type LegalPageContent = Record<
  Language,
  {
    pageTitle: string;
    lastUpdated: string;
    sections: LegalSection[];
  }
>;

const PRIVACY_EMAIL = 'Aamr.alawad@gmail.com';

export const privacyContent: LegalPageContent = {
  ar: {
    pageTitle: 'سياسة الخصوصية',
    lastUpdated: '17 يوليو 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. من نحن',
        body: `axonXcode جهة تقدّم خدمات تطوير مواقع وحلول برمجية، يديرها عامر العواد، ومقرّها هيرلن، هولندا (Heerlen, Nederland). axonXcode حالياً "شركة قيد التأسيس" (i.o. / in oprichting)، ولم تُسجَّل بعد رسمياً في غرفة التجارة الهولندية (KvK).

للتواصل بخصوص أي استفسار متعلق بالخصوصية: ${PRIVACY_EMAIL}.`,
      },
      {
        id: 'section-2',
        heading: '2. البيانات التي نجمعها',
        body: `عند استخدامك نموذج التواصل، نجمع: الاسم، البريد الإلكتروني، رقم الهاتف (اختياري)، ومحتوى الرسالة. عند موافقتك على الكوكيز التحليلية، نستخدم Google Analytics لجمع بيانات مجهولة نسبياً حول تصفحك (الصفحات المُزارة، مدة الزيارة، الجهاز تقريباً).`,
      },
      {
        id: 'section-3',
        heading: '3. كيف نستخدم بياناتك والأساس القانوني',
        body: `• الرد على استفسارك: نُعالج هذه البيانات بناءً على "اتخاذ خطوات تمهيدية قبل إبرام عقد"، أو بناءً على "المصلحة المشروعة" في التواصل مع العملاء المحتملين والرد عليهم.
• تحسين أداء الموقع (Google Analytics): يُعالج فقط بناءً على "موافقتك الصريحة" (Toestemming) عبر بانر الكوكيز، وقابلة للسحب في أي وقت.
• الامتثال القانوني: بناءً على "الالتزام القانوني" (Wettelijke verplichting) إن وُجد (مثل الاحتفاظ بسجلات مالية لأغراض ضريبية إذا أصبحت عميلاً فعلياً).`,
      },
      {
        id: 'section-4',
        heading: '4. الجهات التي قد تُعالج بياناتك (Third-Party Processors)',
        body: `• Resend — إرسال رسائل البريد الناتجة عن نموذج التواصل.
• Google Analytics — فقط عند موافقتك على الكوكيز التحليلية.
• Vercel — استضافة الموقع والبنية التحتية.
• Upstash — تخزين تقني مؤقت لمنع إساءة استخدام نموذج التواصل، لا يخزّن محتوى رسائلك.

قد تُعالج بعض هذه الجهات البيانات على خوادم خارج الاتحاد الأوروبي، وتلتزم بضمانات نقل بيانات معتمدة.`,
      },
      {
        id: 'section-5',
        heading: '5. مدة الاحتفاظ بالبيانات',
        body: `• رسائل التواصل التي لم تتحول لعلاقة عمل فعلية: تُحذف خلال 24 شهراً كحد أقصى من تاريخ آخر تواصل.
• إذا أصبحت عميلاً فعلياً: تُحفظ بياناتك المالية والضريبية للمدة الإلزامية قانونياً وهي 7 سنوات (متطلبات مصلحة الضرائب الهولندية - Belastingdienst).
• بيانات Google Analytics: تُحفظ لمدة 14 شهراً وفق الإعداد الحالي في لوحة تحكم GA4، ثم تُحذف تلقائياً وفق سياسة Google.`,
      },
      {
        id: 'section-6',
        heading: '6. حقوقك بموجب GDPR',
        body: `يحق لك: الوصول لبياناتك، تصحيحها، طلب حذفها، الاعتراض على معالجتها، وسحب موافقتك على الكوكيز التحليلية في أي وقت. لممارسة أي من هذه الحقوق، راسلنا على ${PRIVACY_EMAIL}. كما يحق لك تقديم شكوى إلى Autoriteit Persoonsgegevens (الجهة الرقابية الهولندية لحماية البيانات).`,
      },
      {
        id: 'section-7',
        heading: '7. الكوكيز',
        body: `نستخدم كوكيز أساسية لتشغيل الموقع (لا يمكن إيقافها)، وكوكيز تحليلية اختيارية (Google Analytics) لا تُفعَّل إلا بموافقتك الصريحة عند أول زيارة عبر بانر الكوكيز. يمكنك تغيير قرارك بخصوص الكوكيز التحليلية في أي وقت لاحقاً عبر صفحة إعدادات الكوكيز، المتاحة من تذييل الموقع.`,
      },
      {
        id: 'section-8',
        heading: '8. خصوصية الأطفال',
        body: `هذا الموقع موجّه للشركات والأفراد البالغين، ولا نستهدف جمع بيانات من قاصرين عن علم.`,
      },
      {
        id: 'section-9',
        heading: '9. تعديلات على هذه السياسة',
        body: `قد نُحدّث هذه السياسة من وقت لآخر؛ سيُنشر أي تعديل جوهري بتاريخ تحديث واضح في هذه الصفحة.`,
      },
    ],
  },
  en: {
    pageTitle: 'Privacy Policy',
    lastUpdated: '17 July 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. Who We Are',
        body: `axonXcode is a provider of website development and custom software services, operated by Aamr Al-Awwad, based in Heerlen, the Netherlands. axonXcode is currently a "company in formation" (i.o.) and has not yet been formally registered with the Dutch Chamber of Commerce (KvK).

For any privacy-related inquiry, contact us at: ${PRIVACY_EMAIL}.`,
      },
      {
        id: 'section-2',
        heading: '2. Data We Collect',
        body: `When you use our contact form, we collect: your name, email address, phone number (optional), and message content. When you consent to analytics cookies, we use Google Analytics to collect relatively anonymized data about your browsing (pages visited, session duration, approximate device type).`,
      },
      {
        id: 'section-3',
        heading: '3. How We Use Your Data and Legal Basis',
        body: `• Responding to your inquiry: processed on the basis of "taking pre-contractual steps", or on the basis of "legitimate interest" in communicating with and responding to prospective clients.
• Improving website performance (Google Analytics): processed only on the basis of your explicit consent (Toestemming) via the cookie banner, which may be withdrawn at any time.
• Legal compliance: on the basis of a legal obligation (Wettelijke verplichting), where applicable (e.g., retaining financial records for tax purposes if you become an actual client).`,
      },
      {
        id: 'section-4',
        heading: '4. Third-Party Processors',
        body: `• Resend — sending emails generated by the contact form.
• Google Analytics — only when you consent to analytics cookies.
• Vercel — website hosting and infrastructure.
• Upstash — temporary technical storage to prevent abuse of the contact form; does not store your message content.

Some of these processors may process data on servers outside the European Union, subject to approved data transfer safeguards.`,
      },
      {
        id: 'section-5',
        heading: '5. Data Retention',
        body: `• Contact messages that do not result in a business relationship: deleted within a maximum of 24 months from the date of last contact.
• If you become an actual client: your financial and tax data will be retained for the legally required period of 7 years (Dutch Tax Authority – Belastingdienst requirements).
• Google Analytics data: retained for 14 months per the current GA4 dashboard configuration, then automatically deleted per Google's policy.`,
      },
      {
        id: 'section-6',
        heading: '6. Your GDPR Rights',
        body: `You have the right to: access your data, correct it, request its deletion, object to its processing, and withdraw your consent to analytics cookies at any time. To exercise any of these rights, contact us at: ${PRIVACY_EMAIL}. You also have the right to file a complaint with the Autoriteit Persoonsgegevens (the Dutch Data Protection Authority).`,
      },
      {
        id: 'section-7',
        heading: '7. Cookies',
        body: `We use essential cookies to operate the website (which cannot be disabled), and optional analytics cookies (Google Analytics) which are only activated with your explicit consent on your first visit via the cookie banner. You can change your decision regarding analytics cookies at any time via our Cookie Settings page, available in the website footer.`,
      },
      {
        id: 'section-8',
        heading: "8. Children's Privacy",
        body: `This website is intended for businesses and adults, and we do not knowingly seek to collect data from minors.`,
      },
      {
        id: 'section-9',
        heading: '9. Changes to This Policy',
        body: `We may update this policy from time to time; any material change will be published on this page with a clear update date.`,
      },
    ],
  },
  nl: {
    pageTitle: 'Privacyverklaring',
    lastUpdated: '17 juli 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. Wie Wij Zijn',
        body: `axonXcode is een aanbieder van websiteontwikkeling en maatwerk softwarediensten, geleid door Aamr Al-Awwad, gevestigd in Heerlen, Nederland. axonXcode is momenteel een "onderneming in oprichting" (i.o.) en is nog niet formeel ingeschreven bij de Kamer van Koophandel (KvK).

Voor privacygerelateerde vragen kunt u contact met ons opnemen via: ${PRIVACY_EMAIL}.`,
      },
      {
        id: 'section-2',
        heading: '2. Welke Gegevens Wij Verzamelen',
        body: `Bij gebruik van ons contactformulier verzamelen wij: uw naam, e-mailadres, telefoonnummer (optioneel) en berichtinhoud. Bij toestemming voor analytische cookies gebruiken wij Google Analytics om relatief geanonimiseerde gegevens te verzamelen over uw surfgedrag (bezochte pagina's, sessieduur, bij benadering gebruikt apparaat).`,
      },
      {
        id: 'section-3',
        heading: '3. Hoe Wij Uw Gegevens Gebruiken en de Rechtsgrond',
        body: `• Reageren op uw vraag: verwerkt op basis van "het nemen van precontractuele maatregelen", of op basis van "gerechtvaardigd belang" bij communicatie met en reactie op potentiële klanten.
• Verbeteren van de websiteprestaties (Google Analytics): uitsluitend verwerkt op basis van uw uitdrukkelijke toestemming via de cookiebanner, welke te allen tijde kan worden ingetrokken.
• Wettelijke naleving: op basis van een wettelijke verplichting, indien van toepassing (bijvoorbeeld het bewaren van financiële gegevens voor belastingdoeleinden indien u daadwerkelijk klant wordt).`,
      },
      {
        id: 'section-4',
        heading: '4. Verwerkers van Derden',
        body: `• Resend — het versturen van e-mails die voortkomen uit het contactformulier.
• Google Analytics — uitsluitend bij toestemming voor analytische cookies.
• Vercel — hosting van de website en infrastructuur.
• Upstash — tijdelijke technische opslag ter voorkoming van misbruik van het contactformulier; slaat uw berichtinhoud niet op.

Sommige van deze verwerkers kunnen gegevens verwerken op servers buiten de Europese Unie, met inachtneming van goedgekeurde waarborgen voor gegevensdoorgifte.`,
      },
      {
        id: 'section-5',
        heading: '5. Bewaartermijnen',
        body: `• Contactberichten die niet resulteren in een zakelijke relatie: worden verwijderd binnen maximaal 24 maanden na de datum van laatste contact.
• Indien u daadwerkelijk klant wordt: uw financiële en fiscale gegevens worden bewaard gedurende de wettelijk verplichte termijn van 7 jaar (vereisten van de Belastingdienst).
• Google Analytics-gegevens: worden bewaard gedurende 14 maanden conform de huidige GA4-dashboardinstelling, en daarna automatisch verwijderd volgens het beleid van Google.`,
      },
      {
        id: 'section-6',
        heading: '6. Uw Rechten Onder de AVG',
        body: `U heeft het recht om: uw gegevens in te zien, te corrigeren, verwijdering ervan te verzoeken, bezwaar te maken tegen de verwerking ervan, en uw toestemming voor analytische cookies te allen tijde in te trekken. Om een van deze rechten uit te oefenen, neemt u contact met ons op via: ${PRIVACY_EMAIL}. U heeft tevens het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.`,
      },
      {
        id: 'section-7',
        heading: '7. Cookies',
        body: `Wij gebruiken functionele cookies om de website te laten werken (deze kunnen niet worden uitgeschakeld), en optionele analytische cookies (Google Analytics) die uitsluitend worden geactiveerd na uw uitdrukkelijke toestemming bij uw eerste bezoek via de cookiebanner. U kunt uw keuze omtrent analytische cookies te allen tijde wijzigen via onze pagina Cookie-instellingen, beschikbaar in de footer van de website.`,
      },
      {
        id: 'section-8',
        heading: '8. Privacy van Kinderen',
        body: `Deze website is gericht op bedrijven en volwassenen, en wij beogen niet bewust gegevens van minderjarigen te verzamelen.`,
      },
      {
        id: 'section-9',
        heading: '9. Wijzigingen in Dit Beleid',
        body: `Wij kunnen dit beleid van tijd tot tijd bijwerken; elke materiële wijziging wordt op deze pagina gepubliceerd met een duidelijke bijwerkingsdatum.`,
      },
    ],
  },
};

export const termsContent: LegalPageContent = {
  ar: {
    pageTitle: 'الشروط والأحكام',
    lastUpdated: '17 يوليو 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. من نحن ونطاق التطبيق',
        body: `هذه الشروط تحكم استخدامك لموقع axonXcode وأي خدمة برمجية أو تصميم موقع تطلبها منّا. يدير axonXcode السيد عامر العواد.

axonXcode حالياً "شركة قيد التأسيس" (i.o. / in oprichting) — لم يتم بعد تسجيلها رسمياً في غرفة التجارة الهولندية (KvK). بموجب القانون الهولندي، خلال هذه المرحلة يتحمّل عامر العواد بصفته الشخصية مسؤولية تضامنية كاملة (Hoofdelijke aansprakelijkheid) عن أي عقد يُبرم، حتى يتم التسجيل الرسمي وتتبنى الشركة المُسجَّلة هذا العقد رسمياً. بمجرد التسجيل، سيُحدَّث هذا البند تلقائياً بمعلومات الشركة الرسمية ورقم KvK.

هذه الشروط موجّهة للتعامل بصفة أعمال (B2B).`,
      },
      {
        id: 'section-2',
        heading: '2. الخدمات المقدَّمة',
        body: `كما هو موضّح في صفحة الأسعار وقت الطلب: تصميم مواقع احترافية (باقة الأعمال)، حلول برمجية مخصصة (الحلول المتقدمة)، وصيانة/استضافة شهرية اختيارية.`,
      },
      {
        id: 'section-3',
        heading: '3. الأسعار والضريبة',
        body: `• جميع الأسعار المذكورة في الموقع لا تشمل ضريبة القيمة المضافة (Exclusief BTW)، ما لم يُنص صراحة على خلاف ذلك.
• باقة الأعمال: سعر ثابت لمرة واحدة (1,299€ + BTW، وقت كتابة هذا النص).
• الحلول المتقدمة: سعر مخصص حسب نطاق كل مشروع، متفق عليه كتابياً مسبقاً.`,
      },
      {
        id: 'section-4',
        heading: '4. شروط الدفع',
        body: `• الدفع يتم على مراحل متفق عليها كتابياً (دفعة عند البدء، دفعة عند التسليم، ما لم يُتفق على غير ذلك).
• مهلة السداد: 14 يوماً من تاريخ الفاتورة.
• في حال التأخر عن السداد بعد انتهاء هذه المهلة، يحق لـ axonXcode المطالبة بـ الفائدة التجارية القانونية (Wettelijke handelsrente)، بالإضافة إلى أي تكاليف تحصيل معقولة تنشأ عن ذلك.
• لا استرجاع للمبالغ المدفوعة عن مراحل عمل منجزة فعلياً.`,
      },
      {
        id: 'section-5',
        heading: '5. الملكية الفكرية',
        body: `الكود المصدري وأي عمل برمجي أو تصميمي يبقى ملكية فكرية كاملة لـ axonXcode، ما لم يُتفق كتابياً على خلاف ذلك. يحصل العميل على حق استخدام غير حصري وغير قابل للتحويل (Niet-exclusief en niet-overdraagbaar gebruiksrecht) للموقع/التطبيق النهائي المُسلَّم، لغرض تشغيل عمله فقط — دون أي حق في بيع، نسخ، أو إعادة استخدام الكود أو التصميم لمشاريع أو أطراف أخرى.`,
      },
      {
        id: 'section-6',
        heading: '6. مسؤوليات العميل والتعويض (Vrijwaring)',
        body: `العميل مسؤول عن دقة أي محتوى أو صور أو مواد يقدّمها لإضافتها في موقعه. العميل يتعهد بتعويض وحماية (vrijwaart) axonXcode من أي مطالبة قانونية من طرف ثالث تنشأ عن انتهاك حقوق ملكية فكرية أو حقوق أخرى لأي محتوى قدّمه العميل بنفسه.`,
      },
      {
        id: 'section-7',
        heading: '7. حدود المسؤولية',
        body: `• لا نضمن تشغيلاً متواصلاً بنسبة 100%، لاعتمادنا على مزودي خدمات خارجيين (Vercel، Resend) خارج سيطرتنا المباشرة.
• مسؤوليتنا في أي حال محدودة بالحد الذي يسمح به القانون الهولندي، ولا تتجاوز قيمة المبلغ المدفوع فعلياً عن الخدمة محل النزاع.
• تُستبعد صراحة أي أضرار تبعية أو غير مباشرة (Gevolgschade)، بما في ذلك على سبيل المثال لا الحصر: خسارة الأرباح المتوقعة، وفقدان البيانات (Verlies van data)، ما لم ينص القانون الهولندي على خلاف ذلك بشكل إلزامي.`,
      },
      {
        id: 'section-8',
        heading: '8. تعليق أو إنهاء الخدمة',
        body: `يحق لنا تعليق أو إنهاء الخدمة فوراً بإشعار معقول في حال إساءة الاستخدام، الاستخدام لأغراض غير قانونية، أو عدم السداد. كما يحق لنا إنهاء العقد فوراً ومن جانب واحد وبدون الحاجة لتدخل قضائي، في حال إعلان إفلاس العميل (Faillissement) أو تقديمه طلب تعليق السداد (Surseance van betaling).`,
      },
      {
        id: 'section-9',
        heading: '9. القانون المطبَّق والاختصاص القضائي',
        body: `تخضع هذه الشروط للقانون الهولندي حصراً. أي نزاع يُحال حصرياً إلى محكمة ليمبورخ (Rechtbank Limburg).`,
      },
      {
        id: 'section-10',
        heading: '10. تعديلات على هذه الشروط',
        body: `قد نُحدّث هذه الشروط من وقت لآخر؛ سيُنشر أي تعديل جوهري بتاريخ تحديث واضح في هذه الصفحة.`,
      },
    ],
  },
  en: {
    pageTitle: 'Terms & Conditions',
    lastUpdated: '17 July 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. Who We Are and Scope',
        body: `These Terms govern your use of the axonXcode website and any software or website development service you request from us. axonXcode is operated by Aamr Al-Awwad.

axonXcode is currently a "company in formation" (i.o.) and has not yet been formally registered with the Dutch Chamber of Commerce (KvK). Under Dutch law, during this stage the acting director bears full personal joint liability (Hoofdelijke aansprakelijkheid) for any contract entered into, until formal registration and adoption of the contract by the registered company. This clause will be updated with full official company details once registration is completed.

These Terms are intended for business-to-business (B2B) dealings.`,
      },
      {
        id: 'section-2',
        heading: '2. Services Provided',
        body: `As described on the pricing page at the time of order: professional website design (Business Pro package), custom software solutions (Custom Solutions), and optional monthly maintenance/hosting.`,
      },
      {
        id: 'section-3',
        heading: '3. Prices and VAT',
        body: `• All prices listed on the website exclude VAT (Exclusief BTW), unless explicitly stated otherwise.
• Business Pro package: fixed one-time price (€1,299 + VAT, at the time of writing).
• Custom Solutions: custom pricing based on project scope, agreed in writing in advance.`,
      },
      {
        id: 'section-4',
        heading: '4. Payment Terms',
        body: `• Payment is made in stages agreed in writing (e.g., a deposit at the start, a payment on delivery), unless otherwise agreed.
• Payment term: 14 days from the invoice date.
• If payment is not received after this term, axonXcode is entitled to charge statutory commercial interest (Wettelijke handelsrente), plus any reasonable collection costs incurred.
• No refunds for payments made for work stages already completed.`,
      },
      {
        id: 'section-5',
        heading: '5. Intellectual Property',
        body: `Source code and any software or design work remain the full intellectual property of axonXcode, unless otherwise agreed in writing. The client receives a non-exclusive, non-transferable right of use (Niet-exclusief en niet-overdraagbaar gebruiksrecht) for the delivered final website/application, solely to operate their business — with no right to sell, copy, or reuse the code or design for other projects or third parties.`,
      },
      {
        id: 'section-6',
        heading: '6. Client Responsibilities and Indemnification',
        body: `The client is responsible for the accuracy of any content, images, or materials they provide for inclusion on their website. The client agrees to indemnify and hold harmless (vrijwaart) axonXcode from any third-party legal claim arising from infringement of intellectual property or other rights related to content the client has supplied themselves.`,
      },
      {
        id: 'section-7',
        heading: '7. Limitation of Liability',
        body: `• We do not guarantee 100% uninterrupted uptime, as we rely on third-party service providers (Vercel, Resend) outside our direct control.
• Our liability is, in any case, limited to the extent permitted by Dutch law, and shall not exceed the amount actually paid for the service in dispute.
• Indirect or consequential damages (Gevolgschade) are explicitly excluded, including but not limited to loss of expected profit and data loss (Verlies van data), unless mandatorily required otherwise by Dutch law.`,
      },
      {
        id: 'section-8',
        heading: '8. Suspension or Termination of Service',
        body: `We reserve the right to suspend or terminate service, with reasonable prior notice, in the event of misuse, unlawful use, or non-payment. We are also entitled to terminate the agreement immediately, unilaterally, and without judicial intervention, in the event the client is declared bankrupt (Faillissement) or files for suspension of payment (Surseance van betaling).`,
      },
      {
        id: 'section-9',
        heading: '9. Governing Law and Jurisdiction',
        body: `These Terms are governed exclusively by Dutch law. Any dispute shall be submitted exclusively to the Rechtbank Limburg (District Court of Limburg).`,
      },
      {
        id: 'section-10',
        heading: '10. Amendments',
        body: `We may update these Terms from time to time; any material change will be published on this page with a clear update date.`,
      },
    ],
  },
  nl: {
    pageTitle: 'Algemene Voorwaarden',
    lastUpdated: '17 juli 2026',
    sections: [
      {
        id: 'section-1',
        heading: '1. Wie Wij Zijn en Toepassingsgebied',
        body: `Deze voorwaarden zijn van toepassing op uw gebruik van de axonXcode-website en op elke software- of websiteontwikkelingsdienst die u bij ons afneemt. axonXcode wordt geleid door Aamr Al-Awwad.

axonXcode is momenteel een "onderneming in oprichting" (i.o.) en is nog niet formeel ingeschreven bij de Kamer van Koophandel (KvK). Volgens Nederlands recht draagt de handelende bestuurder tijdens deze fase volledige hoofdelijke aansprakelijkheid voor elke overeenkomst die wordt aangegaan, totdat de formele inschrijving heeft plaatsgevonden en de ingeschreven onderneming de overeenkomst overneemt. Dit artikel wordt bijgewerkt met volledige officiële bedrijfsgegevens zodra de inschrijving is voltooid.

Deze voorwaarden zijn bedoeld voor zakelijke (B2B) dienstverlening.`,
      },
      {
        id: 'section-2',
        heading: '2. Geleverde Diensten',
        body: `Zoals beschreven op de prijzenpagina ten tijde van bestelling: professioneel websiteontwerp (Business Pro-pakket), maatwerk softwareoplossingen (Maatwerk Oplossingen), en optioneel maandelijks onderhoud/hosting.`,
      },
      {
        id: 'section-3',
        heading: '3. Prijzen en BTW',
        body: `• Alle op de website vermelde prijzen zijn exclusief BTW, tenzij uitdrukkelijk anders vermeld.
• Business Pro-pakket: vaste eenmalige prijs (€1.299 + BTW, op moment van schrijven).
• Maatwerk Oplossingen: prijs op maat op basis van projectomvang, vooraf schriftelijk overeengekomen.`,
      },
      {
        id: 'section-4',
        heading: '4. Betalingsvoorwaarden',
        body: `• Betaling vindt plaats in schriftelijk overeengekomen termijnen (bijvoorbeeld een aanbetaling bij aanvang, een betaling bij oplevering), tenzij anders overeengekomen.
• Betalingstermijn: 14 dagen na factuurdatum.
• Bij het uitblijven van betaling na deze termijn is axonXcode gerechtigd de wettelijke handelsrente in rekening te brengen, plus eventuele redelijke incassokosten.
• Geen restitutie van betalingen voor reeds uitgevoerde werkfases.`,
      },
      {
        id: 'section-5',
        heading: '5. Intellectueel Eigendom',
        body: `Broncode en al het software- of ontwerpwerk blijven volledig intellectueel eigendom van axonXcode, tenzij schriftelijk anders overeengekomen. De klant ontvangt een niet-exclusief en niet-overdraagbaar gebruiksrecht voor de opgeleverde website/applicatie, uitsluitend voor het exploiteren van zijn eigen onderneming — zonder enig recht om de code of het ontwerp te verkopen, te kopiëren of te hergebruiken voor andere projecten of derden.`,
      },
      {
        id: 'section-6',
        heading: '6. Verantwoordelijkheden van de Klant en Vrijwaring',
        body: `De klant is verantwoordelijk voor de juistheid van alle content, afbeeldingen of materialen die hij aanlevert voor plaatsing op zijn website. De klant vrijwaart axonXcode voor elke claim van derden die voortvloeit uit inbreuk op intellectuele eigendomsrechten of andere rechten met betrekking tot door de klant zelf aangeleverde content.`,
      },
      {
        id: 'section-7',
        heading: '7. Aansprakelijkheid',
        body: `• Wij garanderen geen 100% ononderbroken beschikbaarheid, aangezien wij afhankelijk zijn van externe dienstverleners (Vercel, Resend) buiten onze directe controle.
• Onze aansprakelijkheid is in ieder geval beperkt tot hetgeen wettelijk is toegestaan, en bedraagt nooit meer dan het daadwerkelijk betaalde bedrag voor de dienst waarop het geschil betrekking heeft.
• Gevolgschade wordt uitdrukkelijk uitgesloten, waaronder begrepen doch niet beperkt tot gederfde winst en verlies van data, tenzij dwingend Nederlands recht anders bepaalt.`,
      },
      {
        id: 'section-8',
        heading: '8. Opschorting of Beëindiging van de Dienst',
        body: `Wij behouden ons het recht voor de dienstverlening op te schorten of te beëindigen, met redelijke voorafgaande kennisgeving, bij misbruik, onrechtmatig gebruik of wanbetaling. Wij zijn tevens gerechtigd de overeenkomst onmiddellijk, eenzijdig en zonder rechterlijke tussenkomst te beëindigen indien de klant failliet wordt verklaard (Faillissement) of surseance van betaling aanvraagt.`,
      },
      {
        id: 'section-9',
        heading: '9. Toepasselijk Recht en Bevoegde Rechter',
        body: `Op deze voorwaarden is uitsluitend Nederlands recht van toepassing. Elk geschil wordt exclusief voorgelegd aan de Rechtbank Limburg.`,
      },
      {
        id: 'section-10',
        heading: '10. Wijzigingen',
        body: `Wij kunnen deze voorwaarden van tijd tot tijd bijwerken; elke materiële wijziging wordt op deze pagina gepubliceerd met een duidelijke bijwerkingsdatum.`,
      },
    ],
  },
};
