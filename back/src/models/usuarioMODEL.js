import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js';

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
  telefono: DataTypes.STRING,
  tipo_dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo_id: DataTypes.INTEGER,
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  foto_perfil: DataTypes.STRING
}, {
  freezeTableName: true,
});

export { Usuario };