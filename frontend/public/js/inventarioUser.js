document.addEventListener('DOMContentLoaded', () => {
  const codigoCuartel = 6113;

  fetch(`/api/inventarioAdmin?codigoCuartel=${codigoCuartel}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener el inventario');
      return response.json();
    })
    .then(data => {
      if (data.mensaje) {
        console.warn('Mensaje del servidor:', data.mensaje); 
        return;
      }

      const tbody = document.querySelector('#tabla-inventario tbody');
      tbody.innerHTML = ''; 

      data.forEach(item => {
        const tr = document.createElement('tr');

        const tdPropietario = document.createElement('td');
        tdPropietario.textContent = item.nombre;

        const tdElemento = document.createElement('td');
        tdElemento.textContent = item.elemento;

        const tdEstado = document.createElement('td');
        tdEstado.textContent = item.estado;

        tr.appendChild(tdPropietario);
        tr.appendChild(tdElemento);
        tr.appendChild(tdEstado);

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error al obtener inventario:', error);
    });
});