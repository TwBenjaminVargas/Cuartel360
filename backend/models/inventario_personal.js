// models/InventarioPersonal.js
module.exports = (sequelize,DataTypes) =>
{
  const InventarioPersonal = sequelize.define('InventarioPersonal',
  {
    id_inventario:
    {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cuartel:
    {
      type: DataTypes.INTEGER,
       references:
       {
        model: 'cuarteles',
        key: 'id_cuartel'
      }
    },
    id_bombero:
    {
        type: DataTypes.INTEGER,
         references:
         {
          model: 'bomberos',
          key: 'id_bombero'
        }
    },
    id_elemento:
    {
        type: DataTypes.INTEGER,
         references:
         {
          model: 'elementos',
          key: 'id_elemento'
        }
    },
    id_estado:
    {
        type: DataTypes.INTEGER,
         references:
         {
          model: 'estados',
          key: 'id_estado'
        }
    }
  },
  {
    tableName: 'inventario_personal',
    timestamps: false
  });
  
  
  return InventarioPersonal;
}  