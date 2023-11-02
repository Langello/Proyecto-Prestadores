import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

const Trabajo = sequelize.define('trabajos', {
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha : {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lugar : {
        type: DataTypes.STRING,
        allowNull: false
    },
    rango_horario : {
        type: DataTypes.STRING,
        allowNull: false
    },
    prestador_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consumidor_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tareas : {
        type: DataTypes.STRING
    },
    estado_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calificacion_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export { Trabajo };
