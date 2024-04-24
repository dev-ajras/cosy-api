import express from "express"
import { loginUser, updateProfile, registerUser, getProfile, changeProfilePic } from "../controllers/userController"
import { authMiddleware } from "../utils/auth";
import { upload } from "../utils/imageUpload";
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/profile/pic",authMiddleware, upload, changeProfilePic)



export default router;