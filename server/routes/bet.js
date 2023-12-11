import express from "express";
import {
	createBetController,
	getBetController,
} from "../controllers/BetController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

// Create Bet
router.post("/", verifyTokenAndAuthorization, createBetController);

// Get Bet
router.get("/", verifyTokenAndAuthorization, getBetController);

export default router;
