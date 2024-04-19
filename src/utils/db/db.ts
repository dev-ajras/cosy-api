import { Sequelize } from "sequelize-typescript"
import User from "../../models/User";

export const sequelize = new Sequelize({
    database: "cosy",
    host: "db",
    username: "admin",
    password: "admin",
    dialect: "postgres",
    models: [User]
});