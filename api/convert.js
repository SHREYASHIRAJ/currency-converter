export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end(); // quick response for preflight
    }

    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({ error: "Missing required query params" });
    }

    // call Frankfurter API
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await response.json();

    if (!data.rates || !data.rates[to]) {
      throw new Error("Conversion failed from external API");
    }

    res.status(200).json({ result: data.rates[to] });
  } catch (err) {
    console.error("Server Error:", err.message || err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
