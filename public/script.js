// Load currency list dynamically
async function loadCurrencies() {
  try {
    let res = await fetch("https://api.exchangerate.host/symbols");
    let data = await res.json();

    if (!data.symbols) throw new Error("Failed to load currency list");

    let inputSelect = document.getElementById("input_ticker");
    let outputSelect = document.getElementById("output_ticker");

    Object.keys(data.symbols).forEach(code => {
      let option1 = document.createElement("option");
      option1.value = code;
      option1.text = `${code} - ${data.symbols[code].description}`;
      inputSelect.appendChild(option1);

      let option2 = document.createElement("option");
      option2.value = code;
      option2.text = `${code} - ${data.symbols[code].description}`;
      outputSelect.appendChild(option2);
    });

    // Default values
    inputSelect.value = "USD";
    outputSelect.value = "INR";
  } catch (err) {
    console.error("Currency load error:", err.message);
  }
}

// Convert currency
async function convert() {
  let amount = parseFloat(document.getElementById("amount").value);
  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;
  let resultBox = document.getElementById("result-box");
  let resultText = document.getElementById("result");

  resultBox.style.display = "block";

  if (isNaN(amount) || amount <= 0) {
    resultBox.className = "error";
    resultText.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    let res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    let data = await res.json();

    if (!data.result) throw new Error("Conversion failed");

    resultBox.className = "success";
    resultText.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
  } catch (err) {
    console.error("Conversion error:", err.message);
    resultBox.className = "error";
    resultText.innerText = "❌ Error fetching conversion rates.";
  }
}

// Swap currencies
function swapCurrencies() {
  let input = document.getElementById("input_ticker");
  let output = document.getElementById("output_ticker");
  let temp = input.value;
  input.value = output.value;
  output.value = temp;
}

// Load on page start
window.onload = loadCurrencies;
