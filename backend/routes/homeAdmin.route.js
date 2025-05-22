const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/registro', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/homeAdmin.html'));
});

module.exports = router;