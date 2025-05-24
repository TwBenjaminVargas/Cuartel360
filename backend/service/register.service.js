const { where } = require('sequelize');
const { Bombero,Cuartel } = require('../models'); // base de datos
const encryptService = require('./encrypt.service');

module.exports =
{
  /**
   *  Registra el usuario y el password en la base de datos
   * @param {String} email 
   * @param {String} contraseña  de mas de 8 caracteres
   */
  registerUser: async (email, nombre, apellido,dni,contraseña,codigo) => {
    // formato es invalido
     if (!/\S+@\S+\.\S+/.test(email)) throw new Error('El formato del email es inválido');
     //formato contraseña es invalido
     if(contraseña.length <8) throw new Error('Contraseña debe tener mas de 8 caracteres');

     const cuartel = await Cuartel.findOne({where : {codigo}});
     if(!cuartel) throw new Error('Condigo de cuartel invalido');

     const newuser = await Bombero.create({
        email, contraseña: encryptService.encriptar(contraseña),id_cuartel: cuartel.id_cuartel,id_rol : 2, nombre,apellido});
    if (!newuser) throw new Error('Fallo al crear usuario');
  }
}