import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbDialect = "postgres";

const sequelize = new Sequelize(dbName, dbUser, password, {
  host: host,
  dialect: dbDialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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