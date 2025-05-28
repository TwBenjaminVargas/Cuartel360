document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tabla-tareas");

    fetch("http://localhost:3000/api/tareas")
        .then(response => response.json())
        .then(data => {
            data.forEach(tarea => {
                const fila = document.createElement("tr");

                // Crear checkbox
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = tarea.estado === 1;
                checkbox.classList.add("form-check-input");
                checkbox.addEventListener("change", () => {
                    const nuevoEstado = checkbox.checked ? 1 : 0;
                    actualizarEstadoTarea(tarea.id_tarea, nuevoEstado);
                });

                // Crear celdas
                const celdaCheckbox = document.createElement("td");
                celdaCheckbox.appendChild(checkbox);

                const celdaDescripcion = document.createElement("td");
                celdaDescripcion.textContent = tarea.descripcion;

                // Agregar celdas en orden (checkbox primero)
                fila.appendChild(celdaCheckbox);
                fila.appendChild(celdaDescripcion);

                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al obtener tareas:", error);
        });
});

document.getElementById("btn-agregar-tarea").addEventListener("click", () => {
    const input = document.getElementById("descripcion-tarea");
    const descripcion = input.value.trim();
    const alerta = document.getElementById("alerta-vacia");

    if (descripcion === "") {
        alerta.classList.remove("d-none"); 
        return;
    } else {
        alerta.classList.add("d-none"); 
    }

    fetch("http://localhost:3000/api/tareas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ descripcion }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar tarea");
        }
        return response.json();
    })
    .then(data => {
        console.log("Tarea agregada:", data.mensaje);
        input.value = ""; // limpiar el input

        // Agregar la nueva tarea directamente a la tabla sin recargar
        agregarTareaATabla({ descripcion, estado: 0 });
    })
    .catch(error => {
        console.error("Error al agregar tarea:", error);
    });
});

function actualizarEstadoTarea(id, estado) {
    fetch(`http://localhost:3000/api/tareas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al actualizar tarea");
        }
        return response.json();
    })
    .then(data => {
        console.log("Tarea actualizada:", data);
    })
    .catch(error => {
        console.error("Error al actualizar el estado:", error);
    });
}

function agregarTareaATabla(tarea) {
    const tabla = document.getElementById("tabla-tareas");

    const fila = document.createElement("tr");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.estado === 1;
    checkbox.classList.add("form-check-input");
    checkbox.addEventListener("change", () => {
        const nuevoEstado = checkbox.checked ? 1 : 0;
        actualizarEstadoTarea(tarea.id_tarea, nuevoEstado);
    });

    const celdaCheckbox = document.createElement("td");
    celdaCheckbox.appendChild(checkbox);

    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = tarea.descripcion;

    fila.appendChild(celdaCheckbox);
    fila.appendChild(celdaDescripcion);

    tabla.appendChild(fila);
}
