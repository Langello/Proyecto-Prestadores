// Base local de datos con MySQL
// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const password = process.env.DB_PASSWORD;
// const dbName = process.env.DB_NAME 
// const host = process.env.DB_HOST 
// const dbUser = process.env.DB_USER 
// const dbDialect = process.env.DB_DIALECT


// const sequelize = new Sequelize(dbName, dbUser, password, {
//   host: host,
//   dialect: dbDialect,
// });

// const autenticar = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexión establecida exitosamente a la BD");
//   } catch (error) {
//     console.error("Error al conectar a la Base de Datos", error);
//   }
// };


// export { sequelize, autenticar };


// Base de datos en la nube con VERCEL (postgres).
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
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
})();

export { sequelize };