const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const userDataService = require('../service/userData.service');
const router = express.Router();

// GET vista de perfil de usuario
router.get('/perfilUser',authMiddleware(2),(req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/perfilUser.html'));
});

// GET vista de perfil de admin
router.get('/perfilAdmin',authMiddleware(1),(req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/perfilAdmin.html'));
});

// GET datos del perfil del usuario
router.get('/perfilUser/data',authMiddleware(2), async (req, res) => {

    try
    {
        datos = await userDataService.showUserData(req.usuario.id);
        return res.json(datos);
    }
    catch (error)
    {
        console.log(error.message);
        return res.status(500).json({message: "Error al obtener los datos de perfil"});
    }   
});

// GET datos de perfil administrador
router.get('/perfilAdmin/data',authMiddleware(1), async (req, res) => {
    try
    {
        datos = await userDataService.showAdminData(req.usuario.id);
        return res.json(datos);
    }
    catch (error)
    {
        console.log(error.message);
        return res.status(500).json({message: "Error al obtener los datos de perfil"});
    }   
});

module.exports = router;