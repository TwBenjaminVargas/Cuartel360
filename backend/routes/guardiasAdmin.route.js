const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/guardiasAdmin', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/guardiasAdmin.html'));
});

module.exports = router;