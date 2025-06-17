let estudiantes = [];

const formulario = document.querySelector("form");
const mensajeError = document.querySelector(".error");
const tablaBody = document.querySelector("tbody");
const promedioTd = document.querySelector("tfoot td:last-child");
const aprobadosSpan = document.querySelector("p strong:nth-of-type(1) + span");
const reprobadosSpan = document.querySelector("p strong:nth-of-type(2) + span");

function validarFormulario(nombre, rut, nota) {
  mensajeError.textContent = "";
  
  if (!nombre || !rut || !nota) {
    mensajeError.textContent = "Todos los campos son obligatorios.";
    return false;
  }
  
  if (nota < 1.0 || nota > 7.0) {
    mensajeError.textContent = "La nota debe estar entre 1.0 y 7.0.";
    return false;
  }
  
  if (estudiantes.some(est => est.rut === rut)) {
    mensajeError.textContent = "El RUT ya está registrado.";
    return false;
  }
  
  return true;
}


function agregarEstudiante(event) {
  event.preventDefault(); 
  
  const nombre = formulario.elements[0].value.trim();
  const rut = formulario.elements[1].value.trim();
  const nota = parseFloat(formulario.elements[2].value);
  
  if (!validarFormulario(nombre, rut, nota)) return;
  
  const nuevoEstudiante = { nombre, rut, nota };
  estudiantes.push(nuevoEstudiante);
  
  mensajeError.textContent = "¡Estudiante agregado con éxito!";
  actualizarTabla();
  formulario.reset();
}


function actualizarTabla() {
  tablaBody.innerHTML = "";
  
  let totalNotas = 0;
  let aprobados = 0;
  let reprobados = 0;
  
  estudiantes.forEach(est => {
    totalNotas += est.nota;
    const fila = document.createElement("tr");
    
    fila.innerHTML = `<td>${est.nombre}</td><td>${est.rut}</td><td>${est.nota.toFixed(1)}</td>`;
    
    if (est.nota < 4) {
      fila.classList.add("bg-rojo");
      reprobados++;
    } else if (est.nota < 6) {
      fila.classList.add("bg-azul");
      aprobados++;
    } else {
      fila.classList.add("bg-verde");
      aprobados++;
    }
    
    tablaBody.appendChild(fila);
  });
  
  const promedio = estudiantes.length ? (totalNotas / estudiantes.length).toFixed(1) : 0;
  promedioTd.textContent = promedio;
  promedioTd.classList.toggle("bg-rojo", promedio < 4);
  promedioTd.classList.toggle("bg-azul", promedio >= 4 && promedio < 6);
  promedioTd.classList.toggle("bg-verde", promedio >= 6);
  

  aprobadosSpan.textContent = aprobados;
  reprobadosSpan.textContent = reprobados;
}

formulario.addEventListener("submit", agregarEstudiante);
