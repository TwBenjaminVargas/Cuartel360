const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/inventarioAdmin', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/inventarioAdmin.html'));
});

module.exports = router;