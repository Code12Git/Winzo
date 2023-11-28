import express from "express";
import {
	createSession,
	deleteSession,
	getAllSession,
	updateSession,
} from "../controllers/SessionController.js";
import { verifyTokenAndSuperAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// Creating a new session
router.post("/", verifyTokenAndSuperAdmin, createSession);

// Updating the session
router.put("/:id", verifyTokenAndSuperAdmin, updateSession);

// Deleting the session
router.delete("/:id", verifyTokenAndSuperAdmin, deleteSession);

// Getting the session
router.get("/", getAllSession);

export default router;
