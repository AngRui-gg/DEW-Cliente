// importamos la clase Libro
import { Libro } from "./libro.js";

/**
 * Colección de libros con operaciones de búsqueda, filtrado, orden y estadísticas.
 */
export class Biblioteca {
  // array privado: solo se toca desde los métodos de la clase (así queda encapsulado)
  #libros = [];

  /**
   * Devuelve una copia del array de libros (para poder mostrarlo sin modificar el original).
   * @returns {Libro[]} Copia de la lista de libros.
   */
  listar() {
    return [...this.#libros];
  }

  /**
   * Añade un libro, pero solo si es una instancia de Libro.
   * @param {Libro} libro - Libro a añadir.
   * @returns {boolean} true si se ha añadido, false si no es un Libro.
   */
  agregar(libro) {
    if (libro instanceof Libro) {
      // si el libro (PARÁMETRO) pertenece a Libro...
      this.#libros.push(libro); // se añade al array libros
      return true;
    } else {
      return false;
    }
  }

  /**
   * Crea libros a partir de un texto con una línea por libro y campos separados por ";".
   * Formato de cada línea: título;autor;año;páginas;género;si/no
   * @param {string} texto - Texto con los libros.
   * @returns {number} Cantidad de libros añadidos.
   */
  cargarDesdeTexto(texto) {
    let añadidos = 0;
    for (const linea of texto.split(/\r?\n/)) {
      // por cada salto de línea, separamos el texto en líneas
      if (linea.trim() === "") {
        // si la línea está vacía o solo tiene espacios se la salta
        continue;
      }

      // creamos un array (cada elemento es el texto separado por ";") y limpiamos espacios con trim
      const campos = linea.split(";").map((c) => c.trim());

      // si la línea no tiene los 6 campos, está mal escrita y se salta
      if (campos.length !== 6) {
        continue;
      }

      // como los corchetes están a la izquierda, repartimos el array por posiciones
      const [titulo, autor, anio, paginas, genero, disponible] = campos;

      // creamos el libro y convertimos cada campo al tipo correcto
      const libro = new Libro(
        titulo,
        autor,
        Number(anio),
        Number(paginas),
        genero,
        disponible.toLowerCase() === "si"
      );

      if (this.agregar(libro)) {
        añadidos++;
      }
    }

    return añadidos;
  }

  /**
   * Busca libros cuyo título o autor contengan el texto, sin distinguir mayúsculas.
   * @param {string} texto - Texto a buscar.
   * @returns {Libro[]} Libros que coinciden.
   */
  buscar(texto) {
    const aBuscar = texto.toLowerCase(); // ponemos el texto del parámetro en minúscula
    const coincidencias = [];
    this.#libros.forEach((l) => {
      // en cada libro del array...
      if (
        l.titulo.toLowerCase().includes(aBuscar) ||
        l.autor.toLowerCase().includes(aBuscar)
      ) {
        coincidencias.push(l); // si coincide, lo guardamos
      }
    });

