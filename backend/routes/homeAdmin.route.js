const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/homeAdmin', authMiddleware(1),(req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/homeAdmin.html'));
});

module.exports = router;