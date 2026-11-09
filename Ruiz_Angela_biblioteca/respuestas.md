# Tarea 1 — Biblioteca del IES

## Parte A — Calentamiento

### A1. Conversiones de tipos
**"5" + 3**
Mi predicción: “53”
Resultado real: “53”
Tipo (typeof): string 
Explicación: El operador + concatena si uno de los operandos es texto

**"5" * 3**
Mi predicción: 15
Resultado real: 15
Tipo (typeof): number
Explicación: La multiplicación convierte el texto numérico en número

**"5" - “2”**
Mi predicción: 3
Resultado real: 3
Tipo (typeof): number
Explicación: La resta fuerza la conversión a números

**Number(“ ”)**
Mi predicción: NaN
Resultado real: 0
Tipo (typeof): number
Explicación: La cadena vacía se convierte en 0 automáticamente

**Number(“12px”)**
Mi predicción: NaN
Resultado real: NaN
Tipo (typeof): number
Explicación: Number exige un texto numérico

**parseInt("12px")** 
Mi predicción: NaN
Resultado real: 12
Tipo (typeof): number
Explicación: Lee la parte entera inicial y se detiene en `p` (cuando llega al texto no numerico)

**parseFloat("3.75€")** 
Mi predicción: 3.75
Resultado real: 3.75
Tipo (typeof): number
Explicación: Lee la parte entera inicial y se detiene en `€` (cuando llega al texto no numerico)

**"10" == 10** 
Mi predicción: true
Resultado real: true
Tipo (typeof): boolean
Explicación: La comparación no estricta convierte tipos antes de comparar

**"10" === 10** 
Mi predicción: false
Resultado real: false
Tipo (typeof): boolean
Explicación: La comparación estricta no convierte texto en número

**null + 1**
Mi predicción: NaN
Resultado real: 1
Tipo (typeof): number
Explicación: En esta operación `null` se convierte a cero

**undefined + 1**
Mi predicción: NaN
Resultado real: Nan
Tipo (typeof): number
Explicación: `undefined` no puede convertirse en un número válido

**typeof NaN**
Mi predicción: NaN
Resultado real: “number”
Tipo (typeof): string
Explicación: `NaN` es un valor especial del tipo number

**Boolean("0")** 
Mi predicción: false
Resultado real: true
Tipo (typeof): boolean
Explicación: Todas las cadenas no vacía es TRUE

**0 || "valor por defecto"**  
Mi predicción: valor por defecto
Resultado real: valor por defecto
Tipo (typeof): string
Explicación: Se devuelve el valor de la derecha si la izquierda es falsy

**0 ?? "valor por defecto"**
Mi predicción: valor por defecto
Resultado real: 0
Tipo (typeof): number
Explicación: `??` solo usa el valor alternativo con null o undefined


**¿Por qué `NaN === NaN` devuelve `false`?** 
`NaN` no es igual a ningún valor, ni a sí mismo.
**¿Cómo compruebas correctamente si un valor es NaN?**
Con el método Number.isNaN(valor)


### A2. Ámbito de variables
1. console.log("Dentro:", total) → Muestra el total (precio * unidades + gastosEnvioA2) por pantalla. Si supera 50 se le resta 10.

console.log("Fuera:", total) → Imprime 0

console.log(descuento) → Error, porque fue creada dentro de la función. 

2. Porque uno de ellos existe solo mientras la función se está ejecutando. Al terminar la función, el valor que guardaba ya no existe.

3. Error, porque fue creada dentro de la función.

4. Si quitamos el let, se modificaría el total que está creado en la línea 2.

5. Error, porque al inicio del programa hemos declarado la variable con const. 


### A3. Boletín de notas
Resuelto en ejA3.js

### A4. Inscripciones con Set y Map
1. Salen 6. Es el resultado que esperaba porque tiene en cuenta mayúsculas y minúsculas como correos diferentes. 
2. Ahora son 4.
3. Resuelto en ejA4.js
4. Resuelto en ejA4.js

### A5. Funciones y callbacks
1. Resuelto en ejA5.js
2. Resuelto en ejA5.js
3. Resuelto en ejA5.js
4. Mis funciones y `map`/`filter` reciben una función callback y construyen un array nuevo sin modificar el original. `map` transforma cada elemento; `filter` selecciona únicamente los que cumplen una condición.
5. Resuelto en ejA5.js

### A6. Depuración
**Error 1**
En la línea 7. 
La variable suma debería valer 7, pero vale “07” porque el primer elemento del array es un string. Al sumarlo con el 0 se concatenan porque uno de ellos es un string y el otro un number.
Para corregirlo, deberíamos escribir lo siguiente: suma += Number(notas[i]); 

