/*
 Inventario de equipos: creación, funciones de recorrido y pruebas.
 Requiere ordenadores.js (cargado antes en index.html).
*/

"use strict";

// Parte 5 — Inventario (en el orden pedido)
const inventario = [
  new Ordenador("HP", "EliteDesk", 16, 1024, 24),
  new Ordenador("Acer", "Aspire"),
  new Portatil("Apple", "MacBook Air"),
  new Portatil("Lenovo", "Yoga", 16, 1024, 14, 10),
  new Tablet("Apple", "iPad", 8, 256, 11, 10, true),
  new Tablet("Samsung", "Galaxy Tab"),
  new Servidor("Dell", "PowerEdge", 16, 64, 4000),
  new Gaming("Asus", "ROG", "RTX 4070", 32, 2000),
  new Gaming("HP", "Omen", "RX 7800"),
];

// Parte 6 — Funciones de recorrido (todas reciben la lista por parámetro)

/* a) Muestra cada equipo numerado con su tipo, su toString() y su precio. */
function mostrarInventario(lista) {
  lista.forEach((equipo, i) => {
    console.log(
      //name da el nombre del método (Ordenador, Portatil, Tablet, Servidor o Gaming)
      `${i + 1}. [${equipo.constructor.name}] ${equipo.toString()} → ${equipo.precio()} €`,
    );
  });
}

/* b) Muestra cada propiedad del equipo como "propiedad: valor". */
function describir(equipo) {
  for (const propiedad in equipo) {
    console.log(`${propiedad}: ${equipo[propiedad]}`).join("\n");
  }
}

/* c) Cuenta los portátiles, incluidas las tablets (instanceof admite subclases). */
function contarPortatiles(lista) {
  return lista.filter((equipo) => equipo instanceof Portatil).length;
}

/* c) Cuenta solo los portátiles "puros", sin tablets (clase exacta). */
function contarSoloPortatiles(lista) {
  return lista.filter((equipo) => equipo.constructor === Portatil).length;
}

/* d) Devuelve el equipo más caro (null si la lista está vacía). */
function masCaro(lista) {
  return lista.reduce((max, equipo) =>
    equipo.precio() > max.precio() ? equipo : max,
  );
}

//pedido por Carlos en clase para probar
function masCaro2(lista) {
  const precios = lista.map((equipo) => equipo.precio());
  const maximo = Math.max(...precios);
  return lista.find((equipo) => equipo.precio() === maximo);
}

/*
  e) Equipos que no superan "maximo" €, del más barato al más caro.
  filter crea un array nuevo, así que sort no altera la lista original.
 */
function dentroDePresupuesto(lista, maximo) {
  return lista
    .filter((equipo) => equipo.precio() <= maximo)
    .sort((a, b) => a.precio() - b.precio()); //de menor a mayor, si lo queremos al revés sería b-a
}

/* f) Objeto-diccionario con el importe total de cada marca. */
function totalPorMarca(lista) {
  const totales = {};
  lista.forEach((equipo) => {
    totales[equipo.marca] = (totales[equipo.marca] || 0) + equipo.precio();
  });
  return totales;
}

/*
 g) Suma "gb" de RAM a todos los equipos de la clase indicada (o de sus subclases).
   Modifica los objetos de la lista (se comparten por referencia).
 */
function ampliarRam(lista, clase, gb) {
  lista
    .filter((equipo) => equipo instanceof clase)
    .forEach((equipo) => {
      equipo.ram += gb;
    });
}

// Ampliación

/** A3. Objeto con el número de equipos de cada clase. */
function contarPorTipo(lista) {
  const cuenta = {};
  lista.forEach((equipo) => {
    cuenta[equipo.tipo] = (cuenta[equipo.tipo] || 0) + 1;
  });
  return cuenta;
}

/** A3. Objeto con la RAM media (GB) de cada clase. */
function ramMediaPorTipo(lista) {
  const sumas = {};
  const cuenta = contarPorTipo(lista);
  lista.forEach((equipo) => {
    sumas[equipo.tipo] = (sumas[equipo.tipo] || 0) + equipo.ram;
  });
  const medias = {};
  for (const tipo in sumas) {
    medias[tipo] = sumas[tipo] / cuenta[tipo];
  }
  return medias;
}

// Pruebas
console.log("--- Parte 1: precio() ---");
console.log(new Ordenador("Acer", "Aspire").precio()); // 376.2
console.log(new Portatil("Apple", "MacBook Air").precio()); // 485.6

console.log("\n---Parte 5: Gaming sin gráfica---");
try {
  new Gaming("MSI", "Titan");
} catch (error) {
  console.log("Error:", error.message); // La tarjeta gráfica es obligatoria
}

console.log("\n=== Inventario ===");
mostrarInventario(inventario);

