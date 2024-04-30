import express from "express"
import { authMiddleware } from "../utils/auth";
import { createComment } from "../controllers/commentController";

const router = express.Router();

router.post("/create",authMiddleware, createComment);

export default router;