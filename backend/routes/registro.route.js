const express = require('express');
const path = require('path');
const registerService = require('../service/register.service');
const router = express.Router();

router.get('/registro', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../frontend/views/registro.html'));
});

/**
 * Endpoint post registro, espera
 * email,nombre,apellido,dni,contraseña y codigo de cuartel
 */
router.post('/registro', async (req, res) => {
  const { email, nombre,apellido,dni,contraseña,codigo } = req.body;
  // Validar tipos
  if (
    typeof email !== 'string' ||
    typeof nombre !== 'string' ||
    typeof apellido !== 'string' ||
    typeof contraseña !== 'string' ||
    typeof dni !== 'number' ||
    typeof codigo !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos incompatibles' });
  }
  try {
    const result = await registerService.registerUser(email,nombre,apellido,contraseña,dni,codigo);
    res.status(201).json({ message: 'Usuario registrado correctamente'})
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;