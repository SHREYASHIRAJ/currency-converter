const $ = (id) => document.getElementById(id);
$("swap").onclick = () => {
  const a = $("input_ticker"), b = $("output_ticker");
  [a.value, b.value] = [b.value, a.value];
};

$("go").onclick = async () => {
  const amount = Number($("amount").value);
  const from = $("input_ticker").value.toUpperCase();
  const to = $("output_ticker").value.toUpperCase();
  const box = $("result-box");
  const txt = $("result");

  box.classList.remove("hidden");

  if (!Number.isFinite(amount) || amount <= 0) {
    txt.textContent = "⚠️ Enter a valid amount > 0";
    return;
  }

  try {
    const res = await fetch(`/api/convert?input_ticker=${from}&value=${amount}&output_ticker=${to}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "API error");
    txt.textContent = `${data.value} ${data.input_ticker} = ${data.converted_value.toFixed(2)} ${data.output_ticker}  (rate: ${data.current_conv_rate})`;
  } catch (e) {
    txt.textContent = "❌ " + (e.message || "Something went wrong");
    console.error(e);
  }
};
