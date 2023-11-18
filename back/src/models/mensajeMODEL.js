import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Mensaje = sequelize.define('mensajes', {
    asunto : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensaje : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idOrigen : {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_origen'
    },
    idDestino : {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_destino'
    }
} , {
    freezeTableName: true
} 
)

export { Mensaje };