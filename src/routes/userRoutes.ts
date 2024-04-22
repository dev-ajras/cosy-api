import express from "express"
import { loginUser, updateProfile, deleteUser, registerUser, getProfile } from "../controllers/userController"

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.put("profile", updateProfile);



export default router;