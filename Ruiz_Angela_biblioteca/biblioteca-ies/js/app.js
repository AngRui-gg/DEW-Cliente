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

/** R8. Crea la lista de géneros. Recibe libros; devuelve HTML. */
function htmlGeneros(libros) {
  return `<ul>${generos(libros).map(genero => `<li>${genero}</li>`).join("")}</ul>`;
}

/** R8. Crea la lista del ranking. Recibe libros; devuelve HTML. */
function htmlRanking(libros) {
  return `<ol>${ranking(libros).map(libro =>
    `<li>${libro.titulo} — ${libro.autor} (${valoracionMedia(libro)})</li>`).join("")}</ol>`;
}

/** R8. Crea el resumen de la biblioteca. Recibe libros; devuelve HTML. */
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

/** R8. Crea la relación de libros por autor. Recibe libros; devuelve HTML. */
function htmlAutores(libros) {
  const lista = [...librosPorAutor(libros)].sort((a, b) => a[0].localeCompare(b[0], "es"));
  return `<ul>${lista.map(([autor, cantidad]) =>
    `<li>${autor}: ${cantidad} ${cantidad === 1 ? "libro" : "libros"}</li>`).join("")}</ul>`;
}

// Programa principal: la única operación de escritura en la página es mostrar().
mostrar("#resumen", htmlResumen(LIBROS));
mostrar("#catalogo", tablaLibros(LIBROS));
mostrar("#generos", htmlGeneros(LIBROS));
mostrar("#ranking", htmlRanking(LIBROS));
mostrar("#autores", htmlAutores(LIBROS));
