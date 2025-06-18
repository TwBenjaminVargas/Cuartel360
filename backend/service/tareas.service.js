const { where } = require('sequelize');
const { Tarea, Bombero } = require('../models'); // base de datos
const bombero = require('../models/bombero');


/**
 * Busca un bombero por su ID.
 * @param {number} id_bombero - ID del bombero a buscar.
 * @returns {Promise<Bombero>} El bombero encontrado.
 * @throws {Error} Si no se encuentra el bombero.
 */
async function buscarBomberoPorId(id_bombero) {
    const bombero = await Bombero.findOne({ where: { id_bombero } });
    if (!bombero) throw new Error('Bombero no encontrado');
    return bombero;
}

/**
 * Busca un bombero por su email.
 * @param {string} email - Email del bombero a buscar.
 * @returns {Promise<Bombero>} El bombero encontrado.
 * @throws {Error} Si no se encuentra el bombero.
 */
async function buscarBomberoPorEmail(email) {
    const bombero = await Bombero.findOne({ where: { email } });
    if (!bombero) throw new Error('Bombero no encontrado');
    return bombero;
}

module.exports =
{
    /**
     * Obtiene todas las tareas asignadas a un bombero.
     * @param {number} id_bombero - ID del bombero.
     * @returns {Promise<Array>} Lista de tareas con atributos seleccionados.
     * @throws {Error} Si el bombero no existe o no se pueden obtener las tareas.
     */
    getListaTareasUsuario : async (id_bombero) => 
    {
        await buscarBomberoPorId(id_bombero);
        
        const tareas = await Tarea.findAll({where:{id_bombero},
            attributes: ['id_tarea','prioridad', 'descripcion', 'estado'],
            paranoid: true});
        if(!tareas) throw new Error("Error al conseguir tareas");
        return tareas;
    },

    
    /**
     * Obtiene todas las tareas del cuartel al que pertenece el administrador (bombero).
     * Incluye el nombre y apellido del bombero asignado a cada tarea.
     * @param {number} id_bombero - ID del administrador.
     * @returns {Promise<Array>} Lista de tareas con detalles y datos del bombero.
     * @throws {Error} Si el bombero administrador no existe o no se pueden obtener las tareas.
     */

    getListaTareasAdministrador : async (id_bombero) => 
    {
        const bombero = await buscarBomberoPorId(id_bombero);

        const tareas = await Tarea.findAll({where:{id_cuartel:bombero.id_cuartel},
            attributes: ['id_tarea','prioridad', 'descripcion', 'estado'],
            paranoid: true,
            include: [{model: Bombero,attributes: ['nombre', 'apellido']}]});

        if(!tareas) throw new Error("Error al conseguir tareas");
        return tareas;
    },

    /**
     * Actualiza el estado de una tarea específica.
     * @param {number} id_tarea - ID de la tarea a actualizar.
     * @param {number} estado - Nuevo estado de la tarea.
     * @throws {Error} Si no se pudo actualizar la tarea.
     */
    actualizarEstadoTarea : async (id_tarea,estado) =>
    {
        const [update] = await Tarea.update({ estado },{ where: { id_tarea} });
        if(update === 0) throw new Error(`Error al actualizar estado de tarea ${id_tarea}`);
    },

    /**
     * Crea una nueva tarea asignada a un bombero, vinculada al cuartel del administrador que la registra.
     * @param {string} descripcion - Descripción de la tarea.
     * @param {number} prioridad - Prioridad de la tarea.
     * @param {string} email - Email del bombero al que se asigna la tarea.
     * @param {number} id_usuario - ID del administrador que registra la tarea.
     * @returns {Promise<Object>} Datos de la tarea creada y del bombero asignado.
     * @throws {Error} Si el bombero o administrador no existen o si falla la creación.
     */
    registrarTarea : async (descripcion,prioridad,email,id_usuario) =>
    {
        const admin = await buscarBomberoPorId(id_usuario);
        const bombero = await buscarBomberoPorEmail(email);

        const tarea = await Tarea.create({
            descripcion,
            estado:0,
            id_bombero: bombero.id_bombero,
            id_cuartel:admin.id_cuartel,prioridad});

        if(!tarea) throw new Error("Error al crear tarea");
        
        return {
        id: tarea.id_tarea,
        nombre: bombero.nombre,
        apellido: bombero.apellido,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad
        };
    },

    /**
     * Elimina una tarea por su ID.
     * @param {number} id_tarea - ID de la tarea a eliminar.
     * @returns {Promise<number>} Cantidad de filas eliminadas (0 si no se encontró la tarea).
     * @throws {Error} Si ocurre un problema con la base de datos.
     */
    borrarTarea : async(id_tarea)=>
    {return await Tarea.destroy({ where: { id_tarea} });}
    
}