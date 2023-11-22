import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Prestador } from './prestadorMODEL.js';
import { Consumidor } from './consumidorMODEL.js';
import { Usuario } from './usuarioMODEL.js';

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
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_origen',
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    idDestino: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_destino',
        references: {
            model: Consumidor,
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
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_origen',
        references: {
            model: Consumidor,
            key: 'id',
        }
    },
    idDestino: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'id_destino',
        references: {
            model: Prestador,
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

Prestador.hasOne(MensajeAConsumidor, { foreignKey: 'idDestino' });
MensajeAConsumidor.belongsTo(Prestador, { foreignKey: 'idDestino' });
Consumidor.hasOne(MensajeAPrestador, { foreignKey: 'idDestino' });
MensajeAPrestador.belongsTo(Consumidor, { foreignKey: 'idDestino' });
Prestador.hasOne(MensajeAPrestador, { foreignKey: 'idOrigen' });
MensajeAPrestador.belongsTo(Prestador, { foreignKey: 'idOrigen' });







export { MensajeAPrestador, MensajeAConsumidor };


