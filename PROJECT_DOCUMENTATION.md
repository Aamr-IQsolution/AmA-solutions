# توثيق شامل للمشروع - axonXcode

## 1) نظرة عامة
- **اسم المشروع:** `q-solution-portfolio-&-cms`
- **النوع:** واجهة React أحادية الصفحة (SPA) مبنية بـ Vite وTypeScript.
- **الهدف الحالي:** موقع بورتفوليو/خدمات متعدد اللغات (عربي/إنجليزي/هولندي) مع أقسام تسعير، أعمال، فريق، وتواصل.
- **مصدر البيانات:** بيانات ثابتة محلية داخل `constants.ts` + حفظ تفضيلات المستخدم في `localStorage`.

## 2) التقنيات والاعتمادات

### الاعتمادات الأساسية (`package.json`)
- `react` + `react-dom` (الإصدار 19.2.3)
- `three` + `@types/three` لخلفية ثلاثية الأبعاد
- `vite` + `@vitejs/plugin-react` للتطوير والبناء
- `typescript`

### مكتبات عبر CDN من `index.html`
- `tailwindcss` عبر `https://cdn.tailwindcss.com`
- `Font Awesome` للأيقونات
- Google Fonts (`Inter`, `Cairo`)

## 3) هيكل المشروع الحالي

```text
axonXcode/
├─ App.tsx
├─ index.tsx
├─ index.html
├─ constants.ts
├─ types.ts
├─ vite.config.ts
├─ tsconfig.json
├─ vercel.json
├─ metadata.json
├─ components/
│  ├─ Navbar.tsx
│  ├─ Hero.tsx
│  ├─ ThreeDBackground.tsx
│  ├─ Services.tsx
│  ├─ WebPricing.tsx
│  ├─ Pricing.tsx
│  ├─ Portfolio.tsx
│  ├─ Team.tsx
│  ├─ Contact.tsx
│  ├─ Footer.tsx
│  ├─ LanguagePicker.tsx
│  └─ SectionHeader.tsx
├─ context/
│  └─ AppContext.tsx
└─ public/
   ├─ assets/
   │  ├─ gb.svg
   │  ├─ nl.svg
   │  └─ sy.svg
   └─ 3d-scroll-background (1).html
```

## 4) معمارية التطبيق (Architecture)

### نقطة البداية
- `index.tsx` يقوم بعمل mount للتطبيق داخل `#root`.

### الجذر
- `App.tsx` يلف التطبيق داخل `AppProvider`.
- يعرض شاشة اختيار اللغة (`LanguagePicker`) أول مرة فقط بناءً على المفتاح:
  - `localStorage["has_selected_lang"]`

### إدارة الحالة العامة
- `context/AppContext.tsx` يوفر:
  - `lang` و `setLang`
  - `config` و `setConfig` (كامل إعدادات الموقع)
  - `isRTL`
  - `contactMessage` و `setContactMessage`
- التخزين المحلي:
  - اللغة: `localStorage["lang"]`
  - الإعدادات: `localStorage["siteConfig"]`

### البيانات والمحتوى
- `constants.ts` يحتوي:
  - `INITIAL_CONFIG` (كل محتوى الموقع متعدد اللغات)
  - `UI_TEXTS` (نصوص واجهة الاستخدام)
- `types.ts` يعرّف الأنواع:
  - `Language`, `SiteConfig`, `Service`, `Plan`, `Project`, إلخ.

## 5) المكونات وعلاقاتها

### التسلسل داخل الصفحة
من `App.tsx`:
1. `Navbar`
2. `Hero`
3. `Services`
4. `WebPricing`
5. `Pricing`
6. `Portfolio`
7. `Team`
8. `Contact`
9. `Footer`

### علاقات مهمة بين المكونات
- `Pricing` و `WebPricing`:
  - عند اختيار باقة يتم تجهيز رسالة تلقائية عبر `setContactMessage`.
  - ثم يتم التمرير إلى قسم `Contact`.
