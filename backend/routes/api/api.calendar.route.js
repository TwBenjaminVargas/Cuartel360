const express = require('express');
const path = require('path');
const { Guardia } = require('../../models');
const router = express.Router();


router.get('/api/guardias', async (req, res) => {
    const guardias = await Guardia.findAll();
    res.json(guardias);
});

module.exports = router;