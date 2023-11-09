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
    rango_horario : {
        type: DataTypes.STRING,
        allowNull: false
    },
    prestador_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    consumidor_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Consumidor,
            key: 'id',
        }
    },
    tareas : {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_id : {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Estados,
            key: 'id',
        }
    },
    calificacion_id : {
        type: DataTypes.INTEGER,
        allowNull: true,
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

Prestador.hasOne(Trabajo, { foreignKey: 'prestador_id' });
Consumidor.hasOne(Trabajo, { foreignKey: 'consumidor_id' });
Estados.hasOne(Trabajo, { foreignKey: 'estado_id' });
Calificacion.hasOne(Trabajo, { foreignKey: 'calificacion_id' });
Trabajo.belongsTo(Prestador, { foreignKey: 'prestador_id' });
Trabajo.belongsTo(Consumidor, { foreignKey: 'consumidor_id' });
Trabajo.belongsTo(Estados, { foreignKey: 'estado_id' });
Trabajo.belongsTo(Calificacion, { foreignKey: 'calificacion_id' });




export { Trabajo };
