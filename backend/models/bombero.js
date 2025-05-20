// models/Bombero.js
module.exports = (sequelize,DataTypes) =>
{
  const Bombero = sequelize.define('Bombero', {
    id_bombero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true
    },
    contraseña: DataTypes.STRING(60),
    dni: {
      type: DataTypes.BIGINT,
      unique: true
    },
    nombre: DataTypes.STRING(60),
    rango: DataTypes.STRING(60)
  }, {
    tableName: 'bomberos',
    timestamps: false
  });
  
  return Bombero;
}
