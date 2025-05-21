// models/Tarea.js
module.exports = (sequelize,DataTypes) =>
{
  const Tarea = sequelize.define('Tarea', {
    id_tarea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.TEXT,
    estado: DataTypes.INTEGER
  }, {
    tableName: 'tareas',
    timestamps: false
  });
  
  return Tarea;
}