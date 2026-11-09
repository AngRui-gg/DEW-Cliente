
const gastosEnvioA2 = 5;
let totalA2 = 0;

/** A2. Calcula total con posible descuento. Recibe precio y unidades; devuelve importe. */
function calcularTotalA2(precio, unidades) {
  let total = precio * unidades + gastosEnvioA2;
  if (total > 50) {
    const descuento = 10;
    total = total - descuento;
  }
  console.log("Dentro:", total);
  return total;
}


calcularTotalA2(20, 3);
console.log("Fuera:", totalA2);
//console.log(descuento); 

/*
try {
  // El original 'console.log(descuento)' provoca ReferenceError.
  console.log(descuento);
} catch (error) {
  console.log("Error esperado:", error.name, error.message);
}
console.log("Otras variantes explicadas en respuestas.md");
console.groupEnd();
*/