const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/inventarioUser', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/inventarioUser.html'));
});

module.exports = router;