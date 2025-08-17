async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("input_ticker").value;
  const to = document.getElementById("output_ticker").value;
  const resultBox = document.getElementById("result-box");

  if (!amount) {
    resultBox.textContent = "⚠️ Please enter an amount.";
    resultBox.className = "error";
    resultBox.style.display = "block";
    return;
  }

  try {
    const res = await fetch(`/api/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong");

    resultBox.textContent = `${amount} ${from} = ${data.result} ${to}`;
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
  [from.value, to.value] = [to.value, from.value]; // swap shortcut
}
