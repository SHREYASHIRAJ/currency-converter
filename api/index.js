import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, use POST" });
  }

  const { input_ticker, value, output_ticker } = req.body;

  if (!input_ticker || !value || !output_ticker) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const apiUrl = `https://api.exchangerate.host/convert?from=${input_ticker}&to=${output_ticker}&amount=${value}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const result = {
      input_ticker,
      value,
      output_ticker,
      unix_timestamp: Math.floor(Date.now() / 1000),
      current_conv_rate: data.info.rate
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Conversion failed" });
  }
}
