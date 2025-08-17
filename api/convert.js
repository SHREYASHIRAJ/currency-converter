async function convert() {
  let amountInput = document.getElementById("amount").value.trim();
  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;
  let resultBox = document.getElementById("result-box");
  let resultText = document.getElementById("result");

  // Make sure the result box shows up
  resultBox.style.display = "block";

  // Convert input to a valid float
  let amount = parseFloat(amountInput);

  if (isNaN(amount) || amount <= 0) {
    resultBox.className = "error";
    resultText.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    // ✅ Ensure query param is a clean number (no extra characters)
    let res = await fetch(
      `/api/convert?input_ticker=${encodeURIComponent(from)}&output_ticker=${encodeURIComponent(to)}&value=${amount}`
    );

    let data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "API request failed");
    }

    resultBox.className = "success";
    resultText.innerText = `${amount} ${data.input_ticker} = ${data.converted_value.toFixed(2)} ${data.output_ticker}`;
  } catch (err) {
    console.error("Conversion error:", err.message || err);
    resultBox.className = "error";
    resultText.innerText = "❌ " + (err.message || "Error fetching conversion rates.");
  }
}
