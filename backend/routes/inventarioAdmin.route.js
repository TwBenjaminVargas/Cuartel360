const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/inventarioAdmin',authMiddleware(1), (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/inventarioAdmin.html'));
});

module.exports = router;