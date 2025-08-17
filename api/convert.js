export default async function handler(req, res) {
  const { input_ticker, output_ticker, value } = req.query;

  // Validate params
  if (!input_ticker || !output_ticker || !value) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  let amount = parseFloat(value);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Call exchangerate API
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${input_ticker}&symbols=${output_ticker}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch conversion rate" });
    }

    const data = await response.json();
    const rate = data?.rates?.[output_ticker];

    if (!rate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    // ✅ Conversion
    const converted_value = amount * rate;

    return res.status(200).json({
      input_ticker,
      output_ticker,
      value: amount,
      unix_timestamp: Date.now(),
      current_conv_rate: rate,
      converted_value,
    });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
