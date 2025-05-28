const { Tarea } = require('../models'); // base de datos

module.exports =
{
    /**
     *  Devuelve el listado completo de tareas
     */
    getListaTareas : async () => 
    {
        const tareas = await Tarea.findAll();
        if(!tareas) throw new Error("Error al conseguir tareas");
        return tareas;
    },
     /**
     *  Actualiza el listado de tareas
     * @param {Number} id_tarea
     * @param {Number} estado de la tarea
     */
    actualizarEstadoTarea : async (id_tarea,estado) =>
    {
        const [update] = await Tarea.update({ estado },{ where: { id_tarea} });
        if(update === 0) throw new Error(`Error al actualizar estado de tarea ${id_tarea}`);
    },
    registrarTarea : async (descripcion) =>
    {
        const tarea = await Tarea.create({descripcion,estado:0});
        if(!tarea) throw new Error("Error al crear tarea");
    },
    
    
}