import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 

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

export { Consumidor };