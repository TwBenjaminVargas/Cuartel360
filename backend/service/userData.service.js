const { where } = require('sequelize');
const { Bombero,Cuartel } = require('../models'); // base de datos


module.exports =
{
/**
 * Muestra los datos del usuario
 * @param {String} email
 * @returns datos del usuario, y si es un administrador devolvera
 * ademas los datos de los subordinados.
 */
  showUserData: async (email) => {
    const usuario = await Bombero.findOne({where:{email}});
    if (!usuario) throw new Error("Usuario no encontrado");
    const cuartel = await Cuartel.findOne({where:{id_cuartel:usuario.id_cuartel}});
    if(usuario.id_superior === null) // es administrador
    {
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
    else //es usuario
    {
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

    }
  }
}