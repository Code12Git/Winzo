import express from "express";
import {
	createScreenshot,
	getAllScreenshot,
} from "../controllers/screenShotController.js";
import {
	verifyToken,
	verifyTokenAndSuperAdmin,
} from "../middleware/verifyToken.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// Add a screenshot
router.post(
	"/",
	upload.fields([
		{
			name: "screenshot",
			maxCount: 1,
		},
	]),
	verifyToken,
	createScreenshot
);

router.get("/", verifyTokenAndSuperAdmin, getAllScreenshot);

export default router;
