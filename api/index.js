export default async function handler(req, res) {
  const { input_ticker, value, output_ticker } = req.query;

  // Hardcoded conversion rates for demo
  const rates = { USD: 1, INR: 83, EUR: 0.91 };

  const inputValue = parseFloat(value);
  const rate = rates[output_ticker] / rates[input_ticker];
  const convertedValue = (inputValue * rate).toFixed(2);

  res.status(200).json({
    input_ticker,
    value: inputValue,
    output_ticker,
    unix_timestamp: Date.now(),
    current_conv_rate: rate.toFixed(4)
  });
}
