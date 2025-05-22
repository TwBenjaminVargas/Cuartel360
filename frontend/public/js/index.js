/**
 *  Enviar datos de usuario y password a backend
 */
async function login()
{
    emailInput = document.getElementById("emailInput")
    passwordInput = document.getElementById("passwordInput")
    const mensajeError = document.getElementById("mensajeError");

    const emailValid = validateInput(emailInput);
    const passwordValid = validateInput(passwordInput);

    if (!emailValid || !passwordValid) {
        mensajeError.style.display = "block";
        mensajeError.textContent = "Por favor, completa todos los campos.";
        return;
    } else {
        mensajeError.style.display = "none";
        mensajeError.textContent = "";
    }

    const datos = {
      email: emailInput.value,
      password: passwordInput.value
    };
        
    try {
      const respuesta = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if(respuesta.ok){
        console.log(resultado);
        localStorage.setItem('token', resultado.token);

        const tokenPartes = resultado.token.split('.');
        const payloadBase64 = tokenPartes[1];
        const payloadJSON = JSON.parse(atob(payloadBase64));

        const rol = payloadJSON.rol;

        // Redirigir segun el rol
        if (rol === 1) {
          window.location.href = 'http://localhost:3000/homeAdmin';
        } else if (rol === 2) {
          window.location.href = 'http://localhost:3000/homeUser';
        } else {
          mensajeError.style.display = "block";
          mensajeError.textContent = "Rol de usuario no válido.";
        }
      }else{
        console.error('Error:', resultado.error);
      }

    } catch (error) {
      mensajeError.style.display = "block";
      mensajeError.textContent = "Error de conexión con el servidor.";
      console.error('Error:', error);
    }

}

/**
 * Realiza una validacion incial de los datos ingresados
 * @returns true si es un dato valido, false de lo contrario
 */
function validateInput(input)
{
    if (input.value.trim() === "")
    {
        input.classList.add("input-invalido");
        console.log("Error: Inputs invalidos")
        return false;
    } else {
        input.classList.remove("input-invalido");
        return true;
    }
      
}

document.getElementById('buttonLogin').addEventListener('click', login);
