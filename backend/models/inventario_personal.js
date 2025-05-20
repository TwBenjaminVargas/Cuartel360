// models/InventarioPersonal.js
module.exports = (sequelize,DataTypes) =>
{
  const InventarioPersonal = sequelize.define('InventarioPersonal', {
    id_inventario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'inventario_personal',
    timestamps: false
  });
  
  
  return InventarioPersonal;
}  