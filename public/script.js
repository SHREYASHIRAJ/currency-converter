const currencyList = {
  "USD": "US Dollar",
  "EUR": "Euro",
  "GBP": "British Pound",
  "INR": "Indian Rupee",
  "JPY": "Japanese Yen",
  "AUD": "Australian Dollar",
  "CAD": "Canadian Dollar",
  "CHF": "Swiss Franc",
  "CNY": "Chinese Yuan",
  "SGD": "Singapore Dollar"
};

window.onload = () => {
  const inputTicker = document.getElementById("input_ticker");
  const outputTicker = document.getElementById("output_ticker");

  for (let code in currencyList) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${currencyList[code]}`;
    inputTicker.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = `${code} - ${currencyList[code]}`;
    outputTicker.appendChild(option2);
  }

  inputTicker.value = "USD";
  outputTicker.value = "INR";
};

async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("input_ticker").value;
  const to = document.getElementById("output_ticker").value;
  const resultBox = document.getElementById("result-box");

  if (!amount || amount <= 0) {
    resultBox.textContent = "⚠️ Please enter a valid amount.";
    resultBox.className = "error";
    resultBox.style.display = "block";
    return;
  }

  try {
    // ✅ exchangerate.host free API (no key, no CORS issues)
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    if (!data.result) throw new Error("Invalid conversion response");

    resultBox.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    resultBox.className = "success";
    resultBox.style.display = "block";
  } catch (err) {
    resultBox.textContent = `❌ Error: ${err.message}`;
    resultBox.className = "error";
    resultBox.style.display = "block";
    console.error("Conversion error:", err.message || err);
  }
}

function swapCurrencies() {
  const from = document.getElementById("input_ticker");
  const to = document.getElementById("output_ticker");
  [from.value, to.value] = [to.value, from.value];
}
