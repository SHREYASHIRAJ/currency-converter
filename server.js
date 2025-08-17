const express = require("express");
const fetch = require("node-fetch"); // to call external API
const path = require("path");

const app = express();
const PORT = 3000;

// Serve your frontend files (index.html, script.js, style.css, favicon.ico)
app.use(express.static(path.join(__dirname, "public")));

// Currency conversion API
app.get("/api/convert", async (req, res) => {
  try {
    const { input_ticker, output_ticker, value } = req.query;

    if (!input_ticker || !output_ticker || !value) {
      return res.status(400).json({ error: "Missing required query params" });
    }

    // Fetch conversion rates from exchangerate.host
    const apiRes = await fetch(
      `https://api.exchangerate.host/convert?from=${input_ticker}&to=${output_ticker}&amount=${value}`
    );
    const data = await apiRes.json();

    res.json({
      input_ticker,
      output_ticker,
      value: Number(value),
      current_conv_rate: data.info.rate,
      converted_value: data.result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
