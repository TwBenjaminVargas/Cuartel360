// models/Guardia.js
module.exports = (sequelize, DataTypes) => {
  const Guardia = sequelize.define('Guardia', {
    id_guardia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start: DataTypes.DATE, // Fecha y hora de inicio
    end: DataTypes.DATE,   // Fecha y hora de fin
    id_bombero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bomberos',
        key: 'id_bombero'
      }
    }
  }, {
    tableName: 'guardias',
    timestamps: false
  });

  return Guardia;
};
