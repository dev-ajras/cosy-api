import express from "express"
import { loginUser, updateProfile, registerUser, getProfile, getAllProfiles, getExternalProfile} from "../controllers/userController"
import { authMiddleware } from "../utils/auth";
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/externalProfile", getExternalProfile)
router.get("/allProfiles", authMiddleware, getAllProfiles)



export default router;