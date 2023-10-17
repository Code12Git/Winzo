import express from "express";
import { forgotpassword } from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/forgotPassword", forgotpassword);

export default router;
