const express = require('express');
const path = require('path');
const calendarService = require('../../service/calendar.service');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();


router.get('/api/guardias',authMiddleware(2), async (req, res) =>
{
    const year = parseInt(req.query.year);
    const month = parseInt(req.query.month);
    if (!year || !month)
      return res.status(400).json({ error: 'Datos incompatibles' })
    res.json(await calendarService.getGrillaGuardia(year,month));

});

router.post('/api/guardias',authMiddleware(1), async (req, res) => 
{
    const { email, start, end } = req.body;
    
    if (typeof email !== 'string' ||
        typeof start !== 'string' ||
        typeof end !== 'string') 
        return res.status(400).json({ error: 'Datos incompatibles' });
    
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()))
        return res.status(400).json({ error: 'Formato de fecha invalido' });

    try 
    {
        await calendarService.añadirGuardia(email,startDate,endDate);
        return res.status(201).json({ message: 'Guardia registrada'})

    } 
    catch (error)
    {
        return res.status(401).json({ error: error.message });
    }

});

module.exports = router;