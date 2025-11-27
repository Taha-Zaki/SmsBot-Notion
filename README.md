SmsBot-Notion
==============================

Sync Iranian Bank Mellat SMS → Notion Database (with USD conversion)
Powered by Vercel Serverless Functions + Notion API

----------------------------------------
Overview
----------------------------------------

این پروژه پیامک‌های بانک ملت را دریافت می‌کند و به‌صورت خودکار یک رکورد جدید داخل دیتابیس Notion شما اضافه می‌کند.

ویژگی‌ها:
- تشخیص خودکار برداشت / واریز
- تبدیل تومان → دلار (USD)
- پر کردن اتوماتیک Propertyهای دیتابیس
- بدون نیاز به Zapier / IFTTT / n8n
- 100٪ رایگان (Vercel + Notion + Android SMS Forwarder)

----------------------------------------
Example SMS (Bank Mellat)
----------------------------------------

Withdraw:
حساب7480373047
برداشت300,000
مانده19,061,382
04/09/05-17:17

Deposit:
حساب7480373047
واریز300,000
مانده19,061,382
04/09/05-17:17

----------------------------------------
How It Works
----------------------------------------

1. پیامک جدید روی گوشی دریافت می‌شود
2. اپ SMS Forwarder پیام را POST می‌کند:
   https://your-vercel-domain.vercel.app/api/add-transaction
3. تابع Vercel:
   - مبلغ را استخراج می‌کند
   - برداشت یا واریز را تشخیص می‌دهد
   - نرخ دلار را از API می‌گیرد
   - مبلغ دلاری را حساب می‌کند
   - Type (Income/Expense) را تعیین می‌کند
   - رکورد را داخل Notion می‌سازد

----------------------------------------
Installation & Setup
----------------------------------------

**1) Clone**
----------------------------------------
git clone https://github.com/Taha-Zaki/SmsBot-Notion
cd SmsBot-Notion

**2) Create Notion Integration**
----------------------------------------
- وارد https://www.notion.so/my-integrations شوید
- New Integration
- Permissions: Read + Insert + Update
- Token را کپی کنید
- دیتابیس را باز کنید → Share → Add Connection → Integration را اضافه کنید
**
3) Notion Database Requirements**
----------------------------------------
دیتابیس باید Propertyهای زیر را داشته باشد:

Name (Title)
Type (Select: Income, Expense)
Label (Rich Text)
Amount (Number)
Date (Date)
Account (Rich Text)

DATABASE_ID را از URL دیتابیس بردارید.

**4) Environment Variables (Vercel)**
----------------------------------------
به Settings پروژه در Vercel بروید:

NOTION_TOKEN = Notion Integration Token
NOTION_DATABASE_ID = Database ID

**5) Deploy on Vercel**
----------------------------------------
از داشبورد: Import from GitHub
یا:
vercel

**6) Android SMS Forwarder Setup**
----------------------------------------
در Google Play نصب کنید:
SMS Forwarder – Auto Forward SMS to URL

Rule:
Trigger → SMS Received
Filter → شامل "برداشت" یا "واریز"
Action → POST HTTP

URL:
https://your-vercel-domain.vercel.app/api/add-transaction

Body (JSON):
{
  "text": "$message"
}

----------------------------------------
Project Structure
----------------------------------------

SmsBot-Notion/ 

│ 

├── api/ 

│   └── add-transaction.js 

├── README.md 

├── package.json 

├── vercel.json 

└── .env.example 



----------------------------------------
API Response Example
----------------------------------------

موفق:
{
  "ok": true,
  "output": {
    "id": "notion-page-id"
  }
}

خطا:
{
  "ok": false,
  "error": "Something went wrong"
}

----------------------------------------
License
----------------------------------------
MIT License

----------------------------------------
Support
----------------------------------------
اگر پروژه مفید بود:
- ریپو را Star کنید
- Fork کنید

Taha Zaki
