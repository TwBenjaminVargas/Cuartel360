const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/tareasUser',authMiddleware(2), (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/tareasUser.html'));
});

module.exports = router;