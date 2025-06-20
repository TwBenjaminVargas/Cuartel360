function cargarComponente(idElemento, rutaArchivo) {
    return fetch(rutaArchivo)
        .then(respuesta => respuesta.text())
        .then(html => {
            document.getElementById(idElemento).innerHTML = html;

            if (rutaArchivo.includes("navbar")) {
                const logoutButton = document.getElementById("logoutButton");
                if (logoutButton) {
                    logoutButton.addEventListener("click", cerrarSesion);
                }
            }
        })
        .catch(error => {
            console.error(`Error al cargar ${rutaArchivo}:`, error);
        });
}

async function cerrarSesion() {
  try {
    const res = await fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      window.location.href = '/';
    } else {
      console.error('Error cerrando sesión');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
