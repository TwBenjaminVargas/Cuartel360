const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/tareasAdmin', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/tareasAdmin.html'));
});

module.exports = router;