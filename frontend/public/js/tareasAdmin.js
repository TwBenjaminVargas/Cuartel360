document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("tabla-tareas");

  // Inicializar modal
  const modalNuevaTareaEl = document.getElementById("modalNuevaTarea");
  const modalNuevaTarea = new bootstrap.Modal(modalNuevaTareaEl);

  fetch("http://localhost:3000/api/tareasAdmin")
    .then((response) => response.json())
    .then((data) => {
        
      data.forEach((tarea) => {
        agregarTareaATabla(tarea);
      });
    })
    .catch((error) => {
      console.error("Error al obtener tareas:", error);
    });

  // Evento para abrir el modal
  document.getElementById("btn-abrir-modal").addEventListener("click", () => {
    const form = document.getElementById("formNuevaTarea");
    form.reset();
    // limpiar validaciones
    form
      .querySelectorAll(".is-invalid")
      .forEach((i) => i.classList.remove("is-invalid"));
    modalNuevaTarea.show();
  });

  // Autocomplete
  const inputProp = document.getElementById("propietarioInput");
  const inputEmail = document.getElementById("propietarioEmail");
  const sugerencias = document.getElementById("listaSugerencias");
  let debounceTimer;

  function clearSugerencias() {
    sugerencias.innerHTML = "";
    sugerencias.style.display = "none";
  }

  inputProp.addEventListener("input", (e) => {
    const term = e.target.value.trim();
    if (term.length < 2) {
      clearSugerencias();
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetch(`/api/search?term=${encodeURIComponent(term)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data) => {
          sugerencias.innerHTML = "";
          if (data.length === 0) return clearSugerencias();
          data.forEach((bombero) => {
            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.textContent = `${bombero.nombre} ${bombero.apellido} — ${bombero.email}`;
            li.addEventListener("click", () => {
              inputProp.value = `${bombero.nombre} ${bombero.apellido}`;
              inputEmail.value = bombero.email;
              clearSugerencias();
            });
            sugerencias.appendChild(li);
          });
          sugerencias.style.display = "block";
        })
        .catch((err) => {
          console.error("Error autocomplete bombero:", err);
          clearSugerencias();
        });
    }, 300);
  });

  document.addEventListener("click", (e) => {
    if (!sugerencias.contains(e.target) && e.target !== inputProp) {
      clearSugerencias();
    }
  });

  // çManejar envio del formulario
  const form = document.getElementById("formNuevaTarea");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validacion de campos
    const descIn = document.getElementById("inputDescripcion");
    const priIn = document.getElementById("selectPrioridad");
    const propIn = document.getElementById("propietarioInput");
    const email = document.getElementById("propietarioEmail").value;

    let valido = true;
    [descIn, priIn, propIn].forEach((el) => {
      if (!el.value.trim()) {
        el.classList.add("is-invalid");
        valido = false;
      } else {
        el.classList.remove("is-invalid");
      }
    });
    if (!valido) return;

    const nueva = {
      descripcion: descIn.value.trim(),
      prioridad: priIn.value,
      email: email,
    };

    fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Error al guardar");
        return resp.json();
      })
      .then((data) => {
        modalNuevaTarea.hide();

        const tareaLocal = {
            id_tarea: Date.now(),      
            descripcion: descIn.value.trim(),
            prioridad: priIn.value,
            asignadoNombre: propIn.value, 
            asignadoEmail: email,
            estado: 0
        };
        agregarTareaATabla(tareaLocal);
      })
      .catch((err) => console.error(err));
  });
});

// Funcion agregarTareaATabla extendida
function agregarTareaATabla(tarea) {

  const tabla = document.getElementById("tabla-tareas");
  const fila = document.createElement("tr");

  // Checkbox de estado
  const tdChk = document.createElement("td");
  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.checked = tarea.estado === 1;
  chk.classList.add("form-check-input");
  chk.addEventListener("change", () =>
    actualizarEstadoTarea(tarea.id_tarea, chk.checked ? 1 : 0)
  );
  tdChk.appendChild(chk);
  fila.appendChild(tdChk);

  // Descripcion
  const tdDesc = document.createElement("td");
  tdDesc.textContent = tarea.descripcion;
  fila.appendChild(tdDesc);

  // Prioridad con badge
  const tdPri = document.createElement("td");
  const badge = document.createElement("span");
  badge.textContent =
    tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1);
  badge.classList.add("badge");
  if (tarea.prioridad === "alta") badge.classList.add("bg-danger");
  if (tarea.prioridad === "media") badge.classList.add("bg-warning");
  if (tarea.prioridad === "baja") badge.classList.add("bg-success");
  tdPri.appendChild(badge);
  fila.appendChild(tdPri);

  // Asignado a
  const tdAsig = document.createElement("td");
  if (tarea.Bombero && tarea.Bombero.nombre) {
    tdAsig.textContent = `${tarea.Bombero.nombre} ${tarea.Bombero.apellido}`;

   } else {
    tdAsig.textContent = tarea.asignadoNombre || tarea.asignadoEmail || '—';
    }

  fila.appendChild(tdAsig);

  tabla.appendChild(fila);
}

function actualizarEstadoTarea(id, estado) {
  fetch(`http://localhost:3000/api/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al actualizar tarea");
      }
      return response.json();
    })
    .then((data) => console.log("Tarea actualizada:", data))
    .catch((error) => console.error("Error al actualizar el estado:", error));
}
