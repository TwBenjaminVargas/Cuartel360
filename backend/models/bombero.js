// models/Bombero.js
module.exports = (sequelize,DataTypes) =>
{
  const Bombero = sequelize.define('Bombero', {
    
    id_bombero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Claves foráneas
    id_superior: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bomberos',
        key: 'id_bombero'
      }
    },
    id_cuartel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuarteles',
        key: 'id_cuartel'
      }
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_rol'
      }
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
    apellido: DataTypes.STRING(60),
    rango: DataTypes.STRING(60),
    
  }, {
    tableName: 'bomberos',
    timestamps: false
  });
  
  return Bombero;
}
