# Proyecto Biblioteca (DEC + DIW)

## Estructura

```
biblioteca/
├── index.html
├── README.md
├── css/estilos.css
└── js/
    ├── libro.js        (clase Libro)
    ├── biblioteca.js   (clase Biblioteca y catálogo inicial)
    └── app.js          (pintado, simulación de préstamos, vistas, índice y estadísticas)
```

## Capturas

<!-- las imágenes están en la carpeta llamada "capturass" -->
- Captura de la aplicación: `01_aplicacion.png`
- Captura de la consola: `02_consola.png`
- Captura del validador del W3C sin errores: `03_W3.png`

## Arquitectura

Todo el código de esta aplicación se ejecuta en el navegador. Los datos del catálogo y los préstamos viven en memoria, así que al recargar la página se pierden. Para que los préstamos se guardaran haría falta un servidor con una base de datos y una API a la que el navegador enviara cada préstamo.

Se usa JavaScript porque es el lenguaje que ejecutan de forma nativa todos los navegadores para manipular el DOM. Como tecnologías de cliente existen también HTML y CSS (estructura y presentación), TypeScript (que se compila a JavaScript) y WebAssembly.

Al cargar los scripts como módulos (`type="module"`), cada archivo tiene su propio ámbito, sus variables no son globales y se comparten con `export` e `import`. Se cargan de forma diferida y el navegador los pide por HTTP, por eso no funcionan abriendo el HTML con doble clic (`file://`) y hace falta un servidor local como Live Server.

Un lenguaje interpretado en el navegador no necesita compilar ni instalar nada y funciona en cualquier sistema, pero suele ser menos rápido que un programa compilado y los errores aparecen al ejecutar (no antes).

Herramientas usadas: Visual Studio Code para programar, Live Server para probar, las herramientas de desarrollo del navegador (consola y depurador) para depurar, Git y GitHub para el control de versiones y el validador del W3C para el HTML.

## Decisiones

**Cómo combino los filtros.** Los métodos de `Biblioteca` devuelven arrays de libros, así que se pueden encadenar. Para «novelas disponibles ordenadas por páginas» primero uso `filtrarPorGenero("novela")`, sobre ese resultado aplico `filter` para quedarme con los disponibles y después `sort` por páginas. Como cada paso trabaja sobre el array que devolvió el anterior, el catálogo original no cambia.


**Cómo ordeno sin modificar el array original.** `sort` modifica el array sobre el que se llama, así que `ordenarPor` primero hace una copia con `[...this.#libros]` y ordena esa copia. Para título y autor comparo con `localeCompare` (respeta tildes) y para año y páginas resto los valores. Si el orden es descendente, doy la vuelta a la copia con `reverse()`.

**Cómo convierto los campos de texto en `cargarDesdeTexto()`.** Separo el texto en líneas con `split` y cada línea en campos con `split(";")`, quitando espacios con `trim()`. Todos los campos llegan como texto, así que convierto año y páginas con `Number()` y el último campo con `disponible.toLowerCase() === "si"`, que da directamente `true` o `false`. Si una línea no tiene 6 campos, la salto.
