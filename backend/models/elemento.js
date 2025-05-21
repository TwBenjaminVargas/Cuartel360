// models/Elemento.js
module.exports = (sequelize,DataTypes) =>
{
  const Elemento = sequelize.define('Elemento', {
    id_elemento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING(50),
    descripcion: DataTypes.TEXT
  }, {
    tableName: 'elementos',
    timestamps: false
  });
  
  return Elemento;
}