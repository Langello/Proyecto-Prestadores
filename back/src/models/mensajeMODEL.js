import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Prestador } from './prestadorMODEL.js';
import { Consumidor } from './consumidorMODEL.js';


const MensajeAPrestador = sequelize.define('mensajes_a_prestadores', {
    asunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idOrigen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_origen',
        references: {
            model: Consumidor,
            key: 'id',
        }
    },
    idDestino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_destino',
        references: {
            model: Prestador,
            key: 'id',
        }
    }
}, {
    freezeTableName: true,
    defaultScope: {
        attributes: {
            exclude: [ 'idOrigen', 'idDestino' ]
        }
    }
}
)


const MensajeAConsumidor = sequelize.define('mensajes_a_consumidores', {
    asunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idOrigen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_origen',
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    idDestino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_destino',
        references: {
            model: Consumidor,
            key: 'id',
        }
    },
}, {
    freezeTableName: true,
    defaultScope: {
        attributes: {
            exclude: [ 'idOrigen', 'idDestino' ]
        }
    }
    
}
)

Prestador.hasOne(MensajeAConsumidor, { foreignKey: 'idOrigen' });
MensajeAConsumidor.belongsTo(Prestador, { foreignKey: 'idOrigen' });
Consumidor.hasOne(MensajeAPrestador, { foreignKey: 'idOrigen' });
MensajeAPrestador.belongsTo(Consumidor, { foreignKey: 'idOrigen' });
Consumidor.hasOne(MensajeAConsumidor,{ foreignKey: 'idDestino' })
MensajeAConsumidor.belongsTo(Consumidor, { foreignKey: 'idDestino' });
Prestador.hasOne(MensajeAPrestador, { foreignKey: 'idDestino' });
MensajeAPrestador.belongsTo(Prestador, { foreignKey: 'idDestino' });







export { MensajeAPrestador, MensajeAConsumidor };


