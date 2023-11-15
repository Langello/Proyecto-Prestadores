import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js'; 
import { Usuario } from './usuarioMODEL.js';


const Prestador = sequelize.define('prestadores', {
    cuilCuit: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cuil_cuit'
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fotosTrabajosRealizados: {
        type: DataTypes.STRING,
        field: 'fotos_trabajos_realizados'
    },
    horariosAtencion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'horarios_atencion'
    },
    disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    radioCobertura: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'radio_cobertura'
    },

    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usuario_id',
        references: {
            model: Usuario,
            key: 'id',
        }
    }
},
{
    freezeTableName: true,
    defaultScope: {
        attributes: {
            exclude: [ 'createdAt', 'updatedAt', 'usuarioId' ]
        }
    }
}
)

Usuario.hasOne(Prestador, { foreignKey: 'usuarioId' });
Prestador.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export { Prestador };