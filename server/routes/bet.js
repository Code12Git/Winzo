import express from "express";
import {
	createBetController,
	getAllBetsController,
	getBetController,
	getRecentBetsController,
} from "../controllers/BetController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

// Create Bet
router.post("/", verifyTokenAndAuthorization, createBetController);

// Get Bet
router.get("/", verifyTokenAndAuthorization, getBetController);

// Get previous Bet
router.get("/recent-bet", verifyTokenAndAuthorization, getRecentBetsController);

// Get All Bet
router.get("/all", verifyTokenAndAuthorization, getAllBetsController);

export default router;
