import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Prestador } from './prestadorMODEL.js';
import { Servicio } from './serviciosMODEL.js';

const ServicioXprestador = sequelize.define('servicio_x_prestador', {
    prestador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Prestador,
            key: 'id',
        }
    },
    servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
Prestador.hasMany(ServicioXprestador, { foreignKey: 'prestador_id' });
Servicio.hasMany(ServicioXprestador, { foreignKey: 'servicio_id' });
ServicioXprestador.belongsTo(Prestador, { foreignKey: 'prestador_id' });
ServicioXprestador.belongsTo(Servicio, { foreignKey: 'servicio_id' });


export { ServicioXprestador };