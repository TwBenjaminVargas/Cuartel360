const express = require('express');
const path = require('path');
const calendarService = require('../../service/calendar.service');
const router = express.Router();


router.get('/api/guardias', async (req, res) =>
{
    res.json(await calendarService.getGrillaGuardia());

});

router.post('/api/guardias', async (req, res) => 
{
    const { email, start, end } = req.body;
    
    if (typeof email !== 'string' ||
        typeof start !== 'string' ||
        typeof end !== 'string') 
        res.status(400).json({ error: 'Datos incompatibles' });
    
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()))
        res.status(400).json({ error: 'Formato de fecha invalido' });

    try 
    {
        await calendarService.añadirGuardia(email,startDate,endDate);
        res.status(201).json({ message: 'Guardia registrada'})

    } 
    catch (error)
    {
        res.status(401).json({ error: error.message });
    }

});

module.exports = router;