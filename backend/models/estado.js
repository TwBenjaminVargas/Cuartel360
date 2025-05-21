// models/Estado.js
module.exports = (sequelize,DataTypes) =>
{
  const Estado = sequelize.define('Estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    tableName: 'estados',
    timestamps: false
  });
  
  return Estado;
}
