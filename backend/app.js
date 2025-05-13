const express = require('express');
const path = require('path');
const app = express();


//Configurar el middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));



//Ruta para manejar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
  });





app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});