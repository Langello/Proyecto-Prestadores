import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 
import { Usuario } from './usuarioMODEL.js';

const Consumidor = sequelize.define('consumidor', {
    usuario_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING
    }
} , {
    freezeTableName: true,
}
)
Usuario.hasOne(Consumidor, { foreignKey: 'usuario_Id' });
Consumidor.belongsTo(Usuario, { foreignKey: 'usuario_Id' });

export { Consumidor };