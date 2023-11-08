import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Clasificacion = sequelize.define('clasificacion', {
    estrellas : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reseña : {
        type: DataTypes.STRING
    }
} , {
    freezeTableName: true
} 
)



export { Clasificacion };