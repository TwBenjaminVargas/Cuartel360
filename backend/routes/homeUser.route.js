const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/homeUser',authMiddleware(2), (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/homeUser.html'));
});

module.exports = router;