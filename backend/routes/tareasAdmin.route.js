const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/tareasAdmin',authMiddleware(1), (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/tareasAdmin.html'));
});

module.exports = router;