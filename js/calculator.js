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

  console.log(
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
