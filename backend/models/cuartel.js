// models/Cuartel.js
module.exports = (sequelize,DataTypes) =>
{
  const Cuartel = sequelize.define('Cuartel', {
    id_cuartel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING(60),
    numero: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING(100),
      unique: true
    },
    telefono: DataTypes.BIGINT,
    localidad: DataTypes.STRING(100),
    provincia: DataTypes.STRING(100)
  }, {
    tableName: 'cuarteles',
    timestamps: false
  });
  
  return Cuartel;

}
