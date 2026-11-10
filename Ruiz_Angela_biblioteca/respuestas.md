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



## Parte B — Reto integrador: Biblioteca del IES 

**1. defer y async.** Los dos permiten descargar JavaScript sin interrumpir el análisis inicial del HTML (en segundo plano). Con `defer` la ejecución espera a que se haya analizado el documento y los scripts se ejecutan en el orden del HTML. Con `async`, el script se ejecuta cuando termina su descarga: el orden de ejecución no está garantizado.

**2. Sin defer.** `TypeError: Cannot set properties of null (setting 'innerHTML')`. 
Se produce porque `mostrar` busca `#resumen` antes de que el navegador haya creado ese elemento en el `<body>`. 

**3. app.js antes de datos.js.** `ReferenceError: LIBROS is not defined`. `app.js` intenta utilizar `LIBROS` antes de ejecutar el archivo donde se declara; `defer` mantiene el orden de aparición. 

**4. ¿Por qué defer es más adecuado?** La app depende del array definido en `datos.js` y de elementos del HTML. `defer` asegura que los elementos existan y que `datos.js` se ejecute antes que `app.js`. `async` no nos asegura que se vaya a seguir el orden necesario.

