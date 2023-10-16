import express from "express";
import {
	RegisterController,
	loginController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", RegisterController);

router.post("/login", loginController);

export default router;
