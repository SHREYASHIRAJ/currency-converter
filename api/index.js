import fetch from "node-fetch";

export default async function handler(req, res) {
  const { input_ticker, value, output_ticker } = req.query;

  if (!input_ticker || !value || !output_ticker) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${input_ticker}`);
    const data = await response.json();
    const rate = data.rates[output_ticker];
    const converted = (parseFloat(value) * rate).toFixed(2);

    res.status(200).json({
      input_ticker,
      value,
      output_ticker,
      unix_timestamp: Date.now(),
      current_conv_rate: rate,
      converted_value: converted
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversion rates" });
  }
}
