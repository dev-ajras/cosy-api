import express from "express"
import { getUsers, loginUser, updateUser, deleteUser, registerUser } from "../controllers/userController"
import { userService } from "../services/users-service";

const router = express.Router();

router.get("/", getUsers);
router.put("/tasks/:id", updateUser);
router.delete("/tasks/id:", deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;