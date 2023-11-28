import express from "express";
import { createBetController } from "../controllers/BetController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

// Create Bet
router.post("/", verifyTokenAndAuthorization, createBetController);

export default router;
