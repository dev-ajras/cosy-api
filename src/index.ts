import express from "express";
import { sequelize } from "./utils/db/db";
import userRouter from "./routes/userRoutes";
import "reflect-metadata";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users",userRouter);

sequelize.sync({alter:true}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});