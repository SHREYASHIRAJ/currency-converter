async function convert() {
  let amount = document.getElementById("amount").value;
  let from = document.getElementById("input_ticker").value;
  let to = document.getElementById("output_ticker").value;

  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  try {
    let res = await fetch(`/api/convert?input_ticker=${from}&output_ticker=${to}&value=${amount}`);
    let data = await res.json();

    document.getElementById("result").innerText = 
      `${data.value} ${data.input_ticker} = ${(data.value * data.current_conv_rate).toFixed(2)} ${data.output_ticker}`;
  } catch (err) {
    console.error(err);
    alert("Error fetching conversion rates.");
  }
}
