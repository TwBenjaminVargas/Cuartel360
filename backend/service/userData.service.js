const { where } = require('sequelize');
const { Bombero,Cuartel } = require('../models'); // base de datos


module.exports =
{
  /**
   * Obtiene los datos personales de un bombero (usuario regular).
   * 
   * @param {number} id_bombero - ID del bombero a consultar.
   * @returns {Promise<Object>} Datos del usuario, su superior y su cuartel.
   * @throws {Error} Si el usuario no existe o es un administrador.
   */
  showUserData: async (id_bombero) => {
    
    const usuario = await Bombero.findOne({where:{id_bombero}});
    
    if (!usuario) throw new Error("Usuario no encontrado");
    
    const cuartel = await Cuartel.findOne({where:{id_cuartel:usuario.id_cuartel}});
    
    if(usuario.id_superior === null)
      throw new Error("Correo pertenece a un administrador")

      const superior = await Bombero.findOne({where:{id_bombero : usuario.id_superior}});

      return {
          //datos del usuario
          email: usuario.email,
          dni : usuario.dni,
          nombre : usuario.nombre,
          apellido: usuario.apellido,
          rango : usuario. rango,
          //datos del superior
          superior_email:superior.email,
          superior_nombre: superior.nombre,
          superior_apellido: superior.apellido,
          superior_rango: superior.rango,
          //datos del cuartel
          cuartel_nombre:cuartel.nombre,
          cuartel_email:cuartel.email,
          cuartel_telefono:cuartel.telefono
      };
  },

  /**
   * Obtiene los datos de un bombero con rol de administrador (sin superior).
   * 
   * @function showAdminData
   * @param {number} id_bombero - ID del bombero administrador.
   * @returns {Promise<Object>} Datos del administrador, su cuartel y sus subordinados.
   * @throws {Error} Si el usuario no existe o no es administrador.
   */
  showAdminData: async (id_bombero) => {
    
    const usuario = await Bombero.findOne({where:{id_bombero}});
    
    if (!usuario) throw new Error("Usuario no encontrado");
    
    const cuartel = await Cuartel.findOne({where:{id_cuartel:usuario.id_cuartel}});
    
    if(usuario.id_superior !== null) // no es administrador
      throw new Error("El correo provisto no es administrador");

    const subordinados = await Bombero.findAll({where: {id_superior: usuario.id_bombero}});
    
    return {
        //datos del administrador
        email: usuario.email,
        dni : usuario.dni,
        nombre : usuario.nombre,
        apellido: usuario.apellido,
        rango : usuario. rango,
        //datos del cuartel
        cuartel_nombre:cuartel.nombre,
        cuartel_email:cuartel.email,
        cuartel_telefono:cuartel.telefono,
        // subordinados
        subordinados: subordinados.map(sub => ({
            nombre: sub.nombre,
            apellido: sub.apellido,
            email: sub.email,
            rango: sub.rango
        }))
    };
  }

}