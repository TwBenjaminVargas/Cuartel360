const express = require('express');
const path = require('path');
const app = express();

// Configuracion el middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.json()); // Middleware para parsear JSON


// Endpoint Login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
  });

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ status: 'success', data: req.body });
});






app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});