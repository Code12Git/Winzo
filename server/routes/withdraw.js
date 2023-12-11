import express from "express";
import {
	addBankAccount,
	getAccountDetailsForAdmin,
	withdraw,
} from "../controllers/withdrawController.js";
import {
	verifyToken,
	verifyTokenAndSuperAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

// Withdraw
router.post("/", verifyToken, withdraw);

// Add Bank Account
router.post("/bank-account", verifyToken, addBankAccount);

// Get Account Information
router.get("/account", verifyTokenAndSuperAdmin, getAccountDetailsForAdmin);

export default router;
