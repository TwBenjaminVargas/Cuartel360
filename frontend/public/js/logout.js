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

// Por ejemplo, lo llamás con un botón:
document.getElementById('logoutButton').addEventListener('click', cerrarSesion);