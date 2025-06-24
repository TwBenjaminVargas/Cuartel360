const express = require('express');
const path = require('path');
const inventarioService = require('../../service/inventario.service');
const { error } = require('console');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();

// GET inventario vista administrador
router.get('/api/inventarioAdmin',authMiddleware(1),async (req, res) =>
{
    const codigoCuartel = Number(req.usuario.codigo);
    try
    {
        const inventario = await inventarioService.getInventarioCompleto(codigoCuartel);
        if(inventario.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
        return res.json(inventario);
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({ message: "Error al conseguir inventario" });
    }

});

// GET inventario vista usuario
router.get('/api/inventarioUsuario',authMiddleware(2), async (req, res) =>
{
    const id_bombero = Number(req.usuario.id);
    try
    {
        const inventario = await inventarioService.getInventarioPersonal(id_bombero);
        if(inventario.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
        return res.json(inventario);
    }
    catch(error)
    {
        console.log(error)
        return res.status(401).json({message: "Error al conseguir el inventario"});
    }

});

// GET elementos posibles
router.get('/api/inventario/elementos',authMiddleware(1), async (req, res) => 
    {
        const elementos = await inventarioService.getListaElementos();
        if(elementos.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
        return res.json(elementos);
    });
    
// GET estados posibles
router.get('/api/inventario/estados',authMiddleware(3), async (req, res) => 
{
    const estados = await inventarioService.getListaEstados();
    if(estados.length < 1) return res.status(200).json({ mensaje: 'No se encontraron registros' });
    return res.json(estados);
});
    
// POST agregar elemento al inventario de bombero
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
        
        return res.status(201).json({ message: 'Inventario registrado'})
    }
    catch (error)
    {
        console.log(error);
        return res.status(401).json({ message: "Error al registrar el inventario" });
    }


});


// POST agregar elemento posible
router.post('/api/inventario/elementos',authMiddleware(1), async (req, res) => 
{
    const {nombre, descripcion} = req.body;
    
    if (typeof descripcion !== 'string'
        || typeof nombre !== 'string')
        return res.status(400).json({ error: 'Datos invalido' });
    
    try
    {
        const elemento = await inventarioService.añadirElemento(nombre,descripcion);
        
        return res.status(201).json({ message: 'Elemento registrado'})
    }
    catch (error)
    {
        console.log(error);
        
        return res.status(401).json({ message: "Error al registrar el elemento" });
    }


});


// POST agregar estado posible
router.post('/api/inventario/estados',authMiddleware(1), async (req, res) => 
{
    const nombre = req.body.nombre;
    
    if (typeof nombre !== 'string')
        return res.status(400).json({ error: 'Dato invalido' });
    
    try
    {
        await inventarioService.añadirEstados(nombre);

        return res.status(201).json({ message: 'Estado registrado'});
    }
    catch (error)
    {
        console.log(error);
        
        return res.status(401).json({ message: "Error al registrar estado"});
    }

});

// PUT cambiar estado de inventario
router.put("/api/inventario/estado/:id",authMiddleware(2), async (req, res) => {
    
    const id_inventario = Number(req.params.id);
    const nuevo_estado = Number(req.body.id_estado);

    if (isNaN(id_inventario) || isNaN(nuevo_estado))
        return res.status(400).json({ error: 'Datos enviados en formato inválido' });
    
    try 
    {
        await inventarioService.cambiarEstadoElemento(id_inventario,nuevo_estado);
        
        return res.status(200).json({ mensaje: 'Estado actualizado correctamente.' });

    } catch (error)
    {
        console.log(error);
        
        return res.status(500).json({ message: "Error al actualizar el estado"});
    }
});

// DELETE registro de inventario
router.delete('/api/inventario/:id',authMiddleware(1), async (req, res) =>
{
  try
  {
    const id_inventario = Number(req.params.id);
    if(isNaN(id_inventario))
      return res.status(400).json({ error: 'Dato invalido' });

    const result = await inventarioService.borrarInventario(id_inventario);
    
    if (result === 0)
      return res.status(404).json({ mensaje: 'Inventario no encontrado' });

    return res.status(204).send(); // borrado exitoso
  } 
  catch (error)
  {
    console.error(error);
    
    return res.status(500).json({ mensaje: 'Error al borrar la tarea' });
  }

});


module.exports = router;