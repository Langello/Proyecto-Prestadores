import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Calificacion = sequelize.define('calificaciones', {
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



export { Calificacion };