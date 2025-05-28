// models/Tarea.js
module.exports = (sequelize,DataTypes) =>
{
  const Tarea = sequelize.define('Tarea',
  {
    id_tarea:
    {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.TEXT,
    estado:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_bombero: 
    {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:
      {
        model: 'bomberos',
        key: 'id_bombero'
      }
    }
  
  },
  {
    tableName: 'tareas',
    timestamps: false
  });
  
  return Tarea;
}