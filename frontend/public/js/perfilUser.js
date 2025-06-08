document.addEventListener('DOMContentLoaded', () => {
  // email del usuario desde localStorage 
  const datos_usuario = JSON.parse(localStorage.getItem('datos_usuario'));
  const email = datos_usuario.email;
  if (!email) {
    alert('No se encontró el email del usuario. Por favor inicia sesión.');
    return;
  }

  fetch(`/perfilUser/data?email=${email}`)
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al obtener datos');
      }
      return res.json();
    })
    .then(data => {
        console.log(data);
      mostrarDatosUsuario(data);
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo cargar el perfil: ' + err.message);
    });
});

function mostrarDatosUsuario({ nombre, apellido, email, dni, rango, superior_nombre, superior_apellido, superior_email, superior_rango, cuartel_nombre, cuartel_email, cuartel_telefono }) {
  console.log(nombre);
  // Datos usuario
  document.getElementById('user-nombre').textContent = nombre;
  document.getElementById('user-apellido').textContent = apellido;
  document.getElementById('user-email').textContent = email;
  document.getElementById('user-dni').textContent = dni;
  document.getElementById('user-rango').textContent = rango;

  // Datos superior
  document.getElementById('sup-nombre').textContent = superior_nombre;
  document.getElementById('sup-apellido').textContent = superior_apellido;
  document.getElementById('sup-email').textContent = superior_email;
  document.getElementById('sup-rango').textContent = superior_rango;

  // Datos cuartel
  document.getElementById('cuartel-nombre').textContent = cuartel_nombre;
  document.getElementById('cuartel-email').textContent = cuartel_email;
  document.getElementById('cuartel-telefono').textContent = cuartel_telefono;

  // Mostrar card de usuario
  const card = document.getElementById('user-card');
  if (card) card.classList.remove('d-none');
}
