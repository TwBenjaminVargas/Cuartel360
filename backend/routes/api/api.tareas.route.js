const express = require('express');
const path = require('path');
const tareasService = require('../../service/tareas.service');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();


router.get('/api/tareas',authMiddleware(2), async (req, res) => {
    res.json(await tareasService.getListaTareas());

});

router.put("/api/tareas/:id",authMiddleware(2), async (req, res) => {
    const id_tarea = Number(req.params.id);
    const estado = Number(req.body.estado);

    if (isNaN(id_tarea) || isNaN(estado)) {
        return res.status(400).json({ error: 'ID o estado inválidos.' });
    }
    try {
        await tareasService.actualizarEstadoTarea(id_tarea, estado);
        res.status(200).json({ mensaje: 'Tarea actualizada correctamente.' });

    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        return res.status(500).json({ error });
    }
});

router.post('/api/tareas',authMiddleware(1), async (req, res) =>
{
    const descripcion = req.body.descripcion;
    if (typeof descripcion !== 'string') return res.status(400).json({ error: 'Datos incompatibles' });
    try
    {
        await tareasService.registrarTarea(descripcion);
        res.status(201).json({ mensaje: 'Tarea registrada correctamente' });

    }
    catch (error)
    {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;