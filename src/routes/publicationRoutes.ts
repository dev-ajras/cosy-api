import express from "express"
import { createPublication, getPublications } from "../controllers/publicationController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.post("/create",authMiddleware, createPublication);
router.get("/", authMiddleware, getPublications);

export default router;