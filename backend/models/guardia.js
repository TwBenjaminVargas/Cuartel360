// models/Guardia.js
module.exports = (sequelize,DataTypes) =>
{
  const Guardia = sequelize.define('Guardia', {
    id_guardia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    hora_inicio: DataTypes.TIME,
    hora_fin: DataTypes.TIME
  }, {
    tableName: 'guardias',
    timestamps: false
  });
  
  
  return Guardia;
  
}
