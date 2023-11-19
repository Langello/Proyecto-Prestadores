import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const MensajeAPrestador = sequelize.define('mensajes_a_prestadores', {
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


const MensajeAConsumidor = sequelize.define('mensajes_a_consumidores', {
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
})


export { MensajeAPrestador, MensajeAConsumidor };
