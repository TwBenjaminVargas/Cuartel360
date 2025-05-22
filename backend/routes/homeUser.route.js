const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/homeUser', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/homeUser.html'));
});

module.exports = router;