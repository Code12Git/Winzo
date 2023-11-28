import express from "express";
import { createQr, getLatestQr } from "../controllers/qrController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
	"/",
	upload.fields([
		{
			name: "qrcode",
			maxCount: 1,
		},
	]),
	createQr
);

router.get("/", getLatestQr);
export default router;
