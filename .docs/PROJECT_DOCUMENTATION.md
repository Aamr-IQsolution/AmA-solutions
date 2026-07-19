# توثيق شامل للمشروع - axonXcode

> آخر تحديث: يوليو 2026 — يعكس إعادة الهيكلة الثالثة + الأقسام 15–18 (تسعير/خدمات/GA، Portfolio، Contact API، SEO) + **خطة الإصلاح الشاملة Phases 1–6** (أمن، أداء، تقسيم المحتوى، refactor الميزات، أمن متقدم، تنظيف كود ميت). انظر الأقسام **19–24**.

## 1) نظرة عامة
- **النوع:** واجهة React أحادية الصفحة (SPA) مبنية بـ Vite وTypeScript، منشورة على Vercel (Serverless API + Edge Middleware).
- **الهدف الحالي:** موقع احترافي متعدد اللغات (عربي/إنجليزي/هولندي) لشركة axonXcode، يعمل في السوق الهولندي، ويقدم **منتجين فقط**: تصميم مواقع احترافية (Business Pro) وحلول برمجية مخصصة (Custom Solutions)، بالإضافة إلى باقة مجانية كقناة جذب عملاء (Freemium Funnel) وخدمات صيانة/استضافة متكررة.
- **تحول استراتيجي جوهري:** تم التخلي نهائياً عن كل خدمات السوشيال ميديا، الفيديوهات الترويجية، التصوير الميداني، والهوية البصرية كخدمات مقدَّمة — الشركة تُركّز حصرياً على البرمجة والحلول الرقمية.
- **مصدر البيانات:** محتوى ثابت تحت `content/` يُجمَع في `INITIAL_CONFIG` عبر `content/index.ts` ويُعاد تصديره من `constants.ts` (barrel). **لا يوجد CMS** ولا دمج `siteConfig` من `localStorage` (أُزيل في Phase 6). تفضيلات المستخدم في `localStorage`: `lang` (تذكّر فقط) و`cookieConsent`.
- **الموقع المنشور:** [axonxcode.com](https://www.axonxcode.com) (`SITE_URL` = `https://www.axonxcode.com`)

## 2) التقنيات والاعتمادات
- **واجهة:** React 19.2.3، react-router-dom 7.14.2، react-helmet-async، swiper، react-icons، Vite 6، TypeScript 5.8
- **أنماط/خطوط محلية (Phase 5):** Tailwind عبر `@tailwindcss/vite`، Font Awesome (`@fortawesome/fontawesome-free`)، Inter/Cairo (`@fontsource/*`) — **بدون CDN** في `index.html`
- **سيرفر/حافة:** `api/contact.ts` (Vercel Node)، `middleware.ts` (Vercel Edge)، Resend، Zod، Upstash Ratelimit، Cloudflare Turnstile
- **بناء:** `prebuild` → `tsx scripts/generate-sitemap.ts` ثم `vite build`

## 3) هيكل المشروع الحالي

```text
axonXcode/
├─ App.tsx                 ← lazy routes + Suspense + hash scroll retries
├─ index.tsx / index.html / index.css
├─ constants.ts            ← barrel: INITIAL_CONFIG, SITE_URL, PAGE_META, UI_TEXTS
├─ types.ts                ← أنواع المحتوى فقط (بدون User/CMS)
├─ middleware.ts           ← OG/meta للبوتات (Google/Bing/سوشيال…)
├─ vite.config.ts          ← Tailwind plugin + GA_MEASUREMENT_ID + TURNSTILE_SITE_KEY
├─ vercel.json             ← redirects لغات + security headers (CSP/HSTS/…) + SPA rewrite
├─ .env.example            ← قالب المتغيرات (لا أسرار في Git)
├─ api/
│  └─ contact.ts           ← POST تواصل: honeypot → rate limit → Turnstile → Zod → Resend
├─ content/                ← مصدر الحقيقة للمحتوى (Phase 3)
│  ├─ index.ts             ← يجمع INITIAL_CONFIG
│  ├─ site/                ← identity, hero, stats, sectionHeaders
│  ├─ home/                ← testimonials, faqs, homeSectionCopy
│  ├─ services/            ← services, workPrinciples
│  ├─ portfolio/projects.ts
│  ├─ pricing/             ← mainPlans, addOns
│  ├─ i18n/                ← SITE_URL, PAGE_META, UI_TEXTS, pageMetaKey
│  └─ legalPages.ts
├─ components/
│  ├─ Navbar + LanguageSwitcher
│  ├─ HomeHero, StatisticsCounter, Services, ServicesDetailed
│  ├─ PricingSection, MainPricing, AddOnsSection
│  ├─ Portfolio, Contact (+ ContactForm, ContactInfo), TurnstileWidget
│  ├─ CookieConsent, SEO, Footer, PageHero, Team, …
│  └─ project/             ← Hero, Gallery, Lightbox, projectDetailCopy (Phase 4)
├─ pages/                  ← Home, Services, Team, Portfolio, ProjectDetail, Pricing,
│                            Contact, Privacy, Terms, CookieSettings
├─ hooks/                  ← useContactForm, useLocalizedNavigate, useIsMobileNav,
│                            useRevealOnScroll, useSwiperNavigation
├─ utils/
│  ├─ contactSchema, emailTemplates, verifyTurnstile, cookieConsent
│  ├─ localizePath, techIconMap, sortPlansPopularFirst
│  └─ pricing/             ← planHelpers, pricingLabels, buildPlanContactMessage
├─ context/AppContext.tsx  ← lang من المسار؛ config = INITIAL_CONFIG؛ contactMessage
├─ scripts/generate-sitemap.ts
├─ styles/theme.css
└─ public/
   ├─ robots.txt / sitemap.xml (يُولَّد عند البناء)
   └─ assets/              ← شعار، hero webp، مشاريع، شهادات
```

**حُذف سابقاً (لم يعد على القرص):** `Pricing.tsx` / `SocialMediaPricing.tsx`، `metadata.json`، حقن `GEMINI_API_KEY` في Vite، أصول يتيمة كبيرة (~15MB+ في Phase 2).

## 4) معمارية التطبيق (Architecture)
`index.tsx`: `HelmetProvider` → `BrowserRouter` → `AppProvider` → `AppLayout`.

**تخطيط `AppLayout`:** `Navbar` → `<main>` (`Suspense` + Routes) → `Footer` → `CookieConsent`.

**المسارات (داخل `/:lang` عبر `LangGuard`):**
| المسار النسبي | الصفحة |
|---|---|
| `/` (index) | `HomePage` |
| `/services` | `ServicesPage` |
| `/team` | `TeamPage` |
| `/portfolio` | `PortfolioPage` |
| `/portfolio/:id` | `ProjectDetailPage` |
| `/pricing` | `MarketingPricingPage` |
| `/contact` | `ContactPage` |
| `/privacy` | `PrivacyPolicyPage` |
| `/terms` | `TermsPage` |
| `/cookie-settings` | `CookieSettingsPage` |

Redirects قديمة في `vercel.json`: `/` → `/nl`، وكذلك `/services`…`/contact` و`/web-pricing` → نسخ `/nl/...`. الصفحات تُحمَّل بـ `React.lazy` (Phase 2).

عند وجود `location.hash`، `AppLayout` يمرّر التمرير إلى `[data-scroll-target]` أو `id` مع إعادة محاولة عند 150/400/800ms (محتوى lazy).

### البيانات والمحتوى — `content/` + `constants.ts`
- المصدر الفعلي: ملفات تحت `content/`؛ `constants.ts` يعيد التصدير فقط لاستقرار مسارات الاستيراد (`from './constants'`).
- `mainPlans`: `main-1` مجانية، `main-2` Business Pro 1299€ لمرة واحدة (10 ميزات منها GA)، `main-3` مخصصة.
- `addOns`: `monthly-maintenance` (25€/mo)، `hosting-bundle` (50€/mo).
- `services`: 9 خدمات مع `highlights`؛ `portfolio`: 4 مشاريع (`souqeastren`, `alasaylf`, `my-work`, `ms-phone-store`).
- `siteName` / `logo` / `brandXImage` كما في `content/site/identity.ts`.

### `types.ts` (بعد Phase 6)
- أنواع حيّة: `Language`, `ContactFormData`, `Service`, `MainPlan`, `AddOn`, `Project`, `SiteConfig`, … 
- **محذوف:** `User` / `UserRole` / `Permissions` / `Plan` / `Translation` (بقايا CMS).

### `context/AppContext.tsx` (بعد Phase 6)
- `config = INITIAL_CONFIG` ثابتاً — لا `setConfig` ولا قراءة `localStorage.siteConfig`.
- `lang` من `langFromPathname`؛ `setLang` يبدّل مقطع اللغة في المسار ويحفظ تذكّراً في `localStorage`.
- `contactMessage` / `setContactMessage` لملء نموذج التواصل من صفحات التسعير.

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

`Pricing.tsx` و`SocialMediaPricing` **محذوفان** من القرص (لم يعودا مستوردَين).

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
- أيقونات الميزات والمنطق المشترك مُوحَّدان في `utils/pricing/planHelpers.ts` و`pricingLabels.ts` (Phase 4) — لم تعد الدالة مكررة يدوياً بين الملفين كمصدر وحيد.

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
لا فلترة في العرض (`config.addOns.map(...)`) — الحذف تم من مستوى البيانات في `content/pricing/addOns.ts`. منطق الأسعار/الرسائل المشتركة مع باقي التسعير عبر `utils/pricing/` (Phase 4).

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
1. `lang` يُشتق من مقطع المسار (`/nl|en|ar/...`)؛ `localStorage.lang` تذكّر فقط عند التبديل.
2. `config` = `INITIAL_CONFIG` مباشرة من `AppContext` (لا CMS ولا `siteConfig` — Phase 6).
3. المكونات تقرأ من `useApp()`: `config.mainPlans` / `addOns` / `services` / `portfolio` / …
4. `CookieConsent`: مفتاح `cookieConsent` = `all` | `essential`؛ عند `essential` يُستدعى `clearGoogleAnalytics()` (القسمان 15 و23).
5. اختيار باقة يملأ `contactMessage` ثم يوجّه إلى `/contact` (رسائل موحّدة عبر `buildPlanContactMessage`).

## 9) التهيئة والتشغيل
- `npm run dev` / `npm run build` / `npm run preview` — Vite على المنفذ 3000.
- النشر عبر Vercel.
- **متغيرات البيئة (انظر `.env.example`):** `GA_MEASUREMENT_ID` (عميل)، `TURNSTILE_SITE_KEY` (عميل)، `TURNSTILE_SECRET_KEY` / `RESEND_API_KEY` / Upstash (سيرفر فقط). على Vercel عبر Environment Variables. **يجب أن يبدأ `GA_MEASUREMENT_ID` بـ `G-`** لصيغة GA4. Turnstile وUpstash إلزاميان على Vercel (fail-closed).
- `@types/react` و`@types/react-dom` مُثبتان لإصلاح أخطاء TypeScript في المحرر.

## 10) نقاط فنية يجب تذكرها (Lessons Learned) — إضافات هذه المرحلة
- **دمج باقة من مصفوفة في أخرى (webPlans → mainPlans):** عند دمج بيانات باقة كانت في مصفوفة منفصلة (`Plan`) داخل مصفوفة أخرى (`MainPlan`)، يجب نقل أي منطق عرض خاص بها (مثل `renderFeature()` وروابط الميزات) إلى المكوّن الجديد المسؤول، وإلا يُفقد هذا السلوك بصمت دون خطأ ظاهر في البناء.
- **حقول رقمية إلزامية بلا معنى فعلي:** عند تحويل باقة من "اشتراك شهري" إلى "دفعة واحدة"، حقول مثل `annualTotal` و`setupFeeAnnual` تبقى إلزامية في النوع لكنها بلا معنى — يجب وضعها `0` صراحة **و** إضافة شرط عرض خاص يمنع ظهورها في الواجهة، وإلا يظهر للعميل "0€ سنوياً" وهو مضلل.
- **~~`localStorage` وحقول محذوفة من النوع~~ (تاريخي):** كان دمج `siteConfig` يفرض تحديث `AppContext` عند كل حذف حقل — **أُزيل الدمج بالكامل في Phase 6**؛ الدرس يبقى مفيداً إن أُعيد CMS لاحقاً.
- **ازدواج الروابط داخل نص الميزة:** إذا احتوت أكثر من ميزة واحدة على الفاصل " — " ضمن نفس البطاقة، فإن منطق `renderFeature()` سينشئ رابطين منفصلين يوجّهان لنفس الوجهة — يُفضَّل إبقاء فاصل " — " واحد فقط لكل بطاقة لتفادي التكرار البصري.
- **كود ميت على القرص:** حذف الاستيراد ≠ حذف الملف — Phase 6 نظّف الأنواع/`UI_TEXTS`/`metadata.json`؛ ملفات `Pricing.tsx` / `SocialMediaPricing` حُذفت مسبقاً.
- **Fail-closed على Vercel:** Upstash وTurnstile إن غابا في الإنتاج يُرجعان `503` — لا تخطٍ صامت للسبام.
- **CDN vs حزم محلية:** إزالة Tailwind/FA/Fonts من CDN يقلل سلاسل التوريد الخارجية ويتطلّب CSP محدّثاً لـ Turnstile/GA فقط.
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
SPA بـ React + Vite + TypeScript + Swiper، 3 لغات تحت `/nl|/en|/ar`:
- **محتوى:** `content/` → `INITIAL_CONFIG`؛ لا CMS
- **mainPlans** (3) + **addOns** (2) + **services** (9) + **portfolio** (4 صفحات تفصيل)
- **تواصل:** `POST /api/contact` (Resend + Upstash + Turnstile + Zod)
- **SEO:** Helmet + sitemap + Edge middleware للبوتات + صفحات قانونية
- **أداء:** lazy routes/sections + hero WebP + أصول محلية بدون CDN
- **كوكيز/GA:** موافقة صريحة؛ مسح كوكيز GA عند «أساسية فقط»
- التركيز التجاري: برمجة وحلول رقمية فقط

## 14) محتوى متبقٍ للتحديث (معروف — لم يُنفَّذ بعد)

| الموقع | الوضع الحالي | الإجراء المقترح |
|---|---|---|
| `UI_TEXTS.prices` | ar: «أسعار التسويق»، nl: «Marketing Prijzen» (en صحيح) | «الأسعار» / «Prijzen» |
| `TeamPage` → `PageHero` subtitle | الإنجليزية: *"practical growth expertise"* | صياغة تركّز على البرمجة والأمن |
| `stats.projects` | ما زال **5** بينما Portfolio يعرض **4** | تحديث صريح عند الاتفاق (لا تلقائياً) |
| Instagram في `sameAs` / socials | رابط عام `instagram.com` | بروفايل حقيقي عند التوفر |
| ~~Pricing / SocialMediaPricing~~ | **محذوفان** | — |
| ~~صفحات قانونية~~ | **موجودة** (`legalPages.ts`) | — |
| ~~CDN Tailwind/FA/Fonts~~ | **محلي (Phase 5)** | — |
| ~~CMS / setConfig / metadata.json~~ | **أُزيل (Phase 6)** | — |

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
- نُصت في `content/pricing/mainPlans.ts` قبل السطر الأخير («السعر لا يشمل الدومين والاستضافة…») بثلاث لغات.
- أيقونة: `fa-chart-line` عند **index 8**.
- السطر الأخير (`fa-circle-info`) أُزيح إلى **index 9**.

### 15.2 قسم الخدمات — إعادة هيكلة كاملة

**البيانات (`content/services/services.ts` + `types.ts`):**
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
- `.gitignore`: يستثني `.env` و`.env.*` مع الإبقاء على `.env.example` فقط.
- `vite.config.ts`: يحقن في الـ client **`GA_MEASUREMENT_ID`** و**`TURNSTILE_SITE_KEY`** فقط — حُذف حقن `GEMINI_API_KEY` / `API_KEY` (Phase 1).
- **لا يوجد** `gtag.js` ثابت في `index.html` — التحميل **ديناميكي فقط** بعد موافقة المستخدم (امتثال EU).

**`CookieConsent.tsx` + `CookieConsent.module.css`:**
- مثبّت في `App.tsx` بعد `Footer` — يظهر في كل الصفحات.
- `localStorage` مفتاح `cookieConsent`: `all` (قبول الكل) | `essential` (الأساسية فقط).
- ترحيل تلقائي للقيم القديمة: `accepted` → `all`، `rejected` → `essential` (في `utils/cookieConsent.ts`).
- زرّان فقط: **«قبول الكل»** / **«قبول الأساسية فقط»**.
- GA يُحمَّل **فقط** عند `all` عبر `loadGoogleAnalytics()`.
- عند اختيار `essential`: لا تحميل GA + **`clearGoogleAnalytics()`** (Phase 5) — سحب موافقة analytics ومسح كوكيز `_ga*` / `_gid` / `_gat*`.
- صفحة `/cookie-settings` تستدعي نفس المنطق عند الحفظ.
- **خلفية البانر داكنة** عمداً (امتثال GDPR).
- صفحات قانونية: `/privacy`، `/terms`، `/cookie-settings`.

**⚠️ ملاحظة تشغيلية (GA_MEASUREMENT_ID):**
- اكتُشف خطأ فعلي: قيمة أولية في `GA_MEASUREMENT_ID` **بدون بادئة `G-`** المطلوبة لـ GA4 — منعت تسجيل البيانات حتى التصحيح.
- **تحذير لأي تعديل مستقبلي:** يجب أن يكون المعرف بصيغة `G-XXXXXXXXXX`.

### 15.5 إصلاحات TypeScript (مرافقة)

- أُنشئ `vite-env.d.ts` مع `/// <reference types="vite/client" />` لحل خطأ استيراد ملفات CSS.
- `@types/react` و`@types/react-dom` أُضيفا إلى `devDependencies`.
- `tsconfig.json`: `"include": ["**/*.ts", "**/*.tsx", "vite-env.d.ts"]`.

## 16) إعادة تصميم قسم المشاريع (Portfolio) — توثيق شامل

> هذا القسم يوثّق إعادة بناء قسم «مشاريعنا المختارة» بالكامل (يوليو 2026). الأقسام 1–4 و8 و13 حُدِّثت لاحقاً لتعكس الهيكل الحالي (`content/`، lazy routes، Phase 6).

### 16.1 القرار الاستراتيجي والسبب

قسم المشاريع الأصلي كان يحتوي **5 مشاريع** (`p1` إلى `p5`). ثلاثة منها تناقضت مع الهوية الاستراتيجية الجديدة للشركة:

| المعرّف القديم | المحتوى | سبب الحذف |
|---|---|---|
| `p1` | Content Creation | خدمة صناعة محتوى — تخليّت عنها الشركة رسمياً |
| `p2` | Social Media (Tasneem) | خدمة إدارة سوشيال ميديا — تخليّت عنها الشركة رسمياً |
| `p4` | موقع axonXcode نفسه | أسلوب ضعيف المصداقية (استخدام الموقع الحالي كمشروع بورتفوليو) |

**تم حذف الثلاثة نهائياً.** أُبقي `p3` (SouqEastren) و`p5` (Alasaylf) كأساس لإعادة البناء، ثم أُعيدت تسمية معرّفاتهما لاحقاً إلى `souqeastren` و`alasaylf` على التوالي.

### 16.2 البنية التقنية الجديدة (`types.ts`)

أُعيد بناء واجهة `Project` بالكامل من نموذج بسيط:

```text
(id, image, category, link?, translations{title, description})
```

إلى بنية موسّعة تدعم **صفحة مستقلة لكل مشروع**:

| الحقل | النوع | الوصف |
|---|---|---|
| `coverImage` | `string` | صورة الغلاف (إلزامي) — تظهر في كارت Portfolio |
| `heroImage` | `string?` | صورة Hero أكبر لصفحة التفاصيل؛ إن غابت تُستخدم `coverImage` |
| `logoImage` | `string?` | شعار مفرّغ الخلفية |
| `galleryImages` | `string[]?` | صور المعرض؛ إن غابت أو فارغة لا يُعرض قسم المعرض |
| `technologies` | `string[]?` | أسماء التقنيات **بدون أرقام إصدار** (قاعدة موحّدة: `"Next.js"` وليس `"Next.js 16"`) |
| `hasFictionalData` | `boolean?` | يفعّل تنبيه «بيانات وهمية» فوق صور المشروع |
| `link` | `string?` | رابط خارجي اختياري؛ يُترك **غير موجود** عمداً للتطبيقات الحساسة |

داخل `translations` لكل لغة (`ar` / `en` / `nl`):

| الحقل | ملاحظة |
|---|---|
| `title` | عنوان المشروع |
| `category` | **مترجم** لكل لغة (كان نصاً ثابتاً خارج الترجمة سابقاً) |
| `shortDescription` | يحل محل `description` القديم |
| `challenge` | اختياري — قسم «التحدي» بصفحة التفاصيل |
| `solution` | اختياري — قسم «الحل» |
| `statusLabel` | شارة حالة المشروع (مثل «قيد التطوير») |

### 16.3 القاعدة الأمنية الثابتة (سياسة دائمة)

> **⚠️ قاعدة أمنية — لا تُخالَف دون قرار صريح:**

1. **التطبيقات البرمجية المخصصة الحساسة** (مثل `my-work`): حقل `link` **لا يُضاف للكائن نهائياً** — لا يُعرض رابط علني حفاظاً على خصوصية بيانات مستخدمي تلك التطبيقات. زر «زيارة الموقع المباشر» **لا يظهر** في صفحة المشروع.

2. **المواقع التعريفية العادية**: يُضاف `link` **بموافقة صريحة لكل مشروع على حدة** وقت إدخاله — ليس قاعدة تلقائية لكل موقع. أمثلة حالية بروابط علنية: **Alasaylf** (`https://www.alasaylf.com/`)، **M&S Phone Store** (`https://m-s-phone-store.vercel.app/`).

3. **بدون رابط عمداً (حالياً):** **SouqEastren** (منصة سوق إلكتروني قيد التطوير — طلب صاحب المشروع)، **My-Work** (تطبيق داخلي/خاص).

### 16.4 صفحة المشروع المستقلة

**الملفات:** `pages/ProjectDetailPage.tsx` (+ CSS) مع تفكيك Phase 4 إلى `components/project/` (`ProjectDetailHero`, `ProjectDetailGallery`, `ProjectLightbox`, `projectDetailCopy`).

**المسار:** `/:lang/portfolio/:id`.

**ترتيب الأقسام (من الأعلى للأسفل):**

1. **Hero** — عبر `ProjectDetailHero`
2. **زر رجوع** → `/portfolio` + شارة `statusLabel`
3. **التحدي / الحل** — عمودان (إن وُجد `challenge` أو `solution`)
4. **شرائح التقنيات** — Simple Icons حيث متوفرة (انظر 16.5)
5. **معرض صور** — `ProjectDetailGallery` + `ProjectLightbox` (انظر 16.6)
6. **زر «زيارة الموقع المباشر»** — **فقط** إن وُجد `link`
7. **CTA ختامي** → `/contact`

عند معرّف غير موجود: إعادة توجيه تلقائية إلى `/portfolio` (`Navigate`).

### 16.5 أيقونات التقنيات

- **الحزمة:** `react-icons` (حالياً `^5.7.0`) — الاستيراد المباشر من `react-icons/si` (مجموعة Simple Icons).
- **جدول التطابق:** `utils/techIconMap.ts` — مطابقة نصية **حرفية كاملة (Exact Match)** بين اسم التقنية في `content/portfolio/projects.ts` ومكوّن الأيقونة.

| اسم التقنية (كما في بيانات المشروع) | الأيقونة |
|---|---|
| `Next.js` | `SiNextdotjs` |
| `React` | `SiReact` |
| `TypeScript` | `SiTypescript` |
| `Supabase` | `SiSupabase` |
| `Tailwind CSS` | `SiTailwindcss` |
| `Vercel` | `SiVercel` |

- أي تقنية **غير موجودة** بالجدول (مثل `Zustand`, `Zod`, `Mollie`, `next-intl`, `TipTap`) تُعرض **بشريحة نصية بدون أيقونة** — لا أيقونة بديلة غير دقيقة.
- **سبب حذف أرقام الإصدار** من كل مصفوفات `technologies` (بأثر رجعي شمل SouqEastren أيضاً): تفادي فشل التطابق الحرفي مع جدول الأيقونات.

### 16.6 معرض الصور والـ Lightbox

- **قبل:** شبكة Grid ثابتة لصور `galleryImages`.
- **بعد:** سلايدر **Swiper** بنفس نمط `Services.tsx`:
  - `dir` حسب RTL/LTR
  - `key={lang}` لإعادة البناء عند تبديل اللغة
  - **بدون `centeredSlides`**
  - أزرار تنقل عبر `ref` + `onBeforeInit` / `onInit`
  - نسبة عرض **16:9** موحّدة لكل شريحة

- **Lightbox** عند الضغط على أي صورة بالمعرض:
  - طبقة خلفية داكنة شبه شفافة (`position: fixed; inset: 0`)
  - صورة مكبّرة (`max-width: 90vw`, `max-height: 90vh`, `object-fit: contain`)
  - **إغلاق:** زر مخصص، الضغط على الخلفية، مفتاح `Escape`
  - `role="dialog"` + `aria-modal="true"`
  - `overflow: hidden` على `body` أثناء الفتح (يُستعاد عند الإغلاق)

### 16.7 عرض Portfolio: الرئيسية مقابل `/portfolio`

| السياق | المكوّن | نمط العرض | الخاصية |
|---|---|---|---|
| الصفحة الرئيسية `/` | `HomePage` → `Portfolio` | **سلايدر Swiper** (تشويقي) | `layout="slider"` |
| صفحة `/portfolio` | `PortfolioPage` → `Portfolio` | **شبكة Grid** (تصفّح كامل) | `layout="grid"` (الافتراضي) |

- **مصدر تصميم الكارت واحد:** دالة `renderProjectCard()` داخل `Portfolio.tsx` — بدون تكرار تصميم الكارت (صورة، شارة، عنوان، وصف، زر اكتشاف).
- إعدادات Swiper في وضع `slider` مطابقة لـ `Services.tsx` (`slidesPerView` كسري، `breakpoints` 640/900/1200، Navigation عبر ref).

### 16.8 مكوّن تنبيه «بيانات وهمية»

**الملفات:** `components/FictionalDataOverlay.tsx` + `FictionalDataOverlay.module.css`

- يُفعَّل عبر `hasFictionalData: true` على أي مشروع (حقل عام — **لا ربط بمعرّف محدد بالكود**).
- شريط شبه شفاف بأسفل الصورة (`rgba(0,0,0,0.65)`)، نص ثلاثي اللغات:
  - **ar:** ⚠️ جميع البيانات المعروضة تجريبية/وهمية للعرض فقط
  - **en:** ⚠️ All data shown is fictional/demo data for display purposes only
  - **nl:** ⚠️ Alle getoonde gegevens zijn fictief/demo-gegevens, uitsluitend ter illustratie
- حجمان: `size="small"` (كروت، شعار، معرض) و`size="large"` (Hero، Lightbox).
- **نقاط العرض** (عند `hasFictionalData === true` فقط):
  1. `coverImage` في كارت Portfolio (slider + grid) — مع `padding-bottom` إضافي لنص الكارت لتفادي التداخل
  2. `heroImage` في Hero
  3. `logoImage` (داخل `logoWrap` بـ `position: relative`)
  4. كل صورة في سلايدر `galleryImages`
  5. الصورة المكبّرة داخل Lightbox

**مُفعَّل حالياً على:** `my-work` فقط — تطبيق داخلي حقيقي استُبدلت لقطاته ببيانات وهمية للعرض العام.

### 16.9 المشاريع الأربعة المكتملة (حتى الآن)

| المعرّف | العنوان | التصنيف (ar) | `link` | `hasFictionalData` | الحالة (ar) |
|---|---|---|---|---|---|
| `souqeastren` | SouqEastren — Eastern Souq | منصة سوق إلكتروني | **لا** | لا | قيد التطوير |
| `alasaylf` | Alasayl Transport | تصميم مواقع إحترافي | `alasaylf.com` | لا | قيد الاستخدام الفعلي |
| `my-work` | My-Work | نظام إدارة موارد بشرية | **لا** | **نعم** | تطبيق داخلي/خاص لعميل |
| `ms-phone-store` | M&S Phone Store | موقع تجاري بكتالوج منتجات | `m-s-phone-store.vercel.app` | لا | تم التصميم والتطوير بالكامل، بانتظار تفعيل العميل |

**قرار Lead-The-Way-YZ:** لم يُضف عمداً — بعد نقاش، إضافته كان يكرر فئة My-Work تقريباً (نظام إدارة داخلي غير مُفعَّل) دون تنوّع حقيقي. التفضيل: **4 مشاريع متنوعة الفئات** بدل 5 فيها تكرار.

### 16.10 `AppContext` والمحتوى (محدَّث Phase 6)

- سابقاً: فرض `portfolio` (وغيره) من `INITIAL_CONFIG` عند دمج `siteConfig` من `localStorage`.
- **الآن:** لا دمج أصلاً — `config = INITIAL_CONFIG` دائماً. أي تحديث في `content/portfolio/projects.ts` يظهر مباشرة بعد النشر/إعادة البناء.

### 16.11 نقطة معلّقة — `stats.projects`

عداد **«مشاريع منجزة»** (`stats.projects` في `StatisticsCounter`) **لم يُحسم رقمه النهائي بعد:**

- القيمة الحالية في `content/site/stats.ts`: **5**
- عدد مشاريع Portfolio المعروضة فعلياً: **4** (`souqeastren`, `alasaylf`, `my-work`, `ms-phone-store`)
- **يحتاج مراجعة وتحديث صريح لاحقاً** — **لا يُعدَّل تلقائياً دون تعليمات صريحة.**

## 17) نموذج التواصل (Contact Form + Resend + Upstash + Turnstile)

### 17.1 التحول من `mailto:` إلى API حقيقي

- **قبل:** أزرار/نموذج تعتمد على `mailto:` أو روابط مباشرة — تسليم غير موثوق (يعتمد على عميل البريد عند الزائر).
- **بعد:** مسار `POST /api/contact` عبر Serverless Function في `api/contact.ts` باستخدام **Resend**.
- **السبب:** موثوقية أعلى لتسليم الإيميل من طرف السيرفر، مع تحقق وخنق طلبات وحماية من البوتات.

### 17.2 ترتيب المعالجة داخل `api/contact.ts` (محدَّث Phases 1 + 5)

| # | الخطوة | السلوك عند الفشل |
|---|--------|------------------|
| 1 | Method = `POST` فقط | `405` |
| 2 | `Content-Type` يتضمن `application/json` | `400` |
| 3 | Parse جسم الطلب | `400` |
| 4 | **Honeypot** | إن وُجدت قيمة غير فارغة → `200 Success` وهمي (بدون إرسال) |
| 5 | **Rate Limit** (Upstash) | `429`؛ إن غاب Upstash على Vercel/production → **`503` fail-closed** |
| 6 | تحقق **Zod** (`contactFormSchema`) | `400` |
| 7 | **Cloudflare Turnstile** (`verifyTurnstileToken`) | `400` + `code: 'captcha_failed'`؛ إن غاب السر على Vercel/production → **`503` fail-closed**؛ محلياً بدون سر يُتخطّى |
| 8 | Sanitize عبر `escapeHtml` للحقول النصية المستخدمة في الرد التلقائي | — |
| 9 | وجود `RESEND_API_KEY` | `502` + رسالة فشل متعددة اللغات |
| 10 | إشعار الفريق → `axonxcode@gmail.com` (إعادة محاولة واحدة) | `502` إن فشل — **شرط نجاح الطلب** |
| 11 | الرد التلقائي للعميل (best-effort) | يُسجَّل الخطأ؛ الطلب يبقى `200` |
| 12 | نجاح | `200` + `{ message: 'Success' }` |

**قاعدة النجاح:** إشعار الفريق هو الشرط الأساسي. فشل الرد التلقائي **لا** يُفشل الطلب.

**واجهة النموذج (Phase 4 + 5):** `Contact.tsx` → `ContactInfo` + `ContactForm`؛ المنطق في `hooks/useContactForm.ts`؛ ويدجت `TurnstileWidget.tsx` يظهر فقط إن وُجد `TURNSTILE_SITE_KEY`.

### 17.3 Rate Limiting + IP (Phase 1)

- المكتبة: `@upstash/ratelimit` + `@upstash/redis`.
- القاعدة: `Ratelimit.slidingWindow(3, '10 m')` — بادئة `axon-contact`.
- **قبل Zod عمداً** حتى للبيانات غير الصالحة.
- **Fail-closed:** على `VERCEL=1` أو `NODE_ENV=production` غياب Upstash → `503` (لا تخطٍ).
- **استخراج IP:** تفضيل `x-real-ip`، ثم آخر hop من `x-vercel-forwarded-for` / `x-forwarded-for` (لا تُؤخذ القيمة اليسرى وحدها — قابلة للتزوير).

### 17.4 Honeypot

- حقل اختياري `honeypot` في الـ schema والجسم.
- إن امتلأ → رد نجاح صامت **قبل** Rate Limit، لذا **لا يستهلك** الحصة.

### 17.5 التحقق — `utils/contactSchema.ts`

| الحقل | القيود |
|-------|--------|
| `name` | مطلوب، trim، 1–100 |
| `email` | مطلوب، email، بحد أقصى 254 |
| `phone` | اختياري؛ فارغ → `undefined`؛ وإلا `/^\+?[\d\s]{7,20}$/` |
| `message` | مطلوب، 1–2000 |
| `lang` | `ar` \| `en` \| `nl` |
| `honeypot` | اختياري؛ يُحوَّل إلى سلسلة |
| `turnstileToken` | اختياري في الـ schema؛ يُتحقَّق منه في الـ API عبر Cloudflare siteverify |

### 17.6 تنظيف المدخلات وقوالب الإيميل

- `escapeHtml` في `utils/emailTemplates.ts` قبل إدراج النصوص في HTML.
- **ملاحظة دقيقة:** إشعار الفريق يستقبل بيانات خام من الـ handler ثم يُعيد تطبيق `escapeHtml` داخل `getTeamNotificationEmail`. الرد التلقائي يستقبل `name` منظّفاً مسبقاً من الـ handler.

### 17.7 قالب الرد التلقائي (`getAutoReplyEmail`)

- توقيع رسمي: شعار برابط مطلق (`https://www.axonxcode.com/assets/...`)، اسم الشركة، الهاتف، الموقع، وبريد `axonxcode@gmail.com`.
- روابط السوشيال **نصية** (LinkedIn / Instagram / Facebook / GitHub) بدون أيقونات Font Awesome — لعدم توافق الأيقونات مع أغلب عملاء البريد.
- رسائل فشل متعددة اللغات عبر `getContactFailureMessage(lang)` مع ذكر `axonxcode@gmail.com` كبديل تواصل.

### 17.8 دروس تقنية مسجّلة (أعطاب حقيقية أُصلحت)

1. **Resend لا يرمي دائماً عند رفض الإرسال:** `resend.emails.send` يعيد `{ data, error }`. يجب فحص `error` صراحةً (انظر `sendEmail`) — وإلا يظهر «نجاح وهمي» للمستخدم بدون إرسال فعلي.
2. **`"type": "module"` في `package.json`:** على Vercel وقت التشغيل، الاستيرادات النسبية من ملفات API تحتاج امتداداً صريحاً `.js` حتى لو المصدر TypeScript (`../utils/contactSchema.js`) — وإلا `ERR_MODULE_NOT_FOUND`.

### 17.9 المكتبات ومتغيرات البيئة

**مكتبات:** `resend`, `zod`, `@upstash/ratelimit`, `@upstash/redis`, `@vercel/node` (+ تحقق Turnstile عبر `fetch` إلى Cloudflare بدون SDK).

| المتغير | أين | الاستخدام |
|---------|-----|-----------|
| `GA_MEASUREMENT_ID` | عميل (Vite `define`) | Analytics بعد موافقة |
| `TURNSTILE_SITE_KEY` | عميل (Vite `define`) | عرض ويدجت CAPTCHA |
| `TURNSTILE_SECRET_KEY` | سيرفر فقط | siteverify |
| `RESEND_API_KEY` | سيرفر فقط | إرسال البريد |
| `UPSTASH_REDIS_REST_URL` | سيرفر فقط | Rate limit |
| `UPSTASH_REDIS_REST_TOKEN` | سيرفر فقط | Rate limit |

- القالب: `.env.example` — الأسرار **لا** تُحقن في المتصفح.
- على Vercel: Environment Variables + **إعادة نشر** بعد الإضافة.
- محلياً: بدون Upstash/Turnstile يمكن تخطي الحماية؛ على Vercel كلاهما إلزامي (fail-closed).

---

## 18) مشروع تحسين محركات البحث (SEO) الشامل

### 18.1 البنية التحتية للغات (Subdirectories)

**التحول:** من مسارات بدون لغة (`/services`) إلى بادئات `/nl/`, `/en/`, `/ar/`.

- **اللغة الافتراضية و`x-default`:** `nl` — السوق الرئيسي هولندا، مع دعم عملاء يبحثون بالعربي والإنجليزي أيضاً.
- **ترتيب الجذر:** `HelmetProvider` → `BrowserRouter` → `AppProvider` → `AppLayout`.
- **مصدر اللغة الحالي:** يُشتق من `location.pathname` عبر `langFromPathname` داخل `AppContext`. `localStorage` للغة **تذكّر فقط** عند التبديل — ليس مصدر الحقيقة (متوافق مع القسمين 1 و8).
- **Routes متداخلة:** `/:lang` → `LangGuard` → `Outlet` للصفحات الفرعية (`index`, `services`, `team`, `portfolio`, `portfolio/:id`, `pricing`, `contact`, …).
- **روابط مُوطَّنة:**
  - `components/LocalizedLink.tsx` — `LocalizedLink` / `LocalizedNavLink` / `LocalizedNavigate`
  - `utils/localizePath.ts` — `localizePath`, `replaceLangInPathname`, …
  - `hooks/useLocalizedNavigate.ts` — لتغطية `navigate()` البرمجي
  - تغطية `window.history.replaceState` في أماكن مثل `MainPricing` و`ServicesDetailed` عبر `localizePath`
- **`setLang`:** يستبدل أول مقطع لغة في المسار ويُبقي باقي المسار/الـ hash (مثال: `/nl/portfolio/alasaylf` → `/en/portfolio/alasaylf`).
- **Redirects دائمة في `vercel.json` (308):**

| المصدر | الوجهة |
|--------|--------|
| `/` | `/nl` |
| `/services` | `/nl/services` |
| `/team` | `/nl/team` |
| `/portfolio` | `/nl/portfolio` |
| `/portfolio/:id` | `/nl/portfolio/:id` |
| `/pricing` | `/nl/pricing` |
| `/web-pricing` | `/nl/pricing` |
| `/contact` | `/nl/contact` |

حماية الروابط القديمة المفهرسة من الضياع إلى الرئيسية العامة.

### 18.2 Meta Tags، Hreflang، Open Graph

- المكتبة: `react-helmet-async` + مكوّن موحّد `components/SEO.tsx`.
- البيانات: `SITE_URL` و`PAGE_META` في `content/i18n/` (عبر `constants.ts`) — صفحات ثابتة تشمل أيضاً `privacy` / `terms` / `cookieSettings` × 3 لغات.
- صفحات المشاريع: توليد من `project.translations[lang]` بصيغة `{title} – {category} | AxonXcode` + `shortDescription` + صورة `coverImage` مطلقة.
- لكل صفحة داخل `<Helmet>`:
  - `<title>` + `<meta name="description">`
  - `canonical` ذاتي لـ `/${lang}${path}`
  - **4** وسوم `hreflang`: `nl` / `en` / `ar` + `x-default` → نسخة `nl`
  - Open Graph + Twitter Card (`summary_large_image`) + `og:site_name = AxonXcode`
- **Fallback في `index.html`:** عنوان ووصف هولنديان ثابتان قبل تشغيل JS.
- **درس React 19 + Helmet:** الإصدار 3 يمرّر الوسوم لـ React 19 لرفعها إلى `<head>` **دون حذف** fallback الثابت في `index.html` — يسبب تكراراً. الحل المنفّذ: `pruneStaticHeadFallbacks` في `SEO.tsx` يزيل النسخ غير المطابقة بعد الهيدرنة.
- **Edge Middleware (`middleware.ts` — Phase 5):** عند تطابق User-Agent بوت (Googlebot، bingbot، DuckDuckBot، Yandex، Facebook/LinkedIn/WhatsApp/Twitter/Slack/Discord/Telegram، …) يُرجع HTML خفيفاً بـ title/description/canonical/hreflang/OG للصورة — يعالج قيد «البوتات لا تنفّذ JS». المسارات الثابتة تشمل `privacy` / `terms` / `cookie-settings` (مفتاح meta: `cookieSettings`).

### 18.3 Sitemap، Robots.txt، البيانات الهيكلية، وموقع Heerlen

#### Sitemap

- السكربت: `scripts/generate-sitemap.ts` عبر `"prebuild": "tsx scripts/generate-sitemap.ts"`.
- يكتب `public/sitemap.xml` بـ `writeFileSync` (استبدال كامل).
- **39 رابطاً حالياً:** (9 مسارات ثابتة × 3 لغات) + (4 مشاريع × 3 لغات)  
  الثابتة: الرئيسية، services، team، portfolio، pricing، contact، **privacy**، **terms**، **cookie-settings**.
- لكل `<url>`: hreflang الثلاث + `x-default`، و`<lastmod>` بتاريخ يوم البناء.
- Vite ينسخ الملف إلى `dist/`؛ Vercel يقدّمه كملف ثابت قبل SPA rewrite.

#### `public/robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://www.axonxcode.com/sitemap.xml
```

#### JSON-LD — `ProfessionalService`

- Prop اختياري `includeOrganizationSchema` في `SEO.tsx` (افتراضي `false`).
- مفعّل فقط على: `HomePage` و`ContactPage`.
- الحقول: `name`, `image` (مطلق), `url` (`SITE_URL`), `telephone`, `email` (= `config.contactEmail` الظاهر للزائر), `address` (`Heerlen` + `NL` فقط), `areaServed`, `description` من `PAGE_META.home[lang]`, `sameAs` من `config.socials`.
- **مرفوض عمداً:** `priceRange`، رقم KVK، إحداثيات GPS، عنوان شارع/رمز بريدي.
- **ملاحظة مؤقتة:** رابط Instagram في `sameAs` ما زال `https://instagram.com` العام — يُحدَّث لاحقاً عند توفر بروفايل حقيقي.

#### حقل `location` (Heerlen)

- في `SiteConfig` / `content/site/identity.ts`: `Record<Language, string>` — مثال nl: `Heerlen, Nederland`.
- جزء من `INITIAL_CONFIG` مباشرة عبر `AppContext` (لا دمج localStorage).
- العرض: Footer + صف موقع في `ContactInfo` (أيقونة `fa-location-dot`) — **بدون** خرائط أو عنوان سكني كامل.

#### Security headers (`vercel.json` — Phase 5)

على كل المسارات (`/(.*)`):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- **CSP:** `default-src 'self'` مع استثناءات لـ Google Tag Manager/Analytics وCloudflare Turnstile؛ `frame-ancestors 'none'`؛ `object-src 'none'`

---

## 19) Phase 1 — أمن حرج + Hooks + توثيق خفيف (يوليو 2026)

| البند | المشكلة | الحل المنفّذ |
|---|---|---|
| B1 Hooks | `useEffect` بعد early return في صفحة المشروع | نقل الـ hook قبل أي return شرطي |
| S5 Gemini | حقن `GEMINI_API_KEY` / `API_KEY` في حزمة المتصفح عبر Vite | حذفها من `define`؛ الإبقاء على مفاتيح عامة فقط |
| S2/S3 Rate limit | تخطٍ صامت بدون Upstash؛ IP من hop أيسر قابل للتزوير | fail-closed على Vercel؛ IP من `x-real-ip` / آخر hop |
| S8 Secrets | خطر تتبع ملفات `.env` | `.gitignore`: `.env.*` + استثناء `.env.example` |
| توثيق قانوني | إشارات قديمة لغياب privacy | تأكيد وجود `/privacy` `/terms` `/cookie-settings` |

---

## 20) Phase 2 — أداء (صور + lazy) (يوليو 2026)

| البند | النتيجة |
|---|---|
| Lazy routes | كل الصفحات عبر `React.lazy` + `Suspense` في `App.tsx` |
| Hash scroll | إعادة محاولة التمرير 150 / 400 / 800ms بعد تحميل كسول |
| Home below-fold | `HomePage`: Hero + Statistics فوري؛ الباقي lazy |
| Hero WebP | `Aamr-with-agroup-op-workers.webp` (~80KB) بدل PNG ضخم؛ **الصورة مستخدمة في `HomeHero` — ليست يتيمة** |
| تنظيف أصول | حذف أصول غير مستخدمة (~15MB+)؛ مجلد assets ≈ 25MB |
| مفاتيح React | إصلاح `key` ناقص في شبكة `PricingSection` |

---

## 21) Phase 3 — تقسيم `constants.ts` → `content/*` (يوليو 2026)

المحتوى مُقسَّم حسب المجال:

| المسار | المحتوى |
|---|---|
| `content/site/` | identity, hero, stats, sectionHeaders |
| `content/home/` | testimonials, faqs, homeSectionCopy |
| `content/services/` | services, workPrinciples |
| `content/portfolio/projects.ts` | المشاريع الأربعة |
| `content/pricing/` | mainPlans, addOns |
| `content/i18n/` | SITE_URL, PAGE_META, UI_TEXTS, pageMetaKey |
| `content/index.ts` | تجميع `INITIAL_CONFIG` |

`constants.ts` = **barrel** يعيد التصدير فقط — الاستيرادات القديمة `from './constants'` تبقى صالحة.

---

## 22) Phase 4 — Features refactor (يوليو 2026)

| البند | الملفات / النتيجة |
|---|---|
| Pricing shared | `utils/pricing/planHelpers.ts`, `pricingLabels.ts`, `buildPlanContactMessage.ts` — يستخدمها `PricingSection` و`MainPricing` |
| Contact | `hooks/useContactForm.ts` + `ContactInfo.tsx` + `ContactForm.tsx`؛ `Contact.tsx` رفيع |
| Project detail | `components/project/`: Hero, Gallery, Lightbox, `projectDetailCopy.ts` |
| Services/nav hooks | `useIsMobileNav`, `useRevealOnScroll` |
| Navbar | `LanguageSwitcher.tsx` مستخرج |

---

## 23) Phase 5 — أمن متقدم + SEO (يوليو 2026)

| البند | التفاصيل |
|---|---|
| بدون CDN | حذف سكربتات Tailwind/FA/Google Fonts من `index.html`؛ استيراد عبر `index.css` + npm |
| حزم | `tailwindcss`, `@tailwindcss/vite`, `@fortawesome/fontawesome-free`, `@fontsource/inter`, `@fontsource/cairo` |
| Headers | انظر القسم 18.3 — CSP يسمح بـ Turnstile وGA فقط خارج `'self'` |
| Turnstile | `TurnstileWidget` + `utils/verifyTurnstile.ts` + حقل `turnstileToken`؛ fail-closed على Vercel |
| GA cleanup | `clearGoogleAnalytics()` من البانر وإعدادات الكوكيز عند essential |
| SEO bots | توسيع UA في `middleware.ts`؛ خريطة `cookie-settings` → `cookieSettings` |
| Sitemap | إضافة privacy / terms / cookie-settings → **39 URL** |

**تحقق بعد النشر:** مظهر بدون CDN؛ نموذج تواصل مع مفاتيح Turnstile؛ مسح `_ga` عند essential؛ `/sitemap.xml`.

---

## 24) Phase 6 — تنظيف كود ميت (يوليو 2026)

| البند | التفاصيل |
|---|---|
| Types | حذف `User` / `UserRole` / `Permissions` / `Plan` / `Translation` |
| UI_TEXTS | إزالة ~55 مفتاح CMS/admin؛ الإبقاء على nav/contact/cookie/hero/footer |
| AppContext | حذف `setConfig` و`siteConfig` localStorage؛ `config = INITIAL_CONFIG` |
| metadata.json | حذف بقايا CMS (`requestFramePermissions: camera` كان يتعارض مع Permissions-Policy) |
| Assets | مراجعة: لا يتيم تحت `public/assets` — لا حذف إضافي |
| أثر البناء | تصغير طفيف لحزمة JS الرئيسية بعد تقليم النصوص |

**ملاحظة تشغيلية:** زائر لديه `siteConfig` قديم في المتصفح لن يؤثر بعد الآن — المحتوى دائماً من البناء الحالي.

---

## 25) فهرس سريع للأقسام

| قسم | الموضوع |
|---|---|
| 1–14 | نظرة عامة، هيكل، تسعير، دروس، متبقٍ |
| 15 | تسعير/خدمات/هوية/GA (قبل خطة الإصلاح) |
| 16 | Portfolio |
| 17 | Contact API (+ Turnstile) |
| 18 | SEO + middleware + headers |
| 19–24 | Phases 1–6 لخطة الإصلاح الشاملة |
