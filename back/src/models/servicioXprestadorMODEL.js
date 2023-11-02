import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const ServicioXprestador = sequelize.define('servicio_x_prestador', {
    prestador_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servicio_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
} , {
    freezeTableName: true
} 
)

export { ServicioXprestador };