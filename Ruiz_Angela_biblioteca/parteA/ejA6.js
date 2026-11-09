//SIN LAS CORRECCIONES APLICADAS
function mediaAprobados(notas) { 
  let suma = 0; 
  let contador = 0; 

  for (let i = 0; i <= notas.length; i++) { 
    if (notas[i] > 5) { 
      suma += notas[i]; 
      contador++; 
    } 
  } 

  return suma / notas.length; 
} 

console.log(mediaAprobados(["7", 4, 5, 9.5, 3])); // Esperado: 7.17 aprox. 


//CON LAS CORRECCIONES APLICADAS
function mediaAprobados(notas) { 
  let suma = 0; 
  let contador = 0; 

  for (let i = 0; i < notas.length; i++) { 
    if (notas[i] >= 5) { 
      suma += Number(notas[i]); 
      contador++; 
    } 
  }
  
if (contador === 0) {
    return null;
}

  return suma / contador; 
} 

console.log(mediaAprobados(["7", 4, 5, 9.5, 3])); // Esperado: 7.17 aprox. 
