import Sequelize from 'sequelize';

const sequelize = new Sequelize( 'postgres://default:1SaFKRtWgw4d@ep-proud-king-11044566-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb', {
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