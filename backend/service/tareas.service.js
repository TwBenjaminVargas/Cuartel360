const { where } = require('sequelize');
const { Tarea, Bombero } = require('../models'); // base de datos
const bombero = require('../models/bombero');

module.exports =
{
    /**
     *  Devuelve el listado completo de tareas
     *  de Usuario
     */
    getListaTareasUsuario : async (id_bombero) => 
    {
        const bombero = await Bombero.findOne({where :{id_bombero}});
        if (!bombero)throw new Error("Bombero no encontrado");
        const tareas = await Tarea.findAll({where:{id_bombero},attributes: ['prioridad', 'descripcion', 'estado']});
        if(!tareas) throw new Error("Error al conseguir tareas");
        return tareas;
    },
    /**
     *  Devuelve el listado completo de tareas
     *  de Administrador
     */
    getListaTareasAdministrador : async (id_bombero) => 
    {
        const bombero = await Bombero.findOne({where :{id_bombero}});
        if (!bombero)throw new Error("Bombero no encontrado");
        const tareas = await Tarea.findAll({where:{id_cuartel:bombero.id_cuartel},
            attributes: ['prioridad', 'descripcion', 'estado'],
            include: [
            {
            model: Bombero,
            attributes: ['nombre', 'apellido']
            }
    ]
        });
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
    registrarTarea : async (descripcion,prioridad,email,id_usuario) =>
    {
        const admin = await Bombero.findOne({where:{id_bombero:id_usuario}});
        if(!admin)throw new Error("Admin no encontrado");
        const bombero = await Bombero.findOne({where:{email}});
        if(!bombero)throw new Error("Bombero no encontrado");
        const tarea = await Tarea.create({descripcion,estado:0,id_bombero: bombero.id_bombero,
            id_cuartel:admin.id_cuartel,prioridad});
        if(!tarea) throw new Error("Error al crear tarea");
    },
    
    
}