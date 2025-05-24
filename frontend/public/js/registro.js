/**
 *  Enviar datos de registrar nuevo usuario a backend
 */
async function registro()
{
    emailInput = document.getElementById("emailInput")
    nameInput = document.getElementById("nameInput")
    lastnameInput = document.getElementById("lastnameInput")
    dniInput = document.getElementById("dniInput")
    cuartelInput = document.getElementById("cuartelInput")
    passwordInput = document.getElementById("passwordInput")
    passwordControlInput = document.getElementById("passwordControlInput")

    const mensajeError = document.getElementById("mensajeError");
    const mensajePassword = document.getElementById("mensajePassword");

    //valida campos vacios
    const valid1 = validateInput(emailInput);
    const valid2 = validateInput(nameInput);
    const valid3 = validateInput(cuartelInput);
    const valid4 = validateInput(passwordInput);
    const valid5 = validateInput(passwordControlInput);
    const valid6 = validateInput(lastnameInput);
    const valid7 = validateInput(dniInput);

    const camposValidos = valid1 && valid2 && valid3 && valid4 && valid5 && valid6 && valid7;

    if (!camposValidos) {
        mensajeError.textContent = "Por favor, completá todos los campos.";
        mensajeError.style.display = "block";
        mensajePassword.style.display = "none";
        return;
    }
    mensajeError.style.display = "none";

    // verifica si las contraseñas coinciden
    if (passwordInput.value !== passwordControlInput.value) {
        mensajePassword.textContent = "Las contraseñas no coinciden.";
        mensajePassword.style.display = "block";
        return;
    }
    mensajePassword.style.display = "none";

    const datos = {
        email: emailInput.value,
        nombre: nameInput.value,
        apellido: lastnameInput.value,
        dni: parseInt(dniInput.value),
        contraseña: passwordInput.value,   
        codigo: parseInt(cuartelInput.value)    
    };
        
    try {
        const respuesta = await fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        manageJSONAnswer(resultado);

    } catch (error) {
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
    }else{
        input.classList.remove("input-invalido");
        return true
    }
}

/**
 * Acciones que realizan al recibir la respuesta del backend
 * @param answer 
 */
function manageJSONAnswer(resultado)
{
  
  console.log(resultado)
}

document.getElementById('buttonRegistro').addEventListener('click', registro);
