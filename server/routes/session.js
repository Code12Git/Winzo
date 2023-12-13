import express from "express";
import {
	createSession,
	deleteAllSessions,
	deleteSession,
	getAllSession,
	getAllSessionForUser,
	getLatestSession,
	remainingTime,
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

// Deletin all Session
router.delete("/", deleteAllSessions);

// Getting the session
router.get("/", getAllSessionForUser);

// Getting All Session
router.get("/all", getAllSession);

// Remaining Time
router.get("/remaining", remainingTime);

// Latest Session
router.get("/latest-session", getLatestSession);

export default router;
