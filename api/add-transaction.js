export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ ok: false, error: "Missing SMS text" });
    }

    // ============== PARSE BANK MELLAT SMS =====================

    // شماره حساب
    const accountMatch = text.match(/حساب(\d+)/);
    const accountNumber = accountMatch ? accountMatch[1] : null;

    // برداشت یا واریز
    const isWithdraw = text.includes("برداشت");
    const isDeposit = text.includes("واریز");

    // مبلغ
    const amountMatch = text.match(/(?:برداشت|واریز)([\d,]+)/);
    const amountToman = amountMatch
      ? Number(amountMatch[1].replace(/,/g, ""))
      : null;

    // موجودی
    const balanceMatch = text.match(/مانده([\d,]+)/);
    const balance = balanceMatch
      ? Number(balanceMatch[1].replace(/,/g, ""))
      : null;

    // تاریخ و ساعت پیامک
    const datetimeMatch = text.match(/(\d{2}\/\d{2}\/\d{2})-(\d{2}:\d{2})/);
    const jalaliDate = datetimeMatch ? datetimeMatch[1] : null;
    const time = datetimeMatch ? datetimeMatch[2] : null;

    // ============== FETCH USD PRICE =====================

    const usdApi = await fetch("https://taha-zaki.github.io/usd-to-toman/data.json");
    const usdData = await usdApi.json();
    const usdRate = usdData.usd_price_irr; // نرخ دلار

    // مبلغ دلاری
    let usdAmount = amountToman / usdRate;

    if (isWithdraw) usdAmount = -usdAmount; // اگر برداشت → منفی

    // رند تا 2 رقم
    usdAmount = Number(usdAmount.toFixed(2));

    // ============== TODAY DATE FOR NOTION =====================
    const today = new Date();
    const formattedDate = today.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }); // مثل: Nov 25, 2025

    // ============== NOTION PAYLOAD =====================

    const notionResp = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },

        properties: {
          Name: {
            title: [
              {
                text: {
                  content: isDeposit
                    ? `Deposit ${amountToman}`
                    : `Withdraw ${amountToman}`
                }
              }
            ]
          },

          Type: {
            select: {
              name: isDeposit ? "Income" : "Expense"
            }
          },

          Label: {
            rich_text: []
          },

          Amount: {
            number: usdAmount
          },

          Date: {
            date: {
              start: formattedDate
            }
          },

          Account: {
            rich_text: [
              {
                text: { content: "Mellat Card" }
              }
            ]
          }
        }
      })
    });

    const output = await notionResp.json();

    if (!notionResp.ok) {
      return res.status(500).json({ ok: false, error: output });
    }

    return res.status(200).json({ ok: true, output });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
