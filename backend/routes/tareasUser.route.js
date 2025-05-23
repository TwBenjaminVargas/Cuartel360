const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/tareasUser', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/tareasUser.html'));
});

module.exports = router;