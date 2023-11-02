import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Estados = sequelize.define('estados', {
    nombre : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
} , {
    freezeTableName: true
} 
)

export { Estados };