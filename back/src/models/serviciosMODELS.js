import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Servicios = sequelize.define('servicios', {
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING
    }
} , {
    freezeTableName: true
} 
)

export { Servicios };