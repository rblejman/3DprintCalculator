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

  $(".result").html("");
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

//agregar ajax

// function showResult() {
//   let result = document.querySelector(".calcResult");
//   result.innerHTML = `
//   <ul class="calcResult__inPuts">

//     <li>Impresora: ${printers[inputs.printerSelect].model}</li>
//     <li>Consumo: ${printers[inputs.printerSelect].consumption} watts</li>
//     <li>Costo electricidad: $${inputs.energyPriceInKwh} kWh</li>
//     <li>Tiempo de impresion: ${inputs.printTimeInMinutes} minutos</li>
//     <li>Costo material por Kg: $${inputs.materialPricePerGram}</li>
//     <li>Peso de la impresion: $${inputs.weightInGrams} .grs</li>
//     <li>Mano de obra: $${inputs.labourCostInMinutes} /Hr</li>
//     <li>Impuestos: ${inputs.taxes}%</li>
//     <li>Margen de ganancia: ${inputs.profitMarginPercent}%</li>
//   </ul>
//   <ul class="calcResult__outPuts">
//     <li>Energia: ${inputs.energyCost}</li>
//     <li>Material: $${inputs.calcMaterialCost()}</li>
//     <li>Mano de obra: $${inputs.calcLabourCost()}</li>
//     <li>Costo Total: $${inputs.calcTotalCost()}</li>
//     <li>Precio Final: $${inputs.calcFinalPrice()}</li>
//   </ul>`;
// }

// // Objeto impresora. Su modelo y consumo. Metodo: calcular consumo por el tiempo de impresion. consumo en watts/1000 = Kwh. minutos/60 = horas
// class PrinterModel {
//   constructor(model, consumptionInWatts) {
//     this.model = model;
//     this.consumption = consumptionInWatts;
//   }
//   getEnergyCost(energyPriceInKwh, printTimeInMinutes) {
//     return (
//       energyPriceInKwh * (this.consumption / 1000) * (printTimeInMinutes / 60)
//     );
//   }
// }

// const printers = [
//   new PrinterModel("Ender3", 360),
//   new PrinterModel("Prusa MK3", 120),
// ];

// //agrego evento y ejecuto  calcular precio
// let button = document.querySelector(".calcForm__item--btn");
// button.addEventListener("click", calcFinalPrice);

// // capturar el valor de cada input y capturo en un objeto
// let inputs = {
//   calcMaterialCost() {
//     return (this.materialPricePerGram / 1000) * this.weightInGrams;
//   },
//   calcLabourCost() {
//     return this.printTimeInMinutes * (this.labourCostInMinutes / 60);
//   },
//   calcTotalCost() {
//     return (
//       (this.energyCost + this.calcMaterialCost() + this.calcLabourCost()) *
//       (this.taxes / 100 + 1)
//     );
//   },
//   calcFinalPrice() {
//     return this.calcTotalCost() * (this.profitMarginPercent / 100 + 1);
//   },
// };

// /*
// Busco los valores de inputs y paso al objeto inputs
// Busco la impresora, calculo energia y lo paso como nueva propiedad
//  */

// function calcFinalPrice(e) {
//   e.preventDefault();
//   let items = document.querySelectorAll(".calcForm__item");
//   items.forEach((item) => {
//     inputs[item.id] = parseInt(item.value);
//   });
//   inputs.energyCost = printers[inputs.printerSelect].getEnergyCost(
//     inputs.energyPriceInKwh,
//     inputs.printTimeInMinutes
//   );
//   console.log(inputs);
//   console.log(`Energia: $${inputs.energyCost}`);
//   console.log(`Material: $${inputs.calcMaterialCost()}`);
//   console.log(`Mano de obra: $${inputs.calcLabourCost()}`);
//   console.log(`Costo Total: $${inputs.calcTotalCost()}`);
//   console.log(`Precio Final: $${inputs.calcFinalPrice()}`);
//   showResult();
// }
