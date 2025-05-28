document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/inventario')
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener el inventario');
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('#tabla-inventario tbody');
      tbody.innerHTML = ''; 

      data.forEach(item => {
        const tr = document.createElement('tr');

        const tdPropietario = document.createElement('td');
        tdPropietario.textContent = item.propietario;

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
      console.error(error);
      alert('No se pudo cargar el inventario');
    });
});
