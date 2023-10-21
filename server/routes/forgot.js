import express from "express";
import {
	forgotpassword,
	resetPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/forgotPassword", forgotpassword);

router.post("/resetPassword/:id/:token", resetPassword);

export default router;
