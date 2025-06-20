const { Bombero, Guardia } = require('../models'); // base de datos
const { Op } = require('sequelize');

module.exports =
{
  /**
  * Muestra la grilla de guardias del mes solicitado.
  *
  * @param {number} year - Año solicitado.
  * @param {number} month - Mes solicitado (1-12).
  * @returns {Promise<Object[]>} Lista de guardias con información del bombero.
  * @throws {Error} Si ocurre un error al obtener la grilla.
  */
  getGrillaGuardia: async (year,month) => {
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const guardias = await Guardia.findAll(
    { where: {start:{[Op.gte]: startDate,[Op.lt]: endDate,}}});

    const grilla = await Promise.all(guardias.map(async(guardia) =>
    {
        const bombero = await Bombero.findOne({ where: { id_bombero: guardia.id_bombero }});
        
        return {
            ...guardia.toJSON(),
            title: bombero.nombre }
    }));
    
    return grilla;
   
  },
  
  /**
  * Añade una nueva guardia a la grilla.
  *
  * @param {string} email - Email del bombero.
  * @param {Date} start - Fecha de inicio de la guardia.
  * @param {Date} end - Fecha de fin de la guardia.
  * @throws {Error} Si el bombero no existe o la guardia no puede registrarse.
  */
  añadirGuardia: async (email,start,end) =>
  {
    const bombero = await Bombero.findOne({where:{email}});
    
    if(!bombero) throw new Error('Email invalido');
    
    const guardia = await Guardia.create({start,end,id_bombero : bombero.id_bombero})
    
    if(!guardia) throw new Error('Error al registrar guardia');
  }
}