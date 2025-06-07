const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/guardiasAdmin',authMiddleware(1),(req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/guardiasAdmin.html'));
});

module.exports = router;