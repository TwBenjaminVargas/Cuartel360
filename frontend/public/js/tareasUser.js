document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tabla-tareas");

    fetch("http://localhost:3000/api/tareasUser")
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
