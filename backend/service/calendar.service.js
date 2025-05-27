const { Bombero, Guardia } = require('../models'); // base de datos

module.exports =
{
  /**
   *  Muestra la grilla completa de guardias
   */
  getGrillaGuardia: async () => {
    const guardias = await Guardia.findAll();
    const grilla = await Promise.all(guardias.map(async(guardia) => {
        const bombero = await Bombero.findOne({ where: { id_bombero: guardia.id_bombero }});
        return {
            ...guardia.toJSON(), // convierte el modelo Sequelize a un objeto plano
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