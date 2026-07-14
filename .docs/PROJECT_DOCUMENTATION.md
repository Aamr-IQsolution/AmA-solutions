# توثيق شامل للمشروع - axonXcode

> آخر تحديث: يوليو 2026 — يعكس إعادة الهيكلة الشاملة الثالثة + **القسم 15 (تحديثات المحادثة الحالية: تسعير، خدمات، هوية بصرية، GA، كوكيز)** + **إصلاح سلايدر الخدمات في الرئيسية (حذف `centeredSlides`)**.

## 1) نظرة عامة
- **النوع:** واجهة React أحادية الصفحة (SPA) مبنية بـ Vite وTypeScript.
- **الهدف الحالي:** موقع احترافي متعدد اللغات (عربي/إنجليزي/هولندي) لشركة axonXcode، يعمل في السوق الهولندي، ويقدم **منتجين فقط**: تصميم مواقع احترافية (Business Pro) وحلول برمجية مخصصة (Custom Solutions)، بالإضافة إلى باقة مجانية كقناة جذب عملاء (Freemium Funnel) وخدمات صيانة/استضافة متكررة.
- **تحول استراتيجي جوهري:** تم التخلي نهائياً عن كل خدمات السوشيال ميديا، الفيديوهات الترويجية، التصوير الميداني، والهوية البصرية كخدمات مقدَّمة — الشركة تُركّز حصرياً على البرمجة والحلول الرقمية.
- **مصدر البيانات:** بيانات ثابتة محلية داخل `constants.ts` + حفظ تفضيلات المستخدم (اللغة) في `localStorage`.
- **الموقع المنشور:** [axonxcode.com](https://axonxcode.com)

## 2) التقنيات والاعتمادات
(بدون تغيير عن التوثيق السابق: React 19.2.3, react-router-dom 7.14.2, three 0.183.2, swiper, vite 6.2.0, typescript 5.8.2, tailwindcss عبر CDN, Font Awesome, Google Fonts)

## 3) هيكل المشروع الحالي

```text
axonXcode/
├─ App.tsx                        ← معدّل: CookieConsent بعد Footer
├─ index.tsx
├─ index.html                     ← معدّل: title AxonXcode + favicon
├─ constants.ts
├─ types.ts
├─ vite.config.ts                 ← معدّل: GA_MEASUREMENT_ID
├─ vite-env.d.ts                  ← جديد: تعريفات TypeScript لاستيراد CSS
├─ tsconfig.json
├─ .env                           ← محلي فقط — مستثنى من Git (انظر .gitignore)
├─ .gitignore                     ← معدّل: يستثني .env و.env.local
├─ vercel.json
├─ metadata.json
├─ components/
│  ├─ Navbar.tsx                  ← معدّل: Axon + صورة X + code
│  ├─ HomeHero.tsx
│  ├─ ThreeDBackground.tsx
│  ├─ StatisticsCounter.tsx
│  ├─ Services.tsx                ← معدّل: سلايدر Swiper كامل العرض (9 خدمات، بدون centeredSlides)
│  ├─ Services.module.css
│  ├─ ServicesDetailed.tsx        ← جديد: صفحة /services فقط
│  ├─ ServicesDetailed.module.css ← جديد
│  ├─ PricingSection.tsx          ← معدّل: زر main-2 + أيقونات مخصصة
│  ├─ MainPricing.tsx             ← معدّل: renderFeature + أيقونات + data-scroll-target
│  ├─ AddOnsSection.tsx
│  ├─ Portfolio.tsx
│  ├─ Testimonials.tsx
│  ├─ FAQ.tsx
│  ├─ CTASection.tsx
│  ├─ Team.tsx
│  ├─ Contact.tsx
│  ├─ Footer.tsx                  ← معدّل: اسم نصي AxonXcode (بدون صورة X)
│  ├─ CookieConsent.tsx           ← جديد: بانر موافقة الكوكيز + تحميل GA
│  ├─ CookieConsent.module.css    ← جديد
│  ├─ PageHero.tsx
│  ├─ SectionHeader.tsx
│  ├─ Pricing.tsx                 ← ⚠ كود ميت (غير مستورد)
│  └─ SocialMediaPricing.tsx      ← ⚠ كود ميت (غير مستورد)
├─ pages/
│  ├─ HomePage.tsx
│  ├─ ServicesPage.tsx            ← يستدعي ServicesDetailed
│  ├─ PortfolioPage.tsx
│  ├─ TeamPage.tsx
│  ├─ ContactPage.tsx
│  └─ MarketingPricingPage.tsx
├─ utils/
│  └─ sortPlansPopularFirst.ts
├─ context/
│  └─ AppContext.tsx
├─ styles/
│  └─ theme.css
└─ public/
   └─ assets/
      ├─ simple-logo-X-decoreted-no-background.png  ← شعار الموقع + favicon
      └─ axon-x-letter.png                         ← حرف X في Navbar
```

**ملفات قديمة غير مستخدمة (كود ميت — ما زالت على القرص لكن لا يستوردها أي صفحة):**
- `components/SocialMediaPricing.tsx` + `SocialMediaPricing.module.css`
- `components/Pricing.tsx` + `Pricing.module.css`

> هذه الملفات تعتمد على `config.plans` و`pricingHeader` / `webPricingHeader` المحذوفة من `SiteConfig` — إعادة استيرادها ستكسر البناء. منطق `renderFeature()` نُقل إلى `MainPricing.tsx`. **يُنصح بحذفها فعلياً من المشروع** عند تنظيف الكود.

## 4) معمارية التطبيق (Architecture)
(بدون تغيير جوهري: `index.tsx` mount، `App.tsx` يلف بـ `AppProvider` و`BrowserRouter`)

**تخطيط `App.tsx` (`AppLayout`):** `Navbar` → `<main>` (Routes حسب الصفحة) → `Footer` → `CookieConsent` — الـ Navbar والـ Footer وبانر الكوكيز خارج محتوى كل صفحة.

**المسارات (`Routes`):**
| المسار | الصفحة |
|---|---|
| `/` | `HomePage` |
| `/services` | `ServicesPage` |
| `/team` | `TeamPage` |
| `/portfolio` | `PortfolioPage` |
| `/pricing` | `MarketingPricingPage` |
| `/web-pricing` | إعادة توجيه (`Navigate`) إلى `/pricing` — للروابط القديمة |
| `/contact` | `ContactPage` |

عند وجود `location.hash` (مثل `/pricing#business-pro` أو `/pricing#hosting-bundle`)، `AppLayout` يمرّر التمرير السلس إلى العنصر ذي **`data-scroll-target`** المطابق للـ hash، أو إلى `id` إن وُجد.

### البيانات والمحتوى — `constants.ts` (تغيّر جوهرياً)
- `mainPlans` — **الآن 3 باقات فقط، وكلها الباقات الوحيدة الظاهرة في الموقع:**
  - `main-1`: الباقة المجانية (`isFree: true`) — 8 ميزات مفصّلة
  - `main-2`: باقة الأعمال (Business Pro) — **دُمجت هنا من `webPlans` القديمة**، سعر 1299€ **لمرة واحدة** (وليس اشتراكاً شهرياً)، `isPopular: true`، **10 ميزات** (بما فيها Google Analytics — انظر القسم 15)
  - `main-3`: الحلول المتقدمة (Custom Solutions، `isCustom: true`) — سعر مخصص، 9 ميزات (تشمل الآن قاعدة بيانات مخصصة)
- **`plans` (السوشيال ميديا): محذوفة نهائياً بالكامل.**
- **`webPlans`: محذوفة نهائياً بالكامل** (كانت تحتوي Landing Page + Business Pro القديمة، ودُمجت الأخيرة في `mainPlans`).
- `addOns` — **بندان فقط الآن** (بالترتيب في `constants.ts`):
  - `monthly-maintenance` (25€/شهر) — كان `addon-5`
  - `hosting-bundle` (50€/شهر) — كان `addon-6`
  - (تم حذف `addon-1`, `addon-2`, `addon-3` — فيديو ترويجي وتصوير ميداني بالكامل)
- `services` — **9 خدمات الآن** (معرّفات: `1`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`) — توسّعت من خدمتين بعد إعادة الهيكلة الكاملة لقسم الخدمات (انظر القسم 15). كل خدمة تتضمن 3 نقاط `highlights` بكل لغة.
- `siteName`: `"AxonXcode"` | `logo`: `/assets/simple-logo-X-decoreted-no-background.png` | `brandXImage`: `/assets/axon-x-letter.png`
- `pricingHeader` و`webPricingHeader`: **محذوفان بالكامل بدون بديل** (لا يوجد `mainPricingHeader` — تقرر عدم الحاجة له لأن `PageHero` في صفحة `/pricing` يغطي العنوان).
- `team[0]` (عضو الفريق): تم تحديث `title` و`bio` لإزالة أي إشارة لـ"التسويق الرقمي" أو "إدارة السوشيال ميديا"، واستبدالها بالتركيز على "أمن المعلومات" و"جودة الكود".
- `faqs`: تم تحديث إجابة سؤال تكلفة الموقع من "499€" إلى "1299€".

### `types.ts`
- حُذف من `SiteConfig`: `plans`, `webPlans`, `pricingHeader`, `webPricingHeader`.
- **أُضيف إلى `SiteConfig`:** `brandXImage: string`.
- **أُضيف إلى واجهة `Service`:** `highlights: { icon: string; text: string }[]` داخل `translations` لكل لغة.
- واجهة `Plan` (النوع) بقيت معرّفة في الملف لكنها لم تعد مستخدمة من `SiteConfig` (احتياطاً لاستخدام مستقبلي).

### `context/AppContext.tsx`
- حُذفت الأسطر التي كانت تفرض `plans: INITIAL_CONFIG.plans` و`webPlans: INITIAL_CONFIG.webPlans` عند دمج بيانات `localStorage` مع `INITIAL_CONFIG` — كانت ستكسر البناء بعد حذف الحقلين من النوع.
- **ما يُفرَض من `INITIAL_CONFIG` عند كل تحميل** (حتى لو وُجد `siteConfig` قديم في `localStorage`): `mainPlans`, `addOns`, `services`, `siteName`, `logo`, `brandXImage` — لضمان أحدث بيانات التسعير والخدمات والهوية البصرية دون الاعتماد على نسخة محفوظة قديمة.

## 5) المكونات وعلاقاتها

### تخطيط التطبيق (`App.tsx` + `HomePage.tsx`)

**الهيكل العام (كل الصفحات):** `Navbar` → محتوى الصفحة → `Footer` → `CookieConsent`

**محتوى الصفحة الرئيسية فقط (`HomePage.tsx`):**
`HomeHero` → `StatisticsCounter` → `Services` (سلايدر 9 خدمات) → `PricingSection` (3 بطاقات: مجانية/أعمال/مخصصة) → `Portfolio` → `Testimonials` → `FAQ` → `CTASection`

**لا يوجد أي قسم سوشيال ميديا بعد الآن على الصفحة الرئيسية.**

### صفحة الخدمات (`ServicesPage.tsx` على `/services`)
يستدعي **`ServicesDetailed`** فقط — تخطيط عمودي كامل بعرض الصفحة مع شريط تنقل علوي ثابت (انظر القسم 15).

### صفحة التسعير (`MarketingPricingPage.tsx` على `/pricing`)
الترتيب: `PageHero` (subtitle محدّث: «اختر الباقة المناسبة لمشروعك ومرحلة عملك» — بدون «عقد سنوي أو بدون التزام») → `MainPricing` (البطاقات الثلاث كاملة) → `AddOnsSection` (بندان فقط).

**لا يُستورد** `Pricing.tsx` ولا `SocialMediaPricing` (انظر قسم «ملفات قديمة غير مستخدمة» أعلاه).

### `PricingSection.tsx` مقابل `MainPricing.tsx` (فرق مهم — محدَّث)
| | الصفحة الرئيسية (`PricingSection`) | صفحة `/pricing` (`MainPricing`) |
|---|---|---|
| عدد الميزات المعروضة | **5 فقط** (`features.slice(0, 5)`) | **القائمة كاملة** (8/10/9 حسب الباقة) |
| زر بطاقة `main-2` | **«عرض جميع الميزات»** → `/pricing#business-pro` | **«ابدأ مشروعك»** الأصلي → `/contact` عبر `handleOrder` |
| `renderFeature()` وروابط `#hosting-bundle` | **لا** | **نعم** |
| `getFeatureIconClass()` — أيقونة لكل سطر | **نعم** (main-1/2/3) | **نعم** (main-1/2/3) |
| إصلاح عرض السعر لمرة واحدة (`main-2`) | **نعم** | **نعم** |
| `data-scroll-target="business-pro"` على بطاقة `main-2` | **لا** | **نعم** (يظهر مرتين في DOM: Grid + Swiper — متوقع) |

### `MainPricing.tsx` — منطق مهم
- يحتوي الآن دالة `renderFeature()` (منقولة من `Pricing.tsx` القديم قبل حذفه): تكتشف الفاصل " — " في نص أي ميزة وتحوّل الجزء الذي بعده إلى رابط `<Link>` يوجّه إلى `/pricing#hosting-bundle`.
- دالة `getFeatureIconClass(planId, index)` تُرجع أيقونة Font Awesome مخصصة **لكل سطر ميزة** في الباقات الثلاث (`main-1`: 8 أيقونات، `main-2`: 10 أيقونات بما فيها `fa-chart-line` للتحليلات و`fa-circle-info` للسطر الأخير، `main-3`: 9 أيقونات). تُبقى `fa-bolt` (index 2) و`fa-shield-halved` (index 3) لـ `main-2` كما كانت.
- بطاقة `main-2` تحمل `data-scroll-target="business-pro"` لتمكين التمرير من `/pricing#business-pro`.
- **إصلاح عرض السعر لـ `main-2`:** لا يُعرض "/mo" ولا سطر "إجمالي سنوي" لهذه البطاقة تحديداً (لأنها دفعة واحدة). نفس الإصلاح في `PricingSection.tsx`.
- رسالة `handleOrder` لـ `main-2` معدّلة لتذكر "دفعة واحدة" بدل "عقد سنوي".

### `PricingSection.tsx` — تغيير زر `main-2` فقط
- للباقة `main-2` (`oneTime`): الزر أصبح `<Link to="/pricing#business-pro">` بنص **«عرض جميع الميزات»** / «View All Features» / «Bekijk Alle Functies» — بدل التوجيه المباشر لـ `/contact`.
- بقية البطاقات ما زالت تستخدم `handleOrder` → `/contact`.
- نفس دالة `getFeatureIconClass()` الموجودة في `MainPricing.tsx` (مكررة في الملفين).

### `pages/TeamPage.tsx`
- **عنوان `PageHero` (`title`):** تغيّر من «خبرات تقنية وتسويقية…» إلى «خبرات برمجية وحلول أمنية عالية المستوى في فريق واحد» (بالثلاث لغات).
- **`subtitle`:** لم يُحدَّث بعد — النص الإنجليزي ما زال يذكر *"practical growth expertise"* (انظر القسم 14).

### `components/Services.tsx` + `Services.module.css` (الصفحة الرئيسية)
- **سلايدر Swiper** كامل العرض بالسحب اليدوي + أزرار يمين/يسار.
- إعدادات Swiper: `slidesPerView` كسري (1.15 → 1.6 → 2.4 → 3.2 عبر `breakpoints`)، `spaceBetween` 18–22، `dir` حسب RTL — **بدون `centeredSlides`** (محاذاة من حافة البداية؛ يمنع فراغاً على اليسار عند الشريحة الأولى).
- بطاقات بخلفية متدرجة داكنة (`linear-gradient(135deg, #0b1220, #142a42)`) — **بدون أكورديون**.
- يعرض الـ 9 خدمات من `config.services`.

### `components/ServicesDetailed.tsx` + `ServicesDetailed.module.css` (صفحة `/services`)
- تخطيط عمودي كامل بعرض الصفحة لكل خدمة بالتناوب (يمين/يسار).
- شريط تنقل علوي ثابت (Sticky) بأيقونات الخدمات التسع؛ على الديسكتوب: `justify-content: space-evenly`.
- على الجوال (`< 1024px`): الشريط يتحول لسلايدر Swiper بأزرار.
- إصلاح انزياح أفقي على الجوال: `overflow-x: hidden` على `.section` و`min-width: 0` على `.visualCol`.

### `AddOnsSection.tsx`
لا تغيير في منطق العرض نفسه (`config.addOns.map(...)` بدون فلترة) — الحذف تم من مستوى البيانات في `constants.ts` مباشرة، وليس بإضافة شرط عرض.

## 6) نظام التسعير الحالي (بعد إعادة الهيكلة الثالثة)

### 6.1 الباقات الرئيسية الثلاث — البنية النهائية الموحّدة

| الباقة | السعر | النوع | ملاحظة |
|---|---|---|---|
| المجانية (`main-1`, `isFree`) | 0€ | دائم | صفحة واحدة، رابط فرعي، 8 ميزات موسّعة |
| باقة الأعمال (`main-2`, Business Pro) ⭐ الأكثر طلباً | 1,299€ | **دفعة واحدة** | 5-8 صفحات، 10 ميزات (بما فيها GA)، بدون لوحة تحكم (JSON)، هدية شهر أول مجاناً |
| الحلول المتقدمة (`main-3`, Custom Solutions) | سعر مخصص | حسب المشروع | تشمل الآن صراحة قاعدة بيانات مخصصة عالية الأمان |

**لا يوجد بعد الآن** أي باقة اشتراك شهري للمواقع (تم حذف "Business Groei" القديمة)، ولا باقة "Landing Page" منفصلة (تم دمجها/حذفها لصالح باقة الأعمال الوحيدة).

### 6.2 لماذا أصبحت باقة الأعمال بدون قاعدة بيانات ولوحة تحكم؟
قرار معماري وتجاري مقصود: الاستضافة على منصات Serverless (مثل Vercel) لا تسمح بالكتابة الدائمة على ملفات JSON في الإنتاج، لذا اعتُمد نموذج "VIP Managed": العميل يرسل طلب التعديل (نص/صورة) عبر واتساب/إيميل، ويُنفَّذ التعديل من طرف axonXcode ضمن باقة الصيانة الشهرية، بدل بناء لوحة تحكم معقدة لعميل نادراً ما يعدّل موقعه.

### 6.3 الإضافات (`addOns`) — بندان فقط

| الـ id | الخدمة | السعر | الدورية |
|---|---|---|---|
| `monthly-maintenance` | صيانة شهرية (تحديثات + تعديل محتوى) | 25€ | `/mo` شهري |
| `hosting-bundle` | باقة الاستضافة + الصيانة الشاملة (دومين + إيميل + استضافة + صيانة) | 50€ | `/mo` شهري |

تم حذف نهائي لجميع بنود الفيديو الترويجي والتصوير الميداني (كانت `addon-1/2/3`). بند الدومين/الإيميل المنفصل (`addon-4`) كان قد حُذف من `addOns` **قبل** إعادة الهيكلة الثالثة (لم يعد موجوداً في الكود الحالي).

### 6.4 الخدمات المعروضة (`services`) — 9 خدمات
1. Custom Web Development (`id: "1"`)
2. E-Commerce Excellence (`id: "4"`)
3. Custom Web & SaaS Applications (`id: "5"`)
4. Digital Security & Continuous Protection (`id: "6"`)
5. External Systems & API Integration (`id: "7"`)
6. Business Process Automation (`id: "8"`)
7. Custom Databases & Secure Backend (`id: "9"`)
8. Monthly Maintenance & VIP Content Management (`id: "10"`)
9. Multi-Language Support & Full Responsiveness (`id: "11"`)

> **سجل تاريخي:** بعد إعادة الهيكلة الثالثة بقيت خدمتان فقط مؤقتاً؛ ثم توسّع القسم إلى 9 خدمات في المحادثة الحالية (القسم 15). الخدمات التسويقية القديمة (سوشيال ميديا، فيديو، هوية بصرية…) لم تُعد.

## 7) نظام الألوان لمجموعات البطاقات
(بدون تغيير جوهري: الباقات الرئيسية `rgba(15, 20, 35, 0.85)`، الإضافات `rgb(2 17 26 / 85%)`، البطاقة الأكثر طلباً حدود برتقالية `#F97316`، الباقة المجانية شارة زرقاء `#3B7CB8`)
**إضافة:** بطاقات الخدمات في `Services.module.css` وبانر `CookieConsent` يستخدمان التدرج الداكن `linear-gradient(135deg, #0b1220, #142a42)` وحدود `rgba(59, 124, 184, 0.25)` — للاتساق البصري.
**ملاحظة:** لون بطاقات السوشيال ميديا (`rgb(46 87 129 / 75%)`) ولون بطاقات تطوير المواقع المنفصلة (`rgb(15 26 33 / 75%)`) لم يعودا مستخدمين فعلياً بعد حذف المكوّنين المرتبطين بهما، ويمكن إزالتهما من ملفات الـ CSS إذا رغبت مستقبلاً في تنظيف الكود غير المستخدم.

## 8) تدفّق البيانات (Data Flow)
1. `lang` يُحمَّل من `localStorage`.
2. عند وجود `siteConfig` في `localStorage`، يُدمج مع `INITIAL_CONFIG` — لكن **`mainPlans`، `addOns`، `services`، `siteName`، `logo`، `brandXImage` تُستبدل دائماً** من `INITIAL_CONFIG`.
3. المكونات تقرأ من `useApp()`: `config.mainPlans` (3 بطاقات)، `config.addOns` (بندان)، `config.services` (9 خدمات).
4. `CookieConsent`: قرار الكوكيز في `localStorage` تحت مفتاح `cookieConsent` (`all` | `essential`) — انظر القسم 15.
5. عند اختيار باقة:
   - `main-1` (مجانية): رسالة "مهتم بالباقة المجانية" بدون سعر.
   - `main-2` (باقة الأعمال): رسالة تذكر السعر 1299€ **كدفعة واحدة**.
   - `main-3` (مخصصة): رسالة عامة لطلب مشروع مخصص بدون سعر.

## 9) التهيئة والتشغيل
- `npm run dev` / `npm run build` / `npm run preview` — Vite على المنفذ 3000.
- النشر عبر Vercel.
- **متغيرات البيئة:** `GEMINI_API_KEY` (موجود مسبقاً) و`GA_MEASUREMENT_ID` (جديد — انظر القسم 15). محلياً في `.env`؛ على Vercel عبر Environment Variables. **يجب أن يبدأ `GA_MEASUREMENT_ID` بـ `G-`** لصيغة GA4.
- `@types/react` و`@types/react-dom` مُثبتان لإصلاح أخطاء TypeScript في المحرر.

## 10) نقاط فنية يجب تذكرها (Lessons Learned) — إضافات هذه المرحلة
- **دمج باقة من مصفوفة في أخرى (webPlans → mainPlans):** عند دمج بيانات باقة كانت في مصفوفة منفصلة (`Plan`) داخل مصفوفة أخرى (`MainPlan`)، يجب نقل أي منطق عرض خاص بها (مثل `renderFeature()` وروابط الميزات) إلى المكوّن الجديد المسؤول، وإلا يُفقد هذا السلوك بصمت دون خطأ ظاهر في البناء.
- **حقول رقمية إلزامية بلا معنى فعلي:** عند تحويل باقة من "اشتراك شهري" إلى "دفعة واحدة"، حقول مثل `annualTotal` و`setupFeeAnnual` تبقى إلزامية في النوع لكنها بلا معنى — يجب وضعها `0` صراحة **و** إضافة شرط عرض خاص يمنع ظهورها في الواجهة، وإلا يظهر للعميل "0€ سنوياً" وهو مضلل.
- **`localStorage` وحقول محذوفة من النوع:** أي حقل يُحذف من `SiteConfig` يجب البحث عنه أيضاً في منطق دمج `localStorage` بـ `AppContext.tsx`، لأن هذا الملف غالباً ما يُنسى عند إعادة الهيكلة لأنه لا يظهر في نتائج البحث السطحي عن اسم المكوّن المتأثر.
- **ازدواج الروابط داخل نص الميزة:** إذا احتوت أكثر من ميزة واحدة على الفاصل " — " ضمن نفس البطاقة، فإن منطق `renderFeature()` سينشئ رابطين منفصلين يوجّهان لنفس الوجهة — يُفضَّل إبقاء فاصل " — " واحد فقط لكل بطاقة لتفادي التكرار البصري.
- **كود ميت على القرص:** حذف مكوّن من الاستيراد لا يعني حذف الملف — يجب التحقق بـ `grep` من عدم وجود الملف فعلياً، أو توثيقه كـ «يتيم» حتى يُحذف لاحقاً.
- **صياغة تسويقية قد تصبح التزاماً تعاقدياً ضمنياً:** عبارات مثل "SLA" أو "أمان 100%" تحمل دلالة تعاقدية/قانونية أقوى من مجرد وصف تسويقي — يُفضَّل اختيار صياغات وصفية ("دعم بأولوية قصوى") بدل مصطلحات رسمية (SLA) ما لم تكن الشروط الفعلية محددة في العقد.

## 11) السياق التجاري (محدَّث)
- الشركة **غير مسجلة رسمياً بعد** (لا يوجد KVK number).
- **النموذج الجديد ذو منتجين فقط:** باقة الأعمال (تصميم مواقع، سعر ثابت لمرة واحدة، بدون لوحة تحكم، **تشمل الآن Google Analytics مدمجاً**) + الحلول المتقدمة (برمجة مخصصة، سعر حسب الحالة، تشمل قاعدة بيانات).
- **عرض الخدمات:** 9 خدمات برمجية/تقنية — لا خدمات تسويقية أو سوشيال ميديا.
- **لا يوجد بعد الآن اشتراك شهري للموقع نفسه** — فقط دفعة واحدة للموقع + اشتراك اختياري منفصل للصيانة/الاستضافة.
- **الباقة المجانية** تبقى قناة Freemium لجذب العملاء الصغار نحو باقة الأعمال المدفوعة.
- **قرار استراتيجي حاسم:** التخلي الكامل عن بيع خدمات السوشيال ميديا، الفيديو، التصوير، والهوية البصرية — التركيز الحصري على البرمجة والحلول الرقمية عالية القيمة.
- **الدومين والإيميل:** لا يُباعان كخدمة مستقلة بعد الآن بأي شكل — فقط ضمن `hosting-bundle` المرتبط بعميل موقع فعلي، تفادياً لهامش الربح الضعيف والمسؤولية التشغيلية غير المبررة لخدمة ليست تخصصاً أساسياً للشركة.
- **هدية الإطلاق:** عملاء باقة الأعمال يحصلون على أول شهر مجاناً من (استضافة + إيميل + صيانة)، تتحملها الشركة كتكلفة اكتساب عميل (CAC) وليست خصماً وهمياً.

## 12) ملخص القرارات (سجل التغييرات — إعادة الهيكلة الثالثة)

| القرار | السبب |
|---|---|
| دمج Business Pro ضمن mainPlans كـ main-2 | إزالة التداخل المربك بين "Business Groei" الاشتراكية و"Business Pro" أحادية الدفع |
| حذف Business Groei (الاشتراك الشهري) نهائياً | تبسيط الخيارات، تفادي التزام العميل بعقد سنوي غير ضروري لخدمة تصميم موقع بسيط |
| حذف Landing Page المنفصلة | باقة واحدة فقط للمواقع تكفي، تفادي إرهاق قرار العميل (Hick's Law) |
| حذف كل باقات السوشيال ميديا | تركيز الشركة الحصري على البرمجة، تفادي هامش ربح ضعيف مقابل جهد كبير |
| حذف الفيديو والتصوير من الإضافات | نفس المنطق أعلاه — هذه الخدمات مشتتة وخارج التخصص الأساسي |
| حذف 4 خدمات من قسم Services | اتساق الموقع مع القرار الاستراتيجي الجديد |
| رفع Business Pro من 850€ إلى 1,299€ ثم البقاء عليه | يتماشى مع نطاق السوق الهولندي الفعلي لمواقع MKB الاحترافية (2,000-7,500€)، لا يزال دون المتوسط لكنه أعلى من السعر القديم |
| نموذج "VIP Managed" بدل لوحة تحكم | حل تقني (قيود Serverless/JSON) تحوّل لميزة تسويقية (راحة بال للعميل) |
| هدية الشهر الأول مجاناً | تكلفة اكتساب عميل منخفضة جداً مقابل صفقة 1,299€ |
| إزالة "أمان 100%" و"SLA" من النصوص | تفادي التزامات تعاقدية/قانونية ضمنية غير محددة الشروط |
| تحديث بايو الفريق لإزالة "تسويق/سوشيال ميديا" | اتساق مع القرار الاستراتيجي، تفادي تناقض بين محتوى الموقع وخدماته الفعلية |

## 13) ملخص سريع
المشروع SPA احترافي بصرياً، مبني بـ React + Vite + TypeScript + Swiper، يدعم 3 لغات:
- **mainPlans** (3 باقات: مجانية + أعمال (دفعة واحدة، 10 ميزات) + مخصصة)
- **لا يوجد** `plans` (سوشيال ميديا) — محذوفة نهائياً
- **addOns** (بندان: صيانة شهرية + باقة استضافة وصيانة شاملة)
- **services** (9 خدمات برمجية/تقنية — سلايدر في الرئيسية، تفصيلي في `/services`)
- **هوية بصرية:** `AxonXcode` مع صورة X في Navbar فقط؛ favicon من `simple-logo-X-decoreted-no-background.png`
- **GA + كوكيز:** `CookieConsent` — تحميل GA ديناميكي بعد «قبول الكل» فقط
- الشركة تُركّز حصرياً على البرمجة والحلول الرقمية.

## 14) محتوى متبقٍ للتحديث (معروف — لم يُنفَّذ بعد)

هذه النقاط **لا تناقض** التوثيق التقني أعلاه، لكنها تناقض **القرار الاستراتيجي** جزئياً أو تتطلب عملاً لاحقاً:

| الموقع | الوضع الحالي | الإجراء المقترح |
|---|---|---|
| `UI_TEXTS.prices` | ar: «أسعار التسويق»، nl: «Marketing Prijzen» (en: «Pricing» صحيح) | تحديث إلى «الأسعار» / «Prijzen» |
| `TeamPage` → `PageHero` subtitle | الإنجليزية: *"practical growth expertise"* | إعادة صياغة بما يتوافق مع التركيز على البرمجة والأمن |
| `portfolio` (`p1`, `p2`) | ما زالا Content Creation و Social Media | مراجعة/استبدال بمشاريع ويب أو إخفاؤهما |
| `components/Pricing.tsx` + `SocialMediaPricing.tsx` | ملفات يتيمة على القرص | حذف فعلي من المشروع |
| **صفحة سياسة الخصوصية** | **غير موجودة** | إنشاؤها لاحقاً؛ حالياً **لا يوجد رابط** لها في بانر الكوكيز (قرار مقصود في المحادثة الحالية) |

## 15) تحديثات المحادثة الحالية (توثيق شامل)

> هذا القسم يوثّق التغييرات التي نُفّذت بعد إعادة الهيكلة الثالثة (يوليو 2026). السجل التاريخي في الأقسام 1–14 يبقى مرجعاً ولا يُحذف.

### 15.1 صفحة التسعير — `main-2` / Business Pro

**زر الصفحة الرئيسية (`PricingSection.tsx` فقط):**
- بطاقة `main-2`: الزر تغيّر من «ابدأ مشروعك» إلى **«عرض جميع الميزات»** (en: View All Features / nl: Bekijk Alle Functies).
- يوجّه إلى `/pricing#business-pro` بدل `/contact`.
- **`MainPricing.tsx` على `/pricing` لم يتغيّر:** ما زال زر «ابدأ مشروعك» الأصلي عبر `handleOrder` → `/contact`.

**التمرير إلى بطاقة الأعمال:**
- `MainPricing.tsx` يضع `data-scroll-target="business-pro"` على غلاف بطاقة `main-2`.
- `App.tsx` يبحث عن `[data-scroll-target="..."]` عند وجود hash — **لا يعتمد على `id="business-pro"`**.
- البطاقة تظهر **مرتين** في DOM (شبكة Grid + Swiper) — متوقع ومقبول؛ التمرير يصل لأول عنصر مرئي.

**أيقونات الميزات (`getFeatureIconClass`):**
- في **`PricingSection.tsx` و`MainPricing.tsx`**: دالة تُرجع أيقونة Font Awesome مخصصة لكل سطر في الباقات الثلاث.
- `main-2`: `fa-bolt` (index 2) و`fa-shield-halved` (index 3) كما كانا، بالإضافة لبقية الأيقونات في مصفوفة ثابتة.

**ميزة Google Analytics (الميزة العاشرة لـ `main-2`):**
- نُصت في `constants.ts` قبل السطر الأخير («السعر لا يشمل الدومين والاستضافة…») بثلاث لغات.
- أيقونة: `fa-chart-line` عند **index 8**.
- السطر الأخير (`fa-circle-info`) أُزيح إلى **index 9**.

### 15.2 قسم الخدمات — إعادة هيكلة كاملة

**البيانات (`constants.ts` + `types.ts`):**
- `services` توسّعت من **2 إلى 9** خدمات.
- واجهة `Service` اكتسبت `highlights: { icon, text }[]` (3 نقاط فرعية لكل خدمة بكل لغة).

**مكوّنان منفصلان:**

| المكوّن | الصفحة | السلوك |
|---|---|---|
| `Services.tsx` + `Services.module.css` | الرئيسية `/` | سلايدر Swiper كامل العرض، سحب يدوي + أزرار، بطاقات بتدرج داكن، **بدون أكورديون**، **بدون `centeredSlides`** (محاذاة من البداية) |
| `ServicesDetailed.tsx` + `ServicesDetailed.module.css` | `/services` فقط | تخطيط عمودي كامل، تناوب يمين/يسار، شريط Sticky بأيقونات الـ 9 خدمات، fade-in عند التمرير |

**إصلاح سلايدر الرئيسية (`Services.tsx`):**
- **المشكلة:** مع `centeredSlides` + `slidesPerView` كسري، كانت الشريحة الأولى تُوسَّط فيترك Swiper **فراغاً على اليسار** (LTR) لأنه لا توجد شرائح قبل الأولى.
- **الحل:** حُذف `centeredSlides` من إعدادات `<Swiper>` — الشرائح تبدأ من حافة البداية (`dir` يحدد البداية في RTL/LTR). باقي الخصائص (`spaceBetween`, `slidesPerView`, `breakpoints`, Navigation, A11y) **لم تُغيَّر**.
- **ملاحظة:** سلايدرات أخرى في المشروع (`MainPricing`, `PricingSection`, `AddOnsSection`) ما زالت تستخدم `centeredSlides` — القرار مقصود لسلايدر الخدمات فقط.

**إصلاحات لاحقة على `ServicesDetailed`:**
- تمركز الشريط العلوي: `justify-content: space-evenly` على الديسكتوب.
- الجوال (`< 1024px`): الشريط → سلايدر Swiper بأزرار.
- إصلاح انزياح أفقي: `overflow-x: hidden` على `.section`، `min-width: 0` على `.visualCol`.

### 15.3 الهوية البصرية — اسم الموقع والشعار

- `siteName`: `"AxonXcode"` (كان `axonXcode`).
- `<title>` في `index.html`: `AxonXcode`.
- `brandXImage`: `/assets/axon-x-letter.png` — يُستخدم في **`Navbar.tsx` فقط**: `Axon` + صورة X + `code` عبر `slice(0,4)` و`slice(5)`.
- **`Footer.tsx`:** أُعيد لنص عادي `{config.siteName}` — صورة X الداكنة غير مرئية على خلفية Footer السوداء.
- **Navbar:** `direction: ltr` على `.brandHome` لمنع انعكاس ترتيب الاسم في الوضع العربي (RTL).
- **الشعار (`logo`):** `/assets/simple-logo-X-decoreted-no-background.png` — حُذف الشعار القديم `semple-logo-last-rounded-no-wight-color.png`.
- **Favicon:** `<link rel="icon">` و`apple-touch-icon` يشيران إلى نفس ملف الشعار الحالي (`simple-logo-X-decoreted-no-background.png`).

### 15.4 Google Analytics + بانر موافقة الكوكيز

**البنية التحتية:**
- `.gitignore`: أُضيف `.env` و`.env.local` (لم يكونا مستثنيين — **ثغرة أمان أُغلقت**).
- `vite.config.ts`: `'process.env.GA_MEASUREMENT_ID': JSON.stringify(env.GA_MEASUREMENT_ID)` بنفس نمط `GEMINI_API_KEY`.
- **لا يوجد** `gtag.js` ثابت في `index.html` — التحميل **ديناميكي فقط** بعد موافقة المستخدم (امتثال EU).

**`CookieConsent.tsx` + `CookieConsent.module.css`:**
- مثبّت في `App.tsx` بعد `Footer` — يظهر في كل الصفحات.
- `localStorage` مفتاح `cookieConsent`: `all` (قبول الكل) | `essential` (الأساسية فقط).
- ترحيل تلقائي للقيم القديمة: `accepted` → `all`، `rejected` → `essential`.
- زرّان فقط: **«قبول الكل»** / **«قبول الأساسية فقط»** — بنفس الحجم والوضوح (لا إخفاء للخيار الثانوي).
- GA يُحمَّل **فقط** عند `all` (أو تلقائياً عند زيارة لاحقة إذا كان المحفوظ `all`).
- عند `essential`: لا سكريبتات GA.
- **خلفية البانر داكنة** (`linear-gradient(135deg, #0b1220, #142a42)`) — **عمداً** لتفادي التباس الزائر بين البانر ومحتوى الموقع (امتثال GDPR وليس تفضيلاً تصميمياً فقط).
- **لا رابط لصفحة سياسة خصوصية** — الصفحة غير موجودة بعد (انظر القسم 14).

**⚠️ ملاحظة تشغيلية (GA_MEASUREMENT_ID):**
- اكتُشف خطأ فعلي: قيمة أولية في `GA_MEASUREMENT_ID` **بدون بادئة `G-`** المطلوبة لـ GA4 — منعت تسجيل البيانات حتى التصحيح.
- **تحذير لأي تعديل مستقبلي:** يجب أن يكون المعرف بصيغة `G-XXXXXXXXXX`.

### 15.5 إصلاحات TypeScript (مرافقة)

- أُنشئ `vite-env.d.ts` مع `/// <reference types="vite/client" />` لحل خطأ استيراد ملفات CSS.
- `@types/react` و`@types/react-dom` أُضيفا إلى `devDependencies`.
- `tsconfig.json`: `"include": ["**/*.ts", "**/*.tsx", "vite-env.d.ts"]`.