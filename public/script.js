async function convert() {
  let amountInput = document.getElementById("amount").value.trim();
  let amount = parseFloat(amountInput);

  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;
  let resultBox = document.getElementById("result-box");
  let resultText = document.getElementById("result");

  resultBox.style.display = "block";
  resultBox.className = "info";
  resultText.innerText = "⏳ Converting...";

  if (isNaN(amount) || amount <= 0) {
    resultBox.className = "error";
    resultText.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    let res = await fetch(`/api/convert?input_ticker=${from}&output_ticker=${to}&value=${amount}`);
    let data = await res.json();

    if (!res.ok || !data.converted_value) {
      throw new Error(data.error || "Conversion failed. Please check the currencies.");
    }

    resultBox.className = "success";
    resultText.innerText = `${amount} ${data.input_ticker} = ${data.converted_value.toFixed(2)} ${data.output_ticker}`;
  } catch (err) {
    console.error("Conversion error:", err.message || err);
    resultBox.className = "error";
    resultText.innerText = "❌ " + (err.message || "Error fetching conversion rates.");
  }
}

function swapCurrencies() {
  let from = document.getElementById("input_ticker");
  let to = document.getElementById("output_ticker");

  // Swap values
  let temp = from.value;
  from.value = to.value;
  to.value = temp;

  // Auto re-run conversion if amount is filled
  if (document.getElementById("amount").value.trim()) {
    convert();
  }
}