    return coincidencias;
  }

  /**
   * Filtra los libros por género, sin distinguir mayúsculas.
   * @param {string} genero - Género buscado.
   * @returns {Libro[]} Libros de ese género.
   */
  filtrarPorGenero(genero) {
    const aBuscar = genero.toLowerCase();
    const coincidencias = [];
    this.#libros.forEach((l) => {
      if (l.genero.toLowerCase() === aBuscar) {
        coincidencias.push(l);
      }
    });

    return coincidencias;
  }

  /**
   * Filtra los libros por disponibilidad.
   * @param {boolean} disponible - true para los disponibles, false para los prestados.
   * @returns {Libro[]} Libros con esa disponibilidad.
   */
  filtrarPorDisponibilidad(disponible) {
    const coincidencias = [];
    this.#libros.forEach((l) => {
      if (l.disponible === disponible) {
        coincidencias.push(l);
      }
    });

    return coincidencias;
  }

  /**
   * Ordena los libros por un campo sin modificar el array original.
   * @param {string} campo - "titulo", "autor", "anio" o "paginas".
   * @param {boolean} ascendente - true de menor a mayor, false de mayor a menor.
   * @returns {Libro[]} Copia ordenada.
   */
  ordenarPor(campo, ascendente) {
    const copia = [...this.#libros]; // array nuevo, igual que libros: el original no se toca

    if (campo === "titulo" || campo === "autor") {
      copia.sort((a, b) => a[campo].localeCompare(b[campo])); // textos: orden alfabético
    } else {
      copia.sort((a, b) => a[campo] - b[campo]); // números: por diferencia
    }

    if (!ascendente) {
      copia.reverse(); // si es descendente, damos la vuelta a la lista
    }

    return copia;
  }

  /**
   * Devuelve los géneros sin repetir.
   * @returns {string[]} Lista de géneros.
   */
  generos() {
    const todos = this.#libros.map((l) => l.genero); // género de cada libro (con repetidos)
    const sinRepetir = new Set(todos); // el Set elimina los repetidos
    return [...sinRepetir]; // lo convertimos en array
  }

  /**
   * Calcula estadísticas del catálogo.
   * @returns {{total: number, disponibles: number, prestados: number, mediaPaginas: number, masAntiguo: (Libro|null), porGenero: Map<string, number>}}
   * Objeto con las estadísticas.
   */
  estadisticas() {
    const totalLibros = this.#libros.length;

    let totalDisponibles = 0;
    let totalPrestados = 0;
    let mediaPaginas = 0;
    let suma = 0;
    const porGenero = new Map(); // se añaden claves→valor con un .set

    // buscamos el libro más antiguo con reduce
    // min === null porque en la primera vuelta todavía no hay ningún libro guardado
    const masAntiguo = this.#libros.reduce(
      (min, actual) => (min === null || actual.anio < min.anio ? actual : min),
      null
    );

    // calculamos la cantidad de libros disponibles y prestados
    this.#libros.forEach((libro) => {
      if (libro.disponible === true) {
        totalDisponibles++;
      } else {
        totalPrestados++;
      }
    });

    // calculamos la media de las páginas
    this.#libros.forEach((libro) => {
      suma += libro.paginas;
    });
    if (totalLibros > 0) {
      mediaPaginas = Math.round(suma / totalLibros);
    }

    // obtenemos la cantidad de libros por género
    // .get lee el valor de una clave; si no existe da undefined y || 0 lo convierte en 0
    this.#libros.forEach((libro) => {
      porGenero.set(libro.genero, (porGenero.get(libro.genero) || 0) + 1);
    });

    return {
      total: totalLibros,
      disponibles: totalDisponibles,
      prestados: totalPrestados,
      mediaPaginas: mediaPaginas,
      masAntiguo: masAntiguo,
      porGenero: porGenero,
    };
  }
}

// creamos el catálogo (un objeto Biblioteca)
export const catalogo = new Biblioteca();

// añadimos 8 libros con new Libro
catalogo.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 1250, "novela"));
catalogo.agregar(new Libro("La casa de Bernarda Alba", "Federico García Lorca", 1945, 120, "teatro", false));
catalogo.agregar(new Libro("Niebla", "Miguel de Unamuno", 1914, 280, "novela"));
catalogo.agregar(new Libro("Bodas de sangre", "Federico García Lorca", 1933, 110, "teatro", false));
catalogo.agregar(new Libro("Rimas y leyendas", "Gustavo Adolfo Bécquer", 1871, 200, "poesía"));
catalogo.agregar(new Libro("Platero y yo", "Juan Ramón Jiménez", 1914, 160, "poesía", false));
catalogo.agregar(new Libro("La Celestina", "Fernando de Rojas", 1499, 220, "teatro", false));
catalogo.agregar(new Libro("En torno al casticismo", "Miguel de Unamuno", 1902, 150, "ensayo"));

// añadimos 4 libros por texto
catalogo.cargarDesdeTexto(`Campos de Castilla;Antonio Machado;1912;190;poesía;si
Fortunata y Jacinta;Benito Pérez Galdós;1887;1000;novela;si
Luces de bohemia;Ramón del Valle-Inclán;1920;140;teatro;si
La colmena;Camilo José Cela;1951;340;novela;no`);
