const express = require('express');
const path = require('path');
const inventarioService = require('../../service/inventario.service');
const { error } = require('console');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();

/**
 * Endpoint vista de administrador, espera el codigo del cuartel
 */
router.get('/api/inventarioAdmin',authMiddleware(1),async (req, res) =>
{
    const codigoCuartel = Number(req.query.codigoCuartel);
    if (isNaN(codigoCuartel)) return res.status(400).json({ error: 'Dato invalido' });
    try
    {
        const inventario = await inventarioService.getInventarioCompleto(codigoCuartel);
        if(inventario.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
        return res.json(inventario);
    }
    catch(error)
    {
        return res.status(401).json({ error: error.message });
    }

});

/**
 * Endpoint vista usuario espera el email del bombero
 */
router.get('/api/inventarioUsuario',authMiddleware(2), async (req, res) =>
{
    const email = req.query.email;
    if (typeof email !== "string") return res.status(400).json({ error: 'Dato invalido' });
    try
    {
        const inventario = await inventarioService.getInventarioPersonal(email);
        if(inventario.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
        return res.json(inventario);
    }
    catch(error)
    {
        return res.status(401).json({ error: error.message });
    }

});

/**
 * Endpoint que retorna los elementos posibles
 */
router.get('/api/inventario/elementos',authMiddleware(1), async (req, res) => 
{
    const elementos = await inventarioService.getListaElementos();
    if(elementos.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
    return res.json(elementos);
});

/**
 * Endpoint que agrega inventarios
 * Espera el email del bombero, el id del estado y del elemento
 */
router.post('/api/inventarioAdmin',authMiddleware(1), async (req, res) => 
{
    const { email, id_estado, id_elemento } = req.body;
    if (!email?.trim() || id_estado === undefined || id_elemento === undefined)
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    const id_estado_num = Number(id_estado);
    const id_elemento_num = Number(id_elemento);
    if (isNaN(id_elemento) || isNaN(id_estado))
        return res.status(400).json({ error: 'Datos invalido' });
    try
    {
        newItem =await inventarioService.añadirItemInventario(email,id_estado_num,id_elemento_num);
        if(!newItem)
            return res.status(500).json({ mensaje: 'No se pudo registrar inventario' });
        
        return res.status(201).json({ message: 'Inventario registrado'})
    }
    catch (error)
    {
        return res.status(401).json({ error: error.message });
    }


});


/**
 * Endpoint que agrega elementos posibles
 * Espera un nombre y una descripcion
 */
router.post('/api/inventario/elementos',authMiddleware(1), async (req, res) => 
{
    const {nombre, descripcion} = req.body;
    if (typeof descripcion !== 'string' ||
        typeof nombre !== 'string')
        return res.status(400).json({ error: 'Datos invalido' });
    try
    {
        const elemento = await inventarioService.añadirElemento(nombre,descripcion);
        if(!elemento)
            return res.status(500).json({ mensaje: 'No se pudo registrar elemento' });
        return res.status(201).json({ message: 'Elemento registrado'})
    }
    catch (error)
    {
        return res.status(401).json({ error: error.message });
    }


});

/**
 * Endpoint que retorna los estados posibles
 */
router.get('/api/inventario/estados',authMiddleware(2), async (req, res) => 
{
    const estados = await inventarioService.getListaEstados();
    if(estados.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
    return res.json(estados);
});

/**
 * Endpoint que agrega estados posibles
 * Espera un nombre del estado
 */
router.post('/api/inventario/estados',authMiddleware(1), async (req, res) => 
{
    const nombre = req.body.nombre;
    if (typeof nombre !== 'string')
        return res.status(400).json({ error: 'Dato invalido' });
    try
    {
        if(!inventarioService.añadirEstados(nombre))
            return res.status(500).json({ mensaje: 'No se pudo registrar estado' });
        
        return res.status(201).json({ message: 'Estado registrado'})
    }
    catch (error)
    {
        return res.status(401).json({ error: error.message });
    }

});

/**
 * Endpoint para el cambio de estado de un elemento
 * Requiere el id del inventario y el id del nuevo estado
 * Si el estado no cambia es ignorado
 */
router.put("/api/inventario/estado/:id",authMiddleware(2), async (req, res) => {
    
    const id_inventario = Number(req.params.id);
    const nuevo_estado = Number(req.body.id_estado);
    if (isNaN(id_inventario) || isNaN(nuevo_estado))
        return res.status(400).json({ error: 'Datos enviados en formato inválido' });
    try 
    {
        await inventarioService.cambiarEstadoElemento(id_inventario,nuevo_estado);
        res.status(200).json({ mensaje: 'Estado actualizado correctamente.' });

    } catch (error)
    {
        console.error("Error al actualizar la estado:", error);
        return res.status(500).json({ error });
    }
});

module.exports = router;