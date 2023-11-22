import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Tipo } from './tipoMODEL.js';

const Usuario = sequelize.define('usuario', {

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: DataTypes.STRING,
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoDni: {
    type: DataTypes.STRING,
    field: 'tipo_dni',
    allowNull: false,
    unique: true
  },
  tipoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tipo,
      key: 'id',
    },
    field: 'tipo_id',
    defaultValue: "4"
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    field: 'fecha_nacimiento',
    allowNull: false
  },
  fotoPerfil: {
    type: DataTypes.STRING,
    field: 'foto_perfil'
  },
}, {
  freezeTableName: true,
  defaultScope: {
    attributes: {
      exclude: [ 'createdAt', 'updatedAt' ]
    }
  }
});

Tipo.hasOne(Usuario, { foreignKey: 'tipoId' });
Usuario.belongsTo(Tipo, { foreignKey: 'tipoId' });


export { Usuario };