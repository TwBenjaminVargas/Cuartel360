const express = require('express');
const path = require('path');
const { Guardia, Bombero } = require('../../models');
const router = express.Router();


router.get('/api/guardias', async (req, res) => {
    const guardias = await Guardia.findAll();
    const grilla = await Promise.all(guardias.map(async(guardia) => {
        const bombero = await Bombero.findOne({ where: { id_bombero: guardia.id_bombero }});
        return {
            ...guardia.toJSON(), // convierte el modelo Sequelize a un objeto plano
            title: bombero.nombre }
        }));

    res.json(grilla);

});
module.exports = router;