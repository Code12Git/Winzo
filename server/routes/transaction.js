import express from "express";
import {
	createTransaction,
	getAllTransactions,
} from "../controllers/transactionController.js";
import {
	verifyToken,
	verifyTokenAndSuperAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

// Create a new transaction
router.post("/", verifyToken, createTransaction);

// Getting All Transactions
router.get("/", verifyTokenAndSuperAdmin, getAllTransactions);

export default router;
