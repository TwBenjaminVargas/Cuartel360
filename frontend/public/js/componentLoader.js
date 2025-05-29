function cargarComponente(idElemento, rutaArchivo) {
    return fetch(rutaArchivo)
        .then(respuesta => respuesta.text())
        .then(html => {
            document.getElementById(idElemento).innerHTML = html;

            if (rutaArchivo.includes("navbar")) {
                const logoutButton = document.getElementById("logoutButton");
                if (logoutButton) {
                    logoutButton.addEventListener("click", () => {
                        // Acá simplemente redirigís al login
                        window.location.href = "http://localhost:3000/";
                    });
                }
            }
        })
        .catch(error => {
            console.error(`Error al cargar ${rutaArchivo}:`, error);
        });
}
