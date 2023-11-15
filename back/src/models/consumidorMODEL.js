import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 
import { Usuario } from './usuarioMODEL.js';

const Consumidor = sequelize.define('consumidor', {
    usuarioId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usuario_id',
        references: {
            model: Usuario,
            key: 'id',
        }
    },
    metodoPago: {
        type: DataTypes.STRING,
        field: 'metodo_pago',
    }
} , {
    freezeTableName: true,
    defaultScope: {
        attributes: {
            exclude: ['usuarioId']
        }
    }
}
)
Usuario.hasOne(Consumidor, { foreignKey: 'usuarioId' });
Consumidor.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export { Consumidor };