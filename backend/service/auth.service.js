const {Bombero} = require('../models'); // base de datos
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

        // Buscar usuario
        const user = await Bombero.findOne({ where: { email } });

        if (!user) throw new Error('Usuario no encontrado');

        // Validar contraseña
        
        /* Se evita la encriptacion para versiones de prueba
        const validPassword = await bcrypt.compare(contraseña, user.contraseña);
        if (!validPassword) throw new Error('Contraseña incorrecta');
         */
        if(user.contraseña !== contraseña) throw new Error('Contraseña erronea');;
        

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
}