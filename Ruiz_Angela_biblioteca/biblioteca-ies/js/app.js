"use strict";

// ---------------------------------------------------------------------------
// FUNCIÓN DE APOYO (ya hecha, no la modifiques)
// Inserta un texto HTML dentro del elemento indicado por su selector CSS.
// Cómo funciona por dentro se estudiará en las unidades de objetos predefinidos
// y DOM. Por ahora, úsala como una "caja negra":
//   mostrar("#catalogo", "<p>Hola</p>");
// ---------------------------------------------------------------------------
function mostrar(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

// ---------------------------------------------------------------------------
// R1 a R7: funciones de cálculo (no deben usar mostrar ni console.log)
// ---------------------------------------------------------------------------

/** R1. Media de las valoraciones con un decimal, usando reduce. Si no tiene valoraciones, devuelve null.  */
function valoracionMedia(libro) {
    if (libro.valoraciones.length === 0) {
        return null;
    }

    let suma = libro.valoraciones.reduce((total, nota) => total + nota, 0);

    return Math.round(suma / libro.valoraciones.length * 10) / 10;
}


/** R2. Array con los libros no prestados */
function librosDisponibles(libros) {
    return libros.filter(libro => libro.prestado === false);
}


/** R3. Libros publicados entre dos años, ambos incluidos. */
function librosEntre(libros, desde, hasta) {
    desde = Number(desde);
    hasta = Number(hasta);

    if (isNaN(desde) || isNaN(hasta) || desde > hasta) {
        return [];
    }

    return libros.filter(libro => libro.anio >= desde && libro.anio <= hasta);
}


/** R4. Obtiene géneros únicos ordenados. Recibe libros; devuelve array de textos. */
function generos(libros) {
    let lista = libros.map(libro => libro.genero);
    let sinRepetir = new Set(lista);

    return [...sinRepetir].sort();
}


/** R5. Map con cada autor y su número de libros.  */
function librosPorAutor(libros) {
    let autores = new Map();

    libros.forEach(libro => {
        if (autores.has(libro.autor)) {
            autores.set(libro.autor, autores.get(libro.autor) + 1);
        } else {
            autores.set(libro.autor, 1);
        }
    });

    return autores;
}


/** R6. Los n libros con mejor valoración media, de mayor a menor. */
function ranking(libros, n = 3) {
    let lista = libros.filter(libro => valoracionMedia(libro) !== null);

    lista.sort((a, b) => {
        let diferencia = valoracionMedia(b) - valoracionMedia(a);

        if (diferencia === 0) {
            return a.titulo.localeCompare(b.titulo);
        }

        return diferencia;
    });

    return lista.slice(0, n);
}


/** R7. Objeto con total, prestados, disponibles, mediaGlobal (media de todas las valoraciones, un decimal) y masAntiguo (título).  */
function resumen(libros) {
    let prestados = libros.filter(libro => libro.prestado === true).length;

    let notas = libros.flatMap(libro => libro.valoraciones);

    let media = null;

    if (notas.length > 0) {
        let suma = notas.reduce((total, nota) => total + nota, 0);
        media = Math.round(suma / notas.length * 10) / 10;
    }

    let antiguo = [...libros].sort((a, b) => a.anio - b.anio);

    return {
        total: libros.length,
        prestados: prestados,
        disponibles: libros.length - prestados,
        mediaGlobal: media,
        masAntiguo: antiguo.length > 0 ? antiguo[0].titulo : null
    };
}


/** R8. Representación con template literals */
function tablaLibros(libros) {
  const filas = libros.map(libro => `
    <tr class="${libro.prestado ? "prestado" : ""}">
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.genero}</td>
      <td>${libro.anio}</td>
      <td>${libro.prestado ? "Prestado" : "Disponible"}</td>
      <td>${valoracionMedia(libro) ?? "Sin valorar"}</td>
    </tr>`).join("");
  return `<div class="tabla-contenedor"><table>
    <thead><tr><th>Título</th><th>Autor</th><th>Género</th><th>Año</th><th>Estado</th><th>Valoración</th></tr></thead>
    <tbody>${filas}</tbody></table></div>`;
}

// R8. Lista de géneros.
/*Llamamos a la función generos (que tenemos creada en el R4) que nos da un array con los 
géneros sin que se repita ninguno. 
Usamos el ".map" para recorrer el array convirtiendo cada elemento en una lista en HTML. 
Unimos los elementos con ".join("")"*/
function htmlGeneros(libros) {
  return `<ul>${generos(libros).map(genero => `<li>${genero}</li>`).join("")}</ul>`;
}

// R8. Ranking. 
/*Llamamos a la función ranking (que tenemos creada en el R6) que nos da un array con el ranking. 
Usamos el ".map" para recorrer el array convirtiendo cada elemento en una lista en HTML. 
Unimos los elementos con ".join"*/
function htmlRanking(libros) {

    let mejores = ranking(libros);

    let lista = mejores.map(libro =>
        `<li>${libro.titulo} - ${libro.autor} (${valoracionMedia(libro)})</li>`
    );

    let resultado = lista.join("");

    return `<ol>${resultado}</ol>`;
}


// R8. Resumen. 
/*Llamamos a la función ranking (que tenemos creada en el R7). 
Creamos un contenedor y le damios una calse para poder modificar el aspecto con CSS.
Mostramos todos los datos que se guardan de un libro, pero si la valoración o el más antiguo 
es null o undefined se escribe por pantalla lo que hay escrito después de "??"*/
function htmlResumen(libros) {
  const datos = resumen(libros);
  return `<div class="resumen-grid">
    <p><strong>Total de libros</strong><span>${datos.total}</span></p>
    <p><strong>Prestados</strong><span>${datos.prestados}</span></p>
    <p><strong>Disponibles</strong><span>${datos.disponibles}</span></p>
    <p><strong>Media global</strong><span>${datos.mediaGlobal ?? "Sin valorar"}</span></p>
    <p><strong>Más antiguo</strong><span>${datos.masAntiguo ?? "Ninguno"}</span></p>
  </div>`;
}

// R8. Libros por autor. 
/*Llamamos a la función ranking (que tenemos creada en el R5). 
Convertimos el map() en un array.
Ordenamos los autores alfabéticamente con .sort.
Recorremos los autores y la cantidad en el bucle.
vamos añadiendo elementos a la lista del HTML gracias al html+=
*/
function htmlAutores(libros) {
    let autores = librosPorAutor(libros);
    let lista = Array.from(autores);

    lista.sort((a, b) => a[0].localeCompare(b[0], "es")); //a y b son los elementos a comparar. localCompare comapra los nombres alfabéticamente y "es" indica que usamos las reglas del español.

    let html = "<ul>";

    for (let [autor, cantidad] of lista) {

        if (cantidad === 1) {
            html += `<li>${autor}: ${cantidad} libro</li>`;
        } else {
            html += `<li>${autor}: ${cantidad} libros</li>`;
        }

    }
    html += "</ul>";

    return html;
}


// mostrar().
/*Usamos el método ofrecido por el profesor para mostrar todos los métodos creados en el R8 */
mostrar("#resumen", htmlResumen(LIBROS));
mostrar("#catalogo", tablaLibros(LIBROS));
mostrar("#generos", htmlGeneros(LIBROS));
mostrar("#ranking", htmlRanking(LIBROS));
mostrar("#autores", htmlAutores(LIBROS));
