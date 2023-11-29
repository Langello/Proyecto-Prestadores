import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME 
const host = process.env.DB_HOST 
const dbUser = process.env.DB_USER 
const dbDialect = process.env.DB_DIALECT


const sequelize = new Sequelize(dbName, dbUser, password, {
  host: host,
  dialect: dbDialect,
});

const autenticar = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida exitosamente a la BD");
  } catch (error) {
    console.error("Error al conectar a la Base de Datos", error);
  }
};


export { sequelize, autenticar };
