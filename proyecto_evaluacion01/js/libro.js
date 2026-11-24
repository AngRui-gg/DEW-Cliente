/**
 * Representa un libro del catálogo.
 */
export class Libro {
  /**
   * Crea un libro.
   * @param {string} titulo - Título del libro.
   * @param {string} autor - Autor del libro.
   * @param {number} anio - Año de publicación.
   * @param {number} paginas - Número de páginas.
   * @param {string} genero - Género (novela, teatro, poesía, ensayo...).
   * @param {boolean} [disponible=true] - true si está disponible, false si está prestado.
   */
  constructor(titulo, autor, anio, paginas, genero, disponible = true) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.paginas = paginas;
    this.genero = genero;
    this.disponible = disponible;
  }

  /**
   * Marca el libro como prestado. Si ya estaba prestado no cambia nada.
   * @returns {boolean} true si se ha podido prestar, false si ya estaba prestado.
   */
  prestar() {
    if (this.disponible === true) {
      this.disponible = false;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Marca el libro como disponible. Si ya lo estaba no cambia nada.
   * @returns {boolean} true si se ha podido devolver, false si ya estaba disponible.
   */
  devolver() {
    if (this.disponible === false) {
      this.disponible = true;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Calcula los años que han pasado desde la publicación.
   * @returns {number} Años de antigüedad.
   */
  antiguedad() {
    // new Date() crea un objeto con la fecha y hora actuales, .getFullYear() saca el año en 4 dígitos
    const anioActual = new Date().getFullYear();
    const aniosCalculados = anioActual - this.anio;
    return aniosCalculados;
  }

  /**
   * Devuelve un texto resumen del libro.
   * @returns {string} Texto del tipo «Niebla — Miguel de Unamuno (1914)».
   */
  resumen() {
    return `${this.titulo} — ${this.autor} (${this.anio})`;
  }
}
