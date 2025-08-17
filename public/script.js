async function convert() {
  let amountInput = document.getElementById("amount").value.trim();
  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;
  let resultBox = document.getElementById("result-box");
  let resultText = document.getElementById("result");

  resultBox.style.display = "block";

  // Force numeric only
  let amount = Number(amountInput);

  if (isNaN(amount) || amount <= 0) {
    resultBox.className = "error";
    resultText.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
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

// Swap currencies
function swapCurrencies() {
  let from = document.getElementById("input_ticker");
  let to = document.getElementById("output_ticker");

  let temp = from.value;
  from.value = to.value;
  to.value = temp;
}
