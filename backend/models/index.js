//index centraliza los modelos de la bd

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Importar modelos
const Cuartel = require('./cuartel')(sequelize, DataTypes);
const Bombero = require('./bombero')(sequelize, DataTypes);
const Tarea = require('./tarea')(sequelize, DataTypes);
const Estado = require('./estado')(sequelize, DataTypes);
const Elemento = require('./elemento')(sequelize, DataTypes);
const InventarioPersonal = require('./inventario_personal')(sequelize, DataTypes);
const Guardia = require('./guardia')(sequelize, DataTypes);
const Rol = require('./rol')(sequelize, DataTypes);

// Definir relaciones

// Bombero -> Cuartel
Bombero.belongsTo(Cuartel, { foreignKey: 'id_cuartel' });
Cuartel.hasMany(Bombero, { foreignKey: 'id_cuartel' });

// Bombero -> Rol
Bombero.belongsTo(Rol, { foreignKey: 'id_rol' });
Rol.hasMany(Bombero, { foreignKey: 'id_rol' });

// Bombero -> Bombero (id_superior)
Bombero.belongsTo(Bombero, { as: 'superior', foreignKey: 'id_superior' });
Bombero.hasMany(Bombero, { as: 'subordinados', foreignKey: 'id_superior' });

// Tarea -> Bombero,Cuartel
Tarea.belongsTo(Bombero, { foreignKey: 'id_bombero' });
Bombero.hasMany(Tarea, { foreignKey: 'id_bombero' });
Tarea.belongsTo(Cuartel,{foreignKey: 'id_cuartel'});
Cuartel.hasMany(Tarea,{foreignKey: 'id_cuartel'});

// InventarioPersonal -> Bombero, Elemento, Estado
InventarioPersonal.belongsTo(Cuartel, { foreignKey: 'id_cuartel' });
InventarioPersonal.belongsTo(Bombero, { foreignKey: 'id_bombero' });
InventarioPersonal.hasMany(Elemento, { foreignKey: 'id_elemento' });
InventarioPersonal.hasMany(Estado, { foreignKey: 'id_estado' });

Bombero.hasMany(InventarioPersonal, { foreignKey: 'id_bombero' });
Elemento.belongsTo(InventarioPersonal, { foreignKey: 'id_elemento' });
Estado.belongsTo(InventarioPersonal, { foreignKey: 'id_estado' });

// Guardia -> Bombero
Guardia.belongsTo(Bombero, { foreignKey: 'id_bombero' });
Bombero.hasMany(Guardia, { foreignKey: 'id_bombero' });

module.exports = {
  sequelize,
  Cuartel,
  Bombero,
  Tarea,
  Estado,
  Elemento,
  InventarioPersonal,
  Guardia,
  Rol,
};
