// Sincronizar base de datos
const { sequelize} = require('./models');

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // O { force: true } si se quiere borrar y recrear
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close(); // Cierre de conexion
  }
}

syncDatabase();
