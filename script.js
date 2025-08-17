async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("input_ticker").value;
  const to = document.getElementById("output_ticker").value;

  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  try {
    const res = await fetch(`/api/convert?input_ticker=${from}&value=${amount}&output_ticker=${to}`);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("result").innerText =
      `${data.value} ${data.input_ticker} = ${data.converted_value} ${data.output_ticker} (Rate: ${data.current_conv_rate})`;
  } catch (err) {
    console.error(err);
    alert("Error fetching conversion rates.");
  }
}
