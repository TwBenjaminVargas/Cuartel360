const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const userDataService = require('../service/userData.service');
const router = express.Router();

/*
router.get('/perfilUser',authMiddleware(2),(req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/perfilUser.html'));
});
*/
/**
 * Espera un email y devuelve la informacion segun el rol
 */
router.get('/perfilUser/Data',authMiddleware(2), async (req, res) => {
    email = req.query.email
    if(typeof email !== "string") return res.status(400).json({ error: 'Dato invalido' });
    try
    {
        datos = await userDataService.showUserData(email);
        return res.json(datos);
    }
    catch (error)
    {
        return res.status(401).json({ error: error.message });
    }   
});
module.exports = router;