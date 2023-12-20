import express from "express";
import {
	updateUserModalState,
	getUserModalState,
} from "../controllers/modalController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to update or create user modal state
router.post("/usermodalstate/update", verifyToken, updateUserModalState);

// Route to get user modal state by userId
router.get("/usermodalstate", verifyToken, getUserModalState);

export default router;
