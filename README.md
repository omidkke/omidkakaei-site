# Omid Kakaei — omidkakaei.ir

وب‌سایت شخصی فارسی/انگلیسی، استاتیک و بدون وابستگی خارجی.

## انتشار / Deployment

تمام فایل‌های آماده در همین ریشه قرار دارند. برای انتشار اولیه نیازی به اجرای build نیست.

1. محتوای این پوشه (نه خود پوشه و نه فایل ZIP) را در ریشه مخزن `omidkke/omidkakaei-site` و شاخه `main` قرار دهید. پوشه `.git` را بارگذاری نکنید.
2. در Settings → Pages، گزینه `Deploy from a branch`، شاخه `main` و مسیر `/(root)` را انتخاب کنید.
3. Custom domain باید `omidkakaei.ir` بماند؛ فایل `CNAME` نیز همین مقدار را دارد. تنظیم DNS موجود را حفظ کنید.
4. در زبانه Actions منتظر موفقیت `pages build and deployment` بمانید.
5. صفحه اصلی، `en/index.html`، `about.html` و `knowledge.html` را روی دامنه باز کنید. جست‌وجو و تغییر زبان را بررسی کنید. اگر گواهی دامنه هنوز صادر نشده، پس از آماده‌شدن آن Enforce HTTPS را فعال کنید.

راهنمای رسمی: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

English: upload the contents to the repository root on `main`, keep CNAME, and publish from `main / (root)`. No install, database, API key, or paid hosting is required. Generated HTML is committed alongside its sources.

## ویرایش اطلاعات شخصی / Profile

فایل `content/profile.json` منبع اطلاعات است. `name`، `intro` و `bio` دو مقدار `fa` و `en` دارند. موارد داخل براکت جای‌خالی‌اند. آرایه‌های `experience` و `projects` عمداً خالی‌اند؛ اطلاعات ساختگی درج نشده است.

هر سابقه یا پروژه می‌تواند این ساختار را داشته باشد (مقادیر را با اطلاعات واقعی جایگزین کنید):

```json
{"dates":"[بازه زمانی]","title":{"fa":"[عنوان]","en":"[Title]"},"description":{"fa":"[شرح تأییدشده]","en":"[Confirmed description]"}}
```

برای تماس، `email` و `linkedin` را با نشانی عمومی تأییدشده پر کنید. برای رزومه، فایل PDF را در `assets` قرار دهید و `resume` را مثلاً `assets/resume.pdf` بگذارید. تا زمان تکمیل، هیچ فرم ارسال نمایشی یا پیوند ایمیل جعلی وجود ندارد.

## افزودن مقاله / Articles

فایل `content/articles.json` را ویرایش کنید؛ نیازی به نوشتن HTML نیست. یک شیء را کپی کنید و `slug` یکتا، `category` و متن‌های `fa` و `en` را تغییر دهید. دسته‌ها: `notes`، `management`، `technology`، `economy`.

`body` آرایه‌ای از بندهای متن است؛ برای تیتر از پیشوند `## ` استفاده کنید. HTML ورودی به‌صورت متن امن نمایش داده می‌شود. `sample: true` برچسب نمونه را نشان می‌دهد؛ فقط برای مقاله اصلی تأییدشده آن را `false` کنید. هر دو ترجمه را هم‌زمان تکمیل کنید.

پس از هر ویرایش محتوا با Node.js نصب‌شده اجرا کنید:

```sh
npm run build
npm run check
npm start
```

پیش‌نمایش: http://127.0.0.1:4173 — برای توقف Ctrl+C. سپس فایل منبع و HTMLهای ساخته‌شده را با هم در مخزن بارگذاری کنید. باز کردن مستقیم فایل HTML ظاهر را نشان می‌دهد، اما برای جست‌وجو از پیش‌نمایش HTTP استفاده کنید.

Git workflow (after signing in through your own Git client):

```sh
git add .
git commit -m "Update bilingual website content"
git push origin main
```

## ساختار و دسترس‌پذیری

- فارسی در ریشه؛ انگلیسی در `en/`؛ تغییر زبان به صفحه متناظر می‌رود.
- عکس سیاه‌وسفید اصلی در خانه و عکس رسمی رنگی اصلی در About، بدون تغییر چهره.
- جست‌وجو روی عنوان، خلاصه، متن و دسته؛ یکسان‌سازی ی/ي و ک/ك و نیم‌فاصله؛ فیلتر موضوع و حالت بدون نتیجه.
- محتوای کامل بدون JavaScript هم خواندنی است؛ فقط جست‌وجو به آن نیاز دارد.
- جهت RTL/LTR، برچسب فیلدها، متن جایگزین تصاویر، فوکوس قابل مشاهده، پیوند پرش، شمارش زنده نتایج و منوی موبایل با Escape.
- بدون ردیاب، کوکی، درخواست خارجی فونت یا ذخیره اطلاعات بازدیدکننده.
- عنوان و توضیح هر صفحه، canonical، hreflang، sitemap، robots و صفحه 404.

اسکریپت `check` پیوندها، ساختار دو زبان، متن جایگزین تصاویر و منطق یکسان‌سازی جست‌وجو را بررسی می‌کند. این بررسی جای ممیزی کامل دسترس‌پذیری با صفحه‌خوان را نمی‌گیرد.
