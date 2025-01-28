import pg from "pg";
import { Sequelize } from "sequelize";
const DB_KEY = process.env.DB_SECRET_KEY;
export const sequelize = new Sequelize(DB_KEY, {
  dialect: "postgres",
  dialectModule: pg,
});
