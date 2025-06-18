const { where } = require("sequelize")
const { Cuartel, InventarioPersonal, Bombero, Elemento, Estado } = require("../models");
const elemento = require("../models/elemento");
const bombero = require("../models/bombero");

module.exports =
{
     /**
     * Obtiene el inventario completo de un cuartel con detalles de bombero, elemento y estado.
     * @param {number} codigo - Código del cuartel.
     * @returns {Promise<Array<Object>>} Inventario detallado del cuartel.
     * @throws {Error} Si el cuartel no se encuentra.
     */
    getInventarioCompleto: async (codigo) =>
    {
        const cuartel = await Cuartel.findOne({where:{codigo}});
        if(!cuartel) throw new Error('Cuartel no encotrado');

        const inventarios = await InventarioPersonal.findAll( {where : {id_cuartel:cuartel.id_cuartel}, paranoid: true});
        
        const inventariosDetallados = await Promise.all(inventarios.map(async(inventario) =>
        {
            const bombero = await Bombero.findOne({where : {id_bombero : inventario.id_bombero}});
            const elemento = await Elemento.findOne({where : {id_elemento : inventario.id_elemento}, paranoid: true});
            const estado = await Estado.findOne({where : {id_estado : inventario.id_estado}});
            return{
                id_inventario:inventario.id_inventario,
                nombre: bombero.nombre,
                elemento : elemento.nombre,
                estado : estado.nombre
            }
        }));

        return inventariosDetallados;
    },

    /**
     * Obtiene el inventario asignado a un bombero a partir de su ID.
     * Incluye el nombre del elemento y su estado actual.
     * @param {number} id_bombero - ID del bombero del cual se quiere consultar el inventario.
     * @returns {Promise<Array<Object>>} Lista de objetos con `id_inventario`, `elemento` y `estado`.
     * @throws {Error} Si el bombero no existe.
     */
    getInventarioPersonal: async (id_bombero) =>
    {
        const bombero = await Bombero.findOne({where:{id_bombero}});
        if(!bombero) throw new Error('Bombero no encontrado');

        const elementos = await InventarioPersonal.findAll( {where : {id_bombero:bombero.id_bombero}});
        
        const inventario = await Promise.all(elementos.map(async(elemento) =>
        {
            const articulo = await Elemento.findOne({where : {id_elemento : elemento.id_elemento}});
            const estado = await Estado.findOne({where : {id_estado : elemento.id_estado}});
            return{
                id_inventario: elemento.id_inventario,
                elemento : articulo.nombre,
                estado : estado.nombre
            }
        }));
        
        return inventario;
    },
    
    /**
     * Añade un nuevo elemento al inventario de un bombero utilizando su email.
     * El elemento queda registrado con un estado inicial y asociado al cuartel del bombero.
     * @param {string} email_bombero - Email del bombero al que se asignará el nuevo elemento.
     * @param {number} id_estado - ID del estado inicial del elemento.
     * @param {number} id_elemento - ID del tipo de elemento a asignar.
     * @returns {Promise<Object>} El objeto creado en la tabla InventarioPersonal.
     * @throws {Error} Si el bombero, estado o elemento no existen, o si la creación falla.
     */
    añadirItemInventario: async (email_bombero,id_estado,id_elemento) =>
    {
        const bombero = await Bombero.findOne({where:{email:email_bombero}});
        const elemento = await Elemento.findOne({where:{id_elemento}});
        const estado = await Estado.findOne({where:{id_estado}});
        
        if(!bombero) throw new Error('Bombero no encontrado');
        if(!estado) throw new Error('Estado no encontrado');
        if(!elemento) throw new Error('Elemento no encontrado');
        
        newItem = await InventarioPersonal.create(
            {   id_cuartel : bombero.id_cuartel,
                id_bombero : bombero.id_bombero,
                id_estado,
                id_elemento
            });
            
        if(!newItem)
            throw new Error('No se pudo registrar inventario');

        return newItem;
    },


    /**
     * Devuelve la lista completa de elementos disponibles en el sistema.
     * @returns {Promise<Array<Object>>} Lista de elementos.
     */
    getListaElementos: async ()=> { return await Elemento.findAll(); },
    
     /**
     * Añade un nuevo tipo de elemento al catálogo general del sistema.
     * @param {string} nombre - Nombre del nuevo elemento.
     * @param {string} descripcion - Descripción del elemento.
     * @returns {Promise<Object>} El objeto `Elemento` creado.
     * @throws {Error} Si ocurre un error al crear el elemento.
     */
    añadirElemento : async(nombre,descripcion) =>
    {
        const elemento = await Elemento.create({nombre,descripcion});
        
        if(!elemento)
            throw new Error("Error al crear el elemento");
        return elemento;
    },

    /**
     * Devuelve la lista completa de estados disponibles.
     * @returns {Promise<Array<Object>>} Lista de estados.
     */
    getListaEstados: async ()=> {return await Estado.findAll();},
    
   /**
     * Agrega un nuevo estado al catálogo.
     * @param {string} nombre - Nombre del estado.
     * @returns {Promise<Object>} Estado creado.
     */
    añadirEstados : async(nombre) =>
    { 
        const estado = await Estado.create({nombre});
        
        if(!estado)
                throw new Error("Error al crear el estado");
        
        return estado;
    },

    /**
     * Cambia el estado de un elemento en el inventario.
     * 
     * Solo actualiza si el estado actual es diferente al nuevo estado solicitado.
     *
     * @param {number} id_inventario - ID del registro en el inventario personal.
     * @param {number} id_nuevo_estado - ID del nuevo estado a asignar.
     * @throws {Error} Si el inventario o el estado no existen, o si la actualización falla.
     * @returns {Promise<void>} No retorna datos si la operación fue exitosa.
     */
    cambiarEstadoElemento: async(id_inventario,id_nuevo_estado) =>
    {
        const articulo = await InventarioPersonal.findOne({where : {id_inventario}});
        const estado = await Estado.findOne({where : {id_estado:id_nuevo_estado}});
        
        if (!articulo || !estado) throw new Error("El inventario o el estado solicitado no existe");
        
        if (articulo.id_estado != id_nuevo_estado)
        {
            const [update] = await InventarioPersonal.update({ id_estado:id_nuevo_estado },{ where: { id_inventario} });
            if(update === 0) throw new Error(`Error al actualizar el estado`);
        }

    },

    /**
     * Elimina una inventario por su ID.
     * @param {number} id_inventario - ID del inventario a eliminar.
     * @returns {Promise<number>} Cantidad de filas eliminadas (0 si no se encontró el inventario).
     * @throws {Error} Si ocurre un problema con la base de datos.
     */
    borrarInventario : async(id_inventario)=>
    {return await InventarioPersonal.destroy({ where: { id_inventario} });}

}