import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Tipo = sequelize.define('tipos', {
    tipo : {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export { Tipo };

