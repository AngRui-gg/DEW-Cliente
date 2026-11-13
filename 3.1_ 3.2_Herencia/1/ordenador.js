class Ordenador {
  constructor(marca, modelo, ram = 4, disco = 512, pulgadas = 17) {
    if (!marca || !modelo) {
      throw new Error("La marca y el modelo son obligatorios"); //sí lo ha explicado Carlos
    }
    this.marca = marca;
    this.modelo = modelo;
    this.ram = ram;
    this.disco = disco;
    this.pulgadas = pulgadas;
  }

  toString() {
    return `${this.marca} ${this.modelo} — RAM: ${this.ram} GB, Disco: ${this.disco} GB, Pantalla: ${this.pulgadas}"`;
  }
}

class Portatil extends Ordenador {
  // En los portátiles cambian por defecto: disco = 256 y pulgadas = 12
  constructor(
    marca,
    modelo,
    ram = 4,
    disco = 256,
    pulgadas = 12,
    autonomia = 4,
  ) {
    super(marca, modelo, ram, disco, pulgadas);
    this.autonomia = autonomia;
  }

  toString() {
    return `${super.toString()}, Autonomía: ${this.autonomia} h`;
  }
}

// Prueba
const o1 = new Ordenador("HP", "EliteBook");
const o2 = new Ordenador("Dell", "Optiplex", 16, 1024, 24);
const p1 = new Portatil("Lenovo", "ThinkPad");
const p2 = new Portatil("Apple", "MacBook Air", 16, 512, 13, 18);

console.log(o1.toString()); // HP EliteBook — RAM: 4 GB, Disco: 512 GB, Pantalla: 17"
console.log(o2.toString()); // Dell Optiplex — RAM: 16 GB, Disco: 1024 GB, Pantalla: 24"
console.log(p1.toString()); // Lenovo ThinkPad — RAM: 4 GB, Disco: 256 GB, Pantalla: 12", Autonomía: 4 h
console.log(p2.toString()); // Apple MacBook Air — RAM: 16 GB, Disco: 512 GB, Pantalla: 13", Autonomía: 18 h
