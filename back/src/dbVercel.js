import Sequelize from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

const sequelize = new Sequelize( process.env.DB_VERCEL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos en la nube');
    // Aquí puedes realizar consultas y otras operaciones en la base de datos
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
})();

export { sequelize };