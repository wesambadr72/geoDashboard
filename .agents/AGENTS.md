# إرشادات التطوير والتنسيق لمشروع GeoDashboard (AGENTS.md)

مرحباً بك! هذا الملف يحتوي على القواعد والتعليمات والتعريف بنية مشروع **GeoDashboard** لضمان سير العمل بشكل صحيح وتناسق الكود البرمجي بين مختلف الأجزاء.

---

## 🗺️ نظرة عامة على المشروع

**GeoDashboard** هو تطبيق ويب متكامل (Full-Stack TypeScript Monorepo) لعرض واستكشاف معلومات الدول الجغرافية والإحصائية. يعتمد المشروع على هيكلية المستودع الموحد (Monorepo) المدار بواسطة **Turbo** ويستخدم **Bun** كمدير حزم ومحرك تشغيل.

---

## 🛠️ البنية التقنية (Technology Stack)

يتكون المشروع من ثلاثة مساحات عمل (Workspaces) رئيسية:

1. **الواجهة الأمامية (`client`)**:
   - مبنية باستخدام **Vite + React (TypeScript)**.
   - يعتمد التنسيق على **Tailwind CSS v4** الجديد كلياً.
   - استخدام مكتبة مكونات **shadcn/ui** المخصصة لتصميم واجهات تفاعلية وراقية.
   - يعتمد الخطوط: `Tajawal` (للغة العربية) و `Michroma` (للغة الإنجليزية والعناوين).

2. **الواجهة الخلفية (`server`)**:
   - مبنية باستخدام إطار عمل **Hono** السريع والمخفف.
   - يتكامل مع مزود البيانات الخارجية: `https://api.restcountries.com/countries/v5`.
   - يحتوي على نظام كاش في الذاكرة (In-memory Cache) لمدة 3 أيام للحد من استهلاك الحصة المجانية للـ API.

3. **الأكواد المشتركة (`shared`)**:
   - يحتوي على تعريفات الأنواع (TypeScript Types) مثل `Country` و `CountryResponse` و `ApiResponse`.
   - يحتوي على الثوابت المشتركة مثل قائمة الدول المميزة `TOP_COUNTRY_CODES`.

---

## 📂 هيكلية المجلدات

```
geoDashboard/
├── client/               # واجهة المستخدم (Vite + React)
│   ├── src/
│   │   ├── components/ui/# مكونات shadcn/ui (مثل button, card, table...)
│   │   ├── lib/utils.ts  # دالة المساعدة cn لدمج أصناف Tailwind
│   │   ├── App.tsx       # المكون الرئيسي للواجهة
│   │   ├── index.css     # التنسيقات العامة وتعريف ثيم Tailwind CSS v4
│   │   └── main.tsx      # نقطة دخول React
│   └── package.json
├── server/               # خادم الويب والـ API (Hono)
│   ├── src/
│   │   └── index.ts      # مسارات الـ API ومنطق الكاش واستدعاء REST Countries
│   └── package.json
├── shared/               # الأنواع والثوابت المشتركة
│   ├── src/
│   │   ├── index.ts      # تصدير الأنواع
│   │   └── types/        # ملفات تعريف واجهات البيانات (Interfaces)
│   └── package.json
├── package.json          # إعدادات الـ Monorepo وحزم التطوير العامة
└── turbo.json            # إعدادات Turbo لبناء وتشغيل المشاريع
```

---

## 📋 إرشادات هامة للمطورين والذكاء الاصطناعي (Agent Rules)

### 1. إدارة مساحات العمل والتثبيت
- **استخدم Bun دائماً**: لا تقم بتشغيل أو تثبيت أي حزمة باستخدام `npm` أو `yarn` أو `pnpm`. استخدم الحزم عن طريق `bun`.
- لتثبيت الحزم في المشروع ككل أو في مساحة عمل معينة:
  ```bash
  bun install
  ```
- لبدء تشغيل بيئة التطوير للمشروع بالكامل:
  ```bash
  bun run dev
  ```
- لتشغيل الـ Client أو الـ Server بشكل منفصل:
  ```bash
  bun run dev:client
  bun run dev:server
  ```

### 2. تعديل الأنواع المشتركة (`shared`)
- **تحديث المجلد المشترك**: عند إضافة أو تعديل أي نوع (Type) أو واجهة بيانات (Interface) تخص الدول أو الاستجابات البرمجية، يجب تعديلها داخل [shared/src/types/index.ts](file:///c:/Users/wesam/geoDashboard/shared/src/types/index.ts).
- **إعادة البناء**: بعد تعديل مساحة العمل المشتركة `shared`، **يجب عليك تشغيل البناء لكي تتعرف عليها المساحات الأخرى**:
  ```bash
  bun run build --filter=shared
  ```

### 3. إرشادات التصميم والتنسيق (Tailwind CSS v4)
- **عدم إنشاء ملفات إعداد قديمة**: لا تقم بإنشاء ملفات `tailwind.config.js` أو `postcss.config.js`. يعتمد Tailwind CSS v4 على إعداد التخصيصات عبر موجه `@theme` مباشرة داخل ملف الـ CSS الرئيسي [client/src/index.css](file:///c:/Users/wesam/geoDashboard/client/src/index.css).
- **الألوان المعتمدة**: يتبع التطبيق نظام ألوان دافئ يعتمد على درجات اللون البرتقالي المخصصة كـ CSS Variables في ملف الـ CSS:
  - الخلفية: `var(--color-orange-50)`
  - المكونات والبطاقات: `var(--color-orange-100)`
  - النصوص والعناوين الرئيسية: `var(--color-orange-900)`
- **الخطوط (Typography)**:
  - للغة العربية: استخدم الفئة `font-tajawal`.
  - للغة الإنجليزية والعناوين التجارية: استخدم الفئة `font-michroma`.

### 4. حزم ومكونات الواجهة (shadcn/ui)
- عند الرغبة في إضافة مكون جديد من shadcn/ui، يجب الانتقال إلى مجلد `client` وتشغيل الأمر المناسب باستخدام `bunx`:
  ```bash
  cd client
  bunx --bun shadcn@latest add <component_name>
  ```
  *(تم بالفعل إضافة مكونات: `button`, `card`, `separator`, `skeleton`, `table`)*.

### 5. الواجهة الخلفية والـ API (`server`)
- **مفتاح الواجهة البرمجية**: يحتاج الخادم إلى متغير البيئة `REST_COUNTRIES_API_KEY` للاتصال بـ REST Countries API بنجاح. تأكد من توفير هذا المتغير في البيئة المحلية.
- **الكاش (Caching)**:
  - يقوم الخادم بحفظ بيانات الدول محلياً في الذاكرة لتجنب تكرار الطلبات الخارجية المحدودة.
  - إذا قمت بتعديل منطق جلب البيانات أو إضافة حقول جديدة في الـ `Country` Type، قد تحتاج إلى إعادة تشغيل السيرفر لتصفير كاش الذاكرة وتجنب التعارض في الأنواع.

---

## 🚀 أوامر البناء والاختبار المتوفرة

- **بناء المشروع كاملاً**: `bun run build`
- **التحقق من أنواع TypeScript**: `bun run type-check`
- **فحص الكود (Linting)**: `bun run lint`
- **تشغيل الاختبارات**: `bun run test`
