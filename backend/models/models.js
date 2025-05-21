// models/Rol.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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

module.exports = Rol;

// models/Cuartel.js
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

module.exports = Cuartel;

// models/Bombero.js
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

Bombero.belongsTo(Cuartel, { foreignKey: 'id_cuartel' });
Bombero.belongsTo(Bombero, { as: 'Superior', foreignKey: 'id_superior' });
Bombero.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = Bombero;

// models/Tarea.js
const Tarea = sequelize.define('Tarea', {
  id_tarea: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: DataTypes.TEXT,
  estado: DataTypes.INTEGER
}, {
  tableName: 'tareas',
  timestamps: false
});

Tarea.belongsTo(Bombero, { foreignKey: 'id_bombero' });

module.exports = Tarea;

// models/Estado.js
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

module.exports = Estado;

// models/Elemento.js
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

module.exports = Elemento;

// models/InventarioPersonal.js
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

InventarioPersonal.belongsTo(Bombero, { foreignKey: 'id_bombero' });
InventarioPersonal.belongsTo(Elemento, { foreignKey: 'id_elemento' });
InventarioPersonal.belongsTo(Estado, { foreignKey: 'id_estado' });

module.exports = InventarioPersonal;

// models/Guardia.js
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


module.exports = Guardia;
