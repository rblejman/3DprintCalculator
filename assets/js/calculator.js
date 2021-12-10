function calcPrint(
  consumption,
  energy,
  time,
  material,
  weight,
  labour,
  taxes,
  profit
) {
  let energyCost = energy * (consumption / 1000) * (time / 60);
  let materialCost = material * weight;
  let labourCost = time * labour;
  let totalCost = (energyCost + materialCost + labourCost) * (taxes / 100 + 1);
  let finalPrice = totalCost * (profit / 100 + 1);

  $(".result")
    .html(
      `
  <table class="result__inPuts">
      <tr>
        <th>Impresora:</th>
        <th class = "result__inputs-right">${
          printers[$("#printerSelect").val()].model
        }</th>
      </tr>
      <tr>
        <th>Consumo:</th>
        <th class = "result__inputs-right" >${
          printers[$("#printerSelect").val()].consumption
        } watts</th>
      </tr>
      <tr>
        <th>Electricidad:</th>
        <th class = "result__inputs-right" >$${energy.toFixed(2)} kWh</th>
      </tr>
      <tr>
        <th>Tiempo:</th>
        <th class = "result__inputs-right" >${time.toFixed(2)} min.</th>
      </tr>
      <tr>
        <th>Material:</th>
        <th class = "result__inputs-right" >$${material.toFixed(2)}</th>
      </tr>
      <tr>
        <th>Peso:</th>
        <th class = "result__inputs-right" >${weight.toFixed(2)}.grs</th>
      </tr>
      <tr>
        <th>Mano de Obra:</th>
        <th class = "result__inputs-right" >$${labour.toFixed(2)} /Hr</th>
      </tr>
      <tr>
        <th>Impuestos:</th>
        <th class = "result__inputs-right" >${taxes.toFixed(2)}%</th>
      </tr>
      <tr>
        <th>Ganancia</th>
        <th class = "result__inputs-right" >${profit.toFixed(2)}%</th>
      </tr>
    </table>
    <br />
    <table class="result__outPuts" >
      <tr>
        <th>Energía:</th>
        <th class = "result__outPuts-right">$ ${energyCost.toFixed(2)}</th>
      </tr>
      <tr>
        <th>Material</th>
        <th class = "result__outPuts-right" >$ ${materialCost.toFixed(2)}</th>
      </tr>
      <tr>
        <th>Labor:</th>
        <th class = "result__outPuts-right" >$ ${labourCost.toFixed(2)}</th>
      </tr>
      <tr>
        <th>Costo total:</th>
        <th class = "result__outPuts-right" >$ ${totalCost.toFixed(2)}</th>
      </tr>
      <tr class = "result__outPuts-finalPrice" >
        <th>Precio final:</th>
        <th class = "result__outPuts-right" >$ ${finalPrice.toFixed(2)}</th>
      </tr>
    </table>
  `
    )
    .show("slow");
}

// Objeto impresora. Su modelo y consumo. Metodo: calcular consumo por el tiempo de impresion. consumo en watts/1000 = Kwh. minutos/60 = horas
class PrinterModel {
  constructor(model, consumptionInWatts) {
    this.model = model;
    this.consumption = consumptionInWatts;
  }
}

let printers = [
  new PrinterModel("Ender3", 360),
  new PrinterModel("Prusa MK3", 120),
  new PrinterModel("Prusa SL1", 130),
  new PrinterModel("Makerbot Replicator+", 150),
];

$(".result").hide();
$(".calcForm").submit((e) => {
  e.preventDefault();
  let printerConsumption = printers[$("#printerSelect").val()].consumption;
  let energyPriceInKwh = parseInt($("#energyPriceInKwh").val());
  let printTimeInMinutes = parseInt($("#printTimeInMinutes").val());
  let materialPricePerGram = parseInt($("#materialPricePerGram").val()) / 1000;
  let weightInGrams = parseInt($("#weightInGrams").val());
  let labourCostInMinutes = parseInt($("#labourCostInMinutes").val()) / 60;
  let taxes = parseInt($("#taxes").val());
  let profitMarginPercent = parseInt($("#profitMarginPercent").val());

  calcPrint(
    printerConsumption,
    energyPriceInKwh,
    printTimeInMinutes,
    materialPricePerGram,
    weightInGrams,
    labourCostInMinutes,
    taxes,
    profitMarginPercent
  );
});

let geoLoc = navigator.geolocation.getCurrentPosition(showGeo);

function showGeo(position) {
  console.log("lat: " + position.coords.latitude);
  console.log("long: " + position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    type: "GET",
    data: {
      lat: latitude,
      lon: longitude,
      appid: "055793c49910b77c7527169cfb44bd4f",
      dataType: "jsonp",
      units: "metric",
      lang: "sp",
    },
    success: function (data) {
      console.log(data);
      let content = `<P> ${data.main.temp.toFixed(1)}°C ${data.name}</P>`;
      $(".location").append(content);
    },
  });
}
