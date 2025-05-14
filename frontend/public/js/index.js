/**
 *  Enviar datos de usuario y password a backend
 */
async function login()
{
    emailInput = document.getElementById("emailInput")
    passwordInput = document.getElementById("passwordInput")
    if(validateInput(emailInput) && validateInput(passwordInput))
    {
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
                manageJSONAnswer(resultado);

          } catch (error) {
            console.error('Error:', error);
          }

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
        console.log("Error: Inputs invalidos")
        return false;
    }
    return true
      
}

/**
 * Acciones que realizan al recibir la respuesta del backend
 * @param answer 
 */
function manageJSONAnswer(resultado)
{
  
  console.log(resultado)
}

document.getElementById('buttonLogin').addEventListener('click', login);