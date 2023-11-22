import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 
import { Prestador } from './prestadorMODEL.js';
import { Consumidor } from './consumidorMODEL.js';
import { Estados } from './estadoMODEL.js';
import { Calificacion } from './calificacionMODEL.js';



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
    rangoHorario : {
        type: DataTypes.STRING,
        field: 'rango_horario',
        allowNull: false
    },
    prestadorId : {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'prestador_id',
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    consumidorId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'consumidor_id',
        references: {
            model: Consumidor,
            key: 'id',
        }
    },
    tareas : {
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoId : {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'estado_id',
        references: {
            model: Estados,
            key: 'id',
        }
    },
    calificacionId : {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'calificacion_id',
        references: {
            model: Calificacion,
            key: 'id',
        }
    }
}, 
{
    freezeTableName: true
}
)

Prestador.hasOne(Trabajo, { foreignKey: 'prestadorId' });
Consumidor.hasOne(Trabajo, { foreignKey: 'consumidorId' });
Estados.hasOne(Trabajo, { foreignKey: 'estadoId' });
Calificacion.hasOne(Trabajo, { foreignKey: 'calificacionId' });
Trabajo.belongsTo(Prestador, { foreignKey: 'prestadorId' });
Trabajo.belongsTo(Consumidor, { foreignKey: 'consumidorId' });
Trabajo.belongsTo(Estados, { foreignKey: 'estadoId' });
Trabajo.belongsTo(Calificacion, { foreignKey: 'calificacionId' });




export { Trabajo };