**Error 2**
En la línea 6.
No detecta la nota 5 como aprobada.
Al llegar a i = 2 vemos que la nota es 5 y no entra en el if, por lo que el contador no aumenta un +1. 
Para corregirlo, deberíamos escribir lo siguiente: if (notas[i] >= 5) 

**Error 3**
En la línea 5.
El bucle realiza una iteración de más. 
Encontramos este error ya que el array tiene 4 posiciones pero llegamos hasta i=5.
Para corregirlo, deberíamos escribir lo siguiente: Cambiar i <= notas.length por 
i < notas.length. 

**Error 4**
En la línea 12.
Divide entre todas las notas en lugar de entre las aprobadas.
En el return el contador vale 2, pero la función hace una división entre notas.length.
Para corregirlo, deberíamos escribir lo siguiente: return suma / contador; 

**Evidencia A6:** Puedes encontrar las imágenes en la carpeta Ruiz_Angela_biblioteca\capturas



## Parte B — Investigación previa: carga de scripts

**1. defer y async.** Los dos permiten descargar JavaScript sin interrumpir el análisis inicial del HTML (en segundo plano). Con `defer` la ejecución espera a que se haya analizado el documento y los scripts se ejecutan en el orden del HTML. Con `async`, el script se ejecuta cuando termina su descarga: el orden de ejecución no está garantizado.

**2. Sin defer.** Con el `app.js` completado, el error esperado al cargar los scripts en el `<head>` es `TypeError: Cannot set properties of null (setting 'innerHTML')`. Se produce porque `mostrar` busca `#resumen` antes de que el navegador haya creado ese elemento en el `<body>`. El texto exacto puede variar según el navegador. **Esta explicación es del comportamiento esperado; no se adjunta una captura de esa prueba.**

**3. Con `defer`, pero `app.js` antes de `datos.js`.** El error esperado es `ReferenceError: LIBROS is not defined`. `app.js` intenta utilizar `LIBROS` antes de ejecutar el archivo donde se declara; `defer` mantiene el orden de aparición. **No se adjunta una captura de esa prueba.**

**4. ¿Por qué conviene `defer`?** La app depende del array definido en `datos.js` y de elementos del HTML. `defer` asegura que los elementos existan y que `datos.js` se ejecute antes que `app.js`. `async` no ofrece esa garantía de orden.

**Fuente consultada:** MDN, elemento HTML `<script>`: https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/script

**Estado final:** `index.html` vuelve a tener `defer` en los tres scripts, en el orden `datos.js`, `app.js`, `pruebas.js`.

## Parte B — Requisitos y pruebas

- R1: `valoracionMedia` emplea `reduce` y devuelve `null` sin valoraciones.
- R2: `librosDisponibles` utiliza `filter` (8 disponibles).
- R3: `librosEntre` convierte a números y valida el rango (4 entre 1950–1960).
- R4: `generos` usa `Set` y orden alfabético (5 géneros).
- R5: `librosPorAutor` usa `Map` (Isaac Asimov tiene 2).
- R6: `ranking` ordena los libros valorados sin alterar el array original (primera: Matilda, 4.8).
- R7: `resumen` devuelve 13 libros, 5 prestados, 8 disponibles, media global y «La Celestina» como más antiguo.
- R8: HTML de las cinco secciones mediante template literals, filas `prestado`, sin valoraciones como «Sin valorar».
- R9: solo `let` y `const`, nombres descriptivos y cabeceras de funciones.
- R10: `js/pruebas.js` comprueba valores y casos límite con `console.assert`; `console.table` lista disponibles.

**Evidencia B:** abre `biblioteca-ies/index.html` en Chrome/Edge, F12 → **Fuentes/Sources** → `js/app.js`. Coloca el breakpoint en la línea `.sort((a, b) => valoracionMedia(b) ...`, recarga y entra en la función de comparación con «Step into» si es necesario. Captura el código detenido y las variables `a`, `b`, y sus medias en *Scope/Watch*. Guarda la captura como `capturas/B-ranking-depurador.png`.

Las dos capturas deben ser auténticas de las herramientas de tu navegador; no se han fabricado imágenes del depurador. Debes añadirlas antes de entregar.

**Nota:** El enunciado pide también una URL de repositorio. El ZIP no crea ni publica automáticamente un repositorio; será necesario subir estos archivos a tu cuenta y entregar su URL.
