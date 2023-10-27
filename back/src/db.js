import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME || "prestaciones";
const host = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";


const sequelize = new Sequelize(dbName, dbUser, password, {
  host: host,
  dialect: "mysql",
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