console.log("\n=== Precios para comprobar ===");
console.log("iPad:", inventario[4].precio().toFixed(2), "€"); // 660.60
console.log("Galaxy Tab:", inventario[5].precio().toFixed(2), "€"); // 552.80
console.log("Dell PowerEdge:", inventario[6].precio().toFixed(2), "€"); // 2828.00
console.log("Asus ROG:", inventario[7].precio().toFixed(2), "€"); // 1255.00
console.log("HP Omen:", inventario[8].precio().toFixed(2), "€"); // 997.40

console.log("\n=== describir (iPad) ===");
describir(inventario[4]);

console.log("\n=== Conteos ===");
console.log("contarPortatiles:", contarPortatiles(inventario)); // 4
console.log("contarSoloPortatiles:", contarSoloPortatiles(inventario)); // 2

console.log("\n=== masCaro ===");
const caro = masCaro(inventario);
console.log(`${caro.marca} ${caro.modelo} (${caro.precio().toFixed(2)} €)`); // Dell PowerEdge (2828.00 €)

console.log("\n=== dentroDePresupuesto(inventario, 700) ===");
const baratos = dentroDePresupuesto(inventario, 700);
console.log(`${baratos.length} equipos`); // 5
mostrarInventario(baratos);

console.log("\n=== totalPorMarca ===");
const totales = totalPorMarca(inventario);
for (const marca in totales) {
  console.log(`${marca}: ${totales[marca].toFixed(2)} €`); // HP 1579.80, Apple 1146.20...
}

console.log("\n=== Ampliación A3 ===");
console.log(contarPorTipo(inventario));
console.log(ramMediaPorTipo(inventario));

console.log("\n=== ampliarRam (Tablet, +8 GB) ===");
console.log("RAM iPad antes:", inventario[4].ram); // 8
ampliarRam(inventario, Tablet, 8);
console.log("RAM iPad después:", inventario[4].ram); // 16 → el inventario original cambia

// Parte 7 — Preguntas
/*
 1. ¿Por qué contarPortatiles y contarSoloPortatiles dan resultados distintos?
    instanceof devuelve true para la clase indicada y también para todas sus
    subclases. Como Tablet hereda de Portatil, una Tablet "es un" Portatil
    (relación "es-un" de la herencia): puede usarse en cualquier sitio donde se
    espere un Portatil. Por eso contarPortatiles cuenta 4 (2 portátiles + 2 tablets).
    contarSoloPortatiles compara constructor === Portatil, es decir, la clase
    exacta, y por eso solo cuenta 2.

 2. En mostrarInventario llamas a precio() sin saber de qué clase es cada equipo.
    Esta característica se llama polimorfismo: la misma llamada produce
    comportamientos distintos según la clase real del objeto. Para una Tablet se
    ejecuta Tablet.precio(), que llama con super a Portatil.precio(), y esta a su
    vez a Ordenador.precio(). JavaScript elige la versión en tiempo de ejecución,
    buscando el método en la cadena de prototipos desde la clase real del objeto.

 3. Tablet y Servidor sobrescriben precio() de forma distinta. ¿En qué se diferencian?
    Tablet EXTIENDE el método del padre: llama a super.precio() y le suma algo
    (50 € del lápiz). Conviene cuando el cálculo del hijo es el del padre más un
    añadido, porque si cambia la fórmula del padre el hijo se actualiza solo.
    Servidor SUSTITUYE el método por completo: no usa super y aplica una fórmula
    propia (núcleos, otros coeficientes). Conviene cuando el cálculo no se parece
    al del padre; así no se arrastran términos que no tienen sentido (un servidor
    no tiene pantalla), a costa de no heredar los cambios futuros del padre.

 4. ¿Por qué describir no muestra precio ni toString?
    for...in recorre las propiedades enumerables. Los datos que se asignan con
    this.x en el constructor son propiedades propias y enumerables. precio() y
    toString() son métodos de clase: se guardan en el prototipo y los métodos
    declarados con class no son enumerables. Tampoco aparece el getter tipo, por
    la misma razón. Además, son comportamiento de la clase, no datos del objeto.

 5. Después de llamar a ampliarRam, ¿cambia el inventario original? ¿Por qué?
    Sí. filter crea un array nuevo, pero sus elementos son las mismas referencias
    a los objetos del inventario (los objetos no se copian). Al hacer
    equipo.ram += gb se modifica el objeto original, que es el mismo al que apunta
    el inventario. Solo el array es nuevo; los objetos son compartidos.

 6. ¿Qué pasaría en ampliarRam(inventario, Ordenador, 8)?
    Todos los equipos del inventario son instancias de Ordenador (directas o por
    herencia: Portatil, Tablet, Servidor y Gaming), así que instanceof da true
    para los 9 y todos ganarían 8 GB de RAM. El precio subiría 80 € en cada
    equipo (ram × 10) salvo en el servidor, que subiría 96 € (ram × 12).
*/
