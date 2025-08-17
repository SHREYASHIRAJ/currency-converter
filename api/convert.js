import fetch from "node-fetch";

export default async function handler(req, res) {
  const { input_ticker, output_ticker, value } = req.query;

  if (!input_ticker || !output_ticker || !value) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
    // Use a free exchange rate API
    const response = await fetch('https://api.exchangerate.host/latest?base=${input_ticker}&symbols=${output_ticker}');
    const data = await response.json();

    const rate = data.rates[output_ticker];

    res.status(200).json({
      input_ticker,
      output_ticker,
      value: parseFloat(value),
      unix_timestamp: Date.now(),
      current_conv_rate: rate
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversion rate" });
  }
}
