const { Bombero } = require('../models'); // base de datos
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt');

module.exports =
{
  /**
   *  Busca el usuario y el password en la base de datos
   * @param {String} email 
   * @param {String} contraseña 
   * @returns {JSON} datos de usuario y token jwt  
   */
  login: async (email, contraseña) => {

    // formato es invalido
     if (!/\S+@\S+\.\S+/.test(email)) throw new Error('El formato del email es inválido');
      //formato contraseña es invalido
     if(contraseña.length <8) throw new Error('Contraseña debe tener mas de 8 caracteres');
    
     // Buscar usuario
    const user = await Bombero.findOne({ where: { email } });

    if (!user) throw new Error('Usuario no encontrado');

    // Validar contraseña

    /* Se evita la encriptacion para versiones de prueba
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) throw new Error('Contraseña incorrecta');
     */
    if (user.contraseña !== contraseña) throw new Error('Contraseña erronea');;


    // Crear payload del token (sin datos sensibles)
    const payload = {
      id: user.id_bombero,
      email: user.email,
      rol: user.id_rol
    };

    //Generar token
    const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    // respuesta
    return {
      user: {
        id: user.id_bombero,
        email: user.email,
        rol: user.id_rol,
        nombre: user.nombre
      },
      token
    };
  },
  /**
   * Valida tokens
   * @param {String} authHeader cabecera de autorizacion
   * @returns token decodificado
   */
  validateToken: (authHeader) => {

    if (!authHeader) {
      throw new Error('No se encontró el token en el header Authorization');
    }

    // authHeader tiene formato "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Formato de token inválido');
    }

    const token = parts[1];

    try {
      // Verifica y decodifica el token con la clave secreta
      const decoded = jwt.verify(token, jwtConfig.secret);
      return decoded;
    } catch (err) {
      throw new Error('Token inválido o expirado');
    }
  }
}