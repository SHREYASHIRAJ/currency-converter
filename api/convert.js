// api/convert.js
export default async function handler(req, res) {
  // --- CORS (adjust origin for prod if you want) ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // Accept both POST (JSON) and GET (query)
    let input_ticker, output_ticker, value;

    if (req.method === "POST") {
      const body = req.body || {};
      input_ticker  = String(body.input_ticker || "").trim().toUpperCase();
      output_ticker = String(body.output_ticker || "").trim().toUpperCase();
      value         = body.value;
    } else {
      input_ticker  = String(req.query.input_ticker || "").trim().toUpperCase();
      output_ticker = String(req.query.output_ticker || "").trim().toUpperCase();
      value         = req.query.value;
    }

    // Basic validation
    if (!input_ticker || !output_ticker || value === undefined || value === null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const amountNum = Number(value);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Call free rate source (no API key)
    const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(
      input_ticker
    )}&to=${encodeURIComponent(output_ticker)}`;

    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(502).json({ error: "Rate provider error" });
    }

    const data = await upstream.json();
    const rate = data?.rates?.[output_ticker];

    if (!rate) {
      return res.status(400).json({ error: "Unsupported currency" });
    }

    const converted_value = amountNum * rate;

    return res.status(200).json({
      input_ticker,
      value: amountNum,
      output_ticker,
      unix_timestamp: Date.now(),
      current_conv_rate: rate,
      converted_value
    });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
