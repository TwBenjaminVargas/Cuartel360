document.addEventListener('DOMContentLoaded', () => {
  // consigue el email del administrador
  const datos_usuario = JSON.parse(localStorage.getItem('datos_usuario'));
  const email = datos_usuario.email;
  if (!email) {
    alert('No se encontro el email del administrador. Por favor inicia sesion.');
    return;
  }

  // 2) Hacer fetch a la ruta del backend
  fetch(`/perfilAdmin/data?email=${email}`)
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al obtener datos');
      }
      return res.json();
    })
    .then(data => {
      mostrarDatosAdmin(data);
      mostrarSubordinados(data.subordinados);
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo cargar el perfil: ' + err.message);
    });
});

function mostrarDatosAdmin({ nombre, apellido, email, dni, rango, cuartel_nombre, cuartel_email, cuartel_telefono }) {
  document.getElementById('admin-nombre').textContent = nombre;
  document.getElementById('admin-apellido').textContent = apellido;
  document.getElementById('admin-email').textContent = email;
  document.getElementById('admin-dni').textContent = dni;
  document.getElementById('admin-rango').textContent = rango;
  document.getElementById('cuartel-nombre').textContent = cuartel_nombre;
  document.getElementById('cuartel-email').textContent = cuartel_email;
  document.getElementById('cuartel-telefono').textContent = cuartel_telefono;

  // Mostrar el card que estaba oculto
  document.getElementById('admin-card').classList.remove('d-none');
}

function mostrarSubordinados(subordinados) {
  const cont = document.getElementById('subordinados-list');
  cont.innerHTML = ''; // limpiar
  if (!subordinados || subordinados.length === 0) {
    cont.innerHTML = '<p class="text-muted">No tiene subordinados asignados.</p>';
    return;
  }

  subordinados.forEach(sub => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <h5 class="card-title">${sub.nombre} ${sub.apellido}</h5>
      <p class="card-text"><strong>Email:</strong> ${sub.email}</p>
      <p class="card-text"><strong>Rango:</strong> ${sub.rango}</p>
    `;

    card.appendChild(body);
    col.appendChild(card);
    cont.appendChild(col);
  });
}
