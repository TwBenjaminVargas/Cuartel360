const express = require('express');
const path = require('path');
const router = express.Router();
const authService = require('../service/auth.service');
const authMiddleware = require('../middleware/auth.middleware')



router.post('/', async (req, res) => {
  const { email, contraseña } = req.body;
  
   if (
    typeof email !== 'string' ||
    typeof contraseña !== 'string') return res.status(400).json({ error: 'Datos incompatibles' });


  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/index.html'));
});

module.exports = router;