- `Contact`:
  - يراقب `contactMessage` (من `AppContext`) ويملأ حقل الرسالة تلقائيًا.
  - الإرسال يتم عبر `mailto:` إلى `config.contactEmail`.
- `Navbar`:
  - يغير اللغة عبر `setLang`.
  - تنقل داخلي للأقسام بالتمرير الناعم.
- `Hero`:
  - يستخدم `ThreeDBackground` (Three.js) + طبقات بصرية.
- `Team`:
  - يستخدم `SectionHeader` لعرض عنوان القسم.

## 6) تدفّق البيانات (Data Flow)

1. التطبيق يحمّل `lang` و`config` من `localStorage` (أو القيم الافتراضية).
2. كل المكونات تقرأ من `useApp()`:
   - النصوص/المحتوى حسب `lang`
   - بيانات الأقسام من `config`
3. أي تعديل على `lang` أو `config` يتم حفظه مباشرة في `localStorage`.
4. عند اختيار باقة، يتم تمرير الرسالة إلى `Contact` عبر context.

## 7) التهيئة والتشغيل

### أوامر npm
- تطوير: `npm run dev`
- بناء: `npm run build`
- معاينة البناء: `npm run preview`

### إعداد Vite
- المنفذ: `3000`
- الاستضافة: `0.0.0.0`
- alias: `@ -> .`
- تعريفات بيئة:
  - `process.env.API_KEY`
  - `process.env.GEMINI_API_KEY`
  - يتم حقنها من `GEMINI_API_KEY` في `.env`

### النشر
- `vercel.json` يفعّل rewrite لكل المسارات إلى `index.html` (نمط SPA).

## 8) ملاحظات فنية مهمة (مراجعة الحالة الحالية)

### ما تم إصلاحه
- **توحيد ids للتنقل:**
  - تم توحيد أقسام التسعير إلى `id="web-pricing"` و `id="pricing"` ليتطابقا مع روابط `Navbar`.

- **معالجة مرجع CSS:**
  - تمت إضافة ملف `index.css` ليتوافق مع المرجع الموجود في `index.html`.

- **تقليل مشاكل الصور المفقودة:**
  - تمت إضافة ملف بديل `public/assets/placeholder.svg`.
  - تم تحديث المسارات المحلية غير المتوفرة في `constants.ts` وخلفية `Hero` لاستخدام الصورة البديلة.

- **تحسين تنظيف موارد Three.js:**
  - تمت إضافة `cancelAnimationFrame`.
  - تمت إضافة `dispose` للـ geometries/materials/renderer وإزالة العناصر من المشهد عند unmount.

### نقاط قوة في البنية
- إدارة حالة مركزية عبر Context.
- تعدد لغات فعلي ومدمج داخل المحتوى.
- بنية مكونات واضحة ومنفصلة حسب كل قسم.
- تدفّق منطقي جيد بين التسعير ونموذج التواصل.

## 9) توصيات تطوير قريبة
- توحيد ids بين `Navbar` والأقسام (`web-pricing/web-prices` و `pricing/prices`).
- إزالة رابط `/index.css` أو إنشاء الملف فعليًا.
- مراجعة جميع مسارات الصور في `INITIAL_CONFIG` ومطابقتها مع `public/assets`.
- تحسين `ThreeDBackground` بإضافة cleanup/dispose كامل لتقليل استهلاك الذاكرة.
- نقل إعداد Tailwind من CDN إلى إعداد محلي (`tailwind.config` + PostCSS) إن كان الهدف إنتاجي بالكامل.

## 10) ملخص سريع
- المشروع هو SPA احترافي بصريًا، مبني بـ React + Vite + TypeScript، مع دعم 3 لغات وبيانات محتوى مركزية.
- العلاقات بين المكونات تعتمد على `AppContext`، خصوصًا اللغة وبيانات الإعدادات ورسائل التواصل المسبقة.
- الهيكل الحالي جيد كبنية، لكن توجد نقاط مطلوبة لضمان الاستقرار (روابط الأقسام، الأصول، وبعض التنظيف الفني).
