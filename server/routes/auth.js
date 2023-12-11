import express from "express";
import {
	RegisterController,
	loginController,
	updatePasswordByPhoneNumber,
} from "../controllers/authController.js";

const router = express.Router();

// Regiser Password
router.post("/register", RegisterController);

// Login Password
router.post("/login", loginController);

// Change Password
router.post("/changePassword", updatePasswordByPhoneNumber);

export default router;
