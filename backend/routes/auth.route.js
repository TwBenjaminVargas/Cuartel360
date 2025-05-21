const express = require('express');
const path = require('path');
const router = express.Router();
const authService = require('../service/auth.service');




router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/views/index.html'));
  });

module.exports = router;