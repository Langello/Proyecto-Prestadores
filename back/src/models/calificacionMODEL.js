import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Calificacion = sequelize.define('calificaciones', {
    estrellas : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario : {
        type: DataTypes.STRING
    }
} , {
    freezeTableName: true
} 
)



export { Calificacion };