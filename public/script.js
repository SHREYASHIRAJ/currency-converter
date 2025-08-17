async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("input_ticker").value;
  const to = document.getElementById("output_ticker").value;

  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  try {
    const res = await fetch(`/api/convert?input_ticker=${from}&output_ticker=${to}&value=${amount}`);
    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();

    document.getElementById("result").innerText =
      `${amount} ${data.input_ticker} = ${(data.value * data.current_conv_rate).toFixed(2)} ${data.output_ticker}`;
  } catch (err) {
    console.error(err);
    alert("Error fetching conversion rates.");
  }
}
