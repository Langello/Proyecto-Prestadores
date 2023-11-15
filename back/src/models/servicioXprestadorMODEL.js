import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Prestador } from './prestadorMODEL.js';
import { Servicio } from './serviciosMODEL.js';

const ServicioXprestador = sequelize.define('servicio_x_prestador', {
    prestadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prestador_id',
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    servicioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'servicio_id',
        references: {
            model: Servicio,
            key: 'id',
        }
    }
}, {
    freezeTableName: true
}
)

//Relacion de muchos a muchos
Prestador.hasMany(ServicioXprestador, { foreignKey: 'prestadorId' });
Servicio.hasMany(ServicioXprestador, { foreignKey: 'servicioId' });
ServicioXprestador.belongsTo(Prestador, { foreignKey: 'prestadorId' });
ServicioXprestador.belongsTo(Servicio, { foreignKey: 'servicioId' });


export { ServicioXprestador };