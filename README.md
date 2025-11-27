<h1 align="center">📱 SmsBot-Notion</h1>
<p align="center">Sync Iranian Bank Mellat SMS → Notion Database (with USD conversion)<br>Powered by Vercel Serverless + Notion API</p>

---

## 🚀 Overview

این پروژه پیامک‌های **بانک ملت** را می‌گیرد و به‌صورت خودکار یک رکورد جدید داخل دیتابیس Notion شما ثبت می‌کند.

### ویژگی‌ها:
- تشخیص **برداشت** (Expense) و **واریز** (Income)
- استخراج مبلغ از پیامک بانک ملت
- تبدیل مبلغ تومان → دلار  
  از طریق API:


https://taha-zaki.github.io/usd-to-toman/data.json

- ساخت رکورد کامل در Notion شامل:
- Name  
- Type  
- Label  
- Amount (USD)  
- Date  
- Account (ثابت: Mellat Card)

---

## 📱 Example SMS Format (Bank Mellat)



حساب748025373047
برداشت300,000
مانده19,061,382
04/09/05-17:17


یا:



حساب748035273047
واریز300,000
مانده19,061,382
04/09/05-17:17


---

## 🧠 How It Works

1. پیامک جدید روی گوشی دریافت می‌شود  
2. اپ SMS Forwarder آن را به آدرس Vercel POST می‌کند  
3. تابع Vercel:
   - متن پیام را پارس می‌کند  
   - مبلغ را استخراج می‌کند  
   - نرخ دلار را از API می‌گیرد  
   - مبلغ نهایی دلاری را حساب می‌کند  
   - تراکنش را داخل Notion می‌سازد

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Taha-Zaki/SmsBot-Notion
cd SmsBot-Notion

2️⃣ Create Notion Integration

برو به
https://www.notion.so/my-integrations

New Integration

Permission: Read + Write

Token را کپی کن

دیتابیس Notion را باز کن → Share → Add Connection → Integration را اضافه کن

3️⃣ Notion Database Requirements

دیتابیس باید شامل Propertyهای زیر باشد:

Property	Type
Name	Title
Type	Select (Income / Expense)
Label	Rich Text
Amount	Number
Date	Date
Account	Rich Text
4️⃣ Environment Variables (Vercel)

به مسیر زیر برو:
Project → Settings → Environment Variables

این‌ها را اضافه کن:

KEY	VALUE
NOTION_TOKEN	Integration Token
NOTION_DATABASE_ID	Database ID
5️⃣ Deploy to Vercel

اگر CLI داری:

vercel


یا از داشبورد Vercel → Import Project from GitHub

6️⃣ Android SMS Forwarder Setup

در Google Play نصب کن:

SMS Forwarder – Auto Forward SMS to URL

تنظیمات:

Trigger → SMS Received

Filter → شامل "برداشت" یا "واریز"

Action → HTTP Request

Method → POST

URL:

https://your-vercel-domain.vercel.app/api/add-transaction


Body (JSON):

{
  "text": "$message"
}

📂 Project Structure
SmsBot-Notion/
│
├── api/
│   └── add-transaction.js
│
├── README.md
├── package.json
├── vercel.json
└── .env.example

🧾 Example API Success Response
{
  "ok": true,
  "output": {
    "id": "xxxxxxxxxxxx"
  }
}

📌 Features to Add (PR Welcome)

پشتیبانی از بانک‌های دیگر

ذخیره تاریخ شمسی

تبدیل تاریخ جلالی → میلادی

ساخت نمودار هزینه ماهانه در Notion

ساخت نسخه iOS (Notifications Listener)

🤝 Contributing

PR و Issue آزاد است.
اگر خواستید، پروژه را Fork کنید.

📜 License

MIT License — Feel free to use.

⭐ Support the Project

اگر پروژه به‌دردتان خورد:

⭐ این ریپو را Star کنید

Link را منتشر کنید

مشارکت کنید

<h3 align="center">Made with ❤️ by Taha</h3> ```
