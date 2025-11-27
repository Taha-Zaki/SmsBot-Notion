# SmsBot-Notion
🚀 SmsBot-Notion

Automatically sync Iranian bank SMS (Mellat Bank) to Notion database — with USD conversion.
Simple, free, and powered by Vercel Serverless Functions + Notion API.

📌 Overview

این پروژه پیامک‌های بانک ملت را دریافت می‌کند (از طریق اپ SMS Forwarder روی گوشی)
و آن‌ها را تبدیل می‌کند به یک رکورد کامل در Notion Database:

🔹 پشتیبانی از:

برداشت (Expense)

واریز (Income)

🔹 امکانات:

استخراج خودکار مبلغ از SMS

تشخیص نوع تراکنش (برداشت/واریز)

تبدیل مبلغ تومان → دلار
با استفاده از API:

https://taha-zaki.github.io/usd-to-toman/data.json


ثبت تراکنش در Notion با فیلدهای کامل:

Name

Type (Income / Expense)

Label

Amount (USD)

Date (مثل Nov 25, 2025)

Account (ثابت: "Mellat Card")

🔹 100% Free Stack:

Vercel Hobby (Serverless) – رایگان

Notion – رایگان

GitHub – برای سورس

اپ SMS Forwarder – رایگان در Google Play

📱 Example SMS

نمونه پیام بانک ملت که این بات پشتیبانی می‌کند:

حساب7480373047
برداشت300,000
مانده19,061,382
04/09/05-17:17


یا:

حساب7480373047
واریز300,000 
مانده19,061,382
04/09/05-17:17

🧠 How It Works

پیامک جدید روی گوشی دریافت می‌شود

اپ SMS Forwarder آن را POST می‌کند →
https://your-vercel-domain.com/api/add-transaction

تابع سروِرلس:

متن پیامک را پارس می‌کند

نوع تراکنش را تشخیص می‌دهد

مبلغ را استخراج می‌کند

نرخ روز دلار را از API می‌گیرد

مبلغ را به USD تبدیل می‌کند

رکورد را داخل Notion می‌سازد

🛠️ Setup Guide
1️⃣ Clone the repository
git clone https://github.com/Taha-Zaki/SmsBot-Notion
cd SmsBot-Notion

2️⃣ Create Notion Integration

برو به:
https://www.notion.so/my-integrations

"Create New Integration"

Permission = Read + Write

Token را کپی کن

دیتابیس موردنظرت را با Integration Share کن

3️⃣ Prepare Notion Database

دیتابیس باید شامل این Propertyها باشد:

Property	Type
Name	Title
Type	Select (Income, Expense)
Label	Rich Text
Amount	Number
Date	Date
Account	Rich Text

DATABASE_ID را از URL صفحه Notion کپی کنید.

4️⃣ Deploy to Vercel

اگر Vercel CLI داری:

vercel


یا از داشبورد:

New Project → Import from GitHub

Repo: SmsBot-Notion

5️⃣ Add Environment Variables in Vercel

به مسیر:
Project → Settings → Environment Variables

این‌ها را اضافه کنید:

KEY	VALUE
NOTION_TOKEN	توکن Integration
NOTION_DATABASE_ID	دیتابیس ID

بعد:

Redeploy یا Deploy جدید

6️⃣ Configure SMS Forwarding (Android)

در Google Play نصب کن:

SMS Forwarder – Auto Forward SMS to URL
(تست‌شده، رایگان)

تنظیمات:

Add Rule

Text Filter:

برداشت
वاریز
Mellat


Forward To → HTTP URL

Method = POST

URL:

https://your-vercel-domain.com/api/add-transaction


Body Type = JSON

Body:

{
  "text": "$message"
}

🧩 API Response Example

موفق:

{
  "ok": true,
  "output": {
    "id": "some-notion-page-id"
  }
}


خطا:

{
  "ok": false,
  "error": "Something went wrong..."
}

📂 File Structure
SmsBot-Notion/
│
├── api/
│   └── add-transaction.js   # Main Vercel serverless function
│
├── README.md
└── package.json

⭐ Support

اگر این پروژه به دردتان خورد:

⭐ بدهید

Fork کنید

Share کنید
