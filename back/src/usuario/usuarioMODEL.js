import { DataTypes } from 'sequelize';

import {sequelize} from '../db.js';



const Usuario = sequelize.define('usuario', {
  
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  dni: DataTypes.STRING,
  telefono: DataTypes.STRING,
  tipo_dni: DataTypes.STRING,
  tipo_id: DataTypes.INTEGER,


}, {
  timestamps: false,
  freezeTableName: true,
});

export { Usuario };