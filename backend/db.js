const { Sequelize } = require('sequelize');

// Variables de entorno
require('dotenv').config();

// Conexión básica 
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER,      // Usuario PostgreSQL
  process.env.DB_PASSWORD,   // Contraseña
  {
    host: process.env.DB_HOST, // O la IP de servidor PostgreSQL
    port: process.env.DB_PORT,        // Puerto por defecto de PostgreSQL
    dialect: 'postgres', // Especifica que usa PostgreSQL
    logging: false,     // Desactiva logs de SQL en consola (opcional)
  }
);

/* Verificar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  }
})();
*/
module.exports = sequelize;