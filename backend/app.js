const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models'); // base de datos

// Configuracion el middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.json()); // Middleware para procesar JSON

// Endpoint Login
const authRoutes = require('./routes/auth.route');
app.use('/',authRoutes)



app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});