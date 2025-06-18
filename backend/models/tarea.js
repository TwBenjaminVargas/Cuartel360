// models/Tarea.js
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define('Tarea',
    {
      id_tarea:
      {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: DataTypes.TEXT,
      estado:
      {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_bombero:
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:
        {
          model: 'bomberos',
          key: 'id_bombero'
        }
      },
      id_cuartel:
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:
        {
          model: 'cuarteles',
          key: 'id_cuartel'
        }
      },
      prioridad: {
        type: DataTypes.ENUM('alta', 'media', 'baja'),
        allowNull: false
      },
      deletedAt: { // Registro de tareas eliminadas
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'tareas',
      timestamps: false,
      paranoid: true,      // Activa el borrado lógico
      deletedAt: 'deletedAt'
    });

  return Tarea;
}