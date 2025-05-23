const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/guardiasUser', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/guardiasUser.html'));
});

module.exports = router;