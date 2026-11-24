import { catalogo } from "./biblioteca.js";

const TEXTO_BUSQUEDA = "de";
const contenedor = document.getElementById("contenedor"); // contenedor vacío de index.html
const indice = document.getElementById("indice"); // nav donde va el índice (RF7)
const panelEstadisticas = document.getElementById("estadisticas"); // panel de estadísticas (RF7)
let contadorSecciones = 0; // para darle un id distinto a cada sección

// RF4: función de pintado reutilizable 

/**
 * Pinta una sección con su encabezado y una tarjeta por libro.
 * Si la lista está vacía, muestra un mensaje.
 * @param {string} titulo - Encabezado de la sección.
 * @param {Array} lista - Libros que se muestran (instancias de Libro).
 * @returns {HTMLElement} La sección creada.
 */
function pintarSeccion(titulo, lista) {
  contadorSecciones++;

  const seccion = document.createElement("section"); // creamos una sección...
  seccion.id = `seccion-${contadorSecciones}`; // ...y le damos un id (para los enlaces del índice)

  const h2 = document.createElement("h2"); // creamos el encabezado (elemento hijo)
  h2.textContent = titulo;
  seccion.appendChild(h2); // colocamos el h2 dentro de la sección (la sección es el padre)

  // lista vacía: mensaje y salimos
  if (lista.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "No hay libros en esta sección";
    seccion.appendChild(vacio);
    contenedor.appendChild(seccion);
    return seccion;
  }

  // una tarjeta por libro
  lista.forEach((libro) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");
    tarjeta.classList.add(libro.disponible ? "disponible" : "prestado");

    tarjeta.innerHTML = `
      <h3 class="tarjeta-titulo">${libro.titulo}</h3>
      <p class="tarjeta-autor">${libro.autor}</p>
      <p class="tarjeta-dato">Año: ${libro.anio}</p>
      <p class="tarjeta-dato">Páginas: ${libro.paginas}</p>
      <p class="tarjeta-dato">Género: ${libro.genero}</p>
      <p class="tarjeta-dato">Estado: ${libro.disponible ? "Disponible" : "Prestado"}</p>
    `;

    // etiqueta "Prestado" en la esquina (solo si el libro no está disponible)
    if (!libro.disponible) {
      const etiqueta = document.createElement("span");
      etiqueta.classList.add("etiqueta");
      etiqueta.textContent = "Prestado";
      tarjeta.appendChild(etiqueta);
    }

    seccion.appendChild(tarjeta);
  });

  contenedor.appendChild(seccion);
  return seccion;
}

// RF6: simulación de préstamos (antes de pintar)

/**
 * Busca un libro por su título en el catálogo.
 * @param {string} titulo - Título (o parte del título) del libro.
 * @returns {(Object|undefined)} El primer libro encontrado, o undefined si no existe.
 */
function buscarLibro(titulo) {
  return catalogo.buscar(titulo)[0];
}

// comprobación de los datos de partida
console.table(catalogo.listar());

console.log("--- Simulación de préstamos ---");

// 1. Prestar 3 libros que están disponibles (deben dar true)
console.log("Prestar El Quijote:", buscarLibro("El Quijote").prestar());
console.log("Prestar Niebla:", buscarLibro("Niebla").prestar());
console.log("Prestar Rimas y leyendas:", buscarLibro("Rimas y leyendas").prestar());

// 2. Devolver 1 libro que está prestado (debe dar true)
console.log("Devolver Platero y yo:", buscarLibro("Platero y yo").devolver());

// 3. Intentar prestar uno que ya estaba prestado (debe dar false)
console.log("Prestar Bodas de sangre (ya prestado):", buscarLibro("Bodas de sangre").prestar());

// RF5: vistas del catálogo 

// 1. Catálogo completo, ordenado por título
pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo", true));

// 2. Disponibles y prestados
pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true));
pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false));

// 3. Una sección por género (si hay un género nuevo, sale sola)
for (const genero of catalogo.generos()) {
  pintarSeccion(`Género: ${genero}`, catalogo.filtrarPorGenero(genero));
}

// 4. Los 5 más antiguos
pintarSeccion("Los 5 libros más antiguos", catalogo.ordenarPor("anio", true).slice(0, 5));

// 5. Vista combinada: novelas disponibles ordenadas por páginas
const novelasDisponibles = catalogo
  .filtrarPorGenero("novela") // solo novelas
  .filter((libro) => libro.disponible) // de esas, las disponibles
  .sort((a, b) => a.paginas - b.paginas); // de menos a más páginas (es una copia, no toca el catálogo)
pintarSeccion("Novelas disponibles ordenadas por páginas", novelasDisponibles);

// 6. Resultados de búsqueda
pintarSeccion(`Resultados de la búsqueda «${TEXTO_BUSQUEDA}»`, catalogo.buscar(TEXTO_BUSQUEDA));

// RF7: índice y panel de estadísticas

/**
 * Genera el índice con un enlace a cada sección ya pintada.
 * @returns {void}
 */
function pintarIndice() {
  const secciones = contenedor.querySelectorAll("section"); // secciones que ha pintado pintarSeccion

  secciones.forEach((seccion) => {
    const enlace = document.createElement("a");
    enlace.href = `#${seccion.id}`; // salta a la sección por su id
    enlace.textContent = seccion.querySelector("h2").textContent; // el texto es el título de la sección
    enlace.classList.add("enlace-indice");
    indice.appendChild(enlace);
  });
}

/**
 * Pinta el panel con los datos de catalogo.estadisticas().
 * @returns {void}
 */
function pintarEstadisticas() {
  const e = catalogo.estadisticas();

  panelEstadisticas.classList.add("panel");

  const titulo = document.createElement("h2");
  titulo.textContent = "Estadísticas";
  panelEstadisticas.appendChild(titulo);

  const lista = document.createElement("ul");

  // datos simples: [texto, valor]
  const datos = [
    ["Total de libros", e.total],
    ["Disponibles", e.disponibles],
    ["Prestados", e.prestados],
    ["Media de páginas", e.mediaPaginas],
    ["Libro más antiguo", e.masAntiguo.resumen()],
  ];

  datos.forEach(([etiqueta, valor]) => {
    const li = document.createElement("li");
    li.textContent = `${etiqueta}: ${valor}`;
    lista.appendChild(li);
  });

  // libros por género (es un Map: clave = género, valor = cantidad)
  for (const [genero, cantidad] of e.porGenero) {
    const li = document.createElement("li");
    li.textContent = `Libros de ${genero}: ${cantidad}`;
    lista.appendChild(li);
  }

  panelEstadisticas.appendChild(lista);
}

pintarIndice();
pintarEstadisticas();
