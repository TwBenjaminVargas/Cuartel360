// models/Rol.js
module.exports = (sequelize,DataTypes) =>
{
  const Rol = sequelize.define('Rol', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });

  return Rol;

}