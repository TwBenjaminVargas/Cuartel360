const express = require('express');
const path = require('path');
const tareasService = require('../../service/tareas.service');
const authMiddleware = require('../../middleware/auth.middleware');
const { error } = require('console');
const router = express.Router();

// Muestra tareas vista usuario
router.get('/api/tareasUser',authMiddleware(2), async (req, res) => {
    try
    {
        res.json(await tareasService.getListaTareasUsuario(req.usuario.id));
    }
    catch (error)
    {
        console.log("Error en getListaTareasUsuario: ", error);
        return res.status(500).json({message: "Error en servidor"});
    }
    
});

// Muestra tareas vista administrador
router.get('/api/tareasAdmin',authMiddleware(1), async (req, res) => {
     try
    {
        res.json(await tareasService.getListaTareasAdministrador(req.usuario.id));
    }
    catch (error)
    {
        console.log("Error en getListaTareasAdministrador: ", error);
        return res.status(500).json({message: "Error en servidor"});
    }
});

// Cambio de estado de tareas
router.put("/api/tareas/:id",authMiddleware(2), async (req, res) => {
    const id_tarea = Number(req.params.id);
    const estado = Number(req.body.estado);

    if (isNaN(id_tarea) || isNaN(estado))
        return res.status(400).json({ error: 'ID o estado inválidos.' });
    
    try {
        await tareasService.actualizarEstadoTarea(id_tarea, estado);
        res.status(200).json({ mensaje: 'Tarea actualizada correctamente.' });

    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        return res.status(500).json({ error });
    }
});

// Añade tareas
router.post('/api/tareas',authMiddleware(1), async (req, res) =>
{
    const {descripcion, email, prioridad} = req.body;
    
    if(!descripcion?.trim() || !email?.trim() || !prioridad?.trim())
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    
    if (typeof descripcion !== 'string' || typeof email !== "string" || typeof prioridad !== "string")
        return res.status(400).json({ error: 'Datos incompatibles' });
    try
    {
        const tarea = await tareasService.registrarTarea(descripcion,prioridad,email,req.usuario.id);
        return res.status(201).json(tarea);

    }
    catch (error)
    {
        console.log("Error en POST api tareas: ", error);
        return res.status(401).json({ error: error.message });
    }
});

// Borrar tarea lógicamente (Perduran en BD como historial)
router.delete('/api/tareas/:id',authMiddleware(1), async (req, res) => {
  try
  {
    const id_tarea = Number(req.params.id);
    if(isNaN(id_tarea))
      return res.status(400).json({ error: 'Dato invalido' });

    const result = await tareasService.borrarTarea(id_tarea);
    if (result === 0)
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    return res.status(204).send(); // borrado exitoso
  } 
  catch (error)
  {
    console.error(error);
    
    return res.status(500).json({ mensaje: 'Error al borrar la tarea' });
  }
});

module.exports = router;