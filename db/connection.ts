import { Sequelize } from "sequelize";
const db = new Sequelize(
  process.env.DB || "node",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "admin",
  {
    host: "localhost",
    dialect: "mysql",
    // logging:false
    // para observar el sql realizado
  }
);

export default db;
