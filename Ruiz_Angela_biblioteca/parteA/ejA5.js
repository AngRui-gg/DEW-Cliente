// A5.1 - Función transformar

function transformar(array, fn) {
    let resultado = [];

    for (let numero of array) {
        resultado.push(fn(numero));
    }

    return resultado;
}


// A5.2 - Función quedarse

function quedarse(array, condicion) {
    let resultado = [];

    for (let numero of array) {
        if (condicion(numero)) {
            resultado.push(numero);
        }
    }

    return resultado;
}


// A5.3 - Duplicar números y quedarse con los pares

const numeros = [3, 8, 1, 6];

console.log(transformar(numeros, numero => numero * 2));

console.log(quedarse(numeros, numero => numero % 2 === 0));


// A5.4 - Lo mismo usando map y filter

console.log(numeros.map(numero => numero * 2));

console.log(numeros.filter(numero => numero % 2 === 0));


// A5.5 - Calcular el total con IVA del 21%

const precios = [12, 45, 8, 99, 30];

let total = precios
    .filter(precio => precio > 10)
    .map(precio => precio * 1.21)
    .reduce((suma, precio) => suma + precio, 0);

console.log(total.toFixed(2));
