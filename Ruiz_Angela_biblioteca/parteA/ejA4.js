
const inscripciones = [
    "ana@ies.es", "luis@ies.es", "ANA@ies.es", "marta@ies.es",
    "luis@ies.es", "pablo@ies.es", "Marta@ies.es"
];

// A4.1 - Correos sin repetir
console.log("--Correos sin repetir--");
let correos = new Set(inscripciones);

console.log("Correos sin repetir:", correos);
console.log("Cantidad:", correos.size);


// A4.2 - Convertir a minúsculas y eliminar repetidos
console.log("--Convertir a minúsculas--");
let normalizados = [];

for (let correo of inscripciones) {
    normalizados.push(correo.toLowerCase());
}

let correosUnicos = new Set(normalizados);

console.log("Correos normalizados:", correosUnicos);
console.log("Cantidad:", correosUnicos.size);


// A4.3 - Contar cuántas veces aparece cada correo
console.log("--Contar repeticiones--");
let contador = new Map();

for (let correo of normalizados) {
    if (contador.has(correo)) {
        contador.set(correo, contador.get(correo) + 1);
    } else {
        contador.set(correo, 1);
    }
}

for (let [correo, cantidad] of contador) {
    console.log(correo + " → " + cantidad);
}


// A4.4 - Convertir el Set en un array ordenado
console.log("--Ordenado alfabéticamente--");
let ordenados = [...correosUnicos];

ordenados.sort();

console.log("Correos ordenados:", ordenados);
