import express from "express";
import {
	createTransaction,
	getAllTransactions,
	getAllUserBalances,
	getUserBalance,
	updateUserBalance,
} from "../controllers/transactionController.js";
import {
	verifyToken,
	verifyTokenAndSuperAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

// Create a new transaction
router.post("/", verifyToken, createTransaction);

// Getting All Transactions
router.get("/", verifyToken, getAllTransactions);

// Getting Balance
router.get("/balance", verifyToken, getUserBalance);

// Updating Balance
router.put("/:id/balance", verifyTokenAndSuperAdmin, updateUserBalance);

// Getting all users balance
router.get("/all", verifyTokenAndSuperAdmin, getAllUserBalances);

export default router;
