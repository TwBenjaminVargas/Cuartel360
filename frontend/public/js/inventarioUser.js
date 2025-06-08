document.addEventListener('DOMContentLoaded', () => {
  const datos_usuario = JSON.parse(localStorage.getItem('datos_usuario'));
  const email = datos_usuario.email;

  // trae inventario y estados
  Promise.all([
    fetch(`/api/inventarioUsuario?email=${email}`).then(res => {
      if (!res.ok) throw new Error('Error al obtener el inventario');
      return res.json();
    }),
    fetch(`/api/inventario/estados?email=${email}`).then(res => {
      if (!res.ok) throw new Error('Error al obtener los estados');
      return res.json();
    })
  ])
  .then(([inventarioData, estados]) => {
    if (inventarioData.mensaje) {
      console.warn('Mensaje del servidor:', inventarioData.mensaje);
      return;
    }

    const tbody = document.querySelector('#tabla-inventario tbody');
    tbody.innerHTML = '';

    inventarioData.forEach(item => {
      const tr = document.createElement('tr');

      // nombre del elemento
      const tdElemento = document.createElement('td');
      tdElemento.textContent = item.elemento;
      tr.appendChild(tdElemento);

      // estado (select dinamico)
      const tdEstado = document.createElement('td');
      const select = document.createElement('select');
      select.classList.add('form-select');

      estados.forEach(est => {
        const option = document.createElement('option');
        option.value = est.id_estado;       
        option.textContent = est.nombre;
        if (est.nombre === item.estado) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      //PUT al backend
      select.addEventListener('change', () => {
        const nuevoEstadoId = Number(select.value);
        fetch(`/api/inventario/estado/${item.id_inventario}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_estado: nuevoEstadoId })
        })
        .then(res => {
          if (!res.ok) throw new Error('Error al actualizar estado');
          return res.json();
        })
        .then(resp => {
          console.log('Estado actualizado:', resp.mensaje);
        })
        .catch(err => {
          console.error('Error en PUT estado:', err);
        });
      });

      tdEstado.appendChild(select);
      tr.appendChild(tdEstado);

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Error al inicializar inventario o estados:', error);
  });
});
