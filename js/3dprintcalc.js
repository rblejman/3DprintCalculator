// Objeto impresora. Su modelo y consumo. Metodo: calcular consumo por el tiempo de impresion. consumo en watts/1000 = Kwh. minutos/60 = horas
class PrinterModel{
    constructor(model, consumptionInWatts){
        this.model = model;
        this.consumption = consumptionInWatts;
    }
    getEnergyCost(energyPriceInKwh, printTimeInMinutes){
        return energyPriceInKwh * (this.consumption / 1000) * (printTimeInMinutes/60);

    }

}

const printers = [
    new PrinterModel("Ender3", 360),
    new PrinterModel("Prusa MK3", 120)
  ];

  class setUp{
    constructor(energyPriceInKwh, printTimeInMinutes, materialPricePerGram, weightInGrams, labourCostInMinutes, taxes, profitMarginPercent ){
      this.energy = energyPriceInKwh;
      this.printTime = printTimeInMinutes;
      this.materialPrice = materialPricePerGram;
      this.materialWeight = weightInGrams;
      this.labour = labourCostInMinutes;
      this.taxes = taxes;
      this.profit = profitMarginPercent;
    }
    calcMaterialCost() {
      console.log(`Costo total material $${this.materialPrice * this.materialWeight}`);
      return (this.materialPrice * this.materialWeight);
    }
    calcLabourCost() {
      console.log(`Costo total mano de obra $${this.printTime * this.labour}`);
      return (this.printTime * this.labour);
    }
  }
  
  // Calculo el costo total de la impresion
  function calcTotalCost() {
    return (printers[printerSelect].getEnergyCost(energyPriceInKwh, printTimeInMinutes) + calcMaterialCost(materialPricePerGram, weightInGrams) + calcLabourCost(printTimeInMinutes, labourCostInMinutes) )*taxes;
  }
  // Calculo el precio final segun el margen de ganancia que estableci
  function calcFinalPrice(totalCost) {
    return totalCost*profitMarginPercent;
  }

  function calcular(){

    // Selecciono Modelo de impresora
    let printerSelect = document.getElementById("printer");
    console.log("Usted a seleccionado: " + printers[printerSelect.value].model );
    
    // Selecciono consumo electrico del hogar
    let  energyPriceInKwh = document.getElementById("energy");
    console.log(`El costo electrico de su casa es de ${energyPriceInKwh.value} kWh`);

    //Selecciono tiempo de la impresion
    let printTimeInMinutes = document.getElementById("time");
    console.log(`La impresion dura ${printTimeInMinutes.value} minutos`);

    //Selecciono Precio del Plastico por Kg -- se divide por 1000
    let materialPricePerGram = document.getElementById("price");
    console.log(`El material cuesta $${(materialPricePerGram.value)/1000} por gramo.`);  

    // Selecciono peso total de material usado
    let weightInGrams = document.getElementById("weight")
    console.log(`Esta impresion utiliza ${weightInGrams.value} gramos de material`);

    // Selecciono costo por hora hombre -- se divide por 60 para tener minutos
    let labourCostInMinutes = document.getElementById("labour");
    console.log(`La mano de obra es de $${(labourCostInMinutes.value)/60} por minuto`);

    // Selecciono porcentaje de impuestos
    let taxes = document.getElementById("taxes");
    console.log(`Los impuesto son del %${(taxes.value)/100+1}`);

    // Selecciono margen de ganancia en % 
    let profitMarginPercent = document.getElementById("profit");
    console.log(`El margen de ganancia sera del  %${(profitMarginPercent.value)/100+1}`);

    console.log("Costo de energia sera de $" + printers[printerSelect.value].getEnergyCost(energyPriceInKwh.value, printTimeInMinutes.value));
    // Precio Final
    let totalCost = calcTotalCost();
    console.log("--> El costo Total sera de: $" + totalCost);
    let finalPrice = calcFinalPrice(totalCost);
    console.log("--> El precio final a cobrar por la impresion sera de: $" + finalPrice);
  }
  