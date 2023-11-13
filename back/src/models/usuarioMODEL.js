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
  tipo_dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tipo,
      key: 'id',
    },
    defaultValue: "4"
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  foto_perfil: DataTypes.STRING
}, {
  freezeTableName: true,
});

Tipo.hasOne(Usuario, { foreignKey: 'tipo_id' });
Usuario.belongsTo(Tipo, { foreignKey: 'tipo_id' });


export { Usuario };