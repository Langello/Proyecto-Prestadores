import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 


const Prestador = sequelize.define('prestadores', {
    cuil_cuit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fotos_trabajos_realizados: {
        type: DataTypes.STRING,
    },
    horarios_atencion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    radio_cobertura: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


export { Prestador };