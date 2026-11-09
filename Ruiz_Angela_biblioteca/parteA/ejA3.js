//A3. 1
const notas = [7.5, 4.9, 10, 5, 6.25, 3, 8.8, 11, 9];

for (let i = 0; i < notas.length; i++) {
    let calificacion;

    if (notas[i] < 0 || notas[i] > 10) {
        calificacion = "Nota no válida";
    } else if (notas[i] < 5) {
        calificacion = "Insuficiente";
    } else if (notas[i] < 6) {
        calificacion = "Suficiente";
    } else if (notas[i] < 7) {
        calificacion = "Bien";
    } else if (notas[i] < 9) {
        calificacion = "Notable";
    } else {
        calificacion = "Sobresaliente";
    }

    console.log("Alumno " + (i + 1) + ": " + notas[i] + " → " + calificacion);
}

//A3. 2
let aprobados = 0;
let suma = 0;
let cantidad = 0;
let notaAlta = 0;

for (let nota of notas) {

    if (nota >= 0 && nota <= 10) {
        suma += nota;
        cantidad++;

        if (nota >= 5) {
            aprobados++;
        }

        if (nota > notaAlta) {
            notaAlta = nota;
        }
    }
}

console.log("Aprobados: " + aprobados);
console.log("Media: " + suma / cantidad);
console.log("Nota más alta: " + notaAlta);
