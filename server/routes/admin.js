import express from "express";
import {
	getAllUsers,
	getUser,
	permission,
} from "../controllers/SuperadminController.js";
import { verifyTokenAndSuperAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

//Give permission
router.post("/:id", verifyTokenAndSuperAdmin, permission);

//Get user
router.get("/:id", verifyTokenAndSuperAdmin, getUser);

//Get All Users
router.get("/", verifyTokenAndSuperAdmin, getAllUsers);

export default router;
