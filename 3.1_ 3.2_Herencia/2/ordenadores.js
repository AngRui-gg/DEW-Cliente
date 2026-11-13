/**
 * ordenadores.js
 * Jerarquía de clases del inventario de equipos:
 *
 *           Ordenador
 *          /    |     \
 *   Portatil  Servidor  Gaming
 *      |
 *    Tablet
 */

/**
 * Ordenador de sobremesa genérico.
 * Marca y modelo son obligatorios; el resto tiene valores por defecto.
 */
class Ordenador {
  constructor(marca, modelo, ram = 4, disco = 512, pulgadas = 17) {
    if (!marca || !modelo) {
      throw new Error("La marca y el modelo son obligatorios");
    }
    this.marca = marca;
    this.modelo = modelo;
    this.ram = ram;
    this.disco = disco;
    this.pulgadas = pulgadas;
  }

  /** Parte 1. Precio orientativo en euros. */
  precio() {
    return 200 + this.ram * 10 + this.disco * 0.1 + this.pulgadas * 5;
  }

  toString() {
    return `${this.marca} ${this.modelo} — RAM: ${this.ram} GB, Disco: ${this.disco} GB, Pantalla: ${this.pulgadas}"`;
  }

  /** (A1) Comparador para sort: de más barato a más caro. */
  static compararPorPrecio(a, b) {
    return a.precio() - b.precio();
  }

  /** (A2) Nombre de la clase del objeto: "Tablet", "Servidor"... */
  get tipo() {
    return this.constructor.name;
  }
}

/*
 Portátil: un ordenador con batería. 
 Cambian los valores por defecto: disco 256 GB y pantalla 12".
 */
class Portatil extends Ordenador {
  constructor(
    marca,
    modelo,
    ram = 4,
    disco = 256,
    pulgadas = 12,
    autonomia = 4,
  ) {
    super(marca, modelo, ram, disco, pulgadas); //llamamos a los atributos clase padre
    this.autonomia = autonomia; //añadimos un nuevo atributo propio
  }

  /* Precio de un ordenador + 100 € + 15 € por hora de autonomía. */
  precio() {
    return super.precio() + 100 + this.autonomia * 15; //llamamos a la clase padre y lo modificamos
  }

  toString() {
    return `${super.toString()}, Autonomía: ${this.autonomia} h`;
  }
}

/*
 Tablet: un portátil con lápiz opcional.
 Cambian los valores por defecto: 4 GB, 128 GB, 10" y 10 h.
 */
class Tablet extends Portatil {
  constructor(
    marca,
    modelo,
    ram = 4,
    disco = 128,
    pulgadas = 10,
    autonomia = 10,
    lapiz = false,
  ) {
    super(marca, modelo, ram, disco, pulgadas, autonomia); //llaman a los atributos de su clase padre
    this.lapiz = lapiz; //creamos el atributo único de esta clase
  }

  /** Precio de un portátil + 50 € si incluye lápiz. */
  precio() {
    return super.precio() + (this.lapiz ? 50 : 0);
  }

  toString() {
    return `${super.toString()}, Lápiz: ${this.lapiz ? "sí" : "no"}`;
  }
}

/*
 Servidor: sin pantalla (pulgadas siempre 0).
 Cambian los valores por defecto: 32 GB de RAM y 2000 GB de disco.
 */
class Servidor extends Ordenador {
  constructor(marca, modelo, nucleos = 8, ram = 32, disco = 2000) {
    super(marca, modelo, ram, disco, 0);
    this.nucleos = nucleos;
  }

  /* Este precio NO reutiliza la del padre. */
  precio() {
    return 500 + this.nucleos * 60 + this.ram * 12 + this.disco * 0.15;
  }

  /* Este toString NO reutiliza la del padre */
  toString() {
    return `${this.marca} ${this.modelo} — ${this.nucleos} núcleos, RAM: ${this.ram} GB, Disco: ${this.disco} GB, sin pantalla`;
  }
}

/*
 Gaming: ordenador con tarjeta gráfica obligatoria.
 Cambian los valores por defecto: 16 GB, 1024 GB y 27".
 */
class Gaming extends Ordenador {
  constructor(marca, modelo, grafica, ram = 16, disco = 1024, pulgadas = 27) {
    super(marca, modelo, ram, disco, pulgadas);

    if (!grafica) {
      console.error("La tarjeta gráfica es obligatoria");
    }
    this.grafica = grafica || "Sin gráfica";
  }

  precio() {
    return super.precio() + 400;
  }

  toString() {
    return `${super.toString()}, Gráfica: ${this.grafica}`;
  }

  /* Precio de un ordenador + 400 €. */
  precio() {
    return super.precio() + 400;
  }

  toString() {
    return `${super.toString()}, Gráfica: ${this.grafica}`;
  }
}
