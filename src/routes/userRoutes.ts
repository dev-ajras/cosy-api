import express from "express"
import { loginUser, updateProfile, registerUser, getProfile} from "../controllers/userController"
import { authMiddleware } from "../utils/auth";
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);



export default router;