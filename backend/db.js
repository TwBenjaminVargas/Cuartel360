const { Sequelize } = require('sequelize');
// Variables de entorno
require('dotenv').config();
// Conexión 
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
/**
 *  Testea la conexion, solicita horario de servidor
 */
async function testConnection() {
  try {
    await sequelize.authenticate(); // Intenta autenticarse
    console.log('Conexión exitosa a PostgreSQL');
    
    // Ejecuta una consulta de prueba
    const [result] = await sequelize.query('SELECT NOW() AS current_time');
    console.log('DB Time:', result[0].current_time);
    
  } catch (error) {
    console.error('Error de conexión:', error);
  } /*finally {
    await sequelize.close(); // Cierra la conexión
  }*/
}

testConnection();

module.exports = sequelize;