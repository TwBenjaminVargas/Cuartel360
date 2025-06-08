document.addEventListener('DOMContentLoaded', () => {

  cargarInventario();
  cargarSelect('/api/inventario/elementos', 'elementoSelect', 'nombre', 'id_elemento');
  cargarSelect('/api/inventario/estados',   'estadoSelect',   'nombre', 'id_estado');
  
});

const datos_usuario = JSON.parse(localStorage.getItem('datos_usuario'));
const codigoCuartel = datos_usuario.codigo;
// 1) cargar tabla de inventario
  const cargarInventario = () => {
    fetch(`/api/inventarioAdmin?codigoCuartel=${codigoCuartel}`)
      .then(res => res.ok ? res.json() : Promise.reject('Error al obtener inventario'))
      .then(data => {
        const tbody = document.querySelector('#tabla-inventario tbody');
        tbody.innerHTML = '';
        data.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.elemento}</td>
            <td>${item.estado}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(console.error);
  };

  // cargar dropdowns (elementos y estados)
  const cargarSelect = (url, selectId, textProp = 'nombre', valueProp = 'id') => {
    fetch(url)
      .then(res => res.ok ? res.json() : Promise.reject(`Error cargando ${url}`))
      .then(items => {
        const sel = document.getElementById(selectId);
        items.forEach(obj => {
          const opt = document.createElement('option');
          opt.value = obj[valueProp];
          opt.textContent = obj[textProp];
          sel.appendChild(opt);
        });
      })
      .catch(console.error);
  };

//agregar nueva asignacion
document.getElementById("formNuevoElemento").addEventListener("submit", function (e) {
  e.preventDefault();

  const email     = document.getElementById("emailElemento").value;
  const id_elemento = Number(document.getElementById("elementoSelect").value);
  const id_estado   = Number(document.getElementById("estadoSelect").value);

  fetch("/api/inventarioAdmin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, id_elemento, id_estado })
  })
  .then(res => {
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return res.json();
  })
  .then(_ => {
    // Cerrar modal y limpiar
    const modal = bootstrap.Modal.getInstance(document.getElementById("nuevoElementoModal"));
    modal.hide();
    this.reset();
    // Refrescar tabla
    cargarInventario();
  })
  .catch(err => {
    console.error("Error al agregar elemento:", err);
    alert("No se pudo registrar el elemento.");
  });
});

//agregar nuevo elemento
document.getElementById("formNuevoTipoElemento").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre       = document.getElementById("nombreElemento").value;
  const descripcion  = document.getElementById("descripcionElemento").value;

  fetch("/api/inventario/elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nombre, descripcion })
  })
  .then(res => {
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return res.json();
  })
  .then(_ => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("nuevoTipoElementoModal"));
    modal.hide();
    this.reset();

    // Refrescar el dropdown de elementos
    const elementoSelect = document.getElementById("elementoSelect");
    elementoSelect.innerHTML = '<option value="" disabled selected>Seleccione un elemento</option>';
    cargarSelect('/api/inventario/elementos', 'elementoSelect', 'nombre');
  })
  .catch(err => {
    console.error("Error al agregar tipo de elemento:", err);
    alert("No se pudo registrar el nuevo tipo de elemento.");
  });
});
