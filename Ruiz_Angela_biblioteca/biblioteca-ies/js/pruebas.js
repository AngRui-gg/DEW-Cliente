/* Pruebas R1-R7: resultados esperados del enunciado y un caso límite por función con console log (comprobación personal).
//R1
console.log(valoracionMedia(LIBROS[0]));

//R2
console.log(librosDisponibles(LIBROS));

//R3
console.log(librosEntre(LIBROS, "1950", "1960"));
console.log(librosEntre(LIBROS, "abc", 2000));

//R4
console.log(generos(LIBROS));

//R5
console.log(librosPorAutor(LIBROS));

//R6
console.log(ranking(LIBROS));

//R7
console.log(resumen(LIBROS));
*/

//R10. Pruebas y depuración.
// console.assert() comprueba si una condición es verdadera o falsa. Ejemplo: console.assert(2 + 3 === 4, "Error en la suma");

// R1 - Valoración media
console.assert(valoracionMedia(LIBROS[9]) === 4.8, "Error R1: Matilda");
console.assert(valoracionMedia(LIBROS[2]) === null, "Error R1: libro sin valoraciones");


// R2 - Libros disponibles
console.assert(librosDisponibles(LIBROS).length === 8, "Error R2: disponibles");
console.assert(librosDisponibles([]).length === 0, "Error R2: array vacío");


// R3 - Libros entre dos años
console.assert(librosEntre(LIBROS, "1950", "1960").length === 4, "Error R3: años");
console.assert(librosEntre(LIBROS, "abc", 2000).length === 0, "Error R3: año no válido");
console.assert(librosEntre(LIBROS, 2000, 1950).length === 0, "Error R3: años invertidos");


// R4 - Géneros
console.assert(generos(LIBROS).length === 5, "Error R4: géneros");
console.assert(generos(LIBROS)[0] === "Ciencia ficción", "Error R4: orden");
console.assert(generos([]).length === 0, "Error R4: array vacío");


// R5 - Libros por autor
console.assert(librosPorAutor(LIBROS).get("Isaac Asimov") === 2, "Error R5: Asimov");
console.assert(librosPorAutor([]).size === 0, "Error R5: array vacío");


// R6 - Ranking
console.assert(ranking(LIBROS)[0].titulo === "Matilda", "Error R6: primer libro");
console.assert(ranking(LIBROS)[0].valoraciones.length === 4, "Error R6: valoraciones");
console.assert(ranking(LIBROS, 20).length === 12, "Error R6: límite");
console.assert(ranking([]).length === 0, "Error R6: array vacío");


// R7 - Resumen
console.assert(resumen(LIBROS).total === 13, "Error R7: total");
console.assert(resumen(LIBROS).prestados === 5, "Error R7: prestados");
console.assert(resumen(LIBROS).disponibles === 8, "Error R7: disponibles");
console.assert(resumen(LIBROS).mediaGlobal === 4.4, "Error R7: media");
console.assert(resumen(LIBROS).masAntiguo === "La Celestina", "Error R7: antiguo");
console.assert(resumen([]).total === 0, "Error R7: array vacío");


// Mostrar los libros disponibles en una tabla
console.table(librosDisponibles(LIBROS));

console.log("Pruebas terminadas");

