import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 
import { Prestador } from './prestadorMODEL.js';
import { Consumidor } from './consumidorMODEL.js';
import { Usuario } from './usuarioMODEL.js';


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
        allowNull: true
    },
    calificacion_id : {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

Prestador.hasOne(Trabajo, { foreignKey: 'prestador_id' });
Consumidor.hasOne(Trabajo, { foreignKey: 'consumidor_id' });
Trabajo.belongsTo(Prestador, { foreignKey: 'prestador_id' });
Trabajo.belongsTo(Consumidor, { foreignKey: 'consumidor_id' });



export { Trabajo };
