const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');


// Configuracion el middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.json()); // Middleware para procesar JSON
app.use(cookieParser()); // Middleware para procesar Cookies

//APIS
const apiCalendar = require('./routes/api/api.calendar.route');
app.use('/',apiCalendar);
const apiTareas = require('./routes/api/api.tareas.route');
app.use('/',apiTareas);
const apiInventario = require('./routes/api/api.inventario.route');
app.use('/',apiInventario);

// Endpoint Login
const authRoutes = require('./routes/auth.route');
app.use('/',authRoutes);

// Endpoint Registro
const RegRoutes = require('./routes/registro.route');
app.use('/',RegRoutes);

// Endpoint Home Admin
const HomAdRoutes = require('./routes/homeAdmin.route');
app.use('/',HomAdRoutes);

// Endpoint Home User
const HomUsRoutes = require('./routes/homeUser.route');
app.use('/',HomUsRoutes);


// Endpoint Guardias Admin
const GuardiasAdRoutes = require('./routes/guardiasAdmin.route');
app.use('/',GuardiasAdRoutes);

// Endpoint Guardias User
const GuardiasUsRoutes = require('./routes/guardiasUser.route');
app.use('/',GuardiasUsRoutes);

// Endpoint Inventario Admin
const InventarioAdRoutes = require('./routes/inventarioAdmin.route');
app.use('/',InventarioAdRoutes);

// Endpoint Inventario User
const InventarioUsRoutes = require('./routes/inventarioUser.route');
app.use('/',InventarioUsRoutes);

// Endpoint Tareas Admin
const TareasAdRoutes = require('./routes/tareasAdmin.route');
app.use('/',TareasAdRoutes);

// Endpoint Tareas User
const TareasUsRoutes = require('./routes/tareasUser.route');
app.use('/',TareasUsRoutes);

// Endpoint Perfil
const perfilRoutes = require('./routes/perfil.route');
app.use('/',perfilRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});