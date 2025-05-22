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
   // Obtener el header Authorization
   try {
    const authHeader = req.headers['authorization'];
    const tokenPayload = authService.validateToken(authHeader);
    if(tokenPayload.id_rol == 1)
      return res.sendFile(path.join(__dirname, '../../frontend/views/homeAdmin.html'));
    else if (tokenPayload.id_rol == 2)
      return res.sendFile(path.join(__dirname, '../../frontend/views/homeUser.html'));
    else
      return res.status(403).sendFile(path.join(__dirname, '../../frontend/views/forbidden.html'));
  } catch (error) {
    return res.status(401).sendFile(path.join(__dirname, '../../frontend/views/index.html'));
  }

  });

module.exports = router;