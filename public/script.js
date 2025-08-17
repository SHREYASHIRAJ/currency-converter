async function convert() {
  let amount = document.getElementById("amount").value;
  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;
  let resultBox = document.getElementById("result-box");
  let resultText = document.getElementById("result");

  resultBox.style.display = "block"; // Show result area

  if (!amount || amount <= 0) {
    resultBox.className = "error";
    resultText.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    let res = await fetch(`/api/convert?input_ticker=${from}&output_ticker=${to}&value=${amount}`);
    let data = await res.json();

    if (!res.ok) throw new Error(data.error || "API request failed");

    // ✅ Show conversion + rate
    resultBox.className = "success";
    resultText.innerHTML = `
      💰 ${amount} ${data.input_ticker} = <strong>${data.converted_value.toFixed(2)} ${data.output_ticker}</strong>
      <br/>
      📊 1 ${data.input_ticker} = ${data.current_conv_rate.toFixed(4)} ${data.output_ticker}
    `;
  } catch (err) {
    console.error("Conversion error:", err.message || err);
    resultBox.className = "error";
    resultText.innerText = "❌ " + (err.message || "Error fetching conversion rates.");
  }
}
