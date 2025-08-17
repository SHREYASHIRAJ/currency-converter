export default async function handler(req, res) {
  const { input_ticker, output_ticker, value } = req.query;

  if (!input_ticker || !output_ticker || !value) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
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

    // Proper conversion
    const converted_value = parseFloat(value) * rate;

    res.status(200).json({
      input_ticker,
      output_ticker,
      value: parseFloat(value),
      unix_timestamp: Date.now(),
      current_conv_rate: rate,
      converted_value,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch conversion rate" });
  }
}
