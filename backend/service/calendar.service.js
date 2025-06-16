const { Bombero, Guardia } = require('../models'); // base de datos
const { Op } = require('sequelize');


module.exports =
{
  /**
   *  Muestra la grilla de guardias de un mes
   * @param year solicitado
   * @param month solicitado
   * @return grilla del mes solicitado
   */
  getGrillaGuardia: async (year,month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const guardias = await Guardia.findAll({
      where: {
          start:{[Op.gte]: startDate,[Op.lt]: endDate,}
      }
    });

    const grilla = await Promise.all(guardias.map(async(guardia) => {
        const bombero = await Bombero.findOne({ where: { id_bombero: guardia.id_bombero }});
        return {
            ...guardia.toJSON(),
            title: bombero.nombre }
        }));
    
    return grilla;
   
  },
  
  /**
   * Añade una guardia a la grilla
   * @param {String} email 
   * @param {Date} start fecha de inicio
   * @param {Date} end  fecha de finalizacion
   */
  añadirGuardia: async (email,start,end) =>
    {
        const bombero = await Bombero.findOne({where:{email}});
        if(!bombero) throw new Error('Email invalido');
        const guardia = await Guardia.create({start,end,id_bombero : bombero.id_bombero})
        if(!guardia) throw new Error('Error al registrar guardia');
    }
}