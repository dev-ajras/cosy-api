import express from "express";
import cors from "cors"
import { sequelize } from "./utils/db/db";
import userRouter from "./routes/userRoutes";
import publicationRouter from "./routes/publicationRoutes";
import commentRouter from "./routes/commentRoutes"
import "reflect-metadata";

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/publications", publicationRouter);
app.use("/comments", commentRouter)

sequelize.sync({alter:true}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});