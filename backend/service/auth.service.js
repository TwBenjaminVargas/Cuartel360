const { Bombero } = require('../models'); // base de datos
const encryptService = require('./encrypt.service')
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
  login: async (email, contraseñaIn) => {

    // formato es invalido
     if (!/\S+@\S+\.\S+/.test(email)) throw new Error('El formato del email es inválido');
      //formato contraseña es invalido
     if(contraseñaIn.length <8) throw new Error('Contraseña debe tener al menos 8 caracteres');
    
     // Buscar usuario
    const user = await Bombero.findOne({ where: { email } });

    if (!user) throw new Error('Usuario no encontrado');

    // Validar contraseña
    if (!await encryptService.controlContraseña(contraseñaIn,user.contraseña)) throw new Error('Contraseña incorrecta');
  


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
   * @param {String} token
   * @returns token decodificado
   */
  validateToken: (token) => {

    if (!token) {
      throw new Error('No se encontró el token');
    }
    try {
      // Verifica y decodifica el token con la clave secreta
      const decoded = jwt.verify(token, jwtConfig.secret);
      return decoded;
    } catch (err) {
      throw new Error('Token inválido o expirado');
    }
  }
}