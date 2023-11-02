import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Consumidor = sequelize.define('consumidores', {
    usuario_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export { Consumidor };