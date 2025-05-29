const { where } = require("sequelize")
const { Cuartel, InventarioPersonal, Bombero, Elemento, Estado } = require("../models");
const elemento = require("../models/elemento");
const bombero = require("../models/bombero");

module.exports =
{
    /**
     * Obtiene el inventario completo de un cuartel
     * @param {Number} codigoCuartel 
     * @returns inventario del cuartel
     */
    getInventarioCompleto: async (codigoCuartel) =>
    {
        const cuartel = await Cuartel.findOne({where:{codigo:codigoCuartel}});
        if(!cuartel) throw new Error('Cuartel no encotrado');
        const inventarios = await InventarioPersonal.findAll( {where : {id_cuartel:cuartel.id_cuartel}});
        const inventariosDetallados = await Promise.all(inventarios.map(async(inventario) =>
        {
            const bombero = await Bombero.findOne({where : {id_bombero : inventario.id_bombero}});
            const elemento = await Elemento.findOne({where : {id_elemento : inventario.id_elemento}});
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
     * Obtiene el inventario completo de un bombero
     * @param {Number} id_bombero
     * @returns inventario del bombero
     */
    getInventarioPersonal: async (id_bombero) =>
    {
        const bombero = await Bombero.findOne({where:{id_bombero}});
        if(!bombero) throw new Error('Bombero no encontrado');
        const elementos = await InventarioPersonal.findAll( {where : {id_bombero}});
        const inventario = await Promise.all(elementos.map(async(elemento) =>
        {
            const articulo = await Elemento.findOne({where : {id_elemento : elemento.id_elemento}});
            const estado = await Estado.findOne({where : {id_estado : elemento.id_estado}});
            return{
                id_inventario:articulo.id_inventario,
                elemento : articulo.nombre,
                estado : estado.nombre
            }
        }));
        return inventario;
    },
    /**
     * Añade un elemento al inventario de un bombero
     * @param {Number} email_bombero
     * @param {Number} id_estado
     * @param {Number} id_elemento
     * @returns elemento añadido
     */
    añadirItemInventario: async (email_bombero,id_estado,id_elemento) =>
    {
        const bombero = await Bombero.findOne({where:{email:email_bombero}});
        const elemento = await Elemento.findOne({where:{id_elemento}});
        const estado = await Estado.findOne({where:{id_estado}});
        if(!bombero) throw new Error('Bombero no encontrado');
        if(!estado) throw new Error('Estado no encontrado');
        if(!elemento) throw new Error('Elemento no encontrado');
        item = await InventarioPersonal.create(
            {   id_cuartel : bombero.id_cuartel,
                id_bombero : bombero.id_bombero,
                id_estado,
                id_elemento
            })
    },
    /**
     * Devuelve la lista de elemntos existentes
     */
    getListaElementos: async ()=> {return await Elemento.findAll();},
    
    /**
     * Añade un elemento a la lista de elementos posibles
     * @param {String} nombre
     * @param {String} descripcion
     */
    añadirElemento : async(nombre,descripcion) =>{return await Elemento.create({nombre,descripcion})},

    /**
     * Devuelve la lista de estados
     */
    getListaEstados: async ()=> {return await Estado.findAll();},
    
    /**
     * Añade un elemento a la lista de estados posibles
     * @param {String} nombre
     * @param {String} descripcion
     */
    añadirEstados : async(nombre) =>{return await Estado.create({nombre})},

    /**
     * Cambia el estado de un elemento
     * @param id_inventario
     * @param id_nuevo_estado
     */
    cambiarEstadoElemento: async(id_inventario,id_nuevo_estado) =>
    {
        const articulo = await InventarioPersonal.findOne({where : {id_inventario}});
        const estado = await Estado.findOne({where : {id_estado:id_nuevo_estado}});
        if (!articulo || !estado) throw new Error("El inventario o el estado solicitado no existe");
        if (articulo.id_estado != id_nuevo_estado)
        {
            const [update] = await InventarioPersonal.update({ id_estado:id_nuevo_estado },{ where: { id_inventario} });
            if(update === 0) throw new Error(`Error al actualizar el estado del articulo del inventario`);
        }

    }

}