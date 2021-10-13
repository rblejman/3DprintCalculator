// Objeto impresora. Su modelo y consumo. Metodo: calcular consumo por el tiempo de impresion. consumo en watts/1000 = Kwh. minutos/60 = horas
class PrinterModel{
    constructor(printerModel, printerConsumptionInWatts){
        this.model = printerModel;
        this.consumption = printerConsumptionInWatts;
    }
    getEnergyCost(energyPriceInKwh, printTimeInMinutes){
        return energyPriceInKwh * (this.consumption / 1000) * (printTimeInMinutes/60);

    }

}

const printers = [
    new PrinterModel("Ender3", 360),
    new PrinterModel("Prusa MK3", 120)
  ];



// Calcular costo de material. Precio por peso.
  function calcMaterialCost(price, weight) {
    console.log(`Costo total material $${price * weight}`);
    return (price * weight);
  }
  
  function calcLabourCost(time, labour) {
    console.log(`Costo total mano de obra $${time * labour}`);
    return (time * labour);
  }
  // Calculo el costo total de la impresion
  function calcTotalCost() {
    return (printers[printerSelect].getEnergyCost(energyPriceInKwh, printTimeInMinutes) + calcMaterialCost(materialPricePerGram, weightInGrams) + calcLabourCost(printTimeInMinutes, labourCostInMinutes) )*taxes;
  }
  // Calculo el precio final segun el margen de ganancia que estableci
  function calcFinalPrice(totalCost) {
    return totalCost*profitMarginPercent;
  }

  // Selecciono Modelo de impresora
  let printerSelect = parseInt( prompt("Elija impresora 0 = Ender 3   o  1 = Prusa Mk3"));  
  console.log("Usted a seleccionado: " + printers[printerSelect].model );
  
  // Selecciono consumo electrico del hogar
  let  energyPriceInKwh = parseInt(prompt("Ingrese costo electricidad KWh Ej: 5000"));
  console.log(`El costo electrico de su casa es de ${energyPriceInKwh} kWh`);

  //Selecciono tiempo de la impresion
  let printTimeInMinutes = parseInt(prompt("Ingrese tiempo de impresion en Minutos"));
  console.log(`La impresion dura ${printTimeInMinutes} minutos`);

  //Selecciono Precio del Plastico por Kg
  let materialPricePerGram = parseInt(prompt("Ingrese precio de Kg de Plastico")) /1000;
  console.log(`El material cuesta $${materialPricePerGram} por gramo.`);  

  // Selecciono peso total de material usado
  let weightInGrams = parseInt(prompt("Ingrese cuantos gramos pesa la impresion"));
  console.log(`Esta impresion utiliza ${weightInGrams} gramos de material`);

  // Selecciono costo por hora hombre
  let labourCostInMinutes = parseInt(prompt("Ingrese costo mano de obra por Hora"))/60;
  console.log(`La mano de obra es de $${labourCostInMinutes} por minuto`);

  // Selecciono porcentaje de impuestos
  let taxes = parseInt(prompt("Ingrese % impuestos")) / 100 + 1;
  console.log(`Los impuesto son del %${(taxes-1)*100}`);

  // Selecciono margen de ganancia en %
  let profitMarginPercent = parseInt(prompt("Ingrese margen de ganancia que desea en %")) / 100 + 1;
  console.log(`El margen de ganancia sera del  %${(profitMarginPercent-1)*100}`);

  console.log("Costo de energia sera de $" + printers[printerSelect].getEnergyCost(energyPriceInKwh, printTimeInMinutes));

  // Precio Final
  let totalCost = calcTotalCost();
  console.log("--> El costo Total sera de: $" + totalCost);
  let finalPrice = calcFinalPrice(totalCost);
  console.log("--> El precio final a cobrar por la impresion sera de: $" + finalPrice);
  