import { Sequelize } from "sequelize-typescript"
import User from "../../models/User";
import Publication from "../../models/Publication";
import Comment from "../../models/Comment";

export const sequelize = new Sequelize({
    database: "cosy",
    host: "db",
    username: "admin",
    password: "admin",
    dialect: "postgres",
    models: [User, Publication, Comment]
});